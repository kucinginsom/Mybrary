const mongoose = require('mongoose')

/* schema means table in sql databse. in mongo they call schema */
const authorSchema = new mongoose.Schema({
    name:{
        type : String,
        required: true
    }
})

//Author is name of table inside database mongodb
module.exports = mongoose.model('Author', authorSchema)