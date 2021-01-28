import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MenuIcon from '@material-ui/icons/Menu';
import {
    AppBar,
    FormControl,
    IconButton,
    InputLabel,
    Menu,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Toolbar
} from "@material-ui/core";
import {AccountCircle} from "@material-ui/icons";

import {connect} from 'react-redux';
import {searchGroupsCreator} from "../store/actions/groupActions";
import {loadCategoriesCreator} from "../store/actions/categoryActions";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    container: {
        marginTop: theme.spacing(4),
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function Master2(props) {
    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const [query, setQuery] = useState({
        'groupName': '',
        'categoryId': '',
    });


    useEffect(()=>{
        props.dispatch(loadCategoriesCreator());
    }, []);

    function createData(name, category) {
        return {name, category};
    }

    const rows = props.group.groups;

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSearchButtonClick = () => {
        props.dispatch(searchGroupsCreator(props.user.userData, query));
    };

    const handleCategoryItemClick = categoryId => {
        setQuery({...query, categoryId: categoryId});
    };

    const handleChange = e => {
        setQuery({...query, groupName: e.target.value});
    };

    return (
        <>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar style={{justifyContent: "space-between"}}>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Buscar grupos
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
            <Container component="main" maxWidth={"md"} className={classes.container}>
                <Grid container spacing={1}>
                    <Grid container >
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="groupName"
                            label="Nombre del grupo"
                            name="nombre"
                            autoComplete="lname"
                            onChange={e => handleChange(e)}
                        />
                    </Grid>

                    <FormControl className={classes.formControl} fullWidth  style={{marginTop: '10px'}}>
                        <InputLabel id="category">Categoría</InputLabel>
                        <Select
                            labelId="category"
                            id="category">
                            {props.category && props.category.categories.map(category =>
                                (<MenuItem
                                    id={category.id}
                                    value={category.id}
                                    onClick={categoryId => handleCategoryItemClick(category.id)}
                                >{category.name}
                                </MenuItem>)
                            )}
                        </Select>
                    </FormControl>

                    <Grid container item xs={12} spacing={3} style={{display: 'flex', justifyContent: 'center'}}>
                        <Button
                            variant="contained"
                            color="default"
                            className={classes.submit}
                            style={{marginTop: '30px'}}
                            onClick={handleSearchButtonClick}
                        >
                            Buscar
                        </Button>
                    </Grid>
                    <Grid container item xs={12} spacing={3}>
                    </Grid>
                </Grid>
                <TableContainer component={Paper}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nombre</TableCell>
                                <TableCell align="center">Categoria</TableCell>
                                <TableCell align="center">Acción</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="center">{row.category.name}</TableCell>
                                    <TableCell align="center"><Button
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                    >
                                        Entrar
                                    </Button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </>

    );
}

const mapStateToProps = state => {
    return {
        user: state.user,
        category: state.category,
        group: state.group,
    }
};

export default connect(mapStateToProps)(Master2);