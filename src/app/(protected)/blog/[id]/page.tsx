import { Card, CardContent, CardHeader } from "@/components/ui/card";
import gqlClient from "@/services/graphql";
import { gql } from "graphql-request";
import Image from "next/image";
import Link from "next/link";

const GET_BLOG = gql`
query Blog($blogId: String) {
  blog(id: $blogId) {
    id
    title
    content
    imageUrl
    user_id
    user {
      id
      name
    }
  }
}
`

export type UserWithNameId = {
  id: string
  name: string
}
export type BlogWithUser = {
  title: string,
  id: string,
  content: string,
  imageUrl: string,
  user: UserWithNameId
}

export default async function Page({ params }: {
  params: Promise<{
    id: string;
  }>
}) {
  const { id } = await params;

  const res: {
    blog: BlogWithUser
  } = await gqlClient.request(GET_BLOG, {
    blogId: id
    })
  const blog = res.blog;
  return (
    <main className="min-h-[calc(100vh-56px)] w-full  flex justify-center">
      <Card className="w-full max-w-6xl overflow-hidden shadow-lg rounded-2xl mx-10 my-5">
        <div className="flex flex-col lg:flex-row lg:items-center">
          <div className="relative w-full lg:w-[45%] min-h-[280px] lg:min-h-[600px] lg:my-auto">
            <Image
              src={
                blog.imageUrl ||
                "https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg"
              }
              alt="Blog image"
              fill
              className="object-cover"
              priority
            />
          </div>

          <CardContent className="w-full lg:w-[55%] flex flex-col justify-center p-8 lg:p-12 space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight">
              {blog?.title}
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {blog?.content}
            </p>
            <Link href={"/profile/" + blog.user.id}>
              <p className="ml-auto">~ {blog?.user.name}</p>
            </Link>
          </CardContent>
        </div>
      </Card>
    </main>
  );
}