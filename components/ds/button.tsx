import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

const buttonVariants = cva(
	"inline-flex items-center justify-center whitespace-nowrap font-sans font-normal transition-colors duration-300 ease-house disabled:pointer-events-none disabled:opacity-40",
	{
		variants: {
			variant: {
				primary:
					"bg-action text-white hover:bg-action-hover active:bg-action-active",
				secondary:
					"bg-secondary text-secondary-foreground hover:bg-secondary/70 active:bg-secondary/90",
				outline:
					"border border-link bg-transparent text-link hover:border-action-hover hover:bg-action-hover hover:text-white",
			},
			size: {
				sm: "rounded-pill px-4 py-[9px] text-footnote",

				md: "rounded-pill px-[22px] py-3 text-body",

				compact: "rounded-md px-6 py-2 text-footnote",

				block: "w-full rounded-lg px-[22px] py-3 text-body",
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
