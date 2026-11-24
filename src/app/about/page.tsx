import AboutCta from "../../components/about/about-cta";
import AboutHero from "../../components/about/about-hero";
import AboutPillars from "../../components/about/about-pillars";
import AboutStory from "../../components/about/about-story";

export default function AboutPage() {
  return (
    <main className="pt-20">
      <AboutHero />
      <AboutStory />
      <AboutPillars />
      <AboutCta />
    </main>
  );
}
