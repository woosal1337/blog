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
				"fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-[calc(100%-32px)] max-w-[816px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto border border-line bg-paper text-foreground outline-none",
				"data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-bottom-2 data-[state=open]:duration-400",
				"data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:duration-150",
				className,
			)}
			{...props}
		>
			<div className="flex items-center justify-between border-b border-line px-5 py-3">
				<p className="oak-label text-ink-mute">// book</p>
				<DialogPrimitive.Close className="oak-label flex items-center gap-1.5 text-ink-soft transition-colors duration-100 hover:text-foreground">
					<span aria-hidden="true">[esc]</span>
					<X size={14} strokeWidth={1.5} aria-hidden="true" />
					<span className="sr-only">close</span>
				</DialogPrimitive.Close>
			</div>
			<div className="p-6 sm:p-10">{children}</div>
		</DialogPrimitive.Content>
	</DialogPrimitive.Portal>
));
SheetDialogContent.displayName = "SheetDialogContent";

const SheetDialogEyebrow = ({
	children,
	className,
}: { children: React.ReactNode; className?: string }) => (
	<p className={cn("oak-label text-ink-mute", className)}>{children}</p>
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
		className={cn("mt-4 text-body text-ink-soft", className)}
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
