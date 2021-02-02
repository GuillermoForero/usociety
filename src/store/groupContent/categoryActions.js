import * as actionTypes from '../actionsTypes';
import {baseGetCreator, basePostCreator} from "../commonActionsCreator";
import {post} from "../../configuration/service";

const loadPosts = () => {
    return {
        type: actionTypes.LOAD_POSTS,
    };
};

const loadPostsSuccesfull = categories => {
    return {
        type: actionTypes.LOAD_POSTS_SUCCESSFUL,
        payload: {data: categories}
    };
};

const loadPostsFailed = errorDescription => {
    return {
        type: actionTypes.LOAD_POSTS_FAILED,
        payload: {error: errorDescription}
    };
};

export const loadPostsCreator = () => {
    return baseGetCreator('/posts/{groupid}/', loadingCategories, categoriesLoadedSuccessful, loadCategoriesFailed);
};
export const CreatePostCreator = () => {
    return basePostCreator('/posts/', JSON.stringify({comment: 'coe'}), loadingCategories, categoriesLoadedSuccessful, loadCategoriesFailed);
};
export const reactPostCreator = () => {
    return basePostCreator('/posts/{groupid}/react?value={LIKE}', {}, loadingCategories, categoriesLoadedSuccessful, loadCategoriesFailed);
};
export const commentPostCreator = () => {
    return basePostCreator('/posts/{groupid}/comment', JSON.stringify({comment: 'coe'}), loadingCategories, categoriesLoadedSuccessful, loadCategoriesFailed);
};