import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

const buttonVariants = cva(
	"inline-flex items-center justify-center whitespace-nowrap border font-sans font-medium transition-colors duration-240 ease-house disabled:pointer-events-none disabled:opacity-40",
	{
		variants: {
			variant: {
				// white pill → inverts on hover (oak primary)
				primary:
					"border-foreground bg-foreground text-background hover:bg-background hover:text-foreground",
				// bordered terminal button
				secondary:
					"border-line bg-paper-2 text-foreground hover:border-line-strong hover:bg-paper-3",
				// ghost outline
				outline:
					"border-line bg-transparent text-foreground hover:border-foreground hover:bg-foreground hover:text-background",
			},
			size: {
				sm: "px-4 py-[7px] text-footnote",

				md: "px-5 py-2.5 text-footnote",

				compact: "px-4 py-1.5 text-footnote",

				block: "w-full px-5 py-2.5 text-footnote",
			},
		},
		defaultVariants: {
			variant: "primary",
			size: "md",
		},
	},
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "button";
		return (
			<Comp
				className={cn(buttonVariants({ variant, size }), className)}
				ref={ref}
				{...props}
			/>
		);
	},
);
Button.displayName = "Button";

export { Button, buttonVariants };
