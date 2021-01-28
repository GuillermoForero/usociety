import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MenuIcon from '@material-ui/icons/Menu';
import {
    AppBar,
    FormGroup,
    IconButton,
    Menu,
    MenuItem, Paper,
    Switch,
    Table, TableBody, TableCell,
    TableContainer,
    TableHead, TableRow,
    Toolbar
} from "@material-ui/core";
import {AccountCircle} from "@material-ui/icons";
import RecipeReviewCard from "./Card";
import Card2 from "./Card2";

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

export default function GroupPrincipal() {
    const classes = useStyles();

    return (
        <>
            <Container component="main" maxWidth={"md"} className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} justify="center" style={{display: "flex"}}>
                            <RecipeReviewCard/>
                        </Grid>
                        <Grid item xs={12} justify="center" style={{display: "flex"}}>
                            <Card2/>
                        </Grid>
                        <Grid item xs={12} justify="center" style={{display: "flex"}}>
                            <RecipeReviewCard/>
                        </Grid>
                </Grid>
            </Container>
        </>

    );
}
