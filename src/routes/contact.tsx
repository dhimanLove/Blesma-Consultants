import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useEnquiry } from "@/components/site/enquiry-drawer";
import { Reveal, RevealWords } from "@/components/site/reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Blessma Consultants | +91 9826277788 · M.P. Nagar Bhopal" },
      {
        name: "description",
        content:
          "Get in touch with Blessma Consultants Bhopal. Call +91 9826277788, WhatsApp us, or visit our office at Plot 130, Zone 2, M.P. Nagar, Bhopal.",
      },
      { property: "og:title", content: "Contact Blessma Consultants" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { open } = useEnquiry();
  return (
    <>
      <section className="bg-paper pb-16 pt-[128px] lg:pt-[144px]">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="ember-badge">Contact</span>
            <h1 className="mt-6 text-[40px] font-semibold leading-[1.1] tracking-[-0.02em] text-obsidian sm:text-[56px]">
              <RevealWords text="Let's get your compliance sorted." />
            </h1>
            <p className="mt-5 max-w-[560px] text-[16px] leading-[1.55] text-steel">
              Call, WhatsApp, email or drop by our M.P. Nagar office. We respond within 1 hour on
              business days.
            </p>

            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              <Reveal>
                <a href="tel:+919826277788" className="card-zinc flex items-start gap-4">
                  <Phone className="text-ember" size={20} />
                  <div>
                    <div className="text-[12px] uppercase tracking-wider text-ash">Call</div>
                    <div className="mt-1 text-[16px] font-semibold text-obsidian">
                      +91 9826277788
                    </div>
                  </div>
                </a>
              </Reveal>
              <Reveal delay={1}>
                <a
                  href="https://api.whatsapp.com/send/?phone=919826277788"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-zinc flex items-start gap-4"
                >
                  <MessageCircle className="text-ember" size={20} />
                  <div>
                    <div className="text-[12px] uppercase tracking-wider text-ash">WhatsApp</div>
                    <div className="mt-1 text-[16px] font-semibold text-obsidian">
                      Chat instantly
                    </div>
                  </div>
                </a>
              </Reveal>
              <Reveal delay={2}>
                <a href="mailto:bhopal@blessma.in" className="card-zinc flex items-start gap-4">
                  <Mail className="text-ember" size={20} />
                  <div>
                    <div className="text-[12px] uppercase tracking-wider text-ash">Email</div>
                    <div className="mt-1 text-[16px] font-semibold text-obsidian">
                      bhopal@blessma.in
                    </div>
                  </div>
                </a>
              </Reveal>
              <Reveal delay={3}>
                <div className="card-zinc flex items-start gap-4">
                  <Clock className="text-ember" size={20} />
                  <div>
                    <div className="text-[12px] uppercase tracking-wider text-ash">Hours</div>
                    <div className="mt-1 text-[16px] font-semibold text-obsidian">
                      Mon–Sat · 9:00 to 20:00
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-[36px] bg-slate p-8 text-snow lg:p-10">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-ember" />
                <div>
                  <div className="text-[12px] uppercase tracking-wider text-ash">Office</div>
                  <div className="mt-2 text-[18px] font-semibold text-snow">
                    Plot No. 130, Zone 2,
                    <br />
                    Maharana Pratap Nagar,
                    <br />
                    Bhopal, MP 462011
                  </div>
                </div>
              </div>

              <div className="mt-6 overflow-hidden rounded-[20px] border border-white/10">
                <iframe
                  title="Blessma Consultants Bhopal Map"
                  src="https://www.google.com/maps?q=M.P.+Nagar+Zone+2+Bhopal&output=embed"
                  width="100%"
                  height="260"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block"
                />
              </div>

              <button onClick={() => open()} className="btn-ember mt-6 w-full">
                Start an Enquiry
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
