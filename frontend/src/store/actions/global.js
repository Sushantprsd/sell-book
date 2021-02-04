import * as actionTypes from "./actionTypes";
import Axios from "axios";
const IP = "https://sell-your-book.herokuapp.com/";
const GRAPHQL_URL = IP + "api/shop/";
export const setProductPage = (bookDetails) => {
    return {
        type: actionTypes.SET_PRODUCT_PAGE,
        bookDetails: bookDetails,
    };
};

export const setProductPageFalse = () => {
    return {
        type: actionTypes.SET_PRODUCT_PAGE_FALSE,
    };
};

export const fetchBookOnPageStart = () => {
    return {
        type: actionTypes.FETCH_BOOK_ON_PAGE_START,
    };
};

export const fetchBookOnPageSuccess = (books) => {
    return {
        type: actionTypes.FETCH_BOOK_ON_PAGE_SUCCESS,
        books: books,
    };
};

export const fetchBookOnPageFail = (error) => {
    return {
        type: actionTypes.FETCH_BOOK_ON_PAGE_FAIL,
        error: error,
    };
};

export const fetchBookOnPage = (key) => {
    return (dispatch) => {
        dispatch(fetchBookOnPageStart());
        let url = GRAPHQL_URL;
        Axios.post(url, {
            query: `query{
                    getBookOnPage(key:${key}){
                        books{
                        title,
                        description,
                        author,
                        tags,
                        imageUrl,
                        _id,
                        price
                      },
                      count
                    }
                  }`,
        })
            .then((response) => {
                dispatch(fetchBookOnPageSuccess(response.data.data.getBookOnPage));
            })
            .catch((err) => {
                dispatch(fetchBookOnPageFail(err.response.data.errors[0].message));
            });
    };
};

export const fetchProductStart = () => {
    return {
        type: actionTypes.FETCH_PRODUCT_START,
    };
};

export const fetchProductSuccess = (book) => {
    return {
        type: actionTypes.FETCH_PRODUCT_SUCCESS,
        book: book,
    };
};

export const fetchProductFail = (error) => {
    return {
        type: actionTypes.FETCH_PRODUCT_FAIL,
        error: error,
    };
};

export const fetchProduct = (bookId) => {
    return (dispatch) => {
        dispatch(fetchProductStart());
        let url = GRAPHQL_URL;
        Axios.post(url, {
            query: `query{
                getOneBook(bookId:"${bookId}"){
                title
                imageUrl
                tags
                description
                author
                price
                _id
                id
              }
            }`,
        })
            .then((response) => {
                if (response.data.errors) {
                    return dispatch(fetchProductFail(response.data.errors));
                } else {
                    dispatch(fetchProductSuccess(response.data.data.getOneBook));
                }
            })
            .catch((err) => {
                dispatch(fetchProductFail(err.response.data.errors[0].message));
            });
    };
};

export const fetchSearchResultsStart = () => {
    return {
        type: actionTypes.FETCH_SEARCH_RESULTS_START,
    };
};

export const fetchSearchResultsSuccess = (books) => {
    return {
        type: actionTypes.FETCH_SEARCH_RESULTS_SUCCESS,
        books: books,
    };
};

export const fetchSearchResultsFail = (error) => {
    return {
        type: actionTypes.FETCH_SEARCH_RESULTS_FAIL,
        error: error,
    };
};

export const fetchSearchResults = (title) => {
    return (dispatch) => {
        dispatch(fetchSearchResultsStart());
        let url = GRAPHQL_URL;
        Axios.post(url, {
            query: `query{
                getSearchResult(title:"${title}"){
                    books{
                        _id
                        title
                        author
                    }
                }
              }`,
        })
            .then((response) => {
                dispatch(fetchSearchResultsSuccess(response.data.data.getSearchResult.books));
            })
            .catch((err) => {
                dispatch(fetchSearchResultsFail(err.response.data.errors[0].message));
            });
    };
};

export const fetchTrendingBooksStart = () => {
    return {
        type: actionTypes.FETCH_TRENDING_START,
    };
};

export const fetchTrendingBooksSuccess = (books) => {
    return {
        type: actionTypes.FETCH_TRENDING_SUCCESS,
        books: books,
    };
};

export const fetchTrendingBooksFail = (error) => {
    return {
        type: actionTypes.FETCH_TRENDING_FAIL,
        error: error,
    };
};

export const fetchTrendingBooks = (size) => {
    return (dispatch) => {
        dispatch(fetchTrendingBooksStart());
        let url = GRAPHQL_URL;
        Axios.post(url, {
            query: `query{
                getRandomBook(size:${size}){
                  books{
                    title
                    author
                    description
                    price
                    _id
                    imageUrl
                    tags
                  }
                }
              }`,
        })
            .then((response) => {
                dispatch(fetchTrendingBooksSuccess(response.data.data.getRandomBook.books));
            })
            .catch((err) => {
                dispatch(fetchTrendingBooksFail(err.response.data.errors[0].message));
            });
    };
};

export const fetchRecommendedBooksStart = () => {
    return {
        type: actionTypes.FETCH_RECOMMENDED_START,
    };
};

export const fetchRecommendedBooksSuccess = (books) => {
    return {
        type: actionTypes.FETCH_RECOMMENDED_SUCCESS,
        books: books,
    };
};

export const fetchRecommendedBooksFail = (error) => {
    return {
        type: actionTypes.FETCH_RECOMMENDED_FAIL,
        error: error,
    };
};

export const fetchRecommendedBooks = (size) => {
    return (dispatch) => {
        dispatch(fetchRecommendedBooksStart());
        let url = GRAPHQL_URL;
        Axios.post(url, {
            query: `query{
                getRandomBook(size:${size}){
                  books{
                    title
                    author
                    description
                    price
                    _id
                    imageUrl
                    tags
                  }
                }
              }`,
        })
            .then((response) => {
                dispatch(fetchRecommendedBooksSuccess(response.data.data.getRandomBook.books));
            })
            .catch((err) => {
                dispatch(fetchRecommendedBooksFail(err.response.data.errors[0].message));
            });
    };
};
