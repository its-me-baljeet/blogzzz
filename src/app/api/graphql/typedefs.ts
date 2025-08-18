import { gql } from "graphql-request";

export const typeDefs = gql`
  type Query {
    blog(id: String): Blog
    blogs: [Blog]
    searchBlogs(q: String) : [Blog]
    currentUser: User
    currentUserBlogs(id: String): [Blog]
    getSelectedUserBlogs(id: String!): [Blog]
    getSuggestions(q: String): [Blog]
  }
    type Blog {
        id: String,
        title: String,
        content: String,
        imageUrl: String,
        user_id: String,
        user: User
    }
        type Mutation {
          createBlog(title: String!, content: String!, imageUrl: String) : Blog!
          deleteBlog(id: String!): Boolean!
          updateBlog(id: String!, title: String, content: String, imageUrl: String): Boolean!
          signupUser(name: String!, email: String!, password: String!): Boolean!
          loginUser(email: String!, password: String!): Boolean!
          logoutUser: Boolean
        }

        type User {
          id: String,
          name: String,
          email: String,
          blogs : [Blog]
        }
`;