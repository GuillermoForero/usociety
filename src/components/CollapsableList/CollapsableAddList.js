import React from 'react';
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
import AddIcon from '@material-ui/icons/Add';

function CollapsableAddList(props) {
    const classes = useStyles();

    let items = props.items;
    const attributeName = props.attributeName;


    return <List component="nav" aria-labelledby="nested-list-subheader" className={classes.root}>

        <ListItem button>
            <ListItemIcon>
                <FormatListBulletedIcon/>
            </ListItemIcon>
            <ListItemText primary={props.typeName}
            />
            {<AddIcon onClick={() => props.addlistitem(attributeName)}/>}
        </ListItem>

        <Collapse in={true} timeout="auto" unmountOnExit>
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
                                onClick={() => props.ondeleteclick(attributeName, item)}
                            >
                                <DeleteIcon/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>))}
            </List>
        </Collapse>
    </List>
}


export default CollapsableAddList;
