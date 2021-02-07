import * as actionTypes from '../actionsTypes';
import {Category, UpdateUserCategories} from "../category/categoryInterfaces";
import {baseGetCreator, basePostCreator, basePutCreator} from "../commonActionsCreator";

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

const createUserFailed = (errorDescription, statusCode) => {
    return {
        type: actionTypes.CREATE_USER_FAILED,
        payload: {error: errorDescription, status: statusCode}
    };
};

const sendingVerificationEmail = () => {
    return {
        type: actionTypes.SENDING_VERIFICATION_EMAIL,
    };
};

const emailVerificationSentSuccessful = user => {
    return {
        type: actionTypes.EMAIL_VERIFICATION_SENT_SUCCESSFUL,
        payload: {data: user}
    };
};

const sendEmailVerificationFailed = (errorDescription, statusCode) => {
    return {
        type: actionTypes.SEND_EMAIL_VERIFICATION_FAILED,
        payload: {error: errorDescription, status: statusCode}
    };
};

const verifyingEmail = () => {
    return {
        type: actionTypes.VERIFYING_EMAIL,
    };
};

const emailVerificationSuccessful = user => {
    return {
        type: actionTypes.EMAIL_VERIFIED_SUCCESSFUL,
        payload: {data: user}
    };
};

const emailVerificationFailed = (errorDescription, statusCode) => {
    return {
        type: actionTypes.EMAIL_VERIFY_FAILED,
        payload: {error: errorDescription, status: statusCode}
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

const logUserFailed = (errorDescription, statusCode) => {
    return {
        type: actionTypes.LOG_USER_FAILED,
        payload: {error: errorDescription, status: statusCode}
    };
};

const gettingUser = () => {
    return {
        type: actionTypes.GETTING_USER,
    };
};

const userGotSuccessful = user => {
    return {
        type: actionTypes.USER_GOT_SUCCESSFUL,
        payload: {data: user}
    };
};

const getUserFailed = (errorDescription, statusCode) => {
    return {
        type: actionTypes.GET_USER_FAILED,
        payload: {error: errorDescription, status: statusCode}
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
        return basePostCreator('/users/', JSON.stringify(user), creatingUser, userCreated, createUserFailed);
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

export const sendVerificationEmailCreator = (email, resendEmail) => {
    return basePostCreator('/users/verifyEmail?email=' + email + '&resendCode=' + resendEmail, {},
        sendingVerificationEmail, emailVerificationSentSuccessful, sendEmailVerificationFailed);
};

export const verifyEmailCreator = (email, otpCode) => {
    return basePostCreator('/users/enableAccount?email=' + email + '&otpCode=' + otpCode, {},
        verifyingEmail, emailVerificationSuccessful, emailVerificationFailed);
};

export const getUserCreator = username => {
    return baseGetCreator('/users/' + username, gettingUser, userGotSuccessful, getUserFailed);
};

export const updateUserCategoriesCreator = (categoriesId) => {
    try {
        let serialized = [];
        categoriesId.map(categoryId => serialized.push(new Category(categoryId)));
        const body = JSON.stringify(new UpdateUserCategories(serialized));

        return basePutCreator('/users/', body, updatingUserCategories, userCategoriesUpdated, updateUserCategoriesFailed);
    } catch (e) {
        return updateUserCategoriesFailed(generalError);
    }
};
