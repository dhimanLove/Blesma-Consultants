"use client";
import { motion } from "framer-motion";
import { ArrowRight, Check, FileCheck, ShieldCheck, Sparkles, Star } from "lucide-react";
import { useEnquiry } from "../enquiry-drawer";
import { Counter } from "../counter";
import { RevealWords } from "../reveal";
import { useCallback, useRef, useState } from "react";

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
            <SocialProof
              number={
                <>
                  <Counter to={4.8} decimals={1} /> <span className="text-ember">★</span>
                </>
              }
              label="39 Google Reviews"
            />
            <SocialProof
              number={
                <>
                  <Counter to={1300} />+
                </>
              }
              label="Projects Done"
            />
            <SocialProof
              number={
                <>
                  <Counter to={5} />+
                </>
              }
              label="Years in Bhopal"
            />
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
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate cursor position relative to the center of the card
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Limit rotation to a subtle 15 degrees max
    const rotateY = ((mouseX - width / 2) / width) * 15;
    const rotateX = ((mouseY - height / 2) / height) * -15;

    setRotation({ x: rotateX, y: rotateY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    // Reset position smoothly
    setRotation({ x: 0, y: 0 });
  }, []);

  return (
    <div
      className="relative mx-auto flex h-[550px] w-full max-w-[420px] items-center justify-center"
      style={{ perspective: "1200px" }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="group relative h-full w-full cursor-pointer rounded-2xl shadow-2xl transition-all duration-200 ease-out will-change-transform"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${isHovered ? 1.05 : 1})`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Glassmorphism overlay */}
        <div className="pointer-events-none absolute inset-0 z-10 rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <img
          src="https://i.pinimg.com/736x/e1/63/8e/e1638eeec95a5b2632e2abaaf7214796.jpg"
          alt="Floating Cards"
          className="h-full w-full rounded-2xl object-cover"
        />

        {/* Dynamic glare effect tracking the mouse */}
        {isHovered && (
          <div
            className="pointer-events-none absolute inset-0 z-20 rounded-2xl transition-opacity duration-200"
            style={{
              background: `radial-gradient(circle at ${rotation.y * 5 + 50}% ${rotation.x * -5 + 50}%, rgba(255,255,255,0.15), transparent 60%)`,
            }}
          />
        )}
      </div>
    </div>
  );
}
