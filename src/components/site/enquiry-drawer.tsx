"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Check } from "lucide-react";
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

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    const svc = services.find((s) => s.slug === service)?.name ?? service ?? "a service";
    const text = `Hello Blessma! I need help with ${svc}. My name is ${name}, phone: ${phone}.${
      email ? ` Email: ${email}.` : ""
    }${message ? ` ${message}` : ""}`;
    const url = `https://api.whatsapp.com/send/?phone=919826277788&text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
    setSubmitted(true);
  };

  return (
    <Ctx.Provider value={{ open, close }}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={close}
              className="fixed inset-0 z-[80] bg-obsidian/30 backdrop-blur-sm"
            />
            <motion.aside
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              className="fixed right-0 top-0 z-[90] h-full w-full max-w-[440px] overflow-y-auto rounded-l-[36px] bg-snow p-8 shadow-xl sm:p-10"
              role="dialog"
              aria-modal="true"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-[24px] font-semibold leading-tight text-obsidian">
                    Get a Free Consultation
                  </h3>
                  <p className="mt-2 text-[14px] text-steel">
                    Fill in your details and we'll call you back within 1 hour.
                  </p>
                </div>
                <button
                  onClick={close}
                  aria-label="Close enquiry drawer"
                  className="rounded-full border border-cloud p-2 text-iron transition-colors hover:bg-paper"
                >
                  <X size={18} />
                </button>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-10 text-center"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-ember text-snow">
                    <Check size={28} />
                  </div>
                  <h4 className="mt-6 text-[22px] font-semibold text-obsidian">Enquiry Sent!</h4>
                  <p className="mt-2 text-[14px] text-steel">
                    We've opened WhatsApp with your details. We'll respond within 1 hour.
                  </p>
                  <span className="ember-badge mt-4 inline-flex">Response Guaranteed</span>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                  <Field label="Full Name" required>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="input-zinc"
                      placeholder="Your name"
                    />
                  </Field>
                  <Field label="Phone Number" required>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      type="tel"
                      className="input-zinc"
                      placeholder="+91 98262 77788"
                    />
                  </Field>
                  <Field label="Email (optional)">
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      className="input-zinc"
                      placeholder="you@company.com"
                    />
                  </Field>
                  <Field label="Service Required">
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="input-zinc appearance-none bg-snow"
                    >
                      <option value="">Select a service…</option>
                      {services.map((s) => (
                        <option key={s.slug} value={s.slug}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                    {preselected && (
                      <p className="mt-1 text-[11px] text-ash">Pre-selected from the page you were viewing.</p>
                    )}
                  </Field>
                  <Field label="Message (optional)">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={3}
                      className="input-zinc resize-none"
                      placeholder="Tell us anything else…"
                    />
                  </Field>
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="btn-primary mt-2 w-full"
                  >
                    Send Enquiry via WhatsApp
                  </motion.button>
                  <p className="text-center text-[12px] text-ash">
                    Or call directly: <a href="tel:+919826277788" className="text-obsidian underline">+91 9826277788</a>
                  </p>
                </form>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
      <style>{`
        .input-zinc {
          width: 100%;
          border: 1px solid var(--color-cloud);
          background: var(--color-snow);
          border-radius: 14px;
          padding: 12px 14px;
          font-size: 14px;
          color: var(--color-obsidian);
          font-family: inherit;
          outline: none;
          transition: border-color 0.15s ease;
        }
        .input-zinc:focus {
          border-color: var(--color-iron);
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
      <span className="mb-1.5 block text-[12px] font-medium uppercase tracking-wider text-fog">
        {label} {required && <span className="text-ember">*</span>}
      </span>
      {children}
    </label>
  );
}
