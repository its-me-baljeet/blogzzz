'use client';
import { useEffect, useState } from "react";
import BlogCard, { BlogWithUser } from "@/components/blogCard";
import gqlClient from "@/services/graphql";
import { GET_BLOGS } from "@/utils/contants";

export default function Home() {
  const [blogs, setBlogs] = useState<BlogWithUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res: { blogs: BlogWithUser[] } = await gqlClient.request(GET_BLOGS);
        console.log(res)
        setBlogs(res.blogs);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  if (loading) return <p className="p-5">Loading blogs...</p>;

  return (
    <main className="min-h-[calc(100vh-56px)] w-full px-4 sm:px-6 py-8">
      <div className="max-w-7xl mx-auto space-y-6 w-full">
        <div className="px-1 sm:px-0">
          <h1 className="text-2xl font-bold tracking-tight">Latest Blogs</h1>
          <p className="text-muted-foreground text-sm">
            Explore recent posts from our community.
          </p>
        </div>

        <section className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {blogs.length > 0 ? (
            blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
          ) : (
            <p>No blogs available yet.</p>
          )}
        </section>
      </div>
    </main>
  );
}
