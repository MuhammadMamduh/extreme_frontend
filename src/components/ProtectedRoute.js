import React from 'react'
import { Redirect } from 'react-router-dom'
import {connect} from 'react-redux';
import {signOut} from '../actions';

const ProtectedRoute =({component, role, type, signOut, token})=> {


        const Component = component;
     
        // const isAuthenticated = ???;
       console.log("role: " + role+ "__________________________");
       console.log("type: " + type+ "__________________________");
        if(type.includes(role))
        {
            return <Component />
        }else{
            if(role)
            {
                signOut(token);
            }
            return <Redirect to={{ pathname: '/login' }} />
        }

}

const mapStateToProps = (state) =>{
    return {rolex:state.auth}
}
export default connect(mapStateToProps, {signOut})(ProtectedRoute);