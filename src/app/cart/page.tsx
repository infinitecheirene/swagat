"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useState } from "react";
import { useCart } from "../../components/cart-provider";

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart();
  const [ordered, setOrdered] = useState(false);

  const formattedSubtotal = `₱${subtotal.toLocaleString("en-PH")}`;

  if (ordered) {
    return (
      <main className="min-h-[70vh] pt-[100px]">
        <section className="mx-auto flex min-h-[70vh] max-w-[1500px] items-center justify-center px-5 py-20 text-center md:px-10">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#ff9900]">Order received</p>
            <h1 className="font-display mt-5 text-5xl md:text-7xl">Thank you.</h1>
            <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-white/55">
              Your order request has been received. The restaurant will confirm it shortly.
            </p>
            <Link href="/menu" className="mt-8 inline-flex h-12 items-center border border-white/15 px-6 text-[10px] uppercase tracking-[0.28em] hover:border-[#ff9900] hover:text-[#ff9900]">
              Return to menu
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="pt-[100px]">
      <section className="mx-auto max-w-[1500px] px-5 py-20 md:px-10 md:py-28">
        <div className="mb-12 flex items-end justify-between border-b border-white/10 pb-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#c7ad78]">Your selection</p>
            <h1 className="font-display mt-4 text-[clamp(3rem,7vw,6rem)] font-semibold uppercase leading-none">Cart</h1>
          </div>
          {items.length > 0 && (
            <button
              type="button"
              onClick={clearCart}
              className="hidden items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-white/50 hover:text-[#ff9900] sm:inline-flex"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Clear cart
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="flex min-h-[420px] flex-col items-center justify-center border border-white/10 text-center">
            <ShoppingBag className="h-8 w-8 text-[#ff9900]" />
            <h2 className="font-display mt-5 text-3xl">Your cart is empty</h2>
            <p className="mt-3 text-sm text-white/50">Choose something from the kitchen.</p>
            <Link href="/menu" className="mt-8 inline-flex h-12 items-center bg-[#ff9900] px-6 text-[10px] uppercase tracking-[0.28em] text-[#0d0d0b] hover:bg-white">
              Explore the menu
            </Link>
          </div>
        ) : (
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-8">
              <div className="divide-y divide-white/10 border-y border-white/10">
                {items.map((item) => (
                  <div key={item.id} className="grid gap-5 py-6 sm:grid-cols-[1fr_auto] sm:items-center">
                    <div>
                      <h2 className="font-display text-2xl md:text-3xl">{item.name}</h2>
                      <p className="mt-2 font-mono text-[11px] text-[#c7ad78]">
                        ₱{item.price.toLocaleString("en-PH")}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 items-center border border-white/15">
                        <button
                          type="button"
                          aria-label={`Decrease ${item.name} quantity`}
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="flex h-full w-11 items-center justify-center hover:text-[#ff9900]"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-8 text-center font-mono text-sm">{item.quantity}</span>
                        <button
                          type="button"
                          aria-label={`Increase ${item.name} quantity`}
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="flex h-full w-11 items-center justify-center hover:text-[#ff9900]"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button
                        type="button"
                        aria-label={`Remove ${item.name}`}
                        onClick={() => removeItem(item.id)}
                        className="flex h-11 w-11 items-center justify-center border border-white/15 text-white/50 hover:border-[#ff9900] hover:text-[#ff9900]"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={clearCart}
                className="mt-5 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-white/50 hover:text-[#ff9900] sm:hidden"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Clear cart
              </button>
            </div>

            <aside className="h-fit border border-white/10 p-6 md:col-span-4 md:p-8">
              <p className="text-[10px] uppercase tracking-[0.28em] text-[#c7ad78]">Order summary</p>
              <div className="mt-8 flex items-baseline justify-between border-b border-white/10 pb-5">
                <span className="text-sm text-white/60">Subtotal</span>
                <span className="font-mono text-lg text-[#c7ad78]">{formattedSubtotal}</span>
              </div>
              <p className="mt-5 text-xs leading-5 text-white/45">
                Taxes and delivery are confirmed with the restaurant before payment.
              </p>
              <button
                type="button"
                onClick={() => {
                  clearCart();
                  setOrdered(true);
                }}
                className="mt-8 h-12 w-full bg-[#ff9900] text-[10px] uppercase tracking-[0.28em] text-[#0d0d0b] hover:bg-white"
              >
                Place order
              </button>
              <Link href="/menu" className="mt-4 block text-center text-[10px] uppercase tracking-[0.24em] text-white/60 hover:text-[#ff9900]">
                Continue ordering
              </Link>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}
