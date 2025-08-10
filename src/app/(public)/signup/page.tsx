'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import gqlClient from "@/services/graphql";
import { gql } from "graphql-request";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

const SIGNUP_USER = gql`
mutation UpdateBlog($name: String!, $email: String!, $password: String!) {
  signupUser(name: $name, email: $email, password: $password)
}
`

export default function Page() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (!name.trim() || !email.trim() || !password.trim()) {
            toast.error("All fields are required");
            return;
        }

        try {
            const data: {
                signupUser: Boolean
            } = await gqlClient.request(SIGNUP_USER, {
                name,
                email,
                password
            });

            if (data.signupUser) toast.success("User Registered!");
            else toast.error("Can't create user!");
        } catch (error) {
            console.error(error);
            toast.error("Error Occurred!");
        }
    }
    return (
        <main>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-5">
                <h2>Register</h2>
                <div className="grid gap-3">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" value={name} onChange={e => setName(e.target.value)} placeholder="enter your name" />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="enter email..." />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="enter password..." />
                </div>
                <Button type="submit" className="self-end">Register</Button>
            </form>
        </main>
    )
}