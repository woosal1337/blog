import { BackButton } from "@/components/ds/back-button";
import { CTALink } from "@/components/ds/cta-link";
import { Reveal } from "@/components/ds/reveal";
import { SectionLabel } from "@/components/ds/section-label";
import { Section, Shell } from "@/components/ds/shell";
import { OA_SHARE_URL } from "@/lib/analytics";
import { createPageMetadata } from "@/lib/seo";
import { countryName, formatDuration, getSiteStats } from "@/lib/stats";

export const metadata = createPageMetadata({
	title: "Traffic, in the open",
	description:
		"Live traffic for chele.bi, measured by a self-hosted, cookieless OpenAnalytics install and published read-only.",
	socialDescription:
		"What this site actually gets: visitors, pages, and countries, measured without cookies and published in the open.",
	path: "/stats",
});

// The numbers move; the page is still static between reads.
export const revalidate = 300;

const DAYS = 30;

function Stat({
	label,
	value,
	note,
}: {
	label: string;
	value: string;
	note?: string;
}) {
	return (
		<div className="rounded-[10px] border border-line bg-white/[0.015] px-4 py-3">
			<p className="font-ui text-[12px] uppercase tracking-[0.08em] text-ink-mute">
				{label}
			</p>
			<p className="mt-1 font-ui text-[26px] tabular-nums text-ink">{value}</p>
			{note ? (
				<p className="mt-0.5 font-ui text-[12px] text-ink-mute">{note}</p>
			) : null}
		</div>
	);
}

/**
 * A bar per bucket, sized against the busiest one. Plain divs on purpose: this
 * is the one number-shaped thing on the site that must not pull a chart
 * library in behind it.
 */
function Sparkline({
	series,
}: {
	series: { bucket: string; pageviews: number }[];
}) {
	if (series.length === 0) return null;
	const peak = Math.max(...series.map((point) => point.pageviews), 1);
	return (
		<div
			className="flex h-24 items-end gap-[3px]"
			aria-label={`Pageviews per bucket over the last ${DAYS} days`}
		>
			{series.map((point) => (
				<div
					key={point.bucket}
					// max-w keeps a quiet day from drawing one bar the width of the
					// page; min-w keeps a busy month from drawing nothing at all.
					className="min-w-[2px] max-w-[10px] flex-1 rounded-t-[2px] bg-ink-mute/50 transition-colors duration-200 ease-house hover:bg-ink-soft"
					style={{
						height: `${Math.max((point.pageviews / peak) * 100, 2)}%`,
					}}
					title={`${new Date(point.bucket).toLocaleString("en-GB", {
						dateStyle: "medium",
						timeStyle: "short",
					})} — ${point.pageviews} pageviews`}
				/>
			))}
		</div>
	);
}

export default async function StatsPage() {
	const stats = await getSiteStats(DAYS);
	const number = new Intl.NumberFormat("en-US");

	return (
		<Shell width="column">
			<Section>
				<BackButton />

				<Reveal>
					<SectionLabel>Traffic, in the open</SectionLabel>
					<p className="mt-3 font-ui text-[15px] leading-relaxed text-ink-soft">
						This site is measured by an OpenAnalytics install I run myself, on
						my own hardware. No cookies, no cross-site profile, no consent
						banner to dismiss — a visitor is an anonymous id that is rebuilt
						daily and cannot be traced back to an address. Since I ask you to
						take that on faith everywhere else, the numbers are published here
						read-only rather than described.
					</p>
				</Reveal>

				{!stats.live ? (
					<Reveal>
						<p className="mt-8 rounded-[10px] border border-line bg-white/[0.015] px-4 py-3 font-ui text-[14px] text-ink-mute">
							The analytics host is not answering right now. The page stays up;
							the numbers come back when it does.
						</p>
					</Reveal>
				) : (
					<>
						<Reveal>
							<div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
								<Stat
									label="Visitors"
									value={number.format(stats.totals.visitors)}
									note={`last ${DAYS} days`}
								/>
								<Stat
									label="Pageviews"
									value={number.format(stats.totals.pageviews)}
									note={`last ${DAYS} days`}
								/>
								<Stat
									label="Sessions"
									value={number.format(stats.sessions?.sessions ?? 0)}
									note={
										stats.sessions
											? `${Math.round(stats.sessions.bounce_rate * 100)}% bounced`
											: undefined
									}
								/>
								<Stat
									label="Time reading"
									value={formatDuration(
										stats.sessions?.avg_active_duration_ms ?? 0,
									)}
									note="active, per session"
								/>
							</div>
						</Reveal>

						{stats.series.length > 0 ? (
							<Reveal>
								<div className="mt-10">
									<p className="font-ui text-[12px] uppercase tracking-[0.08em] text-ink-mute">
										Pageviews
									</p>
									<div className="mt-3">
										<Sparkline series={stats.series} />
									</div>
								</div>
							</Reveal>
						) : null}

						{stats.countries.length > 0 ? (
							<Reveal>
								<div className="mt-10">
									<p className="font-ui text-[12px] uppercase tracking-[0.08em] text-ink-mute">
										Where from
									</p>
									<ul className="mt-3 space-y-1">
										{stats.countries.map((row) => (
											<li
												key={row.country ?? "unknown"}
												className="flex items-baseline justify-between gap-4 border-line border-b py-1.5 font-ui text-[14px] last:border-b-0"
											>
												<span className="text-ink">
													{countryName(row.country)}
												</span>
												<span className="tabular-nums text-ink-mute">
													{number.format(row.visitors)}
												</span>
											</li>
										))}
									</ul>
								</div>
							</Reveal>
						) : null}
					</>
				)}

				<Reveal>
					<div className="mt-10 space-y-2">
						<CTALink href={OA_SHARE_URL} external>
							The full dashboard, read-only
						</CTALink>
						<p className="font-ui text-[12px] leading-relaxed text-ink-mute">
							Running{" "}
							<a
								href="https://github.com/OpenLabs-so/openanalytics"
								target="_blank"
								rel="noopener noreferrer"
								className="underline decoration-line underline-offset-[3px]"
							>
								OpenAnalytics
							</a>
							, self-hosted on the box in{" "}
							<a
								href="/lab"
								className="underline decoration-line underline-offset-[3px]"
							>
								the lab
							</a>
							. IP Geolocation by{" "}
							<a
								href="https://db-ip.com"
								target="_blank"
								rel="noopener noreferrer"
								className="underline decoration-line underline-offset-[3px]"
							>
								DB-IP
							</a>
							, used under CC BY 4.0.
						</p>
					</div>
				</Reveal>
			</Section>
		</Shell>
	);
}
