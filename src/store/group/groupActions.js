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

const updatingGroupSuccessful = (updatedGroup) => {
    return {
        type: actionTypes.GROUP_UPDATE_SUCCESSFUL,
        payload: {data: updatedGroup}
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

const updateUserMembershipSuccessful = (updatedGroup) => {
    return {
        type: actionTypes.USER_MEMBERSHIP_UPDATED_SUCCESSFUL,
        payload: {data: updatedGroup}
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
        return basePutCreator('/groups/', JSON.stringify(group), updatingGroup, updatingGroupSuccessful, updateGroupFailed);
    } catch (e) {
        return updateGroupFailed(generalError);
    }
};

export const createGroupCreator = (group) => {
    try {
        return basePostCreator('/groups/', JSON.stringify(group), creatingGroup, createdGroupSuccessful, createGroupFailed);
    } catch (e) {
        return createGroupFailed(generalError);
    }
};


const gettingInfoGroup = () => {
    return {
        type: actionTypes.GETTING_INFO_GROUP
    };
};

const getInfoGroupFailed = () => {
    return {
        type: actionTypes.GETTING_INFO_GROUP_FAILED
    };
};

const getInfoGroupSuccessful = (group) => {
    return {
        type: actionTypes.GETTING_INFO_GROUP_SUCCESS,
        payload: {data: group}
    };
};

export const getInfoGroup = (slug) => {
    const path = `/groups/${slug}/slug`;
    return baseGetCreator(path, gettingInfoGroup, getInfoGroupSuccessful, getInfoGroupFailed);
};
