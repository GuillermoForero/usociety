import React from "react";

import './PageError.css';
import Modal from "../Modal/Modal";

import errorImage from '../../images/error-svgrepo-com.svg'

function PageError(props) {
    return <Modal
        isOpen={props.isOpen}
        onclose={props.onclose}>
        <div className='container__on-error'>
            <h3 style={{marginBottom: '10px', fontSize: '30px', color: 'gray'}}>Se ha producido un error :(</h3>

            <img src={errorImage} alt='Error' style={{width: '150px', height: '150px'}}/>

            <h3 style={{marginTop: '10px', fontSize: '15px', color: 'gray'}}>{props.errorDescription}</h3>
        </div>
    </Modal>
}


export default PageError;