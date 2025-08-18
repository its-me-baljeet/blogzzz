import { getUserFromCookies } from "@/helper";
import db from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { User } from "../../../../generated/prisma";
import { createNewBlog, deleteBlogFromDB, getBlogById, getBlogs, getBlogUser, getSelectedUserBlogs, getSuggestions, searchBlogByQuery, updateBlog } from "./resolvers/blog";
import { currentUserBlogs, loginUser, logoutUser, signupUser } from "./resolvers/user";
import { typeDefs } from "./typedefs";

const resolvers = {
  Query: {
    blog: getBlogById,
    searchBlogs: searchBlogByQuery,
    blogs : getBlogs,
    currentUser: getUserFromCookies,
    currentUserBlogs,
    getSelectedUserBlogs,
    getSuggestions
  },
  Mutation : {
    createBlog : createNewBlog,
    deleteBlog : deleteBlogFromDB,
    updateBlog,
    signupUser,
    loginUser,
    logoutUser
  },
  Blog : {
    user : getBlogUser
  },
  User: {
    blogs : async (user: User)=>{
      try{
        const blogs = await db.blog.findMany({
          where:{
            user_id: user.id
          }
        });
        return blogs;
      }catch(error){
        console.error(error);
      }
    }
  }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});



const handler = startServerAndCreateNextHandler(server, {
  context: async req => ({ req }),
});

export async function POST(req: NextRequest) {
  const res = NextResponse.json({ data: "your response" });

  // Add CORS headers
  res.headers.set("Access-Control-Allow-Origin", "*"); // allow all origins
  res.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  return res;
}

// Optional: handle OPTIONS preflight
export async function OPTIONS() {
  const res = NextResponse.json({});
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return res;
}
