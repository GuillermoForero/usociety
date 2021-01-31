import * as actionTypes from '../actionsTypes';

const initialState = {
    data: {},

    hasError: false,
    isLogged: false,
    isLoading: false,
    errorDescription: '',
    operationCompleted: false
};

const userReducer = (state = initialState, action) => {

    switch (action.type) {

        case actionTypes.LOGGING_USER:
        case actionTypes.CREATING_USER:
        case actionTypes.UPDATING_USER_CATEGORIES:
            return Object.assign({}, state, {
                ...state,
                operationCompleted: false,
                isLoading: true,
                hasError: false,
            });

        case actionTypes.USER_CREATED_SUCCESSFUL:
        case actionTypes.USER_LOGGED_SUCCESSFUL:
            return Object.assign({}, state, {
                ...state,
                data: action.payload.data,
                isLoading: false,
                hasError: false,
                isLogged: true
            });

        case actionTypes.USER_CATEGORIES_UPDATED_SUCCESSFUL:
            return Object.assign({}, state, {
                ...state,
                operationCompleted: true,
                isLoading: false,
                hasError: false
            });

        case actionTypes.LOG_USER_FAILED:
        case actionTypes.CREATE_USER_FAILED:
        case actionTypes.UPDATE_USER_CATEGORIES_FAILED:
            return Object.assign({}, state, {
                ...state,
                errorDescription: action.payload.error,
                hasError: true,
                isLoading: false,
                operationCompleted: false
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

export default userReducer;