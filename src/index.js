import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/App/App";

import {Provider} from "react-redux";
import store from "./store/store";
import './global.css';

ReactDOM.render(<Provider store={store}><App/></Provider>, document.querySelector('#app'));