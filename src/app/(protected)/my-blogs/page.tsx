'use client'
import BlogCard, { BlogWithUser } from "@/components/blogCard";
import { UserContext } from "@/context/userContext";
import gqlClient from "@/services/graphql";
import { CURRENT_USER_BLOGS } from "@/utils/contants";
import { useContext, useEffect, useState } from "react";

export default function Page() {

  const [userBlogs, setUserBlogs] = useState<BlogWithUser[]>([]);
  const context = useContext(UserContext);
  const user = context?.user;
  useEffect(() => {
    async function getCurrentUserBlogs() {
      if (user) {
        const res: {
          currentUserBlogs: BlogWithUser[]
        } = await gqlClient.request(CURRENT_USER_BLOGS, {
          currentUserBlogsId: user.id
        });
        if (res.currentUserBlogs) setUserBlogs(res.currentUserBlogs);
      }
    }
    getCurrentUserBlogs();
  }, [user]);

  if (!userBlogs.length) {
    return (
      <main className="h-[calc(100vh-56px)] p-5 flex justify-center items-center">
        <p className="text-muted-foreground text-lg">No blogs!</p>
      </main>
    );
  }

  return (
      <main className="h-[calc(100vh-56px)] p-5">
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {
            userBlogs.map(blog => {
              return <BlogCard key={blog.id} blog={blog} />
            })
          }
        </section>
      </main>
  )
}