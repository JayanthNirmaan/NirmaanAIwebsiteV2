import { Nav } from "@/components/ui/Nav";
import { Hero } from "@/components/sections/Hero";
import { ProblemStory } from "@/components/sections/ProblemStory";
import { CompoundGap } from "@/components/sections/CompoundGap";
import { WhatIf } from "@/components/sections/WhatIf";
import { MeetNirmaan } from "@/components/sections/MeetNirmaan";
import { SIMPower } from "@/components/sections/SIMPower";
import { DemoVideo } from "@/components/sections/DemoVideo";
import { UseCases } from "@/components/sections/UseCases";
import { Testimonials } from "@/components/sections/Testimonials";
import { TrustLogos } from "@/components/sections/TrustLogos";
import { Blog } from "@/components/sections/Blog";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <ProblemStory />
        <CompoundGap />
        <WhatIf />
        <MeetNirmaan />
        <SIMPower />
        <DemoVideo />
        <UseCases />
        <Testimonials />
        <TrustLogos />
        <Blog />
        <ClosingCTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
