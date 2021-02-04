import React from "react";
import classes from "./BadgeTypeA.module.css";
import { connect } from "react-redux";
import * as action from "../../store/actions/index";

const BadgeTypeA = (props) => {
    const toggleOpenProductPage = () => {
        props.toggleOpenProductPage(props.book);
    };
    return (
        <div key={props.book._id} onClick={toggleOpenProductPage} className={classes.BadgeTypeA}>
            <div className={classes.ImgContainer}>
                <img src={props.book.imageUrl} alt="" />
            </div>
            <div className={classes.Title}>
                <h2>{props.book.title}</h2>
                <h3>₹ {props.book.price}</h3>
            </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(BadgeTypeA);
