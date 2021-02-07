import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import userReducer from './user/userReducer';
import categoryReducer from "./category/categoryReducer";
import groupReducer from "./group/groupReducer";
import globalReducer from "./global/globalReducer.js";
import {composeWithDevTools} from 'redux-devtools-extension';
import groupContentReducer from "./groupContent/groupContentReducer";


const rootReducer = combineReducers({
    user: userReducer,
    category: categoryReducer,
    group: groupReducer,
    groupContent: groupContentReducer,
    global: globalReducer
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;