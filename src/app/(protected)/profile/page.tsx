'use client'

import BlogCard, { BlogWithUser } from "@/components/blogCard";
import { UserContext } from "@/context/userContext";
import gqlClient from "@/services/graphql";
import { useContext, useEffect, useState } from "react";
import { CURRENT_USER_BLOGS } from "../my-blogs/page";
import Image from "next/image";

export default function Page() {
  const { user } = useContext(UserContext);
  const [userBlogs, setUserBlogs] = useState<BlogWithUser[]>([]);

  useEffect(() => {
    async function getCurrentUserBlogs() {
      if (user) {
        const res: { currentUserBlogs: BlogWithUser[] } =
          await gqlClient.request(CURRENT_USER_BLOGS, {
            currentUserBlogsId: user.id,
          });
        if (res.currentUserBlogs) setUserBlogs(res.currentUserBlogs);
      }
    }
    getCurrentUserBlogs();
  }, [user]);

  return (
    <main className="max-w-6xl mx-auto p-6 space-y-10">
      <section className="flex items-center gap-6 p-6 rounded-2xl shadow-lg">
        <Image
          src={ "/default_user.png"}
          alt={user?.name || "User Avatar"}
          width={100}
          height={100}
          className="rounded-full border border-muted-foreground object-cover bg-white"
        />
        <div>
          <h2 className="text-2xl font-bold">{user?.name}</h2>
          <p className="text-muted-foreground">{user?.email}</p>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-white mb-4">My Blogs</h3>
        {userBlogs.length === 0 ? (
          <p className="text-gray-400">You haven’t written any blogs yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {userBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
