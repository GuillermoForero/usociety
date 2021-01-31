import React, {useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {loadCategoriesCreator} from "../../../store/category/categoryActions";

import {connect} from 'react-redux';
import {useHistory} from "react-router";
import Loader from "../../../components/Loader/Loader";
import {updateUserCategoriesCreator} from "../../../store/user/userActions";
import * as actionTypes from "../../../store/actionsTypes";
import PageError from "../../../components/PageError/PageError";


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

}));

function SingUpPreferences(props) {
    const classes = useStyles();
    const history = useHistory();
    const [checkedCategories, setCheckedCategories] = useState([]);

    useEffect(() => {
        props.dispatch(loadCategoriesCreator());
    }, []);

    useEffect(() => {
        if (props.userState.operationCompleted)
            history.push('/home')
    }, [props.userState.operationCompleted]);


    const handleSaveClick = (e) => {
        e.preventDefault();
        props.dispatch(updateUserCategoriesCreator(checkedCategories));
    };

    const handleClosePageError = () => {
        props.dispatch({type: actionTypes.RESET_ERROR})
    };

    const handleCategoryClicked = (e) => {
        const updatedChecked = Object.assign([], checkedCategories);
        const value = e.target.value;
        const valueIndex = updatedChecked.indexOf(value);
        if (valueIndex !== -1)
            updatedChecked.splice(valueIndex, 1);
        else
            updatedChecked.push(value);
        setCheckedCategories(updatedChecked);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Loader isOpen={props.categoryState.isLoading || props.userState.isLoading }/>
            <PageError
                isOpen={props.categoryState.hasError || props.userState.hasError}
                onclose={handleClosePageError}
                errorDescription={props.categoryState.errorDescription || props.userState.errorDescription}/>

            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Configura tus preferencias
                </Typography>
                <div style={{marginTop: "10px"}}>
                    <Typography component="p" variant="subtitle1">Selecciona los temas que te interesan</Typography>
                </div>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            {props.categoryState.categories.map(category =>
                                (<FormControlLabel
                                    style={{display: 'block'}}
                                    key={category.id}
                                    control={<Checkbox
                                        fullWidth
                                        color="primary"
                                        value={category.id}
                                        onClick={e => handleCategoryClicked(e)}
                                        display={{verticalAlign: 'bottom'}}
                                    />
                                    }
                                    label={category.name}
                                />))}
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        backgroundColor='var(--primary)'
                        onClick={e => handleSaveClick(e)}
                    >
                        Guardar
                    </Button>
                </form>
            </div>
        </Container>
    );
}

const mapStateToProps = state => {
    return {
        categoryState: state.category,
        userState: state.user,
    }
};

export default connect(mapStateToProps)(SingUpPreferences);