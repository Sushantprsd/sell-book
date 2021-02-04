import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    productDetails: "",
    setProductPage: false,
    showProductPage: false,
    ip: "https://sell-your-book.herokuapp.com/",
    fetchLoading: false,
    fetchError: null,
    booksOnPage: [],
    totalBookCount: 0,
    bookCountPerPage: 10,
    fetchProduct: null,
    fetchProductLoading: false,
    fetchProductError: false,
    fetchSearchResults: [],
    fetchSearchResultsLoading: false,
    fetchSearchResultsError: null,
    fetchTrendingBooks: [],
    fetchTrendingBooksLoading: false,
    fetchTrendingBooksError: null,
    fetchRecommendedBook: [],
    fetchRecommendedBookLoading: false,
    fetchRecommendedBookError: null,
};

const setProductPage = (state, action) => {
    let prevProductState = !state.showProductPage;
    return updateObject(state, {
        productDetails: action.bookDetails,
        showProductPage: prevProductState,
    });
};

const setProductPageFalse = (state, action) => {
    return updateObject(state, {
        productDetails: "",
        showProductPage: false,
    });
};
const fetchBookOnPageStart = (state, action) => {
    return updateObject(state, {
        fetchLoading: true,
        fetchError: null,
        booksOnPage: [],
    });
};
const fetchBookOnPageSuccess = (state, action) => {
    return updateObject(state, {
        fetchLoading: false,
        fetchError: null,
        booksOnPage: action.books.books,
        totalBookCount: action.books.count,
    });
};
const fetchBookOnPageFail = (state, action) => {
    return updateObject(state, {
        fetchLoading: false,
        fetchError: action.error,
        booksOnPage: [],
    });
};

const fetchProductStart = (state, action) => {
    return updateObject(state, {
        fetchProduct: null,
        fetchProductLoading: true,
        fetchProductError: false,
    });
};
const fetchProductSuccess = (state, action) => {
    return updateObject(state, {
        fetchProduct: action.book,
        fetchProductLoading: false,
        fetchProductError: false,
    });
};
const fetchProductFail = (state, action) => {
    
    return updateObject(state, {
        fetchProductLoading: false,
        fetchProductError: action.error,
    });
};

const fetchSearchResultsStart = (state, action) => {
    return updateObject(state, {
        fetchSearchResultsLoading: true,
        fetchSearchResultsError: false,
    });
};
const fetchSearchResultsSuccess = (state, action) => {
    return updateObject(state, {
        fetchSearchResults: action.books,
        fetchSearchResultsLoading: false,
        fetchSearchResultsError: null,
    });
};
const fetchSearchResultsFail = (state, action) => {
    return updateObject(state, {
        fetchSearchResultsLoading: false,
        fetchSearchResultsError: action.error,
    });
};

const fetchTrendingBooksStart = (state, action) => {
    return updateObject(state, {
        fetchTrendingBooksLoading: true,
        fetchTrendingBooksError: false,
    });
};
const fetchTrendingBooksSuccess = (state, action) => {
    return updateObject(state, {
        fetchTrendingBooks: action.books,
        fetchTrendingBooksLoading: false,
        fetchTrendingBooksError: null,
    });
};
const fetchTrendingBooksFail = (state, action) => {
    return updateObject(state, {
        fetchTrendingBooksLoading: false,
        fetchTrendingBooksError: action.error,
    });
};
const fetchRecommendedBooksStart = (state, action) => {
    return updateObject(state, {
        fetchRecommendedBook: [],
        fetchRecommendedBookLoading: true,
        fetchRecommendedBookError: null,
    });
};
const fetchRecommendedBooksSuccess = (state, action) => {
    return updateObject(state, {
        fetchRecommendedBook: action.books,
        fetchRecommendedBookLoading: false,
        fetchRecommendedBookError: null,
    });
};
const fetchRecommendedBooksFail = (state, action) => {
    return updateObject(state, {
        fetchRecommendedBookLoading: false,
        fetchRecommendedBookError: action.error,
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_PRODUCT_PAGE:
            return setProductPage(state, action);
        case actionTypes.SET_PRODUCT_PAGE_FALSE:
            return setProductPageFalse(state, action);
        case actionTypes.FETCH_BOOK_ON_PAGE_START:
            return fetchBookOnPageStart(state, action);
        case actionTypes.FETCH_BOOK_ON_PAGE_SUCCESS:
            return fetchBookOnPageSuccess(state, action);
        case actionTypes.FETCH_BOOK_ON_PAGE_FAIL:
            return fetchBookOnPageFail(state, action);
        case actionTypes.FETCH_PRODUCT_START:
            return fetchProductStart(state, action);
        case actionTypes.FETCH_PRODUCT_SUCCESS:
            return fetchProductSuccess(state, action);
        case actionTypes.FETCH_PRODUCT_FAIL:
            return fetchProductFail(state, action);
        case actionTypes.FETCH_SEARCH_RESULTS_START:
            return fetchSearchResultsStart(state, action);
        case actionTypes.FETCH_SEARCH_RESULTS_SUCCESS:
            return fetchSearchResultsSuccess(state, action);
        case actionTypes.FETCH_SEARCH_RESULTS_FAIL:
            return fetchSearchResultsFail(state, action);
        case actionTypes.FETCH_TRENDING_START:
            return fetchTrendingBooksStart(state, action);
        case actionTypes.FETCH_TRENDING_SUCCESS:
            return fetchTrendingBooksSuccess(state, action);
        case actionTypes.FETCH_TRENDING_FAIL:
            return fetchTrendingBooksFail(state, action);
        case actionTypes.FETCH_RECOMMENDED_START:
            return fetchRecommendedBooksStart(state, action);
        case actionTypes.FETCH_RECOMMENDED_SUCCESS:
            return fetchRecommendedBooksSuccess(state, action);
        case actionTypes.FETCH_RECOMMENDED_FAIL:
            return fetchRecommendedBooksFail(state, action);
        default:
            return state;
    }
};

export default reducer;
