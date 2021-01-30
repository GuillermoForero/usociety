import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";

import Image from 'material-ui-image';

import {connect} from 'react-redux';
import {listUserGroupsCreator} from "../../store/group/groupActions";
import Loader from "../../components/Loader/Loader";
import * as actionTypes from "../../store/actionsTypes";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: 'var(--terciary)',
        color: theme.palette.common.white,
        fontFamily: 'lato',
        fontSize: '16px'
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

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
    table: {
        fontFamily: 'lato'
    }
}));

function Home(props) {
    const classes = useStyles();

    useEffect(() => {
        props.dispatch({type: actionTypes.SET_MAIN_TITLE, payload: {title: 'USociety'}});
        props.dispatch(listUserGroupsCreator(props.user))
    }, []);

    const rows = props.group.userGroups;

    return (
        <>
            <Container component="main" maxWidth={"md"} className={classes.container}>
                {<Loader isOpen={props.group.isFetching}/>}
                <TableContainer component={Paper}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="left"/>
                                <StyledTableCell align="left">Nombre</StyledTableCell>
                                <StyledTableCell align="center">Categoria</StyledTableCell>
                                <StyledTableCell align="center">Acción</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell align="left">
                                        <Image
                                            src={row.photo}
                                            aspectRatio={(4 / 3)}
                                        />
                                    </TableCell>
                                    <TableCell align="left">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="center">{row.category.name}</TableCell>
                                    <TableCell align="center"><Button
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                    >
                                        Visualizar
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
        group: state.group,
        user: state.user.userData
    }
};

export default connect(mapStateToProps)(Home);