const mongoose = require('mongoose')
const path = require('path') //error on creating image. add path require

const coverImageBasePath = 'uploads/bookCovers'

/* schema means table in sql databse. in mongo they call schema */
const bookSchema = new mongoose.Schema({
    title:{
        type : String,
        required: true
    },
    description:{
        type : String
    },    
    publishDate:{
        type : Date,
        required: true
    },    
    pageCount:{
        type : Number,
        required: true
    },       
    createdAt:{
        type : Date,
        required: true,
        default: Date.now
    }, 
    coverImageName:{
        type : String,
        required: true    
    },
    author:{
        type : mongoose.Schema.Types.ObjectId, //this is want to reference schema autho tha created before
        required: true,
        ref : 'Author' //name must be same as the model. reference author.js |find me author|
    }    
})

/*create virtual parameters like above, but inside we can custom its value */
bookSchema.virtual('coverImagePath').get(function() {
    if (this.coverImageName != null) {
      return path.join('/', coverImageBasePath, this.coverImageName)
    }
  })

//Book is name of table inside database mongodb
module.exports = mongoose.model('Book', bookSchema)
module.exports.coverImageBasePath = coverImageBasePath //set convert image base path variabel path