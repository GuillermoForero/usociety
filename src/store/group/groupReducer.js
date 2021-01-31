import * as actionTypes from '../actionsTypes';


const initialState = {
    currentGroup: {},
    userGroups: [],
    groups: [],

    hasError: false,
    isLoading: false,
    errorDescription: '',
    operationCompleted: false
};

const groupReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.GETTING_GROUP:
        case actionTypes.UPDATING_GROUP:
        case actionTypes.CREATING_GROUP:
        case actionTypes.SEARCHING_GROUPS:
        case actionTypes.LISTING_USER_GROUPS:
        case actionTypes.UPDATING_USER_MEMBERSHIP:
            return Object.assign({}, state, {
                ...state,
                isLoading: true,
                hasError: false,
                operationCompleted: false
            });

        case actionTypes.GET_GROUP_FAILED:
        case actionTypes.UPDATE_GROUP_FAILED:
        case actionTypes.CREATE_GROUP_FAILED:
        case actionTypes.SEARCH_GROUPS_FAILED:
        case actionTypes.LIST_USER_GROUPS_FAILED:
        case actionTypes.UPDATED_USER_MEMBERSHIP_FAILED:
            return Object.assign({}, state, {
                ...state,
                hasError: true,
                isLoading: false,
                errorDescription: action.payload.error
            });

        case actionTypes.USER_GROUPS_LISTED_SUCCESSFUL:
            return Object.assign({}, state, {
                ...state,
                userGroups: action.payload.data,
                hasError: false,
                isLoading: false
            });

        case actionTypes.GROUPS_SEARCHED_SUCCESSFUL:
            return Object.assign({}, state, {
                ...state,
                groups: action.payload.data,
                hasError: false,
                isLoading: false
            });

        case actionTypes.GET_GROUP_SUCCESSFUL:
            return Object.assign({}, state, {
                ...state,
                currentGroup: action.payload.data,
                operationCompleted: true,
                hasError: false,
                isLoading: false
            });

        case actionTypes.GROUP_CREATED_SUCCESSFUL:
        case actionTypes.GROUP_UPDATE_SUCCESSFUL:
        case actionTypes.USER_MEMBERSHIP_UPDATED_SUCCESSFUL:
            return Object.assign({}, state, {
                ...state,
                hasError: false,
                isLoading: false,
                operationCompleted: true
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

export default groupReducer;