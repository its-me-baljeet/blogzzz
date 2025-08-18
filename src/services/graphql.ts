import { GraphQLClient } from "graphql-request";


const gqlClient = new GraphQLClient(`${process.env.NEXT_PUBLIC_HOST_NAME}/api/graphql`);

export default gqlClient;