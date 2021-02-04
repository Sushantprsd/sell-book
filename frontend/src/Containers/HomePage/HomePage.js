import { Button } from "@material-ui/core";
import React, { useEffect } from "react";
import Layout from "../../hoc/Layout/Layout";
import classes from "./HomePage.module.css";
import { withStyles } from "@material-ui/core/styles";
import BadgeTypeA from "../../Components/BadgeTypeA/BadgeTypeA";
import BadgeTypeB from "../../Components/BadgeTypeB/BadgeTypeB";
import temp1 from "../../assets/imgs/author1.jpg";
import temp2 from "../../assets/imgs/author2.jpg";
import temp3 from "../../assets/imgs/author3.jpg";
import temp4 from "../../assets/imgs/author4.png";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import * as action from "../../store/actions/index";

const styles = (theme) => ({
    ViewAllRoot: {
        background: "linear-gradient(45deg, #245160 30%, #245160 90%)",
        border: 0,
        boxShadow: "0 3px 5px 2px #24516031",
        borderRadius: "4px",
        width: "100%",
    },
    ViewAllLabel: {
        textTransform: "capitalize",
        fontSize: "15px",
        color: "#ffffff",
        fontWeight: "bold",
    },
    AuthorsViewAllRoot: {
        marginTop: "1rem",
        width: "5.6rem",
        background: "linear-gradient(45deg, #ffffff 30%, #ffffff 90%)",
    },
    AuthorsViewAllLabel: {
        textTransform: "capitalize",
        fontSize: "15px",
        color: "#245160",
        fontWeight: "bold",
    },
    BrowseAllRoot: {
        marginTop: "0.5rem",
        marginBottom: "0.5rem",
        background: "linear-gradient(45deg, #ffffff 30%, #ffffff 90%)",
        boxShadow: "0 3px 5px 2px #a3a3a3",
        borderRadius: "4px",
        width: "100%",
    },
    BrowseAllLabel: {
        textTransform: "capitalize",
        fontSize: "15px",
        color: "#245160",
        fontWeight: "bold",
    },
});

