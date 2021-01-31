import React from 'react';
import {Route} from "react-router-dom";
import {connect} from "react-redux";

const GuardedRoute = ({ component: Component }) => (
    <Route render={(props) => (
        <Component />
    )} />
)
const mapStateToProps = state => {
    return {
        group: state.group,
        user: state.user.data
    }
};

export default connect(mapStateToProps)(GuardedRoute);
//props.user === true
//    ? <Component />
//    : <Redirect to='/' />