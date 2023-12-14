import React, { useContext } from 'react';
import { Table, Button } from 'react-bootstrap';
import { CardsContext } from '../context/CardsContext';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantityInCart, getCartItemQuantity } = useContext(CardsContext);

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + item.price * getCartItemQuantity(item.id), 0);
  };

  return (
    <div>
      <h2 className="mb-4">Shopping Cart</h2>
      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Subtotal</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>
                <Button variant="secondary" onClick={() => updateQuantityInCart(item.id, getCartItemQuantity(item.id) - 1)}>
                  -
                </Button>
                <span className="mx-2">{getCartItemQuantity(item.id)}</span>
                <Button variant="primary" onClick={() => updateQuantityInCart(item.id, getCartItemQuantity(item.id) + 1)}>
                  +
                </Button>
              </td>
              <td>${item.price}</td>
              <td>${item.price * getCartItemQuantity(item.id)}</td>
              <td>
                <Button variant="danger" onClick={() => removeFromCart(item.id)}>
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <p className="text-cyan-500 float-right">Total Amount: ${calculateTotalAmount()}</p>
    </div>
  );
};

export default CartPage;