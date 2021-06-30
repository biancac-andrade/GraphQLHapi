const graphql = require('graphql')
const Usertype = require('./UserType')
const User = require('./../models/User')

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      user: {
        type: Usertype,
        args: { id: { type: GraphQLString } },
        resolve(parent, args) {
          return User.findById(args.id)
        }
      }
    }
  })

module.exports = new GraphQLSchema({
    query: RootQuery
})