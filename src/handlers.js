const { nanoid } = require("nanoid");
const booksDB = require("./books");

const getIndex = (bookId) => booksDB.findIndex((book) => book.id == bookId);

const getAllBooksHandler = (request, h) => {
    const { name, reading, finished } = request.query;

    const filteredBooks = booksDB.filter((book) => {
        let isBookMatched = true;

        // Filtering by book name if the name query parameter is present
        if (
            name &&
            book.name &&
            !book.name
                .toLowerCase()
                .replace(/\s+/g, "")
                .includes(name.toLowerCase().replace(/\s+/g, ""))
        ) {
            isBookMatched = false;
        }

        // Filtering by reading status if the reading query parameter is present
        if (
            reading !== undefined &&
            book.reading !== (reading === "1")
        ) {
            isBookMatched = false;
        }

        // Filtering by finished status if the finished query parameter is present
        if (
            finished !== undefined &&
            book.finished !== (finished === "1")
        ) {
            isBookMatched = false;
        }

        return isBookMatched;
    });

    const books = filteredBooks.map((book) => ({
        id: booksDB.id,
        name: booksDB.name,
        publisher: booksDB.publisher,
    }));

    const response = h
        .response({ status: "success", data: { books } })
        .code(200);

    return response;
};

const getBookByIdHandler = (request, h) => {
    const { bookId } = request.params;

    const index = getIndex(bookId);

    if (index === -1) {
        const response = h
            .response({ status: "fail", message: "Buku tidak ditemukan" })
            .code(404);

        return response;
    }

    const book = booksDB.filter((book) => book.id === bookId)[0];

    const response = h
        .response({ status: "success", data: { book } })
        .code(200);

    return response;
};

const addBookHandler = (request, h) => {
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload;

    if (!name) {
        const response = h
            .response({
                status: "fail",
                message: "Gagal menambahkan buku. Mohon isi nama buku",
            })
            .code(400);

        return response;
    }

    if (readPage > pageCount) {
        const response = h
            .response({
                status: "fail",
                message:
                    "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
            })
            .code(400);

        return response;
    }

    const id = nanoid();

    const is_finish = pageCount === readPage;

    const insertedAt = new Date().toISOString();
    const updateAt = insertedAt;

    const newBook = {
        id,
        name,
        year: int(year),
        author,
        summary,
        publisher,
        pageCount: int(pageCount),
        readPage: int(readPage),
        finished: is_finish,
        reading,
        readPage,
        insertedAt,
        updateAt,
    };

    booksDB.push(newBook);

    const response = h
        .response({
            status: "success",
            message: "Buku berhasil ditambahkan",
            data: {
                bookId: id,
            },
        })
        .code(201);

    return response;
};

const updateBookByIdhandler = (request, h) => {
    const { bookId } = request.params;

    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload;

    const updateAt = new Date().toISOString();

    const index = getIndex(bookId);

    if (!name) {
        const response = h
            .response({
                status: "fail",
                message: "Gagal memperbarui buku. Mohon isi nama buku",
            })
            .code(400);

        return response;
    }

    if (readPage > pageCount) {
        const response = h
            .response({
                status: "fail",
                message:
                    "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
            })
            .code(400);

        return response;
    }

    if (index === -1) {
        const response = h
            .response({
                status: "fail",
                message: "Gagal memperbarui buku. Id tidak ditemukan",
            })
            .code(404);

        return response;
    }

    booksDB[index] = {
        ...booksDB[index],
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        updateAt,
    };

    const response = h
        .response({
            status: "success",
            message: "Buku berhasil diperbarui",
        })
        .code(200);

    return response;
};

const deleteBookByIdHandler = (request, h) => {
    const { bookId } = request.params;

    const index = getIndex(bookId);

    if (index === -1) {
        const response = h
            .response({
                status: "fail",
                message: "Buku gagal dihapus. Id tidak ditemukan",
            })
            .code(404);

        return response;
    }

    booksDB.splice(index, 1);

    const response = h.response({
        status: "success",
        message: "Buku berhasil dihapus",
    }).code(200);

    return response;
};

module.exports = {
    getAllBooksHandler,
    getBookByIdHandler,
    addBookHandler,
    updateBookByIdhandler,
    deleteBookByIdHandler,
};
