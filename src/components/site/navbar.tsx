"use client";
import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { useEnquiry } from "./enquiry-drawer";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/why-choose-us", label: "Why Us" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { open } = useEnquiry();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-cloud bg-snow/90 backdrop-blur-md"
          : "border-b border-transparent bg-snow/70 backdrop-blur"
      }`}
    >
      <div className="container-page flex h-[68px] items-center justify-between">
        <Link to="/" className="flex items-baseline gap-2 leading-none">
          <span className="text-[16px] font-bold tracking-tight text-obsidian">BLESSMA</span>
          <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-steel">
            Consultants
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => {
            const active = pathname === l.to || (l.to !== "/" && pathname.startsWith(l.to));
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`text-[14px] transition-colors ${
                  active ? "font-medium text-obsidian" : "text-graphite hover:text-obsidian"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="tel:+919826277788"
            className="flex items-center gap-1.5 text-[13px] text-iron hover:text-obsidian"
          >
            <Phone size={14} />
            +91 9826277788
          </a>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => open()}
            className="btn-primary"
          >
            Get a Quote
          </motion.button>
        </div>

        <button
          className="rounded-full border border-cloud p-2 text-obsidian md:hidden"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="border-t border-cloud bg-snow md:hidden"
          >
            <div className="container-page flex flex-col gap-1 py-4">
              {links.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.03 * i }}
                >
                  <Link
                    to={l.to}
                    className="block rounded-xl px-3 py-3 text-[15px] text-graphite hover:bg-paper hover:text-obsidian"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-3 flex flex-col gap-2 px-1">
                <a href="tel:+919826277788" className="btn-ghost w-full">
                  <Phone size={14} /> +91 9826277788
                </a>
                <button onClick={() => open()} className="btn-primary w-full">
                  Get a Quote
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
