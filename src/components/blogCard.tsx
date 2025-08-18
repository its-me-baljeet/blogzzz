"use client";

import { UserContext } from "@/context/userContext";
import gqlClient from "@/services/graphql";
import { gql } from "graphql-request";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";
import { toast } from "sonner";
import { Blog, User } from "../../generated/prisma";
import EditDialog from "./dialogs/editBlogDialog";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const DELETE_BLOG = gql`
  mutation DeleteBlog($deleteBlogId: String!) {
    deleteBlog(id: $deleteBlogId)
  }
`;

export type BlogWithUser = Blog & {
  user: User;
};

export default function BlogCard({ blog }: { blog: BlogWithUser }) {
  const { user } = useContext(UserContext);
  const router = useRouter();

  async function handleDelete() {
    try {
      const data: { deleteBlog: boolean } = await gqlClient.request(
        DELETE_BLOG,
        { deleteBlogId: blog.id }
      );
      if (data.deleteBlog) {
        toast.success("Blog deleted!");
        router.refresh();
      }
      else toast.error("Unable to delete blog!");
    } catch (error) {
      console.error(error);
      toast.error("Error occurred!");
    }
  }

  return (
    <Card key={blog.id} className="overflow-hidden flex flex-col p-0">
      <div className="relative h-40 w-full cursor-pointer" onClick={() => router.push("/blog/" + blog.id)}>
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
      <CardContent className="space-y-2 mt-2">
        <p className="text-lg font-semibold line-clamp-1 cursor-pointer" onClick={() => router.push("/blog/" + blog.id)}>{blog.title}</p>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {blog.content}
        </p>
      </CardContent>

      <CardFooter className="flex justify-between items-center mt-auto pb-4">
        <p className="text-xs font-medium cursor-pointer" onClick={()=>window.location.href = "/profile/"+blog.user.id}>{blog.user?.name}</p>

        {user && user.id === blog.user_id && (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDelete}
              className="text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <EditDialog blog={blog} />
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
