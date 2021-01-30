import store from "../store";
import * as actionTypes from '../actionsTypes';


const initialState = {
    mainTitle: 'USociety'
};

const globalReducer = (state= initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_MAIN_TITLE:
            return {
              mainTitle: action.payload.title
            };
        default:
            return state;

    }
};

export default globalReducer;