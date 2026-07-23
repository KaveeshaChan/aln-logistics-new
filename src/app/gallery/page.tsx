import type { Metadata } from "next";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { GalleryLanding } from "@/components/gallery/landing-content";
import { Cta } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "Gallery | Automobile Logistics Network",
  description:
    "Explore the ALN journey through webinars, photos, videos, newsletters and achievements — a growing archive from across the network.",
};

export default function GalleryPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <GalleryLanding />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
