import store from "../store";
import * as actionTypes from '../actionsTypes';
import {Category, UpdateUserCategories} from './categoryInterfaces';

var axios = require('axios');

export const loadingCategories = () => {
    return {
        type: actionTypes.LOADING_CATEGORIES,
    };
};

export const categoriesLoaded = categories => {
    return {
        type: actionTypes.CATEGORIES_LOADED,
        data: categories
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


export const receivedError = () => {
    return {
        type: actionTypes.RECEIVED_ERROR,
    };
};


export const loadCategoriesCreator = () => {
    store.dispatch(loadingCategories());
    return async function (dispatch, getState) {

        try {
            var config = {
                method: 'get',
                url: 'http://localhost:8080/manager/services/categories/all',
            };

            const response = await axios(config);
            dispatch(categoriesLoaded(response.data))
        } catch (e) {
            dispatch(receivedError())
        }
    };
};


export const updateUserCategoriesCreator = (categoryIds, user) => {
    store.dispatch(updatingUserCategories());
    return async function  (dispatch, getState)  {

       try {
           let list = [];
           categoryIds.map(categoryId => list.push(new Category(categoryId)));

           var data = new FormData();
           var blob = new Blob([JSON.stringify(new UpdateUserCategories(list))], {
               type: 'application/json'
           });

           data.append('user', blob);

           var config = {
               method: 'put',
               url: 'http://localhost:8080/manager/services/users/',
               headers: {
                   'Content-Type': 'application/json',
                   'Authorization': 'Bearer ' + JSON.parse(user).token.accessToken,
                   ...data.getHeaders
               },
               data: data
           };

            await axios(config);
            dispatch(userCategoriesUpdated())
        } catch (e) {
            dispatch(receivedError())
        }
    };
};

