import Link from "next/link";
import { ModeToggle } from "../buttons/modeToggleBtn";
import SearchInput from "../search/searchInput";
import Image from "next/image";

export default function Header() {
    return (
        <header className="h-14 w-full flex justify-between items-center px-5">

            <h2 className="relative h-full w-32 text-xl md:text-2xl font-medium"><Link href={"/"}>
            <Image src={"/article_logo.png"} fill priority alt="logo" className=""/>
            Taaza Blogs
            </Link></h2>

            <nav className="flex gap-5">
                <SearchInput/>
                <ModeToggle /> 
            </nav>

        </header>
    )
}