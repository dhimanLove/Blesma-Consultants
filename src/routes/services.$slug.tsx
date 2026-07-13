import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check, FileText, MessageCircle, Phone } from "lucide-react";
import { categoryLabels, getServiceBySlug, services, type Service } from "@/lib/services";
import { Reveal, RevealWords } from "@/components/site/reveal";
import { useEnquiry } from "@/components/site/enquiry-drawer";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getServiceBySlug(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.service;
    if (!s) return {};
    const title = `${s.name} in Bhopal | Blessma Consultants`;
    const desc = `Get ${s.name} done fast in Bhopal. ${s.tagline}. Call +91 9826277788 for a free consultation.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/services/${s.slug}` },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
      ],
      links: [{ rel: "canonical", href: `/services/${s.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: s.name,
            provider: { "@type": "LocalBusiness", name: "Blessma Consultants" },
            areaServed: "Bhopal, Madhya Pradesh",
            description: s.description,
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-page py-40 text-center">
      <h1 className="text-[32px] font-semibold text-obsidian">Service not found</h1>
      <Link to="/services" className="btn-primary mt-6 inline-flex">
        Back to services
      </Link>
    </div>
  ),
  component: ServiceDetail,
});

function ServiceDetail() {
  const { service: s } = Route.useLoaderData() as { service: Service };
  const { open } = useEnquiry();
  const related = services.filter((x) => x.category === s.category && x.slug !== s.slug).slice(0, 3);

  return (
    <>
      <section className="bg-paper pb-12 pt-[128px] lg:pt-[144px]">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <nav className="text-[13px] text-ash">
                <Link to="/services" className="hover:text-obsidian">
                  Services
                </Link>
                <span className="mx-2">›</span>
                <span className="text-graphite">{s.name}</span>
              </nav>

              <span className="ember-badge mt-6">{categoryLabels[s.category]}</span>
              <h1 className="mt-5 text-[40px] font-semibold leading-[1.1] tracking-[-0.02em] text-obsidian sm:text-[52px]">
                <RevealWords text={s.name} />
              </h1>
              <p className="mt-4 max-w-[600px] text-[17px] leading-[1.5] text-steel">{s.tagline}</p>

              <div className="mt-8 flex flex-wrap gap-2">
                <span className="tag-pill">Timeline: {s.timeline}</span>
                <span className="tag-pill">100% Online</span>
                <span className="tag-pill">Flat Fee · No Hidden Charges</span>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-[28px] border border-cloud bg-snow p-6 lg:sticky lg:top-24">
                <h3 className="text-[18px] font-semibold text-obsidian">Get This Done Today</h3>
                <p className="mt-1 text-[13px] text-steel">
                  Free consultation. Response within 1 hour.
                </p>
                <button onClick={() => open(s.slug)} className="btn-primary mt-5 w-full">
                  Free Consultation <ArrowRight size={14} />
                </button>
                <a
                  href="https://api.whatsapp.com/send/?phone=919826277788"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-[14px] border border-cloud px-4 py-3 text-[14px] font-medium text-graphite hover:bg-paper"
                >
                  <MessageCircle size={14} /> WhatsApp
                </a>
                <a
                  href="tel:+919826277788"
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-[14px] border border-cloud px-4 py-3 text-[14px] font-medium text-graphite hover:bg-paper"
                >
                  <Phone size={14} /> +91 9826277788
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper pb-20">
        <div className="container-page grid gap-10 lg:grid-cols-12">
          <div className="space-y-10 lg:col-span-8">
            <Reveal>
              <article>
                <h2 className="text-[24px] font-semibold text-obsidian sm:text-[28px]">
                  What is {s.name}?
                </h2>
                <p className="mt-4 text-[15px] leading-[1.6] text-graphite">{s.description}</p>
              </article>
            </Reveal>

            <Reveal>
              <div className="rounded-[28px] bg-slate p-8 text-snow">
                <h3 className="text-[20px] font-semibold text-snow">Who Needs It?</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-ash">{s.whoNeeds}</p>
              </div>
            </Reveal>

            <Reveal>
              <article>
                <h2 className="text-[24px] font-semibold text-obsidian sm:text-[28px]">
                  Documents Required
                </h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {s.documents.map((d) => (
                    <li
                      key={d}
                      className="flex items-start gap-3 rounded-[16px] border border-cloud bg-snow p-4"
                    >
                      <FileText size={16} className="mt-0.5 shrink-0 text-ember" />
                      <span className="text-[14px] text-graphite">{d}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>

            <Reveal>
              <article>
                <h2 className="text-[24px] font-semibold text-obsidian sm:text-[28px]">
                  How Blessma Handles It
                </h2>
                <ol className="mt-5 space-y-4">
                  {["Share your requirement on WhatsApp or the enquiry form.",
                    "Send documents digitally - we verify completeness the same day.",
                    "We file, follow up with authorities and deliver your certificate."].map(
                    (step, i) => (
                      <li key={i} className="flex gap-4 rounded-[16px] border border-cloud bg-snow p-5">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-obsidian text-[13px] font-semibold text-snow">
                          {i + 1}
                        </div>
                        <span className="text-[14px] leading-relaxed text-graphite">{step}</span>
                      </li>
                    ),
                  )}
                </ol>
              </article>
            </Reveal>

            <Reveal>
              <article>
                <h2 className="text-[24px] font-semibold text-obsidian sm:text-[28px]">
                  Why Choose Blessma
                </h2>
                <ul className="mt-5 space-y-3">
                  {["Single point of contact through delivery",
                    "Flat, transparent pricing - no hidden fees",
                    "5+ years of Bhopal-specific expertise",
                    "4.8★ Google rating across 39 verified reviews"].map((r) => (
                    <li key={r} className="flex items-start gap-3 text-[14px] text-graphite">
                      <Check size={16} className="mt-1 shrink-0 text-ember" /> {r}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </div>

          <aside className="lg:col-span-4">
            <div className="rounded-[28px] border border-cloud bg-snow p-6">
              <h3 className="text-[14px] font-semibold uppercase tracking-wider text-ash">
                Related Services
              </h3>
              <ul className="mt-4 space-y-2">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      to="/services/$slug"
                      params={{ slug: r.slug }}
                      className="flex items-center justify-between rounded-xl px-3 py-2 text-[14px] text-graphite hover:bg-paper hover:text-obsidian"
                    >
                      {r.name}
                      <ArrowRight size={14} className="text-ash" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
