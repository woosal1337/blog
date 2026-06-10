import { NAV_ITEMS } from "@/components/ds/nav-items";
import { Shell } from "@/components/ds/shell";
import { ThemeSwitcher } from "@/components/ds/theme-switcher";
import { cn } from "@/lib/utils";
import Link from "next/link";

const ELSEWHERE = [
	{ href: "/blog/rss.xml", label: "RSS", external: false },
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
		<div className={cn("bg-muted dark:bg-card", className)}>
			<Shell className="flex flex-wrap items-center gap-2 border-b border-border py-[17px] text-caption text-tertiary">
				{items.map((item, index) => (
					<span key={item.label} className="flex items-center gap-2">
						{index > 0 && <span aria-hidden="true">›</span>}
						{item.href ? (
							<Link
								href={item.href}
								className="transition-colors duration-200 ease-house hover:text-foreground"
							>
								{item.label}
							</Link>
						) : (
							<span className="max-w-[40ch] truncate text-muted-foreground">
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
	"transition-colors duration-200 ease-house hover:text-foreground";

export function SiteFooter() {
	return (
		<footer className="bg-muted text-caption text-tertiary dark:bg-card">
			<Shell>
				<div className="grid grid-cols-2 gap-8 py-10 sm:max-w-md">
					<div>
						<p className="mb-3 font-semibold text-muted-foreground">Site</p>
						<ul className="space-y-2">
							{NAV_ITEMS.map((item) => (
								<li key={item.href}>
									<Link href={item.href} className={quietLink}>
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</div>
					<div>
						<p className="mb-3 font-semibold text-muted-foreground">
							Elsewhere
						</p>
						<ul className="space-y-2">
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
						</ul>
					</div>
				</div>

				<div className="flex flex-wrap items-center justify-between gap-4 border-t border-border py-4">
					<p>
						© {new Date().getFullYear()} Ege Çelebi
						<span className="mx-3 text-border">|</span>
						<Link href="/blog/rss.xml" className={quietLink}>
							RSS
						</Link>
					</p>
					<ThemeSwitcher />
				</div>
			</Shell>
		</footer>
	);
}
