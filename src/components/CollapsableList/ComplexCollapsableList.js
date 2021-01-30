import React, {useState} from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import {useStyles} from "../../hooks/useStyles";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import CheckIcon from "@material-ui/icons/Check";
import {ListItemSecondaryAction} from "@material-ui/core";

import * as userGroupStatus from '../../store/group/groupInterfaces';


function ComplexCollapsableList(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return <List component="nav" aria-labelledby="nested-list-subheader" className={classes.root}>

        <ListItem button onClick={handleClick}>
            <ListItemIcon>
                {props.children}
            </ListItemIcon>
            <ListItemText primary={props.typeName}
            />
            {open ? <ExpandLess/> : <ExpandMore/>}
        </ListItem>

        <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                {props.items && props.items.map(member =>
                    (<ListItem key={member.id} button className={classes.nested}>
                        <ListItemIcon>
                        </ListItemIcon>
                        <ListItemText primary={`${member.name} (${member.username})`}/>
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="comments"
                                        onClick={() => props.onclick(member.id, userGroupStatus.DELETED)}>
                                <ClearIcon/>
                            </IconButton>
                            {props.showCheck && <IconButton edge="end"
                                                            aria-label="comments"
                                                            onClick={() => props.onclick(member.id, userGroupStatus.ACTIVE)}>
                                <CheckIcon/>
                            </IconButton>}
                        </ListItemSecondaryAction>
                    </ListItem>))}
            </List>
        </Collapse>
    </List>
}


export default ComplexCollapsableList;
