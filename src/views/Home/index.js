import React, {Fragment, useEffect} from 'react';

import {connect} from 'react-redux';
import {listUserGroupsCreator} from "../../store/group/groupActions";
import Loader from "../../components/Loader/Loader";
import * as actionTypes from "../../store/actionsTypes";
import CustomTable from "../../components/Table/Table";


function Master(props) {

    useEffect(() => {
        props.dispatch({type: actionTypes.SET_MAIN_TITLE, payload: {title: 'USociety'}});
        props.dispatch(listUserGroupsCreator(props.user))
    }, []);

    const rows = props.group.userGroups;

    return <Fragment>
        {<Loader isOpen={props.group.isFetching}/>}
        <CustomTable rows={rows}/>
    </Fragment>
}

const mapStateToProps = state => {
    return {
        group: state.group,
        user: state.user.userData
    }
};

export default connect(mapStateToProps)(Master);