import React, {useState, useEffect} from 'react';
import Header from './Header';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchAllArt, fetchArtCount, deleteArt} from '../actions';
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

const AdminArt = ({auth, artList, fetchAllArt, fetchArtCount, artCount, deleteArt})=>{
    const [pageNumber, setPageNumber] = useState(1);
    useEffect(()=>{
        // fetchAllArt(pageNumber, 10);
        fetchArtCount();
    }, [])

    useEffect(()=>{
        fetchAllArt(pageNumber, 10);
    }, [pageNumber])

    let rows;
    if(artList)
    {
        rows = artList.map((art)=>{
            return (
                        <tr key={art._id}>
                            <td>
                                <img 
                                    alt={art.description}
                                    src={`data:image/jpeg;base64,${art.picture}`}
                                    align="center"
                                    style={{borderRadius:"5px", width:"95px", height:"100px"}}
                                />
                            </td>
                            <td className="single line">Art Name</td>
                            <td>
                                <div className="ui star rating" data-rating={3} data-max-rating={3}>
                                    {art.artist}
                                </div>
                            </td>
                            <td className="left aligned" >
                                <p style={{maxHeight:"40px", overflow:"hidden"}}>{art.description}</p>
                                <Link to="#">See Details</Link>
                            </td>
                            <td>
                                <button className="negative ui button" onClick={()=>{deleteArt(art._id, sessionStorage.getItem('token'))}}>Delete</button>
                            </td>
                        </tr>
                    );
        })
    }

    const paginationItems = ()=>{
        if(artList && artCount)
        {
            let numberOfPages;
            if(artCount.length<=10)
            {
                numberOfPages = 1;
                
            }
            else
            {
                numberOfPages = artCount.length%10===0?artCount.length/10:Math.ceil(artCount.length/10);
            }
            

            let array = [];
            array.push  (                                   
                            <Link key="-1" to="#" className="icon item" onClick={()=>{setPageNumber(pageNumber-1); window.scrollTo(0,0);}} style={{pointerEvents: `${pageNumber===1?"none":""}` }}>
                                <i className="left chevron icon" />
                            </Link>
                        );
            for(let i = 0; i < numberOfPages; i++){
                array.push(<Link key={i} to="#" className="item" onClick={()=>{setPageNumber(i+1); window.scrollTo(0,0);}}>{i+1}</Link>)
            }

            array.push  (                                   
                            <Link key="-10" to="#" className="icon item" onClick={()=>{setPageNumber(pageNumber+1); window.scrollTo(0,0);}} style={{pointerEvents: `${pageNumber===numberOfPages?"none":""}` }}>
                                <i className="right chevron icon" />
                            </Link>
                        );
            return (
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
                        <div className="ui vertical moderate violet icon buttons">
                            <Link to="/admin/art">
                                <button className="ui violet button" style={{marginBottom: "30px", borderRadius: "7px"}}>
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
                        <div className="ui vertical moderate basic icon buttons" style={{border:"none"}}>
                            <Link to="/admin/addArt">
                                <button className="ui basic button" style={{border: "solid 1px #e6e6e6", marginBottom: "30px", borderRadius: "7px"}}>
                                    <i className="plus square large icon"></i>
                                </button>
                            </Link>
                        </div>
                </div>

                <div style={{margin:"10px", borderLeft:"3px solid #e6e6e6", width:"1px", height:"1400px", display:"inline", color:"grey"}}></div>
                
                <div className="thirteen wide column">
                    {/* <div className="ui header" > */}
                    <h3 style={{padding: 20, backgroundColor:"#f0f2f5"}}>Art Pieces</h3>
                    {/* </div> */}
                    <div className="ui container">
                    <table className="ui table" style={{border:"none"}}>
                        <thead>
                            <tr>
                                <th className="single line">Item</th>
                                <th>Name</th>
                                <th>Artist</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                        <tfoot>
                            <tr>
                            <th colSpan={5} className="ui center aligned">
                                {paginationItems()}
                            </th>
                            </tr>
                        </tfoot>
                        </table>
                        {
                                artList?""
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
    );
}
const mapStateToProps = (state) =>{
    return  {
                artList:state.art.list,
                auth:state.auth,
                artCount: state.art.artCount
            }
}
export default connect(mapStateToProps, {fetchAllArt, fetchArtCount, deleteArt})(AdminArt);
