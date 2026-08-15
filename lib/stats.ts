import { OA_API_URL, OA_SHARE_SLUG } from "@/lib/analytics";

/**
 * Reads the public surfaces of the self-hosted OpenAnalytics dashboard.
 *
 * These endpoints take the share slug and no credential, so this runs on the
 * server with no secret to keep. Every call is wrapped: /stats is a page about
 * the site, not a page that depends on the analytics host being up, and an
 * analytics outage must not take a route with it.
 */

const REVALIDATE_SECONDS = 300;

export type StatsTotals = {
	events: number;
	pageviews: number;
	visitors: number;
};

export type StatsSessionTotals = {
	sessions: number;
	bounce_rate: number;
	avg_active_duration_ms: number;
};

export type StatsBucket = {
	bucket: string;
	pageviews: number;
	visitors: number;
};

export type StatsCountry = {
	country: string | null;
	views: number;
	visitors: number;
};

export type SiteStats = {
	totals: StatsTotals;
	sessions: StatsSessionTotals | null;
	series: StatsBucket[];
	countries: StatsCountry[];
	firstEventAt: string | null;
	/** False when the analytics host could not be read at all. */
	live: boolean;
};

/** Whole days, so two loads a minute apart ask the same question and hit cache. */
function range(days: number): { from: string; to: string } {
	const now = new Date();
	const to = new Date(now);
	to.setUTCMinutes(0, 0, 0);
	to.setUTCHours(to.getUTCHours() + 1);
	const from = new Date(to);
	from.setUTCDate(from.getUTCDate() - days);
	return { from: from.toISOString(), to: to.toISOString() };
}

async function readPublic<T>(surface: string, days: number): Promise<T | null> {
	const { from, to } = range(days);
	const query = new URLSearchParams({ from, to, timezone: "Europe/Istanbul" });
	try {
		const response = await fetch(
			`${OA_API_URL}/v1/public/${OA_SHARE_SLUG}/${surface}?${query}`,
			{ next: { revalidate: REVALIDATE_SECONDS } },
		);
		if (!response.ok) return null;
		return (await response.json()) as T;
	} catch {
		return null;
	}
}

export async function getSiteStats(days = 30): Promise<SiteStats> {
	const [overview, timeseries, geography, sessions, site] = await Promise.all([
		readPublic<{ totals: StatsTotals }>("overview", days),
		readPublic<{ series: StatsBucket[] }>("timeseries", days),
		readPublic<{ items: StatsCountry[] }>("geography", days),
		readPublic<{ totals: StatsSessionTotals }>("sessions", days),
		readPublic<{ first_event_at: string | null }>("site", days),
	]);

	return {
		totals: overview?.totals ?? { events: 0, pageviews: 0, visitors: 0 },
		sessions: sessions?.totals ?? null,
		series: timeseries?.series ?? [],
		countries: [...(geography?.items ?? [])]
			.sort((a, b) => b.visitors - a.visitors)
			.slice(0, 8),
		firstEventAt: site?.first_event_at ?? null,
		live: overview !== null,
	};
}

const REGION = new Intl.DisplayNames(["en"], { type: "region" });

export function countryName(code: string | null): string {
	if (!code) return "Unknown";
	try {
		return REGION.of(code) ?? code;
	} catch {
		return code;
	}
}

export function formatDuration(ms: number): string {
	if (!Number.isFinite(ms) || ms <= 0) return "0s";
	const seconds = Math.round(ms / 1000);
	if (seconds < 60) return `${seconds}s`;
	const minutes = Math.floor(seconds / 60);
	return `${minutes}m ${String(seconds % 60).padStart(2, "0")}s`;
}
