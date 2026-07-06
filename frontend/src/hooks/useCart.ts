import { useState, useEffect } from 'react';
import { Product } from '../services/productService';

export interface CartItem {
  product: Product;
  quantity: number;
}

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("e_commerce_cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart items", e);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  const saveCart = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem("e_commerce_cart", JSON.stringify(items));
  };

  const addToCart = (product: Product, quantity = 1) => {
    const existingIndex = cartItems.findIndex(item => item.product.id === product.id);
    if (existingIndex > -1) {
      const updated = [...cartItems];
      const newQty = updated[existingIndex].quantity + quantity;
      
      // Limit quantity to stock
      if (newQty > product.stockQuantity) {
        updated[existingIndex].quantity = product.stockQuantity;
      } else {
        updated[existingIndex].quantity = newQty;
      }
      saveCart(updated);
    } else {
      const qty = quantity > product.stockQuantity ? product.stockQuantity : quantity;
      if (qty > 0) {
        saveCart([...cartItems, { product, quantity: qty }]);
      }
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    const updated = cartItems.map(item => {
      if (item.product.id === productId) {
        // Clamp between 1 and stock quantity
        const clampedQty = Math.max(1, Math.min(quantity, item.product.stockQuantity));
        return { ...item, quantity: clampedQty };
      }
      return item;
    });
    saveCart(updated);
  };

  const removeFromCart = (productId: string) => {
    const updated = cartItems.filter(item => item.product.id !== productId);
    saveCart(updated);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    cartItemCount
  };
};
