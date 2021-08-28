/* eslint-disable import/no-anonymous-default-export */
import {SIGN_IN, SIGN_OUT} from '../actions/types';

const INITIAL_STATE = {
    isSignedIn: null,
    token: null,
    username: null,
    role: null
}

export default (state = INITIAL_STATE, action)=>{
    switch(action.type){
        case SIGN_IN:
            {
                sessionStorage.setItem('username', action.payload.user.username);
                sessionStorage.setItem('role', action.payload.user.role);
                sessionStorage.setItem('token', action.payload.token);

                console.log(sessionStorage.getItem('username')+"__________");
                console.log(sessionStorage.getItem('role')+"__________");
                console.log(sessionStorage.getItem('token')+"__________");

            return {...state, isSignedIn: true, token: action.payload.token, username: action.payload.user.username, role: action.payload.user.role};
            }
            case SIGN_OUT:
            {
                sessionStorage.removeItem('username');
                sessionStorage.removeItem('role');
                sessionStorage.removeItem('token');
                return {...state, isSignedIn: false, token: null, username: null, role: null};
            }
        default:
            return state;
    }
}