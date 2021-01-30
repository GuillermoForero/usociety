import React from "react";
import {createPortal} from 'react-dom';

import './Modal.css';

function Modal(props) {
    if (props.isOpen) {
        return createPortal(
            <div className="Modal">
                <div className="Modal__container">
                    <button
                        className="Modal__close-button"
                        onClick={props.onclose}>
                        X
                    </button>
                    {props.children}
                </div>
            </div>,
            document.getElementById('modal'));
    }
    return <></>;
}

export default Modal;