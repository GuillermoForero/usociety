import React, {Fragment} from 'react';

import {connect} from "react-redux";

import {useStyles} from "../hooks/useStyles";
import {TextField} from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import ListSubheader from '@material-ui/core/ListSubheader';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

import GroupIcon from '@material-ui/icons/Group';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';

import './GroupAdmin.css';

function GroupAdmin(props) {
    const classes = useStyles();


    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const handleClick2 = () => {
        setOpen2(!open2);
    };


    const handleClick3 = () => {
        setOpen3(!open3);
    };

    return <Fragment>
        <form className={classes.root} style={{marginTop: '20px'}}>
            <Grid className='container__main' container spacing={1}>
                <div className='container__main-photo'>

                </div>

                <ListSubheader component="div" id="nested-list-subheader">
                    Nested List Items
                </ListSubheader>

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

                <Grid item xs={6}>
                    <List
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        className={classes.root}>

                        <ListItem button onClick={handleClick}>
                            <ListItemIcon>
                                <FormatListBulletedIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Reglas"/>
                            {open ? <ExpandLess/> : <ExpandMore/>}
                        </ListItem>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <StarBorder/>
                                    </ListItemIcon>
                                    <ListItemText primary="Starred"/>
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
                                        <StarBorder/>
                                    </ListItemIcon>
                                    <ListItemText primary="Starred"/>
                                </ListItem>
                            </List>
                        </Collapse>

                        <ListItem button onClick={handleClick3}>
                            <ListItemIcon>
                                <GroupIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Miembros"/>
                            {open3 ? <ExpandLess/> : <ExpandMore/>}
                        </ListItem>
                        <Collapse in={open3} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <StarBorder/>
                                    </ListItemIcon>
                                    <ListItemText primary="Starred"/>
                                </ListItem>
                            </List>
                        </Collapse>
                    </List>
                </Grid>
            </Grid>
        </form>
    </Fragment>
}

const mapStateToProps = state => {
    return {
        user: state.user.userData,
        group: state.group,
    };
};

export default connect(mapStateToProps)(GroupAdmin);