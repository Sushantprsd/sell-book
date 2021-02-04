import React, { useEffect, useState } from "react";
import classes from "./Layout.module.css";
import Toolbar from "../../Components/Toolbar/Toolbar";
import ProductPage from "../../Components/ProductPage/ProductPage";
import { connect } from "react-redux";
import * as action from "../../store/actions/index";

const Layout = (props) => {
    const [state, setState] = useState({
        sideMenuOpen: false,
        openProductPage: false,
        showAddedDialogueBox: false,
    });

    const sideMenuToggle = (status) => {
        setState({
            ...state,
            sideMenuOpen: status,
        });
    };
    useEffect(() => {
        setProductPageFalse();
    }, [window.location.pathname]);


    const setProductPageFalse = () => {
        props.setProductPageFalse();
    };
    let layoutClasses = [classes.Layout];
    if (state.sideMenuOpen) {
        layoutClasses = [classes.Layout, classes.disableScroll];
    }

    return (
        <div className={layoutClasses.join(" ")}>
            <div className={classes.Header}>
                <Toolbar sideMenuToggle={sideMenuToggle} />
            </div>
            <main>{props.children}</main>
            <ProductPage openPage={props.globalState.showProductPage} />
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
        setProductPageFalse: () => dispatch(action.setProductPageFalse()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
