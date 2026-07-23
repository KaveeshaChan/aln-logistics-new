import type { Metadata } from "next";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { GalleryHero } from "@/components/gallery/gallery-hero";
import { VideosContent } from "@/components/gallery/videos-content";
import { Cta } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "Videos | ALN Gallery",
  description:
    "Member introductions and network highlights on film — from Maldives and Japan to Nigeria, the UK and the UAE.",
};

export default function VideosPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <GalleryHero
          eyebrow="Video library"
          title="Voices from every market we serve"
          highlight={["market"]}
          subtitle="Member introductions and network highlights filmed across 19 countries — one story from every corner of the ALN map."
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Gallery", href: "/gallery" },
            { label: "Videos" },
          ]}
        />
        <VideosContent />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
