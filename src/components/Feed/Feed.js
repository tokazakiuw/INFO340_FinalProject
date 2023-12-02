import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import CardFilter from './CardFilter';
import Card from './Card';
import { Link } from 'react-router-dom';

function Feed(props) {
  const [filteredCards, setFilteredCards] = useState([]);
  const [allCards, setAllCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);

  const filterCards = (cards, searchQuery) => {
    setIsFiltering(true);
    const filteredCards = cards.filter((card) => {
      const cardNameMatch = card.cardName.toLowerCase().includes(searchQuery.toLowerCase());
      const descriptionMatch = card.description.toLowerCase().includes(searchQuery.toLowerCase());
      const typeMatch = card.cardType.toLowerCase().includes(searchQuery.toLowerCase());

      return cardNameMatch || descriptionMatch || typeMatch;
    });

    setFilteredCards(filteredCards);
    setIsFiltering(false);
  };

  useEffect(() => {
    fetch('data/cardData.json')

    .then(response => {
      return response.json();
    })

    .then(data => {
      setAllCards(data);
      setFilteredCards(data);
      setIsLoading(false);
    })
  }, []);

  const handleFilter = (filters) => {
    setIsFiltering(true);
    const { tradingCard, cardType, cardRarity, priceRange } = filters;

    const newFilteredCards = allCards.filter((card) => {
      return (
        (tradingCard === '' || card.tradingCard === tradingCard) &&
        (cardType === '' || card.cardType === cardType) &&
        (cardRarity === '' || card.cardRarity === cardRarity) &&
        (priceRange === '' || parseFloat(card.price.slice(1)) <= parseInt(priceRange))
      );
    });

    setFilteredCards(newFilteredCards);
    setIsFiltering(false);
  };

  const handleSearch = (searchQuery) => {
    filterCards(allCards, searchQuery);
  };

  let cards = filteredCards.map((card, index) => (
    <Link to={'/main/' + card.id} className="card-links" key={index}>
      <Card
        imgSrc={card.imgSrc}
        altText={card.altText}
        cardName={card.cardName}
        description={card.description}
        price={card.price}
      />
    </Link>
  ));

  let main = (
    <div>
      <Navbar onSearch={handleSearch} />
      <div className="filter-pad">
        <CardFilter onFilter={handleFilter} />
      </div>
      <div className="container-card">
        {isLoading ? (
            <p className="loading">Loading...</p>
            ) : isFiltering ? (
            <p className="loading">Filtering...</p>
            ) : filteredCards.length === 0 ? (
            <p className="no-results">No results found.</p>
            ) : cards
        }
      </div>
    </div>
  );

  return main;
}

export default Feed;