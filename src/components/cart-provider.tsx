"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type Toast = {
  id: number;
  message: string;
  leaving?: boolean;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const timer = window.requestAnimationFrame(() => {
      const saved = window.localStorage.getItem("swagat-cart");
      if (saved) {
        try {
          setItems(JSON.parse(saved));
        } catch {
          window.localStorage.removeItem("swagat-cart");
        }
      }
      setLoaded(true);
    });
    return () => window.cancelAnimationFrame(timer);
  }, []);

  useEffect(() => {
    if (loaded) window.localStorage.setItem("swagat-cart", JSON.stringify(items));
  }, [items, loaded]);

  const addItem = (item: Omit<CartItem, "quantity">) => {
    setItems((current) => {
      const existing = current.find((cartItem) => cartItem.id === item.id);
      if (existing) {
        return current.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...current, { ...item, quantity: 1 }];
    });
    showToast(`${item.name} added to cart`);
  };

  const showToast = (message: string) => {
    const id = Date.now() + Math.random();
    setToasts((current) => [...current, { id, message }]);
    window.setTimeout(() => {
      setToasts((current) =>
        current.map((toast) =>
          toast.id === id ? { ...toast, leaving: true } : toast
        )
      );
    }, 2600);
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 2800);
  };

  const removeItem = (id: string) => {
    const removed = items.find((item) => item.id === id);
    setItems((current) => current.filter((item) => item.id !== id));
    if (removed) showToast(`${removed.name} removed from cart`);
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(id);
      return;
    }
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {toasts.length > 0 && (
        <div
          className="pointer-events-none fixed right-4 top-[112px] z-[200] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2 sm:right-6"
          aria-live="polite"
          aria-label="Notifications"
        >
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`border border-[#ff9900]/50 bg-[#171712] px-5 py-4 text-sm shadow-2xl ${
                toast.leaving
                  ? "animate-[toast-out_200ms_ease-in_forwards]"
                  : "animate-[toast-in_260ms_cubic-bezier(0.16,1,0.3,1)]"
              }`}
            >
              <span className="mr-3 inline-block h-2 w-2 rounded-full bg-[#ff9900]" />
              {toast.message}
            </div>
          ))}
        </div>
      )}
      {children}
    </CartContext.Provider>
  );

  function clearCart() {
    setItems([]);
    if (items.length > 0) showToast("Cart cleared");
  }
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
