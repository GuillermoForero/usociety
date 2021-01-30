import React from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import Image from "material-ui-image";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import {makeStyles, withStyles} from '@material-ui/core/styles';
import {Link} from "react-router-dom";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: 'gray',
        color: theme.palette.common.white,
        fontFamily: 'lato',
        fontSize: '16px',
        fontWeight: 'bold'
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        '*': {
            fontFamily: 'lato',
            fontSize: '15px',
        }
    },
}))(TableRow);


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
        }
    }))
;

function CustomTable(props) {
    const classes = useStyles();

    let defaultGroupImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvOG20v4uuVi8OimyyVYks8ITGovRRlSbmUQ&usqp=CAU';

    return <Container component="main" maxWidth={"md"} className={classes.container}>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="left"/>
                        <StyledTableCell align="left">Nombre</StyledTableCell>
                        <StyledTableCell align="left">Categoria</StyledTableCell>
                        <StyledTableCell align="center">Descripción</StyledTableCell>
                        <StyledTableCell align="center">Acción</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.rows.map((row) => (
                        <StyledTableRow key={row.id}>
                            <TableCell calign="left">
                                {<Image
                                    className={classes.table}
                                    src={row.photo || defaultGroupImage}
                                    color={'rgba(0,0,0,0)'}
                                    imageStyle={{
                                        borderRadius: '100px',
                                        objectFit: 'cover'
                                    }}/>}
                            </TableCell>
                            <TableCell
                                className={classes.table}
                                align="left">
                                {row.name}
                            </TableCell>
                            <TableCell
                                className={classes.table}
                                align="left">
                                {row.category.name}
                            </TableCell>
                            <TableCell
                                className={classes.table}
                                align="center"
                                style={{
                                    maxWidth: '100px',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden'
                                }}
                            >
                                {row.description}
                            </TableCell>
                            <TableCell
                                className={classes.table}
                                align="center">
                                <Link to={`/group/${row.slug}/view`}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}>
                                        {props.buttonText}
                                    </Button>
                                </Link>
                            </TableCell>
                        </StyledTableRow>))}
                </TableBody>
            </Table>
        </TableContainer>
    </Container>;
}

export default CustomTable;