import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // ✅ Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach(item => {
      const cost = parseFloat(item.cost.substring(1));
      total += cost * item.quantity;
    });
    return total.toFixed(2);
  };

  // ✅ Handle "Continue Shopping"
  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(e); // Call parent function to switch view
  };

  // ✅ Handle Checkout (Placeholder)
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  // ✅ Increase quantity
  const handleIncrement = (item) => {
    const newQuan = item.quantity + 1;
    dispatch(updateQuantity({ name: item.name, quantity: newQuan }));
  };

  // ✅ Decrease quantity (but not below 1)
  const handleDecrement = (item) => {
    const newQuan = item.quantity - 1;
    if (newQuan >= 1) {
      dispatch(updateQuantity({ name: item.name, quantity: newQuan }));
    }
  };

  // ✅ Remove item
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // ✅ Calculate cost for single item
  const calculateTotalCost = (item) => {
    const unitPrice = parseFloat(item.cost.substring(1));
    return (unitPrice * item.quantity).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                  disabled={item.quantity === 1}
                >−</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div className="continue_shopping_btn" style={{ marginTop: '20px' }}>
        <button className="get-started-button" onClick={handleContinueShopping}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;