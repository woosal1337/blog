import Link from "next/link";

export function PostAuthor() {
	return (
		<aside className="not-prose mt-12" aria-label="About the author">
			<div className="rounded-[14px] border border-line bg-white/[0.015] p-5">
				<p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-mute">
					Written by
				</p>
				<Link
					href="/about"
					rel="author"
					className="mt-2 inline-block font-ui text-[15px] font-medium text-ink transition-opacity duration-200 ease-house hover:opacity-70"
				>
					Ege Chelebi
				</Link>
				<p className="mt-1 font-ui text-[14px] leading-relaxed text-ink-mute">
					AI engineer at Refik Anadol Studio, building applied AI systems,
					local-first developer tools, and open-source software.
				</p>
			</div>
		</aside>
	);
}
