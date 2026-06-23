"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		let raf = 0;

		const compute = () => {
			const doc = document.documentElement;
			const max = doc.scrollHeight - doc.clientHeight;
			if (max <= 0) {
				setProgress(0);
				return;
			}
			setProgress(Math.min(100, Math.max(0, (doc.scrollTop / max) * 100)));
		};

		const onScroll = () => {
			cancelAnimationFrame(raf);
			raf = requestAnimationFrame(compute);
		};

		compute();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll);
		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
		};
	}, []);

	return (
		<div
			className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] bg-line/30"
			aria-hidden="true"
		>
			<div className="h-full bg-foreground" style={{ width: `${progress}%` }} />
		</div>
	);
}
