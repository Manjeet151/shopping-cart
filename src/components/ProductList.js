import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products }) => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Our Products</h2>
      <div style={styles.grid}>
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
          />
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  heading: {
    textAlign: 'center',
    color: '#f9fafb',
    marginBottom: '30px',
    fontSize: '32px'
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px'
  }
};

export default ProductList;