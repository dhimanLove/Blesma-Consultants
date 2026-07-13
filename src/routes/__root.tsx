import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Navbar } from "../components/site/navbar";
import { Footer } from "../components/site/footer";
import { WhatsAppButton } from "../components/site/whatsapp-button";
import { EnquiryDrawerProvider } from "../components/site/enquiry-drawer";
import { LenisProvider } from "../components/site/lenis-provider";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "/#business",
      name: "Blessma Consultants",
      alternateName: "Blessma Business Startup Consultants",
      description:
        "Complete business compliance solutions — licenses, registrations, certificates, e-tenders and GEM services in Bhopal, MP.",
      telephone: "+919826277788",
      email: "bhopal@blessma.in",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Plot No. 130, Zone 2, Maharana Pratap Nagar",
        addressLocality: "Bhopal",
        addressRegion: "Madhya Pradesh",
        postalCode: "462011",
        addressCountry: "IN",
      },
      geo: { "@type": "GeoCoordinates", latitude: 23.2332, longitude: 77.4324 },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "20:00",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        reviewCount: "39",
        bestRating: "5",
      },
      priceRange: "₹₹",
      areaServed: { "@type": "City", name: "Bhopal" },
    },
    {
      "@type": "WebSite",
      "@id": "/#website",
      name: "Blessma Consultants",
    },
  ],
};

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-paper px-4">
      <div className="max-w-md text-center">
        <span className="ember-badge">404</span>
        <h1 className="mt-6 text-[48px] font-semibold text-obsidian">Page not found</h1>
        <p className="mt-3 text-[15px] text-steel">
          The page you're looking for doesn't exist or has moved.
        </p>
        <Link to="/" className="btn-primary mt-6 inline-flex">
          Back to home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-paper px-4">
      <div className="max-w-md text-center">
        <h1 className="text-[24px] font-semibold text-obsidian">This page didn't load.</h1>
        <p className="mt-3 text-[14px] text-steel">
          Something went wrong. Try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-primary"
          >
            Try again
          </button>
          <a href="/" className="btn-ghost">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        title:
          "Blessma Consultants Bhopal | GST, MSME, License & E-Tender Services",
      },
      {
        name: "description",
        content:
          "Blessma Consultants, Bhopal — your complete compliance partner. GST, MSME/Udyam, Factory License, E-Tender, GEM, Trademark, Startup India & 35+ services. Call +91 9826277788.",
      },
      { name: "author", content: "Blessma Consultants" },
      {
        name: "keywords",
        content:
          "GST registration Bhopal, MSME registration Bhopal, Gumasta license Bhopal, Factory license Bhopal, E-tender consultants Bhopal, GEM registration Bhopal, Startup India Bhopal, Trademark Bhopal, Blessma Consultants",
      },
      {
        property: "og:title",
        content: "Blessma Consultants | License & Registration Experts, Bhopal",
      },
      {
        property: "og:description",
        content:
          "4.8★ rated, 1300+ projects. One-stop compliance for GST, Factory License, E-Tenders, GEM, MSME & 35+ services in Bhopal.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Blessma Consultants" },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Blessma Consultants Bhopal" },
      {
        name: "twitter:description",
        content: "Compliance, licenses & e-tenders under one roof in Bhopal.",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(jsonLd),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <LenisProvider>
        <EnquiryDrawerProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-obsidian focus:px-4 focus:py-2 focus:text-snow"
          >
            Skip to main content
          </a>
          <Navbar />
          <main id="main">
            <Outlet />
          </main>
          <Footer />
          <WhatsAppButton />
        </EnquiryDrawerProvider>
      </LenisProvider>
    </QueryClientProvider>
  );
}
