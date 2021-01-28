import * as actionTypes from '../actionsTypes';


const initialState = {
    logged: false,
    userData: {},
    isFetching: false,
    isError: false
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATING_USER:
            return Object.assign({}, state, {
                isFetching: true,
                isError: false,
                logged: false,
            });
        case actionTypes.CREATED_USER:
            return Object.assign({}, state, {
                userData: action.data,
                isFetching: false,
                isError: false,
                logged: true,
            });
        case actionTypes.LOGGING_USER:
        case actionTypes.RECEIVED_ERROR:
            return Object.assign({}, state, {
                isError: true,
                isFetching: false,
                logged: false,
            });
        case actionTypes.USER_LOGGED:
            return Object.assign({}, state, {
                userData: action.data,
                isError: false,
                isFetching: false,
                logged: true,
            });
        default:
            return state;
    }
};

export default userReducer;