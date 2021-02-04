import React from "react";
import classes from "./BadgeTypeB.module.css";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import * as action from "../../store/actions/index";

const styles = (theme) => ({
    root: {
        margin: "0rem",
        padding: "0rem",
        // width: "85vw",
        backgroundColor: "rgba(255, 255, 255, 1) !important",
        // border: "2px solid rgb(143, 142, 142)",
        borderRadius: "10px",
        marginLeft: "0.3rem",
        marginRight: "0.3rem",
        height: "98%",
    },
    label: {
        width: "100%",
        height: "100%",
    },
});

const BadgeTypeB = (props) => {
    const cssClasses = props.classes;
    const toggleOpenProductPage = () => {
        props.toggleOpenProductPage(props.book);
    };
    return (
        <Button
            classes={{
                root: cssClasses.root,
                label: cssClasses.label,
            }}
            onClick={toggleOpenProductPage}
            key={props.book._id}
        >
            <div className={classes.BadgeTypeB}>
                <div className={classes.ImgContainer}>
                    <img src={props.book.imageUrl} alt="" />
                </div>
                <div className={classes.Description}>
                    <h1>{props.book.title}</h1>
                    <h2>By: {props.book.author}</h2>
                    <p>{props.book.description}</p>
                    <h3>₹ {props.book.price}</h3>
                </div>
            </div>
        </Button>
    );
};
const mapStateToProps = (state) => {
    return {
        globalState: state.globalState,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        toggleOpenProductPage: (productDetails) => dispatch(action.setProductPage(productDetails)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BadgeTypeB));
