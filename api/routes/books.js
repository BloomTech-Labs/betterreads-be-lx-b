const express = require('express');
const authRequired = require('../middleware/authRequired');
const checkForBooks = require('../middleware/booksCheckFor');
const checkForSingleBook = require('../middleware/checkForSingleBook');
const Books = require('../models/booksModel');
const router = express.Router();

router.get('/', checkForBooks, function (req, res) {
  Books.findAll()
    .then((books) => {
      res.status(200).json(books);
    })
    .catch((err) => {
      res.status(500).json({ message: 'Unable to retrieve books', err });
    });
});

router.get('/:bookId', checkForSingleBook, function (req, res) {
  Books.findById()
    .then((book) => {
      res.status(200).json(book);
    })
    .catch((err) => {
      res.status(500).json({ message: 'Unable to retrieve request book', err });
    });
});

module.exports = router;
