"use client";

import { GlassButtonSurface } from "@/components/ds/glass-button";
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
				"fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-[calc(100%-32px)] max-w-[816px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-[16px] border border-line bg-paper text-foreground outline-none",
				"data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-left-[50%] data-[state=open]:slide-in-from-top-[50%] data-[state=open]:duration-240",
				"data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-left-[50%] data-[state=closed]:slide-out-to-top-[50%] data-[state=closed]:duration-150",
				className,
			)}
			{...props}
		>
			<DialogPrimitive.Close
				aria-label="Close"
				data-sound="close"
				className="absolute right-4 top-4 z-10 inline-block rounded-[999px]"
			>
				<GlassButtonSurface size={36}>
					<X size={16} strokeWidth={1.6} aria-hidden="true" />
				</GlassButtonSurface>
			</DialogPrimitive.Close>
			<div className="p-6 sm:p-10">{children}</div>
		</DialogPrimitive.Content>
	</DialogPrimitive.Portal>
));
SheetDialogContent.displayName = "SheetDialogContent";

const SheetDialogTitle = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Title>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
	<DialogPrimitive.Title
		ref={ref}
		className={cn("mt-1 font-ui text-title", className)}
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
		className={cn("mt-4 font-ui text-body text-ink-soft", className)}
		{...props}
	/>
));
SheetDialogDescription.displayName = "SheetDialogDescription";

export {
	SheetDialog,
	SheetDialogTrigger,
	SheetDialogClose,
	SheetDialogContent,
	SheetDialogTitle,
	SheetDialogDescription,
};
