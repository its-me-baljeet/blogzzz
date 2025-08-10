'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";
import gqlClient from "@/services/graphql";
import { gql } from "graphql-request";
import { FormEvent, useState } from "react"
import { toast } from "sonner";
import { Blog } from "../../../../generated/prisma";

const CREATE_BLOG = gql`
mutation CreateBlog($title: String!, $content: String!, $imageUrl: String){
  createBlog(title: $title, content: $content, imageUrl: $imageUrl){
    id
    imageUrl
    title
    content
  }
}
`

export default function AddBlog(){
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    async function handleSubmit(e: FormEvent){
        e.preventDefault();
        if(!title.trim()|| !content.trim()){
            toast.error("Title and Content can't be empty!");
            return;
        }
        try{
            const isImageNull = imageUrl===""? null : imageUrl;
            const res: {
                createBlog: Blog
            } = await gqlClient.request(CREATE_BLOG, {
                title: title,
                content: content,
                imageUrl: isImageNull
            });
            if(res.createBlog){
                toast.success("Blog created!");
            }else{
                toast.error("Failed to create Blog!");
            }
        }catch(error){
            console.error("Error occured:", error);
            toast.error("Can't create blog!");
        }
    }
    return(
        <main className="h-[calc(100vh-56px)] w-full flex justify-center items-center">
            <form onSubmit={handleSubmit} className="w-full md:w-xl lg:w-2xl flex flex-col gap-5 p-5">
                <h1>Add Blog Details</h1>
                <Input type="text" placeholder="enter blog title..." value={title} onChange={e=>setTitle(e.target.value)}/>
                <Textarea placeholder="enter blog content" value={content} onChange={e=> setContent(e.target.value)}/>
                <Input type="text" placeholder="Enter blog image url..." value={imageUrl} onChange={e=>setImageUrl(e.target.value)}/>
                <Button type="submit" className="self-end">Add Blog</Button>
            </form>
        </main>
    )
}