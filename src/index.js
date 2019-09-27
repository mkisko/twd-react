import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";

import './css/index.scss';
import 'antd/dist/antd.css';
import App from './app/App';

ReactDOM.render(<BrowserRouter><App/></BrowserRouter>, document.getElementById('root'));
