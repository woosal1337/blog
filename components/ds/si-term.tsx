import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Portal } from "@radix-ui/react-tooltip";

export function SiTerm() {
	return (
		<Tooltip>
			<TooltipTrigger className="cursor-default underline decoration-line decoration-dotted decoration-from-font underline-offset-[5px]">
				SI
			</TooltipTrigger>
			<Portal>
				<TooltipContent side="top" className="font-ui">
					superintelligence
				</TooltipContent>
			</Portal>
		</Tooltip>
	);
}
