"use client";

import { useEffect } from "react";

const SOUNDS = {
	link: { src: "/sounds/link.mp3", gain: 0.4 },
	external: { src: "/sounds/external.mp3", gain: 0.35 },
	card: { src: "/sounds/link.mp3", gain: 0.4 },
	back: { src: "/sounds/button.mp3", gain: 0.4 },
	forward: { src: "/sounds/forward.mp3", gain: 0.65 },
	button: { src: "/sounds/button.mp3", gain: 0.4 },
	toggle: { src: "/sounds/toggle.mp3", gain: 0.4 },
	close: { src: "/sounds/button.mp3", gain: 0.4 },
} as const;

type SoundName = keyof typeof SOUNDS;

let ctx: AudioContext | null = null;
const buffers = new Map<SoundName, Promise<AudioBuffer>>();

function context() {
	if (!ctx && typeof window !== "undefined" && "AudioContext" in window) {
		ctx = new AudioContext();
	}
	return ctx;
}

function buffer(name: SoundName) {
	const audio = context();
	if (!audio) return null;
	let pending = buffers.get(name);
	if (!pending) {
		pending = fetch(SOUNDS[name].src)
			.then((res) => res.arrayBuffer())
			.then((data) => audio.decodeAudioData(data));
		pending.catch(() => buffers.delete(name));
		buffers.set(name, pending);
	}
	return pending;
}

async function play(name: SoundName) {
	const audio = context();
	const pending = buffer(name);
	if (!audio || !pending) return;
	if (audio.state === "suspended") void audio.resume();
	try {
		const source = audio.createBufferSource();
		source.buffer = await pending;
		const gain = audio.createGain();
		gain.gain.value = SOUNDS[name].gain;
		source.connect(gain);
		gain.connect(audio.destination);
		source.start();
	} catch {}
}

function soundFor(target: EventTarget | null): SoundName | null {
	if (!(target instanceof Element)) return null;
	const el = target.closest("[data-sound], a[href], button, [role='button']");
	if (!el) return null;
	const explicit = el.getAttribute("data-sound");
	if (explicit) return explicit in SOUNDS ? (explicit as SoundName) : null;
	if (el instanceof HTMLAnchorElement) {
		return el.target === "_blank" ? "external" : "link";
	}
	return "button";
}

export function SoundProvider() {
	useEffect(() => {
		const prime = () => {
			for (const name of Object.keys(SOUNDS) as SoundName[]) {
				buffer(name);
			}
		};
		const onClick = (event: MouseEvent) => {
			const name = soundFor(event.target);
			if (name) void play(name);
		};
		window.addEventListener("pointerdown", prime, {
			once: true,
			passive: true,
			capture: true,
		});
		document.addEventListener("click", onClick, true);
		return () => {
			window.removeEventListener("pointerdown", prime, true);
			document.removeEventListener("click", onClick, true);
		};
	}, []);

	return null;
}
