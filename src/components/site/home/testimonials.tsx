"use client";
import { Star } from "lucide-react";
import { Reveal } from "../reveal";

const items = [
  {
    quote:
      "I recently got my GST and MSME registrations done through BLESSMA. The team handled everything smoothly at their Bhopal office. Highly professional and fast.",
    author: "Rajveer Lodhi",
    meta: "GST & MSME Registration · 4 months ago",
    tag: "GST Registration",
  },
  {
    quote:
      "Staff at BLESSMA were incredibly helpful with our startup registrations and ESIC/EPFO guidance. Highly recommend their professional service in Bhopal.",
    author: "Priyansh Baghel",
    meta: "Startup & ESIC · 6 months ago",
    tag: "Startup India",
  },
  {
    quote:
      "Got my GST and startup registrations sorted quickly. The team walked me through every step with clear explanations - I never felt lost.",
    author: "Anjali Patel",
    meta: "GST & Startup India · 2 months ago",
    tag: "GST & Startup India",
  },
];

export function Testimonials() {
  return (
    <section className="bg-paper py-20 lg:py-28">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <h2 className="text-[32px] font-semibold leading-[1.15] tracking-[-0.01em] text-obsidian sm:text-[40px]">
              What Our Clients Say.
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <div className="inline-flex items-center gap-2 rounded-[14px] border border-cloud bg-snow px-3 py-1.5 text-[13px] text-iron">
              <Star size={14} className="fill-ember text-ember" />
              4.8 · 39 Reviews on Google
            </div>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.author} delay={i}>
              <div className="card-zinc flex h-full flex-col">
                <div className="flex items-center gap-1 text-ember">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} size={14} className="fill-current" />
                  ))}
                </div>
                <p className="mt-4 flex-1 text-[15px] leading-[1.55] text-graphite">
                  "{it.quote}"
                </p>
                <div className="mt-6">
                  <div className="text-[14px] font-semibold text-obsidian">{it.author}</div>
                  <div className="mt-1 text-[12px] text-ash">{it.meta}</div>
                  <span className="tag-pill mt-3">{it.tag}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={3}>
          <div className="mt-4 flex flex-col gap-4 rounded-[36px] border border-cloud bg-snow p-8 lg:flex-row lg:items-center lg:justify-between lg:p-10">
            <blockquote className="max-w-[600px] text-[24px] font-semibold leading-tight text-obsidian sm:text-[28px]">
              "Work is very fast, neat and clean."
            </blockquote>
            <div className="text-[13px] text-steel">
              Verified Google Reviewer
              <div className="text-ash">Bhopal, MP</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
