import React, {Fragment} from 'react';
import {
    AppBar,
    IconButton, List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Menu,
    MenuItem,
    Toolbar
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import {AccountCircle} from "@material-ui/icons";
import { FixedSizeList } from 'react-window';

import {connect, useSelector} from "react-redux";
import {Link} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    list: {
        width: '100%',
        height: '100vh',
        maxWidth: 300,
        position: 'fixed',
        left: '0',
        top: '0',
        backgroundColor: '#4051b5',
        zIndex: 10
    },
    ancla: {
        textDecoration: 'none',
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
    const itemsMenu = {text: 'hola mundo en java', index: 1};
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return <Fragment>
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon on onClick={() => setMenuLeft(true)}/>
                    </IconButton>
                    {menuLeft &&
                        <List component="nav" aria-label="secondary mailbox folders" className={classes.list}>
                            <Link to={'/master'} className={classes.ancla}>
                                <ListItem button onClick={() => setMenuLeft(false)}>
                                    <MenuIcon on onClick={() => setMenuLeft(false)}/>
                                </ListItem>
                                <ListItem button>
                                    <ListItemText primary="Mis grupos" />
                                </ListItem>
                            </Link>
                            <Link to={'/master2'} className={classes.ancla}>
                                <ListItem button href="#simple-list">
                                    <ListItemText primary="Descubrir grupos" />
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
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
        {props.children}
    </Fragment>
};

export default Layout;