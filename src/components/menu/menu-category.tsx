import MenuItemRow from "./menu-item";
import type { MenuCategory as Category, MenuItem } from "./menu-data";

type Props = {
  category: Category;
  onSelect: (item: MenuItem, category: string) => void;
  onAdd: (item: MenuItem) => void;
};

export default function MenuCategory({ category, onSelect, onAdd }: Props) {
  return (
    <section
      id={category.slug}
      className="grid scroll-mt-40 gap-6 border-t border-white/10 py-12 first:border-t-0 md:grid-cols-12 md:gap-10 md:py-16"
    >
      <div className="md:col-span-4">
        <div className="md:sticky md:top-44">
          <h3 className="font-display text-4xl font-light uppercase leading-none md:text-5xl">
            {category.title}
          </h3>
          <p className="mt-3 text-base text-white/50">
            {category.items.length} dishes
          </p>
        </div>
      </div>

      <ul className="divide-y divide-white/10 md:col-span-8">
        {category.items.map((item) => (
          <MenuItemRow
            key={item.name}
            item={item}
            onSelect={() => onSelect(item, category.title)}
            onAdd={() => onAdd(item)}
          />
        ))}
      </ul>
    </section>
  );
}
