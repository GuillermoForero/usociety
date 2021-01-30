import React, {Fragment, useEffect} from 'react';

import {connect} from 'react-redux';
import {listUserGroupsCreator} from "../../store/group/groupActions";
import Loader from "../../components/Loader/Loader";
import * as actionTypes from "../../store/actionsTypes";
import CustomTable from "../../components/Table/Table";
import {useStyles} from "../../hooks/useStyles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import {Link} from "react-router-dom";

function Home(props) {
    const classes = useStyles();

    //eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        props.dispatch({type: actionTypes.SET_MAIN_TITLE, payload: {title: 'U Society - Sergio Arboleda'}});
        props.dispatch(listUserGroupsCreator(props.user))
    }, []);

    const rows = props.group.userGroups;

    return <Fragment>
        {<Loader isOpen={props.group.isFetching}/>}
        <Container component="main" maxWidth={"md"} className={classes.container}>
            <Link to='/group/create'>
                <Button
                    color='primary'
                    variant='contained'
                    className={classes.submit}
                    style={{height:'50px'}}
                >
                    Crea tu propio grupo
                </Button>
            </Link>
        </Container>
        <CustomTable rows={rows} buttonText='Entrar'/>
    </Fragment>
}

const mapStateToProps = state => {
    return {
        group: state.group,
        user: state.user.userData
    }
};

export default connect(mapStateToProps)(Home);