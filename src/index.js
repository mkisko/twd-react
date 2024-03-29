import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";

import 'antd/dist/antd.css';
import './css/reset.css';
import './css/index.scss';

import App from './app/App';

ReactDOM.render(<BrowserRouter><App/></BrowserRouter>, document.getElementById('root'));
