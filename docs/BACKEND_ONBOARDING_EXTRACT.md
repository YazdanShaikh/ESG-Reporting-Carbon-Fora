# Backend specification: onboarding document extract & AI mapping

This document describes what the **backend team** must implement so the CarbonFora web app can upload a **certificate of registration** (PDF or image, typically one page) and/or an **HR master / staff headcount Excel sheet**, extract text and tables, call OpenAI to map fields, and return JSON that the frontend merges into the existing onboarding form.

## Security (mandatory)

1. **OpenAI API keys must only live on the server** (environment variable, secrets manager). Never return the key to the client or commit it to git.
2. If an API key was shared in chat or committed to a repo, **rotate it immediately** in the OpenAI dashboard and update server configuration only.
3. Authenticate this endpoint the same way as other `/brand/...` routes (Bearer token / session).
4. Validate file types and size server-side; scan for malware if your security policy requires it.
5. Do not persist raw document contents longer than needed for processing unless product/legal requires it; if you store files, document retention and access control.

## Endpoint

| Item | Value |
|------|--------|
| Method | `POST` |
| Path | `/api/v1/brand/onboarding/extract-documents` |
| Content-Type | `multipart/form-data` |
| Auth | Same as `submit` onboarding (e.g. `Authorization` header + `x-api-key` if used) |

### Form fields (multipart)

| Field name | Required | Description |
|------------|----------|-------------|
| `registrationCertificate` | Optional* | PDF or image (`application/pdf`, `image/png`, `image/jpeg`). Represents a single-page (or first page only) registration certificate. |
| `hrMasterSheet` | Optional* | Excel `.xlsx`/`.xls` or `.csv` — staff headcount / HR master similar to the “Staff Headcount” template (months, permanent/temporary breakdown, workforce totals). |

\*At least **one** of the two files must be present. Return `400` if both are missing.

### Recommended limits

- Registration file: max **12 MB**, prefer processing **page 1 only** for PDFs.
- HR file: max **20 MB**.

## Processing pipeline (recommended)

1. **Validate** input files (presence, mime/extension, size).
2. **Extract text**
   - **PDF/image:** Use a reliable text pipeline — e.g. PDF text extraction, or OCR for scanned certificates (Tesseract, cloud OCR, or OpenAI vision if allowed by policy).
   - **Excel/CSV:** Parse sheets with a library (e.g. `xlsx` / `exceljs`). Preserve numeric cells; flatten relevant rows/columns into a concise text or JSON summary for the model (e.g. workforce total per month, permanent vs temporary totals).
3. **Build a structured prompt** for OpenAI that includes:
   - Extracted certificate text (entity name after “M/s.” or similar, registration number, validity dates, issuing authority, address hints for country).
   - Summarized HR table (headcount totals, contract/temporary counts if inferable).
   - Explicit instructions to output **only** JSON matching the schema below (no markdown fences).
4. **Call OpenAI** (`gpt-4o` or `gpt-4o-mini` recommended for cost/latency balance). Use JSON mode or `response_format` where supported.
5. **Validate** the model output against your schema; clamp values to allowed enums where needed.
6. **Respond** to the client with `{ success, data }` as below.

## Response shape (contract with frontend)

The frontend (`applyOnboardingExtract` in `src/utils/onboardingAutofill.js`) accepts any of these wrappers:

- `{ success: true, data: { ...mapped fields } }`
- `{ success: true, data: { mappedFields: { ... } } }`
- `{ mappedFields: { ... } }`

Mapped fields should be a **flat object** of optional keys. Only include keys you are confident about; omit unknowns.

### Suggested JSON schema (mapped fields)

Use strings for text fields, booleans for yes/no questions, arrays for multi-selects.

| Key | Type | Notes |
|-----|------|--------|
| `legalName` | string | Legal name from certificate (e.g. after “M/s.”). |
| `registrationNumber` | string | Optional metadata for your DB — not all exist on the React form today. |
| `operatingCountries` | string[] | Country names; frontend fuzzy-matches to its country list (e.g. “Pakistan” from certificate address). |
| `sector` | string | One of: `Manufacturing`, `Services`, `Retail`, `Energy`, `Construction`, `Other (please mention)`. |
| `sectorOther` | string | If sector is “other” or industry is free-text. |
| `organizationType` | string | One of: `Private`, `Public`, `Listed`, `SME`. |
| `employeeCount` | string | Prefer numeric string from HR **workforce total** or largest monthly total (e.g. `"50"`). |
| `workforceTotal` | number/string | Optional alias the backend may send; frontend maps to `employeeCount`. |
| `website` | string | If found on certificate or HR metadata. |
| `companyType` | string | One of: `Sole Proprietor`, `Partnership`, `Private Limited`, `Public Company` (governance step). |
| `hasEmployeeList` | boolean | `true` if HR sheet clearly lists employees/headcount. |
| `hasContractWorkers` | boolean | `true` if temporary/contract/visiting staff counts &gt; 0. |
| `hasBoardOfDirectors` | boolean | Only if inferable (often omit). |
| `totalBoardMembers` / `femaleBoardMembers` | string | If stated in documents. |
| Environmental/social toggles | boolean | Only set if clearly supported; otherwise omit (frontend leaves existing values). |
| `writtenPolicies` | string[] | Intersection with app’s policy list (see `WRITTEN_POLICY_OPTIONS` in frontend util). |
| `esgObjectives` | string[] | Intersection with objectives list in the form. |

**Important:** Do not send file fields (`companyProfileFile`, `electricityBills`, etc.) — the frontend ignores file uploads from JSON.

### Example success response

```json
{
  "success": true,
  "data": {
    "legalName": "KK Consultant(SMC-Pvt) Ltd",
    "registrationNumber": "Z-25-3514/17",
    "operatingCountries": ["Pakistan"],
    "sector": "Services",
    "organizationType": "Private",
    "employeeCount": "50",
    "companyType": "Private Limited",
    "hasEmployeeList": true,
    "hasContractWorkers": true
  }
}
```

### Example errors

| HTTP | When |
|------|------|
| `400` | No files, invalid mime, file too large. |
| `401` / `403` | Auth failure. |
| `413` | Payload too large. |
| `422` | Extraction produced unusable content (optional — can also return 200 with empty `data`). |
| `502` | OpenAI or OCR service failure (message should be safe for end users). |

## Database changes

None strictly required for **MVP** if the endpoint is stateless (upload → extract → return JSON). Optional enhancements:

- Store **extract job id**, timestamps, user id, **field confidence scores**, and parsed summary for audit/support.
- Store **hashes** of files instead of raw bytes if you need deduplication without storing documents.

## OpenAI prompt hints (for implementers)

- Ask the model to return **only valid JSON** with the keys above.
- For the **HR sheet**, explain the template: months in rows; groups like Permanent (full-time, part-time), Temporary (full-time, part-time, visiting), totals, workforce total.
- Map **workforce total** (or latest month total) to `employeeCount`.
- Map **temporary section totals &gt; 0** to `hasContractWorkers: true`.
- From the **certificate**, map **address containing “Pakistan”** → `operatingCountries: ["Pakistan"]` (adjust for other countries similarly).

## Frontend integration (already implemented)

- Service: `extractOnboardingDocuments` in `src/services/onboarding.service.js` → `POST /brand/onboarding/extract-documents`.
- Normalization: `src/utils/onboardingAutofill.js`.
- UI: welcome screen and Company Profile step — `src/components/onboarding/DocumentImportSection.jsx`.

Once this endpoint is live on `VITE_BACKEND_URL`, uploads from the app will automatically populate allowed fields.
