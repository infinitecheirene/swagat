import MenuBrowser from "../../components/menu/menu-browser";
import MenuHero from "../../components/menu/menu-hero";

export default function MenuPage() {
  return (
    <main className="pt-20">
      <MenuHero />
      <MenuBrowser />
    </main>
  );
}
