/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from 'react';
import Header from './Header';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchUsers, fetchUsersCount} from '../actions';

const AdminUsers = ({auth, usersList, fetchUsers, fetchUsersCount, usersCount})=>{

    const [pageNumber, setPageNumber] = useState(1);
    // ________________________________

    useEffect(()=>{
        fetchUsers(sessionStorage.getItem('token'), pageNumber);
        fetchUsersCount(sessionStorage.getItem('token'));
    }, [])

    useEffect(()=>{
        fetchUsers(sessionStorage.getItem('token'), pageNumber);
    }, [pageNumber])
    // ________________________________

    let rows;
    if(usersList)
    {
        rows = usersList.map((user)=>{
            return (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td className="single line">{user.username}</td>
                            <td>
                                <div className="ui star rating" data-rating={3} data-max-rating={3}>
                                    {user.phone}
                                </div>
                            </td>
                        </tr>
                    );
        })
    }

    const paginationItems = ()=>{
        if(usersList && usersCount)
        {
            let numberOfPages;
            if(usersCount.length<=10)
            {
                numberOfPages = 1;
            }
            else
            {
                numberOfPages = usersCount.length%10===0?usersCount.length/10:Math.ceil((usersCount.length/10));
            }
            // console.log(numberOfPages+"ooooooooooooooooooo");
            let array = [];
            array.push  (                                   
                            <Link key="-1" to="#" className="icon item" onClick={()=>{setPageNumber(pageNumber-1)}} style={{pointerEvents: `${pageNumber===1?"none":""}` }}>
                                <i className="left chevron icon" />
                            </Link>
                        );
            for(let i = 0; i < numberOfPages; i++)
            {
                array.push  (
                                <Link key={i} to="#" className="ui blue item" onClick={()=>setPageNumber(i+1)}>
                                    {i+1}
                                </Link>
                            )
            }

            array.push  (                                   
                            <Link key="-10" to="#" className="icon item" onClick={()=>{setPageNumber(pageNumber+1)}} style={{pointerEvents: `${pageNumber===numberOfPages?"none":""}` }}>
                                <i className="right chevron icon" />
                            </Link>
                        );
            return  (
                        <div className="ui pagination menu" align="center">
                            {array}
                        </div>
                    );
        }
    }

    return (
        <div>
            <Header username={auth.username} role={auth.role}/>
            
            <div className="ui grid">
                <div className="one wide column">
                    <div className="ui vertical moderate basic icon buttons" style={{border:"none"}}>
                        <Link to="/admin/art">
                            <button className="ui basic button" style={{border: "solid 1px #e6e6e6", marginBottom: "30px", borderRadius: "7px"}}>
                                <i className="settings circle large icon"></i>
                            </button>
                        </Link>
                    </div>
                    <div className="ui vertical moderate violet icon buttons">
                        <Link to="/admin/users">
                            <button className="ui violet button" style={{marginBottom: "30px", borderRadius: "7px"}}>
                                <i className="user circle large icon"></i>
                            </button>
                        </Link>
                    </div>
                    <div className="ui vertical moderate basic icon buttons" style={{border:"none"}}>
                        <Link to="/admin/addArt">
                            <button className="ui basic button" style={{border: "solid 1px #e6e6e6", marginBottom: "30px", borderRadius: "7px"}}>
                                <i className="plus square large icon"></i>
                            </button>
                        </Link>
                    </div>
                </div>

                <div style={{margin:"10px", borderLeft:"3px solid #e6e6e6", width:"1px", height:"600px", display:"inline", color:"grey"}}></div>
                
                <div className="thirteen wide column">
                    {/* <div className="ui header" > */}
                        <h3 style={{padding: 20, backgroundColor:"#f0f2f5"}}>Users</h3>
                    {/* </div> */}
                    <div className="ui container">
                    <table className="ui table" style={{border:"none"}}>
                        <thead>
                            <tr>
                                <th className="single line">ID</th>
                                <th>User Name</th>
                                <th>Phone Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                        <tfoot>
                            <tr>
                            <th colSpan={5}  className="ui center aligned">
                                {paginationItems()}
                            </th>
                            </tr>
                        </tfoot>
                        </table>
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
                usersCount: state.users.usersCount
            }
}
export default connect(mapStateToProps, {fetchUsers, fetchUsersCount})(AdminUsers);
