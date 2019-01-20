import { combineReducers } from 'redux';

import authReducer from './auth';
import progressReducer from './progress';
import toast from './toast';
import employerReducer from './employer';
import jobReducer from './job';
import employeeReducer from './employee'; 
import blogsReducer from './blogs';
import generalReducer from './general';

export default combineReducers({
    'auth': authReducer,
    'progress' : progressReducer,
    'toast' : toast,
    'employer' : employerReducer,
    'job': jobReducer,
    'employee': employeeReducer,
    'general': generalReducer,
    'blogs': blogsReducer
});