import React from 'react';
import {createPortal} from 'react-dom';

import './Loader.css';

function Loader(props) {
    if (props.isOpen === true)
        return (createPortal(<div className="container__main">
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
            </div>,
            document.getElementById('modal')));
    return <></>;
}


export default Loader;