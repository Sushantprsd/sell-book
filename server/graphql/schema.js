const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type Book{
        id:ID
        _id:String!
        title:String! 
        price:Int!
        description:String!
        imageUrl:String!
        sellingType:String!
        userId:String!
        author:String!
        tags:[String]
        createdAt: String!
        updatedAt: String!
    }
    input BookInputData {
        title:String! 
        price:Int!
        description:String!
        imageUrl:String!
        sellingType:String!
        tags:[String!]
        author:String!
    }
    type Books{
        books: [Book!]!
        count:Int
    }
    type CartItem{
        productId:Book,
        quantity:Int
    }
    type Cart{
        items:[CartItem]
        cartPrice:Int
    }

    type RootQuery {
        getAllUserBooks:Books
        getAllUserBooksOnPage(key:Int):Books
        getOneBook(bookId:String):Book!
        getBookOnPage(key:Int):Books!
        fetchCart:Cart
        getSearchResult(title:String):Books
        getRandomBook(size:Int):Books!
        fetchBookToEdit(bookId:String):Book

       
    }
    type RootMutation {
        addBook(bookInput: BookInputData): Book!
        editBook(bookId:String,bookInput: BookInputData): Book!
        addBookMark(bookId:String):Book!
        deleteProduct(bookId:String):Boolean
        addBookToCart(bookId:String):Book!
        removeFromCart(bookId:String):Book!
        checkoutProduct(stripeToken:String):Boolean

    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
