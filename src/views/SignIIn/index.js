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
import {loginUserCreator} from "../../store/user/userActions";
import {useHistory} from "react-router";
import Loader from "../../components/Loader/Loader";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: 'var(--primary)',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: 'var(--primary)'
    },
}));

function SignIn(props) {
    const classes = useStyles();
    const history = useHistory();

    const [user, setUser] = useState({
        'username': '',
        'password': '',
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        props.dispatch(loginUserCreator(user));
    };

    useEffect(() => {
        if (props.data.logged)
            history.push('/group/management')
    }, [props.data.logged, history]);


    return (
        <Container component="main" maxWidth="xs">
            <Loader isOpen={props.data.isFetching}/>

            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5" style={{color: 'var(--quitiary)'}}>
                    U Society
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="Usuario"
                        label="Usuario"
                        name="username"
                        autoComplete="Usuario"
                        autoFocus
                        value={user.username}
                        onChange={e => handleChange(e)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
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
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={(e) => handleSubmit(e)}
                        type="submit"
                    >
                        Ingresar
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="/" variant="body2" style={{color: 'var(--cuaterciary)'}}>
                                ¿Olvidaste la contraseña?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/signup" variant="body2" style={{color: 'var(--cuaterciary)'}}>
                                {"¿No tienes cuenta? Registrate"}
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
export default connect(mapStateToProps)(SignIn);