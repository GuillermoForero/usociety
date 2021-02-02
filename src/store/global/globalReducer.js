import * as actionTypes from '../actionsTypes';


const initialState = {
    mainTitle: 'USociety'
};

const globalReducer = (state = initialState, action) => {
    if (action.type === actionTypes.SET_MAIN_TITLE) {
        return {
            mainTitle: action.payload.title
        };
    }
    return state;
};

export default globalReducer;