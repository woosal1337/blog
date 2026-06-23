import { cn } from "@/lib/utils";
import * as React from "react";

export const SearchInput = React.forwardRef<
	HTMLInputElement,
	React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type = "text", ...props }, ref) => {
	const hasValue =
		typeof props.value === "string" ? props.value.length > 0 : false;
	return (
		<div
			className={cn(
				"group flex h-11 items-center gap-2 border border-line bg-paper px-3 transition-colors duration-240 ease-house focus-within:border-line-strong hover:border-line-strong",
				className,
			)}
		>
			<span
				aria-hidden="true"
				className="select-none text-footnote text-ink-mute"
			>
				/
			</span>
			<input
				ref={ref}
				type={type}
				className="h-full w-full bg-transparent text-footnote text-foreground outline-none placeholder:text-ink-mute"
				{...props}
			/>
			{!hasValue && (
				<span aria-hidden="true" className="oak-caret -ml-1 shrink-0" />
			)}
		</div>
	);
});
SearchInput.displayName = "SearchInput";
