import React, { useState, useEffect } from "react";
import classes from "./Login.module.css";
import { Button, TextField, Checkbox, FormControlLabel, LinearProgress, FormHelperText } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import logoImg from "../../assets/Logo/logo (1).png";
import loginSvg from "../../assets/svg/loginSvg.svg";
import { NavLink } from "react-router-dom";
import { RiCloseCircleFill } from "react-icons/ri";
import { IconContext } from "react-icons";
import validator from "validator";
import * as action from "../../store/actions/index";
import { connect } from "react-redux";

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
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
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
        color: "#204F5F",
        fontWeight: "bold",
    },
    checkboxRoot: {
        color: "#245160",
    },
});

const Login = (props) => {
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
            props.onLogin(state.email, state.password);
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
        <div className={classes.Login} style={{ height: PORT_HEIGHT }}>
            <div className={classes.LoginSvg}>
                <img src={loginSvg} alt="" />
            </div>
            <div className={classes.Container}>
                <div className={classes.Logo}>
                    <img alt="" src={logoImg} />
                </div>
                <form  className={classes.Form}>
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
                                label: cssClasses.label, // class name, e.g. `classes-nesting-label-x`
                            }}
                            onClick={submitHandler}
                        >
                            Log In
                        </Button>
                    )}
                </form>

                <div className={classes.Help}>
                    <NavLink to="/">Forgotten details</NavLink>
                    <NavLink to="/signup">Sign Up</NavLink>
                </div>
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
        onLogin: (email, password) => dispatch(action.authLogin(email, password)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));
// <div className={classes.RememberMe}>
//                         <FormControlLabel
//                             control={
//                                 <Checkbox
//                                     name="checkedA"
//                                     style={{
//                                         color: "#FF7A75",
//                                     }}
//                                 />
//                             }
//                             classes={{
//                                 label: cssClasses.label, // class name, e.g. `classes-nesting-label-x`
//                             }}
//                             label="Remember Me"
//                         />
//                     </div>
