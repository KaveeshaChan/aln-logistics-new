import type { Metadata } from "next";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AccountContent } from "@/components/account/account-content";

export const metadata: Metadata = {
  title: "My Account | Automobile Logistics Network",
  description: "Your ALN member account.",
};

export default function AccountPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <section className="bg-white px-5 pt-32 pb-16 text-black sm:px-8 sm:pt-40 sm:pb-20">
          <AccountContent />
        </section>
      </main>
      <Footer />
    </div>
  );
}
