import type { Metadata } from "next";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BenefitsHeader } from "@/components/benefits/benefits-content";
import { MembershipTable } from "@/components/benefits/membership-table";
import { Advantages } from "@/components/sections/advantages";
import { Objectives } from "@/components/sections/objectives";
import { Stats } from "@/components/sections/stats";
import { Cta } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "Benefits | Automobile Logistics Network",
  description:
    "Why freight forwarders and logistics providers stay in the Automobile Logistics Network — coverage, trust, expertise and shared business leads.",
};

export default function BenefitsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <BenefitsHeader />
        <MembershipTable />
        <Advantages />
        <Objectives />
        <Stats />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
