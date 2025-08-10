import { Card, CardContent, CardHeader } from "@/components/ui/card";
import gqlClient from "@/services/graphql";
import { gql } from "graphql-request";
import Image from "next/image";

const GET_BLOG = gql`
query Query($blogId: String){
    blog (id:$blogId){
    title,
    content,
    imageUrl
  }
}
`

export default async function Page({ params }: {
    params: Promise<{
        id: string;
    }>
}) {
    const { id } = await params;

    const res = await gqlClient.request(GET_BLOG, {
        blogId: id
    })
    const blog = res.blog;
    console.log(blog.imageUrl)
    return (
        <main className="h-[calc(100vh-56px)] w-full p-5">
            <Card className="w-full md:w-3/5 lg:w-1/5">
                <CardHeader className="relative h-48 w-full">
                    <Image src={blog.imageUrl} fill alt="image" priority></Image>
                </CardHeader>
                <CardContent >
                    <h2>{
                        blog?.title
                    }</h2>
                    <p className="text-muted-foreground" >

                        {
                            blog.content
                        }
                    </p>
                </CardContent>
            </Card>
        </main>
    )
}