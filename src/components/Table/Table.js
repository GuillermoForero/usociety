import React from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import Image from "material-ui-image";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import {makeStyles, withStyles} from '@material-ui/core/styles';

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
            fontFamily: 'lato',
            fontSize: '15px',
        }
    }))
;

function CustomTable(props) {

    const classes = useStyles();

    return <Container component="main" maxWidth={"md"} className={classes.container}>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="left"/>
                        <StyledTableCell align="left">Nombre</StyledTableCell>
                        <StyledTableCell align="center">Categoria</StyledTableCell>
                        <StyledTableCell align="center">Acción</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell calign="left">
                                <Image
                                    className={classes.table}
                                    src={row.photo}
                                    aspectRatio={(4 / 3)}
                                />
                            </TableCell>
                            <TableCell
                                className={classes.table}
                                align="left">
                                {row.name}
                            </TableCell>
                            <TableCell
                                className={classes.table}
                                align="center">
                                {row.category.name}
                            </TableCell>
                            <TableCell
                                className={classes.table}
                                align="center">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}>
                                    Visualizar
                                </Button>
                            </TableCell>
                        </TableRow>))}
                </TableBody>
            </Table>
        </TableContainer>
    </Container>;
}

export default CustomTable;