import { Plus } from "lucide-react";
import { formatPrice, isVegetarian, type MenuItem } from "./menu-data";

type Props = {
  item: MenuItem;
  onSelect: () => void;
  onAdd: () => void;
};

function DietMark({ veg }: { veg: boolean }) {
  return (
    <span
      role="img"
      aria-label={veg ? "Vegetarian" : "Non-vegetarian"}
      title={veg ? "Vegetarian" : "Non-vegetarian"}
      className={`mt-2 flex h-4 w-4 shrink-0 items-center justify-center border ${
        veg ? "border-emerald-500" : "border-red-500"
      }`}
    >
      <span
        className={`h-2 w-2 rounded-full ${veg ? "bg-emerald-500" : "bg-red-500"}`}
      />
    </span>
  );
}

export default function MenuItemRow({ item, onSelect, onAdd }: Props) {
  return (
    <li className="grid grid-cols-[auto_1fr_auto] items-start gap-x-4 gap-y-3 py-6">
      <DietMark veg={isVegetarian(item.name)} />

      <button
        type="button"
        onClick={onSelect}
        className="group text-left"
        aria-label={`View details for ${item.name}`}
      >
        <h4 className="font-display text-2xl leading-tight transition-colors group-hover:text-[#ff9900] md:text-3xl">
          {item.name}
        </h4>
        <p className="mt-2 text-base text-white/60">{item.description}</p>
      </button>

      <div className="flex flex-col items-end gap-3">
        <span className="font-mono text-lg text-[#c7ad78]">
          {formatPrice(item.price)}
        </span>
        <button
          type="button"
          onClick={onAdd}
          aria-label={`Add ${item.name} to cart`}
          className="inline-flex h-10 items-center gap-2 border border-white/20 px-4 text-xs uppercase tracking-[0.18em] transition-colors hover:border-[#ff9900] hover:bg-[#ff9900] hover:text-[#0d0d0b]"
        >
          <Plus className="h-4 w-4" />
          Add
        </button>
      </div>
    </li>
  );
}
