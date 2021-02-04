import React, { useEffect } from "react";
import { connect } from "react-redux";
import Layout from "../../hoc/Layout/Layout";
import classes from "./UserProducts.module.css";
import * as action from "../../store/actions/index";
import { Backdrop, Button, CircularProgress, withStyles } from "@material-ui/core";

const styles = () => ({
    editBookButtonRoot: {
        margin: "0rem",
        padding: "0.4rem",
        width: "47%",
        backgroundColor: "#245160 !important",
        borderRadius: "5px",
        height: "2.5rem",
    },
    editBookLabel: {
        width: "100%",
        height: "100%",
        color: "white",
    },
});

const UserProducts = (props) => {
    useEffect(() => {
        props.fetchUserProducts();
    }, [props.authState.deleteUserProductLoading]);

    const deleteUserProduct = (bookId) => {
        props.deleteUserProduct(bookId);
    };

    const cssClasses = props.classes;
    let userBooks = (
        <div className={classes.NoProductDialog}>
            <h4>No Products Found</h4>
        </div>
    );
    const goToEditProductPage = (bookId)=>{
        props.history.push(`/user/edit/${bookId}`)
    }
    if (props.authState.userProducts.length > 0) {
        userBooks = props.authState.userProducts.map((book) => (
            <div className={classes.BadgeContainer} key={book._id}>
                <div className={classes.BadgeTypeB}>
                    <div className={classes.ImgContainer}>
                        <img src={book.imageUrl} alt="" />
                    </div>
                    <div className={classes.Description}>
                        <h1>{book.title}</h1>
                        <h2>By: {book.author}</h2>
                        <p>{book.description}</p>
                        <h3>₹ {book.price}</h3>
                    </div>
                </div>
                <div className={classes.ControlButtonsContainer}>
                    <Button
                        classes={{
                            root: cssClasses.editBookButtonRoot,
                            label: cssClasses.editBookLabel,
                        }}
                        onClick={(bookId) => deleteUserProduct(book._id)}
                    >
                        delete
                    </Button>
                    <Button
                        classes={{
                            root: cssClasses.editBookButtonRoot,
                            label: cssClasses.editBookLabel,
                        }}
                        onClick ={(bookId)=>goToEditProductPage(book._id)}
                    >
                        Edit
                    </Button>
                </div>
            </div>
        ));
    }
    return (
        <Layout>
            <div className={classes.UserProducts}>
                {props.authState.fetchUserProductsLoading || props.authState.deleteUserProductLoading ? (
                    <Backdrop open={true} style={{ zIndex: "1000" }}>
                        <CircularProgress />
                    </Backdrop>
                ) : (
                    userBooks
                )}
            </div>
        </Layout>
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
        fetchUserProducts: () => dispatch(action.fetchUserProducts()),
        deleteUserProduct: (bookId) => dispatch(action.deleteUserProduct(bookId)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UserProducts));
