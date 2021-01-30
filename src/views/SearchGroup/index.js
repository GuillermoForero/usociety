import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import {FormControl, InputLabel, MenuItem, Select, TableCell} from "@material-ui/core";

import {connect} from 'react-redux';
import {searchGroupsCreator} from "../../store/group/groupActions";
import {loadCategoriesCreator} from "../../store/category/categoryActions";
import {useStyles} from "../../hooks/useStyles";
import * as actionTypes from "../../store/actionsTypes";
import Loader from "../../components/Loader/Loader";
import {withStyles} from "@material-ui/core/styles";
import CustomTable from "../../components/Table/Table";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: 'var(--terciary)',
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);


function SearchGroup(props) {
    const classes = useStyles();

    const [query, setQuery] = useState({
        'groupName': '',
        'categoryId': '',
    });

    useEffect(() => {
        props.dispatch({type: actionTypes.SET_MAIN_TITLE, payload: {title: 'Descubre grupos de tu interés'}});
        props.dispatch(loadCategoriesCreator());
    }, []);

    const rows = props.group.groups;

    const handleSearchButtonClick = () => {
        props.dispatch(searchGroupsCreator(query));
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
                                    key={category.id}
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
                <CustomTable rows={rows}/>
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

export default connect(mapStateToProps)(SearchGroup);