import type { Metadata } from "next";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import {
  ServicesCapabilities,
  ServicesCarnet,
  ServicesGrid,
  ServicesHeader,
  ServicesVideos,
} from "@/components/services/services-content";

export const metadata: Metadata = {
  title: "Service & Quote | Automobile Logistics Network",
  description:
    "End-to-end automobile logistics — sea, road, rail and air freight, customs clearing, ATA Carnet handling and more. Request a quote from the ALN member in your market.",
};

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <ServicesHeader />
        <ServicesVideos />
        <ServicesGrid />
        <ServicesCarnet />
        <ServicesCapabilities />
      </main>
      <Footer />
    </div>
  );
}
