import store from "../store";
import * as actionTypes from '../actionsTypes';

var axios = require('axios');
var FormData = require('form-data');

export const listingUserGroups = () => {
    return {
        type: actionTypes.LISTING_USER_GROUPS,
    };
};

export const listUserGroupsFailed = () => {
    return {
        type: actionTypes.LIST_USER_GROUPS_FAILED
    };
};

export const listUserGroupsSuccessful = (groups) => {
    return {
        type: actionTypes.LIST_USER_GROUPS_SUCCESSFUL,
        payload: {data: groups}
    };
};


export const listUserGroupsCreator = user => {
    store.dispatch(listingUserGroups());
    return async function (dispatch, getState) {

        var config = {
            method: 'get',
            url: 'http://localhost:8080/manager/services/groups/' + JSON.parse(user).user.username + '/all',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(user).token.accessToken,
            }
        };
        try {
            const response = await axios(config);
            dispatch(listUserGroupsSuccessful(response.data))
        } catch (e) {
            dispatch(listUserGroupsFailed())
        }
    };
};


export const searchingGroups = () => {
    return {
        type: actionTypes.SEARCHING_GROUPS,
    };
};

export const searchGroupsFailed = () => {
    return {
        type: actionTypes.SEARCH_GROUPS_FAILED
    };
};

export const searchGroupsSuccessful = (groups) => {
    return {
        type: actionTypes.SEARCH_GROUPS_SUCCESSFUL,
        payload: {data: groups}
    };
};

export const searchGroupsCreator = (user, query) => {
    store.dispatch(searchingGroups());
    return async function (dispatch, getState) {

        var config = {
            method: 'get',
            url: 'http://localhost:8080/manager/services/groups/by-filters?name='
                + query.groupName + '&categoryId=' + query.categoryId,
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(user).token.accessToken,
            }
        };
        try {
            const response = await axios(config);
            dispatch(searchGroupsSuccessful(response.data))
        } catch (e) {
            dispatch(searchGroupsFailed())
        }
    };
};