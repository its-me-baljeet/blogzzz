'use client'
import { Button } from "../ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Edit3Icon } from "lucide-react"
import { Textarea } from "../ui/textarea"
import { FormEvent, useState } from "react"
import { gql } from "graphql-request"
import { toast } from "sonner"
import gqlClient from "@/services/graphql"
import { Blog } from "../../../generated/prisma"
import { useRouter } from "next/navigation"

const UPDATE_BLOG = gql`
mutation UpdateBlog($updateBlogId: String!, $title: String, $content: String, $imageUrl: String) {
  updateBlog(id: $updateBlogId, title: $title, content: $content, imageUrl: $imageUrl)
}
`

export default function EditDialog({ blog }: {
    blog: Blog
}) {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState(blog.title);
    const [content, setContent] = useState(blog.content);
    const [imageUrl, setImageUrl] = useState(blog.imageUrl ?? "");
    const router = useRouter();

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (!title.trim() || !content.trim()) {
            toast.error("title and content can't be empty");
            return;
        }
        const res: {
            updateBlog: boolean
        } = await gqlClient.request(UPDATE_BLOG, {
            updateBlogId: blog.id,
            title: title,
            content: content,
            imageUrl: imageUrl
        })
        if (res.updateBlog) {
            toast.success("Blog updated!");
            setOpen(false);
            router.refresh();
        } else {
            toast.error("Unable to update blog!");
            return;
        }
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline"><Edit3Icon /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Edit Blog</DialogTitle>
                        <DialogDescription>
                            Make changes to your Blog here. Click save when you&apos;re
                            done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" name="title" value={title} onChange={e => setTitle(e.target.value)} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="content">Content</Label>
                            <Textarea id="content" name="content" value={content} onChange={e => setContent(e.target.value)} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="imageUrl">Image URL</Label>
                            <Input id="imageUrl" name="imageUrl" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}