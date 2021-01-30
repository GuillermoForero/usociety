import * as actionTypes from '../actionsTypes';

import {UpdateUserMembership} from "./groupInterfaces";
import {User} from "../user/userInterfaces";

import {baseGetCreator, basePostCreator, basePutCreator} from "../commonActionsCreator";

const FormData = require('form-data');


const creatingGroup = () => {
    return {
        type: actionTypes.CREATING_GROUP,
    };
};

const createGroupFailed = (errorDescription) => {
    return {
        type: actionTypes.CREATE_GROUP_FAILED,
        payload: {error: errorDescription}
    };
};

const createdGroupSuccessful = () => {
    return {
        type: actionTypes.CREATE_GROUP_SUCCESSFUL
    };
};

const updatingGroup = () => {
    return {
        type: actionTypes.UPDATING_GROUP,
    };
};

const updateGroupFailed = () => {
    return {
        type: actionTypes.UPDATE_GROUP_FAILED
    };
};

const updatingGroupSuccessful = () => {
    return {
        type: actionTypes.UPDATE_GROUP_SUCCESSFUL,
    };
};

const listingUserGroups = () => {
    return {
        type: actionTypes.LISTING_USER_GROUPS,
    };
};

const listUserGroupsFailed = () => {
    return {
        type: actionTypes.LIST_USER_GROUPS_FAILED
    };
};

const listUserGroupsSuccessful = (groups) => {
    return {
        type: actionTypes.LIST_USER_GROUPS_SUCCESSFUL,
        payload: {data: groups}
    };
};

const searchingGroups = () => {
    return {
        type: actionTypes.SEARCHING_GROUPS,
    };
};

const searchGroupsFailed = () => {
    return {
        type: actionTypes.SEARCH_GROUPS_FAILED
    };
};

const searchGroupsSuccessful = (groups) => {
    return {
        type: actionTypes.SEARCH_GROUPS_SUCCESSFUL,
        payload: {data: groups}
    };
};

const gettingGroup = () => {
    return {
        type: actionTypes.GETTING_GROUP,
    };
};

const getGroupFailed = () => {
    return {
        type: actionTypes.GET_GROUP_FAILED
    };
};

const getGroupSuccessful = (group) => {
    return {
        type: actionTypes.GET_GROUP_SUCCESSFUL,
        payload: {data: group}
    };
};

const updatingUserMembership = () => {
    return {
        type: actionTypes.UPDATING_USER_MEMBERSHIP,
    };
};

const updateUserMembershipFailed = () => {
    return {
        type: actionTypes.UPDATE_USER_MEMBERSHIP_FAILED
    };
};

const updateUserMembershipSuccessful = () => {
    return {
        type: actionTypes.UPDATE_USER_MEMBERSHIP_SUCCESSFUL,
    };
};

export const listUserGroupsCreator = user => {
    try {
        const path = '/groups/' + user.user.username + '/all';
        return baseGetCreator(path, listingUserGroups, listUserGroupsSuccessful, listUserGroupsFailed);
    } catch (e) {
        return listUserGroupsFailed();
    }
};

export const searchGroupsCreator = (query) => {
    const path = '/groups/by-filters?name=' + query.groupName + '&categoryId=' + query.categoryId;
    return baseGetCreator(path, searchingGroups, searchGroupsSuccessful, searchGroupsFailed);
};

export const getGroupCreator = (groupId) => {
    groupId = 1; //By testing
    const path = '/groups/' + groupId;
    return baseGetCreator(path, gettingGroup, getGroupSuccessful, getGroupFailed);
};


export const updateUserMembershipCreator = (groupId, request) => {
    try {
        const body = JSON.stringify(new UpdateUserMembership(new User(request.targetUserId), request.status, request.role));
        const path = '/groups/' + groupId + '/update-membership';

        return basePutCreator(path, body, updatingUserMembership, updateUserMembershipSuccessful, updateUserMembershipFailed);
    } catch (e) {
        return updateUserMembershipFailed();
    }
};

export const updateGroupCreator = (group) => {
    try {
        const body = new FormData();
        const groupBlob = new Blob([JSON.stringify(group)], {
            type: 'application/json'
        });
        body.append('group', groupBlob);

        return basePutCreator('/groups/', body, updatingGroup, updatingGroupSuccessful, updateGroupFailed);
    } catch (e) {
        return updateGroupFailed();
    }
};

export const createGroupCreator = (group) => {
    try {
        const body = new FormData();
        const groupBlob = new Blob([JSON.stringify(group)], {
            type: 'application/json'
        });
        body.append('group', groupBlob);
        body.append('photo', group.photo);

        return basePostCreator('/groups/', body, creatingGroup, createdGroupSuccessful, createGroupFailed);
    } catch (e) {
        return updateGroupFailed('Error general');
    }
};
