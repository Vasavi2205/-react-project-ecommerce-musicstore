
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CardsContext } from '../context/CardsContext';
import Card from '../products/card';
import { Col, Image, Row } from 'react-bootstrap';

function CardInfo() {
  const { id } = useParams();
  const { getCardById } = useContext(CardsContext);
  const card = getCardById(id);

  if (!card) {
    return <div>Card not found</div>;
  }

  return (
    <Row >
      <Col md={5} className='mt-96'>
        <Image src={card.image} alt={card.title} fluid  width={"75%"}/>
      </Col>
      <Col md={7} >
        <h2>{card.title}</h2>
        <p>{card.content}</p>
        <p>Quantity: {card.quantity}</p>
        <div>
          <p>Ratings:5</p>
        </div>
      </Col>
    </Row>
  );
}

export default CardInfo;