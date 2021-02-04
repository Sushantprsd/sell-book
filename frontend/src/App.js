import React, { useEffect } from "react";
import "./App.css";
import Login from "./Containers/Login.js/Login";
import SignUp from "./Containers/SignUp/SignUp";
import { Redirect, Route, Switch } from "react-router";
import { connect } from "react-redux";
import * as action from "./store/actions/index";
import HomePage from "./Containers/HomePage/HomePage";
import BrowseAll from "./Containers/BrowseAll/BrowseAll";
import Cart from "./Containers/Cart/Cart";
import Logout from "./Containers/Logout/Logout";
import AddProduct from "./Containers/AddProduct/AddProduct";
import UserProducts from "./Containers/UserProducts.js/UserProducts";
import Product from "./Containers/Product/Product";
import EditBookPage from "./Containers/EditBookPage/EditBookPage";
import inProgressSvg from "./assets/svg/inProgress.svg";
const PORT_WIDTH = window.innerWidth;

function App(props) {
    useEffect(() => {
        props.onTryAutoSignUp();
    });

    let route = (
        <Switch>
            <Route path="/shop/:bookId" exact component={Product} />
            <Route path="/browse/:page" exact component={BrowseAll} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/" component={HomePage} />
            <Redirect to="/" />
        </Switch>
    );
    if (props.isAuthenticated) {
        route = (
            <Switch>
                <Route path="/shop/:bookId" exact component={Product} />
                <Route path="/user/products" exact component={UserProducts} />
                <Route path="/user/product/add" exact component={AddProduct} />
                <Route path="/user/cart" exact component={Cart} />
                <Route path="/user/edit/:bookId" exact component={EditBookPage} />
                <Route path="/browse/:page" exact component={BrowseAll} />
                <Route path="/logout" exact component={Logout} />
                <Route path="/" component={HomePage} />
                <Redirect to="/" />
            </Switch>
        );
    }
    let content = <div className="App">{route}</div>;
    // if(PORT_WIDTH > 600)
    if (PORT_WIDTH > 550) {
        content = (
            <div className="ErrorDialogContainer">
                <div className="ErrorDialog">
                    <img src={inProgressSvg} alt="" />
                    <h1>Only optimized for mobile browser</h1>
                    <h1>Full window optimization in development </h1>
                    <h2>Please reduce the window size to 500px or lower</h2>
                </div>
            </div>
        );
    }
    return content;
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.authState.isAuthenticated,
    };
};

const mapDispatchToProp = (dispatch) => {
    return {
        onTryAutoSignUp: () => dispatch(action.authCheckState()),
    };
};

export default connect(mapStateToProps, mapDispatchToProp)(App);
