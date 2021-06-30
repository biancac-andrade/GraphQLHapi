const mongoose = require ('mongoose')
const Schema = mongoose.Schema


const userSchema = new Schema({
    nome: String, 
    email: String,
    idade: Number,
    sitesPreferidos: [String]
})

module.exports = mongoose.model('User', userSchema)