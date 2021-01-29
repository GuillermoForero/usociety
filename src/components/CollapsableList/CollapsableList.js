import React, {useState} from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import {ListItemSecondaryAction} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import {useStyles} from "../../hooks/useStyles";


function CollapsableList(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

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
                {props.items && props.items.length > 0 && props.items.map(item =>
                    (item && (<ListItem key={new Date()} button className={classes.nested}>
                        <ListItemIcon>
                        </ListItemIcon>
                        <ListItemText primary={item}
                        />
                        <ListItemSecondaryAction onClick={() => props.onclick(item)}>
                            <IconButton edge="end" aria-label="comments">
                                <DeleteIcon/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>)))}
            </List>
        </Collapse>
    </List>
}


export default CollapsableList;
