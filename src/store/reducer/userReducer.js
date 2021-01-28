import * as actionTypes from '../actionsTypes';


const initialState = {
    userData: {},
    isFetching: false,
    isError: false
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATING_USER:
            return Object.assign({}, state, {
                isFetching: true,
                isError: false
            });
        case actionTypes.CREATED_USER:
            return Object.assign({}, state, {
                userData: action.data,
                isFetching: false,
                isError: false
            });
        case actionTypes.LOGGING_USER:
        case actionTypes.RECEIVED_ERROR:
            return Object.assign({}, state, {
                isError: true,
                isFetching: false
            });
        case actionTypes.USER_LOGGED:
            return Object.assign({}, state, {
                userData: action.data,
                isError: true,
                isFetching: false
            });
        default:
            return state;
    }
};

export default userReducer;