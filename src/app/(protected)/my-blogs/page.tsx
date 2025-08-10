'use client'
import BlogCard from "@/components/blogCard";
import { getUserFromCookies } from "@/helper";
import gqlClient from "@/services/graphql";
import { gql } from "graphql-request";
import { useContext, useEffect, useState } from "react";
import { Blog } from "../../../../generated/prisma";
import { UserContext } from "@/context/userContext";

const CURRENT_USER_BLOGS = gql`
query CurrentUserBlogs($currentUserBlogsId: String!) {
  currentUserBlogs(id: $currentUserBlogsId) {
    title
    imageUrl
    content
  }
}
`

export default function Page(){

    const [userBlogs, setUserBlogs] = useState<Blog[]>([]);
    const context = useContext(UserContext);
    const user = context?.user;
    useEffect(()=>{
      async function getCurrentUserBlogs(){
        if(user){
                const res:{
                    currentUserBlogs : Blog[]
                } = await gqlClient.request(CURRENT_USER_BLOGS,{
                    currentUserBlogsId : user.id
                });
                if(res.currentUserBlogs) setUserBlogs(res.currentUserBlogs);
            }
        }
        getCurrentUserBlogs();
    },[user]);

    if(!userBlogs.length){
        <p>No blogs!</p>
    }
    return(
        <main>
            <main className="h-[calc(100vh-56px)] p-5">
                  <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {
                    userBlogs.map(blog => {
                      return <BlogCard key={blog.id} blog={blog}/>
                    })
                  }
                  </section>
                </main>
        </main>
    )
}