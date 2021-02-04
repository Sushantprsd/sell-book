import React, { useEffect } from "react";
import Layout from "../../hoc/Layout/Layout";
import classes from "./Cart.module.css";
import { Button, withStyles, Backdrop, CircularProgress } from "@material-ui/core";
import { connect } from "react-redux";
import * as action from "../../store/actions/index";
import { MdRemoveShoppingCart, MdHome } from "react-icons/md";
import { IconContext } from "react-icons";
import StripeCheckout from "react-stripe-checkout";
const styles = (theme) => ({
    BuyButtonRoot: {
        marginTop: "1rem",
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        border: 0,
        color: "white",
        height: "50px",
        padding: "0 40px",
        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
        borderRadius: "7px",
        width: "100%",
    },
    BuyButtonLabel: {},
    removeFromCartButton: {
        margin: "0px",
        padding: "0px",
        width: "100%",
        marginTop: "0.4rem",
        overFlow: "hidden",
        borderRadius: "4px",
        backgroundColor: "white !important",
    },
    removeFromCartLabel: {
        width: "100%",
    },
});

const Cart = (props) => {
    const cssClasses = props.classes;
    useEffect(() => {
        props.fetchCart();
    }, [props.authState.removeFromCartLoading]);
    const removeFromCart = (bookId) => {
        props.removeFromCart(bookId);
    };
    const toggleOpenProductPage = (book) => {
        props.toggleOpenProductPage(book);
    };
    const makePayment = (token) => {
        props.checkoutCart(token);
    };
    useEffect(() => {
        props.fetchCart();
    }, [props.authState.checkoutCartLoading]);
    let cartItems = null;
    if (props.authState.cartItems) {
        cartItems = props.authState.cartItems.map((item) => {
            let book = item.productId;
            return (
                <div key={book._id} className={classes.CartItemContainer}>
                    <div onClick={(bookDetails) => toggleOpenProductPage(book)} key={book._id} className={classes.CartItem}>
                        <div className={classes.ImgContainer}>
                            <img src={book.imageUrl} alt="" />
                        </div>
                        <div className={classes.Details}>
                            <h1>{book.title}</h1>
                            <h2>by: {book.author}</h2>
                            <h3>₹ {book.price}</h3>
                            <h4>Qty: {item.quantity}</h4>
                        </div>
                    </div>
                    <Button
                        classes={{
                            root: cssClasses.removeFromCartButton,
                            label: cssClasses.removeFromCartLabel,
                        }}
                        onClick={(bookId) => removeFromCart(book._id)}
                    >
                        <div className={classes.RemoveFromCart}>
                            <h4>Remove From Cart</h4>
                            <IconContext.Provider value={{ color: "#245160", size: "1.4rem" }}>
                                <MdRemoveShoppingCart />
                            </IconContext.Provider>
                        </div>
                    </Button>
                    {props.authState.removeFromCartLoading ? (
                        <div className={classes.Backdrop}>
                            <CircularProgress />
                        </div>
                    ) : null}
                </div>
            );
        });
    }
    let content = !props.authState.fetchCartLoading ? (
        <div className={classes.Cart}>
            <div className={classes.CartItemsContainer}>{cartItems}</div>
            <div className={classes.CheckOutDetails}>
                <h3>Cart Total: ₹ {props.authState.cartPrice}</h3>

                <StripeCheckout
                    stripeKey={process.env.REACT_APP_STRIPE_KEY}
                    token={makePayment}
                    amount={props.authState.cartPrice * 100}
                    name="Checkout"
                >
                    <Button
                        classes={{
                            root: cssClasses.BuyButtonRoot,
                            label: cssClasses.BuyButtonLabel,
                        }}
                    >
                        Checkout
                    </Button>
                </StripeCheckout>
            </div>
        </div>
    ) : (
        <div className={classes.Progress}>
            <Backdrop open={true} style={{ zIndex: "300" }}>
                <CircularProgress />
            </Backdrop>
        </div>
    );
    const goToShop = (
        <div
            className={classes.GoToShop}
            onClick={() => {
                props.history.push("/");
            }}
        >
            <h4>
                No Item In Cart Go Back To Shop &nbsp; &nbsp;
                <IconContext.Provider value={{ color: "#245160", size: "2rem" }}>
                    <MdHome />
                </IconContext.Provider>
            </h4>
        </div>
    );
    return <Layout> {props.authState.cartItems.length > 0 ? content : goToShop}</Layout>;
};

const mapStateToProps = (state) => {
    return {
        authState: state.authState,
        globalState: state.globalState,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCart: () => dispatch(action.fetchCart()),
        removeFromCart: (bookId) => dispatch(action.removeFromCart(bookId)),
        toggleOpenProductPage: (productDetails) => dispatch(action.setProductPage(productDetails)),
        checkoutCart: (token) => dispatch(action.checkoutCart(token)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Cart));
