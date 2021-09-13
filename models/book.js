const mongoose = require('mongoose')
//multer remarks const path = require('path') //error on creating image. add path require

//multer remarks const coverImageBasePath = 'uploads/bookCovers'

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
    //comment with multer coverImageName:{
    coverImage:{        
        //comment with multer type : String,
        type : Buffer,
        required: true    
    },
    //add with filepond json 64
    coverImageType:{        
        type : String,
        required: true    
    },    
    author:{
        type : mongoose.Schema.Types.ObjectId, //this is want to reference schema autho tha created before
        required: true,
        ref : 'Author' //name must be same as the model. reference author.js |find me author|
    }    
})

/*when using multer bookSchema.virtual('coverImagePath').get(function() {
    if (this.coverImageName != null) {
      return path.join('/', coverImageBasePath, this.coverImageName)
    }
  })
*/
/*create virtual parameters like above, but inside we can custom its value */
bookSchema.virtual('coverImagePath').get(function() {
    if (this.coverImage != null && this.coverImageType != null) {    
        //return buffer data to view as image with data buffer base64
        return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}` 
    }
})

//Book is name of table inside database mongodb
module.exports = mongoose.model('Book', bookSchema)
//multer remarks module.exports.coverImageBasePath = coverImageBasePath //set convert image base path variabel path