"use client";

import {
    IconBrandPython,
    IconBrandTypescript,
    IconBrandJavascript,
    IconBrandGolang,
    IconCode,
    IconTerminal,
} from "@tabler/icons-react";

const programmingIcons = {
    python: IconBrandPython,
    typescript: IconBrandTypescript,
    javascript: IconBrandJavascript,
    go: IconBrandGolang,
    solidity: IconCode,
    bash: IconTerminal,
} as const;

type ProgrammingLanguage = keyof typeof programmingIcons;

export default function ProgrammingIcon({ language }: { language: ProgrammingLanguage }) {
    const Icon = programmingIcons[language];
    return (
        <span className="border border-border rounded px-1.5 py-0.5 inline-flex items-center justify-center">
            <Icon className="w-4 h-4" strokeWidth={1.5} />
        </span>
    );
}
