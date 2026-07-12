import type { Metadata } from "next";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { QuoteForm, QuoteHeader } from "@/components/quote/quote-form";

export const metadata: Metadata = {
  title: "Get a Quote | Automobile Logistics Network",
  description:
    "Get your freight quotation to transport your vehicles worldwide by sea, air, land or rail — three quick steps to a competitive quote from the ALN network.",
};

export default function QuotePage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <QuoteHeader />
        <section className="bg-white px-5 py-16 text-black sm:px-8 sm:py-20">
          <QuoteForm />
        </section>
      </main>
      <Footer />
    </div>
  );
}
