"use client";

import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";

export function ConferenceHeader() {
  return (
    <section className="bg-white pt-36 text-black sm:pt-44">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="flex items-center gap-2 text-xs font-medium text-neutral-400">
          <a href="/" className="transition-colors hover:text-brand">
            Home
          </a>
          <span>/</span>
          <span className="text-neutral-700">Conference</span>
        </Reveal>

        <div className="mt-6 max-w-3xl">
          <Reveal delay={0.05}>
            <Eyebrow>The ALN conference</Eyebrow>
          </Reveal>
          <TextReveal
            as="h1"
            text="One forum — meet one another — discuss business opportunities"
            highlight={["forum", "discuss"]}
            className="mt-5 font-heading text-3xl font-extrabold leading-[1.1] tracking-tight text-neutral-900 text-balance sm:text-5xl"
          />
        </div>
      </div>
    </section>
  );
}

const paragraphs = [
  "ALN would envisage staying within its core values, purpose, and vision at all times. We hope that the conference would be able to provide avenues for members to promote their business opportunities.",
  "We hope to make the conference a unique and important event by bringing all members together in one forum.",
  "ALN plans to organize the inaugural conference at a suitable time period and venue, aiming to bring members together by way of virtual or physical meetings.",
  "The conference provides an avenue of convenience and opportunity for members to meet one another to improve, magnify and better understand the scope of services that the other members provide in the Automobile Logistics Industry.",
  "The conference eventually hopes to serve as an all-in-one members group that gives access to all ALN members to discuss potential business opportunities. It is also a cost-effective way of promoting and seeking businesses to and/or from one another. Members could use this conference to make a presentation on specific topics for the interest of ALN members.",
  "From our inaugural conference and is conduct as an event that centers around connecting and build a strong relationship, ALN strongly recommends every member to consider the most important event within the ALN network calendar for each member to meet and network.",
  "In the event any member is unable to attend, they are permitted to nominate an alternate representative to replace the previous nominee.",
  "The investment towards the proposed conference will be determined at the time and will be announced to all ALN members.",
];

export function ConferenceBody() {
  return (
    <section className="bg-white py-16 text-black sm:py-20">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div className="flex flex-col gap-5">
          {paragraphs.map((p, i) => (
            <Reveal key={i} delay={Math.min(i * 0.06, 0.3)}>
              <p className="text-base leading-relaxed text-neutral-600">
                {p}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
