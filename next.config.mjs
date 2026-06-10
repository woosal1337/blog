import createMDX from "@next/mdx";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

const nextConfig = {
	pageExtensions: ["mdx", "ts", "tsx"],
	reactStrictMode: false,
	logging: {
		fetches: {
			fullUrl: true,
		},
	},
	experimental: {
		mdxRs: false,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "i.scdn.co",
			},
			{
				protocol: "https",
				hostname: "mosaic.scdn.co",
			},
		],
		minimumCacheTTL: 60 * 60 * 24 * 30,
	},
};

const rehypePrettyCodeOptions = {
	theme: "github-dark-default",
	keepBackground: false,
	defaultLang: { block: "txt" },
	onVisitLine(node) {
		if (node.children.length === 0) {
			node.children = [{ type: "text", value: " " }];
		}
	},
	onVisitHighlightedLine(node) {
		node.properties.className = [
			...(node.properties.className ?? []),
			"line-highlighted",
		];
	},
	onVisitHighlightedChars(node) {
		node.properties.className = [
			...(node.properties.className ?? []),
			"chars-highlighted",
		];
	},
};

const withMDX = createMDX({
	options: {
		remarkPlugins: [remarkGfm],
		rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]],
	},
});

export default withMDX(nextConfig);
