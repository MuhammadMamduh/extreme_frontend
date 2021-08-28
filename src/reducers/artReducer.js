/* eslint-disable import/no-anonymous-default-export */
import{
    CREATE_ART,
    FETCH_ALL_ART,
    FETCH_ART_COUNT,
    FETCH_ART,
    DELETE_ART,
    EDIT_ART
} from '../actions/types';


export default (state = {}, action)=>{
    switch(action.type){
        case FETCH_ALL_ART:
            return {...state, list: action.payload};
        case FETCH_ART_COUNT:
            return {...state, artCount: action.payload};
        case FETCH_ART:
            return {...state, [action.payload.id]: action.payload};
        case CREATE_ART:
            return {...state};
        case EDIT_ART:
            return {...state, [action.payload.id]: action.payload};
        case DELETE_ART:
            {
                let update = state.list.filter((item)=> item._id!==action.payload)
                return {...state, list:update}
            }
        default:
            return state;
    }
}