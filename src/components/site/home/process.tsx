"use client";
import { Reveal } from "../reveal";

const steps = [
  {
    n: "01",
    title: "Contact Us",
    body: "Call, WhatsApp or fill the form. Tell us what you need - we'll guide you on the exact documents required.",
    badge: "Response within 1 hour",
  },
  {
    n: "02",
    title: "Submit Documents",
    body: "Send your documents digitally via WhatsApp or email. Our team verifies completeness immediately.",
    badge: "100% Online Process",
  },
  {
    n: "03",
    title: "We Handle Everything",
    body: "Blessma files your application, follows up with authorities, and delivers your completed license or certificate.",
    badge: "Delivered to Your Inbox",
  },
];

export function Process() {
  return (
    <section className="bg-paper py-20 lg:py-28">
      <div className="container-page">
        <Reveal>
          <h2 className="mx-auto max-w-[720px] text-center text-[32px] font-semibold leading-[1.15] tracking-[-0.01em] text-obsidian sm:text-[40px]">
            Get Your License in 3 Simple Steps.
          </h2>
        </Reveal>
        <div className="relative mt-14 grid gap-4 md:grid-cols-3">
          <div className="pointer-events-none absolute left-[12%] right-[12%] top-[64px] hidden h-px bg-gradient-to-r from-transparent via-cloud to-transparent md:block" />
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i}>
              <div className="card-zinc h-full">
                <div className="text-[56px] font-semibold leading-none text-cloud">{s.n}</div>
                <h3 className="mt-4 text-[20px] font-semibold text-obsidian">{s.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-steel">{s.body}</p>
                <span className="ember-badge mt-6">{s.badge}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
