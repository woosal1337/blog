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
				"no-scrollbar inline-flex max-w-full gap-0.5 overflow-x-auto rounded-pill bg-secondary p-1",
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
							"whitespace-nowrap rounded-pill px-4 py-2 text-footnote transition-colors duration-200 ease-house",
							selected
								? "bg-foreground text-background"
								: "text-foreground hover:text-foreground/70",
						)}
					>
						{option.label}
					</button>
				);
			})}
		</div>
	);
}
