import * as actionTypes from '../actionsTypes';


const initialState = {
    userGroups: [],
    groups: [],
    currentGroup: {group: {}},
    isFetching: false,
    isError: false,
    errorDescription: '',
    operationCompleted: false
};

const groupReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SEARCHING_GROUPS:
        case actionTypes.LISTING_USER_GROUPS:
        case actionTypes.GETTING_GROUP:
        case actionTypes.UPDATING_USER_MEMBERSHIP:
        case actionTypes.UPDATING_GROUP:
        case actionTypes.CREATING_GROUP:
            return Object.assign({}, state, {
                isFetching: true,
                isError: false,
                operationCompleted: false
            });
        case actionTypes.SEARCH_GROUPS_FAILED:
        case actionTypes.LIST_USER_GROUPS_FAILED:
        case actionTypes.GET_GROUP_FAILED:
        case actionTypes.UPDATE_USER_MEMBERSHIP_FAILED:
        case actionTypes.UPDATE_GROUP_FAILED:
        case actionTypes.CREATE_GROUP_FAILED:
            return Object.assign({}, state, {
                userGroups: [],
                groups: [],
                isFetching: false,
                isError: true,
                errorDescription: action.payload.error
            });
        case actionTypes.LIST_USER_GROUPS_SUCCESSFUL:
            return Object.assign({}, state, {
                userGroups: action.payload.data,
                isError: false,
                isFetching: false
            });
        case actionTypes.SEARCH_GROUPS_SUCCESSFUL:
            return Object.assign({}, state, {
                groups: action.payload.data,
                isError: false,
                isFetching: false
            });
        case actionTypes.GET_GROUP_SUCCESSFUL:
            return Object.assign({}, state, {
                currentGroup: action.payload.data,
                isError: false,
                isFetching: false
            });

        case actionTypes.CREATE_GROUP_SUCCESSFUL:
        case actionTypes.UPDATE_GROUP_SUCCESSFUL:
        case actionTypes.UPDATE_USER_MEMBERSHIP_SUCCESSFUL:
            return Object.assign({}, state, {
                ...state,
                isError: false,
                isFetching: false,
                operationCompleted: true
            });

        case actionTypes.RESET_ERROR: {
            return Object.assign({}, state, {
                ...state,
                isError: false,
                errorDescription: ''
            })
        }

        default:
            return state;
    }
};

export default groupReducer;