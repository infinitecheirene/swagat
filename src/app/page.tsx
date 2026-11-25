import About from "../components/home/about";
import Hero from "../components/home/hero";
import QuoteBanner from "../components/home/quote-banner";
import ReservationSection from "../components/home/reservation-section";
import SignatureDishes from "../components/home/signature-dishes";
import CTASection from "../components/home/cta-section";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <QuoteBanner />
      <SignatureDishes />
      <ReservationSection />
      <CTASection />
    </main>
  );
}
