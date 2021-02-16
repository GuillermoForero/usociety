import React, {Fragment, useEffect} from 'react';
import {AppBar, IconButton, List, ListItem, ListItemText, makeStyles, Toolbar} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider';
import defaultUserImage from '../../images/default-user.png';

import {useSelector} from "react-redux";
import {Link as RouterLink} from "react-router-dom";
import Link from '@material-ui/core/Link';

import GroupAdd from '@material-ui/icons/GroupAdd';
import GroupIcon from '@material-ui/icons/Group';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import ListItemIcon from "@material-ui/core/ListItemIcon";
import {getImage} from "../../configuration/utils";

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


const Layout = (props) => {
    const classes = useStyles();
    const [menuLeft, setMenuLeft] = React.useState(false);
    const mainTitle = useSelector(state => state.global.mainTitle);
    const userPhoto = useSelector(state => getImage(state.user.data.user?.photo) || defaultUserImage);
    const userName = useSelector(state => state.user.data.user?.username);

    const handleMenu = (event) => {
        //open edit profile view
    };
    const handleClick = () => {
        const menu = document.getElementById('menu-left');
    }
    useEffect(() => {
        document.addEventListener('mousedown', handleClick)
    }, [])

    return <Fragment>
        <div className={classes.root}>
            <AppBar position="static" style={{backgroundColor: 'var(--primary)'}}>
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
                                onClick={() => setMenuLeft(true)}>
                        <MenuIcon/>
                    </IconButton>
                    {menuLeft &&
                        <List component="nav" aria-label="secondary mailbox folders" className={classes.list} id={'menu-left'}>
                                <ListItem style={{cursor:'default'}} onClick={() => setMenuLeft(false)}>
                                    <MenuIcon style={{cursor:'pointer'}}/>
                                </ListItem>
                            <RouterLink to={'/home'} className={classes.ancla}>
                                <ListItem onClick={() => setMenuLeft(false)}>
                                    <ListItemIcon>
                                        <GroupIcon className={classes.button}/>
                                    </ListItemIcon>
                                    <ListItemText primary="Mis grupos" />
                                </ListItem>
                            </RouterLink>
                            <RouterLink to={'/search'} className={classes.ancla}>
                                <ListItem href="#simple-list" onClick={() => setMenuLeft(false)}>
                                    <ListItemIcon>
                                        <GroupAdd className={classes.button}/>
                                    </ListItemIcon>
                                    <ListItemText primary="Descubrir grupos" />
                                </ListItem>
                            </RouterLink>

                            <Divider/>
                            <Link href='/' className={classes.ancla} onClick={() => {
                                localStorage.setItem('userData', null);
                            }}>
                                <ListItem href="#simple-list">
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

                    <div style={{display: 'flex', flexDirection: 'flex-end', width: '40px', height: '40px'}}>
                        <RouterLink to={"/profile/" + userName}>
                            <img
                                src={userPhoto}
                                style={{
                                    borderRadius: '50px',
                                    objectFit: 'cover',
                                    cursor: 'pointer',
                                    width: '100%',
                                    height: '100%',
                                }}
                                alt='User'/>
                        </RouterLink>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
        {props.children}
    </Fragment>
};

export default Layout;