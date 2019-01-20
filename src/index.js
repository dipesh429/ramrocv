import React from 'react';
import ReactDOM from 'react-dom';
import Route from './routes/web';
import { Provider } from 'react-redux';
import store from './store';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-128632227-1')

ReactDOM.render(
<Provider store={store}>
    <Route />
</Provider>
, document.getElementById('root'));



