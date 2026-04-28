import { lazy } from "react";

const websiteRoutes = [
  {
    path: "",
    Element: lazy(() => import("@/views/website")),
    index: true,
    key: "home",
  },
  {
    path: "/how-it-works",
    Element: lazy(() => import("@/views/website/how-it-works")),
    index: true,
    key: "how-it-works",
  },
  {
    path: "/carbon-integration",
    Element: lazy(() => import("@/views/website/carbon-integration")),
    index: true,
    key: "carbon-integration",
  },
  {
    path: "/pricing",
    Element: lazy(() => import("@/views/website/pricing")),
    index: true,
    key: "pricing",
  },
  {
    path: "/resources",
    Element: lazy(() => import("@/views/website/resources")),
    index: true,
    key: "resources",
  },
  {
    path: "/book-demo",
    Element: lazy(() => import("@/views/website/book-demo")),
    index: true,
    key: "book-demo",
  },
];

export default websiteRoutes;
