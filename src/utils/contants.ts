import { gql } from "graphql-request";

export const CURRENT_USER_BLOGS = gql`
query CurrentUserBlogs($currentUserBlogsId: String!) {
  currentUserBlogs(id: $currentUserBlogsId) {
    id
    title
    imageUrl
    content
    user_id
    user{
      name
      email
      id
    }
  }
}
`
export const GET_BLOGS = gql`
  query Query {
    blogs {
      id
      imageUrl
      title
      content
      user_id
      user {
        name
        email
        id
      }
    }
  }
`;