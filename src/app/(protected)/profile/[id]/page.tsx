'use client'

import BlogCard, { BlogWithUser } from "@/components/blogCard";
import { Card, CardContent } from "@/components/ui/card";
import gqlClient from "@/services/graphql";
import { gql } from "graphql-request";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

const SELECTED_BLOGS = gql`
query Query($userId: String!) {
  getSelectedUserBlogs(id: $userId) {
    user_id
    user {
      name
      id
      email
    }
    imageUrl
    content
    title
    id
  }
}
`

export default function Page() {
    const params = useParams();
    const { id } = params;

    const [blogs, setBlogs] = useState<BlogWithUser[]>([]);

    useEffect(() => {
        async function getData() {
            try{
                const res: {
                    getSelectedUserBlogs: BlogWithUser[]
                } = await gqlClient.request(
                    SELECTED_BLOGS,
                    { userId: id }
                );
                setBlogs(res.getSelectedUserBlogs);
            }catch(error){
                console.error(error);
                toast.error("Something went wrong!");
            }
        }
        getData();
    }, [id]);

    if (!blogs.length) {
        return (
            <p className="text-center text-gray-400 mt-10 text-lg">
                User not found
            </p>
        );
    }

    return (
        <main className="max-w-6xl mx-auto p-6 space-y-10">
            <section className="flex items-center gap-6 bg-background p-6 rounded-2xl shadow-lg">
                <Image
                    src={"/default_user.png"}
                    alt={blogs[0].user.name}
                    width={100}
                    height={100}
                    className="rounded-full border border-muted bg-white object-cover"
                />
                <div>
                    <h2 className="text-2xl font-bold">{blogs[0].user.name}</h2>
                    <p className="text-muted-foreground">{blogs[0].user.email}</p>
                </div>
            </section>

             {blogs.length > 0 ? (
                <section>
                    <h3 className="text-xl font-semibold text-white mb-4">
                        Blogs by {blogs[0].user.name}
                    </h3>
                    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {blogs.map((blog) => (
                            <BlogCard
                                key={blog.id}
                                blog={blog}
                            />
                        ))}
                    </div>
                </section>
            ) : (
                <Card className="flex items-center justify-center h-64">
                    <CardContent className="text-center">
                        <p className="text-gray-400">
                            No blogs available yet. Check back later!
                        </p>
                    </CardContent>
                </Card>
            )}
        </main>
    );
}
