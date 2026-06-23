import { NAV_ITEMS } from "@/components/ds/nav-items";
import { Shell } from "@/components/ds/shell";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const PAGES = [{ href: "/", label: "Home" }, ...NAV_ITEMS] as const;

const ELSEWHERE = [
	{ href: "https://x.com/woosal1337", label: "X", external: true },
	{ href: "https://github.com/woosal1337", label: "GitHub", external: true },
	{
		href: "https://linkedin.com/in/woosal1337",
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
	"text-ink-soft transition-colors duration-200 ease-house hover:text-foreground";

function FooterColumn({
	label,
	children,
}: { label: string; children: React.ReactNode }) {
	return (
		<div>
			<p className="oak-label mb-3 text-ink-mute">// {label}</p>
			<ul className="space-y-2 text-footnote">{children}</ul>
		</div>
	);
}

export function SiteFooter() {
	const year = new Date().getFullYear();
	return (
		<footer className="mt-auto border-t border-line bg-paper">
			<Shell className="py-12">
				<div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between sm:gap-16">
					<div className="max-w-sm">
						<Link
							href="/"
							className="flex items-center gap-2 text-[15px] leading-none text-foreground transition-opacity hover:opacity-80"
						>
							<Image
								src="/logo.png"
								alt=""
								width={28}
								height={28}
								className="h-7 w-7"
							/>
							<span className="font-medium tracking-tight">ege</span>
						</Link>
						<p className="mt-3 text-footnote leading-relaxed text-ink-soft">
							Code, finance, entrepreneurship and AI. Building tools for humans
							and agents.
						</p>
					</div>

					<div className="flex gap-16">
						<FooterColumn label="pages">
							{PAGES.map((item) => (
								<li key={item.href}>
									<Link href={item.href} className={quietLink}>
										{item.label}
									</Link>
								</li>
							))}
						</FooterColumn>
						<FooterColumn label="elsewhere">
							{ELSEWHERE.map((item) =>
								item.external ? (
									<li key={item.label}>
										<a
											href={item.href}
											target={
												item.href.startsWith("http") ? "_blank" : undefined
											}
											rel={
												item.href.startsWith("http")
													? "noopener noreferrer"
													: undefined
											}
											className={quietLink}
										>
											{item.label}
										</a>
									</li>
								) : (
									<li key={item.label}>
										<Link href={item.href} className={quietLink}>
											{item.label}
										</Link>
									</li>
								),
							)}
						</FooterColumn>
					</div>
				</div>

				<div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-caption text-ink-mute">
					<p>© {year} Ege Çelebi</p>
					<p className="flex items-center gap-3">
						<Link
							href="/blog/rss.xml"
							className="transition-colors hover:text-foreground"
						>
							RSS
						</Link>
					</p>
				</div>
			</Shell>
		</footer>
	);
}
