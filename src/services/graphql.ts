import { GraphQLClient } from "graphql-request";

const HOST = process.env.HOSTNAME || "localhost";
const PORT = process.env.PORT || "3000";

const gqlClient = new GraphQLClient(`http://${HOST}:${PORT}/api/graphql`);

export default gqlClient;