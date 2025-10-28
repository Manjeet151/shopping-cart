import React from 'react';
import { useCart } from '../context/CartContext';
import CartItem from './CartItem';

const Cart = () => {
  const { cartItems, totalAmount, totalItems, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div style={styles.emptyCart}>
        <h2>Your Cart is Empty</h2>
        <p>Add some products to get started!</p>
      </div>
    );
  }

  return (
    <div style={styles.cart}>
      <div style={styles.header}>
        <h2>Shopping Cart ({totalItems} items)</h2>
        <button 
          onClick={clearCart}
          style={styles.clearButton}
        >
          Clear Cart
        </button>
      </div>
      
      <div style={styles.items}>
        {cartItems.map(item => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      
      <div style={styles.footer}>
        <div style={styles.totalSection}>
          <h3 style={styles.totalText}>
            Total: ${totalAmount}
          </h3>
          <button style={styles.checkoutButton}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  cart: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    color: '#f9fafb'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  clearButton: {
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  items: {
    border: '1px solid #374151',
    borderRadius: '8px',
    marginBottom: '20px',
    backgroundColor: '#1f2937'
  },
  footer: {
    borderTop: '2px solid #374151',
    paddingTop: '20px'
  },
  totalSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  totalText: {
    color: '#f9fafb',
    fontSize: '24px'
  },
  checkoutButton: {
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px'
  },
  emptyCart: {
    textAlign: 'center',
    padding: '40px',
    color: '#9ca3af'
  }
};

export default Cart;