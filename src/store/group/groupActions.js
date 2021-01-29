import * as actionTypes from '../actionsTypes';

import {UpdateUserMembership} from "./groupInterfaces";
import {User} from "../user/userInterfaces";

import {baseGetCreator, basePutCreator} from "../commonActionsCreator";

const FormData = require('form-data');

export const updatingGroup = () => {
    return {
        type: actionTypes.UPDATING_GROUP,
    };
};

export const createGroupFailed = () => {
    return {
        type: actionTypes.UPDATE_GROUP_FAILED
    };
};

export const updatingGroupSuccessful = () => {
    return {
        type: actionTypes.UPDATE_GROUP_SUCCESSFUL,
    };
};

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

export const listUserGroupsCreator = user => {
    try {
        const path = '/groups/' + user.user.username + '/all';
        return baseGetCreator(path, listingUserGroups, listUserGroupsSuccessful, listUserGroupsFailed);
    } catch (e) {
        listUserGroupsFailed();
        console.error(e);
    }
};

export const searchGroupsCreator = (user, query) => {
    const path = '/groups/by-filters?name=' + query.groupName + '&categoryId=' + query.categoryId;
    return baseGetCreator(path, searchingGroups, searchGroupsSuccessful, searchGroupsFailed);
};

export const getGroupCreator = (user, groupId) => {
    groupId = 1; //By testing
    const path = '/groups/' + groupId;
    return baseGetCreator(path, gettingGroup, getGroupSuccessful, getGroupFailed);
};


export const updateUserMembershipCreator = (user, groupId, request) => {
    try {
        const body = JSON.stringify(new UpdateUserMembership(new User(request.targetUserId), request.status, request.role));
        const path = '/groups/' + groupId + '/update-membership';

        return basePutCreator(path, body, updatingUserMembership, updateUserMembershipSuccessful, updateUserMembershipFailed);
    } catch (e) {
        updateUserMembershipFailed();
    }
};

export const updateGroupCreator = (user, group) => {
    try {
        const body = new FormData();
        const groupBlob = new Blob([JSON.stringify(group)], {
            type: 'application/json'
        });
        body.append('group', groupBlob);

        return basePutCreator('/groups/', body, updatingGroup, updatingGroupSuccessful, createGroupFailed);
    } catch (e) {
        createGroupFailed();
    }
};
