import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import { fetchProducts } from '../data/products';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error('Error loading products:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <div style={styles.loading}>
        <h2>Loading Products...</h2>
        <p>Please wait while we fetch our collection.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.error}>
        <h2>Error</h2>
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          style={styles.retryButton}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <ProductList products={products} />
    </div>
  );
};

const styles = {
  loading: {
    textAlign: 'center',
    padding: '60px 20px',
    color: '#888'
  },
  error: {
    textAlign: 'center',
    padding: '60px 20px',
    color: '#ff6b6b'
  },
  retryButton: {
    backgroundColor: '#339af0',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '20px',
    fontWeight: '500'
  }
};

export default ProductsPage;