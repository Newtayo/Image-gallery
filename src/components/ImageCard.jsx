import React from 'react'

const ImageCard = ({image}) => {
  return (
    <div>
        <img src={image.poster} alt={image.title} className='movie-card'/>
    </div>
  )
}

export default ImageCard