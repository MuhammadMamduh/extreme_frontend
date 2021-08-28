import backend from '../apis/backend';
import history from '../history';
import {
        SIGN_IN, 
        SIGN_OUT, 
        REGISTER, 
        CREATE_ART,
        FETCH_ALL_ART,
        FETCH_ART,
        DELETE_ART,
        EDIT_ART,
        FETCH_USERS,
        FETCH_USERS_COUNT,
        FETCH_ART_COUNT
        } from './types';


export const register = (username, password, role, phone) => async dispatch=>{
    const response = await backend.post('/user', {username, password, role, phone});
    dispatch({type: REGISTER, payload: response.data});
    // history.push('/login');
}

export const signIn = (username, password)=> async dispatch=>{
    const response = await backend.post(`/login`, {username, password});
    dispatch({type: SIGN_IN, payload: response.data});
    // console.log(response.data);
    
    if(response.data.user.role==="ADMIN")
    {
        history.push('/admin/art');
    }
    else if(response.data.user.role==="GUEST")
    {
        history.push('/Gallery');
    }
    // else{
    //     history.push('/login');
    // }
}
export const signOut = (token)=> async dispatch=>{
    backend.defaults.headers.common['Authorization'] = "Bearer "+ token;
    const response = await backend.post('/logoutAll');
    dispatch({type: SIGN_OUT, payload: response.data});
    console.log(response.data);
    history.push('/login');
}


export const fetchUsers = (token,pageNumber)=> async dispatch => {
    backend.defaults.headers.common['Authorization'] = "Bearer "+ token;
    const response = await backend.get('/users', { params: { skip: (pageNumber*10)-10, limit: 10 }});
    dispatch({type: FETCH_USERS, payload: response.data});
}
export const fetchUsersCount = (token)=> async dispatch => {
    backend.defaults.headers.common['Authorization'] = "Bearer "+ token;
    const response = await backend.get('/users/count');
    dispatch({type: FETCH_USERS_COUNT, payload: response.data});
}



export const fetchAllArt = (pageNumber, limit)=> async dispatch => {
    const response = await backend.get('/art', { params: { skip: (pageNumber*limit)-limit, limit: limit }});
    dispatch({type: FETCH_ALL_ART, payload: response.data});
}
export const fetchArtCount = ()=> async dispatch => {
    const response = await backend.get('/art/count');
    dispatch({type: FETCH_ART_COUNT, payload: response.data});
}
export const fetchArt = (id) => async dispatch =>{
    const response = await backend.get(`/art/${id}`);
    dispatch({type: FETCH_ART, payload: response.data});
}

export const addArt = (formData, token)=>{
    return async (dispatch, getState)=>{
        // const {userId} = getState().auth;

        const config = {     
            headers: { 'content-type': 'multipart/form-data' }
        }
        backend.defaults.headers.common['Authorization'] = "Bearer "+ token;
        const response = await backend.post('/art', formData, config);
        dispatch({type: CREATE_ART, payload: response.data});

        history.push('/admin/art'); // push will make u navigate
    };
};

export const editArt = (formData, id, token) => async dispatch=>{
    const config = {     
        headers: { 'content-type': 'multipart/form-data' }
    }
    backend.defaults.headers.common['Authorization'] = "Bearer "+ token;

    const response = await backend.patch(`/art/${id}`, formData, config);
    dispatch({type: EDIT_ART, payload: response.data});

    history.push(`/admin/art`); // push will make u navigate
}

export const deleteArt = (id, token) => async dispatch =>{
    backend.defaults.headers.common['Authorization'] = "Bearer "+ token;
    await backend.delete(`/art/${id}`);
    dispatch({type: DELETE_ART, payload: id});

    history.push('/admin/art'); // push will make u navigate
}