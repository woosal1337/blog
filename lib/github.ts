import {
	GITHUB_FALLBACK,
	type SocialFeed,
	type SocialItem,
} from "@/data/social";

const SHORT_DATE = new Intl.DateTimeFormat("en-US", {
	month: "short",
	day: "numeric",
});

type Repo = {
	name: string;
	description: string | null;
	pushed_at: string;
	stargazers_count: number;
	fork: boolean;
};

export async function getGithubFeed(): Promise<SocialFeed> {
	try {
		const res = await fetch(
			"https://api.github.com/users/woosal1337/repos?sort=pushed&per_page=10",
			{
				next: { revalidate: 21600 },
				headers: { Accept: "application/vnd.github+json" },
			},
		);
		if (!res.ok) return GITHUB_FALLBACK;
		const repos = (await res.json()) as Repo[];
		const items: SocialItem[] = repos
			.filter((repo) => !repo.fork)
			.slice(0, 3)
			.map((repo) => ({
				text: repo.description
					? `${repo.name} · ${repo.description}`
					: repo.name,
				date: SHORT_DATE.format(new Date(repo.pushed_at)),
				meta: `★ ${repo.stargazers_count}`,
			}));
		return items.length > 0 ? { ...GITHUB_FALLBACK, items } : GITHUB_FALLBACK;
	} catch {
		return GITHUB_FALLBACK;
	}
}
