import React, { useState, useEffect } from "react";
import classes from "./SignUp.module.css";
import { Button, TextField, Link, LinearProgress, FormHelperText } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import signUpImg from "../../assets/Logo/signUp.PNG";
import signUpSvg from "../../assets/svg/signUpSvg.svg";
import { RiCloseCircleFill } from "react-icons/ri";
import { IconContext } from "react-icons";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import validator from "validator";

const styles = (theme) => ({
    cssLabel: {
        color: "#245160 ",
    },

    cssOutlinedInput: {
        "&$cssFocused $notchedOutline": {
            borderColor: `#245160 `,
        },

        color: "#245160 ",
    },
    cssFocused: {
        color: "#245160 !important",
        fontSize: "15px",
        fontWeight: "bold",
    },

    notchedOutline: {
        // borderWidth: "2px",
    },
    notchedErrorOutline: {
        borderWidth: "2px",
        borderColor: "red",
    },
    root: {
        marginTop: "1rem",
        background: "linear-gradient(45deg, #245160 30%, #000000 90%)",
        border: 0,
        color: "white",
        height: "50px",
        padding: "0 40px",
        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
        borderRadius: "30px",
        width: "100%",
    },
    label: {
        textTransform: "capitalize",
        fontSize: "15px",
        color: "#0E1E24",
        fontWeight: "bold",
    },
    checkboxRoot: {
        color: "#245160",
    },
    buttonLabel: {
        textTransform: "capitalize",
        fontSize: "15px",
        color: "#ffffff",
        fontWeight: "bold",
    },
    progressRoot: {
        marginTop: "0.8rem",
        color: "red",
        backgroundColor: "black",
        height: "0.4rem",
        borderRadius: "10px",
    },
    barColorPrimary: {
        backgroundColor: "#3F3D56",
    },
});

const SignUp = (props) => {
    const [state, setState] = useState({
        email: "",
        password: "",
        emailError: "Email not provided.",
        passwordError: "Password not provided. ",
        formSubmissionAttempt: false,
        formValid: false,
    });
    useEffect(() => {
        if (state.formValid) {
            props.onSignup(state.email, state.password);
        }
    }, [state.formValid]);

    useEffect(() => {
        if (props.authState.authError) {
            setState({
                ...state,
                formValid: false,
            });
        }
    }, [props.authState.authError]);

    const checkValidation = (id, value) => {
        if (id === "email") {
            if (!value) {
                return "Email not provided";
            }
            if (validator.isEmail(value)) {
                return "";
            } else {
                return "Email not valid";
            }
        }
        if (id === "password") {
            if (value.length >= 7) {
                return "";
            } else {
                return "Password length should be greater than 7";
            }
        }
    };
    const onInputChange = (evt) => {
        const value = evt.target.value.trim("");
        let errorId = `${evt.target.id}Error`;
        let error = checkValidation(evt.target.id, value);
        setState({
            ...state,
            [evt.target.id]: value,
            [errorId]: error,
        });
    };

    const submitHandler = () => {
        if (state.emailError || state.passwordError) {
            setState({
                ...state,
                formValid: false,
                formSubmissionAttempt: true,
            });
        } else {
            setState({
                ...state,
                formValid: true,
                formSubmissionAttempt: true,
            });
        }
    };

    const cssClasses = props.classes;
    const PORT_HEIGHT = window.innerHeight;
    return (
        <div className={classes.SignUp} style={{ height: PORT_HEIGHT }}>
            <div className={classes.SignUpSvg}>
                <img src={signUpSvg} alt="" />
            </div>
            <div className={classes.Container}>
                <div className={classes.Logo}>
                    <img alt="" src={signUpImg} />
                </div>
                <form className={classes.Form}>
                    <TextField
                
                        error={state.formSubmissionAttempt && state.emailError ? true : false}
                        id="email"
                        label="Email"
                        margin="normal"
                        variant="outlined"
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
                        onChange={onInputChange}
                        value={state.email}
                    />

                    <TextField
                        error={state.formSubmissionAttempt && state.passwordError ? true : false}
                        id="password"
                        label="Password"
                        margin="normal"
                        variant="outlined"
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
                            inputMode: "password",
                        }}
                        type="password"
                        style={{ marginBottom: "1.5rem" }}
                        onChange={onInputChange}
                        value={state.password}
                    />
                    <FormHelperText className={classes.ErrorText} style={{ color: "red", fontSize: "15px", fontWeight: "500" }}>
                        {state.formSubmissionAttempt
                            ? state.nameError || state.emailError || state.passwordError || props.authState.authError
                            : null}
                    </FormHelperText>
                    <div className={classes.RememberMe}>
                        <Link
                            component="button"
                            variant="body2"
                            onClick={() => {
                                props.history.push("/login");
                            }}
                            classes={{
                                root: cssClasses.label, // class name, e.g. `cssClasses-nesting-root-x`
                            }}
                        >
                            Click here to Sign In
                        </Link>
                    </div>
                    {props.authState.authLoading ? (
                        <LinearProgress
                            classes={{
                                root: cssClasses.progressRoot,
                                barColorPrimary: cssClasses.barColorPrimary,
                            }}
                        />
                    ) : (
                        <Button
                            classes={{
                                root: cssClasses.root, // class name, e.g. `cssClasses-nesting-root-x`
                                label: cssClasses.buttonLabel, // class name, e.g. `classes-nesting-label-x`
                            }}
                            onClick={submitHandler}
                        >
                            Sign Up
                        </Button>
                    )}
                </form>
            </div>
            <div
                className={classes.GoToHome}
                onClick={() => {
                    props.history.push("/");
                }}
            >
                <IconContext.Provider value={{ color: "#24516071", size: "3rem" }}>
                    <RiCloseCircleFill />
                </IconContext.Provider>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        authState: state.authState,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onSignup: (email, password) => dispatch(actions.authSignUp(email, password)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignUp));
