import { createFileRoute } from "@tanstack/react-router";
import { Award, Building2, HeartHandshake, Users } from "lucide-react";
import { Reveal, RevealWords } from "@/components/site/reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Blessma Consultants | Bhopal's Compliance Partner Since 2019" },
      {
        name: "description",
        content:
          "Meet the team behind Bhopal's most trusted business compliance consultancy. 5+ years, 1,300+ projects, 4.8★ Google rating.",
      },
      { property: "og:title", content: "About Blessma Consultants" },
      {
        property: "og:description",
        content: "Bhopal's trusted compliance consultancy since 2019.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const values = [
  { icon: Users, title: "Client-first", body: "Every client gets a single dedicated point of contact." },
  { icon: HeartHandshake, title: "Transparency", body: "Flat pricing, clear timelines, no hidden charges." },
  { icon: Building2, title: "End-to-end", body: "From documentation to certificate delivery — we own the outcome." },
  { icon: Award, title: "Accuracy", body: "5+ years, 1,300+ projects, 4.8★ rating on Google." },
];

function AboutPage() {
  return (
    <>
      <section className="bg-paper pb-16 pt-[128px] lg:pb-24 lg:pt-[144px]">
        <div className="container-page max-w-[900px]">
          <span className="ember-badge">About</span>
          <h1 className="mt-6 text-[40px] font-semibold leading-[1.1] tracking-[-0.02em] text-obsidian sm:text-[56px]">
            <RevealWords text="Bhopal's trusted compliance partner since 2019." />
          </h1>
          <p className="mt-6 max-w-[640px] text-[16px] leading-[1.55] text-steel">
            Blessma Consultants was founded with a single mission — make government compliance
            simple, fast and predictable for every business in Bhopal. What began as a small
            practice in M.P. Nagar is today the region's most comprehensive one-stop compliance
            firm, trusted by 1,300+ businesses.
          </p>
        </div>
      </section>

      <section className="bg-paper pb-20">
        <div className="container-page grid gap-4 md:grid-cols-2">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i}>
              <div className="card-zinc h-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-paper text-iron">
                  <v.icon size={20} />
                </div>
                <h3 className="mt-5 text-[20px] font-semibold text-obsidian">{v.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-steel">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-paper pb-24">
        <div className="container-page">
          <div className="rounded-[36px] bg-slate p-10 text-snow lg:p-14">
            <div className="grid gap-8 md:grid-cols-3">
              <div>
                <div className="text-[48px] font-semibold leading-none">1,300+</div>
                <div className="mt-2 text-[13px] text-ash">Projects completed across MP</div>
              </div>
              <div>
                <div className="text-[48px] font-semibold leading-none">4.8 ★</div>
                <div className="mt-2 text-[13px] text-ash">Google rating (39 reviews)</div>
              </div>
              <div>
                <div className="text-[48px] font-semibold leading-none">35+</div>
                <div className="mt-2 text-[13px] text-ash">Services under one roof</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
