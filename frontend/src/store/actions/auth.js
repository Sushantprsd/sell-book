import * as actionTypes from "./actionTypes";
import Axios from "axios";
const IP = "https://sell-your-book.herokuapp.com/";
const GRAPHQL_URL = IP + "api/user/";
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    };
};

export const authSuccess = (token, userDetails) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        user: userDetails,
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
    };
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    return {
        type: actionTypes.AUTH_LOGOUT,
    };
};

export const authLogin = (email, password) => {
    return (dispatch) => {
        dispatch(authStart());
        const body = {
            email: email,
            password: password,
        };
        let url = IP + "api/user/login";
        Axios.post(url, body)
            .then((response) => {
                if (!response.data.token) {
                    dispatch(authFail("Auth Failed"));
                }
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("userId", response.data.user.id);
                localStorage.setItem("userEmail", response.data.user.email);

                dispatch(authSuccess(response.data.token, response.data.user));
            })
            .catch((err) => {
                dispatch(authFail(err.response.data.message));
            });
    };
};

export const authSignUp = (email, password) => {
    return (dispatch) => {
        dispatch(authStart());
        const body = {
            email: email,
            password: password,
        };
        let url = IP + "api/user/signup";
        Axios.post(url, body)
            .then((response) => {
                if (!response.data.token) {
                    dispatch(authFail("Auth Failed"));
                }
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("userId", response.data.user.id);
                localStorage.setItem("userEmail", response.data.user.email);
                dispatch(authSuccess(response.data.token, response.data.user));
            })
            .catch((err) => {
                dispatch(authFail(err.response.data.message));
            });
    };
};

export const authCheckState = () => {
    return (dispatch) => {
        const token = localStorage.getItem("token");
        const id = localStorage.getItem("userId");
        const email = localStorage.getItem("userEmail");
        let user = {
            id,
            email,
        };
        if (!token) {
            dispatch(logout());
        } else {
            dispatch(authSuccess(token, user));
        }
    };
};

export const addProductFormStart = () => {
    return {
        type: actionTypes.ADD_PRODUCT_FORM_SUBMISSION_START,
    };
};

export const addProductFormSuccess = () => {
    return {
        type: actionTypes.ADD_PRODUCT_FORM_SUBMISSION_SUCCESS,
    };
};

export const addProductFormFail = (error) => {
    return {
        type: actionTypes.ADD_PRODUCT_FORM_SUBMISSION_FAIL,
        error: error,
    };
};

export const addNewProduct = (body) => {
    return (dispatch) => {
        dispatch(addProductFormStart());
        const token = localStorage.getItem("token");
        let url = GRAPHQL_URL;
        let tags = JSON.stringify(body.tags);
        Axios.post(
            url,
            {
                query: `mutation{
                    addBook(bookInput: {title:"${body.title}",author:"${body.author}", price:${body.price}, description:"${body.description}",sellingType:"sell",imageUrl:${body.fileUrl},tags:${tags}}) {
                     title
                    }
                  }`,
            },
            {
                headers: {
                    Authorization: "bearer " + token,
                },
            },
        )
            .then((response) => {
                dispatch(addProductFormSuccess());
            })
            .catch((err) => {
                dispatch(addProductFormFail(err.response.data.errors[0].message));
            });
    };
};

export const editProduct = (bookId, body) => {
    return (dispatch) => {
        dispatch(addProductFormStart());
        const token = localStorage.getItem("token");
        let url = GRAPHQL_URL;
        let tags = JSON.stringify(body.tags);
        Axios.post(
            url,
            {
                query: `mutation{
                    editBook(bookId:"${bookId}",bookInput: {title:"${body.title}",author:"${body.author}", price:${body.price}, description:"${body.description}",sellingType:"sell",imageUrl:${body.fileUrl},tags:${tags}}) {
                     title
                    }
                  }`,
            },
            {
                headers: {
                    Authorization: "bearer " + token,
                },
            },
        )
            .then((response) => {
                dispatch(addProductFormSuccess());
            })
            .catch((err) => {
                dispatch(addProductFormFail(err.response.data.errors[0].message));
            });
    };
};

export const addProductToCartStart = () => {
    return {
        type: actionTypes.ADD_PRODUCT_TO_CART_START,
    };
};

