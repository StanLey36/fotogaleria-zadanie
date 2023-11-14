import React from 'react';

const PhotoCard = ({ myimage, myalt }) => {
  return (
    <div className="card image">
      <img id="category-image-item" src={myimage} alt={myalt}/>
    </div>
  );
};

export default PhotoCard;