/* eslint-disable @next/next/no-img-element */
"use client";

import Polaroid, { type polaroidVariants } from "@/components/blocks/polaroid";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

type TImage = {
	src: string;
	variant: keyof typeof polaroidVariants;
};

const PolaroidGallery = ({
	images,
	event,
	title,
}: { images: Array<TImage>; event: string; title?: string }) => {
	return (
		<Dialog>
			<DialogTrigger>
				<div className="grid grid-cols-12 items-center -gap-10 mt-2">
					{images.map((image) => (
						<Polaroid
							key={image.src}
							variant={image.variant}
							src={image.src}
							alt={title ? `${event} — ${title}` : event}
						/>
					))}
				</div>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="font-mono text-title text-foreground">
						{event}
					</DialogTitle>
					<DialogDescription className="font-mono text-footnote text-ink-soft">
						{title}
					</DialogDescription>
				</DialogHeader>
				<div>
					<Carousel>
						<CarouselContent>
							{images.map((image) => (
								<CarouselItem key={image.src}>
									<img
										src={image.src}
										alt={title ? `${event} — ${title}` : event}
										className="border border-line bg-paper-2"
									/>
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious />
						<CarouselNext />
					</Carousel>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default PolaroidGallery;
