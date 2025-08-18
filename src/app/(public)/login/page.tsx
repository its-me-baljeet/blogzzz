'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import gqlClient from "@/services/graphql";
import { gql } from "graphql-request";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

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

      if (data.loginUser) {
        toast.success("Login Successful!");
        window.location.href = "/";
      }
      else toast.error("Invalid Credentials!");
    } catch (error) {
      console.error(error);
      toast.error("Error Occurred!");
    }
  }

  return (
    <main className="flex justify-center items-center min-h-screen px-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 p-6 w-full max-w-md border rounded-xl shadow-md"
      >
        <h2 className="text-2xl font-semibold text-center">Login</h2>

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="enter email..."
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="enter password..."
          />
        </div>

        <Button type="submit" className="w-full">Login</Button>
        <p className="text-sm text-center text-muted-foreground">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-primary hover:underline">
            Register
          </Link>
        </p>
      </form>
    </main>
  )
}
