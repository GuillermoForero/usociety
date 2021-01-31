import * as actionTypes from '../actionsTypes';

import {UpdateUserMembership} from "./groupInterfaces";
import {User} from "../user/userInterfaces";

import {baseGetCreator, basePostCreator, basePutCreator} from "../commonActionsCreator";

const FormData = require('form-data');
const generalError = "Error general";

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
        type: actionTypes.GROUP_CREATED_SUCCESSFUL
    };
};

const updatingGroup = () => {
    return {
        type: actionTypes.UPDATING_GROUP,
    };
};

const updatingGroupSuccessful = () => {
    return {
        type: actionTypes.GROUP_UPDATE_SUCCESSFUL,
    };
};

const updateGroupFailed = (errorDescription) => {
    return {
        type: actionTypes.UPDATE_GROUP_FAILED,
        payload: {error: errorDescription}
    };
};

const listingUserGroups = () => {
    return {
        type: actionTypes.LISTING_USER_GROUPS,
    };
};

const listUserGroupsSuccessful = (groups) => {
    return {
        type: actionTypes.USER_GROUPS_LISTED_SUCCESSFUL,
        payload: {data: groups}
    };
};

const listUserGroupsFailed = (errorDescription) => {
    return {
        type: actionTypes.LIST_USER_GROUPS_FAILED,
        payload: {error: errorDescription}
    };
};

const searchingGroups = () => {
    return {
        type: actionTypes.SEARCHING_GROUPS,
    };
};

const searchGroupsSuccessful = (groups) => {
    return {
        type: actionTypes.GROUPS_SEARCHED_SUCCESSFUL,
        payload: {data: groups}
    };
};

const searchGroupsFailed = (errorDescription) => {
    return {
        type: actionTypes.SEARCH_GROUPS_FAILED,
        payload: {error: errorDescription}
    };
};

const gettingGroup = () => {
    return {
        type: actionTypes.GETTING_GROUP,
    };
};

const getGroupSuccessful = (group) => {
    return {
        type: actionTypes.GET_GROUP_SUCCESSFUL,
        payload: {data: group}
    };
};

const getGroupFailed = (errorDescription) => {
    return {
        type: actionTypes.GET_GROUP_FAILED,
        payload: {error: errorDescription}
    };
};


const updatingUserMembership = () => {
    return {
        type: actionTypes.UPDATING_USER_MEMBERSHIP,
    };
};

const updateUserMembershipSuccessful = () => {
    return {
        type: actionTypes.USER_MEMBERSHIP_UPDATED_SUCCESSFUL,
    };
};

const updateUserMembershipFailed = (errorDescription) => {
    return {
        type: actionTypes.UPDATED_USER_MEMBERSHIP_FAILED,
        payload: {error: errorDescription}
    };
};


export const listUserGroupsCreator = user => {
    try {
        const path = '/groups/' + user.user.username + '/all';
        return baseGetCreator(path, listingUserGroups, listUserGroupsSuccessful, listUserGroupsFailed);
    } catch (e) {
        return listUserGroupsFailed(generalError);
    }
};

export const searchGroupsCreator = (query) => {
    const path = '/groups/by-filters?name=' + query.groupName + '&categoryId=' + query.categoryId;
    return baseGetCreator(path, searchingGroups, searchGroupsSuccessful, searchGroupsFailed);
};

export const getGroupCreator = (slug) => {
    const path = '/groups/' + slug + '/slug';
    return baseGetCreator(path, gettingGroup, getGroupSuccessful, getGroupFailed);
};


export const updateUserMembershipCreator = (groupId, request) => {
    try {
        const body = JSON.stringify(new UpdateUserMembership(new User(request.targetUserId), request.status, request.role));
        const path = '/groups/' + groupId + '/update-membership';

        return basePutCreator(path, body, updatingUserMembership, updateUserMembershipSuccessful, updateUserMembershipFailed);
    } catch (e) {
        return updateUserMembershipFailed(generalError);
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
        return updateGroupFailed(generalError);
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
        return createGroupFailed(generalError);
    }
};
