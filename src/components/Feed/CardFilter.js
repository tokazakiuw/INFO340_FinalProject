import React, { useState } from 'react';

function CardFilter({ onFilter }) {
  const [filters, setFilters] = useState({
    tradingCard: '',
    cardType: '',
    cardRarity: '',
    priceRange: '2500'
  });

  function handleChange(event) {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value
    });
  };

  function handleSubmit(event) {
    event.preventDefault();
    onFilter(filters);
  };

  function formatPrice(price) {
    return `$${price}.00`;
  };

  function CardTypes() {
    if (filters.tradingCard === 'yugioh') {
      return (
        <>
          <option value="monster">Monster</option>
          <option value="spell">Spell</option>
          <option value="trap">Trap</option>
        </>
      );
    }
    if (filters.tradingCard === 'pokemon') {
      return (
        <>
          <option value="monster">Pokemon</option>
          <option value="energy">Energy</option>
          <option value="trainer">Trainer</option>
        </>
      );
    }
    return null;
  };

  function CardRarities() {
    if (filters.tradingCard === 'yugioh') {
      return (
        <>
          <option value="non-holo">Non-Holo</option>
          <option value="holo">Holo</option>
        </>
      );
    }
    if (filters.tradingCard === 'pokemon') {
      return (
        <>
          <option value="non-holo">Non-Holo</option>
          <option value="holo">Holo</option>
          <option value="shiny">Shiny</option>
          <option value="v">V</option>
        </>
      );
    }
    return null;
  };

  return (
    <div className="container-filter">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="trading-card">Trading Card:</label>
          <select
            id="trading-card"
            name="tradingCard"
            onChange={handleChange}
            value={filters.tradingCard}
          >
            <option value="">--Select Card--</option>
            <option value="yugioh">Yu-Gi-Oh</option>
            <option value="pokemon">Pokemon</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="card-type">Card Type:</label>
          <select
            id="card-type"
            name="cardType"
            onChange={handleChange}
            value={filters.cardType}
          >
            <option value="">--Select Type--</option>
            <CardTypes />
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="card-rarity">Card Rarity:</label>
          <select
            id="card-rarity"
            name="cardRarity"
            onChange={handleChange}
            value={filters.cardRarity}
          >
            <option value="">--Select Rarity--</option>
            <CardRarities />
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="price-range">Price Range:</label>
          <div className="price-range-input">
            <input
              type="range"
              id="price-range"
              name="priceRange"
              min="0"
              max="5000"
              step="1"
              onChange={handleChange}
              value={filters.priceRange}
            />
            <span>{formatPrice(filters.priceRange)}</span>
          </div>
        </div>
        <button type="submit">Apply Filter</button>
      </form>
    </div>
  );
}

export default CardFilter;