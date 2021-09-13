const express = require('express')
const router = express.Router()
const Book = require('../models/book')

router.get('/', async (req, res)=> {
    let books
    try{
        books = await Book.find().sort({createdAt: 'desc'}).limit(10).exec() //limit till 10 number and order by createdAt desc
    } catch{
        books = []
    }
    res.render('index', {books: books})    
})

module.exports = router