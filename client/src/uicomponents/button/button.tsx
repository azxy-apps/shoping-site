import * as React from "react";
import "!style-loader!css-loader!sass-loader!./button.scss";

const Button: any = ({
    type = 1,
    label,
    className = "",
    onClick = null,
    disabled = false
}) => {

    let localClassName = "btn";
    if (type === 1) {
        localClassName += " btn1 ";
    } else if (type === 2) {
        localClassName += " btn2 ";
    }
    if (className) {
        localClassName += className;
    }
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={localClassName}
        >
            {label}
        </button>
    );
};

export default Button;