const HomePage = (props) => {
    const cssClasses = props.classes;
    const viewAllHandler = () => {
        props.history.push("/browse/1");
    };
    useEffect(() => {
        props.fetchTrendingBooks(8);
        props.fetchRecommendedBooks(5);
        props.fetchBookOnPage(1);
    }, []);
    let trendingBooks = null;
    let trendingBooksContainer = (
        <div style={{ width: `${7 * 4}rem` }} className={classes.Results}>
            {trendingBooks}
        </div>
    );
    if (props.globalState.fetchTrendingBooks.length > 0) {
        trendingBooks = props.globalState.fetchTrendingBooks.map((book) => <BadgeTypeA book={book} />);
        trendingBooksContainer = (
            <div style={{ width: `${7 * props.globalState.fetchTrendingBooks.length}rem` }} className={classes.Results}>
                {trendingBooks}
            </div>
        );
    }
    let allRecommendedBooks = null;
    let recommendedBooksContainer = (
        <div style={{ width: `${23 * 2}rem` }} className={classes.RecommendedResults}>
            {allRecommendedBooks}
        </div>
    );
    if (props.globalState.fetchRecommendedBook.length > 0) {
        allRecommendedBooks = props.globalState.fetchRecommendedBook.map((book) => <BadgeTypeB book={book} />);
        recommendedBooksContainer = (
            <div
                style={{ width: `${23 * props.globalState.fetchRecommendedBook.length}rem` }}
                className={classes.RecommendedResults}
            >
                {allRecommendedBooks}
            </div>
        );
    }

    let allRecentlyAddedBooks = null;
    let recentlyAddedBooksContainer = (
        <div style={{ width: `${7 * 4}rem` }} className={classes.Results}>
            {allRecentlyAddedBooks}
        </div>
    );
    if (props.globalState.booksOnPage.length > 0) {
        allRecentlyAddedBooks = props.globalState.booksOnPage.map((book) => <BadgeTypeA book={book} />);
        recentlyAddedBooksContainer = (
            <div style={{ width: `${7 * props.globalState.booksOnPage.length}rem` }} className={classes.Results}>
                {allRecentlyAddedBooks}
            </div>
        );
    }

    return (
        <Layout>
            <div className={classes.HomePage}>
                <div key="trending" className={classes.TrendingSection}>
                    <div className={classes.TrendingHeading}>
                        <h1>Trending</h1>
                    </div>
                    <div className={classes.ResultsContainer}>{trendingBooksContainer}</div>

                    <div className={classes.ViewAllButton}>
                        <Button
                            classes={{
                                root: cssClasses.ViewAllRoot, // class name, e.g. `cssClasses-nesting-root-x`
                                label: cssClasses.ViewAllLabel, // class name, e.g. `classes-nesting-label-x`
                            }}
                            onClick={viewAllHandler}
                        >
                            View All
                        </Button>
                    </div>
                </div>
                <div key="recommended" className={classes.Recommended}>
                    <div className={classes.RecommendedHeading}>
                        <h1>Recommended For You</h1>
                    </div>
                    <div className={classes.RecommendedResultsContainer}>{recommendedBooksContainer}</div>
                </div>
                <div key="recentlyAdded" className={classes.TrendingSection}>
                    <div className={classes.TrendingHeading}>
                        <h1>Recently Added</h1>
                    </div>
                    <div className={classes.ResultsContainer}>{recentlyAddedBooksContainer}</div>

                    <div className={classes.ViewAllButton}>
                        <Button
                            classes={{
                                root: cssClasses.ViewAllRoot, // class name, e.g. `cssClasses-nesting-root-x`
                                label: cssClasses.ViewAllLabel, // class name, e.g. `classes-nesting-label-x`
                            }}
                            onClick={viewAllHandler}
                        >
                            View All
                        </Button>
                    </div>
                </div>
                <div key="authors" className={classes.TopAuthorsContainer}>
                    <div className={classes.TopAuthorsHeading}>
                        <h1>Top Authors</h1>
                    </div>
                    <div className={classes.Authors}>
                        <div
                            key="title1"
                            style={{ borderRight: "2px dotted #a3a3a3", borderBottom: "2px dotted #a3a3a3" }}
                            className={classes.AuthorContainer}
                        >
                            <img src={temp1} alt="" />
                            <h1>Title</h1>
                        </div>
                        <div key="title2" style={{ borderBottom: "2px dotted #a3a3a3" }} className={classes.AuthorContainer}>
                            <img src={temp2} alt="" />
                            <h1>Title</h1>
                        </div>
                        <div key="title3" style={{ borderRight: "2px dotted #a3a3a3" }} className={classes.AuthorContainer}>
                            <img src={temp3} alt="" />
                            <h1>Title</h1>
                        </div>
                        <div key="title4" className={classes.AuthorContainer}>
                            <img src={temp4} alt="" />
                            <h1>Title</h1>
                        </div>
                    </div>
                    <Button
                        classes={{
                            root: cssClasses.AuthorsViewAllRoot, // class name, e.g. `cssClasses-nesting-root-x`
                            label: cssClasses.AuthorsViewAllLabel, // class name, e.g. `classes-nesting-label-x`
                        }}
                        onClick={viewAllHandler}
                    >
                        View All
                    </Button>
                </div>
                <div className={classes.BrowseAll}>
                    <Button
                        classes={{
                            root: cssClasses.BrowseAllRoot, // class name, e.g. `cssClasses-nesting-root-x`
                            label: cssClasses.BrowseAllLabel, // class name, e.g. `classes-nesting-label-x`
                        }}
                        onClick={() => {
                            props.history.push("/browse/all");
                        }}
                    >
                        Browse All
                    </Button>
                </div>
            </div>
        </Layout>
    );
};

const mapStateToProps = (state) => {
    return {
        globalState: state.globalState,
        authState: state.authState,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchRecommendedBooks: (size) => dispatch(action.fetchRecommendedBooks(size)),
        fetchTrendingBooks: (size) => dispatch(action.fetchTrendingBooks(size)),
        fetchBookOnPage: (pageNo) => dispatch(action.fetchBookOnPage(pageNo)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HomePage)));
