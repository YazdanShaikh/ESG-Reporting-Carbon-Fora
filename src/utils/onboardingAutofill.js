import {
  organizationType as ORG_TYPES,
  useFuels,
} from "../constant/onboarding";

/** Must match Select options in boarding.jsx */
export const SECTOR_OPTIONS = [
  "Manufacturing",
  "Services",
  "Retail",
  "Energy",
  "Construction",
  "Other (please mention)",
];

export const COMPANY_TYPE_OPTIONS = [
  "Sole Proprietor",
  "Partnership",
  "Private Limited",
  "Public Company",
];

export const WRITTEN_POLICY_OPTIONS = [
  "Employee Handbook",
  "Code of Conduct",
  "Anti-Discrimination Policy",
  "Equal Opportunity Policy",
  "Grievance Mechanism Policy",
  "Whistleblower Policy",
  "Anti-Harassment Policy",
  "Health & Safety Policy",
  "Training & Development Policy",
  "Environmental Policy",
  "Energy Management Policy",
  "Waste Management Policy",
  "Water Management Policy",
  "Climate Change Policy",
  "Carbon Reduction Strategy",
  "Anti-Bribery & Anti-Corruption Policy",
  "Supplier Code of Conduct",
  "Procurement Policy",
  "Data Protection Policy",
  "Risk Management Policy",
  "Conflict of Interest Policy",
];

export const ESG_OBJECTIVE_OPTIONS = [
  "Meet regulatory requirements",
  "Attract investors",
  "Improve company reputation",
  "Supply chain compliance",
  "Internal performance improvement",
  "Customer requirements",
  "Other",
];

const RENEWABLE_OPTIONS = ["Yes", "No", "Not Sure"];

/**
 * Scalar / array fields the AI may fill (never file inputs).
 */
const ALLOWED_KEYS = new Set([
  "legalName",
  "sectorOther",
  "operatingCountries",
  "sector",
  "organizationType",
  "employeeCount",
  "website",
  "useElectricity",
  "useFuel",
  "fuelTypes",
  "fuelUsageQuantity",
  "fuelUsageUnit",
  "useRenewableEnergy",
  "consumeWater",
  "generateWaste",
  "trackWaste",
  "calculatedEmissionsPast",
  "hasEmployeeList",
  "trackTurnover",
  "hasContractWorkers",
  "safetyIncidents",
  "provideTraining",
  "writtenPolicies",
  "hasGrievanceMechanism",
  "hasBoardOfDirectors",
  "totalBoardMembers",
  "femaleBoardMembers",
  "companyType",
  "hasEthicsPolicy",
  "hasESGTraining",
  "workWithSuppliers",
  "askSuppliersEthicalCodes",
  "hasPublicESGTargets",
  "conductedStakeholderSurveys",
  "hasPreviousESGReport",
  "esgObjectives",
]);

function normalizeBool(v) {
  if (typeof v === "boolean") return v;
  if (v == null || v === "") return undefined;
  const s = String(v).trim().toLowerCase();
  if (["yes", "true", "1", "y"].includes(s)) return true;
  if (["no", "false", "0", "n"].includes(s)) return false;
  return undefined;
}

function pickFromList(value, allowed) {
  if (value == null || value === "") return undefined;
  const s = String(value).trim();
  const exact = allowed.find((a) => a === s);
  if (exact) return exact;
  const lower = s.toLowerCase();
  const ci = allowed.find((a) => a.toLowerCase() === lower);
  if (ci) return ci;
  return undefined;
}

function normalizeCountries(input, countryNames) {
  if (!countryNames?.length) return undefined;
  if (input == null) return undefined;
  const list = Array.isArray(input) ? input : [input];
  const out = [];
  const lowerMap = new Map(
    countryNames.map((c) => [c.toLowerCase().trim(), c])
  );
  for (const raw of list) {
    if (raw == null || raw === "") continue;
    const s = String(raw).trim();
    const direct = lowerMap.get(s.toLowerCase());
    if (direct) {
      if (!out.includes(direct)) out.push(direct);
      continue;
    }
    const partial = countryNames.find(
      (c) =>
        s.toLowerCase().includes(c.toLowerCase()) ||
        c.toLowerCase().includes(s.toLowerCase())
    );
    if (partial && !out.includes(partial)) out.push(partial);
  }
  return out.length ? out : undefined;
}

function normalizeSector(v) {
  if (v == null || v === "") return undefined;
  return pickFromList(v, SECTOR_OPTIONS);
}

function normalizeOrgType(v) {
  return pickFromList(v, ORG_TYPES);
}

function normalizeCompanyType(v) {
  return pickFromList(v, COMPANY_TYPE_OPTIONS);
}

function normalizeRenewable(v) {
  return pickFromList(v, RENEWABLE_OPTIONS);
}

function normalizeFuelTypes(v) {
  if (!Array.isArray(v)) return undefined;
  const allowed = new Set(useFuels.filter((x) => x !== "None"));
  const out = [];
  for (const item of v) {
    const m = pickFromList(item, useFuels.filter((x) => x !== "None"));
    if (m && !out.includes(m)) out.push(m);
  }
  return out.length ? out : undefined;
}

function normalizeStringArray(v, allowedList) {
  if (!Array.isArray(v)) return undefined;
  const allowed = new Set(allowedList);
  const out = [];
  for (const item of v) {
    const m = pickFromList(item, allowedList);
    if (m && allowed.has(m) && !out.includes(m)) out.push(m);
  }
  return out.length ? out : undefined;
}

