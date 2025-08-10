import Link from "next/link";
import { ModeToggle } from "../buttons/modeToggleBtn";
import SearchInput from "../search/searchInput";
import { HeaderDropdown } from "./headerDropdown";

export default function Header() {
    return (
        <header className="h-14 w-full flex justify-between items-center px-5">

            <Link href={"/"} className="h-full flex items-center text-xl md:text-2xl font-medium">
                {/* <Link href={"/"}>
            <Image src={"/article_logo.png"} fill priority alt="logo" className=""/> */}
                Blogzz
                {/* </Link> */}
            </Link>

            <nav className="flex gap-2">
                <SearchInput />
                <ModeToggle />
                <HeaderDropdown />
            </nav>

        </header>
    )
}