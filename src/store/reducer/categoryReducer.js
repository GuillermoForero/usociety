import * as actionTypes from '../actionsTypes';

const initialState = {
    categories: [],
    isFetching: false,
    isError: false
};

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOADING_CATEGORIES:
        case actionTypes.UPDATING_USER_CATEGORIES:
            return Object.assign({}, state, {
                ...state,
                isFetching: true,
                isError: false
            });
        case actionTypes.CATEGORIES_LOADED:
            return Object.assign({}, state, {
                categories: action.data,
                isFetching: false,
                isError: false
            });
        case actionTypes.USER_CATEGORIES_UPDATED:
            return Object.assign({}, state, {
                ...state,
                isFetching: false,
                isError: false
            });
        case actionTypes.RECEIVED_ERROR:
            return Object.assign({}, state, {
                ...state,
                isError: true,
                isFetching: false
            });

        default:
            return state;
    }
};

export default categoryReducer;