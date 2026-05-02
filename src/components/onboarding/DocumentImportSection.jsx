import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import { extractOnboardingDocuments } from "../../services/onboarding.service";
import {
  applyOnboardingExtract,
  parseExtractPayload,
} from "../../utils/onboardingAutofill";

const MAX_REG_BYTES = 12 * 1024 * 1024;
const MAX_HR_BYTES = 20 * 1024 * 1024;

const REG_ACCEPT = ".pdf,.png,.jpg,.jpeg,image/png,image/jpeg,application/pdf";
const HR_ACCEPT =
  ".xlsx,.xls,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/csv";

function FileRow({ label, hint, accept, file, onPick, disabled, icon }) {
  return (
    <div className="text-left">
      <p className="text-md font-medium text-white/95 mb-1">{label}</p>
      {hint && <p className="text-xs text-white/60 mb-2">{hint}</p>}
      <label
        className={`flex items-center gap-3 rounded-lg border border-white/25 bg-black/15 px-3 py-2.5 cursor-pointer hover:bg-black/25 transition ${
          disabled ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        <Icon icon={icon} className="text-2xl text-white/80 shrink-0" />
        <div className="min-w-0 flex-1">
          {file ? (
            <>
              <p className="text-sm text-white truncate font-medium">{file.name}</p>
              <p className="text-xs text-white/55">
                {(file.size / 1024).toFixed(1)} KB
              </p>
            </>
          ) : (
            <span className="text-sm text-white/70">Choose file…</span>
          )}
        </div>
        <Icon icon="mdi:chevron-right" className="text-white/50" />
        <input
          type="file"
          accept={accept}
          className="hidden"
          disabled={disabled}
          onChange={(e) => {
            const f = e.target.files?.[0];
            onPick(f || null);
            e.target.value = "";
          }}
        />
      </label>
    </div>
  );
}

/**
 * @param {object} props
 * @param {string[]} props.countryNames — full country list for fuzzy matching operatingCountries
 * @param {'welcome' | 'compact'} props.variant
 * @param {(result: { patch: object, warnings: string[] }) => void} props.onExtractComplete
 * @param {string} [props.className]
 */
export default function DocumentImportSection({
  countryNames,
  variant = "welcome",
  onExtractComplete,
  className = "",
}) {
  const [regFile, setRegFile] = useState(null);
  const [hrFile, setHrFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const runExtract = async () => {
    if (!regFile && !hrFile) {
      toast.info("Add at least one document: registration certificate and/or HR sheet.");
      return;
    }
    if (regFile && regFile.size > MAX_REG_BYTES) {
      toast.error("Registration file is too large (max 12 MB).");
      return;
    }
    if (hrFile && hrFile.size > MAX_HR_BYTES) {
      toast.error("HR spreadsheet is too large (max 20 MB).");
      return;
    }

    setLoading(true);
    try {
      const res = await extractOnboardingDocuments({
        registrationCertificate: regFile || undefined,
        hrMasterSheet: hrFile || undefined,
      });
      const payload = parseExtractPayload(res.data);
      const { patch, warnings } = applyOnboardingExtract(payload, {
        countryNames,
      });
      if (warnings.length) {
        warnings.forEach((w) => {
          if (w.includes("No recognized fields")) toast.warning(w);
        });
      }
      const appliedCount = Object.keys(patch).length;
      if (appliedCount === 0) {
        toast.warning(
          "No fields could be filled automatically. Check your documents or enter details manually."
        );
      } else {
        toast.success(`Applied ${appliedCount} field${appliedCount === 1 ? "" : "s"}. Review all steps before submitting.`);
      }
      onExtractComplete?.({ patch, warnings });
    } catch (err) {
      const status = err?.response?.status;
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Could not read documents.";
      if (status === 404 || status === 501) {
        toast.error(
          "Document scanning is not available yet. Your team needs to enable the extract API on the server — see docs/BACKEND_ONBOARDING_EXTRACT.md."
        );
      } else {
        toast.error(typeof msg === "string" ? msg : "Extract failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  const isWelcome = variant === "welcome";

  return (
    <div
      className={`rounded-2xl border border-white/25 bg-white/10 backdrop-blur-md ${
        isWelcome ? "p-5 md:p-6" : "p-4"
      } ${className}`}
    >
      <div className="flex items-start gap-3 mb-4">
        <div className="rounded-full bg-white/15 p-2.5">
          <Icon icon="mdi:file-document-outline" className="text-2xl text-white" />
        </div>
        <div className="text-left">
          <h2
            className={`font-bold text-white ${isWelcome ? "text-lg md:text-xl" : "text-base"}`}
          >
            Autofill from documents
          </h2>
          <p className="text-sm text-white/75 mt-1 leading-snug">
            Upload your{" "}
            <strong className="text-white/90">certificate of registration</strong>{" "}
            (PDF or image) and{" "}
            <strong className="text-white/90">HR Staff Headcount</strong> (Excel).
            We extract text and map it to this questionnaire, you stay in control and can edit anything.
          </p>
        </div>
      </div>

      <div className={`grid gap-4 ${isWelcome ? "sm:grid-cols-2" : "grid-cols-1"}`}>
        <FileRow
          label="Registration certificate"
          hint="PDF, PNG, or JPG company legal name, registration, etc."
          accept={REG_ACCEPT}
          file={regFile}
          onPick={setRegFile}
          disabled={loading}
          icon="mdi:certificate-outline"
        />
        <FileRow
          label="HR master / headcount sheet"
          hint="Excel (.xlsx, .xls) or CSV monthly staff breakdown."
          accept={HR_ACCEPT}
          file={hrFile}
          onPick={setHrFile}
          disabled={loading}
          icon="mdi:table-large"
        />
      </div>

      <div className="mt-5 flex flex-col mt-8 gap-3 items-center">
        <button
          type="button"
          onClick={runExtract}
          disabled={loading || (!regFile && !hrFile)}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-[#4639AA] font-semibold px-6 py-2.5 hover:scale-[1.02] transition disabled:opacity-50 disabled:hover:scale-100 min-h-[44px]"
        >
          {loading ? (
            <>
              <Icon icon="mdi:loading" className="text-xl animate-spin" />
              Scanning & mapping…
            </>
          ) : (
            <>
              <Icon icon="mdi:sparkles" className="text-xl" />
              Scan documents &amp; fill form
            </>
          )}
        </button>
      </div>
    </div>
  );
}
