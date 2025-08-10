import { gql } from "graphql-request";

export const typeDefs = gql`
  type Query {
    blog(id: String): Blog
    blogs: [Blog]
    searchBlogs(q: String) : [Blog]
  }
    type Blog {
        id: String,
        title: String,
        content: String,
        imageUrl: String
    }
        type Mutation {
          createBlog(title: String!, content: String!, imageUrl: String) : Blog!
          deleteBlog(id: String!): Boolean!
          updateBlog(id: String!, title: String, content: String, imageUrl: String): Boolean!
          signupUser(name: String!, email: String!, password: String!): Boolean!
          loginUser(email: String!, password: String!): Boolean!
        }
`;