"use client";

import Link from "next/link";
import { Check, ShoppingBag, Trash2 } from "lucide-react";
import { useState } from "react";
import { useCart, type CartItem } from "../../components/cart-provider";
import CartMessage from "../../components/cart/CartMessage";
import CartRow, { peso } from "../../components/cart/CartRow";
import CartStub, { StubRow } from "../../components/cart/CartStub";

const slip =
  "grid overflow-hidden border border-white/15 lg:grid-cols-[1fr_340px]";
const iconBadge =
  "flex h-11 w-11 items-center justify-center rounded-full bg-[#ff9900] text-[#0d0d0b]";
const outlineLink =
  "flex h-12 w-full items-center justify-center border border-white/25 text-sm transition-colors hover:border-[#ff9900] hover:text-[#ff9900] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff9900]";

export default function CartPage() {
  const { items, itemCount, subtotal, updateQuantity, removeItem, clearCart } =
    useCart();
  // Snapshot of the order, so the confirmation can still show what was ordered after the cart is cleared.
  const [placed, setPlaced] = useState<{
    items: CartItem[];
    total: number;
  } | null>(null);

  function placeOrder() {
    // TODO: send `items` to your API / email service here.
    setPlaced({ items, total: subtotal });
    clearCart();
  }

  const [lead, accent] = placed ? ["Order", "received."] : ["Your", "cart."];

  return (
    <main className="pt-[100px]">
      <section className="mx-auto max-w-[1500px] px-5 py-14 md:px-10 md:py-20">
        {/* ---------- header ---------- */}
        <header className="flex flex-wrap items-end justify-between gap-6">
          <h1 className="font-display text-[clamp(2.75rem,5.4vw,5rem)] font-semibold leading-[0.98]">
            {lead} <span className="italic text-[#ff9900]">{accent}</span>
          </h1>
          {!placed && items.length > 0 && (
            <div className="flex items-center gap-6 pb-2">
              <p className="text-sm text-white/55">
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </p>
              <button
                type="button"
                onClick={clearCart}
                className="inline-flex items-center gap-2 text-sm text-white/55 transition-colors hover:text-[#ff9900] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff9900]"
              >
                <Trash2 className="h-4 w-4" />
                Clear cart
              </button>
            </div>
          )}
        </header>

        <div className="mt-10 md:mt-14">
          {placed ? (
            /* ---------- order confirmation ---------- */
            <div className={slip}>
              <CartMessage
                icon={
                  <span className={iconBadge}>
                    <Check className="h-5 w-5" />
                  </span>
                }
                title="Thank you."
                text="Your order request has been received. The restaurant will confirm it shortly."
              />
              <CartStub
                title="Your order"
                action={
                  <Link href="/menu" className={outlineLink}>
                    Return to menu
                  </Link>
                }
              >
                {placed.items.map((item) => (
                  <StubRow
                    key={item.id}
                    label={`${item.quantity} × ${item.name}`}
                    value={peso(item.price * item.quantity)}
                  />
                ))}
                <StubRow label="Subtotal" value={peso(placed.total)} large />
              </CartStub>
            </div>
          ) : items.length === 0 ? (
            /* ---------- empty cart ---------- */
            <div className="border border-white/15">
              <CartMessage
                icon={<ShoppingBag className="h-8 w-8 text-[#ff9900]" />}
                title="Your cart is empty."
                text="Choose something from the kitchen and it will appear here."
              >
                <Link
                  href="/menu"
                  className="mt-8 inline-flex h-12 items-center self-start bg-[#ff9900] px-6 text-[15px] font-semibold text-[#0d0d0b] transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Explore the menu
                </Link>
              </CartMessage>
            </div>
          ) : (
            /* ---------- cart ---------- */
            <div className={slip}>
              <div className="flex flex-col">
                <ul className="flex-1 divide-y divide-white/10 px-6 md:px-10">
                  {items.map((item) => (
                    <CartRow
                      key={item.id}
                      item={item}
                      onQuantity={(quantity) =>
                        updateQuantity(item.id, quantity)
                      }
                      onRemove={() => removeItem(item.id)}
                    />
                  ))}
                </ul>
                <div className="border-t border-white/10 px-6 py-4 md:px-10">
                  <Link
                    href="/menu"
                    className="text-sm text-white/60 transition-colors hover:text-[#ff9900]"
                  >
                    Continue ordering
                  </Link>
                </div>
              </div>

              <CartStub
                title="Order summary"
                action={
                  <div>
                    <button
                      type="button"
                      onClick={placeOrder}
                      className="h-12 w-full bg-[#ff9900] text-[15px] font-semibold text-[#0d0d0b] transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      Place order
                    </button>
                    <p className="mt-3 text-center text-xs leading-5 text-white/40">
                      Taxes and delivery are confirmed with the restaurant
                      before payment.
                    </p>
                  </div>
                }
              >
                <StubRow label="Items" value={String(itemCount)} />
                <StubRow label="Subtotal" value={peso(subtotal)} large />
              </CartStub>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
