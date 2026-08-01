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
