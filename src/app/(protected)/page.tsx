import BlogCard, { BlogWithUser } from "@/components/blogCard";
import gqlClient from "@/services/graphql";
import { gql } from "graphql-request";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const GET_BLOGS = gql`
  query Query {
    blogs {
      id
      imageUrl
      title
      content
      user_id
      user {
        name
        email
        id
      }
    }
  }
`;

export default async function Home() {
  const resp: { blogs: BlogWithUser[] } = await gqlClient.request(GET_BLOGS);
  const blogs = resp.blogs;

  return (
    <main className="min-h-[calc(100vh-56px)] w-full px-4 sm:px-6 py-8">
      <div className="max-w-7xl mx-auto space-y-6 w-full">
        <div className="px-1 sm:px-0">
          <h1 className="text-2xl font-bold tracking-tight">Latest Blogs</h1>
          <p className="text-muted-foreground text-sm">
            Explore recent posts from our community.
          </p>
        </div>

        <Separator />

        {blogs.length > 0 ? (
          <section className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </section>
        ) : (
          <Card className="flex items-center justify-center h-64">
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                No blogs available yet. Check back later!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
