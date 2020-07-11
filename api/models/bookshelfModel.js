const db = require('../../data/db-config');

const findAllBookshelfsByUserId = async (userId) => {
    return db('bookshelf').where({userId})
}

const findAllBookshelfsByUserId = async (userId) => {
    return db('bookshelf').where({userId})
}

const getAllBooksOfABookShelf = async (shelfId) => {
    return db('userShelfBook as usb').where("usb.shelfId",'=',shelfId).join('userBook as ub','ub.id','=','usb.bookId').join("books as b", 'b.id','=','ub.id').join('readingStatuses as rs', 'rs.id','=','ub.readingStatusId').select([
        'usb.shelfId',
        'usb.bookId',
        'rs.name as readingStatus',
        'b.title',
        'b.thumbnail'
    ])
}
const insertBook = async(userShelfBook) => {
    return db('userShelfBook').insert(userShelfBook)
}
const insert = async (bookshelf) => {
    const [id] = await db('bookshelf').insert(bookshelf).select('id')
    return findById
}

const findById = (id) => {
    return db('bookshelf').where({id})
}

const remove = (id) => {
    return db('bookshelf').del().where({id})
}

module.exports = {findAllBookshelfsByUserId,getAllBooksOfABookShelf,insert,findById,remove}