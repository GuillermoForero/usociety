import React, {useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import {connect} from 'react-redux';
import {saveUserCreator} from "../../../store/user/userActions";

import {useHistory} from "react-router";
import Image from "material-ui-image";
import Loader from "../../../components/Loader/Loader";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

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

    const [code, setCode] = useState('')

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        props.dispatch(saveUserCreator(user));
    };

    useEffect(() => {
        if (props.data.logged) {
            history.push('/preferences')
        }
    }, [props.data.logged]);

    const onChangeFile = async files => {
        let imageUrl = URL.createObjectURL(files[0]);
        setImage(imageUrl);
        setUser({...user, image: files[0]});
    };

    return (
        <Container component="main" maxWidth="xs">
            <Loader isOpen={props.data.isFetching}/>
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
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="name"
                                name="name"
                                variant="outlined"
                                required
                                fullWidth
                                id="nombre"
                                label="Nombre"
                                autoFocus
                                value={user.name}
                                onChange={e => handleChange(e)}
                            />
                        </Grid>
                    </Grid>

                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                    >
                        Registrarme
                    </Button>

                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/" variant="body2" style={{color: 'var(--quitiary)'}}>
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
        data: state.user
    };
};
export default connect(mapStateToProps)(SingUpUserData);