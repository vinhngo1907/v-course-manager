import React from "react";
import "./index.module.css";

const Card = (props) => {
    return <div className="card">{props.children}</div>;
};

export default Card;
