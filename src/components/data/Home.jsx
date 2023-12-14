import React,{useContext} from 'react';
import { CardsProvider } from '../context/CardsContext';
import Card from '../products/card';
import {CardsContext} from "../context/CardsContext"
import 'bootstrap/dist/css/bootstrap.min.css';
import { ProductInfoCard } from '../products/ProductInfoCard';


const Home = () => {
  return (
    <CardsProvider >
      <div className="container mt-10">
        
        <CardsList className="mt-10"/>
      </div>
    </CardsProvider>
  );
};

const CardsList = () => {
  const { cards } = useContext(CardsContext);
const changeCardInfo=()=>{
console.log("call")
}
  return (
    <div className="row">
      {cards.map((card) => (
        <div key={card.id} className="col-md-3 mb-10" >
          <Card title={card.title} content={card.description} image={card.image} id={card.id} price={card.price} />
        </div>
      ))}
    </div>
  );
};

export default Home;