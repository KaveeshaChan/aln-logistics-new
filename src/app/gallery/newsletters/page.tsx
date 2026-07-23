import type { Metadata } from "next";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { GalleryHero } from "@/components/gallery/gallery-hero";
import { NewslettersContent } from "@/components/gallery/newsletters-content";

export const metadata: Metadata = {
  title: "Newsletters | ALN Gallery",
  description:
    "ALN newsletters — market intelligence, member news and conference briefings. The first edition is on its way.",
};

export default function NewslettersPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <GalleryHero
          eyebrow="Newsletters"
          title="Straight from the network"
          highlight={["network"]}
          subtitle="Market intelligence, member news and conference briefings — curated for the ALN community and landing in your inbox soon."
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Gallery", href: "/gallery" },
            { label: "Newsletters" },
          ]}
        />
        <NewslettersContent />
      </main>
      <Footer />
    </div>
  );
}
