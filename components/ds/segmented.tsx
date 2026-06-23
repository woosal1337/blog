"use client";

import { cn } from "@/lib/utils";

export type SegmentedOption<T extends string> = {
	value: T;
	label: string;
};

type SegmentedFilterProps<T extends string> = {
	options: ReadonlyArray<SegmentedOption<T>>;
	value: T;
	onChange: (value: T) => void;
	ariaLabel: string;
	className?: string;
};

export function SegmentedFilter<T extends string>({
	options,
	value,
	onChange,
	ariaLabel,
	className,
}: SegmentedFilterProps<T>) {
	return (
		<div
			role="radiogroup"
			aria-label={ariaLabel}
			className={cn(
				"no-scrollbar inline-flex max-w-full overflow-x-auto border border-line bg-paper",
				className,
			)}
		>
			{options.map((option) => {
				const selected = option.value === value;
				return (
					<button
						key={option.value}
						type="button"
						role="radio"
						aria-checked={selected}
						onClick={() => onChange(option.value)}
						className={cn(
							"whitespace-nowrap border-line px-4 py-2 text-meta uppercase tracking-[0.12em] transition-colors duration-240 ease-house [&:not(:first-child)]:border-l",
							selected
								? "bg-foreground text-background"
								: "text-ink-soft hover:bg-paper-2 hover:text-foreground",
						)}
					>
						{option.label}
					</button>
				);
			})}
		</div>
	);
}
