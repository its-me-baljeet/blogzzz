import { LoaderPinwheelIcon } from "lucide-react";

export default function Page() {
    return (
        <main className="h-[calc(100vh-56px)] w-full flex justify-center items-center">
            <div className="animate-spin">
                <LoaderPinwheelIcon />
            </div>
        </main>
    )
}