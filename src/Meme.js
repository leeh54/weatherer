import React from 'react'

function Meme(props){
    const {meme} = props
    const url = meme.images.fixed_height.url
    return (<div className="meme-wrap" onClick={()=>window.open(url, '_blank')}>
      <img height="200" alt="meme" src={url} />
    </div>)
  }

  export default Meme