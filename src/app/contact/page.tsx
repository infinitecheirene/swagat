import ContactForm from "../../components/contacts/ContactForm";
import ContactInfo from "../../components/contacts/ContactInfo";

export default function ContactPage() {
  return (
    <main className="pt-[100px]">
      <section className="mx-auto max-w-[1500px] px-5 py-14 md:px-10 md:py-20">
        <header className="grid items-end gap-6 lg:grid-cols-12">
          <h1 className="font-display text-[clamp(2.75rem,5.4vw,5rem)] font-semibold leading-[0.98] lg:col-span-7">
            Find us <span className="italic text-[#ff9900]">on Rada.</span>
          </h1>
          <p className="max-w-sm text-sm leading-6 text-white/60 lg:col-span-5 lg:justify-self-end">
            Two minutes from Greenbelt, in the middle of Legazpi Village. Walk
            in, or call ahead for a table.
          </p>
        </header>

        <div className="mt-10 grid gap-6 md:mt-14 lg:grid-cols-[380px_1fr]">
          <ContactInfo />
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
