import { InputText } from "primereact/components/inputtext/InputText";
import * as React from "react";
import "!style-loader!css-loader!sass-loader!./textbox.scss";

const Textbox: any = ({
    input,
    meta,
    id = null,
    name = 'textbox',
    className = "",
    onClick = null,
    disabled = false,
    placeholder = "Please enter text",
    onChange = null,
    onFocus = null,
    onBlur = null,
}) => {
    let showError = false;
    if (meta && meta.submitFailed && meta.error) {
        showError = true;
    }
    const localClassName = className + " form-control app-textbox " + (showError ? " app-error" : "");
    const _input = input || { name, onChange, onFocus, onBlur };
    const normalRenderer = () => {
        return (
            <>
                <InputText
                    id={id}
                    name={_input.name}
                    className={localClassName}
                    value={_input.value}
                    onChange={_input.onChange}
                    onClick={onClick}
                    onFocus={_input.onFocus}
                    onBlur={_input.onBlur}
                    disabled={disabled}
                    placeholder={placeholder}
                />
                {showError ? <div className="app-errorBox">{meta.error}</div> : null}
            </>
        );
    };

    const disabledRenderer = () => {
        return (
            <div className="app-disabledText">{input.value}</div>
        );
    };

    return (
        <>{disabled ? disabledRenderer() : normalRenderer()}</>
    );
};

export default Textbox;
