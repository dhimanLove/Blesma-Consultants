import { createFileRoute, Outlet, useMatches } from "@tanstack/react-router";

export const Route = createFileRoute("/services")({
  component: ServicesLayout,
});

function ServicesLayout() {
  // Use Outlet — /services shows index child; /services/$slug shows detail
  const matches = useMatches();
  void matches;
  return <Outlet />;
}
