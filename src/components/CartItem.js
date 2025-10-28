import React from 'react';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(item.id);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  return (
    <div style={styles.cartItem}>
      <img 
        src={item.image} 
        alt={item.title}
        style={styles.image}
      />
      <div style={styles.details}>
        <h4 style={styles.title}>{item.title}</h4>
        <p style={styles.price}>${item.price}</p>
      </div>
      <div style={styles.quantityControls}>
        <button 
          onClick={() => handleQuantityChange(item.quantity - 1)}
          style={styles.quantityButton}
        >
          -
        </button>
        <span style={styles.quantity}>{item.quantity}</span>
        <button 
          onClick={() => handleQuantityChange(item.quantity + 1)}
          style={styles.quantityButton}
        >
          +
        </button>
      </div>
      <div style={styles.total}>
        ${(item.price * item.quantity).toFixed(2)}
      </div>
      <button 
        onClick={handleRemove}
        style={styles.removeButton}
      >
        Remove
      </button>
    </div>
  );
};

const styles = {
  cartItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px',
    borderBottom: '1px solid #374151',
    gap: '16px'
  },
  image: {
    width: '60px',
    height: '60px',
    objectFit: 'contain',
    borderRadius: '6px',
    backgroundColor: '#111827',
    padding: '5px'
  },
  details: {
    flex: 1,
    textAlign: 'left'
  },
  title: {
    margin: '0 0 8px 0',
    fontSize: '14px',
    color: '#f9fafb'
  },
  price: {
    margin: 0,
    color: '#60a5fa',
    fontSize: '14px'
  },
  quantityControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  quantityButton: {
    width: '30px',
    height: '30px',
    border: '1px solid #4b5563',
    backgroundColor: '#374151',
    color: '#f9fafb',
    cursor: 'pointer',
    borderRadius: '4px'
  },
  quantity: {
    padding: '0 12px',
    fontWeight: 'bold',
    color: '#f9fafb'
  },
  total: {
    fontWeight: 'bold',
    minWidth: '80px',
    textAlign: 'center',
    color: '#60a5fa'
  },
  removeButton: {
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px'
  }
};

export default CartItem;