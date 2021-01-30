import * as actionTypes from '../actionsTypes';
import {Category, UpdateUserCategories} from "../category/categoryInterfaces";
import {basePostCreator, basePutCreator, receivedError} from "../commonActionsCreator";

const FormData = require('form-data');

export const creatingUser = () => {
    return {
        type: actionTypes.CREATING_USER,
    };
};

export const createdUser = user => {
    return {
        type: actionTypes.USER_CREATED,
        data: user
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

export const updatingUserCategories = () => {
    return {
        type: actionTypes.UPDATING_USER_CATEGORIES,
    };
};

export const userCategoriesUpdated = () => {
    return {
        type: actionTypes.USER_CATEGORIES_UPDATED,
    };
};


export const saveUserCreator = user => {
    try {
        const body = new FormData();
        const userBlob = new Blob([JSON.stringify(user)], {
            type: 'application/json'
        });

        body.append('user', userBlob);
        body.append('photo', user.image);

        return basePostCreator('/users/', body, creatingUser, createdUser, receivedError);
    } catch (e) {
        return receivedError();
    }
};


export const loginUserCreator = user => {
    try {
        const body = JSON.stringify({"username": user.username, "password": user.password});
        return basePostCreator('/users/login', body, loggingUser, userLogged, receivedError);
    } catch (e) {
       return receivedError();
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

        return basePutCreator('/users/', body, updatingUserCategories, userCategoriesUpdated, receivedError);
    } catch (e) {
        return receivedError();
    }
};
