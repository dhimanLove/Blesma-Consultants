import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Reveal, RevealWords } from "@/components/site/reveal";

export const Route = createFileRoute("/why-choose-us")({
  head: () => ({
    meta: [
      { title: "Why Choose Blessma | Fast, Accurate, Always Online" },
      {
        name: "description",
        content:
          "1,300+ projects. 4.8★ Google rating. Flat pricing. Discover why Bhopal businesses trust Blessma for licenses, registrations and e-tenders.",
      },
      { property: "og:title", content: "Why Choose Blessma Consultants" },
      { property: "og:url", content: "/why-choose-us" },
    ],
    links: [{ rel: "canonical", href: "/why-choose-us" }],
  }),
  component: WhyPage,
});

const reasons = [
  { title: "E-Tender Expertise", body: "Full lifecycle on NIC, MPTENDERS & GEM portals - registration to bid submission." },
  { title: "Seamless Digital Solutions", body: "Everything online. Upload on WhatsApp, receive by email." },
  { title: "Comprehensive Under One Roof", body: "35+ services, one dedicated point of contact." },
  { title: "Transparency & Trust", body: "4.8★ on Google, 39 verified reviews. No hidden charges." },
  { title: "Cost-Effective", body: "Flat fees. Pay only on successful delivery." },
  { title: "Speed", body: "Same-day document verification. Fastest turnaround in Bhopal." },
];

function WhyPage() {
  return (
    <>
      <section className="bg-paper pb-16 pt-[128px] lg:pb-24 lg:pt-[144px]">
        <div className="container-page max-w-[900px]">
          <span className="ember-badge">Why Us</span>
          <h1 className="mt-6 text-[40px] font-semibold leading-[1.1] tracking-[-0.02em] text-obsidian sm:text-[56px]">
            <RevealWords text="Fast. Accurate. Always online." />
          </h1>
          <p className="mt-5 max-w-[640px] text-[16px] leading-[1.55] text-steel">
            Six reasons Bhopal businesses trust Blessma with their most important paperwork.
          </p>
        </div>
      </section>

      <section className="bg-paper pb-24">
        <div className="container-page grid gap-4 md:grid-cols-2">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={i}>
              <div className="card-zinc h-full">
                <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-ember text-snow">
                  <Check size={18} />
                </div>
                <h3 className="mt-5 text-[20px] font-semibold text-obsidian">{r.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-steel">{r.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
