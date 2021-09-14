const mongoose = require('mongoose')
const Book = require('./book') //include book.js file

/* schema means table in sql databse. in mongo they call schema */
const authorSchema = new mongoose.Schema({
    name:{
        type : String,
        required: true
    }
})

/*check constraint in mongoose. before remove check this function */
authorSchema.pre('remove', function(next) {
    //Book find is to find is there any book connected to this id. author: this.id means author the name of author id in Book models. means id author from mongosee
    Book.find({author: this.id}, (err, books) => {
        if(err){
            next(err)
        } else if(books.length > 0) {
            next(new Error('This author has books still'))
        }
        else{
            next() //next to remove the data
        }
    })
})

//Author is name of table inside database mongodb
module.exports = mongoose.model('Author', authorSchema) //|find me Author, ref: Book.js|