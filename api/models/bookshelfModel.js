const db = require('../../data/db-config');

const findAllBookshelfsByUserId = async (userId) => {
    return db('bookshelf').where({userId})
}

const findAllBookshelfsByUserId = async (userId) => {
    return db('bookshelf').where({userId})
}

const getAllBooksOfABookShelf = async (shelfId) => {
    return db('userShelfBook as usb').where("usb.shelfId",'=',shelfId).join('userBook as ub','ub.id','=','usb.bookId').join("books as b", 'b.id','=','ub.id')
}

module.exports = {findAllBookshelfsByUserId,getAllBooksOfABookShelf}