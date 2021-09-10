const express = require('express')
const author = require('../models/author')
const router = express.Router()
const Author = require('../models/author')

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
        //res.redirect(`authors/${newAuthor.id}`)
        res.redirect('authors')        
    } catch{
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating Author'
        })       
    }

})


module.exports = router