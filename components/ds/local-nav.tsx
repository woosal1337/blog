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
		<div className={cn("border-b border-line", className)}>
			<Shell className="flex h-[52px] items-center justify-between gap-6">
				<span className="oak-label shrink-0 text-ink-soft">// {title}</span>
				<div
					role="tablist"
					aria-label={title}
					className="no-scrollbar flex h-full items-stretch gap-4 overflow-x-auto font-mono"
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
									"-mb-px flex items-center gap-1.5 whitespace-nowrap border-b-2 text-caption transition-colors duration-240 ease-house",
									selected
										? "border-foreground text-foreground"
										: "border-transparent text-ink-soft hover:text-foreground",
								)}
							>
								<span className="text-ink-mute">/</span>
								{item.label}
							</button>
						);
					})}
				</div>
			</Shell>
		</div>
	);
}
