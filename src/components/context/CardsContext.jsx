// import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';

// const CardsContext = createContext();

// const CardsProvider = ({ children }) => {
//   const [cards, setCards] = useState([]);
//   const [cart, setCart] = useState([]);
//   useEffect(() => {
//     axios.get('http://localhost:3001/cardsData').then((response) => {
//       setCards(response.data);
//     });
//   }, []);

  
//   // const addToCart = (card) => {
//   //   console.log(card)
//   //   setCart([{ id: 1, title: 'Test Card', content: 'Test Content' }]);
//   //   //setCart([...cart, card]);
//   // };
//   const addToCart = (card) => {
//     axios.post('http://localhost:3001/cart', card)
//       .then((response) => {
//         // Handle response if needed
//         console.log('Card added to cart:', response.data);
//       })
//       .catch((error) => {
//         // Handle error
//         console.error('Error adding card to cart:', error);
//       });
//   };
  

//   return (
//     <CardsContext.Provider value={{ cards, cart, addToCart  }}>
//       {children}
//     </CardsContext.Provider>
//   );
// };

// export { CardsContext, CardsProvider };

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const CardsContext = createContext();

const CardsProvider = ({ children }) => {
  const [cards, setCards] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/cardsData').then((response) => {
      setCards(response.data);
    });

    axios.get('http://localhost:3001/cart').then((response) => {
      setCart(response.data);
    });
  }, []);

  const addToCart = (card) => {
    const existingCartItemIndex = cart.findIndex((item) => item.id === card.id);

    if (existingCartItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingCartItemIndex].quantity += card.quantity;
      axios.patch(`http://localhost:3001/cart/${card.id}`, { quantity: updatedCart[existingCartItemIndex].quantity });

      setCart(updatedCart);
    } else {
      const updatedCart = [...cart, card];
      axios.post('http://localhost:3001/cart', card);
      setCart(updatedCart);
    }
  };

  const removeFromCart = (cardId) => {
    const updatedCart = cart.filter((item) => item.id !== cardId);
    setCart(updatedCart);
    axios.delete(`http://localhost:3001/cart/${cardId}`);
  };

  const updateQuantityInCart = (cardId, newQuantity) => {
    const updatedCart = cart.map((item) => (item.id === cardId ? { ...item, quantity: newQuantity } : item));
    setCart(updatedCart);
    axios.patch(`http://localhost:3001/cart/${cardId}`, { quantity: newQuantity });
  };

  const handleIncreaseQuantity = (cardId) => {
    const currentQuantity = getCartItemQuantity(cardId);
    updateQuantityInCart(cardId, currentQuantity + 1);
  };

  const handleDecreaseQuantity = (cardId) => {
    const currentQuantity = getCartItemQuantity(cardId);

    if (currentQuantity > 1) {
      updateQuantityInCart(cardId, currentQuantity - 1);
    } else {
      removeFromCart(cardId);
    }
  };
  const isInCart = (cardId) => cart.some((item) => item.id === cardId);

  const getCartItemQuantity = (cardId) => {
    const cartItem = cart.find((item) => item.id === cardId);
    return cartItem ? cartItem.quantity : 0;
  };
  const getCardById = (id) => {
    return cards.find((card) => card.id === parseInt(id, 10));
  };
  return (
    <CardsContext.Provider value={{ cards, cart,getCardById, updateQuantityInCart,addToCart,handleIncreaseQuantity, removeFromCart, isInCart, handleDecreaseQuantity,getCartItemQuantity }}>
      {children}
    </CardsContext.Provider>
  );
};

export { CardsContext, CardsProvider };
