const mongoose= require('mongoose');

// new mongoose.Schema 
const dbschema = new mongoose.Schema({
    name: String,
    age: Number
})

module.exports = mongoose.model('Dbs', dbschema);