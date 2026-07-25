"use client";

import { SiteFooter } from "@/components/ds/site-footer";
import { usePathname } from "next/navigation";

export function ConditionalFooter() {
	const pathname = usePathname();
	if (pathname !== "/") return null;
	return <SiteFooter />;
}
