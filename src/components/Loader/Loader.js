import React from 'react';

import './Loader.css';
import Modal from "../Modal/Modal";

function Loader(props) {
    let open = props.isOpen;
    if (open === true)
        return <Modal
            isOpen={open}
            transparent={true}
            showCloseButton={false}>
            <div className="container__main">
                <div className="lds-roller">
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                </div>
            </div>
        </Modal>;
    return <></>;
}


export default Loader;