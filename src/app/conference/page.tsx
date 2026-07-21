import type { Metadata } from "next";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import {
  ConferenceBody,
  ConferenceHeader,
} from "@/components/conference/conference-content";
import { Cta } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "Conference | Automobile Logistics Network",
  description:
    "One forum, one network — the ALN conference brings members together to meet one another and discuss business opportunities.",
};

export default function ConferencePage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <ConferenceHeader />
        <ConferenceBody />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
