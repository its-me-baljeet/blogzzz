import { getUserFromCookies } from "@/helper";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest } from "next/server";
import { createNewBlog, deleteBlogFromDB, getBlogById, getBlogs, searchBlogByQuery, updateBlog } from "./resolvers/blog";
import { currentUserBlogs, loginUser, signupUser } from "./resolvers/user";
import { typeDefs } from "./typedefs";

const resolvers = {
  Query: {
    blog: getBlogById,
    searchBlogs: searchBlogByQuery,
    blogs : getBlogs,
    currentUser: getUserFromCookies,
    currentUserBlogs
  },
  Mutation : {
    createBlog : createNewBlog,
    deleteBlog : deleteBlogFromDB,
    updateBlog,
    signupUser,
    loginUser,
    
  }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
    context: async req => ({ req }),
});

export { handler as GET, handler as POST };

