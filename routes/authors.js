const express = require('express')
const author = require('../models/author')
const router = express.Router()
const Author = require('../models/author')
const Book = require('../models/book')


// All Authors Route
router.get('/', async (req, res)=> {
    let searchOptions = {} //default empty js object. when we type then mongoose automaticaly list all name if pass empty object
    if(req.query.name != null && req.query.name !== ''){ /*req.query. query becasuse its GET method. when its POST. we used req.body. body */
       searchOptions.name = new RegExp(req.query.name, 'i') //RegEx here to use if search jo. we still get john. in 'i' there means not case sensitive. so it can be upper or lower case
    }
    try{
        //const authors = await Author.find({})//mongoose db to find all {} means we pass no value and it find all authors
        const authors = await Author.find(searchOptions)//mongoose db if there is param pass, means looking for that param
        res.render('authors/index', {
            authors: authors,
            searchOptions: req.query
        })
    } catch{
        res.redirect('/')
    }

})

// New Authors Route
router.get('/new', (req,res) => {
    res.render('authors/new', {author: new Author()})
})

// Create Authors Route - POST
router.post('/', async (req,res) => {
    const author = new Author({
        name : req.body.name
    })

    try{
        const newAuthor = await author.save() //.save() is function to save models on mongoose
        res.redirect(`/authors/${author.id}`)
        //res.redirect('authors')        
    } catch{
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating Author'
        })       
    }

})

//show page authors index
router.get('/:id', async (req,res) => {
    //req.params is what we define and id is we define before :id
    try{
        const author = await Author.findById(req.params.id)
        // add by ben .sort newest book
        const books = await Book.find({author: author.id}).sort({createdAt: 'desc'}).limit(6).exec() //find({author:author.id}) author first is the name of field on book model. author.id is passing params from variable author above
        res.render('authors/show', {
            author: author,
            booksByAuthor: books
        })
    } catch(err){
        //console.log(err)
        res.redirect('/')
    }
    //res.send('Show Author '+ req.params.id)
})

//edit route
router.get('/:id/edit', async (req,res) => {
    try{
        const author = await Author.findById(req.params.id) //built in function mongoose
        res.render('authors/edit', {author: author})
    } catch {
        res.redirect('/authors')
    }

})

//UPDATE. put method means update in rest
router.put('/:id', async (req,res) => {
    let author
    try{
        author = await Author.findById(req.params.id)
        author.name = req.body.name //update author name with new one and then save author
        await author.save() //.save() is function to save models on mongoose
        res.redirect(`/authors/${author.id}`)
        //res.redirect('authors')        
    } catch{
        if(author == null){
            res.redirect('/')
        } else {
            res.render('authors/edit', {
                author: author,
                errorMessage: 'Error Updating Author'
            }) 
        }
      
    }
})

//delete method means update in rest
router.delete('/:id', async (req,res) => {
    let author
    try{
        author = await Author.findById(req.params.id)
        await author.remove() //.remove() is function to delete models on mongoose
        res.redirect('/authors')    
    } catch{
        if(author == null){
            res.redirect('/')
        } else {
            res.redirect(`/authors/${author.id}`)
        }
      
    }
    
})


module.exports = router