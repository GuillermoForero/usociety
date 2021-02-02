import React, {useEffect, useState} from 'react';

import {connect} from "react-redux";

import {useStyles} from "../../hooks/useStyles";
import {FormControl, InputLabel, MenuItem, Select, TextField} from '@material-ui/core';
import Grid from "@material-ui/core/Grid";

import ListSubheader from '@material-ui/core/ListSubheader';

import './CreateGroup.css';

import {createGroupCreator} from "../../store/group/groupActions";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Loader from "../../components/Loader/Loader";
import * as actionTypes from "../../store/actionsTypes";
import {loadCategoriesCreator} from "../../store/category/categoryActions";
import Image from "material-ui-image";
import PageError from "../../components/PageError/PageError";
import {useHistory} from "react-router";

import defaultGroupImage from '../../images/background.jpg';
import SimpleCollapsableList from "../../components/CollapsableList/SimpleCollapsableList";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import {fileToBase64} from "../../configuration/utils";

function CreateGroup(props) {
    const classes = useStyles();
    const history = useHistory();

    const [image, setImage] = useState(defaultGroupImage);
    const [data, setData] = useState({
        group: {
            name: '',
            description: '',
            photo: '',
            rules: [],
            objectives: [],
            category: {
                id: ''
            }
        }
    });

    useEffect(() => {
        props.dispatch({type: actionTypes.SET_MAIN_TITLE, payload: {title: 'Crea tu grupo'}});
        props.dispatch(loadCategoriesCreator());
    }, []);

    const handleChangeTextFields = e => {
        let name = e.target.name;
        let value = e.target.value;
        setData({
            ...data,
            group: {
                ...data.group,
                [name]: value
            }
        });
    };

    const handleSaveClick = () => {
        props.dispatch(createGroupCreator(data.group));
    };

    const handleChangeTextListField = (e, attributeName, itemPosition) => {
        let updatedList = Object.assign([], data.group[attributeName]);
        updatedList[itemPosition] = e.target.value;
        setData({
            ...data,
            group: {
                ...data.group,
                [attributeName]: updatedList
            }
        });
    };

    const handleDeleteListItem = (attributeName, position) => {
        let list = data.group[attributeName];
        list.splice(position, 1);

        setData({
            ...data,
            group: {
                ...data.group,
                [attributeName]: list
            }
        });
    };

    const handleCategoryItemClick = categoryId => {
        setData({
            ...data,
            group: {
                ...data.group,
                category: {id: categoryId}
            }
        });
    };

    const handleAddRule = (attributeName) => {
        let updatedList = Object.assign([], data.group[attributeName]);
        updatedList.push('');
        setData({
            ...data,
            group: {
                ...data.group,
                [attributeName]: updatedList
            }
        });
    };

    const onChangeFile = files => {
        let file = files[0];
        let imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);

        fileToBase64(file, (result) => {
            setData({
                ...data,
                group: {
                    ...data.group,
                    photo: result
                }
            });
        });
    };

    const handleClosePageError = () => {
        props.dispatch({type: actionTypes.RESET_ERROR})
    };

    useEffect(() => {
        if (props.groupState.operationCompleted) {
            history.push('/home');
        }
    }, [props.groupState.operationCompleted]);


    return <Container component="main" maxWidth={"md"} className={classes.container + ', container__group-main'}>

        <Loader isOpen={props.groupState.isLoading || props.categoryState.isLoading}/>
        <PageError
            isOpen={props.groupState.hasError || props.categoryState.hasError}
            onclose={handleClosePageError}
            errorDescription={props.groupState.errorDescription || props.categoryState.errorDescription}/>


        <FormControl className={classes.formControl} fullWidth style={{marginTop: '10px'}}>

            <Grid item xs={6} style={{marginBottom: '20px', marginTop: '10px'}}>
                <Image
                    src={image}
                    color={'rgba(0,0,0,0)'}
                    imageStyle={{
                        borderRadius: '20px',
                        objectFit: 'cover',
                        boxShadow: '20px 0 20px 1px rgba(0, 0, 0, 0.20)',
                    }}
                    aspectRatio={16 / 9}
                />
            </Grid>

            <Grid container style={{flexDirection: 'column'}} spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        name="photo"
                        variant="outlined"
                        fullWidth
                        id="photo"
                        type='file'
                        required
                        onChange={e => {
                            onChangeFile([...e.target.files]);
                        }}
                    />
                </Grid>

                <Grid item xs={6}>
                    <TextField
                        id="name"
                        label="Nombre"
                        variant="outlined"
                        value={data.group.name || ''}
                        name='name'
                        onChange={e => handleChangeTextFields(e)}
                    />
                </Grid>
                <Grid item xs={8}>
                    <TextareaAutosize
                        style={{width:'400px', fontSize:'15px', padding: '10px' }}
                        rowsMin={4}
                        rowsMax={4}
                        id="description"
                        placeholder="Detalles sobre el grupo..."
                        value={data.group.description || ''}
                        name='description'
                        onChange={e => handleChangeTextFields(e)}
                    />
                </Grid>
            </Grid>
        </FormControl>

        <FormControl className={classes.formControl} fullWidth style={{marginTop: '20px'}}>
            <InputLabel id="category">Categoría</InputLabel>
            <Select
                labelId="category"
                id="category"
                defaultValue='none'
            >
                <MenuItem value="none" disabled>
                    Selecciona una categoría
                </MenuItem>
                {props.categoryState && props.categoryState.categories.map(category =>
                    (<MenuItem
                        key={category.id}
                        id={category.id}
                        value={category.id}
                        onClick={categoryId => handleCategoryItemClick(category.id)}
                    >{category.name}
                    </MenuItem>)
                )}
            </Select>
        </FormControl>

        <ListSubheader
            style={{marginTop: '20px'}}
            component="div" id="nested-list-subheader">
            Información adicional
        </ListSubheader>


        <Grid item xs={12}>
            <SimpleCollapsableList
                typeName='Reglas'
                attributeName='rules'
                items={data.group.rules}
                addlistitem={handleAddRule}
                onchange={handleChangeTextListField}
                ondeleteclick={handleDeleteListItem}
            />
        </Grid>
        <Grid item xs={12}>
            <SimpleCollapsableList
                typeName='Objetivos'
                attributeName='objectives'
                items={data.group.objectives}
                addlistitem={handleAddRule}
                onchange={handleChangeTextListField}
                ondeleteclick={handleDeleteListItem}
            />
        </Grid>

        <Grid
            item xs={12}
            style={{display: 'flex', justifyContent: 'flex-end'}}
        >
            <Button
                variant="contained"
                color="primary"
                style={{backgroundColor: 'var(--primary)'}}
                className={classes.submit}
                onClick={handleSaveClick}
            >
                Guardar
            </Button>
        </Grid>
    </Container>
}

const mapStateToProps = state => {
    return {
        groupState: state.group,
        categoryState: state.category
    };
};

export default connect(mapStateToProps)(CreateGroup);