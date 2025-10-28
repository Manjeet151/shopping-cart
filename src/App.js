import React, { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import './App.css';

const CartBadge = () => {
  const { totalItems } = useCart();
  
  if (totalItems === 0) return null;

  return (
    <span style={styles.cartBadge}>
      {totalItems}
    </span>
  );
};

function App() {
  const [currentPage, setCurrentPage] = useState('products');

  const renderPage = () => {
    switch (currentPage) {
      case 'cart':
        return <CartPage />;
      case 'products':
      default:
        return <ProductsPage />;
    }
  };

  return (
    <CartProvider>
      <div className="App">
        <header style={styles.header}>
          <div style={styles.headerContent}>
            <h1 style={styles.logo}>🛍️ Shopping Cart</h1>
            <nav style={styles.nav}>
              <button 
                onClick={() => setCurrentPage('products')}
                style={{
                  ...styles.navButton,
                  ...(currentPage === 'products' && styles.activeNavButton)
                }}
              >
                Products
              </button>
              <button 
                onClick={() => setCurrentPage('cart')}
                style={{
                  ...styles.navButton,
                  ...(currentPage === 'cart' && styles.activeNavButton),
                  position: 'relative'
                }}
              >
                Cart
                <CartBadge />
              </button>
            </nav>
          </div>
        </header>
        
        <main style={styles.main}>
          {renderPage()}
        </main>
      </div>
    </CartProvider>
  );
}

const styles = {
  header: {
    backgroundColor: '#1f2937',
    color: 'white',
    padding: '20px 0',
    boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
  },
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px'
  },
  logo: {
    margin: 0,
    fontSize: '28px',
    fontWeight: 'bold'
  },
  nav: {
    display: 'flex',
    gap: '15px'
  },
  navButton: {
    backgroundColor: 'transparent',
    color: '#d1d5db',
    border: '2px solid #4b5563',
    padding: '10px 20px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500'
  },
  activeNavButton: {
    backgroundColor: '#3b82f6',
    color: 'white',
    borderColor: '#3b82f6'
  },
  cartBadge: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    backgroundColor: '#ef4444',
    color: 'white',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold'
  },
  main: {
    minHeight: 'calc(100vh - 80px)',
    padding: '30px 20px',
    backgroundColor: '#111827'
  }
};

export default App;