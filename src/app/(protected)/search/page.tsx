import BlogCard, { BlogWithUser } from "@/components/blogCard";
import gqlClient from "@/services/graphql";
import { gql } from "graphql-request";
import { Card, CardContent } from "@/components/ui/card";

const GET_SEARCH_RESULTS = gql`
  query Query($q: String) {
    searchBlogs(q: $q) {
      id
      title
      content
      imageUrl
      user_id
      user {
        id
        name
        email
      }
    }
  }
`;

export default async function Page({ searchParams }: {
  searchParams: Promise<{ q: string }>
}) {
  const { q } = await searchParams;

  const res: {
    searchBlogs: BlogWithUser[];
  } = await gqlClient.request(GET_SEARCH_RESULTS, { q });

  const blogs = res.searchBlogs;

  return (
    <main className="min-h-full w-full bg-background text-foreground p-5">
      <header className="text-center">
        <h1 className="text-3xl font-bold">Search Results</h1>
        <p className="text-muted-foreground">
          Showing results for:{" "}
          <span className="font-semibold text-primary">"{q}"</span>
        </p>
      </header>

      {blogs.length > 0 ? (
        <section className="grid gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </section>
      ) : (
        <Card className="flex items-center justify-center">
          <CardContent className="text-center">
            <p className="text-muted-foreground">
              No results found for <span className="text-primary">"{q}"</span>
            </p>
          </CardContent>
        </Card>
      )}
    </main>
  );
}
