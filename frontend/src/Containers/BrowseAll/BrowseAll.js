import React, { useState, useEffect } from "react";
import Layout from "../../hoc/Layout/Layout";
import classes from "./BrowseAll.module.css";
import { BsFillGridFill } from "react-icons/bs";
import { FaList } from "react-icons/fa";
import { MdArrowBack } from "react-icons/md";
import { IconContext } from "react-icons";
import { Backdrop, Button, CircularProgress, withStyles } from "@material-ui/core";
import * as action from "../../store/actions/index";
import { connect } from "react-redux";
import inProgressSvg from "../../assets/svg/inProgress.svg";
const styles = (theme) => ({
    resultRootTypeTile: {
        margin: "0rem",
        padding: "0rem",
        width: "100%",
        backgroundColor: "rgba(255, 255, 255, 1) !important",
        borderRadius: "10px",
        height: "8rem",
        overFlow: "hidden",
    },
    resultRootTypeGrid: {
        margin: "0rem",
        padding: "0rem",
        width: "50%",
        backgroundColor: "rgba(255, 255, 255, 1) !important",
        borderRadius: "10px",
        height: "17rem",
        overFlow: "hidden",
        marginBottom: "0.5rem",
    },
    resultLabel: {
        width: "100%",
        height: "100%",
    },
});

const BrowseAll = (props) => {
    const [state, setState] = useState({
        layoutTypeGrid: false,
        showFilterSideDrawer: false,
        pageNo: 1,
        books: [],
        fetchLoading: true,
        fetchErr: null,
    });
    useEffect(() => {
        let pageNo = window.location.pathname.split("/").pop() || 1;
        if (pageNo < 1 || !/^\d+$/.test(pageNo)) {
            props.history.replace("/browse/1");
        }

        setState({
            ...state,
            pageNo: pageNo,
        });
        props.fetchBookOnPage(pageNo);
    }, [window.location.pathname]);

    const cssClasses = props.classes;

    const toggleLayoutType = () => {
        let prevLayoutTypeGrid = state.layoutTypeGrid;
        setState({
            ...state,
            layoutTypeGrid: !prevLayoutTypeGrid,
        });
    };
    const toggleShowFilterSideDrawer = () => {
        let prevShowFilterSideDrawer = state.showFilterSideDrawer;
        setState({
            ...state,
            showFilterSideDrawer: !prevShowFilterSideDrawer,
        });
    };
    let filterSideDrawerClasses = [classes.FiltersSideDrawer, classes.Close];
    if (state.showFilterSideDrawer) {
        filterSideDrawerClasses = [classes.FiltersSideDrawer, classes.Open];
    }
    const filterSideDrawer = (
        <div className={filterSideDrawerClasses.join(" ")}>
            <div className={classes.CloseButtonFilterSideDrawer}>
                <div onClick={toggleShowFilterSideDrawer}>
                    <IconContext.Provider value={{ color: "#245160", size: "2.4rem" }}>
                        <MdArrowBack />
                    </IconContext.Provider>
                </div>
            </div>
            <div className={classes.SideDrawerFiltersContainers}>
                <div className={classes.InDevelopmentDialog}>
                    <img src={inProgressSvg} alt="" />
                </div>
                <h3>In Progress</h3>
            </div>
        </div>
    );
    let resultClasses = [classes.ResultsTile];
    if (state.layoutTypeGrid) {
        resultClasses = [classes.ResultsGrid];
    }
    const toggleOpenProductPage = (book) => {
        props.toggleOpenProductPage(book);
    };
    let allResults = null;
    if (props.books) {
        allResults = props.books.map((book) => (
            <Button
                classes={{
                    root: state.layoutTypeGrid ? cssClasses.resultRootTypeGrid : cssClasses.resultRootTypeTile,
                    label: cssClasses.resultLabel,
                }}
                key={book._id}
                onClick={(bookDetails) => toggleOpenProductPage(book)}
            >
                <div className={state.layoutTypeGrid ? classes.ResultGrid : classes.ResultTile}>
                    <div className={classes.ImgContainer}>
                        <img src={book.imageUrl} alt="" />
                    </div>
                    <div className={classes.ResultDescription}>
                        <h1>{book.title}</h1>
                        <h2>By: {book.author}</h2>
                        <p>{book.description}</p>
                        <h3>₹ {book.price}</h3>
                    </div>
                </div>
            </Button>
        ));
    }

    const results = <div className={resultClasses.join("")}>{allResults}</div>;
    const pageNo = (
        <div className={classes.PageNo}>
            {state.pageNo > 1 ? (
                <div className={classes.PageBox} onClick={() => props.history.push(`/browse/${state.pageNo - 1}`)}>
                    &lt;
                </div>
            ) : null}
            <div className={classes.PageBox}>{state.pageNo}</div>

            {state.pageNo * props.globalState.bookCountPerPage < props.globalState.totalBookCount ? (
                <div className={classes.PageBox} onClick={() => props.history.push(`/browse/${++state.pageNo}`)}>
                    &gt;
                </div>
            ) : null}
        </div>
    );
    return (
        <Layout>
            <div id="browseAllPage" className={classes.BrowseAll}>
                {!props.globalState.fetchLoading ? (
                    <div>
                        {filterSideDrawer}
                        <div className={classes.Filters}>
                            <div onClick={toggleShowFilterSideDrawer} className={classes.Filter}>
                                <h1>Filter</h1>
                            </div>
                            <div className={classes.LayoutType} onClick={toggleLayoutType}>
                                <IconContext.Provider value={{ color: "#245160", size: "2rem" }}>
                                    {state.layoutTypeGrid ? <BsFillGridFill /> : <FaList />}
                                </IconContext.Provider>
                            </div>
                        </div>
                        {results}
                        {pageNo}
                    </div>
                ) : (
                    <div className={classes.Progress}>
                        <Backdrop open={true} style={{ zIndex: "300" }}>
                            <CircularProgress />
                        </Backdrop>
                    </div>
                )}
            </div>
        </Layout>
    );
};

const mapStateToProps = (state) => {
    return {
        globalState: state.globalState,
        books: state.globalState.booksOnPage,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleOpenProductPage: (productDetails) => dispatch(action.setProductPage(productDetails)),
        fetchBookOnPage: (key) => dispatch(action.fetchBookOnPage(key)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BrowseAll));

// const result = (
//     <Button
//         classes={{
//             root: state.layoutTypeGrid ? cssClasses.resultRootTypeGrid : cssClasses.resultRootTypeTile,
//             label: cssClasses.resultLabel,
//         }}
//     >
//         <div className={state.layoutTypeGrid ? classes.ResultGrid : classes.ResultTile}>
//             <div className={classes.ImgContainer}>
//                 <img src={arr[Math.floor(Math.random() * 6)]} alt="" />
//             </div>
//             <div className={classes.ResultDescription}>
//                 <h1>five</h1>
//                 <h2>By: Author</h2>
//                 <p>
//                     is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
//                     standard dummy text ever since the 1500s
//                 </p>
//                 <h3>₹ 100</h3>
//             </div>
//         </div>
//     </Button>
// );
