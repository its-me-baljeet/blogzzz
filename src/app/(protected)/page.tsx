import BlogCard from "@/components/blogCard";
import gqlClient from "@/services/graphql";
import { gql } from "graphql-request";
import { Blog } from "../../../generated/prisma";

const GET_BLOGS = gql`
query Query{
  blogs {
    id,
    imageUrl,
    title,
    content
  }
}
`
export default async function Home() {
  const resp:  {
    blogs: Blog[]
  }  = await gqlClient.request(GET_BLOGS);
  const blogs= resp.blogs;
  return (
    <main className="h-[calc(100vh-56px)] p-5">
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {
        blogs.map(blog => {
          return <BlogCard key={blog.id} blog={blog}/>
        })
      }
      </section>
    </main>
  );
}
