const express = require('express');
const authRequired = require('../middleware/authRequired');
const userProfileExists = require('../middleware/userProfileExists');
const BookShelf = require("../models/bookshelfModel");
const router = express.Router();

router.use(authRequired)

router.get('/:userId', [userProfileExists], getAllBookShelfsOfAUser);
router.post('/:userId', [userProfileExists], createABookShelf);
router.post('/bookshelf/:bookshelfId/userbook/:userbookId', addABookToBookShelf)


const createABookShelf = async (req, res) => {
    try {
        const bookshelf = {
            name: req.body.name,
            private: req.body.private || false,
            profileId: req.user.id
        }
        const newBookShelf = await BookShelf.insert(bookshelf)
        return res.json(201).json(newBookShelf)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Server Error"})
    }
  }

const getAllBookShelfsOfAUser = async (req, res) => {
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
  }

  const addABookToBookShelf = async (req, res) => {
    try {
        const userShelfBook = {
            bookId: req.params.userBookId,
            shelfId: req.params.bookshelfId
        }
        return res.status(200).json(bookshelfs)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Server Error"})
    }
  }

