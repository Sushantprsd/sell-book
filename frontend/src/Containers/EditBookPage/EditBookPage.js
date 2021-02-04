import React, { useState, useEffect } from "react";
import classes from "./EditBookPage.module.css";
import Layout from "../../hoc/Layout/Layout";
import { TextField, withStyles, Button, Drawer, FormHelperText, CircularProgress, Backdrop } from "@material-ui/core";
import { MdAddBox, MdRemove } from "react-icons/md";
import { IconContext } from "react-icons";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
const styles = () => ({
    cssLabel: {
        color: "#245160 ",
    },

    cssOutlinedInput: {
        "&$cssFocused $notchedOutline": {
            borderColor: `#245160`,
        },

        color: "#245160",
    },
    cssFocused: {
        color: "#245160 !important",
        fontSize: "18px",
        fontWeight: "bold",
    },

    notchedOutline: {
        // borderWidth: "2px",
        borderColor: "#245160 !important",
    },
    notchedErrorOutline: {
        borderWidth: "2px",
        borderColor: "red",
    },

    label: {
        textTransform: "capitalize",
        fontSize: "15px",
        color: "#245160",
        fontWeight: "bold",
    },
    AddTagButtonRoot: {
        fontSize: "20px",
    },
    AddTagButtonLabel: {
        color: "#245160",
        fontSize: "20px",
        fontWeight: "bold",
    },
    uploadPhotoError: {
        color: "red",
    },
});

