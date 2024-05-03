const booksDB = require("./books");

const getIndex = (bookId) => booksDB.findIndex((book) => book.id == bookId);

module.exports = { getIndex };
