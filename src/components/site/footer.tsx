import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, MessageCircle, Phone, Twitter } from "lucide-react";

const popular = [
  ["GST Registration", "/services/gst-registration"],
  ["MSME / Udyam", "/services/msme-udyam-registration"],
  ["Gumasta License", "/services/gumasta-shop-act"],
  ["Factory License", "/services/factory-license"],
  ["E-Tender Services", "/services/e-tender"],
  ["GEM Registration", "/services/gem-registration"],
  ["Startup India", "/services/startup-india-registration"],
  ["Trademark", "/services/trademark-registration"],
] as const;

const quick = [
  ["Home", "/"],
  ["About Us", "/about"],
  ["Services", "/services"],
  ["Why Choose Us", "/why-choose-us"],
  ["Gallery", "/gallery"],
  ["Contact", "/contact"],
] as const;

export function Footer() {
  return (
    <footer className="border-t border-cloud bg-paper">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-[18px] font-bold text-obsidian">BLESSMA</span>
              <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-ash">
                Consultants
              </span>
            </div>
            <p className="mt-3 max-w-[220px] text-[13px] leading-relaxed text-steel">
              Bhopal's trusted compliance partner for GST, MSME, Factory Licenses, E-Tenders,
              GEM and 35+ business services.
            </p>
            <div className="mt-5 flex items-center gap-3 text-iron">
              <a href="#" aria-label="Facebook" className="hover:text-obsidian">
                <Facebook size={18} />
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-obsidian">
                <Instagram size={18} />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-obsidian">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-[12px] font-medium uppercase tracking-wider text-ash">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2.5">
              {quick.map(([label, to]) => (
                <li key={to}>
                  <Link to={to} className="text-[14px] text-iron hover:text-obsidian">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[12px] font-medium uppercase tracking-wider text-ash">
              Popular Services
            </h4>
            <ul className="mt-4 space-y-2.5">
              {popular.map(([label, to]) => (
                <li key={to}>
                  <Link to={to} className="text-[13px] text-iron hover:text-obsidian">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[12px] font-medium uppercase tracking-wider text-ash">
              Get in Touch
            </h4>
            <ul className="mt-4 space-y-3 text-[13px] text-iron">
              <li className="flex items-start gap-2">
                <Phone size={14} className="mt-1 text-ash" />
                <a href="tel:+919826277788" className="hover:text-obsidian">
                  +91 9826277788
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MessageCircle size={14} className="mt-1 text-ash" />
                <a
                  href="https://api.whatsapp.com/send/?phone=919826277788"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-obsidian"
                >
                  WhatsApp: 9826277788
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={14} className="mt-1 text-ash" />
                <a href="mailto:bhopal@blessma.in" className="hover:text-obsidian">
                  bhopal@blessma.in
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={14} className="mt-1 text-ash" />
                <span>
                  Plot No. 130, Zone 2, M.P. Nagar,
                  <br />
                  Bhopal, MP 462011
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-cloud/70">
        <div className="container-page flex flex-col items-start justify-between gap-2 py-5 text-[12px] text-ash md:flex-row md:items-center">
          <span>© 2026 Blessma Consultants. All rights reserved.</span>
          <span>Complete Solutions Under One Roof · Bhopal, MP</span>
        </div>
      </div>
    </footer>
  );
}
