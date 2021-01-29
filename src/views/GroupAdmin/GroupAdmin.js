import React, {useEffect, useState} from 'react';

import {connect} from "react-redux";

import {useStyles} from "../../hooks/useStyles";
import {TextField} from '@material-ui/core';
import Grid from "@material-ui/core/Grid";

import ListSubheader from '@material-ui/core/ListSubheader';

import './GroupAdmin.css';

import {getGroupCreator, updateGroupCreator, updateUserMembershipCreator} from "../../store/group/groupActions";
import CollapsableList from "../../components/CollapsableList/CollapsableList";
import ComplexCollapsableList from "../../components/CollapsableList/ComplexCollapsableList";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Loader from "../../components/Loader/Loader";

import GroupIcon from '@material-ui/icons/Group';
import GroupAdd from '@material-ui/icons/GroupAdd';
import * as actionTypes from "../../store/actionsTypes";

function GroupAdmin(props) {
    const classes = useStyles();
    let image = 'https://cdn.pixabay.com/photo/2015/03/17/14/05/sparkler-677774_960_720.jpg';

    const [disableButton, setDisableButton] = useState(true);

    const [data, setData] = useState({
        group: {
            name: '',
            description: '',
            rules: [],
            objectives: [],
        },
        activeMembers: [],
        pendingMembers: [],
    });

    useEffect(() => {
        props.dispatch({type: actionTypes.SET_MAIN_TITLE, payload: {title: 'Administración de grupo'}});
        props.dispatch(getGroupCreator(props.groupId));
    }, []);

    useEffect(() => {
        setData(props.group.currentGroup);
    }, [props.group.currentGroup]);

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

    const handleDeleteRulesOrObjectiveClick = (attributeName, targetValue) => {
        let updatedObjectives = data.group[attributeName].filter(value => value !== targetValue);
        setData({
            ...data,
            group: {
                ...data.group,
                [attributeName]: updatedObjectives
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
        props.dispatch(getGroupCreator(props.groupId));
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

    return <Container component="main" maxWidth={"md"} className={classes.container + ', container__group-main'}>
        <Loader isOpen={props.group.isFetching}/>

        <img
            className='container__main-photo'
            src={image}
            alt="Group"
        />

        <form className={classes.form}>
            <Grid container style={{flexDirection: 'column'}} spacing={2}>
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
                <Grid item xs={6}>
                    <TextField
                        id="description"
                        label="Descripción"
                        variant="outlined"
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
                <CollapsableList
                    typeName='Reglas'
                    attributeName='rules'
                    items={data.group.rules}
                    onclick={handleDeleteRulesOrObjectiveClick}
                    onchange={handleChangeTextListField}
                />
            </Grid>
            <Grid item xs={12}>
                <CollapsableList
                    typeName='Objetivos'
                    attributeName='objectives'
                    items={data.group.objectives}
                    onclick={handleDeleteRulesOrObjectiveClick}
                    onchange={handleChangeTextListField}
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
        user: state.user,
        group: state.group,
    };
};

export default connect(mapStateToProps)(GroupAdmin);