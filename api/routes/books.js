const express = require('express');
const authRequired = require('../middleware/authRequired');
const checkForBooks = require('../middleware/booksCheckFor');
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

module.exports = router;
