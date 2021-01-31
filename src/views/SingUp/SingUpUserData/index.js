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
import {createUserCreator} from "../../../store/user/userActions";

import {useHistory} from "react-router";
import Image from "material-ui-image";
import Loader from "../../../components/Loader/Loader";
import * as actionTypes from "../../../store/actionsTypes";
import PageError from "../../../components/PageError/PageError";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
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
    const [image, setImage] = useState('https://www.shareicon.net/data/512x512/2017/01/06/868320_people_512x512.png');
    const [user, setUser] = useState({
        'name': '',
        'email': '',
        'password': '',
        'photo': ''
    });

    useEffect(() => {
        if (props.userState.isLogged) {
            history.push('/preferences')
        }
    }, [props.userState.isLogged]);

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
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

    return (
        <Container component="main" maxWidth="xs">

            <Loader isOpen={props.userState.isLoading}/>
            <PageError
                isOpen={props.userState.hasError}
                onclose={handleClosePageError}
                errorDescription={props.userState.errorDescription}/>

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
                                id="email"
                                label="Correo"
                                name="email"
                                autoComplete="email"
                                value={user.email}
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
                    </Grid>

                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}>
                        Registrarme
                    </Button>

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