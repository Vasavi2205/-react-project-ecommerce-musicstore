import React, { useContext } from 'react';
import { Card as BootstrapCard, Button } from 'react-bootstrap';
import {CardsContext} from "../context/CardsContext"
import { Link } from 'react-router-dom';

const Card = ({ id, title, content,image, price }) => {
  const { addToCart, isInCart, handleIncreaseQuantity, handleDecreaseQuantity, getCartItemQuantity } = useContext(CardsContext);

  const handleAddToCart = () => {
    const quantity = getCartItemQuantity(id) || 1;
    addToCart({ id, title, content,image, quantity,price });
  };

  return (
    <BootstrapCard style={{ width: '18rem' , }}>
      <BootstrapCard.Body>
        <BootstrapCard.Title>{title}</BootstrapCard.Title>
        <BootstrapCard.Text>{content}</BootstrapCard.Text>
        <img   style={{ height: '13rem',width:'15rem'}} src={image} alt=""  />
        <p>{price}</p>
        {isInCart(id) ? (
          <div>
            <Button variant="secondary" onClick={() => handleDecreaseQuantity(id)}>
              -
            </Button>
            <span className="mx-2">{getCartItemQuantity(id)}</span>
            <Button variant="primary" onClick={() => handleIncreaseQuantity(id)}>
              +
            </Button>
          </div>
        ) : (
          <Button variant="success" onClick={handleAddToCart}>
            Add to Cart
          </Button>
          
        )}
        <Link className='ml-40' to={`/items/${id}`}>MoreInfo</Link>
      </BootstrapCard.Body>
    </BootstrapCard>
  );
};

export default Card;