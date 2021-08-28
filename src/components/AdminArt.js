import React, {useState, useEffect} from 'react';
import Header from './Header';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchAllArt, fetchArtCount, deleteArt} from '../actions';
import { Pagination } from 'semantic-ui-react';

const AdminArt = ({auth, artList, fetchAllArt, fetchArtCount, artCount, deleteArt})=>{
    const [pageNumber, setPageNumber] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState(0);
    
    useEffect(()=>{
        fetchArtCount();
    }, [])

    useEffect(()=>{
        fetchAllArt(pageNumber, 5);
        setNumberOfPages(getNumberOfPages(5));
    }, [pageNumber, artCount])

    if(artList)
    {
        artList = artList.map((art)=>{
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

    const getNumberOfPages = (limit)=>{
        let numberOfPages=1;
        if(artCount)
        {        
            if(artCount.length>limit)
            {
                numberOfPages = artCount.length%limit===0?artCount.length/limit:Math.ceil(artCount.length/limit);
                console.log("gotHear");
            }
        }

        return numberOfPages;
    }
    
    const onChange = (e, pageInfo)=>{
        console.log(pageInfo.activePage);
        setPageNumber(pageInfo.activePage);
        artList = [];
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

                <div style={{margin:"10px", borderLeft:"3px solid #e6e6e6", width:"1px", height:"800px", display:"inline", color:"grey"}}></div>
                
                <div className="thirteen wide column">
                    <h3 style={{padding: 20, backgroundColor:"#f0f2f5"}}>Art Pieces</h3>
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
                            {artList}
                        </tbody>
                        <tfoot>
                            <tr>
                            <th colSpan={5} className="ui center aligned">
                            <br/>
                        <br/>
                        <div className="ui grid ui center aligned">
                            <Pagination 
                                boundaryRange={0}
                                defaultActivePage={1}
                                ellipsisItem={null}
                                firstItem={null}
                                lastItem={null}
                                siblingRange={1}

                                activePage={pageNumber}
                                totalPages={numberOfPages}
                                onPageChange={onChange} 
                                
                                align="center"
                            />
                            
                        </div>
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
