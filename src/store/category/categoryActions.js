import * as actionTypes from '../actionsTypes';
import {baseGetCreator, receivedError} from "../commonActionsCreator";

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

export const loadCategoriesCreator = () => {
    return baseGetCreator('/categories/all', loadingCategories, categoriesLoaded, receivedError);
};