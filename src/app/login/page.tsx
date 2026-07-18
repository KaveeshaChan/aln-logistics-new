import type { Metadata } from "next";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LoginForm, LoginHeader } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Member Login | Automobile Logistics Network",
  description:
    "Sign in to the ALN member portal to access the member directory, resources and conference updates.",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <LoginHeader />
        <section className="bg-white px-5 py-16 text-black sm:px-8 sm:py-20">
          <LoginForm />
        </section>
      </main>
      <Footer />
    </div>
  );
}
