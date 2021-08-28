import React, {useState} from 'react';
import {Divider} from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {signIn, fetchUsers} from '../actions';

const Login = ({signIn, fetchUsers})=>{
    const [errors, setErrors] = useState(null);
    const onSubmit = (event)=>{
        event.preventDefault();

        signIn(event.target.username.value, event.target.password.value).catch(error=>{
            if (error.response) {
              setErrors(error.response.data.msg);
            }
          });

          if(sessionStorage.getItem('role')==="ADMIN")
          {
            fetchUsers(sessionStorage.getItem('token'))
          }
    }


    return  (
                <div className="ui  very padded text container segment" style={{marginTop:"100px"}}>
                    <div className="ui grid ui center aligned segment" >
                        <div className="ten wide column" >
                            <h1 align="center">Login</h1>
                            <Divider section />
                            <form className="ui form" onSubmit={onSubmit} style={{autocomplete:"on"}}>
                                <div className="field">
                                    <label align="left">Username</label>
                                    <div className="ui icon input">
                                        <input required pattern=".{2,30}" id="username" type="text" placeholder="Username" style={{borderRadius: "9px"}}/>
                                        <i className="user icon" />
                                    </div>
                                    {/* <label align="left" style={{color:"grey"}}><i> Must be between 2 & 30 chars</i></label> */}
                                </div>
                                <div className="field">
                                    <label align="left">Password</label>
                                    <div className="ui icon input">
                                        <input required pattern=".{7,15}" id="password" type="password" placeholder="Password" style={{borderRadius: "9px"}}/>
                                        <i className="lock icon" />
                                    </div>
                                    {/* <label align="left" style={{color:"grey"}}><i> Must be between 7 & 15 chars</i></label> */}
                                </div>
                                <div className="form-group center">
                                    <p className="text-center">
                                        Don't have account? 
                                        <Link to="/signup" id="signup"> Sign up here</Link>
                                    </p>
                                </div>
                                <br/>
                                <div className="field">
                                <div className="ui icon input">
                                    <button align="center" className="fluid ui button violet" type="submit">Login</button>
                                </div>
                                </div>
                            </form>
                            {
                                errors?
                                    (
                                        <div className="ui error message">  
                                            <i className="close icon" onClick={()=>{setErrors(null)}}></i>
                                            <div className="header">
                                            {errors}
                                            </div>
                                        </div>
                                    )
                                    :""
                            }
                        </div>
                        
                    </div>
                </div>
            );
}
const mapStateToProps = (state) =>{
    return {isSignedIn:state.auth.isSignedIn}
}
export default connect(mapStateToProps, {signIn, fetchUsers})(Login);
