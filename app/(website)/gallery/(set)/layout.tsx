import { BackButton } from "@/components/ds/back-button";

export default function SetLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className="relative mx-auto max-w-column px-6 py-14 sm:py-20">
			<BackButton className="mb-8" />
			<article className="w-full min-w-0">{children}</article>
		</div>
	);
}
