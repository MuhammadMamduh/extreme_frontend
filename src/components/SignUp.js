import React, {useState} from 'react';
import { Divider} from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {register} from '../actions';
import history from '../history';

const SignUp = ({register})=>{
    const [errors, setErrors] = useState(null);
    const [success, setSuccess] = useState(false);

    const onSubmit = (event)=>{
        event.preventDefault();

        register(event.target.username.value, event.target.password.value, event.target.role.value, event.target.phone.value)
        .then(() => {setSuccess(true)})
        .catch((error)=>{
            if (error.response) {
                setErrors(error.response.data.msg);
              }
        });
    }
    const isNumber = (evt)=>
    {
        const lastCharIndex = evt.target.value.length-1
        const lastChar = evt.target.value[lastCharIndex];
        if (isNaN(lastChar))
        {
            evt.target.value=evt.target.value.substring(0, lastCharIndex);
        }
    }
    return  (
                <div className="ui raised very padded text container segment" style={{marginTop:"10px"}}>
                    <div className="ui grid ui center aligned segment" align="center" >
                        <div className="ten wide column">
                            <h1 align="center">Sign Up</h1>
                            <Divider section />
                            <form className="ui form" onSubmit={onSubmit}>
                                <div className="field">
                                    <label align="left">Username</label>
                                    <div className="ui icon input">
                                        <input id="username" required pattern=".{2,30}" type="text" placeholder="Username" style={{borderRadius: "9px"}}/>
                                        <i className="user icon" />
                                    </div>
                                    <label align="left" style={{color:"grey"}}><i> Must be between 2 & 30 chars</i></label>
                                </div>
                                <div className="field">
                                    <label align="left">Password</label>
                                    <div className="ui icon input">
                                        <input id="password" required pattern=".{7,15}" type="password" placeholder="Password" style={{borderRadius: "9px"}}/>
                                        <i className="lock icon" />
                                    </div>
                                    <label align="left" style={{color:"grey"}}><i> Must be between 7 & 15 chars</i></label>
                                </div>
                                <div className="field">
                                    <label align="left">Select Role</label>
                                    <select id="role" className="ui fluid selection dropdown" style={{borderRadius: "9px"}}>
                                        <option value="ADMIN">ADMIN</option>
                                        <option value="GUEST">GUEST</option>
                                    </select>
                                </div>
                                <div className="field">
                                    <label align="left">Phone</label>
                                    <div className="ui icon input">
                                        <input onChange={isNumber}  type="tel" id="phone" required pattern="[0-0]{1}[0-9]{2}[0-9]{3}[0-9]{3}[0-9]{2}" placeholder="Mobile Number" style={{borderRadius: "9px"}}/>
                                        <i className="call icon"/>
                                    </div>
                                    <label align="left" style={{color:"grey"}}><i> Must be exactly 11 chars (starting with 0)</i></label>
                                </div>
                                <div className="col-md-12 ">
                                    <div className="form-group">
                                        <p className="text-center">
                                            Already have an account?
                                            <Link to="/login" id="login"> Login here</Link>
                                        </p>
                                    </div>
                                </div>
                                <br/>
                                <button type="submit" align="center" className="fluid ui button violet">Sign Up</button>
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
                            {
                                success&&!errors?
                                    (
                                        <div className="ui success message">  
                                            <i className="close icon" onClick={()=>{setSuccess(false); history.push('/login');}}></i>
                                            <div className="header">
                                                User has been created successfully
                                            </div>
                                            <p><Link to="/login"style={{textDecoration: "none"}}>You may now log-in with the username you have chosen</Link></p>
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
    return {
                isSignedIn:state.auth.isSignedIn
            }
}
export default connect(mapStateToProps, {register})(SignUp);