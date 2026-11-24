import { Minus, Plus, Trash2 } from "lucide-react";
import type { CartItem } from "../cart-provider";

export const peso = (amount: number) => `₱${amount.toLocaleString("en-PH")}`;

const stepButton =
  "flex h-full w-10 items-center justify-center transition-colors hover:text-[#ff9900] " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#ff9900]";

export default function CartRow({
  item,
  onQuantity,
  onRemove,
}: {
  item: CartItem;
  onQuantity: (quantity: number) => void;
  onRemove: () => void;
}) {
  return (
    // mobile: name + total on top, stepper + remove below. sm+: one row (see `order-*`).
    <li className="grid grid-cols-[1fr_auto] items-center gap-x-5 gap-y-3 py-5 sm:grid-cols-[1fr_auto_6rem_auto]">
      <div className="order-1 min-w-0">
        <h2 className="font-display truncate text-xl md:text-2xl">
          {item.name}
        </h2>
        <p className="mt-1 text-sm tabular-nums text-white/45">
          {peso(item.price)} each
        </p>
      </div>

      <div className="order-3 flex h-10 w-fit items-center border border-white/15 sm:order-2">
        <button
          type="button"
          aria-label={`Decrease ${item.name} quantity`}
          onClick={() => onQuantity(item.quantity - 1)}
          className={stepButton}
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <span
          className="w-8 text-center text-sm tabular-nums"
          aria-live="polite"
        >
          {item.quantity}
        </span>
        <button
          type="button"
          aria-label={`Increase ${item.name} quantity`}
          onClick={() => onQuantity(item.quantity + 1)}
          className={stepButton}
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>

      <p className="order-2 text-right text-base tabular-nums text-[#c7ad78] sm:order-3">
        {peso(item.price * item.quantity)}
      </p>

      <button
        type="button"
        aria-label={`Remove ${item.name}`}
        onClick={onRemove}
        className="order-4 flex h-10 w-10 items-center justify-center justify-self-end border border-white/15 text-white/50 transition-colors hover:border-[#ff9900] hover:text-[#ff9900] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff9900]"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </li>
  );
}
