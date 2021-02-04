import React, { useEffect, useState } from "react";
import classes from "./ProductPage.module.css";
import { RiCloseCircleFill } from "react-icons/ri";
import { IconContext } from "react-icons";
import { Backdrop, Button, CircularProgress, Dialog, withStyles } from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import * as action from "../../store/actions/index";
// import temp from "../../assets/imgs/bookA.jpg";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" {...props} />;
});

const styles = (theme) => ({
    buyButtonRoot: {
        marginTop: "1rem",
        background: "#186ff9 !important",
        border: 0,
        color: "white",
        height: "50px",
        padding: "0 40px",
        boxShadow: "0 3px 5px 2px rgba(76, 143, 253,0.4)",
        borderRadius: "10px",
        width: "100%",
    },
    buyButtonLabel: {
        textTransform: "capitalize",
        fontSize: "15px",
        color: "#ffffff",
        fontWeight: "bold",
    },
});

const ProductPage = (props) => {
    const cssClasses = props.classes;
    const [state, setState] = useState({
        showAddedDialogueBox: false,
    });
    useEffect(() => {
        if (state.showAddedDialogueBox) {
            setTimeout(() => {
                setState({ ...state, showAddedDialogueBox: false });
            }, 1700);
        }
    }, [state.showAddedDialogueBox === true]);
    useEffect(() => {
        if (props.authState.productAddedToCart) {
            setShowDialogBox();
        }
    }, [props.authState.productAddedToCart]);
    const setShowDialogBox = () => {
        setState({
            ...state,
            showAddedDialogueBox: true,
        });
    };
    let tags = null;
    if (props.book) {
        tags = props.book.tags.map((tag) => (
            <span key={tag} className={classes.Tag}>
                {tag}
            </span>
        ));
    }
    const toggleOpenProductPage = (book) => {
        props.toggleOpenProductPage(book);
    };
    const addToCartToButton = (bookId) => {
        props.addToCart(bookId);
    };
    let buyButton = props.authState.isAuthenticated ? (
        <Button
            classes={{
                root: cssClasses.buyButtonRoot, // class name, e.g. `cssClasses-nesting-buyButtonRoot-x`
                label: cssClasses.buyButtonLabel, // class name, e.g. `classes-nesting-label-x`
            }}
            onClick={(id) => addToCartToButton(props.book._id)}
        >
            Add To Cart
        </Button>
    ) : (
        <Button
            classes={{
                root: cssClasses.buyButtonRoot, // class name, e.g. `cssClasses-nesting-buyButtonRoot-x`
                label: cssClasses.buyButtonLabel, // class name, e.g. `classes-nesting-label-x`
            }}
            onClick={() => {
                props.history.push("/login");
            }}
        >
            Add To Cart
        </Button>
    );

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

    return (
        <Dialog
            key={props.book._id}
            onClose={(book) => toggleOpenProductPage(props.book)}
            keepMounted
            TransitionComponent={Transition}
            open={props.openPage && props.book.title}
        >
            {props.authState.addProductToCartLoading ? (
                <Backdrop open={true} style={{ zIndex: "800" }}>
                    <CircularProgress />
                </Backdrop>
            ) : null}
            {bookAddedDialog}
            {props.book ? (
                <div className={classes.ProductPage}>
                    <div className={classes.ProductContainer}>
                        <div className={classes.ClosePage}>
                            <div onClick={(book) => toggleOpenProductPage(props.book)} className={classes.ClosePageIcon}>
                                <IconContext.Provider value={{ color: "#245160", size: "3rem" }}>
                                    <RiCloseCircleFill />
                                </IconContext.Provider>
                            </div>
                        </div>
                        <div className={classes.Product}>
                            <div className={classes.SummaryContainer}>
                                <div className={classes.ImgContainer}>
                                    <img src={props.book.imageUrl} alt="" />
                                </div>
                                <div className={classes.Summary}>
                                    <h1>{props.book.title}</h1>
                                    <h2>by: {props.book.author}</h2>
                                    <h3>₹ {props.book.price}</h3>
                                    <NavLink activeClassName={classes.ProductLinkActive} exact to={`/shop/${props.book._id}`}>
                                        Go To Product Page
                                    </NavLink>
                                    {window.location.pathname.split("/").pop() === "cart" ? null : buyButton}
                                </div>
                            </div>

                            <div className={classes.Tags}>{tags}</div>
                            <div className={classes.Description}>
                                <h1>Description</h1>
                                <p>{props.book.description}</p>
                            </div>
                            {window.location.pathname.split("/").pop() === "cart" ? null : (
                                <div className={classes.GoToCartButton}>
                                    <NavLink activeClassName={classes.active} exact to={"/user/cart"}>
                                        Go TO Cart
                                    </NavLink>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : null}
        </Dialog>
    );
};

const mapStateToProps = (state) => {
    return {
        book: state.globalState.productDetails,
        globalState: state.globalState,
        authState: state.authState,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        toggleOpenProductPage: (productDetails) => dispatch(action.setProductPage(productDetails)),
        addToCart: (bookId) => dispatch(action.addProductToCart(bookId)),
        resetProductAddedToCart: () => dispatch(action.resetProductAddedToCart()),
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProductPage)));
