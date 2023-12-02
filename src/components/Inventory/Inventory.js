import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import CardFilter from '../Feed/CardFilter';
import Card from '../Feed/Card';

function InventoryHeader() {
  return (
    <section className="grey">
      <h1>
        <img src="img/profile.png" alt="User profile avatar" className="profile-photo-big" /> Username
      </h1>
      <p>Hi, here is the description of my account.</p>
      <p>Trust Rating: <em>100/100</em></p>
    </section>
  );
}

function FavoriteCardSection({ favoriteCardsFiltered, handleClickPost, handleFavorite }) {
  let favCardArray = favoriteCardsFiltered.map((card, index) => {
    return (
        <Card
          imgSrc={card.imgSrc}
          altText={card.altText}
          cardName={card.cardName}
          description={card.description}
          price={card.price}
          postFunction={handleClickPost}
          isFavorite={true}
          handleFavoriteClick={() => handleFavorite(card.id)}
          key={index}
        />
    );
  });

  return (
    <div>
      <h2>Favorite Cards</h2>
      <div className="container-card">{favCardArray}</div>
    </div>
  );
}


function FullInventorySection({ inventoryFiltered, showNoResults, handleFavorite }) {
  let cardInventory = inventoryFiltered.map((card, index) => {
    return (
        <Card
          imgSrc={card.imgSrc}
          altText={card.altText}
          cardName={card.cardName}
          description={card.description}
          price={card.price}
          isFavorite={card.isFavorite}
          handleFavoriteClick={() => handleFavorite(card.id)}
          key={index}
        />
    );
  });

  return (
    <div>
      <h2>Full Inventory</h2>
      <div className="container-card">
        {showNoResults && inventoryFiltered.length === 0 && (
          <p className="no-results">No results found.</p>
        )}
        {cardInventory}
      </div>
    </div>
  );
}

