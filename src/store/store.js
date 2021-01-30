import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import userReducer from './user/userReducer';
import categoryReducer from "./category/categoryReducer";
import groupReducer from "./group/groupReducer";
import globalReducer from "./global/globalReducer.js";
import {composeWithDevTools} from 'redux-devtools-extension';


const rootReducer = combineReducers({
    user: userReducer,
    category: categoryReducer,
    group: groupReducer,
    global: globalReducer
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;