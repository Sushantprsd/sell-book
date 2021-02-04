import React from "react";
import classes from "./SideDrawer.module.css";
import { Button, withStyles } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

let styles = (theme) => ({
    NavRoot: {
        marginLeft: "0px",
        marginRight: "0px",
        padding: "0px",
        marginTop: "0.3rem",
        marginBottom: "0.3rem",
        borderRadius: "0px",
    },
    NavLabel: {
        width: "100%",
        height: "100%",
    },
});

const SideDrawer = (props) => {
    const cssClasses = props.classes;
    let route = (
        <nav>
            <Button
                classes={{
                    root: cssClasses.NavRoot,
                    label: cssClasses.NavLabel,
                }}
            >
                <NavLink activeClassName={classes.active} exact to={"/"}>
                    Home
                </NavLink>
            </Button>
            <Button
                classes={{
                    root: cssClasses.NavRoot,
                    label: cssClasses.NavLabel,
                }}
            >
                <NavLink activeClassName={classes.active} exact to={"/browse/all"}>
                    Browse All
                </NavLink>
            </Button>
            <Button
                classes={{
                    root: cssClasses.NavRoot,
                    label: cssClasses.NavLabel,
                }}
            >
                <NavLink activeClassName={classes.active} exact to={"/signup"}>
                    Sign Up
                </NavLink>
            </Button>
            <Button
                classes={{
                    root: cssClasses.NavRoot,
                    label: cssClasses.NavLabel,
                }}
            >
                <NavLink activeClassName={classes.active} exact to={"/login"}>
                    Login In
                </NavLink>
            </Button>
        </nav>
    );

    if (props.authState.isAuthenticated)
        route = (
            <nav>
                <Button
                    classes={{
                        root: cssClasses.NavRoot,
                        label: cssClasses.NavLabel,
                    }}
                >
                    <NavLink activeClassName={classes.active} exact to={"/"}>
                        Home
                    </NavLink>
                </Button>
                <Button
                    classes={{
                        root: cssClasses.NavRoot,
                        label: cssClasses.NavLabel,
                    }}
                >
                    <NavLink activeClassName={classes.active} exact to={"/browse/1"}>
                        Browse All
                    </NavLink>
                </Button>
                <Button
                    classes={{
                        root: cssClasses.NavRoot,
                        label: cssClasses.NavLabel,
                    }}
                >
                    <NavLink activeClassName={classes.active} exact to={"/user/cart"}>
                        Cart
                    </NavLink>
                </Button>
                <Button
                    classes={{
                        root: cssClasses.NavRoot,
                        label: cssClasses.NavLabel,
                    }}
                >
                    <NavLink activeClassName={classes.active} exact to={"/user/products"}>
                        My Products
                    </NavLink>
                </Button>
                <Button
                    classes={{
                        root: cssClasses.NavRoot,
                        label: cssClasses.NavLabel,
                    }}
                >
                    <NavLink activeClassName={classes.active} exact to={"/user/product/add"}>
                        Add Product
                    </NavLink>
                </Button>

                <Button
                    classes={{
                        root: cssClasses.NavRoot,
                        label: cssClasses.NavLabel,
                    }}
                >
                    <NavLink activeClassName={classes.active} exact to={"/logout"}>
                        Log Out
                    </NavLink>
                </Button>
            </nav>
        );
    return (
        <div>
            <div className={classes.SideMenu}>{route}</div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        authState: state.authState,
    };
};

export default connect(mapStateToProps)(withStyles(styles)(SideDrawer));
