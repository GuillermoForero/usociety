import React, {useEffect, useState} from 'react';

import {connect} from "react-redux";

import {useStyles} from "../../hooks/useStyles";
import {InputLabel, TextField} from '@material-ui/core';
import Grid from "@material-ui/core/Grid";

import ListSubheader from '@material-ui/core/ListSubheader';

import './GroupAdmin.css';

import {getGroupCreator, updateGroupCreator, updateUserMembershipCreator} from "../../store/group/groupActions";
import SimpleCollapsableList from "../../components/CollapsableList/SimpleCollapsableList";
import ComplexCollapsableList from "../../components/CollapsableList/ComplexCollapsableList";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Loader from "../../components/Loader/Loader";

import GroupIcon from '@material-ui/icons/Group';
import GroupAdd from '@material-ui/icons/GroupAdd';
import * as actionTypes from "../../store/actionsTypes";
import PageError from "../../components/PageError/PageError";
import {useParams} from "react-router";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import defaultGroupImage from "../../images/background.jpg";
import Image from "material-ui-image";
import {isEmpty} from "lodash";
import {fileToBase64} from "../../configuration/utils";

function GroupAdmin(props) {
    const classes = useStyles();
    const {slug: groupSlug} = useParams();
    const [disableButton, setDisableButton] = useState(true);
    const [image, setImage] = useState(defaultGroupImage);
    const [data, setData] = useState({
        group: {
            name: '',
            description: '',
            rules: [],
            objectives: [],
            photo: ''
        },
        activeMembers: [],
        pendingMembers: [],
    });

    useEffect(() => {
        props.dispatch({type: actionTypes.SET_MAIN_TITLE, payload: {title: 'Administración de grupo'}});
        props.dispatch(getGroupCreator(groupSlug));
    }, []);

    useEffect(() => {
        let currentGroup = props.groupState.currentGroup;
        if (props.groupState.operationCompleted) {
            setData(currentGroup);
            console.log(currentGroup)
            const currentImageGroup = currentGroup.group.photo;
            if (!isEmpty(currentGroup)) {
                setImage({currentImageGroup});
            }
        }
    }, [props.groupState.operationCompleted]);

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
        setDisableButton(false);
    };

    const handleDeleteRulesOrObjectiveClick = (attributeName, position) => {
        let list = data.group[attributeName];

        list.splice(position, 1);
        setData({
            ...data,
            group: {
                ...data.group,
                [attributeName]: list
            }
        });
        setDisableButton(false);
    };

    const handleCheckUserGroupMembership = (userId, status) => {
        props.dispatch(updateUserMembershipCreator(data.group.id,
            {
                targetUserId: userId,
                status: status
            }));
    };

    const handleSaveClick = () => {
        props.dispatch(updateGroupCreator(data.group));
        setDisableButton(true);
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
        setDisableButton(false);
    };


    const handleAddNewListItem = (attributeName) => {
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

    const handleClosePageError = () => {
        props.dispatch({type: actionTypes.RESET_ERROR})
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
        setDisableButton(false);
    };

    return <Container component="main" maxWidth={"md"} className={classes.container + ', container__group-main'}>
        <Loader isOpen={props.groupState.isLoading}/>
        <PageError
            isOpen={props.groupState.hasError}
            onclose={handleClosePageError}
            errorDescription={props.groupState.errorDescription}/>


        <form className={classes.form}>

            <Grid item xs={6} style={{marginBottom: '20px'}}>
                <Image
                    className='container__main-photo'
                    src={image}
                    alt="Group"
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
                    <InputLabel style={{fontSize: '13.33px'}}>Descripción</InputLabel>
                    <TextareaAutosize
                        style={{width: '400px', fontSize: '15px', padding: '10px'}}
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
                    addlistitem={handleAddNewListItem}
                    onchange={handleChangeTextListField}
                    ondeleteclick={handleDeleteRulesOrObjectiveClick}
                />
            </Grid>
            <Grid item xs={12}>
                <SimpleCollapsableList
                    typeName='Objetivos'
                    attributeName='objectives'
                    items={data.group.objectives}
                    addlistitem={handleAddNewListItem}
                    onchange={handleChangeTextListField}
                    ondeleteclick={handleDeleteRulesOrObjectiveClick}
                />
            </Grid>

            <Grid item xs={12}>
                < ComplexCollapsableList
                    typeName='Miembros activos'
                    items={data.activeMembers}
                    onclick={handleCheckUserGroupMembership}
                >
                    <GroupIcon/>
                </ComplexCollapsableList>
            </Grid>
            <Grid item xs={12}>
                < ComplexCollapsableList
                    typeName='Solicitudes de ingreso'
                    items={data.pendingMembers}
                    showCheck={true}
                    onclick={handleCheckUserGroupMembership}
                >
                    <GroupAdd/>
                </ComplexCollapsableList>
            </Grid>

            <Grid
                item xs={12}
                style={{display: 'flex', justifyContent: 'flex-end'}}
            >
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleSaveClick}
                    disabled={disableButton}
                >
                    Guardar
                </Button>
            </Grid>

        </form>
    </Container>
}

const mapStateToProps = state => {
    return {
        groupState: state.group
    };
};

export default connect(mapStateToProps)(GroupAdmin);