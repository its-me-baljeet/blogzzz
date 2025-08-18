"use client";

import { cn } from "@/lib/utils";
import gqlClient from "@/services/graphql";
import { gql } from "graphql-request";
import { Loader2, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const GET_SUGGESTIONS = gql`
  query Blog($q: String) {
    getSuggestions(q: $q) {
      id
      title
    }
  }
`;

export default function SearchInput({ autoFocus = false }: { autoFocus?: boolean }) {
    const [input, setInput] = useState("");
    const [suggestions, setSuggestions] = useState<{ id: string; title: string }[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!input.trim()) {
            setSuggestions([]);
            return;
        }

        const delay = setTimeout(async () => {
            try {
                setLoading(true);
                const res: { getSuggestions: { id: string; title: string }[] } =
                    await gqlClient.request(GET_SUGGESTIONS, { q: input });
                setSuggestions(res.getSuggestions || []);
            } catch (err) {
                console.error(err);
                setSuggestions([]);
            } finally {
                setLoading(false);
            }
        }, 400);

        return () => clearTimeout(delay);
    }, [input]);

    return (
        <div className="relative w-full max-w-xs sm:max-w-sm">
            <form
                action="/search"
                className="flex items-center gap-2 w-full"
            >
                <Input
                    name="q"
                    id="query"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Search blogs..."
                    autoComplete="off"
                    autoFocus={autoFocus}
                    className="flex-1"
                />
                <Button
                    type="submit"
                    size="icon"
                    variant="secondary"
                    className="shrink-0"
                >
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                </Button>
            </form>

            {suggestions.length > 0 && (
                <div className="absolute mt-1 w-full bg-background border rounded-lg shadow-md max-h-60 overflow-y-auto z-50">
                    {suggestions.map((s) => (
                        <p
                            key={s.id}
                            className={cn(
                                "block px-3 py-2 text-sm hover:bg-muted transition-colors"
                            )}
                            onClick={() => window.location.href = `/blog/${s.id}`}
                        >
                            {s.title}
                        </p>
                    ))}
                </div>
            )}

            {input.trim() && !loading && suggestions.length === 0 && (
                <div className="absolute mt-1 w-full bg-background border rounded-lg shadow-md p-3 text-sm text-muted-foreground">
                    No results found
                </div>
            )}
        </div>
    );
}
