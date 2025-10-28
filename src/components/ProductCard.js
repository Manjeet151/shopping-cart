import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    
    // Reset after 2 seconds
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/300x200/374151/9ca3af?text=Product+Image';
  };

  return (
    <div style={styles.card}>
      <div style={styles.imageContainer}>
        <img 
          src={product.image} 
          alt={product.title}
          style={styles.image}
          onError={handleImageError}
        />
      </div>
      <div style={styles.content}>
        <h3 style={styles.title}>{product.title}</h3>
        <p style={styles.category}>{product.category}</p>
        <p style={styles.price}>${product.price}</p>
        <div style={styles.rating}>
          ⭐ {product.rating?.rate} ({product.rating?.count})
        </div>
        <button 
          onClick={handleAddToCart}
          style={{
            ...styles.button,
            ...(isAdded && styles.addedButton)
          }}
          disabled={isAdded}
        >
          {isAdded ? '✓ Added to Cart!' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#1f2937',
    border: '1px solid #374151',
    borderRadius: '8px',
    padding: '16px',
    margin: '16px',
    width: '280px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.2s ease'
  },
  imageContainer: {
    height: '200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '12px',
    backgroundColor: '#111827',
    borderRadius: '6px',
    padding: '10px'
  },
  image: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain'
  },
  content: {
    textAlign: 'left'
  },
  title: {
    fontSize: '16px',
    margin: '8px 0',
    height: '40px',
    overflow: 'hidden',
    lineHeight: '1.4',
    color: '#f9fafb'
  },
  category: {
    fontSize: '12px',
    color: '#9ca3af',
    textTransform: 'capitalize',
    margin: '4px 0'
  },
  price: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#60a5fa',
    margin: '8px 0'
  },
  rating: {
    fontSize: '14px',
    color: '#fbbf24',
    margin: '8px 0'
  },
  button: {
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    padding: '12px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    width: '100%',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'all 0.3s ease'
  },
  addedButton: {
    backgroundColor: '#10b981',
    cursor: 'not-allowed'
  }
};

export default ProductCard;