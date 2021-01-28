import store from "../store";
import * as actionTypes from '../actionsTypes';

import {UpdateUserMembership} from "./groupInterfaces";
import {User} from "../user/userInterfaces";

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


export const gettingGroup = () => {
    return {
        type: actionTypes.GETTING_GROUP,
    };
};

export const getGroupFailed = () => {
    return {
        type: actionTypes.GET_GROUP_FAILED
    };
};

export const getGroupSuccessful = (group) => {
    return {
        type: actionTypes.GET_GROUP_SUCCESSFUL,
        payload: {data: group}
    };
};

export const getGroupCreator = (user, groupId) => {
    store.dispatch(gettingGroup());
    return async function (dispatch, getState) {

        groupId = 1;
        var config = {
            method: 'get',
            url: 'http://localhost:8080/manager/services/groups/' + groupId,
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(user).token.accessToken,
            }
        };
        try {
            const response = await axios(config);
            dispatch(getGroupSuccessful(response.data))
        } catch (e) {
            dispatch(getGroupFailed)
        }
    };
};


export const updatingUserMembership = () => {
    return {
        type: actionTypes.UPDATING_USER_MEMBERSHIP,
    };
};

export const updateUserMembershipFailed = () => {
    return {
        type: actionTypes.UPDATE_USER_MEMBERSHIP_FAILED
    };
};

export const updateUserMembershipSuccessful = () => {
    return {
        type: actionTypes.UPDATE_USER_MEMBERSHIP_SUCCESSFUL,
    };
};

export const updateUserMembershipCreator = (user, groupId, request) => {
    store.dispatch(updatingUserMembership());
    return async function (dispatch, getState) {

        let body = JSON.stringify(new UpdateUserMembership(new User(request.targetUserId), request.status, request.role));

        var config = {
            method: 'put',
            url: 'http://localhost:8080/manager/services/groups/' + groupId + '/update-membership',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(user).token.accessToken,
                'Content-Type': 'application/json',
            },
            data: body
        };
        try {
            await axios(config);
            dispatch(updateUserMembershipSuccessful())
        } catch (e) {
            dispatch(updateUserMembershipFailed())
        }
    };
};


export const creatingGroup = () => {
    return {
        type: actionTypes.UPDATING_GROUP,
    };
};

export const createGroupFailed = () => {
    return {
        type: actionTypes.UPDATE_GROUP_FAILED
    };
};

export const createGroupSuccessful = () => {
    return {
        type: actionTypes.UPDATE_GROUP_SUCCESSFUL,
    };
};

export const updateOrCreateGroupCreator = (user, group) => {
    store.dispatch(creatingGroup());
    return async function (dispatch, getState) {
        var data = new FormData();

        var groupBlob = new Blob([JSON.stringify(group)], {
            type: 'application/json'
        });
        data.append('group', groupBlob);

        var config = {
            method: 'put',
            url: 'http://localhost:8080/manager/services/groups/',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(user).token.accessToken,
                'Content-Type': 'application/json',
                ...data.getHeaders
            },
            data: data
        };

        try {
            await axios(config);
            dispatch(createGroupSuccessful())
        } catch (e) {
            dispatch(createGroupFailed())
        }
    };
};
