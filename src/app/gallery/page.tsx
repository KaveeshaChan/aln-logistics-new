import type { Metadata } from "next";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Gallery | Automobile Logistics Network",
  description: "A look inside the ALN network — coming soon.",
};

export default function GalleryPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-5 pt-32 pb-24 text-center sm:pt-40">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-400">
            Gallery
          </p>
          <h1 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            Coming soon
          </h1>
        </div>
      </main>
      <Footer />
    </div>
  );
}
