import About from "../components/home/about";
import ContactSection from "../components/home/contact-section";
import Hero from "../components/home/hero";
import QuoteBanner from "../components/home/quote-banner";
import ReservationSection from "../components/home/reservation-section";
import SignatureDishes from "../components/home/signature-dishes";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <QuoteBanner />
      <SignatureDishes />
      <ReservationSection />
      <ContactSection />
    </main>
  );
}
