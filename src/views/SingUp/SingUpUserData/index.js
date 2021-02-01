import React, {useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import {connect} from 'react-redux';
import {createUserCreator, sendVerificationEmailCreator} from "../../../store/user/userActions";

import {useHistory} from "react-router";
import Image from "material-ui-image";
import Loader from "../../../components/Loader/Loader";
import * as actionTypes from "../../../store/actionsTypes";
import PageError from "../../../components/PageError/PageError";
import {Link} from "react-router-dom";

import defaultUserImage from '../../../images/default-user-image.png';
import VerifyEmail from "../../../components/VerifyEmail/VerifyEmail";
import {INVALID_OTP} from "../../../configuration/service";

const useStyles = makeStyles((theme) => ({
    paper: {
        paddingTop: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: 'var(--primary)'
    },
}));

function SingUpUserData(props) {
    const classes = useStyles();
    const history = useHistory();
    const [image, setImage] = useState(defaultUserImage);
    const [verifiedEmail, setVerifiedEmail] = useState(false);
    const [emailUsedToVerify, setEmailUsedToVerify] = useState('');
    const [verifiedEmailModalIsOpen, setVerifiedEmailModalIsOpen] = useState(false);
    const [user, setUser] = useState({
        'name': '',
        'email': '',
        'password': '',
        'confirmedPassword': '',
        'photo': '',
        'username': ''
    });

    useEffect(() => {
        if (props.userState.isLogged) {
            history.push('/preferences')
        }
    }, [props.userState.isLogged]);

    useEffect(() => {
        if (props.userState.errorCode === INVALID_OTP) {
            setVerifiedEmailModalIsOpen(false);
            setVerifiedEmail(false);
        }
        if (props.userState.hasError) {
            setVerifiedEmailModalIsOpen(false);
        }
    }, [props.userState.hasError]);


    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleEmailChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
        setVerifiedEmail(false);
    };

    const handleSubmit = async () => {
        props.dispatch(createUserCreator(user));
    };

    const handleClosePageError = () => {
        props.dispatch({type: actionTypes.RESET_ERROR})
    };

    const onChangeFile = files => {
        const file = files[0];
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
        setUser({...user, image: file});
    };

    const handleVerifyEmail = (sendCode) => {
        const email = user.email;
        if (sendCode) {
            if (emailUsedToVerify === '' || email !== emailUsedToVerify) {
                props.dispatch(sendVerificationEmailCreator(email, false));
            }
            setEmailUsedToVerify(email);
        }
        setVerifiedEmailModalIsOpen(!verifiedEmailModalIsOpen);
    };

    const handleCatchCode = verificationCode => {
        props.dispatch(sendVerificationEmailCreator(user.email, false));
        setVerifiedEmailModalIsOpen(!verifiedEmailModalIsOpen);
        setUser({...user, otpCode: verificationCode});
        setVerifiedEmail(verifiedEmailModalIsOpen);
        setVerifiedEmailModalIsOpen(!verifiedEmailModalIsOpen);
    };

    return (
        <Container component="main" maxWidth="xs">

            <Loader isOpen={props.userState.isLoading}/>
            <PageError
                isOpen={props.userState.hasError}
                onclose={handleClosePageError}
                errorDescription={props.userState.errorDescription}/>
            <VerifyEmail
                isOpen={verifiedEmailModalIsOpen}
                onclose={() => handleVerifyEmail(false)}
                onclick={handleCatchCode}
            />

            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Registra tus datos
                </Typography>
                <form className={classes.form}>
                    <Grid container spacing={2} style={{justifyContent: 'center'}}>
                        <Grid item xs={6}>
                            <Image
                                src={image}
                                color={'rgba(0,0,0,0)'}
                                imageStyle={{
                                    borderRadius: '100px',
                                    objectFit: 'cover'
                                }}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="photo"
                                variant="outlined"
                                fullWidth
                                id="photo"
                                type='file'
                                onChange={e => {
                                    onChangeFile([...e.target.files]);
                                }}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Correo"
                                name="email"
                                autoComplete="email"
                                value={user.email}
                                onChange={e => handleEmailChange(e)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                autoComplete="name"
                                name="name"
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Nombre"
                                value={user.name}
                                onChange={e => handleChange(e)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                label="Usuario"
                                name="username"
                                autoComplete="username"
                                value={user.username}
                                onChange={e => handleChange(e)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Contraseña"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={user.password}
                                onChange={e => handleChange(e)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="confirmedPassword"
                                label="Confirma la contraseña"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={user.confirmedPassword}
                                onChange={e => handleChange(e)}
                            />
                        </Grid>
                    </Grid>

                    {verifiedEmail ?
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={handleSubmit}>
                            Registrarme
                        </Button> :
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={() => handleVerifyEmail(true)}
                            disabled={user.email === ''}>
                            Verificar correo
                        </Button>
                    }

                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to="/" style={{color: 'var(--quitiary)'}}>
                                ¿Ya tienes cuenta? Ingresa
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

const mapStateToProps = state => {
    return {
        userState: state.user
    };
};
export default connect(mapStateToProps)(SingUpUserData);