function normalizeEmployeeCount(v) {
  if (v == null || v === "") return undefined;
  if (typeof v === "number" && Number.isFinite(v)) return String(Math.round(v));
  const s = String(v).trim();
  const num = parseInt(s.replace(/[^\d]/g, ""), 10);
  if (!Number.isNaN(num)) return String(num);
  return s;
}

function normalizeNumberString(v) {
  if (v == null || v === "") return undefined;
  if (typeof v === "number" && Number.isFinite(v)) return String(v);
  const n = parseInt(String(v).replace(/[^\d]/g, ""), 10);
  if (!Number.isNaN(n)) return String(n);
  return String(v).trim() || undefined;
}

/**
 * Unwraps typical API envelopes.
 */
export function parseExtractPayload(body) {
  if (!body || typeof body !== "object") return {};
  if (body.data != null && typeof body.data === "object" && !Array.isArray(body.data)) {
    return body.data.mappedFields ?? body.data.fields ?? body.data;
  }
  if (body.mappedFields && typeof body.mappedFields === "object") {
    return body.mappedFields;
  }
  return body;
}

/**
 * Turns raw AI/backend JSON into safe patches for `formData`.
 */
export function applyOnboardingExtract(rawInput, { countryNames = [] } = {}) {
  const raw =
    rawInput?.mappedFields && typeof rawInput.mappedFields === "object"
      ? rawInput.mappedFields
      : rawInput;

  if (!raw || typeof raw !== "object") {
    return { patch: {}, warnings: ["Empty extract response"] };
  }

  const patch = {};
  const warnings = [];

  const set = (key, value) => {
    if (value !== undefined) patch[key] = value;
  };

  if (typeof raw.legalName === "string" && raw.legalName.trim()) {
    set("legalName", raw.legalName.trim());
  }

  const sectorNorm = normalizeSector(raw.sector);
  if (sectorNorm) {
    set("sector", sectorNorm);
    if (sectorNorm === "Other (please mention)") {
      const other =
        (typeof raw.sectorOther === "string" && raw.sectorOther.trim()) ||
        (typeof raw.sector === "string" && !SECTOR_OPTIONS.includes(raw.sector.trim())
          ? raw.sector.trim()
          : "");
      if (other && !SECTOR_OPTIONS.includes(other)) set("sectorOther", other);
    }
  }
  if (
    typeof raw.sectorOther === "string" &&
    raw.sectorOther.trim() &&
    (!sectorNorm || sectorNorm === "Other (please mention)")
  ) {
    set("sectorOther", raw.sectorOther.trim());
  }

  const org = normalizeOrgType(raw.organizationType);
  if (org) set("organizationType", org);

  const ec = normalizeEmployeeCount(raw.employeeCount ?? raw.workforceTotal);
  if (ec) set("employeeCount", ec);

  const countries = normalizeCountries(raw.operatingCountries, countryNames);
  if (countries) set("operatingCountries", countries);

  if (typeof raw.website === "string" && raw.website.trim()) {
    let w = raw.website.trim();
    if (w && !/^https?:\/\//i.test(w)) w = `https://${w}`;
    set("website", w);
  }

  const boolKeys = [
    "useElectricity",
    "useFuel",
    "consumeWater",
    "generateWaste",
    "trackWaste",
    "calculatedEmissionsPast",
    "hasEmployeeList",
    "trackTurnover",
    "hasContractWorkers",
    "safetyIncidents",
    "provideTraining",
    "hasGrievanceMechanism",
    "hasBoardOfDirectors",
    "hasEthicsPolicy",
    "hasESGTraining",
    "workWithSuppliers",
    "askSuppliersEthicalCodes",
    "hasPublicESGTargets",
    "conductedStakeholderSurveys",
    "hasPreviousESGReport",
  ];
  for (const k of boolKeys) {
    const b = normalizeBool(raw[k]);
    if (b !== undefined) set(k, b);
  }

  const ur = normalizeRenewable(raw.useRenewableEnergy);
  if (ur) set("useRenewableEnergy", ur);

  const fuels = normalizeFuelTypes(raw.fuelTypes);
  if (fuels) set("fuelTypes", fuels);

  const fuq = normalizeNumberString(raw.fuelUsageQuantity);
  if (fuq) set("fuelUsageQuantity", fuq);

  const fuUnit = pickFromList(raw.fuelUsageUnit, ["Liters", "kWh"]);
  if (fuUnit) set("fuelUsageUnit", fuUnit);

  const wp = normalizeStringArray(raw.writtenPolicies, WRITTEN_POLICY_OPTIONS);
  if (wp) set("writtenPolicies", wp);

  const eo = normalizeStringArray(raw.esgObjectives, ESG_OBJECTIVE_OPTIONS);
  if (eo) set("esgObjectives", eo);

  const ct = normalizeCompanyType(raw.companyType);
  if (ct) set("companyType", ct);

  const tbm = normalizeNumberString(raw.totalBoardMembers);
  if (tbm) set("totalBoardMembers", tbm);

  const fbm = normalizeNumberString(raw.femaleBoardMembers);
  if (fbm) set("femaleBoardMembers", fbm);

  const filtered = {};
  for (const [k, v] of Object.entries(patch)) {
    if (ALLOWED_KEYS.has(k)) filtered[k] = v;
    else warnings.push(`Ignored unknown key from API: ${k}`);
  }

  if (!Object.keys(filtered).length) {
    warnings.push("No recognized fields to apply — check backend mapping.");
  }

  return { patch: filtered, warnings };
}
