import { cn } from "@/lib/utils";
import * as React from "react";

export const SearchInput = React.forwardRef<
	HTMLInputElement,
	React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type = "text", ...props }, ref) => {
	return (
		<input
			ref={ref}
			type={type}
			className={cn(
				"h-11 w-full rounded-lg border border-input bg-card px-4 text-body text-foreground placeholder:text-tertiary dark:bg-raised",
				className,
			)}
			{...props}
		/>
	);
});
SearchInput.displayName = "SearchInput";
