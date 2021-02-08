import * as actionTypes from '../actionsTypes';

const initialState = {
    posts: [],
    messages: [],
    hasError: false,
    isLoading: false,
    operationCompleted: false
};

const groupContentReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.LOAD_POSTS:
            return Object.assign({}, state, {
                ...state,
                hasError: false,
                isLoading: true,
                operationCompleted: false
            });

        case actionTypes.LOAD_POSTS_SUCCESSFUL:
            return Object.assign({}, state, {
                posts: action.payload.data,
                hasError: false,
                isLoading: false,
                operationCompleted: true
            });

        case actionTypes.LOAD_CATEGORIES_FAILED:
            return Object.assign({}, state, {
                ...state,
                hasError: true,
                isLoading: false,
                operationCompleted: false,
                errorDescription: action.payload.error
            });
        case actionTypes.GET_MESSAGES:
            return Object.assign({}, state, {
                ...state,
                hasError: false,
                isLoading: true,
                operationCompleted: false
            });

        case actionTypes.GET_MESSAGES_SUCCESSFUL:
            console.log(action.payload)
            return Object.assign({}, state, {
                messages: action.payload.data,
                hasError: false,
                isLoading: false,
                operationCompleted: true
            });

        case actionTypes.GET_MESSAGES_FAILED:
            return Object.assign({}, state, {
                ...state,
                hasError: true,
                isLoading: false,
                operationCompleted: false,
                errorDescription: action.payload.error
            });


        case actionTypes.RESET_ERROR: {
            return Object.assign({}, state, {
                ...state,
                hasError: false,
            });
        }

        default:
            return state;
    }
};

export default groupContentReducer;