import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest } from "next/server";
import { createNewBlog, deleteBlogFromDB, getBlogById, getBlogs, searchBlogByQuery, updateBlog } from "./resolvers/blog";
import { typeDefs } from "./typedefs";
import { loginUser, signupUser } from "./resolvers/user";

const resolvers = {
  Query: {
    blog: getBlogById,
    searchBlogs: searchBlogByQuery,
    blogs : getBlogs
  },
  Mutation : {
    createBlog : createNewBlog,
    deleteBlog : deleteBlogFromDB,
    updateBlog,
    signupUser,
    loginUser
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
