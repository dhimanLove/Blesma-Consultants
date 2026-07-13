"use client";
import { Clock, Mail, MapPin } from "lucide-react";
import { useEnquiry } from "../enquiry-drawer";
import { RevealWords } from "../reveal";

export function CtaBand() {
  const { open } = useEnquiry();
  return (
    <section className="bg-paper pb-24 pt-8">
      <div className="container-page">
        <div className="rounded-[36px] bg-obsidian p-10 text-snow lg:p-16">
          <h2 className="max-w-[720px] text-[32px] font-semibold leading-[1.12] tracking-[-0.01em] text-snow sm:text-[44px]">
            <RevealWords text="Streamline Your Business Compliance Today." />
          </h2>
          <p className="mt-5 max-w-[560px] text-[15px] leading-relaxed text-ash">
            Over 1,300 businesses across Bhopal trust Blessma for fast, accurate, end-to-end
            license and registration services.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://api.whatsapp.com/send/?phone=919826277788"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-[14px] font-medium text-snow transition-colors hover:bg-white/15"
            >
              WhatsApp Us Now
            </a>
            <a
              href="tel:+919826277788"
              className="inline-flex items-center gap-2 rounded-[14px] border border-white/30 px-5 py-3 text-[14px] font-medium text-snow transition-colors hover:bg-white/10"
            >
              Call +91 9826277788
            </a>
            <button onClick={() => open()} className="btn-ember">
              Get a Free Quote
            </button>
          </div>

          <div className="mt-12 grid gap-4 border-t border-white/10 pt-8 text-[13px] text-ash sm:grid-cols-3">
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-ember" /> Plot 130, M.P. Nagar, Bhopal
            </div>
            <div className="flex items-center gap-2">
              <Mail size={14} className="text-ember" /> bhopal@blessma.in
            </div>
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-ember" /> Open till 8 PM · Mon–Sat
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
