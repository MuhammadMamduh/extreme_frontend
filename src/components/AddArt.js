/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react';
import Header from './Header';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {addArt} from '../actions';
import {TextArea } from 'semantic-ui-react'
import history from '../history';

const AddArt = ({auth, addArt})=>{
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);

    const onSubmit = (event)=>{
        event.preventDefault();

        let formData = new FormData();    //formdata object

        formData.append('artist', event.target.artist.value);   //append the values with key, value pair
        
        formData.append('picture', event.target.caption.files[0], event.target.caption.files[0].name);
        formData.append('description', event.target.description.value);
       

        addArt(formData, sessionStorage.getItem('token'))
        .then((res) => {
            if(res)
            {
                history.push('/admin/art'); // push will make u navigate
            }
        })
        .catch((error)=>{
            if (error.response) {
                setErrors(error.response.data.msg);
              }
        });
        setLoading(true);
    }



    return (
        <div>
            <Header username={auth.username} role={auth.role}/>
            <div className="ui grid">
                <div className="one wide column">
                    <div className="ui vertical moderate basic icon buttons" style={{border:"none"}}>
                        <Link to="/admin/art">
                            <button className="ui basic button" style={{border: "solid 1px #e6e6e6", marginBottom: "30px", borderRadius: "7px"}}>
                                <i className="settings large icon"></i>
                            </button>
                        </Link>
                    </div>
                    <div className="ui vertical moderate basic icon buttons" style={{marginBottom: "30px", borderRadius: "7px"}}>
                        <Link to="/admin/users">
                            <button className="ui basic button" >
                                <i className="user circle large icon"></i>
                            </button>
                        </Link>
                    </div>
                    <div className="ui vertical moderate violet icon buttons" style={{border:"none"}}>
                        <Link to="/admin/addArt">
                            <button className="ui violet button" style={{border: "solid 1px #e6e6e6", marginBottom: "30px", borderRadius: "7px"}}>
                                <i className="plus square large icon"></i>
                            </button>
                        </Link>
                    </div>
                </div>

                <div style={{margin:"10px", borderLeft:"3px solid #e6e6e6", width:"1px", height:"600px", display:"inline", color:"grey"}}></div>
                
                <div className="thirteen wide column">
                    <h3 style={{padding: 20, backgroundColor:"#f0f2f5"}}>Add Art Piece</h3>
                    <div className="ui grid ui center aligned segment">
                        <div className="ten wide column">
                            <form className="ui form" onSubmit={onSubmit}>
                                <div className="field">
                                    <label align="left">Artist</label>
                                    <div className="ui icon input">
                                        <input id="artist" required type="text" placeholder="Artist" style={{borderRadius: "9px"}}/>
                                        <i className="user icon" />
                                    </div>
                                </div>
                                <div className="field">
                                    <label align="left">Description</label>
                                    <div className="ui icon input">
                                        <TextArea id="description" required type="text" placeholder="Description" style={{borderRadius: "9px"}}/>
                                        <i className="tags icon" />
                                    </div>
                                </div>
                                <div className="field">
                                    <label align="left" htmlFor="customFile">Upload a Caption (image)</label>
                                    <input 
                                        type="file"
                                        name="caption" id="caption" 
                                        required
                                    />
                                </div>
                                <br/>
                                <button type="submit" align="center" className="ui button">Add</button>
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
                                {loading}?""
                                :
                                <div className="ui container">
                                    <div className="ui active big centered inline loader" align="center">
                                        <br/>
                                        <br/>
                                        <br/>
                                        Loading
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

            

            
        </div>
    );
}
const mapStateToProps = (state) =>{
    return  {
                auth:state.auth,
                usersList: state.users.list,
            }
}
export default connect(mapStateToProps, {addArt})(AddArt);
