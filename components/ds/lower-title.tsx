"use client";

import { useEffect } from "react";

export function LowerTitle() {
	useEffect(() => {
		const fix = () => {
			const next = document.title.toLowerCase();
			if (document.title !== next) document.title = next;
		};
		fix();
		const observer = new MutationObserver(fix);
		observer.observe(document.head, {
			childList: true,
			subtree: true,
			characterData: true,
		});
		return () => observer.disconnect();
	}, []);
	return null;
}
