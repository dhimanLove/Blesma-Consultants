"use client";
import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { ArrowRight, Menu, Phone, X } from "lucide-react";
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
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { open } = useEnquiry();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 40);
      setHidden(currentY > lastScrollY.current && currentY > 100);
      lastScrollY.current = currentY;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-cloud/50 bg-snow/80 backdrop-blur-xl shadow-lg shadow-black/[0.03]"
          : "border-b border-transparent bg-snow/60 backdrop-blur-md"
      }`}
      style={{ transform: hidden ? "translateY(-100%)" : "translateY(0)" }}
    >
      <div className="container-page flex h-[72px] items-center justify-between gap-6">
        <div className="flex items-baseline gap-2 leading-none">
          <Link to="/" className="text-[16px] font-bold tracking-tight text-obsidian">
            BLESSMA
          </Link>
          <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-steel">
            Consultants
          </span>
        </div>

        <nav className="hidden flex-1 items-center justify-center md:flex">
          <div className="flex items-center gap-1 rounded-full bg-cloud/30 p-1">
            {links.map((l) => {
              const active = pathname === l.to || (l.to !== "/" && pathname.startsWith(l.to));
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`relative rounded-full px-4 py-2 text-[13px] font-medium transition-all duration-300 ${
                    active
                      ? "bg-white text-obsidian shadow-sm"
                      : "text-graphite hover:text-obsidian hover:bg-white/50"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="hidden shrink-0 items-center gap-4 md:flex">
          <a
            href="tel:+919826277788"
            className="group flex items-center gap-2 rounded-full px-3 py-2 text-[13px] text-iron transition-all hover:bg-cloud/30 hover:text-obsidian"
          >
            <Phone size={14} className="transition-transform group-hover:rotate-12" />
            <span className="hidden lg:inline">+91 9826277788</span>
          </a>

          <button
            onClick={() => open()}
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-obsidian to-obsidian/90 px-6 py-2.5 text-[13px] font-medium text-snow shadow-lg shadow-obsidian/20 transition hover:shadow-xl hover:shadow-obsidian/30"
          >
            <span className="relative z-10 flex items-center gap-2">
              Get a Quote
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </button>
        </div>

        <button
          className="relative rounded-full border border-cloud bg-white p-2.5 text-obsidian shadow-sm md:hidden"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed right-0 top-0 z-50 h-screen w-[85%] max-w-[320px] border-l border-cloud bg-snow shadow-2xl md:hidden">
            <div className="flex h-[72px] items-center justify-between border-b border-cloud px-6">
              <span className="text-[16px] font-bold tracking-tight text-obsidian">Menu</span>
              <button onClick={() => setMobileOpen(false)} className="rounded-full p-2 hover:bg-cloud/50">
                <X size={20} />
              </button>
            </div>
            <div className="flex flex-col gap-1 p-4">
              {links.map((l) => {
                const active = pathname === l.to || (l.to !== "/" && pathname.startsWith(l.to));
                return (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center rounded-xl px-4 py-3 text-[15px] transition-all ${
                      active
                        ? "bg-obsidian text-snow"
                        : "text-graphite hover:bg-cloud/50 hover:text-obsidian"
                    }`}
                  >
                    {l.label}
                  </Link>
                );
              })}
              <div className="mt-4 flex flex-col gap-3 border-t border-cloud pt-4">
                <a
                  href="tel:+919826277788"
                  className="flex items-center justify-center gap-2 rounded-full border border-cloud bg-white px-4 py-3 text-[14px] text-obsidian hover:bg-cloud/30"
                >
                  <Phone size={16} />
                  +91 9826277788
                </a>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    open();
                  }}
                  className="rounded-full bg-obsidian px-4 py-3 text-[14px] font-medium text-snow hover:bg-obsidian/90"
                >
                  Get a Quote
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
