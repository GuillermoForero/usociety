import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import defaultUserImage from "../../images/default-user.png";
import {updateUserCreator} from "../../store/user/userActions";
import * as actionTypes from "../../store/actionsTypes";
import {fileToBase64} from "../../configuration/utils";
import Container from "@material-ui/core/Container";
import Loader from "../../components/Loader/Loader";
import PageError from "../../components/PageError/PageError";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Image from "material-ui-image";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import PersonIcon from '@material-ui/icons/Person';

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

const EditProfile = (props) => {
    const classes = useStyles();
    const [image, setImage] = useState(defaultUserImage);

    const [user, setUser] = useState({
        'name': '',
        'photo': '',
    });

    useEffect(() => {
        props.dispatch({type: actionTypes.SET_MAIN_TITLE, payload: {title: 'Perfil'}});
        setUser(props.userState.data.user);
        setImage(props.userState.data.user?.photo);
    }, []);

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        props.dispatch(updateUserCreator(user));
    };

    const handleClosePageError = () => {
        props.dispatch({type: actionTypes.RESET_ERROR})
    };

    const onChangeFile = files => {
        const file = files[0];
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);

        fileToBase64(file, (result) => {
            setUser({...user, photo: result});
        });
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
                    <PersonIcon/>
                </Avatar>
                <Typography component="h4" variant="h5">
                    {"Actualiza tus datos"}
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
                                variant="filled"
                                required
                                fullWidth
                                id="name"
                                label="Nombre"
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
                        onClick={handleSubmit}>
                        Actualizar
                    </Button>

                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to="/home" style={{color: 'var(--quitiary)'}}>
                                Volver a la pantalla principal
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>);
};

const mapStateToProps = state => {
    return {
        userState: state.user
    }
};
export default connect(mapStateToProps)(EditProfile);