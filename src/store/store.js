import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducer/userReducer';
import { composeWithDevTools } from 'redux-devtools-extension';


const store = createStore(userReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;