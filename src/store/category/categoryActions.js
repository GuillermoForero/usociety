import * as actionTypes from '../actionsTypes';
import {baseGetCreator} from "../commonActionsCreator";

const loadingCategories = () => {
    return {
        type: actionTypes.LOADING_CATEGORIES,
    };
};

const categoriesLoadedSuccessful = categories => {
    return {
        type: actionTypes.CATEGORIES_LOADED_SUCCESSFUL,
        payload: {data: categories}
    };
};

const loadCategoriesFailed = errorDescription => {
    return {
        type: actionTypes.LOAD_CATEGORIES_FAILED,
        payload: {error: errorDescription}
    };
};

export const loadCategoriesCreator = () => {
    return baseGetCreator('/categories/all', loadingCategories, categoriesLoadedSuccessful, loadCategoriesFailed);
};