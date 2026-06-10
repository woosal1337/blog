"use client";

import { Shell } from "@/components/ds/shell";
import { cn } from "@/lib/utils";

export type LocalNavItem<T extends string> = {
	value: T;
	label: string;
};

type LocalNavProps<T extends string> = {
	title: string;
	items: ReadonlyArray<LocalNavItem<T>>;
	value: T;
	onChange: (value: T) => void;
	className?: string;
};

export function LocalNav<T extends string>({
	title,
	items,
	value,
	onChange,
	className,
}: LocalNavProps<T>) {
	return (
		<div className={cn("border-b border-border", className)}>
			<Shell className="flex h-[52px] items-center justify-between gap-6">
				<span className="shrink-0 text-subhead font-semibold">{title}</span>
				<div
					role="tablist"
					aria-label={title}
					className="no-scrollbar flex h-full items-stretch gap-6 overflow-x-auto"
				>
					{items.map((item) => {
						const selected = item.value === value;
						return (
							<button
								key={item.value}
								type="button"
								role="tab"
								aria-selected={selected}
								onClick={() => onChange(item.value)}
								className={cn(
									"-mb-px whitespace-nowrap border-b-2 text-caption transition-colors duration-200 ease-house",
									selected
										? "border-foreground text-foreground"
										: "border-transparent text-foreground/80 hover:text-foreground",
								)}
							>
								{item.label}
							</button>
						);
					})}
				</div>
			</Shell>
		</div>
	);
}
