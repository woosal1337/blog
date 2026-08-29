export const OA_COLLECTOR_URL = "https://oa-c.chele.bi";
export const OA_API_URL = "https://oa-api.chele.bi";
export const OA_DASHBOARD_URL = "https://oa.chele.bi";
export const OA_TRACKING_KEY = "oa_pk_WPcvR3jtpIrcB5E6Ya6jxeM0d_mf049I";

export const OA_EVENTS = {
	outbound: "outbound_click",
	videoPlay: "video_play",
	rss: "rss_click",
	projectOpen: "project_open",
	postOpen: "post_open",
} as const;

export function eventProps(
	name: string,
	props?: Record<string, string | undefined>,
): Record<string, string> {
	const attrs: Record<string, string> = { "data-oa-event": name };
	for (const [key, value] of Object.entries(props ?? {})) {
		if (value) attrs[`data-oa-prop-${key.toLowerCase()}`] = value;
	}
	return attrs;
}

export function linkHost(href: string): string | undefined {
	try {
		return new URL(href).hostname.replace(/^www\./, "");
	} catch {
		return undefined;
	}
}

export function outboundProps(href: string): Record<string, string> {
	return eventProps(OA_EVENTS.outbound, { host: linkHost(href) });
}
