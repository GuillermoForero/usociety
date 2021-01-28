import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducer/userReducer';
import categoryReducer from "./reducer/categoryReducer";
import groupReducer from "./reducer/groupReducer";
import {composeWithDevTools} from 'redux-devtools-extension';


const rootReducer = combineReducers({
    user: userReducer,
    category: categoryReducer,
    group: groupReducer
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;