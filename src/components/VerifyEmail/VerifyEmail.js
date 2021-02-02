import React, {useState} from "react";
import Modal from "../Modal/Modal";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

function VerifyEmail(props) {
    const [otpCode, setOtpCode] = useState('');

    const handleChangeTextField = e => {
        setOtpCode(e.target.value);
    };

    return <Modal isOpen={props.isOpen}
                  onclose={props.onclose}
                  showCloseButton={true}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h1 style={{fontSize: '25px', marginBottom: '10px', color: 'var(--primary)'}}>
                ¡Te hemos enviado un código de verificación!
            </h1>
            <h2 style={{fontSize: '20px', marginBottom: '20px'}}>
                Por favor ingrésalo</h2>
            <TextField
                style={{width: '80px', marginBottom: '20px'}}
                type='number'
                name='otpCode'
                value={otpCode}
                onChange={(e) => handleChangeTextField(e)}
            />
            <Button
                style={{backgroundColor: 'var(--primary)'}}
                variant="contained"
                color="primary"
                onClick={() => props.onclick(otpCode)}>
                OK
            </Button>
        </div>
    </Modal>
}

export default VerifyEmail;