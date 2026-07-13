"use client";
import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { services, type ServiceCategory } from "@/lib/services";
import { useEnquiry } from "../enquiry-drawer";
import { Reveal } from "../reveal";

const tabs: { id: "all" | ServiceCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "licence", label: "Licences" },
  { id: "registration", label: "Registrations" },
  { id: "certificate", label: "Certificates" },
  { id: "digital-tender", label: "Digital & Tender" },
  { id: "other", label: "Others" },
];

export function ServicesGrid() {
  const [active, setActive] = useState<(typeof tabs)[number]["id"]>("all");
  const { open } = useEnquiry();

  const filtered = useMemo(
    () => (active === "all" ? services : services.filter((s) => s.category === active)),
    [active],
  );

  return (
    <section className="bg-snow py-20 lg:py-28">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-[640px]">
            <Reveal className="text-[12px] font-medium uppercase tracking-[0.18em] text-ash">
              Full Directory
            </Reveal>
            <Reveal delay={1}>
              <h2 className="mt-4 text-[32px] font-semibold leading-[1.15] tracking-[-0.01em] text-obsidian sm:text-[40px]">
                35+ Services. Every Business Compliance Need.
              </h2>
            </Reveal>
            <Reveal delay={2}>
              <p className="mt-4 text-[15px] leading-relaxed text-steel">
                Click any service to get a free consultation instantly.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="scrollbar-none mt-10 inline-flex max-w-full overflow-x-auto rounded-full bg-paper p-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`relative rounded-full px-4 py-2 text-[13px] transition-colors duration-200 ${
                active === t.id
                  ? "bg-obsidian text-snow"
                  : "text-iron hover:text-obsidian"
              }`}
            >
              <span className={`absolute inset-0 rounded-full ${active === t.id ? "bg-obsidian" : ""}`} />
              <span className="relative whitespace-nowrap">{t.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((s) => (
            <Reveal key={s.slug} delay={0}>
              <button
                onClick={() => open(s.slug)}
                className="group flex h-full flex-col items-start rounded-[24px] border border-cloud bg-snow p-5 text-left transition-transform duration-200 ease-out hover:-translate-y-1 hover:border-slate"
              >
                <div className="flex w-full items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-paper text-[13px] font-semibold text-iron">
                    {s.name
                      .split(" ")
                      .slice(0, 2)
                      .map((w) => w[0])
                      .join("")}
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="text-ash transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ember"
                  />
                </div>
                <div className="mt-4 text-[14px] font-semibold leading-[1.35] text-obsidian">
                  {s.name}
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-wider text-ash">
                  {tabs.find((t) => t.id === s.category)?.label}
                </div>
                <div className="mt-3 text-[12px] text-steel">{s.tagline}</div>
                <span className="mt-4 text-[12px] font-medium text-ember">Enquire →</span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
