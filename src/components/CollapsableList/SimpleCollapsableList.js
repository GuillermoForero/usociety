import React, {useEffect, useState} from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import {ListItemSecondaryAction, TextField} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import {useStyles} from "../../hooks/useStyles";

import EditIcon from '@material-ui/icons/Edit';
import AddIcon from "@material-ui/icons/Add";
import {ExpandMore} from "@material-ui/icons";


function SimpleCollapsableList(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(true);
    const [editableList, setEditableList] = useState({});

    const handleClick = () => {
        setOpen(!open);
    };

    let items = props.items;
    useEffect(() => {
        setOpen(items.length > 0);
    }, [props.items]);


    const handleEditClick = key => {
        let updatedEditableList = Object.assign({}, editableList);
        if (updatedEditableList[key] === undefined) {
            updatedEditableList[key] = true;
        } else {
            updatedEditableList[key] = !updatedEditableList[key];
        }
        setEditableList(updatedEditableList);
    };

    const handleDeleteClick = (item) => {
        props.ondeleteclick(attributeName, item);
        setEditableList({});
    };

    const attributeName = props.attributeName;


    return <List component="nav" aria-labelledby="nested-list-subheader" className={classes.root}>

        <ListItem className={classes.withoutCursor} button>
            <ListItemIcon onClick={handleClick} className={classes.withCursor}>
                <FormatListBulletedIcon/>
            </ListItemIcon>
            <ListItemText primary={props.typeName}
            />
            {open || items.length === 0
                ? <AddIcon
                    className={classes.withCursor}
                    onClick={() => props.addlistitem(attributeName)}
                />
                : <ExpandMore
                    className={classes.withCursor}
                    onClick={handleClick}/>}
        </ListItem>

        <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>

                {items && items.length > 0 && items.map((item, index) =>
                    (<ListItem key={index} button className={classes.nested}>
                        <ListItemIcon>
                        </ListItemIcon>
                        <TextField
                            value={item}
                            fullWidth
                            onChange={(e) =>
                                props.onchange(e, attributeName, index)
                            }
                        />

                        <ListItemSecondaryAction>
                            <IconButton
                                edge="end"
                                aria-label="comments"
                                disabled={editableList[index]}
                                onClick={() => handleEditClick(index)}
                            >
                                <EditIcon/>
                            </IconButton>
                            <IconButton
                                edge="end"
                                aria-label="comments"
                                onClick={() => handleDeleteClick(item)}
                            >
                                <DeleteIcon/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>))}
            </List>
        </Collapse>
    </List>
}


export default SimpleCollapsableList;
