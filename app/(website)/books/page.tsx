"use client";

import Image from "next/image";
import Link from "next/link";
import { books, bookCategories, type BookCategory } from "@/data/books";
import { useState, useMemo } from "react";

function BookImage({ src, alt }: { src: string; alt: string }) {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    if (hasError) {
        return (
            <div className="aspect-[2/3] bg-accent/50 rounded mb-3 flex items-center justify-center text-xs text-muted-foreground">
                cover
            </div>
        );
    }

    return (
        <div className="aspect-[2/3] rounded mb-3 overflow-hidden relative bg-accent/30">
            {isLoading && (
                <div className="absolute inset-0 bg-accent/50 animate-pulse" />
            )}
            <Image
                src={src}
                alt={alt}
                fill
                className={`object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                onLoad={() => setIsLoading(false)}
                onError={() => {
                    setIsLoading(false);
                    setHasError(true);
                }}
            />
        </div>
    );
}

export default function BooksPage() {
    const currentYear = new Date().getFullYear();
    const [selectedCategory, setSelectedCategory] = useState<BookCategory | "all">("all");
    const [sortOrder, setSortOrder] = useState<"default" | "a-z">("default");

    const filteredBooks = useMemo(() => {
        let filtered = selectedCategory === "all" ? books : books.filter(book => book.category === selectedCategory);

        if (sortOrder === "a-z") {
            filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
        }

        return filtered;
    }, [selectedCategory, sortOrder]);

    return (
        <main className="min-h-screen bg-background">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="flex h-16 items-center justify-between">
                        <Link href="/" className="flex items-center gap-3 text-sm font-medium tracking-tight hover:text-primary transition-colors">
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
                            <Link href="/#projects" className="hover:text-foreground transition-colors">
                                cv
                            </Link>
                            <Link href="/#experience" className="hover:text-foreground transition-colors">
                                xp
                            </Link>
                            <Link href="/#education" className="hover:text-foreground transition-colors">
                                edu
                            </Link>
                            <Link href="/books" className="text-foreground">
                                lib
                            </Link>
                            <Link href="/#contact" className="hover:text-foreground transition-colors">
                                contact
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Books Section */}
            <section className="pt-32 pb-24 sm:pt-40 sm:pb-32">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="max-w-5xl mx-auto">
                        <h1 className="text-4xl sm:text-5xl font-medium tracking-tight mb-4 text-center">
                            library
                        </h1>

                        {/* Filters */}
                        <div className="flex flex-col items-center gap-4 mb-12">
                            {/* Category Filter */}
                            <div className="flex flex-wrap items-center justify-center gap-2">
                                <button
                                    onClick={() => setSelectedCategory("all")}
                                    className={`px-3 py-1.5 text-xs border rounded transition-all duration-200 ${selectedCategory === "all" ? "bg-accent border-border/80 text-foreground" : "border-border text-muted-foreground hover:bg-accent hover:border-border/80"}`}
                                >
                                    all
                                </button>
                                {bookCategories.map((cat) => (
                                    <button
                                        key={cat.key}
                                        onClick={() => setSelectedCategory(cat.key)}
                                        className={`px-3 py-1.5 text-xs border rounded transition-all duration-200 ${selectedCategory === cat.key ? "bg-accent border-border/80 text-foreground" : "border-border text-muted-foreground hover:bg-accent hover:border-border/80"}`}
                                    >
                                        {cat.label}
                                    </button>
                                ))}
                            </div>

                            {/* Separator */}
                            <div className="w-full max-w-md h-px bg-border/50" />

                            {/* Sort Order */}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setSortOrder("default")}
                                    className={`px-3 py-1.5 text-xs border rounded transition-all duration-200 ${sortOrder === "default" ? "bg-accent border-border/80 text-foreground" : "border-border text-muted-foreground hover:bg-accent hover:border-border/80"}`}
                                >
                                    default
                                </button>
                                <button
                                    onClick={() => setSortOrder("a-z")}
                                    className={`px-3 py-1.5 text-xs border rounded transition-all duration-200 ${sortOrder === "a-z" ? "bg-accent border-border/80 text-foreground" : "border-border text-muted-foreground hover:bg-accent hover:border-border/80"}`}
                                >
                                    a → z
                                </button>
                            </div>
                        </div>

                                                {/* Reading */}
                        <div>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {filteredBooks.map((book, index) => (
                                    <div key={index} className="border border-border p-4 hover:bg-accent hover:border-border/80 transition-all duration-200">
                                        {book.cover ? (
                                            <BookImage src={book.cover} alt={book.title} />
                                        ) : (
                                            <div className="aspect-[2/3] bg-accent/50 rounded mb-3 flex items-center justify-center text-xs text-muted-foreground">
                                                cover
                                            </div>
                                        )}
                                        <h3 className="text-sm font-medium mb-1 line-clamp-2">{book.title}</h3>
                                        <p className="text-xs text-muted-foreground mb-2">{book.author}</p>
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 h-1 bg-accent rounded-full overflow-hidden">
                                                <div className="h-full bg-primary" style={{ width: `${book.progress}%` }} />
                                            </div>
                                            <span className="text-xs text-muted-foreground">{book.progress}%</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 border-t border-border/50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="flex items-center justify-center text-xs text-muted-foreground">
                        <p>© {currentYear} ege</p>
                    </div>
                </div>
            </footer>
        </main>
    );
}
