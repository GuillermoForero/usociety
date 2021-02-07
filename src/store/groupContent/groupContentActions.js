import * as actionTypes from '../actionsTypes';
import {baseGetCreator, basePostCreator} from "../commonActionsCreator";
import {post} from "../../configuration/service";

const loadPosts = () => {
    return {
        type: actionTypes.LOAD_POSTS,
    };
};

const loadPostsSuccessful = posts => {
    return {
        type: actionTypes.LOAD_POSTS_SUCCESSFUL,
        payload: {data: posts}
    };
};

const loadPostsFailed = errorDescription => {
    return {
        type: actionTypes.LOAD_POSTS_FAILED,
        payload: {error: errorDescription}
    };
};
const reactPost = () => {
    return {
        type: actionTypes.REACT_POST,
    };
};

const reactPostSuccessful = () => {
    return {
        type: actionTypes.REACT_POST_SUCCESSFUL,
    };
};

const reactPostFailed = errorDescription => {
    return {
        type: actionTypes.REACT_POST_FAILED,
        payload: {error: errorDescription}
    };
};
const commentPost = () => {
    return {
        type: actionTypes.COMMENT_POST,
    };
};

const commentPostSuccessful = () => {
    return {
        type: actionTypes.COMMENT_POST_SUCCESSFUL,
    };
};

const commentPostFailed = errorDescription => {
    return {
        type: actionTypes.COMMENT_POST_FAILED,
        payload: {error: errorDescription}
    };
};

const cretePost = () => {
    return {
        type: actionTypes.CREATE_POST,
    };
};

const createPostSuccess = () => {
    return {
        type: actionTypes.CREATE_POST_SUCCESSFUL,
        payload: {}
    };
};

const createPostFailed = () => {
    return {
        type: actionTypes.CREATE_POST_FAILED,
        payload: {}
    };
};

export const loadPostsCreator = (data) => {
    return baseGetCreator(`/posts/${data.groupId}/all?page=0`, loadPosts, loadPostsSuccessful, loadPostsFailed);
};
export const CreatePostCreator = (data) => {
    return basePostCreator('/posts/', JSON.stringify({content: {
            options: [],
            type: data.image ? "IMAGE" : "TEXT",
            value: data.image ? "" : data.value
        },
        groupId: data.groupId,
        description: data.image ? data.value : "",
        isPublic: data.isPublic,
        photo:data.image ? data.image: ""}), cretePost, createPostSuccess, createPostFailed);
};
export const reactPostCreator = (data) => {
    return basePostCreator(`/posts/${data.postId}/react?value=${data.type}`, {}, reactPost, reactPostSuccessful, reactPostFailed);
};
export const commentPostCreator = (data) => {
    return basePostCreator(`/posts/${data.postId}/comment`, JSON.stringify({comment: data.comment}), commentPost, commentPostSuccessful, commentPostFailed);
};