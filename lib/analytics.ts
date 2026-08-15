/**
 * Self-hosted OpenAnalytics (getopen.so), running on igris through Coolify.
 *
 * Four hostnames, because the dashboard, the api, the collector and the
 * realtime stream are four services and not four paths. Only the collector
 * appears in the page the visitor loads.
 *
 * `OA_TRACKING_KEY` is public on purpose. It is write-only: it names the site
 * an event belongs to and reads nothing back, so it ships in the HTML the same
 * way a Plausible domain or a GA measurement id does.
 */
export const OA_COLLECTOR_URL = "https://oa-c.chele.bi";
export const OA_API_URL = "https://oa-api.chele.bi";
export const OA_DASHBOARD_URL = "https://oa.chele.bi";
export const OA_TRACKING_KEY = "oa_pk_WPcvR3jtpIrcB5E6Ya6jxeM0d_mf049I";

/**
 * The read-only dashboard behind /stats.
 *
 * The slug is the capability: anybody holding it reads the shared surfaces, so
 * rotating it in the dashboard is what revokes a link that got out. Visitor
 * identity is deliberately not among those surfaces.
 */
export const OA_SHARE_SLUG = "s6udoutx8nj7zmhu0d26";
export const OA_SHARE_URL = `${OA_DASHBOARD_URL}/share/${OA_SHARE_SLUG}`;

/**
 * Event names sent from this site.
 *
 * Written down in one place because the funnels and the reports in the
 * dashboard match on these strings: renaming one here without renaming it
 * there breaks a report quietly, months later.
 */
export const OA_EVENTS = {
	outbound: "outbound_click",
	videoPlay: "video_play",
	rss: "rss_click",
	projectOpen: "project_open",
	postOpen: "post_open",
} as const;

/**
 * Attributes that turn any element into a tracked click.
 *
 * The tracker reads `data-oa-event` and every `data-oa-prop-*` beside it on
 * click, so an event needs no client component and no handler — which is what
 * keeps these usable inside server components and MDX.
 *
 * Property names must be lowercase: the HTML parser lowercases attribute names
 * before the tracker ever sees them, so `data-oa-prop-linkHost` would arrive as
 * `linkhost` and quietly disagree with whatever the dashboard was told to
 * expect.
 */
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

/**
 * The host an outbound link points at, or undefined when it is not a URL we
 * can read. The host and not the full URL: a path can carry a token or an
 * email, and the question this answers is "where does my traffic go".
 */
export function linkHost(href: string): string | undefined {
	try {
		return new URL(href).hostname.replace(/^www\./, "");
	} catch {
		return undefined;
	}
}

/** Attributes for an outbound link, ready to spread onto an anchor. */
export function outboundProps(href: string): Record<string, string> {
	return eventProps(OA_EVENTS.outbound, { host: linkHost(href) });
}
