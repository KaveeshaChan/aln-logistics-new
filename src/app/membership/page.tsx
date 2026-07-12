import type { Metadata } from "next";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import {
  MembershipBenefits,
  MembershipCriteria,
  MembershipFee,
  MembershipHeader,
  MembershipRules,
} from "@/components/membership/membership-content";
import { Cta } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "Membership | Automobile Logistics Network",
  description:
    "Everything you need to know to become an ALN member — criteria, fees, benefits and the rules that protect every member of the network.",
};

export default function MembershipPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <MembershipHeader />
        <MembershipCriteria />
        <MembershipFee />
        <MembershipBenefits />
        <MembershipRules />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
