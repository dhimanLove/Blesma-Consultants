"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { X, Check, Loader2 } from "lucide-react";
import { services } from "@/lib/services";

interface DrawerCtx {
  open: (preselectService?: string) => void;
  close: () => void;
}

const Ctx = createContext<DrawerCtx | null>(null);

export const useEnquiry = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useEnquiry must be used inside EnquiryDrawerProvider");
  return ctx;
};

export function EnquiryDrawerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [preselected, setPreselected] = useState<string | undefined>();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");

  const open = useCallback((preselectService?: string) => {
    setPreselected(preselectService);
    if (preselectService) setService(preselectService);
    setSubmitted(false);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Handle Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  // Precision Scroll Lock: Delays unlock to match exit animation duration
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      const timer = setTimeout(() => {
        document.body.style.overflow = "";
      }, 500); // Matches the 500ms transition duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || isSubmitting) return;

    setIsSubmitting(true);

    // Simulate brief processing delay for better UX and to prevent instant jarring redirects
    await new Promise((resolve) => setTimeout(resolve, 600));

    const svc = services.find((s) => s.slug === service)?.name ?? service ?? "a service";
    const text = `Hello Blessma! 👋\n\nI need help with: *${svc}*.\n\n*Name:* ${name}\n*Phone:* ${phone}${
      email ? `\n*Email:* ${email}` : ""
    }${message ? `\n*Message:* ${message}` : ""}`;
    
    const url = `https://api.whatsapp.com/send/?phone=919826277788&text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    
    setSubmitted(true);
    setIsSubmitting(false);
  };

  const resetForm = () => {
    setName("");
    setPhone("");
    setEmail("");
    setService("");
    setMessage("");
    setPreselected(undefined);
    setSubmitted(false);
  };

  return (
    <Ctx.Provider value={{ open, close }}>
      {children}
      
      {/* Backdrop with smooth opacity transition */}
      <div
        onClick={close}
        className={`fixed inset-0 z-[80] bg-obsidian/40 backdrop-blur-md transition-all duration-500 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* 
        Hybrid Responsive Drawer:
        - Mobile: Bottom sheet (translate-y), 92vh height, rounded top
        - Desktop (sm+): Right drawer (translate-x), full height, rounded left
        - Easing: cubic-bezier(0.32,0.72,0,1) for a premium, snappy-yet-smooth feel
      */}
      <aside
        className={`fixed bottom-0 left-0 right-0 z-[90] h-[92vh] rounded-t-[32px] bg-snow p-6 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] sm:top-0 sm:right-0 sm:left-auto sm:h-full sm:max-w-[440px] sm:rounded-t-none sm:rounded-l-[36px] sm:p-8 ${
          isOpen ? "translate-y-0 sm:translate-x-0" : "translate-y-full sm:translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
      >
        {/* Mobile Drag Handle (Visual cue) */}
        <div className="sm:hidden mx-auto mb-6 h-1.5 w-12 rounded-full bg-cloud" />

        <div className="flex items-start justify-between">
          <div>
            <h3 id="drawer-title" className="text-[24px] font-semibold leading-tight text-obsidian">
              Get a Free Consultation
            </h3>
            <p className="mt-2 text-[14px] text-steel">
              Fill in your details and we'll call you back within 1 hour.
            </p>
          </div>
          <button
            onClick={close}
            aria-label="Close enquiry drawer"
            className="rounded-full border border-cloud p-2 text-iron transition-colors hover:bg-paper hover:text-obsidian"
          >
            <X size={20} />
          </button>
        </div>

        {submitted ? (
          <div className="mt-10 flex flex-col items-center text-center animate-fade-in">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-ember text-snow shadow-lg shadow-ember/20">
              <Check size={32} strokeWidth={3} />
            </div>
            <h4 className="mt-6 text-[22px] font-semibold text-obsidian">Enquiry Sent!</h4>
            <p className="mt-3 max-w-[280px] text-[14px] leading-relaxed text-steel">
              We've opened WhatsApp with your details. Our team will respond within 1 hour.
            </p>
            <span className="ember-badge mt-6 inline-flex">Response Guaranteed</span>
            <button 
              onClick={() => { resetForm(); close(); }}
              className="mt-8 text-sm font-medium text-steel underline underline-offset-4 hover:text-obsidian"
            >
              Close this window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <Field label="Full Name" required>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
                className="input-zinc"
                placeholder="e.g. Rahul Sharma"
              />
            </Field>
            
            <Field label="Phone Number" required>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                required
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                className="input-zinc"
                placeholder="98262 77788"
              />
            </Field>

            <Field label="Email (optional)">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                autoComplete="email"
                className="input-zinc"
                placeholder="you@company.com"
              />
            </Field>

            <Field label="Service Required">
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="input-zinc appearance-none bg-snow cursor-pointer"
              >
                <option value="">Select a service…</option>
                {services.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.name}
                  </option>
                ))}
              </select>
              {preselected && (
                <p className="mt-1.5 flex items-center gap-1.5 text-[11px] text-ember">
                  <Check size={12} /> Pre-selected from the page you were viewing.
                </p>
              )}
            </Field>

            <Field label="Message (optional)">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="input-zinc resize-none"
                placeholder="Tell us anything else about your requirements…"
              />
            </Field>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary mt-2 flex w-full items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Processing...
                </>
              ) : (
                "Send Enquiry via WhatsApp"
              )}
            </button>

            <p className="text-center text-[12px] text-ash">
              Or call directly:{" "}
              <a href="tel:+919826277788" className="font-medium text-obsidian underline underline-offset-2 transition-colors hover:text-ember">
                +91 98262 77788
              </a>
            </p>
          </form>
        )}
      </aside>

      <style>{`
        .input-zinc {
          width: 100%;
          border: 1px solid var(--color-cloud, #e2e8f0);
          background: var(--color-snow, #ffffff);
          border-radius: 14px;
          padding: 14px 16px;
          font-size: 15px;
          color: var(--color-obsidian, #0f172a);
          font-family: inherit;
          outline: none;
          transition: all 0.2s ease;
        }
        .input-zinc::placeholder {
          color: var(--color-ash, #94a3b8);
        }
        .input-zinc:focus {
          border-color: var(--color-ember, #f97316);
          box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
        }
        /* Custom precision scrollbar for drawer */
        aside::-webkit-scrollbar {
          width: 6px;
        }
        aside::-webkit-scrollbar-track {
          background: transparent;
        }
        aside::-webkit-scrollbar-thumb {
          background-color: var(--color-cloud, #e2e8f0);
          border-radius: 20px;
        }
      `}</style>
    </Ctx.Provider>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-wider text-fog">
        {label} {required && <span className="text-ember">*</span>}
      </span>
      {children}
    </label>
  );
}
