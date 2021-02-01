import React, {Fragment, useEffect} from 'react';

import {connect} from 'react-redux';
import {listUserGroupsCreator} from "../../store/group/groupActions";
import Loader from "../../components/Loader/Loader";
import * as actionTypes from "../../store/actionsTypes";
import CustomTable from "../../components/CustomTable/CustomTable";
import {useStyles} from "../../hooks/useStyles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import {Link} from "react-router-dom";
import PageError from "../../components/PageError/PageError";

function Home(props) {
    const classes = useStyles();

    //eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        props.dispatch({type: actionTypes.SET_MAIN_TITLE, payload: {title: 'U Society - Sergio Arboleda'}});
        props.dispatch(listUserGroupsCreator(props.userState.data))
    }, []);

    const rows = props.groupState.userGroups;

    const handleClosePageError = () => {
        props.dispatch({type: actionTypes.RESET_ERROR})
    };

    return <Fragment>
        {<Loader isOpen={props.groupState.isLoading}/>}
        <PageError
            isOpen={props.groupState.hasError}
            onclose={handleClosePageError}
            errorDescription={props.groupState.errorDescription}/>

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
        groupState: state.group,
        userState: state.user
    }
};

export default connect(mapStateToProps)(Home);