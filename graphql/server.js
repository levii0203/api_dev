const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const UserTypeDef = require('./typeDefs/user')
const UserResolvers = require('./resolvers/user')

const server = new ApolloServer({
    typeDefs:UserTypeDef,
    resolvers:UserResolvers
  });



  async function startServer() {
    const { url } = await startStandaloneServer(server, {
      listen: { port: 8050 },
    });
    console.log(`🚀 Server ready at ${url}`);
  }

module.exports = startServer