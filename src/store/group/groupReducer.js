import * as actionTypes from '../actionsTypes';


const initialState = {
    userGroups: [],
    groups: [],
    currentGroup: {group: {}},
    isFetching: false,
    isError: false
};

const groupReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SEARCHING_GROUPS:
        case actionTypes.LISTING_USER_GROUPS:
        case actionTypes.GETTING_GROUP:
            return Object.assign({}, state, {
                isFetching: true,
                isError: false
            });
        case actionTypes.SEARCH_GROUPS_FAILED:
        case actionTypes.LIST_USER_GROUPS_FAILED:
        case actionTypes.GET_GROUP_FAILED:
            return Object.assign({}, state, {
                userGroups: [],
                groups: [],
                isFetching: false,
                isError: true
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
        default:
            return state;
    }
};

export default groupReducer;