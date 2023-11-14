import React from 'react';

const CreateItemCard = ({ onClick }) => {
  return (
    <div className="card create-card" onClick={onClick}>
      <div className="card_body">
        <div className="create-category-tile" id="default">
          <button id="openButton">+</button>
          <p>Pridať kategóriu</p>
        </div>
      </div>
    </div>
  );
};

export default CreateItemCard;