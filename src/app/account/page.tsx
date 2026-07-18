import type { Metadata } from "next";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AccountContent, AccountHeader } from "@/components/account/account-content";

export const metadata: Metadata = {
  title: "My Account | Automobile Logistics Network",
  description: "Your ALN member account.",
};

export default function AccountPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <AccountHeader />
        <section className="bg-white px-5 py-16 text-black sm:px-8 sm:py-20">
          <AccountContent />
        </section>
      </main>
      <Footer />
    </div>
  );
}
