const Book = require("../../model/Book");
const User = require("../../model/User");
const Order = require("../../model/Order");
const stripe = require("stripe")(process.env.SECRET_KEY);
const { cloudinary } = require("../../util/clodinary.js");

module.exports = {
    addBook: async ({ bookInput }, req) => {
        const title = bookInput.title;
        const price = bookInput.price;
        const description = bookInput.description;
        const imageUrl = bookInput.imageUrl;
        const sellingType = bookInput.sellingType;
        const tags = bookInput.tags;
        const author = bookInput.author;
        try {
            const photo = await cloudinary.uploader.upload(imageUrl, {
                upload_preset: "dev_setups",
            });
            const newBook = new Book({
                title: title,
                price: price,
                description: description,
                imageUrl: photo.url,
                userId: req.userId,
                author: author,
                sellingType: sellingType,
                tags: tags,
            });
            let createdBook = await newBook.save();
            return {
                ...createdBook._doc,
            };
        } catch (err) {
            const error = new Error("Upload err");

            error.code = 500;
            throw error;
        }
    },
    getAllUserBooks: async ({}, req) => {
        try {
            let books = await Book.find({ userId: req.userId });
            return {
                books: books,
            };
        } catch (err) {
            const error = new Error("Internal server error");

            error.code = 500;
            throw error;
        }
    },
    getAllUserBooksOnPage: async ({ key }, req) => {
        const currentPage = key || 1;
        const perPage = 10;
        try {
            let books = await Book.find({ userId: req.userId })
                .sort({ createdAt: -1 })
                .skip((currentPage - 1) * perPage)
                .limit(perPage);
            return {
                books: books,
            };
        } catch (err) {
            const error = new Error("Internal server error");

            error.code = 500;
            throw error;
        }
    },
    fetchBookToEdit: async ({ bookId }, req) => {
        try {
            let book = await Book.findById(bookId);
            if (!book) {
                const error = new Error("Internal server error");
                error.code = 500;
                throw error;
            }
            if (book.userId.toString() !== req.userId.toString()) {
                const error = new Error("Internal server error");
                error.code = 500;
                throw error;
            }
            return {
                ...book._doc,
            };
        } catch (err) {
            const error = new Error("Internal server error");
            error.code = 500;
            throw error;
        }
    },
    editBook: async ({ bookId, bookInput }, req) => {
        let book = null;
        try {
            book = await Book.findById(bookId);
            if (!book || book.userId.toString() != req.userId) {
                const error = new Error("Not Authorized");

                error.code = 422;
                throw error;
            }
        } catch (err) {
            const error = new Error("Not Authorized");

            error.code = 422;
            throw error;
        }
        let imageUrl = bookInput.imageUrl;
        if (book.imageUrl !== bookInput.imageUrl) {
            let oldImageUrl = book.imageUrl;
            let oldImageUrlId = "dev_setups/" + oldImageUrl.split("/").pop();
            const photo = await cloudinary.uploader.upload(imageUrl, {
                upload_preset: "dev_setups",
            });
            oldImageUrlId = oldImageUrlId.split(".");

            let temp = await cloudinary.uploader.destroy(oldImageUrlId[0]);
            book.imageUrl = photo.url;
        }
        book.title = bookInput.title;
        book.price = bookInput.price;
        book.description = bookInput.description;
        book.sellingType = bookInput.sellingType;
        try {
            let createdBook = await book.save();
            return {
                ...createdBook._doc,
            };
        } catch (err) {
            const error = new Error("Internal server error");
            error.code = 500;
            throw error;
        }
    },
    deleteProduct: async ({ bookId }, req) => {
        let book = null;
        try {
            book = await Book.findById(bookId);
            if (book.userId.toString() !== req.userId.toString()) {
                const error = new Error("Not Authorized");
                error.code = 422;
                throw error;
            }
            let oldImageUrl = book.imageUrl;
            let oldImageUrlId = "dev_setups/" + oldImageUrl.split("/").pop();
            oldImageUrlId = oldImageUrlId.split(".");
            let temp = await cloudinary.uploader.destroy(oldImageUrlId[0]);
            await Book.findByIdAndRemove(bookId);
            let users = await User.find({ "cart.items.productId": bookId.toString() });
            var results = await Promise.all(
                users.map(async (user) => {
                    await user.removeFromCart(book);
                }),
            );
            return true;
        } catch (err) {
            const error = new Error("Not Authorized");
            error.code = 422;
            throw error;
        }
    },
    addBookMark: async ({ bookId }, req) => {
        try {
            book = await Book.findById(bookId);
            if (book.userId.toString() != req.userId) {
                const error = new Error("Not Authorized");
                error.code = 422;
                throw error;
            }
        } catch (err) {
            const error = new Error("Not Authorized");

            error.code = 422;
            throw error;
        }
    },
    addBookToCart: async ({ bookId }, req) => {
        try {
            const book = await Book.findById(bookId);
            const user = await req.user.addToCart(book);
            return {
                ...book._doc,
            };
        } catch (err) {
            const error = new Error("Internal Server Error");

            error.code = 500;
            throw error;
        }
    },
    fetchCart: async ({}, req) => {
        try {
            let user = await req.user.populate("cart.items.productId").execPopulate();

            return { items: user.cart.items, cartPrice: user.cart.cartPrice };
        } catch (err) {
            const error = new Error("Internal Server Error");
            error.code = 500;
            throw error;
        }
    },
    removeFromCart: async ({ bookId }, req) => {
        try {
            const book = await Book.findById(bookId);
            const user = await req.user.removeFromCart(book);
            return {
                ...book._doc,
            };
        } catch (err) {
            const error = new Error("Internal Server Error");

            error.code = 500;
            throw error;
        }
    },
    checkoutProduct: async ({ stripeToken }, req) => {
        try {
            const token = stripeToken;
            const products = req.user.cart.items.map((i) => {
                return { quantity: i.quantity, productData: { ...i.productId._doc } };
            });

            const order = new Order({
                user: {
                    email: req.user.email,
                    userId: req.userId,
                },
                products: products,
            });

            let newOrder = await order.save();
            let totalSum = req.user.cart.cartPrice;
            const charge = stripe.charges.create({
                amount: totalSum * 100,
                currency: "INR",
                description: "Demo Order",
                source: token,
                metadata: { order_id: newOrder._id.toString() },
            });

            await req.user.clearCart();

            return true;
        } catch (err) {
            const error = new Error("Internal Server Error");
            error.code = 500;
            throw error;
        }
    },
};
