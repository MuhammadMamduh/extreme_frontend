/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from 'react';
import ArtModal from './ArtModal';
import Header from './Header';
import {connect} from 'react-redux';
import {fetchAllArt, fetchArtCount} from '../actions';
import { Pagination } from 'semantic-ui-react'

const ImageList = ({auth, artList, fetchAllArt, fetchArtCount, artCount})=>{
    const [pageNumber, setPageNumber] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState(0);

    useEffect(()=>{
       fetchArtCount();
    }, [])
    
    useEffect(()=>{
        fetchAllArt(pageNumber, 8);
        setNumberOfPages(getNumberOfPages(8));

    }, [pageNumber, artCount])

    let images;
    if(artList)
    {    
        artList = artList.map((art)=>{
            return  (
                        <ArtModal id={art._id} artist= {art.artist} image={art.picture} description={art.description}/>
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
                    {/* <Modal artist= {artist} image={image} description={description} open={isOpen} onClose={() => setIsOpen(false)}/> */}
                    
                    <div className="ui container" style={{padding: 40, backgroundColor:"#f0f2f5"}}>
                        <h1>Gallery</h1>
                        <div className="ui four cards">
                            {artList}
                        </div>

                        {
                                artList?""
                                :
                                <div className="ui container">
                                    <div className="ui active big centered inline loader" align="center">
                                        <br/>
                                        <br/>
                                        <br/>
                                        {/* Loading */}
                                    </div>
                                </div>
                        }
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
                    </div>
                    
                </div>
            );
}

const mapStateToProps = (state) =>{
    return {
        artList:state.art.list,
        auth: state.auth,
        artCount: state.art.artCount
    }
}
export default connect(mapStateToProps, {fetchAllArt, fetchArtCount})(ImageList);


