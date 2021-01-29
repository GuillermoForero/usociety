import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";

import {connect} from 'react-redux';
import {searchGroupsCreator} from "../../store/group/groupActions";
import {loadCategoriesCreator} from "../../store/category/categoryActions";
import {useStyles} from "../../hooks/useStyles";
import * as actionTypes from "../../store/actionsTypes";
import Loader from "../../components/Loader/Loader";

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


function Master2(props) {
    const classes = useStyles();

    const [query, setQuery] = useState({
        'groupName': '',
        'categoryId': '',
    });

    useEffect(() => {
        props.dispatch(loadCategoriesCreator());
        props.dispatch({type: actionTypes.SET_MAIN_TITLE, payload: {title: 'Descubre grupos de tu interés'}});
    }, []);

    const rows = props.group.groups;

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
            <Container component="main" maxWidth={"md"} className={classes.container}>
                <Loader isOpen={props.group.isFetching || props.category.isFetching}/>

                <Grid container spacing={1}>
                    <Grid container>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="groupName"
                            label="Nombre del grupo"
                            name="nombre"
                            autoComplete="lname"
                            onChange={e => handleChange(e)}
                            type="search"
                        />
                    </Grid>

                    <FormControl className={classes.formControl} fullWidth style={{marginTop: '10px'}}>
                        <InputLabel id="category">Categoría</InputLabel>
                        <Select
                            labelId="category"
                            id="category"
                            defaultValue='none'
                        >
                            <MenuItem value="none" disabled>
                                Selecciona una categoría
                            </MenuItem>
                            {props.category && props.category.categories.map(category =>
                                (<MenuItem
                                    ket={category.id}
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
                            disabled={(!query.groupName && !query.categoryId)}
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
        global: state.global
    }
};

export default connect(mapStateToProps)(Master2);