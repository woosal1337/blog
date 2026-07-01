"use client";

import { SiteFooter } from "@/components/ds/site-footer";
import { usePathname } from "next/navigation";

/** The footer is shown only on the landing page; every other route omits it. */
export function ConditionalFooter() {
	const pathname = usePathname();
	if (pathname !== "/") return null;
	return <SiteFooter />;
}
