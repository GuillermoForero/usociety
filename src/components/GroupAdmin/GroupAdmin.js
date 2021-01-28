import React, {Fragment} from 'react';

import {connect} from "react-redux";

import {useStyles} from "../hooks/useStyles";
import {ListItemSecondaryAction, TextField} from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import ListSubheader from '@material-ui/core/ListSubheader';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import GroupIcon from '@material-ui/icons/Group';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';

import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import ClearIcon from '@material-ui/icons/Clear';


import './GroupAdmin.css';
import IconButton from "@material-ui/core/IconButton";

function GroupAdmin(props) {
    const classes = useStyles();


    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    const [open4, setOpen4] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const handleClick2 = () => {
        setOpen2(!open2);
    };


    const handleClick3 = () => {
        setOpen3(!open3);
    };

    const handleClick4 = () => {
        setOpen4(!open4);
    };

    let image = 'https://cdn.pixabay.com/photo/2015/03/17/14/05/sparkler-677774_960_720.jpg';

    return <Fragment>

        <Grid className='container__main' container spacing={1} style={{paddingTop: '20px'}}>
            <img
                className='container__main-photo'
                src={image}
            />

            <form className={classes.root}>
                <Grid container spacing={2} style={{flexDirection:'column'}}>
                    <Grid item xs={6}>
                        <TextField
                            id="name"
                            label="Nombre"
                            variant="outlined"
                            value="Nombre del grupo"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="description"
                            label="Descripción"
                            variant="outlined"
                        />
                    </Grid>
                </Grid>


                <ListSubheader component="div" id="nested-list-subheader">
                    Nested List Items
                </ListSubheader>


                <Grid item xs={8}>
                    <List
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        className={classes.root}>

                        <ListItem button onClick={handleClick}>
                            <ListItemIcon>
                                <FormatListBulletedIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Reglas"
                            />
                            {open ? <ExpandLess/> : <ExpandMore/>}
                        </ListItem>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                    </ListItemIcon>
                                    <ListItemText primary="Starred"/>
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="comments">
                                            <DeleteIcon/>
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </List>
                        </Collapse>

                        <ListItem button onClick={handleClick2}>
                            <ListItemIcon>
                                <FormatListNumberedIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Objetivos"/>
                            {open2 ? <ExpandLess/> : <ExpandMore/>}
                        </ListItem>
                        <Collapse in={open2} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                    </ListItemIcon>
                                    <ListItemText primary="Starred"/>
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="comments">
                                            <DeleteIcon/>
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </List>
                        </Collapse>

                        <ListItem button onClick={handleClick3}>
                            <ListItemIcon>
                                <GroupAddIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Miembros activos"/>
                            {open3 ? <ExpandLess/> : <ExpandMore/>}
                        </ListItem>
                        <Collapse in={open3} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                    </ListItemIcon>
                                    <ListItemText primary="Starred"/>
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="comments">
                                            <DeleteIcon/>
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </List>
                        </Collapse>


                        <ListItem button onClick={handleClick4}>
                            <ListItemIcon>
                                <GroupIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Solicitudes de ingreso"/>
                            {open4 ? <ExpandLess/> : <ExpandMore/>}
                        </ListItem>
                        <Collapse in={open4} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                    </ListItemIcon>
                                    <ListItemText primary="Starred"/>
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="comments">
                                            <ClearIcon/>
                                        </IconButton>
                                        <IconButton edge="end" aria-label="comments">
                                            <CheckIcon/>
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </List>
                        </Collapse>
                    </List>
                </Grid>
            </form>
        </Grid>
    </Fragment>
}

const mapStateToProps = state => {
    return {
        user: state.user.userData,
        group: state.group,
    };
};

export default connect(mapStateToProps)(GroupAdmin);