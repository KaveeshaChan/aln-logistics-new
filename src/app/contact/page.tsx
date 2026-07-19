import type { Metadata } from "next";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import {
  ContactHeader,
  ContactMap,
  ContactSection,
} from "@/components/contact/contact-content";

export const metadata: Metadata = {
  title: "Contact Us | Automobile Logistics Network",
  description:
    "Get in touch with the Automobile Logistics Network — send us a message, call, email or visit our head office in Colombo, Sri Lanka.",
};

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <ContactHeader />
        <ContactSection />
        <ContactMap />
      </main>
      <Footer />
    </div>
  );
}
