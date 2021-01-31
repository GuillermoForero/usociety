import * as actionTypes from '../actionsTypes';

const initialState = {
    data: {},

    hasError: false,
    isLogged: false,
    isLoading: false,
    errorDescription: '',
    errorCode: '',
    operationCompleted: false
};

const userReducer = (state = initialState, action) => {

    switch (action.type) {

        case actionTypes.LOGGING_USER:
        case actionTypes.CREATING_USER:
        case actionTypes.UPDATING_USER_CATEGORIES:
            return Object.assign({}, state, {
                ...state,
                errorCode: '',
                operationCompleted: false,
                isLoading: true,
                hasError: false,
            });

        case actionTypes.VERIFYING_EMAIL:
            return Object.assign({}, state, {
                ...state,
                errorCode: '',
                operationCompleted: false,
                isLoading: false,
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
        case actionTypes.EMAIL_VERIFY_FAILED:
        case actionTypes.UPDATE_USER_CATEGORIES_FAILED:
            return Object.assign({}, state, {
                ...state,
                errorDescription: action.payload.error,
                errorCode: action.payload.status,
                hasError: true,
                isLoading: false,
                operationCompleted: false
            });

        case actionTypes.EMAIL_VERIFIED_SUCCESSFUL: {
            return Object.assign({}, state, {
                ...state,
                operationCompleted: true,
            });
        }

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