function Inventory() {
  const [favoriteCardsFiltered, setFavoriteCardsFiltered] = useState([]);
  const [originalCards, setOriginalCards] = useState([]);
  const [inventoryFiltered, setInventoryFiltered] = useState([]);
  const [showNoResults, setShowNoResults] = useState(false);
  const [postPopupIsOpen, setPostPopupIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showText, setShowText] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({
    tradingCard: '',
    cardType: '',
    cardRarity: '',
    priceRange: ''
  });
  const [newCard, setNewCard] = useState({
    imgSrc: '',
    altText: '',
    cardName: '',
    description: '',
    price: '',
    tags: [],
    tradingCard: '',
    cardType: '',
    cardRarity: '',
    priceRange: 0,
    user: 'fakeUser'
  });

  useEffect(() => {
    fetch('/data/cardData.json')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setOriginalCards(data);
        const filteredCards = filterCards(data, appliedFilters, searchQuery);
        setInventoryFiltered(filteredCards);
      });
  }, []);
  
  useEffect(() => {
    const filteredFavoriteCards = inventoryFiltered.filter((card) => card.isFavorite === true);
    setFavoriteCardsFiltered(filteredFavoriteCards);
  }, [inventoryFiltered]);

  function filterCards(cards, filters, searchQuery = '') {
    const { tradingCard, cardType, cardRarity, priceRange } = filters;

    return cards.filter((card) => {
      const cardNameMatch = card.cardName.toLowerCase().includes(searchQuery.toLowerCase());
      const descriptionMatch = card.description.toLowerCase().includes(searchQuery.toLowerCase());
      const typeMatch = card.cardType.toLowerCase().includes(searchQuery.toLowerCase());

      return (
        (tradingCard === '' || card.tradingCard === tradingCard) &&
        (cardType === '' || card.cardType === cardType) &&
        (cardRarity === '' || card.cardRarity === cardRarity) &&
        (priceRange === '' || parseFloat(card.price.slice(1)) <= parseInt(priceRange)) &&
        (cardNameMatch || descriptionMatch || typeMatch)
      );
    });
  }

  function handleFilter(filters) {
    const filteredCards = filterCards(originalCards, filters);
    setInventoryFiltered(filteredCards);
    const filteredFavoriteCards = filteredCards.filter(e => e.isFavorite === true);
    setFavoriteCardsFiltered(filteredFavoriteCards);
    setShowNoResults(filteredFavoriteCards.length === 0 && filteredCards.length === 0);
    setAppliedFilters(filters);
  }

  function resetFilters() {
    setFavoriteCardsFiltered(originalCards);
    setInventoryFiltered(originalCards);
    setShowNoResults(false);
    setAppliedFilters({
      tradingCard: '',
      cardType: '',
      cardRarity: '',
      priceRange: ''
    });
  }

  function handleClickPost(newCard) {
    setPostPopupIsOpen(true);
    setShowText(true);
    console.log(newCard);
    console.log(postPopupIsOpen);
  }

  function handlePost() {
    if (
      newCard.tradingCard === '' ||
      newCard.cardName === '' ||
      newCard.cardType === '' ||
      newCard.cardRarity === '' ||
      newCard.price === '' ||
      newCard.imgSrc === ''
    ) {
      console.error('Please fill in all the required fields.');
      return;
    }

    let id = originalCards.length;

    setInventoryFiltered([...originalCards, { ...newCard, id: id }]);
    setNewCard({
      imgSrc: '',
      altText: '',
      cardName: '',
      description: '',
      price: '',
      tags: [],
      tradingCard: '',
      cardType: '',
      cardRarity: '',
      priceRange: 0,
      user: 'fakeUser'
    });
  }

  function handleFavorite(cardId) {
    const updatedFavoriteCards = favoriteCardsFiltered.map((card) => {
      if (card.id === cardId) {
        return { ...card, isFavorite: !card.isFavorite };
      }
      return card;
    });
  
    const updatedInventory = inventoryFiltered.map((card) => {
      if (card.id === cardId) {
        return { ...card, isFavorite: !card.isFavorite };
      }
      return card;
    });
  
    setFavoriteCardsFiltered(updatedFavoriteCards);
    setInventoryFiltered(updatedInventory);
  }  

  const handleSearch = (searchQuery) => {
    setSearchQuery(searchQuery);
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} />
      <InventoryHeader />
      <div className="filter-pad">
        <CardFilter onFilter={handleFilter} appliedFilters={appliedFilters} resetFilters={resetFilters} />
      </div>
      <div className="add-card-container">
        <button onClick={() => handleClickPost(newCard)} className="add-card-button">
          Add New Card
        </button>
        {showText && <p className="add-card-text">Enter card details below:</p>}
        {postPopupIsOpen && (
          <div className="popup">
            <h2>Add New Card</h2>
            <select
              value={newCard.tradingCard}
              onChange={(e) => setNewCard({ ...newCard, tradingCard: e.target.value })}
            >
              <option value="">--Select Trading Card--</option>
              <option value="yugioh">Yu-Gi-Oh</option>
              <option value="pokemon">Pokemon</option>
            </select>
            <input
              type="text"
              placeholder="Card Name"
              value={newCard.cardName}
              onChange={(e) => setNewCard({ ...newCard, cardName: e.target.value })}
            />
            <input
              type="text"
              placeholder="Card Description"
              value={newCard.description}
              onChange={(e) => setNewCard({ ...newCard, description: e.target.value })}
            />
            <select
              value={newCard.cardType}
              onChange={(e) => setNewCard({ ...newCard, cardType: e.target.value })}
            >
              <option value="">--Select Card Type--</option>
              {newCard.tradingCard === 'yugioh' && (
                <>
                  <option value="monster">Monster</option>
                  <option value="spell">Spell</option>
                  <option value="trap">Trap</option>
                </>
              )}
              {newCard.tradingCard === 'pokemon' && (
                <>
                  <option value="monster">Pokemon</option>
                  <option value="energy">Energy</option>
                  <option value="trainer">Trainer</option>
                </>
              )}
            </select>
            <select
              value={newCard.cardRarity}
              onChange={(e) => setNewCard({ ...newCard, cardRarity: e.target.value })}
            >
              <option value="">--Select Card Rarity--</option>
              {newCard.tradingCard === 'yugioh' && (
                <>
                  <option value="non-holo">Non-Holo</option>
                  <option value="holo">Holo</option>
                </>
              )}
              {newCard.tradingCard === 'pokemon' && (
                <>
                  <option value="non-holo">Non-Holo</option>
                  <option value="holo">Holo</option>
                  <option value="shiny">Shiny</option>
                  <option value="v">V</option>
                </>
              )}
            </select>
            <input
              type="text"
              placeholder="Price"
              value={newCard.price}
              onChange={(e) => setNewCard({ ...newCard, price: e.target.value })}
              onBlur={(e) => {
                const priceValue = parseFloat(e.target.value);
                if (!isNaN(priceValue)) {
                  setNewCard({ ...newCard, price: `$${priceValue.toFixed(2)}` });
                }
              }}
            />
            <input
              type="text"
              placeholder="Image Source (URL)"
              value={newCard.imgSrc}
              onChange={(e) => setNewCard({ ...newCard, imgSrc: e.target.value })}
            />
            <button onClick={handlePost}>Add Card</button>
          </div>
        )}
      </div>
      <FavoriteCardSection
        favoriteCardsFiltered={favoriteCardsFiltered}
        handleClickPost={handleClickPost}
        handleFavorite={handleFavorite}
      />
      <FullInventorySection
        inventoryFiltered={inventoryFiltered}
        showNoResults={showNoResults}
        handleFavorite={handleFavorite}
      />
    </div>
  );
}

export default Inventory;