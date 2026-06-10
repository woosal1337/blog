"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import * as React from "react";

const OPTIONS = [
	{ value: "light", label: "Light" },
	{ value: "dark", label: "Dark" },
	{ value: "system", label: "Auto" },
] as const;

export function ThemeSwitcher({ className }: { className?: string }) {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = React.useState(false);

	React.useEffect(() => setMounted(true), []);

	return (
		<div
			role="radiogroup"
			aria-label="Theme"
			className={cn(
				"inline-flex items-center gap-0.5 rounded-pill border border-border p-0.5",
				className,
			)}
		>
			{OPTIONS.map((option) => {
				const selected = mounted && theme === option.value;
				return (
					<button
						key={option.value}
						type="button"
						role="radio"
						aria-checked={selected}
						onClick={() => setTheme(option.value)}
						className={cn(
							"rounded-pill px-3 py-1 text-caption transition-colors duration-200 ease-house",
							selected
								? "bg-action text-white"
								: "text-muted-foreground hover:text-foreground",
						)}
					>
						{option.label}
					</button>
				);
			})}
		</div>
	);
}
