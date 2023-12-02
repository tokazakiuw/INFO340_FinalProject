import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export function CardDetail() {
  const { id } = useParams();
  const [card, setCard] = useState({});

    useEffect(() => {
        fetch("/data/cardData.json")
        .then((response) => response.json())
        .then((data) => {
            const selectedCard = data.find((e) => e.id + '' === id);
            setCard(selectedCard);
        })
        .catch((error) => {
            console.error("Error fetching card data:", error);
          });
    }, [id]);

  return (
    <div className="detail-main">
      <h1>Card Information</h1>
      <div className="detail-container">
        <img src={card.imgSrc} alt={card.altText} className="detail-image" />
        <div className="detail-info-section">
          <p>Card Name: {card.cardName}</p>
          <p>
            Seller: {card.user}
          </p>
          <p>Card Type: {card.cardType}</p>
          <p>Rarity: {card.cardRarity}</p>
          <p>Description: {card.description}</p>
        </div>
      </div>
    </div>
  );
}