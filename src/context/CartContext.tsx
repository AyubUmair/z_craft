'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CartItem, Product } from '@/types';
import { generateCartItemId } from '@/lib/utils';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, customizations: Record<string, string>, quantity?: number) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  updateCustomizations: (cartItemId: string, customizations: Record<string, string>) => void;
  clearCart: () => void;
  totalItems: number;
  totalEstimate: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('zcraft-cart');
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch {
      // ignore parsing errors
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('zcraft-cart', JSON.stringify(items));
    }
  }, [items, isHydrated]);

  const addItem = useCallback((product: Product, customizations: Record<string, string>, quantity = 1) => {
    const newItem: CartItem = {
      product,
      quantity,
      customizations,
      id: generateCartItemId(),
    };
    setItems(prev => [...prev, newItem]);
  }, []);

  const removeItem = useCallback((cartItemId: string) => {
    setItems(prev => prev.filter(item => item.id !== cartItemId));
  }, []);

  const updateQuantity = useCallback((cartItemId: string, quantity: number) => {
    if (quantity < 1) return;
    setItems(prev => prev.map(item =>
      item.id === cartItemId ? { ...item, quantity } : item
    ));
  }, []);

  const updateCustomizations = useCallback((cartItemId: string, customizations: Record<string, string>) => {
    setItems(prev => prev.map(item =>
      item.id === cartItemId ? { ...item, customizations } : item
    ));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalEstimate = items.reduce((sum, item) => sum + item.product.basePrice * item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      updateCustomizations,
      clearCart,
      totalItems,
      totalEstimate,
      isCartOpen,
      setIsCartOpen,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
