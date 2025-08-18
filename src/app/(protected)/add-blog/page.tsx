'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import gqlClient from "@/services/graphql";
import { gql } from "graphql-request";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { Blog } from "../../../../generated/prisma";
import { useRouter } from "next/navigation";

const CREATE_BLOG = gql`
mutation CreateBlog($title: String!, $content: String!, $imageUrl: String){
  createBlog(title: $title, content: $content, imageUrl: $imageUrl){
    id
    imageUrl
    title
    content
  }
}
`

export default function AddBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("Title and Content can't be empty!");
      return;
    }
    try {
      setLoading(true);
      const isImageNull = imageUrl === "" ? null : imageUrl;
      const res: { createBlog: Blog } = await gqlClient.request(CREATE_BLOG, {
        title,
        content,
        imageUrl: isImageNull,
      });

      if (res.createBlog) {
        toast.success("Blog created!");
        router.push("/");
      } else {
        toast.error("Failed to create Blog!");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      toast.error("Can't create blog!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="h-[calc(100vh-56px)] w-full flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl lg:max-w-2xl flex flex-col gap-5 p-5 border rounded-2xl shadow-md"
      >
        <h1 className="text-2xl font-semibold">Add Blog Details</h1>
        <Input
          type="text"
          placeholder="Enter blog title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="Enter blog content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[150px]"
        />
        <Input
          type="text"
          placeholder="Enter blog image URL..."
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <Button type="submit" className="self-end" disabled={loading}>
          {loading ? "Adding..." : "Add Blog"}
        </Button>
      </form>
    </main>
  );
}
