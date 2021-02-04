import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Layout from "../../hoc/Layout/Layout";
import classes from "./Product.module.css";
import * as action from "../../store/actions/index";
import { Backdrop, Button, CircularProgress, withStyles } from "@material-ui/core";
const styles = (themes) => ({
    AddToCartRoot: {
        width: "50%",
        height: "100%",
        borderRadius: "0px",
    },
    GoToCartRoot: {
        width: "50%",
        height: "100%",
        backgroundColor: "#245160 !important",
        borderRadius: "0px",
    },
    GoToCartLabel: {
        color: "white",
    },
});
const Product = (props) => {
    const [state, setState] = useState({
        showAddedDialogueBox: false,
    });
    useEffect(() => {
        const bookId = props.match.params.bookId;
        props.fetchProduct(bookId);
    }, [window.location.pathname]);
    useEffect(() => {
        const bookId = props.match.params.bookId;
        props.fetchProduct(bookId);
    }, []);
    useEffect(() => {
        if (props.globalState.fetchProductError) {
            props.history.replace("/");
        }
    }, [props.globalState.fetchProductError]);
    useEffect(() => {
        if (state.showAddedDialogueBox) {
            setTimeout(() => {
                setState({ ...state, showAddedDialogueBox: false });
            }, 1700);
        }
    }, [state.showAddedDialogueBox === true]);
    useEffect(() => {
        if (props.authState.productAddedToCart === true) {
            setShowDialogBox();
        }
    }, [props.authState.productAddedToCart]);
    const setShowDialogBox = () => {
        setState({
            ...state,
            showAddedDialogueBox: true,
        });
    };
    let bookAddedDialog = (
        <div
            className={classes.Modal}
            style={{
                transform: state.showAddedDialogueBox ? "translateY(0)" : "translateY(100vh)",
                opacity: state.showAddedDialogueBox ? "1" : "1",
            }}
        >
            <h1>Book Added To Cart</h1>
        </div>
    );
    const cssClasses = props.classes;
    const progressBar = (
        <div className={classes.ProgressBar}>
            <CircularProgress style={{ color: "#245160" }} />
        </div>
    );
    let product = null;
    let bookTags = null;
    if (props.book && props.book.tags) {
        bookTags = props.book.tags.map((tag) => (
            <span key={tag} className={classes.Tag}>
                {tag}
            </span>
        ));
    }
    const addToCartButton = (bookId) => {
        props.addToCart(bookId);
    };
    if (props.book) {
        product = (
            <div className={classes.ProductContainer}>
                {props.authState.addProductToCartLoading ? (
                    <Backdrop open={true} style={{ zIndex: "800" }}>
                        <CircularProgress />
                    </Backdrop>
                ) : null}
                {bookAddedDialog}
                <div className={classes.SummaryContainer}>
                    <img src={props.book.imageUrl} alt="" />
                    <div className={classes.Summary}>
                        <h1>{props.book.title}</h1>
                        <h2>by: {props.book.author}</h2>
                        <h3>₹ {props.book.price}</h3>
                    </div>
                </div>
                <div className={classes.TagsContainer}>{props.book.tags ? bookTags : null}</div>
                <div className={classes.Description}>
                    <h1>Description</h1>
                    <p>{props.book.description}</p>
                </div>
                {props.authState.isAuthenticated ? (
                    <div className={classes.ControlButton}>
                        <Button
                            classes={{
                                root: cssClasses.AddToCartRoot,
                                label: cssClasses.AddToCartLabel,
                            }}
                            onClick={(id) => addToCartButton(props.book._id)}
                        >
                            Add To Cart
                        </Button>
                        <Button
                            classes={{
                                root: cssClasses.GoToCartRoot,
                                label: cssClasses.GoToCartLabel,
                            }}
                            onClick={() => {
                                props.history.push("/user/cart");
                            }}
                        >
                            Go To Cart
                        </Button>
                    </div>
                ) : (
                    <div className={classes.ControlButton}>
                        <Button
                            classes={{
                                root: cssClasses.GoToCartRoot,
                                label: cssClasses.GoToCartLabel,
                            }}
                            onClick={() => {
                                props.history.push("/login");
                            }}
                            style={{ width: "100%" }}
                        >
                            Add To Cart
                        </Button>
                    </div>
                )}
            </div>
        );
    }
    return (
        <Layout>
            <div className={classes.Product}>{props.globalState.fetchProductLoading ? progressBar : product}</div>
        </Layout>
    );
};

const mapStateToProps = (state) => {
    return {
        book: state.globalState.fetchProduct,
        globalState: state.globalState,
        authState: state.authState,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (bookId) => dispatch(action.addProductToCart(bookId)),
        resetProductAddedToCart: () => dispatch(action.resetProductAddedToCart()),
        fetchProduct: (bookId) => dispatch(action.fetchProduct(bookId)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Product));
