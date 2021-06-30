const graphql = require('graphql')

const { GraphQLObjectType, GraphQLString } = graphql

const UserType = new GraphQLObjectType({
    name: 'Usuarios',
    fields:() => ({
        id: { type: GraphQLString }, 
        nome: { type: GraphQLString },
        email: { type: GraphQLString }, 
        //idade: { type: GraphQLEnumType }, 
        sitesPreferidos: {type: GraphQLString }
    })
})

module.exports = UserType