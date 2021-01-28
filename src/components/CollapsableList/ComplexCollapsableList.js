import React, {useState} from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import {useStyles} from "../hooks/useStyles";


function ComplexCollapsableList(props) {
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
                {props.items && props.items.map(member =>
                    (<ListItem key={member.id} button className={classes.nested}>
                        <ListItemIcon>
                        </ListItemIcon>
                        <ListItemText primary={`${member.name} (${member.username})`}/>
                        {props.children}
                    </ListItem>))}
            </List>
        </Collapse>
    </List>
}


export default ComplexCollapsableList;
