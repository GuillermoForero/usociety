import React, {Fragment, useEffect} from 'react';
import {AppBar, IconButton, List, ListItem, ListItemText, makeStyles, Toolbar} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import {AccountCircle} from "@material-ui/icons";
import Divider from '@material-ui/core/Divider';

import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

import GroupAdd from '@material-ui/icons/GroupAdd';
import GroupIcon from '@material-ui/icons/Group';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import ListItemIcon from "@material-ui/core/ListItemIcon";

const useStyles = makeStyles((theme) => ({
    list: {
        width: '100%',
        height: '100vh',
        maxWidth: 300,
        position: 'fixed',
        left: '0',
        top: '0',
        backgroundColor: 'var(--primary)',
        zIndex: 10
    },
    ancla: {
        textDecoration: 'none',
        color: 'white'
    },
    button: {
        color: 'white'
    }
}));

function renderRow(props) {
    const { text, index } = props;

    return (
        <ListItem button key={index}>
            <ListItemText primary={`${text}`} />
        </ListItem>
    );
}

const Layout = (props) => {
    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [menuLeft, setMenuLeft] = React.useState(false);
    const open = Boolean(anchorEl);
    const mainTitle = useSelector(state => state.global.mainTitle);

    const handleMenu = (event) => {
        //open edit profile view
    };
    const handleClick = () => {
        const menu = document.getElementById('menu-left');
        if (menu.target){
            return null
        }
        setMenuLeft(false);
    }
    useEffect(() => {
        document.addEventListener('mousedown', )
    }, [])

    return <Fragment>
        <div className={classes.root}>
            <AppBar position="static" style={{backgroundColor: 'var(--primary)'}}>
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => setMenuLeft(true)}>
                        <MenuIcon/>
                    </IconButton>
                    {menuLeft &&
                        <List component="nav" aria-label="secondary mailbox folders" className={classes.list} id={'menu-left'}>
                                <ListItem button style={{cursor:'default'}} onClick={() => setMenuLeft(false)}>
                                    <MenuIcon  button style={{cursor:'pointer'}}/>
                                </ListItem>
                            <Link to={'/home'} className={classes.ancla}>
                                <ListItem button>
                                    <ListItemIcon>
                                        <GroupIcon className={classes.button}/>
                                    </ListItemIcon>
                                    <ListItemText primary="Mis grupos" />
                                </ListItem>
                            </Link>
                            <Link to={'/search'} className={classes.ancla}>
                                <ListItem button href="#simple-list">
                                    <ListItemIcon>
                                        <GroupAdd className={classes.button}/>
                                    </ListItemIcon>
                                    <ListItemText primary="Descubrir grupos" />
                                </ListItem>
                            </Link>

                            <Divider/>
                            <Link to={'/'} className={classes.ancla}>
                                <ListItem button href="#simple-list">
                                    <ListItemIcon>
                                        <ExitToAppIcon className={classes.button}/>
                                    </ListItemIcon>
                                    <ListItemText primary="Cerrar sesión" />
                                </ListItem>
                            </Link>
                        </List>
                    }
                    <Typography variant="h6" className={classes.title}>
                        {mainTitle || 'USociety (dynamically)'}
                    </Typography>
                    {auth && (
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle/>
                            </IconButton>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
        {props.children}
    </Fragment>
};

export default Layout;