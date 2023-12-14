import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './card';
import { CardsProvider } from '../context/CardsContext';

const ProductPage = () => {
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch data from JSON server
    axios.get('http://localhost:3001/cardsData')
      .then(response => {
        setCards(response.data);
        setFilteredCards(response.data);
        
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    // Filter cards based on search term
    const filtered = cards.filter(card =>
      card.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCards(filtered);
  }, [searchTerm, cards]);
  console.log(filteredCards)
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="row mt-3">
        
         {filteredCards.map((card) => (
        <div key={card.id} className="col-md-3 mb-10">
          <CardsProvider>
          <Card title={card.title} content={card.description} image={card.image} id={card.id} price={card.price}/>
          </CardsProvider>
        </div>
      ))}
      </div>
    </div>
  );
};

export default ProductPage;