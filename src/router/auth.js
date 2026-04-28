import { lazy } from "react";

const authRoutes = [
  {
    path: "/home",
    Element: lazy(() => import("@/views/auth/home")),
    index: false,
    key: "home",
  },
  {
    path: "/login",
    Element: lazy(() => import("@/views/auth/login")),
    index: false,
    key: "login",
  },
  {
    path: "/register",
    Element: lazy(() => import("@/views/auth/register")),
    index: false,
    key: "register",
  },
  {
    path: "/forgot-password",
    Element: lazy(() => import("@/views/auth/forgot")),
    index: false,
    key: "forgot-password",
  },
  {
    path: "/update-password",
    Element: lazy(() => import("@/views/auth/password")),
    index: false,
    key: "update-password",
  },

  {
    path: "/verify",
    Element: lazy(() => import("@/views/auth/verify")),
    index: false,
    key: "verify",
  },
  {
    path: "/boarding",
    Element: lazy(() => import("@/views/auth/boarding")),
    index: false,
    key: "boarding",
  },
  {
    path: "/organization",
    Element: lazy(() => import("@/views/auth/organization")),
    index: false,
    key: "organization",
  },
];

export default authRoutes;
