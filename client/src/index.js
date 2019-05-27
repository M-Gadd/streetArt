import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { BrowserRouter as Router } from 'react-router-dom';
// const BrowserHistory = require('react-router/lib/BrowserHistory').default;
import App from './App';
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Router ><App /></Router>, document.getElementById('root'));
// registerServiceWorker();
