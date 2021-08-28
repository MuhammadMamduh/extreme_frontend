import React from 'react'
import {Modal } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import ImageCard from './ImageCard';

function ArtModal({id, artist, image, description}) {
  const [open, setOpen] = React.useState(false)

  return (
    <Modal
      dimmer='blurring'
      closeIcon
      open={open}
      trigger={<ImageCard key={id} image={image} artist={artist} description={description}/>}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      style={{width:"600px", height:"630px", borderRadius:"10px"}}
    >
    
      <div className="ui center" align="center" >
          <img 
              alt={description}
              src={`data:image/jpeg;base64,${image}`}
              align="center"
              style={{borderTopLeftRadius:"10px", borderTopRightRadius:"10px", width:"100%", height:"auto"}}
          />
      </div>
      <div className="content" style={{paddingTop:15, paddingBottom:15}}><Link><b>{artist}</b></Link></div> 
      <div className="extra content" style={{maxHeight: "120px", paddingTop:0, paddingBottom:0, overflowY: "auto"}}>
        <p>{description}</p>
      </div>

    </Modal>
  )
}

export default ArtModal
