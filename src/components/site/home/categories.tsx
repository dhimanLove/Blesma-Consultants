"use client";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Award, Building2, FileCheck, Gavel } from "lucide-react";
import { Reveal } from "../reveal";

const cards = [
  {
    icon: FileCheck,
    title: "Licences",
    desc: "Gumasta, Trade, Food (FSSAI), Drug, Labour, Factory, Import-Export, PSARA, Warehouse, Petroleum & more.",
    tags: ["Shop Act", "Food License", "Drug License", "Factory", "+10 more"],
    ember: null as string | null,
  },
  {
    icon: Building2,
    title: "Registrations",
    desc: "GST, MSME/Udyam, Startup India, Trademark, ESIC, EPFO, Pvt/OPC/LLP, PWD/CPWD, Trust, NGO, RERA & 15+ more.",
    tags: ["GST", "MSME", "Startup India", "Trademark", "+12 more"],
    ember: "GST",
  },
  {
    icon: Award,
    title: "Certificates & Others",
    desc: "Pollution Control, ISO, Digital Signatures (Class 3), GEM/E-Tender registration, Passport Seva, Project Reports, Fire NOC.",
    tags: ["ISO Cert", "Digital Sig", "E-Tender", "GEM", "Passport"],
    ember: null,
  },
];

export function Categories() {
  return (
    <section id="services" className="bg-paper py-20 lg:py-28">
      <div className="container-page">
        <div className="max-w-[720px]">
          <Reveal className="text-[12px] font-medium uppercase tracking-[0.18em] text-ash">
            Our Services
          </Reveal>
          <Reveal delay={1}>
            <h2 className="mt-4 text-[32px] font-semibold leading-[1.15] tracking-[-0.01em] text-obsidian sm:text-[40px]">
              Everything Your Business Needs - In One Place
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-4 text-[15px] leading-relaxed text-steel">
              From day-one registrations to ongoing compliance - Blessma handles it all.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i}>
              <div className="card-zinc h-full transition-transform duration-200 ease-out hover:-translate-y-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-paper text-iron">
                  <c.icon size={20} />
                </div>
                <h3 className="mt-6 text-[20px] font-semibold text-obsidian">{c.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-steel">{c.desc}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {c.tags.map((t) =>
                    t === c.ember ? (
                      <span key={t} className="ember-badge">
                        {t}
                      </span>
                    ) : (
                      <span key={t} className="tag-pill">
                        {t}
                      </span>
                    ),
                  )}
                </div>
                <Link
                  to="/services"
                  className="mt-6 inline-flex items-center gap-1 text-[13px] font-medium text-obsidian"
                >
                  View all {c.title.toLowerCase()} <ArrowRight size={14} />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={3}>
          <div className="mt-4 rounded-[36px] bg-slate p-8 text-snow lg:p-10">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="max-w-[640px]">
                <div className="flex items-center gap-2 text-ash">
                  <Gavel size={16} />
                  <span className="text-[12px] uppercase tracking-wider">
                    E-Tenders & GEM Services
                  </span>
                </div>
                <h3 className="mt-4 text-[24px] font-semibold leading-tight text-snow sm:text-[28px]">
                  End-to-end government e-tendering support.
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-ash">
                  GEM Registration, online bidding, e-tender registration on NIC and MPTENDERS - Blessma is your expert partner for transparent, efficient government procurement.
                </p>
              </div>
              <div className="flex flex-col items-start gap-3">
                <span className="ember-badge">Expert in GEM Portals</span>
                <Link
                  to="/services/e-tender"
                  className="inline-flex items-center gap-2 rounded-[14px] border border-snow/20 bg-snow/10 px-5 py-3 text-[14px] font-medium text-snow transition-colors hover:bg-snow/15"
                >
                  Enquire about E-Tender <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
