/* eslint-disable import/no-anonymous-default-export */
import{
    FETCH_USERS,
    REGISTER,
    FETCH_USERS_COUNT
} from '../actions/types';


export default (state = {}, action)=>{
    switch(action.type){
        case FETCH_USERS:
            return {...state, list: action.payload, };
        case FETCH_USERS_COUNT:
            return {...state, usersCount: action.payload};
        case REGISTER:
            {
                // console.log(state.list);
                // console.log(action.payload);
                return {...state};
            }
        default:
            return state;
    }
}