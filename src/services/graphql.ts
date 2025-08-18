import { GraphQLClient } from "graphql-request";

const HOST = process.env.HOSTNAME || "localhost:3000";

const gqlClient = new GraphQLClient(`http://${HOST}/api/graphql`);

export default gqlClient;