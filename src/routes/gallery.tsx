import { createFileRoute } from "@tanstack/react-router";
import { Reveal, RevealWords } from "@/components/site/reveal";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery | Blessma Consultants Bhopal Office & Certificates" },
      {
        name: "description",
        content:
          "A look inside Blessma Consultants - our Bhopal office at M.P. Nagar, team at work, and recently delivered client certificates.",
      },
      { property: "og:title", content: "Gallery · Blessma Consultants" },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: GalleryPage,
});

const items = [
  { label: "Blessma Office · M.P. Nagar", tone: "bg-slate" },
  { label: "Client GST Certificate Delivered", tone: "bg-paper" },
  { label: "Factory License · Bhopal Client", tone: "bg-snow" },
  { label: "MSME/Udyam Certificate", tone: "bg-paper" },
  { label: "Team at Work", tone: "bg-slate" },
  { label: "Digital Signature Session", tone: "bg-snow" },
];

function GalleryPage() {
  return (
    <>
      <section className="bg-paper pb-14 pt-[128px] lg:pt-[144px]">
        <div className="container-page max-w-[900px]">
          <span className="ember-badge">Gallery</span>
          <h1 className="mt-6 text-[40px] font-semibold leading-[1.1] tracking-[-0.02em] text-obsidian sm:text-[56px]">
            <RevealWords text="Inside the Blessma office." />
          </h1>
        </div>
      </section>

      <section className="bg-paper pb-24">
        <div className="container-page grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={i} delay={i}>
              <div
                className={`aspect-[4/5] overflow-hidden rounded-[28px] border border-cloud ${it.tone} flex items-end p-6`}
              >
                <div className={it.tone === "bg-slate" ? "text-snow" : "text-obsidian"}>
                  <div className="text-[11px] uppercase tracking-wider opacity-70">
                    Blessma · Bhopal
                  </div>
                  <div className="mt-1 text-[18px] font-semibold">{it.label}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
