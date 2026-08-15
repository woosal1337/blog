import { NAV_ITEMS } from "@/components/ds/nav-items";
import { Shell } from "@/components/ds/shell";
import { OA_EVENTS, eventProps, outboundProps } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import Link from "next/link";

const PAGES = [{ href: "/", label: "Home" }, ...NAV_ITEMS] as const;

const ELSEWHERE = [
	{ href: "https://x.com/woosal1337", label: "X", external: true },
	{ href: "https://github.com/woosal1337", label: "GitHub", external: true },
	{
		href: "https://linkedin.com/in/woosal",
		label: "LinkedIn",
		external: true,
	},
	{
		href: "https://www.instagram.com/woosal1337/",
		label: "Instagram",
		external: true,
	},
	{ href: "mailto:ege@chele.bi", label: "Email", external: true },
	{ href: "/blog/rss.xml", label: "RSS", external: false },
] as const;

export type BreadcrumbItem = {
	label: string;
	href?: string;
};

export function BreadcrumbBand({
	items,
	className,
}: { items: BreadcrumbItem[]; className?: string }) {
	return (
		<div className={cn("border-b border-line bg-paper", className)}>
			<Shell className="flex flex-wrap items-center gap-2 py-3 font-mono text-caption text-ink-soft">
				{items.map((item, index) => (
					<span key={item.label} className="flex items-center gap-2">
						{index > 0 && (
							<span aria-hidden="true" className="text-ink-mute">
								/
							</span>
						)}
						{item.href ? (
							<Link
								href={item.href}
								className="transition-colors duration-200 ease-house hover:text-foreground"
							>
								{item.label}
							</Link>
						) : (
							<span className="max-w-[40ch] truncate text-foreground">
								{item.label}
							</span>
						)}
					</span>
				))}
			</Shell>
		</div>
	);
}

const quietLink =
	"font-ui text-ink-mute transition-colors duration-200 ease-house hover:text-ink";

function FooterColumn({
	align = "left",
	children,
}: {
	align?: "left" | "right";
	children: React.ReactNode;
}) {
	return (
		<div className={cn("self-start", align === "right" && "text-right")}>
			<ul className="space-y-2 font-ui text-[13.5px]">{children}</ul>
		</div>
	);
}

export function SiteFooter() {
	return (
		<footer className="mt-auto">
			<div className="mx-auto max-w-column px-6 pb-14 pt-10">
				<div className="grid grid-cols-3 items-center border-t border-line pt-10">
					<FooterColumn>
						{PAGES.map((item) => (
							<li key={item.href}>
								<Link href={item.href} className={quietLink}>
									{item.label}
								</Link>
							</li>
						))}
					</FooterColumn>

					<Link
						href="/blog/contour"
						aria-label="The story of this mark"
						className="flex justify-center transition-opacity duration-200 ease-house hover:opacity-80"
					>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src="/contour-logo/contour-logo-white.svg"
							alt="ege"
							width={160}
							height={160}
							className="size-40"
						/>
					</Link>

					<FooterColumn align="right">
						{ELSEWHERE.map((item) =>
							item.external ? (
								<li key={item.label}>
									<a
										href={item.href}
										target={item.href.startsWith("http") ? "_blank" : undefined}
										rel={
											item.href.startsWith("http")
												? "noopener noreferrer"
												: undefined
										}
										className={quietLink}
										{...outboundProps(item.href)}
									>
										{item.label}
									</a>
								</li>
							) : (
								<li key={item.label}>
									<Link
										href={item.href}
										className={quietLink}
										{...(item.href.endsWith(".xml")
											? eventProps(OA_EVENTS.rss)
											: {})}
									>
										{item.label}
									</Link>
								</li>
							),
						)}
					</FooterColumn>
				</div>
			</div>
		</footer>
	);
}
