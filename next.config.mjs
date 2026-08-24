import createMDX from "@next/mdx";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import { rehypePrettyCodeOptions } from "./lib/mdx-options.mjs";

const nextConfig = {
	distDir: process.env.NEXT_DIST_DIR || ".next",
	pageExtensions: ["mdx", "ts", "tsx"],
	reactStrictMode: false,
	async redirects() {
		return [
			{ source: "/setup", destination: "/lab", permanent: true },
			// The project was renamed CompanyOS -> Elliptic; keep the published URL alive.
			{
				source: "/blog/companyos",
				destination: "/blog/elliptic",
				permanent: true,
			},
			// The ep01 kit was split into ste-writing/ (the skill) and
			// experiment/ (the test data). The flat URLs are in the wild.
			...Object.entries({
				"ste-writing-skill": "ste-writing/SKILL",
				"ste-lint.py": "ste-writing/ste-lint.py",
				"ste-recurring-errors": "ste-writing/ste-recurring-errors",
				"experiment-results": "experiment/results-cross-model",
				"experiment-results-openai": "experiment/results-openai",
				"before-after-samples": "experiment/before-after-samples",
				"run-openai.py": "experiment/run-openai.py",
			}).map(([from, to]) => ({
				source: `/videos/the-cure-for-ai-slop/kit/${from}`,
				destination: `/videos/the-cure-for-ai-slop/kit/${to}`,
				permanent: true,
			})),
		];
	},
	logging: {
		fetches: {
			fullUrl: true,
		},
	},
	experimental: {
		mdxRs: false,
	},
	images: {
		minimumCacheTTL: 60 * 60 * 24 * 30,
	},
};

const withMDX = createMDX({
	options: {
		remarkPlugins: [remarkGfm],
		rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]],
	},
});

export default withMDX(nextConfig);
