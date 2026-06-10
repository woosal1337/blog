"use client";

import { Shell } from "@/components/ds/shell";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import { NAV_ITEMS } from "@/components/ds/nav-items";

const SOCIAL_ITEMS = [
	{ href: "https://x.com/woosal1337", label: "X" },
	{ href: "https://github.com/woosal1337", label: "GitHub" },
	{ href: "https://linkedin.com/in/woosal1337", label: "LinkedIn" },
	{ href: "/blog/rss.xml", label: "RSS" },
] as const;

export function GlobalNav() {
	const pathname = usePathname();
	const [scrolled, setScrolled] = React.useState(false);
	const [open, setOpen] = React.useState(false);

	React.useEffect(() => {
		let raf = 0;
		const onScroll = () => {
			cancelAnimationFrame(raf);
			raf = requestAnimationFrame(() => setScrolled(window.scrollY > 0));
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener("scroll", onScroll);
		};
	}, []);

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
				className={cn(
					"h-11 border-b transition-colors duration-240 ease-house md:h-11",
					scrolled || open
						? "nav-scrim border-border"
						: "border-transparent bg-transparent",
				)}
				aria-label="Global"
			>
				<Shell className="flex h-full items-center justify-between">
					<Link
						href="/"
						className="text-[17px] font-semibold tracking-[-0.022em] text-foreground"
					>
						Ege
					</Link>

					<div className="hidden h-full items-center gap-7 md:flex">
						{NAV_ITEMS.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className={cn(
									"flex h-full items-center text-caption transition-colors duration-200 ease-house",
									isActive(item.href)
										? "text-foreground"
										: "text-foreground/80 hover:text-foreground",
								)}
							>
								{item.label}
							</Link>
						))}
					</div>

					<button
						type="button"
						onClick={() => setOpen((v) => !v)}
						aria-expanded={open}
						aria-label={open ? "Close menu" : "Open menu"}
						className="-mr-3 flex h-11 w-11 flex-col items-center justify-center gap-[5px] md:hidden"
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
					"fixed inset-0 -z-10 bg-raised transition-transform [transition-duration:320ms] ease-curtain md:hidden",
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
									"text-[28px] font-semibold leading-tight tracking-[-0.003em] text-foreground transition-opacity duration-500",
									open ? "opacity-100" : "opacity-0",
								)}
								style={{
									transitionDelay: open ? `${260 + index * 20}ms` : "0ms",
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
						style={{ transitionDelay: open ? "400ms" : "0ms" }}
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
								className="text-caption text-muted-foreground hover:text-foreground"
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
