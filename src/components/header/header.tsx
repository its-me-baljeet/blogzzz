"use client";

import Link from "next/link";
import { useState } from "react";
import { ModeToggle } from "../buttons/modeToggleBtn";
import SearchInput from "../search/searchInput";
import { HeaderDropdown } from "./headerDropdown";
import { Search, X } from "lucide-react";
import { Button } from "../ui/button";

export default function Header() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="h-14 w-full flex justify-between items-center px-4 sm:px-5 border-b">
      <Link
        href="/"
        className="h-full flex items-center text-xl md:text-2xl font-semibold tracking-tight"
      >
        Blogzz
      </Link>

      <nav className="flex items-center gap-2">
        <div className="hidden sm:block">
          <SearchInput />
        </div>

        <div className="sm:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSearch(true)}
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>

        <ModeToggle />
        <HeaderDropdown />
      </nav>

      {showSearch && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex items-start px-4 pt-3">
          <div className="flex w-full items-center gap-2">
            <SearchInput autoFocus />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSearch(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
