export const rehypePrettyCodeOptions = {
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
