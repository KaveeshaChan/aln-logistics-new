import type { Metadata } from "next";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import {
  AboutHeader,
  AboutPillars,
  AboutStats,
  AboutStory,
} from "@/components/about/about-content";
import { Cta } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "About | Automobile Logistics Network",
  description:
    "The Automobile Logistics Network connects handpicked freight forwarders and logistics providers in every major country that exports and imports automobiles.",
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <AboutHeader />
        <AboutStory />
        <AboutStats />
        <AboutPillars />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
