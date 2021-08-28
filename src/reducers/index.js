import {combineReducers} from 'redux';

import authReducer from './authReducer';
import artReducer from './artReducer';
import userReducer from './userReducer';

export default combineReducers({
    auth: authReducer,
    art: artReducer,
    users: userReducer
});