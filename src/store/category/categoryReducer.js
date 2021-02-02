import * as actionTypes from '../actionsTypes';

const initialState = {
    categories: [],

    hasError: false,
    isLoading: false,
    operationCompleted: false
};

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.LOADING_CATEGORIES:
            return Object.assign({}, state, {
                ...state,
                hasError: false,
                isLoading: true,
                operationCompleted: false
            });

        case actionTypes.CATEGORIES_LOADED_SUCCESSFUL:
            return Object.assign({}, state, {
                categories: action.payload.data,
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

export default categoryReducer;