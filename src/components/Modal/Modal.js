import React from "react";
import {createPortal} from 'react-dom';

import './Modal.css';

function Modal(props) {
    if (props.isOpen) {
        return createPortal(
            <div className="Modal">
                <div
                    className="Modal__container"
                    style={{backgroundColor: props.transparent? 'rgba(0,0,0,0' : 'white'}}>
                    {props.showCloseButton ? <button
                        className="Modal__close-button"
                        onClick={props.onclose}>
                        X
                    </button> : null}
                    {props.children}
                </div>
            </div>,
            document.getElementById('modal'));
    }
    return <></>;
}

export default Modal;