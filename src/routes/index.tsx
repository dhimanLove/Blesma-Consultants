import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/home/hero";
import { Categories } from "@/components/site/home/categories";
import { ServicesGrid } from "@/components/site/home/services-grid";
import { DarkFeature } from "@/components/site/home/dark-feature";
import { Process } from "@/components/site/home/process";
import { Testimonials } from "@/components/site/home/testimonials";
import { CtaBand } from "@/components/site/home/cta-band";

export const Route = createFileRoute("/")({
  head: () => ({
    links: [{ rel: "canonical", href: "/" }],
    meta: [{ property: "og:url", content: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <ServicesGrid />
      <DarkFeature />
      <Process />
      <Testimonials />
      <CtaBand />
    </>
  );
}
