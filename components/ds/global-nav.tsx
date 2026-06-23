"use client";

import { NAV_ITEMS } from "@/components/ds/nav-items";
import { Shell } from "@/components/ds/shell";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

const SOCIAL_ITEMS = [
	{ href: "https://x.com/woosal1337", label: "X" },
	{ href: "https://github.com/woosal1337", label: "GitHub" },
	{ href: "https://linkedin.com/in/woosal1337", label: "LinkedIn" },
	{ href: "/blog/rss.xml", label: "RSS" },
] as const;

export function GlobalNav() {
	const pathname = usePathname();
	const [open, setOpen] = React.useState(false);

	// biome-ignore lint/correctness/useExhaustiveDependencies: close the curtain on route change
	React.useEffect(() => {
		setOpen(false);
	}, [pathname]);

	React.useEffect(() => {
		document.documentElement.style.overflow = open ? "hidden" : "";
		return () => {
			document.documentElement.style.overflow = "";
		};
	}, [open]);

	const isActive = (href: string) =>
		pathname === href || pathname.startsWith(`${href}/`);

	return (
		<header className="sticky top-0 z-50">
			<nav
				className="relative z-10 border-b border-line bg-paper"
				aria-label="Global"
			>
				<Shell className="flex h-12 items-center justify-between gap-4">
					<div className="flex min-w-0 flex-1 items-center gap-4">
						<Link
							href="/"
							aria-label="Home"
							className="flex shrink-0 select-none items-center gap-1.5 leading-none text-foreground transition-opacity duration-240 ease-house hover:opacity-80"
						>
							<Image
								src="/logo.png"
								alt=""
								width={28}
								height={28}
								priority
								className="h-7 w-7"
							/>
							<span className="text-[15px] font-medium tracking-tight">
								ege
							</span>
						</Link>

						<div className="hidden items-center gap-1 md:flex">
							{NAV_ITEMS.map((item) => (
								<Link
									key={item.href}
									href={item.href}
									className={cn(
										"whitespace-nowrap px-2 py-1 text-footnote transition-colors duration-200 ease-house",
										isActive(item.href)
											? "text-foreground"
											: "text-ink-soft hover:text-foreground",
									)}
								>
									{item.label}
								</Link>
							))}
						</div>
					</div>

					<div className="hidden items-center gap-3 md:flex">
						<a
							href="https://github.com/woosal1337"
							target="_blank"
							rel="noopener noreferrer"
							className="text-footnote text-ink-soft transition-colors duration-200 ease-house hover:text-foreground"
						>
							GitHub
						</a>
						<a
							href="/blog/rss.xml"
							className="border border-line bg-foreground px-3 py-1 text-footnote font-medium text-background transition-colors duration-200 ease-house hover:bg-background hover:text-foreground"
						>
							RSS
						</a>
					</div>

					<button
						type="button"
						onClick={() => setOpen((v) => !v)}
						aria-expanded={open}
						aria-label={open ? "Close menu" : "Open menu"}
						className="-mr-2 flex h-11 w-11 flex-col items-center justify-center gap-[5px] md:hidden"
					>
						<span
							className={cn(
								"h-px w-[18px] bg-foreground transition-transform duration-240 ease-house",
								open && "translate-y-[3px] rotate-45",
							)}
						/>
						<span
							className={cn(
								"h-px w-[18px] bg-foreground transition-transform duration-240 ease-house",
								open && "-translate-y-[3px] -rotate-45",
							)}
						/>
					</button>
				</Shell>
			</nav>

			<div
				className={cn(
					"fixed inset-0 -z-10 bg-paper transition-transform [transition-duration:320ms] ease-curtain md:hidden",
					open ? "translate-y-0" : "-translate-y-full",
				)}
				aria-hidden={!open}
			>
				<Shell className="flex h-full flex-col pt-24">
					<div className="flex flex-col gap-5">
						{NAV_ITEMS.map((item, index) => (
							<Link
								key={item.href}
								href={item.href}
								tabIndex={open ? 0 : -1}
								className={cn(
									"text-[28px] font-medium leading-tight tracking-tight text-foreground transition-opacity duration-500",
									open ? "opacity-100" : "opacity-0",
								)}
								style={{
									transitionDelay: open ? `${220 + index * 20}ms` : "0ms",
								}}
							>
								{item.label}
							</Link>
						))}
					</div>
					<div
						className={cn(
							"mt-10 flex gap-6 transition-opacity duration-500",
							open ? "opacity-100" : "opacity-0",
						)}
						style={{ transitionDelay: open ? "360ms" : "0ms" }}
					>
						{SOCIAL_ITEMS.map((item) => (
							<a
								key={item.href}
								href={item.href}
								tabIndex={open ? 0 : -1}
								target={item.href.startsWith("http") ? "_blank" : undefined}
								rel={
									item.href.startsWith("http")
										? "noopener noreferrer"
										: undefined
								}
								className="text-footnote text-ink-soft hover:text-foreground"
							>
								{item.label}
							</a>
						))}
					</div>
				</Shell>
			</div>
		</header>
	);
}
