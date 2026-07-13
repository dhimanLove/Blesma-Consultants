"use client";
import { ArrowRight } from "lucide-react";
import { Counter } from "../counter";
import { Reveal, RevealWords } from "../reveal";

const features = [
  {
    title: "E-Tender Expertise",
    body: "Blessma manages the full e-tendering lifecycle — from registration to bid submission on NIC, MPTENDERS and GEM portals.",
  },
  {
    title: "Seamless Digital Solutions",
    body: "Everything online. Upload documents, track status, receive certificates — no unnecessary office visits.",
  },
  {
    title: "Comprehensive Support",
    body: "Single point of contact for 35+ compliance needs. GST, MSME, Factory License, Trademark — all under one roof.",
  },
  {
    title: "Transparency & Trust",
    body: "4.8 ★ on Google, 39 verified reviews. Clients across Bhopal, MP trust Blessma for accuracy and discretion.",
  },
  {
    title: "Cost-Effective Pricing",
    body: "Flat, transparent fees. No hidden charges. Pay only when the work is done.",
  },
];

const stats = [
  { value: 1300, suffix: "+", label: "Projects Completed" },
  { value: 4.8, decimals: 1, suffix: " ★", label: "Google Rating" },
  { value: 35, suffix: "+", label: "Services Offered" },
  { value: 5, suffix: "+", label: "Years in Bhopal" },
];

export function DarkFeature() {
  return (
    <section className="bg-paper py-8">
      <div className="container-page">
        <div className="rounded-[36px] bg-slate p-8 text-snow lg:p-12">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <span className="ember-badge">Why Choose Us</span>
              <h2 className="mt-5 text-[36px] font-semibold leading-[1.1] tracking-[-0.01em] text-snow sm:text-[44px]">
                <RevealWords text="Fast. Accurate. Always Online." />
              </h2>
              <p className="mt-4 max-w-[520px] text-[15px] leading-relaxed text-ash">
                We handle the paperwork so you can focus on running your business.
              </p>

              <ul className="mt-10 space-y-6">
                {features.map((f, i) => (
                  <Reveal key={f.title} delay={i}>
                    <li className="flex gap-4 border-t border-white/[0.08] pt-6">
                      <ArrowRight size={18} className="mt-1 shrink-0 text-ember" />
                      <div>
                        <div className="text-[16px] font-semibold text-snow">{f.title}</div>
                        <div className="mt-1 text-[13px] leading-relaxed text-ash">{f.body}</div>
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[24px] bg-white/[0.06]">
                {stats.map((s) => (
                  <div key={s.label} className="bg-slate p-6 lg:p-8">
                    <div className="text-[44px] font-semibold leading-none text-snow lg:text-[56px]">
                      <Counter to={s.value} decimals={s.decimals ?? 0} suffix={s.suffix ?? ""} />
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-[13px] text-ash">
                      <span className="text-ember">·</span> {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
