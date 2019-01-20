import { createStore, applyMiddleware } from "redux";
import mainReducer from './reducers';
import Thunk from 'redux-thunk';
import { createLogger } from "redux-logger";

let middleware = applyMiddleware(Thunk, createLogger());

export default createStore(mainReducer, middleware);