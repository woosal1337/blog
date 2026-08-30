"use client";

import { useEffect } from "react";

const SPOKES = 8;
const LIFETIME = 700;

function isInteractive(target: EventTarget | null): boolean {
	if (!(target instanceof Element)) return false;
	return Boolean(
		target.closest("[data-sound], a[href], button, [role='button']"),
	);
}

export function ClickFlare() {
	useEffect(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

		const onPointerDown = (event: PointerEvent) => {
			if (event.button !== 0 && event.pointerType === "mouse") return;
			if (!isInteractive(event.target)) return;

			const flare = document.createElement("span");
			flare.className = "flare";
			flare.style.left = `${event.clientX}px`;
			flare.style.top = `${event.clientY}px`;

			const ring = document.createElement("span");
			ring.className = "flare-ring";
			flare.appendChild(ring);

			for (let i = 0; i < SPOKES; i += 1) {
				const spoke = document.createElement("i");
				spoke.style.setProperty("--a", `${(360 / SPOKES) * i}deg`);
				spoke.style.animationDelay = `${i * 8}ms`;
				flare.appendChild(spoke);
			}

			document.body.appendChild(flare);
			window.setTimeout(() => flare.remove(), LIFETIME);
		};

		document.addEventListener("pointerdown", onPointerDown, { passive: true });
		return () => document.removeEventListener("pointerdown", onPointerDown);
	}, []);

	return null;
}
