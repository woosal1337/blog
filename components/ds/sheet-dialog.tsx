"use client";

import { cn } from "@/lib/utils";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import * as React from "react";

const SheetDialog = DialogPrimitive.Root;
const SheetDialogTrigger = DialogPrimitive.Trigger;
const SheetDialogClose = DialogPrimitive.Close;

const SheetDialogContent = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
	<DialogPrimitive.Portal>
		<DialogPrimitive.Overlay className="dialog-scrim fixed inset-0 z-50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:duration-240" />
		<DialogPrimitive.Content
			ref={ref}
			className={cn(
				"fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-[calc(100%-32px)] max-w-[816px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl bg-card p-6 text-card-foreground outline-none sm:p-12",
				"data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-bottom-2 data-[state=open]:duration-400",
				"data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:duration-150",
				className,
			)}
			{...props}
		>
			{children}
			<DialogPrimitive.Close className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-pill bg-secondary text-foreground transition-colors duration-100 hover:bg-secondary/70">
				<X size={18} strokeWidth={1.5} aria-hidden="true" />
				<span className="sr-only">close</span>
			</DialogPrimitive.Close>
		</DialogPrimitive.Content>
	</DialogPrimitive.Portal>
));
SheetDialogContent.displayName = "SheetDialogContent";

const SheetDialogEyebrow = ({
	children,
	className,
}: { children: React.ReactNode; className?: string }) => (
	<p className={cn("text-body text-muted-foreground", className)}>{children}</p>
);

const SheetDialogTitle = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Title>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
	<DialogPrimitive.Title
		ref={ref}
		className={cn("mt-1 text-title", className)}
		{...props}
	/>
));
SheetDialogTitle.displayName = "SheetDialogTitle";

const SheetDialogDescription = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Description>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
	<DialogPrimitive.Description
		ref={ref}
		className={cn("mt-4 text-body text-muted-foreground", className)}
		{...props}
	/>
));
SheetDialogDescription.displayName = "SheetDialogDescription";

export {
	SheetDialog,
	SheetDialogTrigger,
	SheetDialogClose,
	SheetDialogContent,
	SheetDialogEyebrow,
	SheetDialogTitle,
	SheetDialogDescription,
};
