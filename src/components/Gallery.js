import React, {useState, useEffect} from 'react';
import { Divider, Segment } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {signIn, signOut} from '../actions';

const Gallery = ({isSignedIn})=>{

    const onSubmit = (event)=>{
        event.preventDefault();
    }

    return  (
                <div className="ui raised very padded text container segment">
                    Gallery
                </div>
            );
}
const mapStateToProps = (state) =>{
    return {isSignedIn:state.auth.isSignedIn}
}
export default connect(mapStateToProps, {signIn, signOut})(Gallery);
