import React, { useState, useEffect } from "react";
import classes from "./Toolbar.module.css";
import { MdSearch, MdMenu, MdArrowBack, MdCallMade } from "react-icons/md";
import { IconContext } from "react-icons";
import toolbarLogo from "../../assets/Logo/toolbarLogo.png";
import SideDrawer from "./SideDrawer/SideDrawer";
import { SwipeableDrawer } from "@material-ui/core";
import { connect } from "react-redux";
import * as action from "../../store/actions/index";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
const Toolbar = (props) => {
    const [state, setState] = useState({
        openSideDrawer: false,
        openSearchResults: false,
        searchWord: "",
        searchProductSet: "",
    });

    useEffect(() => {
        if (!state.searchWord) {
            return;
        }
        props.fetchSearchResults(state.searchWord);
    }, [state.searchWord]);

    const toggleSideDrawer = () => {
        let currentState = !state.openSideDrawer;
        props.sideMenuToggle(!state.openSideDrawer);
        setState({
            ...state,
            openSideDrawer: currentState,
        });
    };
    const toggleOpenSearchResults = () => {
        setState({
            ...state,
            openSearchResults: true,
        });
    };
    const toggleCloseSearchResults = () => {
        setState({
            ...state,
            ...state,
            openSearchResults: false,
            searchWord: "",
        });
    };
    const searchInputChangeHandler = (event) => {
        event.preventDefault();
        setState({
            ...state,
            searchWord: event.target.value,
        });
    };

    let openSideDrawerBackdrop = [classes.SideDrawerBackdrop];
    if (state.openSideDrawer) {
        openSideDrawerBackdrop = [classes.SideDrawerBackdrop, classes.SideDrawerOpen];
    }
    let SearchBarContainerCss = [classes.SearchBarContainer];
    let searchResultsContainerCss = [classes.SearchResultsContainer];
    if (state.openSearchResults) {
        SearchBarContainerCss = [classes.SearchBarContainer, classes.SearchResults];
        searchResultsContainerCss = [classes.SearchResultsContainer, classes.SearchResultsContainerOpen];
    }
    let allResults = null;
    if (props.globalState.fetchSearchResults) {
        allResults = props.globalState.fetchSearchResults.map((book) => (
            <NavLink
                activeClassName={classes.ActiveSearchResultLink}
                onClick={toggleCloseSearchResults}
                exact
                to={`/shop/${book._id}`}
                className={classes.SearchResult}
                key={book._id}
            >
                <div>
                    <h3>{book.title}</h3>
                    <h4>by: {book.author}</h4>
                </div>

                <IconContext.Provider value={{ color: "#888888", size: "1.3rem" }}>
                    <MdCallMade />
                </IconContext.Provider>
            </NavLink>
        ));
    }
    let results = <div className={searchResultsContainerCss.join(" ")}>{allResults}</div>;
    return (
        <div className={classes.Toolbar}>
            {results}
            <div className={classes.MainToolbar}>
                <div onClick={toggleSideDrawer} className={classes.DrawerToggle}>
                    <IconContext.Provider value={{ color: "#245160", size: "2.7rem" }}>
                        <MdMenu />
                    </IconContext.Provider>
                </div>
                <div className={classes.ToolbarLogo}>
                    <img src={toolbarLogo} alt="" />
                </div>
            </div>
            <div className={SearchBarContainerCss.join(" ")}>
                <form autoComplete="off">
                    {state.openSearchResults ? (
                        <IconContext.Provider value={{ color: "#888888", size: "2.1rem" }}>
                            <MdArrowBack onClick={toggleCloseSearchResults} />
                        </IconContext.Provider>
                    ) : (
                        <IconContext.Provider value={{ color: "#888888", size: "2.1rem" }}>
                            <MdSearch onClick={toggleOpenSearchResults} />
                        </IconContext.Provider>
                    )}
                    <input
                        placeholder="Search by title"
                        autoComplete="off"
                        value={state.searchWord}
                        onChange={(event) => searchInputChangeHandler(event)}
                        onClick={toggleOpenSearchResults}
                        type="text"
                        name="name"
                    />
                </form>
            </div>
            <SwipeableDrawer anchor={"left"} open={state.openSideDrawer} onClose={toggleSideDrawer} onOpen={toggleSideDrawer}>
                <SideDrawer open={true} />
            </SwipeableDrawer>
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
        fetchSearchResults: (title) => dispatch(action.fetchSearchResults(title)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Toolbar));
// onClick={(id) => goToProduct(book.id)}
