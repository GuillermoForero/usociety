import * as actionTypes from '../actionsTypes';


const initialState = {
    logged: false,
    userData: {},
    isFetching: false,
    isError: false,
    errorDescription: ''
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.LOGGING_USER:
        case actionTypes.CREATING_USER:
            return Object.assign({}, state, {
                isFetching: true,
                isError: false,
                logged: false,
            });
        case actionTypes.RECEIVED_ERROR:
            return Object.assign({}, state, {
                isError: true,
                isFetching: false,
                errorDescription: action.payload.error
            });
        case actionTypes.USER_CREATED:
        case actionTypes.USER_LOGGED:
            return Object.assign({}, state, {
                userData: action.data,
                isError: false,
                isFetching: false,
                logged: true,
            });
        case actionTypes.RESET_ERROR: {
            return Object.assign({}, state, {
                ...state,
                isError: false,
                errorDescription: ''
            });
        }
        default:
            return state;
    }
};

export default userReducer;