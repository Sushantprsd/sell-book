const Book = require("../../model/Book");

module.exports = {
    getBookOnPage: async ({ key }, req) => {
        const currentPage = key || 1;
        const perPage = 10;
        let books = null;
        try {
            let count = await Book.count();
            books = await Book.find()
                .sort({ createdAt: -1 })
                .skip((currentPage - 1) * perPage)
                .limit(perPage);
            return {
                books,
                count: count,
            };
        } catch (err) {
            const error = new Error("Internal server error");
            error.data = error;
            error.code = 500;
            throw error;
        }
    },
    getOneBook: async ({ bookId }) => {
        let book = null;
        try {
            book = await Book.findById(bookId);
            return {
                ...book._doc,
            };
        } catch (err) {
            const error = new Error("Internal server error");
            error.code = 500;
            throw error;
        }
    },
    getSearchResult: async ({ title }) => {
        let books = null;
        if (!title) {
            return {
                books,
            };
        }
        try {
            books = await Book.find({
                title: {
                    $regex: new RegExp(title),
                },
            }).sort("title");
            return {
                books:books,
            };
        } catch (err) {
            const error = new Error("Internal server error");
            error.data = error;
            error.code = 500;
            throw error;
        }
    },
    getRandomBook: async ({ size }) => {
        let books = null;
        try {
            books = await Book.aggregate([{ $sample: { size: size } }]);
            return {
                books:books,
            };
        } catch (err) {
            const error = new Error("Internal server error");
            error.data = error;
            error.code = 500;
            throw error;
        }
    },
};
