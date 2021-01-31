import * as actionTypes from '../actionsTypes';
import {Category, UpdateUserCategories} from "../category/categoryInterfaces";
import {basePostCreator, basePutCreator} from "../commonActionsCreator";

const FormData = require('form-data');
const generalError = "Error general";

const creatingUser = () => {
    return {
        type: actionTypes.CREATING_USER,
    };
};

const userCreated = user => {
    return {
        type: actionTypes.USER_CREATED_SUCCESSFUL,
        payload: {data: user}
    };
};

const createUserFailed = errorDescription => {
    return {
        type: actionTypes.CREATE_USER_FAILED,
        payload: {error: errorDescription}
    };
};

const loggingUser = () => {
    return {
        type: actionTypes.LOGGING_USER,
    };
};

const userLogged = user => {
    return {
        type: actionTypes.USER_LOGGED_SUCCESSFUL,
        payload: {data: user}
    };
};

const logUserFailed = errorDescription => {
    return {
        type: actionTypes.LOG_USER_FAILED,
        payload: {error: errorDescription}
    };
};

const updatingUserCategories = () => {
    return {
        type: actionTypes.UPDATING_USER_CATEGORIES,
    };
};

const userCategoriesUpdated = () => {
    return {
        type: actionTypes.USER_CATEGORIES_UPDATED_SUCCESSFUL,
    };
};

const updateUserCategoriesFailed = errorDescription => {
    return {
        type: actionTypes.UPDATE_USER_CATEGORIES_FAILED,
        payload: {error: errorDescription}
    };
};

export const createUserCreator = user => {
    try {
        const body = new FormData();
        const userBlob = new Blob([JSON.stringify(user)], {
            type: 'application/json'
        });

        body.append('user', userBlob);
        body.append('photo', user.image);

        return basePostCreator('/users/', body, creatingUser, userCreated, createUserFailed);
    } catch (e) {
        return createUserFailed(generalError);
    }
};


export const loginUserCreator = user => {
    try {
        const body = JSON.stringify({"username": user.username, "password": user.password});
        return basePostCreator('/users/login', body, loggingUser, userLogged, logUserFailed);
    } catch (e) {
        return logUserFailed(generalError);
    }
};


export const updateUserCategoriesCreator = (categoriesId) => {
    try {
        let serialized = [];
        categoriesId.map(categoryId => serialized.push(new Category(categoryId)));

        const body = new FormData();
        const blob = new Blob([JSON.stringify(new UpdateUserCategories(serialized))], {
            type: 'application/json'
        });
        body.append('user', blob);

        return basePutCreator('/users/', body, updatingUserCategories, userCategoriesUpdated, updateUserCategoriesFailed);
    } catch (e) {
        return updateUserCategoriesFailed(generalError);
    }
};
