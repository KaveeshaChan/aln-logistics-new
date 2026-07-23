import type { Metadata } from "next";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { GalleryHero } from "@/components/gallery/gallery-hero";
import { PhotosContent } from "@/components/gallery/photos-content";
import { Cta } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "Photos | ALN Gallery",
  description:
    "A premium photo gallery of operations, ports, meetings and events from across the ALN network.",
};

export default function PhotosPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <GalleryHero
          eyebrow="Photo gallery"
          title="Moments from across the network"
          highlight={["network"]}
          subtitle="Operations, ports, meetings and milestones — captured across the countries where ALN members work. Tap any image to view it full-screen."
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Gallery", href: "/gallery" },
            { label: "Photos" },
          ]}
        />
        <PhotosContent />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
