import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import defaultUserImage from "../../images/default-user.png";
import {updateUserCreator} from "../../store/user/userActions";
import * as actionTypes from "../../store/actionsTypes";
import {fileToBase64, getImage} from "../../configuration/utils";
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
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import ListSubheader from "@material-ui/core/ListSubheader";
import {loadCategoriesCreator} from "../../store/category/categoryActions";

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
    const [checkedCategories, setCheckedCategories] = useState([
        {
            id: '',
            name: '',
            checked: false
        }
    ]);

    const [user, setUser] = useState({
        'name': '',
        'photo': '',
        'categoryList': []
    });

    const [validations, setValidations] = useState({
        'name': false,
        'category': false,
    });


    useEffect(() => {
        props.dispatch({type: actionTypes.SET_MAIN_TITLE, payload: {title: 'Perfil'}});
        props.dispatch(loadCategoriesCreator());

        const userData = props.userState.data.user;
        setUser(userData);

        let photo = getImage(userData?.photo);
        if (photo)
            setImage(getImage(photo));
    }, []);

    useEffect(() => {
        const updatedCheckedCategories = [];

        props.categoryState?.categories?.map(category =>
            updatedCheckedCategories.push({
                id: category.id,
                name: category.name,
                checked: user.categoryList?.some(x => x.id === category.id)
            }));

        setCheckedCategories(updatedCheckedCategories);
    }, [props.categoryState?.categories]);

    const handleChange = (e) => {
        let propName = e.target.name;
        let propValue = e.target.value;
        setUser({
            ...user,
            [propName]: propValue
        });
        setValidations({...validations, [propName]: !propValue});
    };

    const handleSubmit = async () => {
        let updatedCategories = [];
        const updatedUser = Object.assign({}, user);
        checkedCategories?.filter(category => category.checked)
            .map(category => updatedCategories.push({id: category.id}));
        updatedUser.categoryList = updatedCategories;
        setUser(updatedUser);

        props.dispatch(updateUserCreator(updatedUser));
        localStorage.setItem('userData', JSON.stringify(user));
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

    const handleCategoryClicked = (index) => {
        const updatedChecked = Object.assign([], checkedCategories);
        updatedChecked[index].checked = !updatedChecked[index].checked;
        setCheckedCategories(updatedChecked);
    };

    return (
        <Container component="main" maxWidth="xs" style={{marginBottom: '30px'}}>

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
                                id="photo"
                                type='file'
                                onChange={e => {
                                    onChangeFile([...e.target.files]);
                                }}
                                required
                                style={{width: '100%'}}
                            />
                        </Grid>


                        <Grid item xs={12}>
                            <TextField
                                autoComplete="name"
                                name="name"
                                variant="filled"
                                required
                                id="name"
                                label="Nombre"
                                value={user.name}
                                onChange={e => handleChange(e)}
                                style={{width: '100%'}}
                            />
                        </Grid>
                    </Grid>


                    <ListSubheader
                        style={{marginTop: '20px', paddingLeft: '0', fontSize: '16px'}}
                        component="div" id="nested-list-subheader">
                        Tus intereses
                    </ListSubheader>

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            {checkedCategories.map((category, index) =>
                                (<FormControlLabel
                                    style={{display: 'block', paddingLeft: '10px'}}
                                    key={category.id}
                                    control={<Checkbox
                                        color="primary"
                                        checked={category.checked}
                                        value={category.id}
                                        onClick={e => handleCategoryClicked(index)}
                                        display={{verticalAlign: 'bottom'}}

                                    />
                                    }
                                    label={category.name}
                                />))}
                        </Grid>
                    </Grid>

                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                        disabled={validations.name || validations.category}
                    >
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
        userState: state.user,
        categoryState: state.category,
    }
};
export default connect(mapStateToProps)(EditProfile);