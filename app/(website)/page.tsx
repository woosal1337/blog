"use client";

import Image from "next/image";
import Link from "next/link";
import LearnityLogo from "@/components/blocks/learnity-logo";
import {GitHubIcon} from "@/components/blocks/social-icons";
import ProgrammingIcon from "@/components/icons/programming-icons";
import { useMusic } from "@/components/providers/music-provider";

function CornerButton({
                          href,
                          children,
                          target,
                          rel,
                      }: {
    href: string;
    children: React.ReactNode;
    target?: string;
    rel?: string;
}) {
    return (
        <Link
            href={href}
            target={target}
            rel={rel}
            className="relative inline-flex items-center justify-center px-8 py-3 text-sm transition-all duration-200 border border-border hover:bg-accent hover:border-border/80 group"
        >
            <span
                className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white/40 group-hover:border-white/60 transition-all"/>
            <span
                className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-white/40 group-hover:border-white/60 transition-all"/>
            <span
                className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-white/40 group-hover:border-white/60 transition-all"/>
            <span
                className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white/40 group-hover:border-white/60 transition-all"/>
            {children}
        </Link>
    );
}

export default function PortfolioPage() {
    const currentYear = new Date().getFullYear();
    const { isPlaying, togglePlay } = useMusic();

    return (
        <main className="min-h-screen bg-background">
            {/* Navigation */}
            <nav
                className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="flex h-16 items-center justify-between">
                        <Link href="/"
                              className="flex items-center gap-3 text-sm font-medium tracking-tight hover:text-primary transition-colors">
                            <Image
                                src="/logo.png"
                                alt="ege logo"
                                width={40}
                                height={40}
                                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-border"
                            />
                            ege
                        </Link>
                        <div className="flex items-center gap-6 text-xs text-muted-foreground">
                            <Link href="#projects" className="hover:text-foreground transition-colors">
                                cv
                            </Link>
                            <Link href="#experience" className="hover:text-foreground transition-colors">
                                xp
                            </Link>
                            <Link href="#education" className="hover:text-foreground transition-colors">
                                edu
                            </Link>
                            <Link href="/books" className="hover:text-foreground transition-colors">
                                lib
                            </Link>
                            <Link href="#contact" className="hover:text-foreground transition-colors">
                                contact
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center pt-16">
                {/* Centered glow behind name */}
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-[120px] pointer-events-none"/>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="max-w-4xl mx-auto text-center">
                        {/* Avatar */}
                        <div className="mb-6">
                            <Image
                                src="/avatar.png"
                                alt="ege"
                                width={160}
                                height={160}
                                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border-2 border-border mx-auto"
                            />
                        </div>

                        {/* Main headline */}
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight mb-6 leading-tight">
                            ege
                        </h1>

                        {/* Subheadline */}
                        <p className="text-base sm:text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
                            code, finance, entrepreneurship, music.
                        </p>

                        {/* Music Player */}
                        <div className="max-w-md mx-auto mb-10">
                            <div className="flex items-center gap-4 border border-border rounded px-4 py-3 bg-background/50 backdrop-blur-sm">
                                {/* Album Cover */}
                                <div className="relative w-12 h-12 flex-shrink-0 rounded overflow-hidden border border-border">
                                    <Image
                                        src="/uzangibi.jpg"
                                        alt="uzan gibi cover"
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                {/* Track Info */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm font-medium truncate">uzan gibi</h3>
                                    <p className="text-xs text-muted-foreground">ege!</p>
                                </div>

                                {/* Play/Pause Button */}
                                <button
                                    onClick={togglePlay}
                                    className="flex-shrink-0 w-8 h-8 flex items-center justify-center border border-border rounded-full hover:bg-accent transition-colors"
                                    aria-label={isPlaying ? "Pause" : "Play"}
                                >
                                    {isPlaying ? (
                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M5 3.5h2v9H5v-9zm4 0h2v9H9v-9z" />
                                        </svg>
                                    ) : (
                                        <svg className="w-3 h-3 ml-0.5" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M4 3v10l8-5-8-5z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex items-center justify-center gap-4 mb-16">
                            <CornerButton href="#projects">
                                cv
                            </CornerButton>
                            <CornerButton href="#contact">
                                contact
                            </CornerButton>
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="py-24 sm:py-32 border-t border-border/50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl sm:text-3xl font-medium tracking-tight mb-12 text-center">
                            featured projects
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Link
                                href="https://learnity.ai"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="border border-border p-8 hover:bg-accent hover:border-border/80 transition-all duration-200 group"
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    <LearnityLogo className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0"/>
                                    <div className="flex-1">
                                        <h3 className="text-lg sm:text-xl font-medium mb-2 group-hover:text-primary transition-colors">
                                            learnity
                                        </h3>
                                        <p className="text-sm text-muted-foreground mb-3">
                                            ai-powered learning platform where students collaborate.
                                        </p>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <span>expo</span>
                                            <span>•</span>
                                            <span>ai/ml</span>
                                            <span>•</span>
                                            <span>edtech</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            <Link
                                href="https://github.com/woosal1337"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="border border-border p-8 hover:bg-accent hover:border-border/80 transition-all duration-200 group"
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    <div
                                        className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 flex items-center justify-center border border-border rounded-lg bg-accent/50">
                                        <GitHubIcon className="w-6 h-6"/>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg sm:text-xl font-medium mb-2 group-hover:text-primary transition-colors">
                                            open source
                                        </h3>
                                        <p className="text-sm text-muted-foreground mb-3">
                                            open-source tools and libraries.
                                        </p>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <span>python</span>
                                            <span>•</span>
                                            <span>ts</span>
                                            <span>•</span>
                                            <span>sh</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section id="experience" className="py-24 sm:py-32 border-t border-border/50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-2xl sm:text-3xl font-medium tracking-tight mb-12 text-center">
                            experience
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Left Column: Work, Fellowships, Incubation */}
                            <div className="md:col-span-2">
                                <h3 className="text-xs tracking-widest text-muted-foreground mb-6">work</h3>
                                <div className="space-y-4 mb-8">
                                    <div
                                        className="border border-border p-5 hover:bg-accent hover:border-border/80 transition-all duration-200">
                                        <div className="flex items-start justify-between gap-4 mb-2">
                                            <div className="flex-1">
                                                <h4 className="text-sm font-medium">cto</h4>
                                                <p className="text-xs text-muted-foreground"><Link
                                                    href="https://www.learnity.ai/" target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="hover:text-primary transition-colors underline">learnity</Link> ·
                                                    full-time</p>
                                            </div>
                                            <span
                                                className="text-xs text-muted-foreground whitespace-nowrap">2023 · now</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground mb-2">ai-powered learning platform
                                            where students collaborate.</p>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <span>next.js</span>
                                            <span>•</span>
                                            <span>ai/ml</span>
                                            <span>•</span>
                                            <span>edtech</span>
                                        </div>
                                    </div>

                                    <div
                                        className="border border-border p-5 hover:bg-accent hover:border-border/80 transition-all duration-200">
                                        <div className="flex items-start justify-between gap-4 mb-2">
                                            <div className="flex-1">
                                                <h4 className="text-sm font-medium">founding engineer</h4>
                                                <p className="text-xs text-muted-foreground"><Link
                                                    href="https://www.ahlatci.com.tr/" target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="hover:text-primary transition-colors underline">ahlatcı
                                                    holding</Link> · full-time</p>
                                            </div>
                                            <span
                                                className="text-xs text-muted-foreground whitespace-nowrap">2025 · 2026</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground mb-2">stealth fintech company
                                            project.</p>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <span>react native</span>
                                            <span>•</span>
                                            <span>expo</span>
                                            <span>•</span>
                                            <span>python</span>
                                            <span>•</span>
                                            <span>fintech</span>
                                        </div>
                                    </div>

                                    <div
                                        className="border border-border p-5 hover:bg-accent hover:border-border/80 transition-all duration-200">
                                        <div className="flex items-start justify-between gap-4 mb-2">
                                            <div className="flex-1">
                                                <h4 className="text-sm font-medium">consultant</h4>
                                                <p className="text-xs text-muted-foreground"><Link
                                                    href="https://www.aa.com.tr/en" target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="hover:text-primary transition-colors underline">anadolu
                                                    ajansı</Link> · contract</p>
                                            </div>
                                            <span
                                                className="text-xs text-muted-foreground whitespace-nowrap">2025</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground mb-2">ai-driven system designs and
                                            integrations.</p>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <span>ai</span>
                                            <span>•</span>
                                            <span>system design</span>
                                            <span>•</span>
                                            <span>consulting</span>
                                        </div>
                                    </div>

                                    <div
                                        className="border border-border p-5 hover:bg-accent hover:border-border/80 transition-all duration-200">
                                        <div className="flex items-start justify-between gap-4 mb-2">
                                            <div className="flex-1">
                                                <h4 className="text-sm font-medium">developer</h4>
                                                <p className="text-xs text-muted-foreground"><Link
                                                    href="https://etrapay.com" target="_blank" rel="noopener noreferrer"
                                                    className="hover:text-primary transition-colors underline">etrapay
                                                    (acquired)</Link> · full-time</p>
                                            </div>
                                            <span className="text-xs text-muted-foreground whitespace-nowrap">2023 · 2024</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground mb-2">next-gen layer 1 blockchain
                                            for instant, zero-fee global payments.</p>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <span>full-stack</span>
                                            <span>•</span>
                                            <span>fintech</span>
                                            <span>•</span>
                                            <span>payments</span>
                                        </div>
                                    </div>

                                    <div
                                        className="border border-border p-5 hover:bg-accent hover:border-border/80 transition-all duration-200">
                                        <div className="flex items-start justify-between gap-4 mb-2">
                                            <div className="flex-1">
                                                <h4 className="text-sm font-medium">co-founder</h4>
                                                <p className="text-xs text-muted-foreground"><Link
                                                    href="https://github.com/yeklabs" target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="hover:text-primary transition-colors underline">yeklabs</Link> ·
                                                    full-time</p>
                                            </div>
                                            <span className="text-xs text-muted-foreground whitespace-nowrap">2022 · 2023</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground mb-2">end-to-end outsource
                                            blockchain adoption with saas
                                            solutions.</p>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <span>backend</span>
                                            <span>•</span>
                                            <span>blockchain</span>
                                            <span>•</span>
                                            <span>saas</span>
                                        </div>
                                    </div>
                                </div>

                                <h3 className="text-xs tracking-widest text-muted-foreground mb-6">fellowships</h3>
                                <div className="space-y-4 mb-8">
                                    <div
                                        className="border border-border p-5 hover:bg-accent hover:border-border/80 transition-all duration-200">
                                        <div className="flex items-start justify-between gap-4 mb-2">
                                            <div className="flex-1">
                                                <h4 className="text-sm font-medium">fellow & alumni</h4>
                                                <p className="text-xs text-muted-foreground"><Link
                                                    href="https://www.girisimcilikvakfi.org/" target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="hover:text-primary transition-colors underline">türkiye girişimcilik
                                                    vakfı</Link></p>
                                            </div>
                                            <span
                                                className="text-xs text-muted-foreground whitespace-nowrap">2022 · now</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground">entrepreneurship foundation fellow
                                            (2022) and alumni.</p>
                                    </div>
                                </div>

                                <h3 className="text-xs tracking-widest text-muted-foreground mb-6">incubation</h3>
                                <div className="space-y-4">
                                    <div
                                        className="border border-border p-5 hover:bg-accent hover:border-border/80 transition-all duration-200">
                                        <div className="flex items-start justify-between gap-4 mb-2">
                                            <div className="flex-1">
                                                <h4 className="text-sm font-medium">sabah.lab</h4>
                                                <p className="text-xs text-muted-foreground"><Link
                                                    href="https://sabahhub.com/" target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="hover:text-primary transition-colors underline">sabah.hub</Link> · baku</p>
                                            </div>
                                            <span
                                                className="text-xs text-muted-foreground whitespace-nowrap">2024</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground">the biggest startup acceleration
                                            program in
                                            azerbaijan.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Awards */}
                            <div>
                                <h3 className="text-xs tracking-widest text-muted-foreground mb-6">awards</h3>
                                <div className="space-y-4">
                                    <Link
                                        href="https://www.linkedin.com/feed/update/urn:li:activity:7160373682584838144/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block border border-border p-5 hover:bg-accent hover:border-border/80 transition-all duration-200">
                                        <div className="flex items-start justify-between gap-4 mb-2">
                                            <div className="flex-1">
                                                <h4 className="text-sm font-medium">aa media hackathon</h4>
                                                <p className="text-xs text-muted-foreground">top 10 finalists</p>
                                            </div>
                                            <span
                                                className="text-xs text-muted-foreground whitespace-nowrap">2024</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground">one of 2 projects acquired out of 133 teams.</p>
                                    </Link>

                                    <Link
                                        href="https://www.linkedin.com/feed/update/urn:li:activity:6982740752871108608/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block border border-border p-5 hover:bg-accent hover:border-border/80 transition-all duration-200">
                                        <div className="flex items-start justify-between gap-4 mb-2">
                                            <div className="flex-1">
                                                <h4 className="text-sm font-medium">refi hackathon</h4>
                                                <p className="text-xs text-muted-foreground">3rd place</p>
                                            </div>
                                            <span
                                                className="text-xs text-muted-foreground whitespace-nowrap">2022</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground">akbank x avalanche hackathon, 19 teams.</p>
                                    </Link>

                                    <Link
                                        href="https://www.linkedin.com/feed/update/urn:li:activity:6931665956339355648/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block border border-border p-5 hover:bg-accent hover:border-border/80 transition-all duration-200">
                                        <div className="flex items-start justify-between gap-4 mb-2">
                                            <div className="flex-1">
                                                <h4 className="text-sm font-medium">acikhack blockchain</h4>
                                                <p className="text-xs text-muted-foreground">1st place</p>
                                            </div>
                                            <span
                                                className="text-xs text-muted-foreground whitespace-nowrap">2022</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground">blockchain, nft, metaverse hackathon, 41 teams.</p>
                                    </Link>

                                    <Link
                                        href="https://www.linkedin.com/feed/update/urn:li:activity:6874025912325746689/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block border border-border p-5 hover:bg-accent hover:border-border/80 transition-all duration-200">
                                        <div className="flex items-start justify-between gap-4 mb-2">
                                            <div className="flex-1">
                                                <h4 className="text-sm font-medium">avalanche hacks</h4>
                                                <p className="text-xs text-muted-foreground">2nd place</p>
                                            </div>
                                            <span
                                                className="text-xs text-muted-foreground whitespace-nowrap">2021</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground">blockchain gaming track, istanbul.</p>
                                    </Link>

                                    <Link
                                        href="https://www.linkedin.com/feed/update/urn:li:activity:6841753066010669056"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block border border-border p-5 hover:bg-accent hover:border-border/80 transition-all duration-200">
                                        <div className="flex items-start justify-between gap-4 mb-2">
                                            <div className="flex-1">
                                                <h4 className="text-sm font-medium">teknofest</h4>
                                                <p className="text-xs text-muted-foreground">finalist</p>
                                            </div>
                                            <span
                                                className="text-xs text-muted-foreground whitespace-nowrap">2021</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground">fighting uavs, medipol autonomous vehicles.</p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Education Section */}
            <section id="education" className="py-24 sm:py-32 border-t border-border/50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl sm:text-3xl font-medium tracking-tight mb-12 text-center">
                            education
                        </h2>
                        <div className="space-y-4">
                            <div
                                className="border border-border p-5 hover:bg-accent hover:border-border/80 transition-all duration-200">
                                <div className="flex items-start justify-between gap-4 mb-2">
                                    <div className="flex-1">
                                        <h4 className="text-sm font-medium">msc degree</h4>
                                        <p className="text-xs text-muted-foreground"><Link href="https://www.medipol.edu.tr/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors underline">istanbul medipol university</Link> · computer engineering</p>
                                    </div>
                                    <span
                                        className="text-xs text-muted-foreground whitespace-nowrap">2024 · 2027</span>
                                </div>
                                <p className="text-xs text-muted-foreground">gpa 3.36 · artificial intelligence (ai).</p>
                            </div>

                            <div
                                className="border border-border p-5 hover:bg-accent hover:border-border/80 transition-all duration-200">
                                <div className="flex items-start justify-between gap-4 mb-2">
                                    <div className="flex-1">
                                        <h4 className="text-sm font-medium">bsc degree</h4>
                                        <p className="text-xs text-muted-foreground"><Link href="https://www.medipol.edu.tr/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors underline">istanbul medipol university</Link> · computer engineering</p>
                                    </div>
                                    <span
                                        className="text-xs text-muted-foreground whitespace-nowrap">2019 · 2024</span>
                                </div>
                                <p className="text-xs text-muted-foreground">gpa 3.15 (honor).</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Languages Section */}
            <section id="languages" className="py-24 sm:py-32 border-t border-border/50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl sm:text-3xl font-medium tracking-tight mb-12 text-center">
                            languages
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Spoken Languages */}
                            <div>
                                <div className="space-y-4">
                                    <div className="border border-border p-5 hover:bg-accent hover:border-border/80 transition-all duration-200">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <span className="text-sm border border-border rounded px-1.5 py-0.5">🇬🇧</span>
                                                <h4 className="text-sm font-medium">english</h4>
                                            </div>
                                            <span className="text-xs text-muted-foreground">native</span>
                                        </div>
                                    </div>
                                    <div className="border border-border p-5 hover:bg-accent hover:border-border/80 transition-all duration-200">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <span className="text-sm border border-border rounded px-1.5 py-0.5">🇹🇷</span>
                                                <h4 className="text-sm font-medium">turkish</h4>
                                            </div>
                                            <span className="text-xs text-muted-foreground">native</span>
                                        </div>
                                    </div>
                                    <div className="border border-border p-5 hover:bg-accent hover:border-border/80 transition-all duration-200">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <span className="text-sm border border-border rounded px-1.5 py-0.5">🇦🇿</span>
                                                <h4 className="text-sm font-medium">azerbaijani</h4>
                                            </div>
                                            <span className="text-xs text-muted-foreground">native</span>
                                        </div>
                                    </div>
                                    <div className="border border-border p-5 hover:bg-accent hover:border-border/80 transition-all duration-200">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <span className="text-sm border border-border rounded px-1.5 py-0.5">🇷🇺</span>
                                                <h4 className="text-sm font-medium">russian</h4>
                                            </div>
                                            <span className="text-xs text-muted-foreground">advanced</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Programming Languages */}
                            <div>
                                <div className="space-y-4">
                                    <div className="border border-border p-5 hover:bg-accent hover:border-border/80 transition-all duration-200">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <ProgrammingIcon language="python" />
                                                <h4 className="text-sm font-medium">.py</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border border-border p-5 hover:bg-accent hover:border-border/80 transition-all duration-200">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <ProgrammingIcon language="typescript" />
                                                <h4 className="text-sm font-medium">.ts</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border border-border p-5 hover:bg-accent hover:border-border/80 transition-all duration-200">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <ProgrammingIcon language="javascript" />
                                                <h4 className="text-sm font-medium">.js</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border border-border p-5 hover:bg-accent hover:border-border/80 transition-all duration-200">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <ProgrammingIcon language="go" />
                                                <h4 className="text-sm font-medium">.go</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border border-border p-5 hover:bg-accent hover:border-border/80 transition-all duration-200">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <ProgrammingIcon language="solidity" />
                                                <h4 className="text-sm font-medium">.sol</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-24 sm:py-32 border-t border-border/50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-2xl sm:text-3xl font-medium tracking-tight mb-4">
                            connect
                        </h2>
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            <CornerButton
                                href="https://x.com/woosal1337"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                x
                            </CornerButton>
                            <CornerButton
                                href="https://github.com/woosal1337"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                gh
                            </CornerButton>
                            <CornerButton
                                href="https://instagram.com/woosal1337"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                insta
                            </CornerButton>
                            <CornerButton
                                href="https://linkedin.com/in/woosal"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                linkedin
                            </CornerButton>
                            <CornerButton href="mailto:ege@chele.bi">
                                ege@chele.bi
                            </CornerButton>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 border-t border-border/50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div
                        className="flex items-center justify-center text-xs text-muted-foreground">
                        <p>© {currentYear} ege</p>
                    </div>
                </div>
            </footer>
        </main>
    );
}
