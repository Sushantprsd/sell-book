import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    token: null,
    user: {},
    isAuthenticated: false,
    authError: null,
    authLoading: false,
    addProductFormLoading: false,
    addProductFormError: null,
    addProductFormSuccess: false,
    addProductToCartLoading: false,
    addProductToCarError: null,
    productAddedToCart: false,
    cartItems: [],
    fetchCartLoading: false,
    fetchCartError: null,
    cartPrice: 0,
    removeFromCartLoading: false,
    removeFromCarError: null,
    userProducts: [],
    fetchUserProductsLoading: false,
    fetchUserProductsError: null,
    userProductDeleted: false,
    deleteUserProductLoading: false,
    deleteUserProductError: null,
    fetchBookToEdit: null,
    fetchBookToEditLoading: false,
    fetchBookToEditError: null,
    checkoutCartLoading: false,
    checkoutCartError: null,
};

const authStart = (state, action) => {
    return updateObject(state, { authError: null, authLoading: true });
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        user: action.user,
        token: action.idToken,
        authError: null,
        authLoading: false,
        isAuthenticated: true,
    });
};

const authFail = (state, action) => {
    return updateObject(state, {
        authError: action.error,
        authLoading: false,
    });
};

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null,
        user: null,
        isAuthenticated: false,
        authLoading: false,
    });
};

const addProductFormStart = (state, action) => {
    return updateObject(state, {
        addProductFormLoading: true,
        addProductFormError: null,
        addProductFormSuccess: false,
    });
};
const addProductFormSuccess = (state, action) => {
    return updateObject(state, {
        addProductFormLoading: false,
        addProductFormError: null,
        addProductFormSuccess: true,
    });
};
const addProductFormError = (state, action) => {
    return updateObject(state, {
        addProductFormLoading: false,
        addProductFormError: action.error,
        addProductFormSuccess: false,
    });
};

const addProductToCartStart = (state, action) => {
    return updateObject(state, {
        addProductToCartLoading: true,
        addProductToCarError: null,
        productAddedToCart: false,
    });
};
const addProductToCartSuccess = (state, action) => {
    return updateObject(state, {
        addProductToCartLoading: false,
        addProductToCarError: null,
        productAddedToCart: true,
    });
};
const addProductToCartError = (state, action) => {
    return updateObject(state, {
        addProductToCartLoading: false,
        addProductToCarError: action.error,
        productAddedToCart: false,
    });
};

const resetProductAddedToCart = (state, action) => {
    return updateObject(state, {
        productAddedToCart: false,
    });
};

const fetchCartStart = (state, action) => {
    return updateObject(state, {
        fetchCartLoading: true,
        fetchCarError: null,
    });
};
const fetchCartSuccess = (state, action) => {
    return updateObject(state, {
        fetchCartLoading: false,
        fetchCarError: null,
        cartItems: action.cartItems.items,
        cartPrice: action.cartItems.cartPrice,
    });
};
const fetchCartError = (state, action) => {
    return updateObject(state, {
        fetchCartLoading: false,
        fetchCarError: action.error,
    });
};

const removeFromCartStart = (state, action) => {
    return updateObject(state, {
        removeFromCartLoading: true,
        removeFromCarError: null,
    });
};
const removeFromCartSuccess = (state, action) => {
    return updateObject(state, {
        removeFromCartLoading: false,
        removeFromCarError: null,
    });
};
const removeFromCartError = (state, action) => {
    return updateObject(state, {
        removeFromCartLoading: false,
        removeFromCarError: action.error,
    });
};

const fetchUserProductsStart = (state, action) => {
    return updateObject(state, {
        fetchUserProductsLoading: true,
        fetchUserProductsError: null,
    });
};
const fetchUserProductsSuccess = (state, action) => {
    return updateObject(state, {
        userProducts: action.books,
        fetchUserProductsLoading: false,
        fetchUserProductsError: null,
    });
};
const fetchUserProductsError = (state, action) => {
    return updateObject(state, {
        fetchUserProductsLoading: false,
        fetchUserProductsError: action.error,
    });
};

const deleteUserProductStart = (state, action) => {
    return updateObject(state, {
        userProductDeleted: false,
        deleteUserProductLoading: true,
        deleteUserProductError: null,
    });
};
const deleteUserProductSuccess = (state, action) => {
    return updateObject(state, {
        userProductDeleted: true,
        deleteUserProductLoading: false,
        deleteUserProductError: null,
    });
};
const deleteUserProductError = (state, action) => {
    return updateObject(state, {
        userProductDeleted: false,
        deleteUserProductLoading: false,
        deleteUserProductError: action.error,
    });
};

