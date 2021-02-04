import React from "react";
import logo from "../../assets/Logo/toolbar Logo.png";
import classes from "./Logo.module.css";

const Logo = (props) => (
    <div onClick={props.onClick} className={classes.Logo}>
        <img src={logo} alt={props.alt} style={props.style} />
    </div>
);

export default Logo;
