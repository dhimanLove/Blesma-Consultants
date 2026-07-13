import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { services, categoryLabels, type ServiceCategory } from "@/lib/services";
import { Reveal, RevealWords } from "@/components/site/reveal";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "All Services | 35+ Licenses, Registrations & E-Tender | Blessma Bhopal" },
      {
        name: "description",
        content:
          "Explore all 35+ compliance services from Blessma Consultants — GST, MSME, Gumasta, Factory License, E-Tender, GEM Registration, Trademark, and more in Bhopal.",
      },
      { property: "og:title", content: "All Services · Blessma Consultants" },
      { property: "og:description", content: "35+ licenses, registrations and e-tender services in Bhopal." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesIndex,
});

const order: ServiceCategory[] = ["licence", "registration", "certificate", "digital-tender", "other"];

function ServicesIndex() {
  return (
    <>
      <section className="bg-paper pb-12 pt-[128px] lg:pt-[144px]">
        <div className="container-page max-w-[900px]">
          <span className="ember-badge">Services</span>
          <h1 className="mt-6 text-[40px] font-semibold leading-[1.1] tracking-[-0.02em] text-obsidian sm:text-[56px]">
            <RevealWords text="Every compliance service. One trusted partner." />
          </h1>
          <p className="mt-5 max-w-[640px] text-[16px] leading-[1.55] text-steel">
            Click any service to open a free consultation. We respond within 1 hour on WhatsApp.
          </p>
        </div>
      </section>

      <section className="bg-paper pb-24">
        <div className="container-page space-y-16">
          {order.map((cat) => {
            const list = services.filter((s) => s.category === cat);
            if (!list.length) return null;
            return (
              <div key={cat}>
                <Reveal>
                  <div className="mb-6 flex items-baseline justify-between">
                    <h2 className="text-[24px] font-semibold text-obsidian sm:text-[28px]">
                      {categoryLabels[cat]}
                    </h2>
                    <span className="text-[12px] uppercase tracking-wider text-ash">
                      {list.length} service{list.length > 1 ? "s" : ""}
                    </span>
                  </div>
                </Reveal>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {list.map((s, i) => (
                    <Reveal key={s.slug} delay={i}>
                      <Link
                        to="/services/$slug"
                        params={{ slug: s.slug }}
                        className="group flex h-full flex-col rounded-[28px] border border-cloud bg-snow p-6 transition-colors hover:border-mist"
                      >
                        <div className="flex items-start justify-between">
                          <div className="text-[16px] font-semibold text-obsidian">{s.name}</div>
                          <ArrowUpRight
                            size={18}
                            className="shrink-0 text-ash transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ember"
                          />
                        </div>
                        <p className="mt-3 flex-1 text-[13px] leading-relaxed text-steel">
                          {s.tagline}
                        </p>
                        <div className="mt-4 flex items-center gap-2 text-[12px] text-ash">
                          <span className="tag-pill">{s.timeline}</span>
                          {s.popular && <span className="ember-badge">Popular</span>}
                        </div>
                      </Link>
                    </Reveal>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
