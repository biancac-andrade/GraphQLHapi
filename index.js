const hapi = require('hapi')
const mongoose = require('mongoose')
const User = require('./models/User')

const { graphqlHapi, graphiqlHapi } = require('apollo-server-hapi')
const schema = require('./graphql/schema')

const api = hapi.Server({
    port:3000,
    host: 'localhost'
})


/*const start = async () => {
    await api.start()
console.log(`Api executando em: ${api.info.port}`)
}*/

mongoose.connect('mongodb+srv://biancac-andrade:<password>.@cluster0.kswsn.mongodb.net/teste?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.connection.once('open', () => {
  console.log('conectado ao mongodb')
})

const start = async () => {
     await api.register({
         plugin: granphqlHapi,
         options:{
             path: '/graphql',
             graphqlOptions:{
                 schema
             }, 
             route:{
                 cors: true
             }
         }
     })
     await api.register({
        plugin: graphiqlHapi,
        options: {
          path: '/graphiql',
          graphiqlOptions: {
            endpointURL: '/graphql'
          },
          route: {
            cors: true
          }
        }
      })


  api.route([
    {
        method: 'GET',
        path: '/',
        handler:(req, res) => {
            return `Hello World`
        }
    },
    {
        method: 'GET',
        path: '/v1/users',
        handler: (req, res) => {
            return User.find()
        }
    },
    {
        method: 'POST',
        path: '/v1/users',
        handler: (req, res) => {
            const { nome, email, idade, sitesPreferidos } = req.payload
            const user = new User({
                nome, 
                email,
                idade,
                sitesPreferidos
            })
            return user.save()
        }
    }
    
])
    await api.start()
    console.log(`API sendo executada na porta: ${api.info.port}`)
}

start()