const {
    getAllBooksHandler,
    getBookByIdHandler,
    addBookHandler,
    updateBookByIdhandler,
    deleteBookByIdHandler,
} = require("./handlers");

const routes = [
    {
        method: "GET",
        path: "/books",
        handler: getAllBooksHandler,
    },
    {
        method: "GET",
        path: "/books/{bookId}",
        handler: getBookByIdHandler,
    },
    {
        method: "POST",
        path: "/books",
        handler: addBookHandler,
    },
    {
        method: "PUT",
        path: "/books/{bookId}",
        handler: updateBookByIdhandler,
    },
    {
        method: "DELETE",
        path: "/books/{bookId}",
        handler: deleteBookByIdHandler,
    },
];

module.exports = routes;