export const addProductToCartSuccess = () => {
    return {
        type: actionTypes.ADD_PRODUCT_TO_CART_SUCCESS,
    };
};

export const addProductToCartFail = (error) => {
    return {
        type: actionTypes.ADD_PRODUCT_TO_CART_FAIL,
        error: error,
    };
};
export const addProductToCart = (bookId) => {
    return (dispatch) => {
        dispatch(addProductToCartStart());
        const token = localStorage.getItem("token");
        let url = GRAPHQL_URL;
        Axios.post(
            url,
            {
                query: `mutation{
                    addBookToCart(bookId:"${bookId}"){
                     userId
                    }
                  }`,
            },
            {
                headers: {
                    Authorization: "bearer " + token,
                },
            },
        )
            .then((response) => {
                dispatch(addProductToCartSuccess());
                dispatch(resetProductAddedToCart());
            })
            .catch((err) => {
                dispatch(addProductToCartFail(err.response.data.errors[0].message));
            });
    };
};

export const resetProductAddedToCart = () => {
    return {
        type: actionTypes.RESET_PRODUCT_ADDED_TO_CART,
    };
};

export const fetchCartStart = () => {
    return {
        type: actionTypes.FETCH_CART_START,
    };
};

export const fetchCartSuccess = (cartItems) => {
    return {
        type: actionTypes.FETCH_CART_SUCCESS,
        cartItems: cartItems,
    };
};

export const fetchCartFail = (error) => {
    return {
        type: actionTypes.FETCH_CART_FAIL,
        error: error,
    };
};
export const fetchCart = () => {
    return (dispatch) => {
        dispatch(fetchCartStart());
        const token = localStorage.getItem("token");
        let url = GRAPHQL_URL;
        Axios.post(
            url,
            {
                query: `query{
                    fetchCart{
                      items{
                        productId{
                          title
                          _id
                          description
                          author
                          imageUrl
                          price
                          tags
                        }
                        quantity
                      },
                      cartPrice
                    }
                  }`,
            },
            {
                headers: {
                    Authorization: "bearer " + token,
                },
            },
        )
            .then((response) => {
                if (response.data.errors) {
                    return dispatch(fetchCartFail(response.data.errors));
                }
                dispatch(fetchCartSuccess(response.data.data.fetchCart));
            })
            .catch((err) => {
                dispatch(fetchCartFail(err.response));
            });
    };
};

export const removeFromCartStart = () => {
    return {
        type: actionTypes.REMOVE_FROM_CART_START,
    };
};

export const removeFromCartSuccess = () => {
    return {
        type: actionTypes.REMOVE_FROM_CART_SUCCESS,
    };
};

export const removeFromCartFail = (error) => {
    return {
        type: actionTypes.REMOVE_FROM_CART_FAIL,
        error: error,
    };
};

export const removeFromCart = (bookId) => {
    return (dispatch) => {
        dispatch(removeFromCartStart());
        const token = localStorage.getItem("token");
        let url = GRAPHQL_URL;
        Axios.post(
            url,
            {
                query: `mutation{
                    removeFromCart(bookId:"${bookId}"){
                     title
                    }
                  }`,
            },
            {
                headers: {
                    Authorization: "bearer " + token,
                },
            },
        )
            .then((response) => {
                if (response.data.errors) {
                    return dispatch(removeFromCartFail(response.data.errors));
                } else {
                    dispatch(removeFromCartSuccess());
                }
            })
            .catch((err) => {
                dispatch(removeFromCartFail(err.response.data.errors[0].message));
            });
    };
};

export const fetchUserProductsStart = () => {
    return {
        type: actionTypes.FETCH_USER_PRODUCTS_START,
    };
};

export const fetchUserProductsSuccess = (books) => {
    return {
        type: actionTypes.FETCH_USER_PRODUCTS_SUCCESS,
        books: books,
    };
};

export const fetchUserProductsFail = (error) => {
    return {
        type: actionTypes.FETCH_USER_PRODUCTS_FAIL,
        error: error,
    };
};

