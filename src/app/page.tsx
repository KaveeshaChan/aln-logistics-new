import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { LogoCloud } from "@/components/sections/logo-cloud";
import { Stats } from "@/components/sections/stats";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { Advantages } from "@/components/sections/advantages";
import { Objectives } from "@/components/sections/objectives";
import { Network } from "@/components/sections/network";
import { Clients } from "@/components/sections/clients";
import { Cta } from "@/components/sections/cta";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <LogoCloud />
        <Stats />
        <About />
        <Services />
        <Advantages />
        <Objectives />
        <Network />
        <Clients />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
