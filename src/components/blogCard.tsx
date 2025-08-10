'use client'
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { EditIcon, Trash2 } from "lucide-react";
import { gql } from "graphql-request";
import db from "@/services/prisma";
import gqlClient from "@/services/graphql";
import { toast } from "sonner";
import EditDialog from "./dialogs/editBlogDialog";
import { Blog } from "../../generated/prisma";

const DELETE_BLOG = gql`
mutation DeleteBlog($deleteBlogId: String!) {
  deleteBlog(id: $deleteBlogId)
}
`
export default function BlogCard({ blog }: {
  blog: Blog
}) {
  async function handleDelete() {
    try {
      const data: {
        deleteBlog: boolean
      } = await gqlClient.request(DELETE_BLOG, {
        deleteBlogId: blog.id
      });
      if (data.deleteBlog) toast.success("Blog deleted!");
      else toast.error("Unable to delete blog!");
    } catch (error) {
      console.error(error);
      toast.error("Error occured!")
    }
  }
  return (
    <Card key={blog.id}>
      <CardHeader className="relative h-48 w-full">
        <Image src={blog.imageUrl || "https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg"} fill alt="image" priority></Image>
      </CardHeader>
      <CardContent>
        <p className="text-lg font-medium">{blog.title}</p>
        <p className="text-sm font-medium text-muted-foreground">{blog.content}</p>
      </CardContent>
      <CardFooter>
        <Trash2 onClick={handleDelete} />
        <EditDialog blog={blog} />
      </CardFooter>
    </Card>
  )
}