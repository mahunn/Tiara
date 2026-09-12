'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '@/types';

interface StoreContextType {
  cart: CartItem[];
  addToCart: (product: Product, selectedSize: string, selectedColor: string, quantity?: number) => void;
  removeFromCart: (productId: string, selectedSize: string, selectedColor: string) => void;
  updateQuantity: (productId: string, selectedSize: string, selectedColor: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  quickOrderProduct: Product | null;
  quickOrderOptions: { size: string; color: string };
  openQuickOrder: (product: Product, size?: string, color?: string) => void;
  closeQuickOrder: () => void;
  isCategoryDrawerOpen: boolean;
  setIsCategoryDrawerOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCategoryDrawerOpen, setIsCategoryDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const [quickOrderProduct, setQuickOrderProduct] = useState<Product | null>(null);
  const [quickOrderOptions, setQuickOrderOptions] = useState<{ size: string; color: string }>({
    size: '',
    color: '',
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('tiara_cart');
      if (saved) {
        setCart(JSON.parse(saved));
      }
    } catch (err) {
      console.error('Error loading cart from storage', err);
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('tiara_cart', JSON.stringify(cart));
    } catch (err) {
      console.error('Error saving cart to storage', err);
    }
  }, [cart]);

  const addToCart = (product: Product, selectedSize: string, selectedColor: string, quantity = 1) => {
    setCart((prev) => {
      const size = selectedSize || product.sizes[0] || 'Standard';
      const color = selectedColor || product.colors[0]?.name || 'Standard';

      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      return [...prev, { product, selectedSize: size, selectedColor: color, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, selectedSize: string, selectedColor: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedSize === selectedSize &&
            item.selectedColor === selectedColor
          )
      )
    );
  };

  const updateQuantity = (
    productId: string,
    selectedSize: string,
    selectedColor: string,
    quantity: number
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedSize, selectedColor);
      return;
    }

    setCart((prev) =>
      prev.map((item) => {
        if (
          item.product.id === productId &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor
        ) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const openQuickOrder = (product: Product, size?: string, color?: string) => {
    setQuickOrderProduct(product);
    setQuickOrderOptions({
      size: size || product.sizes[0] || 'Standard',
      color: color || product.colors[0]?.name || 'Standard',
    });
  };

  const closeQuickOrder = () => {
    setQuickOrderProduct(null);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        isCartOpen,
        setIsCartOpen,
        quickOrderProduct,
        quickOrderOptions,
        openQuickOrder,
        closeQuickOrder,
        isCategoryDrawerOpen,
        setIsCategoryDrawerOpen,
        isSearchOpen,
        setIsSearchOpen,
        quickViewProduct,
        setQuickViewProduct,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
