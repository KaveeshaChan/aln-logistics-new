import type { Metadata } from "next";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { GalleryHero } from "@/components/gallery/gallery-hero";
import { WebinarsContent } from "@/components/gallery/webinars-content";
import { Cta } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "Webinars | ALN Gallery",
  description:
    "ALN member webinars — business opportunities and the future of automobile logistics beyond 2023.",
};

export default function WebinarsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <GalleryHero
          eyebrow="Webinars"
          title="Sessions that move the network forward"
          highlight={["network"]}
          subtitle="Member briefings on the business opportunities across ALN and where automobile logistics is heading next."
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Gallery", href: "/gallery" },
            { label: "Webinars" },
          ]}
        />
        <WebinarsContent />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