const resetUserProductDeleted = (state, action) => {
    return updateObject(state, {
        userProductDeleted: false,
    });
};

const fetchBookToEditStart = (state, action) => {
    return updateObject(state, {
        fetchBookToEdit: null,
        fetchBookToEditLoading: true,
        fetchBookToEditError: null,
    });
};
const fetchBookToEditSuccess = (state, action) => {
    return updateObject(state, {
        fetchBookToEdit: action.book,
        fetchBookToEditLoading: false,
        fetchBookToEditError: null,
    });
};
const fetchBookToEditError = (state, action) => {
    return updateObject(state, {
        fetchBookToEdit: null,
        fetchBookToEditLoading: false,
        fetchBookToEditError: action.error,
    });
};

const checkoutCartStart = (state, action) => {
    return updateObject(state, {
        checkoutCartLoading: true,
        checkoutCartError: null,
    });
};
const checkoutCartSuccess = (state, action) => {
    return updateObject(state, {
        checkoutCartLoading: false,
        checkoutCartError: null,
    });
};
const checkoutCartError = (state, action) => {
    return updateObject(state, {
        checkoutCartLoading: false,
        checkoutCartError: action.error,
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTH_FAIL:
            return authFail(state, action);
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action);
        case actionTypes.ADD_PRODUCT_FORM_SUBMISSION_START:
            return addProductFormStart(state, action);
        case actionTypes.ADD_PRODUCT_FORM_SUBMISSION_SUCCESS:
            return addProductFormSuccess(state, action);
        case actionTypes.ADD_PRODUCT_FORM_SUBMISSION_FAIL:
            return addProductFormError(state, action);
        case actionTypes.ADD_PRODUCT_TO_CART_START:
            return addProductToCartStart(state, action);
        case actionTypes.ADD_PRODUCT_TO_CART_SUCCESS:
            return addProductToCartSuccess(state, action);
        case actionTypes.ADD_PRODUCT_TO_CART_FAIL:
            return addProductToCartError(state, action);
        case actionTypes.RESET_PRODUCT_ADDED_TO_CART:
            return resetProductAddedToCart(state, action);
        case actionTypes.FETCH_CART_START:
            return fetchCartStart(state, action);
        case actionTypes.FETCH_CART_SUCCESS:
            return fetchCartSuccess(state, action);
        case actionTypes.FETCH_CART_FAIL:
            return fetchCartError(state, action);
        case actionTypes.REMOVE_FROM_CART_START:
            return removeFromCartStart(state, action);
        case actionTypes.REMOVE_FROM_CART_SUCCESS:
            return removeFromCartSuccess(state, action);
        case actionTypes.REMOVE_FROM_CART_FAIL:
            return removeFromCartError(state, action);
        case actionTypes.FETCH_USER_PRODUCTS_START:
            return fetchUserProductsStart(state, action);
        case actionTypes.FETCH_USER_PRODUCTS_SUCCESS:
            return fetchUserProductsSuccess(state, action);
        case actionTypes.FETCH_USER_PRODUCTS_FAIL:
            return fetchUserProductsError(state, action);
        case actionTypes.DELETE_USER_PRODUCT_START:
            return deleteUserProductStart(state, action);
        case actionTypes.DELETE_USER_PRODUCT_SUCCESS:
            return deleteUserProductSuccess(state, action);
        case actionTypes.DELETE_USER_PRODUCT_FAIL:
            return deleteUserProductError(state, action);
        case actionTypes.RESET_USER_DELETE_PRODUCT:
            return resetUserProductDeleted(state, action);
        case actionTypes.FETCH_BOOK_TO_EDIT_START:
            return fetchBookToEditStart(state, action);
        case actionTypes.FETCH_BOOK_TO_EDIT_SUCCESS:
            return fetchBookToEditSuccess(state, action);
        case actionTypes.FETCH_BOOK_TO_EDIT_FAIL:
            return fetchBookToEditError(state, action);
        case actionTypes.CHECKOUT_CART_START:
            return checkoutCartStart(state, action);
        case actionTypes.CHECKOUT_CART_SUCCESS:
            return checkoutCartSuccess(state, action);
        case actionTypes.CHECKOUT_CART_FAIL:
            return checkoutCartError(state, action);

        default:
            return state;
    }
};

export default reducer;
