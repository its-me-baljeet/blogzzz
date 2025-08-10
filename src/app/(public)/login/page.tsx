'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import gqlClient from "@/services/graphql";
import { gql } from "graphql-request";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

const LOGIN_USER = gql`
mutation LoginUser($email: String!, $password: String!) {
  loginUser(email: $email, password: $password)
}
`
export default function Page() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (!email.trim() || !password.trim()) {
            toast.error("All fields are required");
            return;
        }

        try {
            const data: {
                loginUser: Boolean
            } = await gqlClient.request(LOGIN_USER, {
                email,
                password
            });

            if (data.loginUser) toast.success("User Logged In!");
            else toast.error("Can't Login user!");
        } catch (error) {
            console.error(error);
            toast.error("Error Occurred!");
        }
    }
    return (
        <main>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-5">
                <h2>Log In</h2>
                <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="enter email..." />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="enter password..." />
                </div>
                <Button type="submit" className="self-end">Log In</Button>
            </form>
        </main>
    )
}