const EditBookPage = (props) => {
    const [state, setState] = useState({
        addTagsPageOpen: false,
        bookId: null,
        previewFile: "",
        title: "",
        tagValue: "",
        tags: [],
        fileUrl: "",
        author: "",
        price: "",
        description: "",
        formSubmitAttempt: false,
        formError: "",
        formValid: false,
    });
    useEffect(() => {
        if (state.formValid) {
            addProduct();
        }
    }, [state.formValid]);
    useEffect(() => {
        const bookId = props.match.params.bookId;
        props.fetchBookToEdit(bookId);
    }, []);
    useEffect(() => {
        if (props.authState.fetchBookToEdit) {
            setStateOfPage(props.authState.fetchBookToEdit);
        }
    }, [props.authState.fetchBookToEdit]);
    useEffect(() => {
        if (props.authState.fetchBookToEditError) {
            props.history.goBack();
        }
    }, [props.authState.fetchBookToEditError]);
    const setStateOfPage = (book) => {
        setState({
            ...state,
            title: book.title,
            author: book.author,
            price: book.price,
            description: book.description,
            tags: book.tags,
            fileUrl: book.imageUrl,
            previewFile: book.imageUrl,
            bookId: book._id,
        });
    };

    if (props.authState.addProductFormSuccess && state.formValid) {
        props.history.push("/");
    }

    const toggleTagsPage = () => {
        let prevAddTagsPageOpen = state.addTagsPageOpen;
        setState({
            ...state,
            addTagsPageOpen: !prevAddTagsPageOpen,
            tagValue: "",
        });
    };
    const cssClasses = props.classes;
    const addTag = () => {
        let prevTags = [...state.tags];
        prevTags.push(state.tagValue);
        if (state.tagValue) {
            setState({
                ...state,
                tagValue: "",
                tags: prevTags,
            });
        }
    };
    const removeTag = (tagValue) => {
        let prevTags = [...state.tags];
        prevTags = prevTags.filter((tag) => tag !== tagValue);
        setState({
            ...state,
            tags: prevTags,
        });
    };
    const inputTagValueChangeHandler = (event) => {
        setState({
            ...state,
            tagValue: event.target.value.trim(""),
        });
    };

    const inputFileChangeHandler = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setState({
                ...state,
                previewFile: reader.result,
                fileUrl: event.target.files[0].name,
            });
        };
    };
    const inputChangeHandler = (event) => {
        setState({
            ...state,
            [event.target.id]: event.target.value,
        });
    };
    const submitFormHandler = () => {
        if (state.title && state.price && state.author && state.description && state.tags.length > 0 && state.previewFile) {
            setState({
                ...state,
                formValid: true,
                formSubmitAttempt: true,
            });
        } else {
            setState({
                ...state,
                formSubmitAttempt: true,
                formValid: false,
            });
        }
    };
    const addProduct = () => {
        let fileSourceJSON = JSON.stringify(state.previewFile);
        let body = {
            tags: state.tags,
            fileUrl: fileSourceJSON,
            title: state.title,
            author: state.author,
            price: state.price,
            description: state.description,
        };
        if (body.title && body.price && body.author && body.description && body.tags.length > 0) {
            props.editProduct(state.bookId, body);
        } else {
            setState({
                ...state,
                formError: "One Or More Input Fields Are Empty or Cover photo not Uploaded or price should be greater then 10",
            });
        }
    };
    let tags = state.tags.map((tag) => {
        return (
            <div key={tag} onClick={(tagValue) => removeTag(tag)} className={classes.Tag}>
                <h4>{tag}</h4>
                <IconContext.Provider value={{ color: "white", size: "2rem" }}>
                    <MdRemove />
                </IconContext.Provider>
            </div>
        );
    });
    let addTagsPage = (
        <Drawer anchor={"bottom"} open={state.addTagsPageOpen} onClose={toggleTagsPage}>
            <div className={classes.TagPageModel}>
                <div className={classes.AddTagFormContainer}>
                    <input value={state.tagValue} onChange={inputTagValueChangeHandler} type="text" />
                    <Button
                        classes={{
                            root: cssClasses.AddTagButtonRoot,
                            label: cssClasses.AddTagButtonLabel,
                        }}
                        onClick={addTag}
                    >
                        Add
                    </Button>
                </div>
                <div className={classes.AllTagsAdded}>{tags}</div>
            </div>
        </Drawer>
    );
    const formContainer = (
        <div className={classes.EditFormContainer}>
            <form>
                {addTagsPage}
                <TextField
                    error={!state.title && state.formSubmitAttempt ? true : false}
                    className={classes.InputField}
                    InputLabelProps={{
                        classes: {
                            root: cssClasses.label,
                            focused: cssClasses.cssFocused,
                        },
                    }}
                    InputProps={{
                        classes: {
                            root: cssClasses.cssOutlinedInput,
                            focused: cssClasses.cssFocused,
                            notchedOutline: cssClasses.notchedOutline,
                        },
                        inputMode: "numeric",
                    }}
                    id="title"
                    label="Title"
                    variant="outlined"
                    margin="normal"
                    onChange={inputChangeHandler}
                    value={state.title}
                />
                <TextField
                    error={!state.author && state.formSubmitAttempt ? true : false}
                    className={classes.InputField}
                    InputLabelProps={{
                        classes: {
                            root: cssClasses.label,
                            focused: cssClasses.cssFocused,
                        },
                    }}
                    InputProps={{
                        classes: {
                            root: cssClasses.cssOutlinedInput,
                            focused: cssClasses.cssFocused,
                            notchedOutline: cssClasses.notchedOutline,
                        },
                        inputMode: "numeric",
                    }}
                    margin="normal"
                    id="author"
                    label="Author"
                    variant="outlined"
                    onChange={inputChangeHandler}
                    value={state.author}
                />
                <TextField
                    error={!state.price && state.formSubmitAttempt ? true : false}
                    className={classes.InputField}
                    InputLabelProps={{
                        classes: {
                            root: cssClasses.label,
                            focused: cssClasses.cssFocused,
                        },
                    }}
                    InputProps={{
                        classes: {
                            root: cssClasses.cssOutlinedInput,
                            focused: cssClasses.cssFocused,
                            notchedOutline: cssClasses.notchedOutline,
                        },
                    }}
                    margin="normal"
                    id="price"
                    label="Price"
                    variant="outlined"
                    type="number"
                    onChange={inputChangeHandler}
                    value={state.price}
                />
                <TextField
                    error={!state.description && state.formSubmitAttempt ? true : false}
                    className={classes.InputField}
                    InputLabelProps={{
                        classes: {
                            root: cssClasses.label,
                            focused: cssClasses.cssFocused,
                        },
                    }}
                    InputProps={{
                        classes: {
                            root: cssClasses.cssOutlinedInput,
                            focused: cssClasses.cssFocused,
                            notchedOutline: cssClasses.notchedOutline,
                        },
                        inputMode: "numeric",
                    }}
                    margin="normal"
                    id="description"
                    multiline
                    label="Description"
                    variant="outlined"
                    rows={5}
                    onChange={inputChangeHandler}
                    value={state.description}
                />

                <div className={classes.FileInput}>
                    <Button
                        classes={{
                            label: !state.previewFile && state.formSubmitAttempt ? cssClasses.uploadPhotoError : "",
                        }}
                        style={{ width: "100%" }}
                        variant="contained"
                        component="label"
                    >
                        Upload Cover Photo
                        <input id="imageUrl" onChange={inputFileChangeHandler} type="file" hidden />
                    </Button>
                </div>
                {state.previewFile && (
                    <div className={classes.PreviewCoverPhoto}>
                        <img src={state.previewFile} alt="" />
                    </div>
                )}
                <div className={classes.TagsContainer} onClick={toggleTagsPage}>
                    <div className={classes.AllTags}>
                        {state.tags.length ? (
                            tags
                        ) : (
                            <h4 style={{ color: !state.tags.length && state.formSubmitAttempt ? "red" : "" }}>ADD TAGS</h4>
                        )}
                    </div>
                    <div className={classes.AddTags}>
                        <IconContext.Provider value={{ color: "#245160b4", size: "2.7rem" }}>
                            <MdAddBox />
                        </IconContext.Provider>
                    </div>
                </div>
                {state.formSubmitAttempt && !state.formValid ? (
                    <FormHelperText
                        className={classes.ErrorText}
                        style={{ textTransform: "capitalize", color: "red", fontSize: "13px", fontWeight: "500" }}
                    >
                        {state.formError}
                    </FormHelperText>
                ) : null}
            </form>
            <div className={classes.SubmitButton}>
                <Button
                    style={{ width: "100%", color: "white", backgroundColor: "#245160" }}
                    variant="contained"
                    component="label"
                    onClick={submitFormHandler}
                >
                    Update Product
                </Button>
            </div>
            <Backdrop open={props.authState.addProductFormLoading} style={{ zIndex: "700" }}>
                <CircularProgress style={{ color: "#245160" }} />
            </Backdrop>
        </div>
    );
    return (
        <Layout>
            <div className={classes.AddProduct}>
                {props.authState.fetchBookToEditLoading ? (
                    <Backdrop open={true} style={{ zIndex: "1000" }}>
                        <CircularProgress />
                    </Backdrop>
                ) : (
                    formContainer
                )}
            </div>
        </Layout>
    );
};

const mapStateToProps = (state) => {
    return {
        authState: state.authState,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchBookToEdit: (bookId) => dispatch(actions.fetchBookToEdit(bookId)),
        editProduct: (bookId, body) => dispatch(actions.editProduct(bookId, body)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditBookPage));
