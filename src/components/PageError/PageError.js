import React from "react";

import './PageError.css';
import Modal from "../Modal/Modal";

function PageError(props) {
    return <Modal
        isOpen={props.isOpen}
        onclose={props.onclose}>
        <div className='container__on-error' >
            <h3>Se ha producido un error :(</h3>
            <h4>Vuelve a intentarlo</h4>
        </div>

    </Modal>
}


export default PageError;