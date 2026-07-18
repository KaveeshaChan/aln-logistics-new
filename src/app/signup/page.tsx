import type { Metadata } from "next";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SignupForm, SignupHeader } from "@/components/auth/signup-form";

export const metadata: Metadata = {
  title: "Create Account | Automobile Logistics Network",
  description:
    "Create your ALN member login to access the member directory, resources and conference updates.",
};

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <SignupHeader />
        <section className="bg-white px-5 py-16 text-black sm:px-8 sm:py-20">
          <SignupForm />
        </section>
      </main>
      <Footer />
    </div>
  );
}
