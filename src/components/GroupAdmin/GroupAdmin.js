import React, {useEffect, useState} from 'react';

import {connect} from "react-redux";

import {useStyles} from "../hooks/useStyles";
import {ListItemSecondaryAction, TextField} from '@material-ui/core';
import Grid from "@material-ui/core/Grid";

import ListSubheader from '@material-ui/core/ListSubheader';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';
import ClearIcon from '@material-ui/icons/Clear';

import './GroupAdmin.css';
import IconButton from "@material-ui/core/IconButton";

import {getGroupCreator} from "../../store/group/groupActions";
import CollapsableList from "../CollapsableList/CollapsableList";
import ComplexCollapsableList from "../CollapsableList/ComplexCollapsableList";
import Container from "@material-ui/core/Container";

function GroupAdmin(props) {
    const classes = useStyles();
    let image = 'https://cdn.pixabay.com/photo/2015/03/17/14/05/sparkler-677774_960_720.jpg';

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
        props.dispatch(getGroupCreator(props.user.userData, props.groupId));
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
    };

    const handleDeleteRuleClick = (element) => {
        let updatedRules = data.group.rules.filter(rule => rule !== element);
        setData({
            ...data,
            group: {
                ...data.group,
                rules: updatedRules
            }
        });
    };

    const handleDeleteObjectiveClick = (element) => {
        let updatedObjectives = data.group.objectives.filter(rule => rule !== element);
        setData({
            ...data,
            group: {
                ...data.group,
                objectives: updatedObjectives
            }
        });
    };

    return <Container className={'container__main'}>
        <img
            className='container__main-photo'
            src={image}
            alt="Group photo"
        />

        <form className={classes.form}>
            <Grid container style={{flexDirection: 'column'}} spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        id="name"
                        label="Nombre"
                        variant="outlined"
                        value={data.group.name}
                        name='name'
                        onChange={e => handleChangeTextFields(e)}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id="description"
                        label="Descripción"
                        variant="outlined"
                        value={data.group.description}
                        name='description'
                        onChange={e => handleChangeTextFields(e)}
                    />
                </Grid>
            </Grid>


            <ListSubheader component="div" id="nested-list-subheader">
                Información adicional
            </ListSubheader>


            <Grid item xs={8}>
                <CollapsableList
                    typeName='Reglas'
                    items={data.group.rules}
                    onclick={handleDeleteRuleClick}/>
            </Grid>

            <Grid item xs={8}>
                <CollapsableList
                    typeName='Objetivos'
                    items={data.group.objectives}
                    onclick={handleDeleteObjectiveClick}/>
            </Grid>

            <Grid item xs={8}>
                <ComplexCollapsableList typeName='Miembros activos' items={data.activeMembers}>
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="comments">
                            <DeleteIcon/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ComplexCollapsableList>
            </Grid>

            <Grid item xs={8}>
                < ComplexCollapsableList typeName='Solicitudes de ingreso' items={data.pendingMembers}>
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="comments">
                            <ClearIcon/>
                        </IconButton>
                        <IconButton edge="end" aria-label="comments">
                            <CheckIcon/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ComplexCollapsableList>
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