export const fetchUserProducts = () => {
    return (dispatch) => {
        dispatch(fetchUserProductsStart());
        const token = localStorage.getItem("token");
        let url = GRAPHQL_URL;
        Axios.post(
            url,
            {
                query: `query{
                    getAllUserBooks{
                    books{
                      _id,
                      imageUrl
                      title
                      price
                      author
                      description
                      tags
                    }
                    }
                  }`,
            },
            {
                headers: {
                    Authorization: "bearer " + token,
                },
            },
        )
            .then((response) => {
                if (response.data.errors) {
                    dispatch(fetchUserProductsFail(response.data.errors));
                }
                dispatch(fetchUserProductsSuccess(response.data.data.getAllUserBooks.books));
            })
            .catch((err) => {
                dispatch(fetchUserProductsFail(err.response.data.errors[0].message));
            });
    };
};

export const deleteUserProductStart = () => {
    return {
        type: actionTypes.DELETE_USER_PRODUCT_START,
    };
};

export const deleteUserProductSuccess = () => {
    return {
        type: actionTypes.DELETE_USER_PRODUCT_SUCCESS,
    };
};

export const deleteUserProductFail = (error) => {
    return {
        type: actionTypes.DELETE_USER_PRODUCT_FAIL,
        error: error,
    };
};

export const deleteUserProduct = (bookId) => {
    return (dispatch) => {
        dispatch(deleteUserProductStart());
        const token = localStorage.getItem("token");
        let url = GRAPHQL_URL;
        Axios.post(
            url,
            {
                query: `mutation{
                    deleteProduct(bookId:"${bookId}")
                  }`,
            },
            {
                headers: {
                    Authorization: "bearer " + token,
                },
            },
        )
            .then((response) => {
                if (response.data.errors) {
                    return dispatch(deleteUserProductFail(response.data.errors));
                } else {
                    dispatch(deleteUserProductSuccess());
                }
            })
            .catch((err) => {
                dispatch(deleteUserProductFail(err.response.data.errors[0].message));
            });
    };
};

export const fetchBookToEditStart = () => {
    return {
        type: actionTypes.FETCH_BOOK_TO_EDIT_START,
    };
};

export const fetchBookToEditSuccess = (book) => {
    return {
        type: actionTypes.FETCH_BOOK_TO_EDIT_SUCCESS,
        book: book,
    };
};

export const fetchBookToEditFail = (error) => {
    return {
        type: actionTypes.FETCH_BOOK_TO_EDIT_FAIL,
        error: error,
    };
};

export const fetchBookToEdit = (bookId) => {
    return (dispatch) => {
        dispatch(fetchBookToEditStart());
        const token = localStorage.getItem("token");
        let url = GRAPHQL_URL;
        Axios.post(
            url,
            {
                query: `query{
                    fetchBookToEdit(bookId:"${bookId}"){
                      _id,
                      title
                      author
                      tags
                      price
                      description
                      imageUrl
                    }
                  }`,
            },
            {
                headers: {
                    Authorization: "bearer " + token,
                },
            },
        )
            .then((response) => {
                if (response.data.errors) {
                    return dispatch(fetchBookToEditFail(response.data.errors));
                } else {
                    dispatch(fetchBookToEditSuccess(response.data.data.fetchBookToEdit));
                }
            })
            .catch((err) => {
                dispatch(fetchBookToEditFail(err.response.data.errors));
            });
    };
};

export const checkoutCartStart = () => {
    return {
        type: actionTypes.CHECKOUT_CART_START,
    };
};

export const checkoutCartSuccess = (book) => {
    return {
        type: actionTypes.CHECKOUT_CART_SUCCESS,
    };
};

export const checkoutCartFail = (error) => {
    return {
        type: actionTypes.CHECKOUT_CART_FAIL,
        error: error,
    };
};
export const checkoutCart = (stripeToken) => {
    return (dispatch) => {
        dispatch(checkoutCartStart());
        const token = localStorage.getItem("token");
        let url = GRAPHQL_URL;
        Axios.post(
            url,
            {
                query: `mutation{
                    checkoutProduct(stripeToken:"${stripeToken}")
                  }`,
            },
            {
                headers: {
                    Authorization: "bearer " + token,
                },
            },
        )
            .then((response) => {
                if (response.data.errors) {
                    return dispatch(checkoutCartFail(response.data.errors));
                } else {
                    dispatch(checkoutCartSuccess(response.data.data.fetchBookToEdit));
                }
            })
            .catch((err) => {
                dispatch(checkoutCartFail(err.response.data.errors));
            });
    };
};
