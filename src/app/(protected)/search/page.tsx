import BlogCard from "@/components/blogCard";
import gqlClient from "@/services/graphql";
import { gql } from "graphql-request";
import { Blog } from "../../../../generated/prisma";

const GET_SEARCH_RESULTS = gql`
query Query($q: String){
  searchBlogs(q: $q) {
    id,
    title,
    content,
    imageUrl
  }
}
`
export default async function Page({ searchParams }: {
    searchParams: Promise<{
        q: string
    }>
}) {
    const { q } = await searchParams;

    const res: {
        searchBlogs: Blog[]
    } = await gqlClient.request(GET_SEARCH_RESULTS, {
        q: q
    });
    const blogs = res.searchBlogs;
    return (
        <main className="p-5">
            <h3>Showing Results for : <span>{q}</span></h3>
            <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {
                    blogs.map(blog => {
                        return <BlogCard key={blog.id} blog={blog}/>
                    })
                }
            </section>
        </main>
    )
}