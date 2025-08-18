import { LoaderPinwheelIcon } from "lucide-react";

export default function Page() {
    return (
        <main className="h-full w-full flex justify-center items-center">
            <div className="animate-spin">
                <LoaderPinwheelIcon />
            </div>
        </main>
    )
}