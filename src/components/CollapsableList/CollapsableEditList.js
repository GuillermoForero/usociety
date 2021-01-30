import React, {useState} from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import {ListItemSecondaryAction, TextField} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import {useStyles} from "../../hooks/useStyles";

import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';

function CollapsableEditList(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    let items = props.items;
    const attributeName = props.attributeName;

    return <List component="nav" aria-labelledby="nested-list-subheader" className={classes.root}>

        <ListItem button onClick={handleClick}>
            <ListItemIcon>
                <FormatListBulletedIcon/>
            </ListItemIcon>
            <ListItemText primary={props.typeName}
            />
            {open ? <ExpandLess/> : <ExpandMore/>}
        </ListItem>

        <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>

                {items && items.length > 0 && items.map((item, index) =>
                    (item && (<ListItem key={index} button className={classes.nested}>
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
                                aria-label="comments">
                                <EditIcon/>
                            </IconButton>
                            <IconButton
                                edge="end"
                                aria-label="comments"
                                onClick={() => props.onclick(attributeName, item)}
                            >
                                <DeleteIcon/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>)))}
            </List>
        </Collapse>
    </List>
}


export default CollapsableEditList;
