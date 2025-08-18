import { GraphQLClient } from "graphql-request";


const host = process.env.NEXT_PUBLIC_HOST_NAME || "http://localhost:3000";
const gqlClient = new GraphQLClient(`${host}/api/graphql`);

export default gqlClient;