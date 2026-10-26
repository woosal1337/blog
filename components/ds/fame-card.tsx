import Image from "next/image";
import Link from "next/link";

export function FameCard({
	href,
	name,
	role,
	portrait,
	portraitAlt,
	portraitPosition,
	sizes = "(max-width: 640px) 50vw, 220px",
}: {
	href: string;
	name: string;
	role: string;
	portrait: string;
	portraitAlt: string;
	portraitPosition: string;
	sizes?: string;
}) {
	return (
		<Link
			href={href}
			data-sound="card"
			className="group block rounded-[16px] outline-none"
		>
			<div className="relative aspect-[3/4] overflow-hidden rounded-[16px] border border-line bg-[#060606] transition-colors duration-200 ease-house group-hover:border-line-strong group-focus-visible:border-line-strong">
				<Image
					src={portrait}
					alt={portraitAlt}
					fill
					sizes={sizes}
					className="object-cover grayscale transition-[filter] duration-400 ease-house group-hover:grayscale-0 group-focus-visible:grayscale-0 motion-reduce:transition-none"
					style={{ objectPosition: portraitPosition }}
				/>
			</div>
			<p className="mt-3 font-ui text-[15px] font-medium text-ink">{name}</p>
			<p className="mt-1 font-ui text-[13px] text-ink-mute">{role}</p>
		</Link>
	);
}
