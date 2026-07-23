import type { Metadata } from "next";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { GalleryHero } from "@/components/gallery/gallery-hero";
import { AchievementsContent } from "@/components/gallery/achievements-content";
import { Cta } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "Achievements | ALN Gallery",
  description:
    "Landmark shipments and member operations delivered across the ALN network — from West Africa to the Pacific.",
};

export default function AchievementsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <GalleryHero
          eyebrow="Achievements"
          title="Milestones we're proud of"
          highlight={["Milestones"]}
          subtitle="Complex, high-value automobile logistics delivered by ALN members — the shipments and operations that define the network."
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Gallery", href: "/gallery" },
            { label: "Achievements" },
          ]}
        />
        <AchievementsContent />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
