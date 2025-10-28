import React, { createContext, useContext, useReducer } from 'react';

// Create Context
const CartContext = createContext();

// Initial state
const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalItems: 0
};

// Reducer function to handle cart operations
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItemIndex = state.cartItems.findIndex(
        item => item.id === action.payload.id
      );

      let updatedItems;
      
      if (existingItemIndex > -1) {
        // Item exists, update quantity
        updatedItems = state.cartItems.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // New item, add to cart
        updatedItems = [...state.cartItems, { ...action.payload, quantity: 1 }];
      }

      return calculateTotals(updatedItems);

    case 'REMOVE_FROM_CART':
      const filteredItems = state.cartItems.filter(
        item => item.id !== action.payload
      );
      return calculateTotals(filteredItems);

    case 'UPDATE_QUANTITY':
      const itemsWithUpdatedQuantity = state.cartItems.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      ).filter(item => item.quantity > 0); // Remove if quantity becomes 0

      return calculateTotals(itemsWithUpdatedQuantity);

    case 'CLEAR_CART':
      return initialState;

    default:
      return state;
  }
};

// Helper function to calculate totals
const calculateTotals = (cartItems) => {
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return {
    cartItems,
    totalAmount: parseFloat(totalAmount.toFixed(2)),
    totalItems
  };
};

// Context Provider Component
export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialState);

  // Action creators
  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({ 
      type: 'UPDATE_QUANTITY', 
      payload: { id: productId, quantity } 
    });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const value = {
    cartItems: cartState.cartItems,
    totalAmount: cartState.totalAmount,
    totalItems: cartState.totalItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};