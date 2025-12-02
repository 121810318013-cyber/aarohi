import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, PromoCode } from '@/types/product';
import { toast } from 'sonner';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  appliedPromo: PromoCode | null;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  finalTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const promoCodes: PromoCode[] = [
  { code: 'WELCOME10', discount: 10, minPurchase: 2000, description: '10% off on orders above ₹2000' },
  { code: 'FESTIVE15', discount: 15, minPurchase: 5000, description: '15% off on orders above ₹5000' },
  { code: 'FIRST20', discount: 20, minPurchase: 3000, description: '20% off for first-time customers above ₹3000' },
  { code: 'SUMMER25', discount: 25, minPurchase: 10000, description: '25% off on orders above ₹10000' },
];

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(() => {
    const saved = localStorage.getItem('appliedPromo');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (appliedPromo) {
      localStorage.setItem('appliedPromo', JSON.stringify(appliedPromo));
    } else {
      localStorage.removeItem('appliedPromo');
    }
  }, [appliedPromo]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        toast.success('Quantity updated in cart');
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      toast.success('Added to cart');
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
    toast.success('Removed from cart');
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
    toast.success('Cart cleared');
  };

  const cartTotal = cart.reduce((total, item) => {
    const price = item.discountPrice || item.price;
    return total + price * item.quantity;
  }, 0);

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  const applyPromoCode = (code: string): boolean => {
    const promo = promoCodes.find(p => p.code === code.toUpperCase());
    if (!promo) {
      toast.error('Invalid promo code');
      return false;
    }
    if (cartTotal < promo.minPurchase) {
      toast.error(`Minimum purchase of ₹${promo.minPurchase} required`);
      return false;
    }
    setAppliedPromo(promo);
    toast.success(`Promo code applied! ${promo.discount}% off`);
    return true;
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    toast.success('Promo code removed');
  };

  const finalTotal = appliedPromo
    ? cartTotal - (cartTotal * appliedPromo.discount) / 100
    : cartTotal;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        finalTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
