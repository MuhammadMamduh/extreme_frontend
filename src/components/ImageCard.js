/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {Link} from 'react-router-dom';

const ImageCard = ({key, image, artist, description, ...rest})=> {

    return (
                <Link to="#" key={key} className="violet card">
                <div className="ui card" key={key} {...rest}>
                    <div className="image">
                        <img 
                            alt={description}
                            src={`data:image/jpeg;base64,${image}`} 
                            style={{ width:"100%", height:"100%"}}
                        />
                    </div>
                    <div className="content">
                        <h5 className="header" align="center">{artist}</h5>
                    </div>
                    <div className="extra content">
                        <p style={{ height: 60, overflow:"hidden", textOverflow: "ellipsis"}}>
                            {description}
                        </p>
                    </div>
                </div>
                </Link>
            );
    
}

export default ImageCard;