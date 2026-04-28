import { lazy } from "react";

const dashboardRoutes = [
  {
    path: "",
    Element: lazy(() => import("@/views/dashboard")),
    index: true,
    key: "home",
  },

  {
    path: "organizations",
    Element: lazy(() => import("@/views/dashboard/organizations")),
    index: true,
    key: "organizations",
  },
  {
    path: "governance",
    Element: lazy(() => import("@/views/dashboard/governance")),
    index: true,
    key: "governance",
  },
  {
    path: "maternity-topic",
    Element: lazy(() => import("@/views/dashboard/economic-topic")),
    index: true,
    key: "economic-topic",
  },
  {
    path: "management-approach",
    Element: lazy(() => import("@/views/dashboard/management-approach")),
    index: true,
    key: "management-approach",
  },
  {
    path: "material",
    Element: lazy(() => import("@/views/dashboard/material")),
    index: true,
    key: "material-topics",
  },

  // {
  //   path: "gri-standards",
  //   Element: lazy(() => import("@/views/dashboard/gri-standards")),
  //   index: true,
  //   key: "gri-standards",
  // },

  {
    path: "email",
    Element: lazy(() => import("@/views/dashboard/email")),
    index: true,
    key: "email",
  },
  {
    path: "email/add",
    Element: lazy(() => import("@/views/dashboard/email/add")),
    index: true,
    key: "email-add",
  },
  {
    path: "campaigns",
    Element: lazy(() => import("@/views/dashboard/campaigns")),
    index: true,
    key: "campaigns",
  },
  {
    path: "campaigns/add",
    Element: lazy(() => import("@/views/dashboard/campaigns/add")),
    index: true,
    key: "campaigns-add",
  },
  {
    path: "campaigns/home",
    Element: lazy(() => import("@/views/dashboard/campaigns/home")),
    index: true,
    key: "campaigns-home",
  },

  // {
  //   path: "leads-list/add",
  //   Element: lazy(() => import("@/views/dashboard/leads-list/add")),
  //   index: true,
  //   key: "leadlist/add",
  // },
  {
    path: "dumy1",
    Element: lazy(() => import("@/views/dashboard/dumy1")),
    index: true,
    key: "dumy1",
  },
  {
    path: "analytics",
    Element: lazy(() => import("@/views/dashboard/analytics")),
    index: true,
    key: "analytics",
  },
  {
    path: "setting",
    Element: lazy(() => import("@/views/dashboard/settings")),
    index: false,
    key: "setting",
  },
];

export default dashboardRoutes;
