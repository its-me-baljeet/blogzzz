'use client'
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SearchIcon } from "lucide-react";

export default function SearchInput(){
    const [input, setInput] = useState("");
    return(
        <form action="/search" className="flex gap-2">
            <Input name="q" id="query" value={input} onChange={e=> setInput(e.target.value)} className="" placeholder="search blogs..."/>
            <Button type="submit" variant="secondary"><SearchIcon/></Button>
        </form>
    )
}