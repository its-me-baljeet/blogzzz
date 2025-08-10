import Header from "@/components/header/header";
import { ReactNode } from "react";

export default function Layout({ children }: {
    children: ReactNode
}) {
    return (
        <div className="h-full w-full">
            <Header />
            {children}
        </div>
    )
}