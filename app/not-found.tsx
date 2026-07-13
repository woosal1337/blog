import { NotFoundLine } from "@/components/blocks/not-found-line";
import { BackButton } from "@/components/ds/back-button";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "404",
	description: "This page could not be found.",
	robots: { index: false, follow: false },
};

export default function NotFound() {
	return (
		<main className="page-enter relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 text-center">
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				src="/contour-logo/contour-logo-white.svg"
				alt=""
				aria-hidden="true"
				className="pointer-events-none absolute left-1/2 top-1/2 size-[max(130vw,130svh)] max-w-none -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.015]"
			/>
			<div className="relative flex flex-col items-center">
				<p className="font-ui text-[clamp(72px,18vw,128px)] font-semibold leading-none tracking-tight text-ink">
					404
				</p>
				<NotFoundLine />
				<BackButton className="mt-10" />
			</div>
		</main>
	);
}
