const express = require('express');
const authRequired = require('../middleware/authRequired');
const userProfileExists = require('../middleware/userProfileExists');
const BookShelf = require("../models/bookshelfModel");
const router = express.Router();

// GET ALL BOOKSHELFS OF USER
router.get('/:userId', [authRequired, userProfileExists], async function (req, res) {
    try {
        const bookshelfsHash = {}
        const bookshelfs = await BookShelf.findAllBookshelfsByUserId(req.user.id);
        const bookshelfsPromises = bookshelfs.map(bookshelf => BookShelf.getAllBooksOfABookShelf(bookshelf.id))
        const booksResponse = await Promise.all(bookshelfsPromises)
        booksResponse.forEach(x => {
            if(x){
               bookshelfsHash[x[0].shelfId] = x 
            }
        })
        bookshelfs.forEach(x => x.books = bookshelfsHash[x.id] || [])
        return res.status(200).json(bookshelfs)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Server Error"})
    }
  });

  router.post('/:bookshelfId', [authRequired], async function (req, res) {
    try {
        const bookshelf = "bookshelvs"
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Server Error"})
    }
  });