const express = require('express')
const router = express.Router()
const Book = require('../models/book')
const Author = require('../models/author')
// const multer = require('multer') //npm
const path = require('path') //built in nodejs
//multer remarks const uploadPath = path.join('public', Book.coverImageBasePath) //use built in lib path for join base path and image path
const imageMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']
const fs = require('fs') //built in nodejs



//Set Storage Engine
/*comment out multer dependencies because now using upload with base64 json encode */
// const storage = multer.diskStorage({
//     destination: uploadPath, // upload file
//     filename: function (req, file, callback) { //get file id name, then date now, and concat with its extension
//         callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });

// const fileFilter = (req, file, callback) => {
//     callback(null, imageMimeTypes.includes(file.mimetype))

// };

// const upload = multer({ storage: storage, fileFilter: fileFilter});

// All Books Route
router.get('/', async (req, res)=> {
    console.log(req.query)
    let query = Book.find() //use let cause const cant reassign value. here reasign. we can modify the query from here
    if(req.query.title != null && req.query.title != '' ){
        query = query.regex('title', new RegExp(req.query.title, 'i')) //title here is Book object model book.title. 'i' still mean no upper and case. and short keyword
    }
    if(req.query.publishedBefore != null && req.query.publishedBefore != '' ){
        query = query.lte('publishDate', req.query.publishedBefore) // lt means  less than, e means equal to. lte means less than equal to. check if publishDate(db field) <= publishedBefore
    }
    if(req.query.publishedAfter != null && req.query.publishedAfter != '' ){
        query = query.gte('publishDate', req.query.publishedAfter) // lt means  greates than, e means equal to. lte means greater than equal to. check if publishDate(db field) <= publishedBefore
    }

    try{
        //const books = await Book.find({})
        const books = await query.exec() //script to exec query that we modified
        
        res.render('books/index', {
            books: books,
            searchOptions: req.query
        })
    } catch{
        res.redirect('/')
    }


})

// New Books Route
router.get('/new', async (req,res) => {
    renderNewPage(res, new Book()) //parameters is response and book models
})

// Create Books Route - POST. upload single means single file name cover is the name of input file html
//comment out multer router.post('/', upload.single('cover'), async (req,res) => {
router.post('/', async (req,res) => {    
    /* remarks multer upload
    console.log(req.body) // form fields
    console.log(req.file) // form files
    console.log('after')
    */

    //not using multer const fileName = req.file != null ? req.file.filename : null
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        publishDate: new Date(req.body.publishDate),
        pageCount: req.body.pageCount,
       //not using multer coverImageName: fileName,
        description: req.body.description
        
    })
    saveCover(book, req.body.cover)

    try{
        const newBook = await book.save() //save to models books. book with params above
        //res.redirect(`books/${newBook.id}`)
        res.redirect('books')

    } catch(err){
       //console.log(err)
    // remarks cuz not using multer anymore   if(book.coverImageName != null){
    //         removeBookCover(book.coverImageName)
    //    }
       renderNewPage(res, book, true) 
    }

})

// remarks cuz not using multer anymore function removeBookCover(fileName){
//     fs.unlink(path.join(uploadPath, fileName), err => {
//         if(err){
//             console.log(err) //klo ada error, console.log
//         }
//     }) //remove file from folderpath that not created succesfully cuz hold by validation
// }

/*function render new page of book if succes or error */
async function renderNewPage(res,book, hasError = false){
    try{
        const authors = await Author.find({})
        
        const params = {
            authors: authors,
            book : book           
        }
        if(hasError){
            params.errorMessage = 'Error Creating Book \n'+ book //add by ben - information log
        }
        
        res.render('books/new', params)

    } catch {
        res.redirect('/books')
    }
}

function saveCover(book, coverEncoded){
    if(coverEncoded == null) return
    const cover = JSON.parse(coverEncoded)
    if(cover != null && imageMimeTypes.includes(cover.type)){ //cover.'type' refer fileencoded form in filepond
        /* book.coverImage = save model name coverImage
           new Buffer (model data is buffer)
           from source data that is cover.'data' refer to fileencoded file pond. and base64 is the type of cover.data
        */
        book.coverImage = new Buffer.from(cover.data, 'base64')
        book.coverImageType = cover.type
    }
}

module.exports = router