"use client";
import { motion } from "framer-motion";
import { ArrowRight, Check, FileCheck, ShieldCheck, Sparkles, Star } from "lucide-react";
import { useEnquiry } from "../enquiry-drawer";
import { Counter } from "../counter";
import { RevealWords } from "../reveal";

export function Hero() {
  const { open } = useEnquiry();
  return (
    <section className="relative overflow-hidden bg-paper pb-20 pt-[128px] lg:pb-28 lg:pt-[144px]">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="ember-badge"
          >
            <Star size={12} fill="currentColor" /> 4.8 · Google Rating · Bhopal's #1 Compliance
            Consultancy
          </motion.span>

          <h1 className="mt-6 text-[44px] font-semibold leading-[1.08] tracking-[-0.02em] text-obsidian sm:text-[56px] lg:text-[64px]">
            <RevealWords text="Complete Business" className="block" />
            <RevealWords text="Compliance" className="block" />
            <span className="block">
              <RevealWords text="Under One Roof" />
              <span className="text-ember">.</span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="mt-6 max-w-[520px] text-[16px] leading-[1.55] text-steel"
          >
            GST · MSME · Factory License · E-Tenders · GEM Registration · Trademark — handled
            end-to-end, fast, accurate, and completely online. Serving businesses across Bhopal
            since 2019.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <button onClick={() => open()} className="btn-primary">
              Get a Free Consultation <ArrowRight size={16} />
            </button>
            <a href="#services" className="btn-ghost">
              Explore All Services
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-12 grid max-w-[520px] grid-cols-3 gap-6 border-t border-cloud pt-8"
          >
            <SocialProof number={<><Counter to={4.8} decimals={1} /> <span className="text-ember">★</span></>} label="39 Google Reviews" />
            <SocialProof number={<><Counter to={1300} />+</>} label="Projects Done" />
            <SocialProof number={<><Counter to={5} />+</>} label="Years in Bhopal" />
          </motion.div>
        </div>

        <div className="relative min-h-[420px] lg:col-span-5">
          <FloatingCards />
        </div>
      </div>
    </section>
  );
}

function SocialProof({ number, label }: { number: React.ReactNode; label: string }) {
  return (
    <div>
      <div className="text-[28px] font-semibold leading-none text-obsidian sm:text-[32px]">
        {number}
      </div>
      <div className="mt-2 text-[12px] leading-tight text-steel">{label}</div>
    </div>
  );
}

function FloatingCards() {
  return (
    <div className="relative mx-auto h-full w-full max-w-[420px]">
      <motion.div
        initial={{ opacity: 0, x: 60, rotate: -6 }}
        animate={{ opacity: 1, x: 0, rotate: -4 }}
        transition={{ delay: 0.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -6, rotate: -2 }}
        className="absolute left-0 top-0 w-[280px] rounded-[32px] border border-cloud bg-snow p-6 shadow-[0_8px_28px_-16px_rgba(9,9,11,0.15)]"
      >
        <div className="flex items-center justify-between">
          <span className="ember-badge">Latest Completed</span>
          <FileCheck size={18} className="text-iron" />
        </div>
        <div className="mt-5">
          <div className="text-[16px] font-semibold text-obsidian">GST Registration</div>
          <div className="mt-1 text-[13px] text-steel">Rajkamal Traders, MP Nagar</div>
        </div>
        <div className="mt-6 flex items-center gap-2 text-[13px] text-ash">
          <Check size={16} className="text-ember" /> Delivered in 2 days
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.75, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -6 }}
        className="absolute right-0 top-[140px] w-[260px] rounded-[28px] bg-slate p-6 text-snow shadow-[0_12px_32px_-16px_rgba(9,9,11,0.4)]"
      >
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-ash">
          <ShieldCheck size={12} /> Blessma Ledger
        </div>
        <div className="mt-4 text-[48px] font-semibold leading-none">
          <Counter to={1300} />+
        </div>
        <div className="mt-2 text-[13px] text-ash">Successful projects across Bhopal & MP</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 60, rotate: 3 }}
        animate={{ opacity: 1, x: 0, rotate: 2 }}
        transition={{ delay: 0.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -6, rotate: 0 }}
        className="absolute bottom-0 left-6 w-[300px] rounded-[28px] border border-cloud bg-snow p-5"
      >
        <div className="flex items-center gap-2 text-[12px] text-steel">
          <Sparkles size={14} className="text-ember" /> 35+ Services Available
        </div>
        <div className="mt-4 grid grid-cols-5 gap-2">
          {["GST", "MSME", "FSSAI", "PSARA", "GEM"].map((s) => (
            <div
              key={s}
              className="flex h-10 items-center justify-center rounded-xl border border-cloud bg-paper text-[10px] font-medium text-graphite"
            >
              {s}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
