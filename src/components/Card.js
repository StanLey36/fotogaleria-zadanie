import React from 'react';

const Card = ({ myimage, mytitle, totalImages }) => {
  return (
    <div className='card'>
      <img src={"/img/default-image.png"} alt={myimage} />
      <span>{totalImages} fotiek</span>
      <div className="card_body">
        <div className='card_title_area'>
          <p className="card_title">{decodeURIComponent(mytitle)}</p>
        </div>  
      </div>
    </div>
  );
};

export default Card;