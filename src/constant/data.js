export const menuItems = [
  {
    title: "Get Started",
    icon: "heroicons-outline:home",
    link: "/dashboard",
  },
  {
    title: "Organizations",
    icon: "streamline-ultimate:hierarchy-5-organize",
    link: "/dashboard/organizations",
  },
  {
    title: "Governance, Ethics & Integrity",
    icon: "carbon:ai-governance-tracked",
    link: "/dashboard/governance",
  },
  {
    title: "Materiality Matrix",
    icon: "lsicon:find-outline",
    link: "/dashboard/maternity-topic",
  },
  {
    title: "Economic Disclosures",
    icon: "lsicon:management-outline",
    link: "/dashboard/management-approach",
  },
  {
    title: "Environment Disclosure",
    icon: "carbon:material-request",
    link: "/dashboard/material",
  },
  {
    title: "Social Disclosures",
    icon: "carbon:material-request",
    link: "/dashboard/social",
  },
  // {
  //   title: "GRI Standards",
  //   icon: "clarity:info-standard-line",
  //   link: "/dashboard/gri-standards",
  // },

  // {
  //   title: "Email Accounts",
  //   icon: "mi:email",
  //   link: "/dashboard/email",
  // },
  // {
  //   title: "Campaigns",
  //   icon: "eva:paper-plane-fill",
  //   link: "/dashboard/campaigns",
  // },
  // {
  //   title: "Lead List",
  //   icon: "famicons:list",
  //   link: "/dashboard/leads-list",
  // },
  // {
  //   title: "One Box",
  //   icon: "material-symbols:outbox",
  //   link: "/dashboard/onebox",
  // },
  // {
  //   title: "Analytics",
  //   icon: "mdi:analytics",
  //   link: "/dashboard/analytics",
  // },
  {
    title: "Settings",
    icon: "uil:setting",
    link: "/dashboard/setting",
  },
];

export const topMenu = [];

export const notifications = [];

export const message = [];

export const colors = {
  primary: "#4669FA",
  secondary: "#A0AEC0",
  danger: "#F1595C",
  black: "#111112",
  warning: "#FA916B",
  info: "#0CE7FA",
  light: "#425466",
  success: "#50C793",
  "gray-f7": "#F7F8FC",
  dark: "#1E293B",
  "dark-gray": "#0F172A",
  gray: "#68768A",
  gray2: "#EEF1F9",
  "dark-light": "#CBD5E1",
};

export const hexToRGB = (hex, alpha) => {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
};

export const topFilterLists = [];

export const bottomFilterLists = [];

export const meets = [];

export const files = [];

export const roles = [
  { value: "ADMIN", label: "Admin" },
  { value: "MODERATOR", label: "Moderate" },
  { value: "VIEWER", label: "Viewer" },
];
