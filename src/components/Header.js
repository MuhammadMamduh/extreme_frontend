import React from 'react';
import {Link} from 'react-router-dom';
import {signOut} from '../actions';
import {connect} from 'react-redux';

const Header = ({signOut, auth})=>{
    return  (
                <div className="ui secondary pointing menu">
                    <Link to="/Gallery" className="item">
                        <h2><b>Louvre</b></h2>
                    </Link>

                    
                    <div className="right menu">
                        <Link to={`${sessionStorage.getItem('role')==="ADMIN"?"/admin/art":"#"}`}>
                            <div className="ui items">
                                <div className="content" style={{paddingTop:10}}>
                                    <div className="header" align="center"><b>{auth.username||sessionStorage.getItem('username')}</b></div>
                                    <div className="meta" align="center">
                                        <small><i><span className="price" style={{color:"grey"}}>{auth.role||sessionStorage.getItem('role')}</span></i></small>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                    
                            
                    <Link to="#" className="item">
                    <button onClick={()=>{signOut(sessionStorage.getItem('token'));}} style={{border:"none", backgroundColor:"white"}}>
                    <div className="ui animated button" tabIndex="0">
                        <div className="visible content">Sign Out</div>
                        <div className="hidden content">
                            <i className="sign-out icon"></i>
                        </div>
                    </div>
                    </button>
                    </Link>
                </div>
            )
};

const mapStateToProps = (state) =>{
    return {
        auth: state.auth
    }
}
export default connect(mapStateToProps, {signOut})(Header);