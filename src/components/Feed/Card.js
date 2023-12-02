import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';

function Card({ imgSrc, altText, cardName, description, price, isFavorite, handleFavoriteClick }) {
  const handleFavorite = (event) => {
    event.stopPropagation(); // Prevent event propagation to parent elements
    handleFavoriteClick();
  };

  return (
    <div className="card">
      <div className="card-image">
        <img src={imgSrc} alt={altText} />
      </div>
      <div className="card-info">
        <h1>
          {cardName}{' '}
          <span onClick={handleFavorite}>
            <FontAwesomeIcon icon={isFavorite ? solidHeart : emptyHeart} />
          </span>
        </h1>
        <p>{description}</p>
        <div className="card-price">
          <p>{price}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;