import store from "../store";
import * as actionTypes from '../actionsTypes';

var axios = require('axios');
var FormData = require('form-data');

export const creatingUser = () => {
    return {
        type: actionTypes.CREATING_USER,
    };
};

export const createdUser = user => {
    return {
        type: actionTypes.CREATED_USER,
        data: user
    };
};

export const receivedError = () => {
    return {
        type: actionTypes.RECEIVED_ERROR
    };
};

export const loggingUser = () => {
    return {
        type: actionTypes.LOGGING_USER,
    };
};

export const userLogged = user => {
    return {
        type: actionTypes.USER_LOGGED,
        data: user
    };
};


export const saveUserCreator = user => {
    store.dispatch(creatingUser());
    return async function (dispatch, getState) {
        var data = new FormData();
        var blob = new Blob([JSON.stringify(user)], {
            type: 'application/json'
        });

        data.append('user', blob);

        var config = {
            method: 'post',
            url: 'http://localhost:8080/manager/services/users/',
            headers: {
                'Content-Type': 'application/json',
                ...data.getHeaders
            },
            data: data
        };

        try {
            const response = await axios(config);
            dispatch(createdUser(JSON.stringify(response.data)))
        } catch (e) {
            dispatch(receivedError())
        }
    };
};


export const loginUserCreator = user => {
    store.dispatch(loggingUser());
    return async function (dispatch, getState) {
        var data = JSON.stringify({"username": user.username, "password": user.password});

        var config = {
            method: 'post',
            url: 'http://localhost:8080/manager/services/users/login',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: data
        };

        try {
            const response = await axios(config);
            dispatch(userLogged(JSON.stringify(response.data)))
        } catch (e) {
            dispatch(receivedError())
        }
    };
};