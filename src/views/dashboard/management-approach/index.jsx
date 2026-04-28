import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useForm, useFieldArray } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axiosInstance from "../../../configs/axios.config";
import { toast } from "react-toastify";
import { handleError } from "../../../utils/functions";
import Tax from "../../../components/shared/Tax";
import InfoLabel from "../../../components/ui/InfoLabel";
import InfoHeading from "../../../components/ui/InfoHeading";


const ManagementApproach = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const tabs = [
    { id: 0, label: "Economic Performance", icon: "mdi:finance", module: "gri201" },
    { id: 1, label: "Market Presence", icon: "mdi:store-marker", module: "gri202" },
    { id: 2, label: "Indirect Economic Impacts", icon: "mdi:account-group", module: "gri203" },
    { id: 3, label: "Procurement Practices", icon: "mdi:weather-partly-cloudy", module: "gri204" },
    { id: 4, label: "Anti-Corruption", icon: "mdi:handshake", module: "gri205" },
    { id: 5, label: "Anti-Competitive Behavior", icon: "mdi:hand-back-right", module: "gri206" },
    { id: 6, label: "Tax", icon: "mdi:currency-usd", module: "gri207" }
  ];

  // Validation schemas for each tab
  const tabSchemas = {
    0: yup.object({
      gri201: yup.object({
        isMaterial: yup.string(),
        // Additional validations can be added here
      })
    }),
    1: yup.object({ gri202: yup.object({ isMaterial: yup.string() }) }),
    2: yup.object({ gri203: yup.object({ isMaterial: yup.string() }) }),
    3: yup.object({ gri204: yup.object({ isMaterial: yup.string() }) }),
    4: yup.object({ gri205: yup.object({ isMaterial: yup.string() }) }),
    5: yup.object({ gri206: yup.object({ isMaterial: yup.string() }) }),
    6: yup.object({ gri207: yup.object({ isMaterial: yup.string() }) }),
  };

  const { register, control, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm({
    resolver: yupResolver(tabSchemas[activeTab]),
    defaultValues: {
      gri201: {
        isMaterial: "no",
        managementDescription: "",
        oversight: "CEO",
        evgd: {
          basis: "Audited financial statements",
          basisOtherExplanation: "",
          method: "Accrual",
          cashJustification: "",
          revenues: 0,
          otherIncome: 0,
          operatingCosts: 0,
          employeeWages: 0,
          capitalPayments: 0,
          communityInvestments: 0,
          govtPayments: [{ country: "", taxes: 0, penalties: 0 }],
          geographicSeparate: "no",
          evgdByCountry: []
        },
        omissionReason: "",
        omissionExplanation: "",
        climateRisks: { exists: "no", financialImpactCalculated: "yes", risks: [], financialAssessmentPlan: "" },
        pension: {
          exists: "no",
          fundType: "general",
          liabilities: 0,
          planAssets: 0,
          coverageStrategy: "",
          employeeContributionPct: 0,
          employerContributionPct: 0,
          enrolledEmployees: 0,
          eligibleEmployees: 0
        },
        govtAssistance: { exists: "no", items: [], shareholderType: "No" }
      },
      gri202: {
        isMaterial: "no",
        managementDescription: "",
        oversight: "HR Head",
        locations: [{ name: "", country: "", employees: 0, minWage: 0, maleWage: 0, femaleWage: 0 }],
        wageVariation: "no",
        wageVariationExplanation: "",
        seniorManagement: { definitionScope: "", total: 0, local: 0, definition: "Same country", lowLocalReason: "" },
        omissionReason: "",
        omissionExplanation: ""
      },
      gri203: {
        isMaterial: "no",
        oversight: "CEO / Owner",
        managementDescription: "",
        infrastructure: { exists: "no", projects: [] },
        impacts: { description: "", type: "Positive", measured: "no", metrics: [] },
        omissionReason: "",
        omissionExplanation: ""
      },
      gri204: {
        isMaterial: "no",
      },
      gri205: {
        isMaterial: "no",
      },
      gri206: {
        isMaterial: "no",
      },
      gri207: {
        isMaterial: "no",
        hasFormalStrategy: "no",
        taxGovernanceOwner: "CFO",
        omissionReason: "",
        omissionExplanation: "",
        strategy: {
          isPublic: "no",
          publicLink: "",
          summary: "",
          reviewBody: "Board of Directors",
          reviewFrequency: "Annually",
          complianceApproach: "",
          businessLink: "",
          sustainabilityLink: ""
        },
        governance: {
          accountableBody: "Board of Directors",
          embeddedApproach: "",
          riskApproach: "",
          complianceEvaluation: "",
          hasWhistleblow: "no",
          whistleblowDetails: "",
          hasAssurance: "no",
          assuranceType: "Internal Audit",
          assuranceProvider: ""
        },
        stakeholder: {
          authorityEngagement: "",
          publicAdvocacy: "",
          feedbackProcess: ""
        },
        cbcr: {
          jurisdictionList: [],
          employeeMethod: "Headcount",
          totalHoursWorked: 0,
          standardAnnualHours: 2080,
          jurisdictions: [],
          consolidatedRevenue: 0,
          consolidatedProfit: 0,
          consolidatedAssets: 0,
          consolidatedTaxPaid: 0,
          deferredExcluded: "yes",
          hasStateless: "no",
          statelessDetails: ""
        },
        contentIndex: []
      },
    }
  });

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get("/brand/management-approach/");
        if (res.data.success && res.data.data) {
          // Merge API data with default values to ensure objects exist even if null on backend
          reset(res.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch data", err);
      }
    };
    fetchData();
  }, [reset]);

  // 201-1 Calculations
  const rev = Number(watch("gri201.evgd.revenues")) || 0;
  const otherInc = Number(watch("gri201.evgd.otherIncome")) || 0;
  const EVG = rev + otherInc;

  const opCosts = Number(watch("gri201.evgd.operatingCosts")) || 0;
  const wages = Number(watch("gri201.evgd.employeeWages")) || 0;
  const capPay = Number(watch("gri201.evgd.capitalPayments")) || 0;
  const commInv = Number(watch("gri201.evgd.communityInvestments")) || 0;
  const govtPayments = watch("gri201.evgd.govtPayments") || [];
  const totalGovt = govtPayments.reduce((acc, curr) => acc + (Number(curr.taxes) || 0) + (Number(curr.penalties) || 0), 0);
  const EVD = opCosts + wages + capPay + commInv + totalGovt;
  const EVR = EVG - EVD;

  const [breakdownRows, setBreakdownRows] = useState([
    { location: '', total: 0, local: 0 }
  ]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const currentModule = tabs[activeTab].module;
      const moduleData = data[currentModule];

      // Prepare payload as recommended in the backend documentation (Module + Payload wrapper)
      const requestBody = {
        module: currentModule,
        payload: moduleData
      };

      // Note: If uploading files (e.g. policyDocuments), we should use FormData
      // and append 'module' and 'payload' (stringified JSON) as per docs.
      const res = await axiosInstance.post("/brand/management-approach/", requestBody);
      
      if (res.data.success) {
        toast.success(`${tabs[activeTab].label} saved successfully!`);
        if (activeTab < 6) setActiveTab((prev) => prev + 1);
      }
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleManualNext = async () => {
    const isValid = await new Promise((resolve) => {
      handleSubmit(
        () => resolve(true),
        () => resolve(false)
      )();
    });

    if (isValid) {
      handleSubmit(onSubmit)();
    } else {
      toast.error("Please fill all required fields correctly");
    }
  };

  const [acTrainingRows, setAcTrainingRows] = useState([
    { category: '', total: 0, trained: 0 }
  ]);
  const [acIncidentRows, setAcIncidentRows] = useState([
    { type: '', disciplined: 0, terminated: 0, legal: 0 }
  ]);
  const totalOps = Number(watch('gri205.totalOperations')) || 0;
  const assessedOps = Number(watch('gri205.assessedOperations')) || 0;
  const coveragePct = totalOps > 0 ? ((assessedOps / totalOps) * 100).toFixed(1) : '0.0';

  const [acbCaseRows, setAcbCaseRows] = useState([
    { type: '', number: 0, impact: 0, status: '' }
  ]);

  
//  Gri 201 Economic Performance
  const renderGRI201 = () => (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white p-3 rounded-md border border-gray-200">
        <h3 className="text-lg font-bold text-[#4639AA] mb-6 flex items-center gap-2">
          <Icon icon="mdi:file-document-outline" /> Economic Performance
        </h3>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <InfoLabel
              label="Q1. Has Economic Performance been identified as a material topic?"
              info="Select Yes if your company’s financial performance, payments to employees, taxes, or community contributions are important for stakeholders or business sustainability."
            />
            <div className="flex gap-4">
              {["yes", "no"].map(opt => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" value={opt} {...register("gri201.isMaterial")}
                    className="w-4 h-4 text-[#4639AA] focus:ring-[#4639AA]" />
                  <span className="capitalize text-sm text-gray-700">{opt}</span>
                </label>
              ))}
            </div>
          </div>
          {watch("gri201.isMaterial") === "yes" && (
            <>
              <div>
                <InfoLabel
                  label="Q2. How does the organization manage its overall economic performance?"
                  info="Explain how the company manages revenues, expenses, profitability, taxes, financial risks, and long-term stability. You may refer to budgeting process, financial controls, audits, and oversight. "
                />
                <textarea
                  {...register("gri201.managementDescription")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[100px]"
                  placeholder="Budgeting process, financial controls, audits..."
                />
              </div>
              <div>
                <InfoLabel
                  label="Q3. Who oversees economic performance?"
                  info="Select the person or body responsible for financial oversight."
                />
                <select {...register("gri201.oversight")} className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm">
                  <option>CEO</option>
                  <option>CFO / Finance Head</option>
                  <option>Board of Directors</option>
                  <option>Owner / Managing Director</option>
                  <option>Other</option>
                </select>
              </div>
            </>
          )}

          {/* Omission Logic (GRI 201) */}
          {watch("gri201.isMaterial") === "no" && (
            <div className="mt-4 bg-[#4639AA]/5 border border-[#4639AA]/15 p-4 rounded-xl">
              <h4 className="text-sm font-bold text-[#4639AA] mb-3">Omission Logic (GRI 201)</h4>
              <ul className="list-disc pl-5 text-xs text-gray-600 space-y-1 mb-4">
                <li>EVG not calculated</li>
                <li>Climate section unanswered</li>
                <li>Pension applicable but not reported</li>
                <li>Government assistance refused</li>
              </ul>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <InfoLabel
                    label="Reason for omission"
                    info="Disclosure is omitted when information is not applicable or not available. Select the closest reason."
                  />
                  <select
                    {...register("gri201.omissionReason")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
                  >
                    <option value="">Select reason</option>
                    <option value="Not applicable">Not applicable</option>
                    <option value="Data unavailable">Data unavailable</option>
                    <option value="Legal restriction">Legal restriction</option>
                    <option value="Confidentiality">Confidentiality</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="md:col-span-1">
                  <InfoLabel
                    label="Explanation (required)"
                    info="Explain why the disclosure is omitted for GRI 201."
                  />
                  <textarea
                    {...register("gri201.omissionExplanation")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[100px]"
                    placeholder="e.g. EVG&D not calculated for the reporting period / data not available..."
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {watch("gri201.isMaterial") === "yes" && (
        <>
          {/* 201-1 Direct Economic Value Generated and Distributed */}
          <div className="bg-white p-3 rounded-md border border-gray-200">
            <span className="flex items-start gap-2 mb-2">
              <InfoHeading icon="mdi:chart-areaspline"
                heading="Direct Economic Value Generated and Distributed"
                info={
                  <span>
                    This shows:
                    <ul className="list-disc list-inside text-gray-500 mt-1">
                      <li>How much money your company earned</li>
                      <li>Where that money was spent</li>
                      <li>How much remained in the company</li>
                    </ul>
                  </span>
                } />
            </span>

            <div className="space-y-8">
              <section className="space-y-4">
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b pb-1">Section A – Accounting Basis</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <InfoLabel label="Q1. Is EVG&D compiled from audited financial statements or internally audited management accounts?"
                      info="Select where your numbers come from.
                      Usually from your annual audited financial statements.
                      If not audited, choose internally reviewed management accounts.
                      " />
                    <select {...register("gri201.evgd.basis")} className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm">
                      <option>Audited financial statements</option>
                      <option>Internally audited management accounts</option>
                      <option>Other</option>
                    </select>
                    {watch("gri201.evgd.basis") === "Other" && (
                      <textarea
                        {...register("gri201.evgd.basisOtherExplanation")}
                        className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[80px]"
                        placeholder="Explain other accounting basis..."
                      />
                    )}
                  </div>
                  <div>
                    <InfoLabel label="Q2. Is EVG&D reported on an accrual basis?"
                      info="Accrual means income and expenses are recorded when earned or incurred — not when cash is paid or received. Most companies use accrual accounting. Ask your accountant if unsure." />
                    <select {...register("gri201.evgd.method")} className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm">
                      <option>Accrual</option>
                      <option>Cash</option>
                    </select>
                    {watch("gri201.evgd.method") === "Cash" && (
                      <textarea
                        {...register("gri201.evgd.cashJustification")}
                        className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[80px]"
                        placeholder="Provide justification for cash basis reporting..."
                      />
                    )}
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b pb-1">Section B – Direct Economic Value Generated</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <InfoLabel label="Q3. Report Revenues"
                      info="Enter total sales for the year from your income statement. Do NOT deduct expenses. " />
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-400">$</span>
                      <input type="number" {...register("gri201.evgd.revenues")} className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg outline-none" />
                    </div>
                  </div>
                  <div>
                    <InfoLabel label="Q4. Report Other Income (if applicable)"
                      info="Include interest income, rent received, dividends, gain on asset sale, or other non-operating income." />
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-400">$</span>
                      <input type="number" {...register("gri201.evgd.otherIncome")} className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg outline-none" />
                    </div>
                  </div>
                </div>
                <div className="bg-[#4639AA]/5 p-3 rounded-lg text-[#4639AA] font-bold text-right">
                  EVG (Generated): ${EVG.toLocaleString()}
                </div>
              </section>

              <section className="space-y-4">
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b pb-1">Section C – Economic Value Distributed</h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <InfoLabel label="Q5. Operating Costs"
                      info="Total payments to suppliers and service providers. Includes raw materials, utilities, rent, logistics, outsourcing. " />
                    <input type="number" {...register("gri201.evgd.operatingCosts")} className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none" />
                  </div>
                  <div>
                    <InfoLabel label="Q6. Employee Wages and Benefits"
                      info="Total salaries, bonuses, social security, pension, medical benefits paid to employees." />
                    <input type="number" {...register("gri201.evgd.employeeWages")} className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none" />
                  </div>
                  <div>
                    <InfoLabel label="Q7. Payments to Providers of Capital"
                      info="Dividends paid to owners plus interest paid on loans." />
                    <input type="number" {...register("gri201.evgd.capitalPayments")} className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none" />
                  </div>
                </div>

                <div className="mt-4">
                  <InfoLabel label="Q8. Payments to Government (by country)"
                    info="Enter actual taxes paid (cash basis). Exclude deferred tax. " />
                  <table className="w-full text-xs text-left border-collapse border border-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="p-2 border border-gray-200">Country</th>
                        <th className="p-2 border border-gray-200">Taxes</th>
                        <th className="p-2 border border-gray-200">Penalties</th>
                        <th className="p-2 border border-gray-200">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(watch("gri201.evgd.govtPayments") || []).map((p, idx) => (
                        <tr key={idx}>
                          <td className="p-1 border border-gray-200">
                            <input {...register(`gri201.evgd.govtPayments.${idx}.country`)} className="w-full p-1 border-none outline-none" placeholder="e.g. UAE" />
                          </td>
                          <td className="p-1 border border-gray-200">
                            <input type="number" {...register(`gri201.evgd.govtPayments.${idx}.taxes`)} className="w-full p-1 border-none outline-none" />
                          </td>
                          <td className="p-1 border border-gray-200">
                            <input type="number" {...register(`gri201.evgd.govtPayments.${idx}.penalties`)} className="w-full p-1 border-none outline-none" />
                          </td>
                          <td className="p-2 border border-gray-200 font-bold bg-gray-50">
                            ${(Number(p.taxes) + Number(p.penalties)).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button type="button" onClick={() => setValue("gri201.evgd.govtPayments", [...(watch("gri201.evgd.govtPayments") || []), { country: "", taxes: 0, penalties: 0 }])} className="mt-2 text-xs text-[#4639AA] font-bold">+ Add Country</button>
                  {/* Total Payments to Government */}
                  <div className="mt-3 text-right font-bold text-[#1893A1]">
                    Total Payments to Government: ${totalGovt.toLocaleString()}
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <InfoLabel label="Q9. Community Investments"
                      info="Money voluntarily spent on community projects such as donations, health camps, education support." />
                    <input type="number" {...register("gri201.evgd.communityInvestments")} className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none" />
                  </div>
                </div>

                <div className="bg-[#1893A1]/5 p-3 rounded-lg text-[#1893A1] font-bold text-right">
                  EVD (Distributed): ${EVD.toLocaleString()}
                </div>
              </section>

              <section className="">
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b pb-1 mb-3">
                  Section D – Economic Value Retained</h4>
                <div className="flex justify-between items-center">
                  <div>
                    <InfoLabel label="Q10. Economic Value Retained (Auto-calculated) "
                      info="Money remaining in the company after paying all expenses and distributions." />
                    {/* <p className="text-xs text-gray-500 mt-1">Generated (EVG) - Distributed (EVD)</p> */}
                  </div>
                  <div className="text-3xl font-bold text-emerald-400">
                    ${EVR.toLocaleString()}
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b pb-1 mb-3">
                  SECTION E – Geographic Breakdown</h4>
                <InfoLabel
                  label="Q11. Is EVG&D reported separately by country where significant?"
                  info="If your company operates in multiple countries and financial impact is significant, you must report separately."
                />

                <div className="flex gap-4 mb-6">
                  {["yes", "no"].map((opt) => (
                    <label key={opt} className="flex items-center gap-2">
                      <input
                        type="radio"
                        value={opt}
                        {...register("gri201.evgd.geographicSeparate")}
                        className="w-4 h-4 text-[#4639AA]"
                      />
                      <span className="capitalize text-sm">{opt}</span>
                    </label>
                  ))}
                </div>

                {watch("gri201.evgd.geographicSeparate") === "yes" && (
                  <div className="space-y-4">
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left border-collapse border border-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="p-2 border">Country</th>
                            <th className="p-2 border">Revenues</th>
                            <th className="p-2 border">Other Income</th>
                            <th className="p-2 border">EVG (Auto)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(watch("gri201.evgd.evgdByCountry") || []).map((c, idx) => {
                            const evg = (Number(c.revenues) || 0) + (Number(c.otherIncome) || 0);
                            return (
                              <tr key={idx}>
                                <td className="p-1 border">
                                  <input
                                    {...register(`gri201.evgd.evgdByCountry.${idx}.country`)}
                                    className="w-full p-1 border-none outline-none"
                                    placeholder="e.g. UAE"
                                  />
                                </td>
                                <td className="p-1 border">
                                  <input
                                    type="number"
                                    {...register(`gri201.evgd.evgdByCountry.${idx}.revenues`)}
                                    className="w-full p-1 border-none outline-none"
                                  />
                                </td>
                                <td className="p-1 border">
                                  <input
                                    type="number"
                                    {...register(`gri201.evgd.evgdByCountry.${idx}.otherIncome`)}
                                    className="w-full p-1 border-none outline-none"
                                  />
                                </td>
                                <td className="p-2 border font-bold bg-gray-50">
                                  ${evg.toLocaleString()}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setValue("gri201.evgd.evgdByCountry", [
                          ...(watch("gri201.evgd.evgdByCountry") || []),
                          { country: "", revenues: 0, otherIncome: 0 }
                        ])
                      }
                      className="text-xs text-[#4639AA] font-bold"
                    >
                      + Add Country Row
                    </button>
                  </div>
                )}
              </section>
            </div>
          </div>

          {/* 201-2 Climate-Related Financial Risks and Opportunities */}
          <div className="bg-white p-3 rounded-md border border-gray-200">
            <h3 className="text-lg font-bold text-[#4639AA] mb-6 flex items-center gap-2">
              <Icon icon="mdi:weather-partly-cloudy" /> Climate-Related Financial Risks and Opportunities
            </h3>
            <InfoLabel label="Q1. Has the organization identified climate-related financial risks or opportunities?"
              info="Flood risk to factory, Rising electricity costs, Carbon tax, Solar energy savings
                Select Yes if climate change could affect revenue or costs.
              " />
            <div className="flex gap-4 mb-6">
              {["yes", "no"].map(opt => (
                <label key={opt} className="flex items-center gap-2">
                  <input type="radio" value={opt} {...register("gri201.climateRisks.exists")} className="w-4 h-4 text-[#4639AA]" />
                  <span className="capitalize text-sm">{opt}</span>
                </label>
              ))}
            </div>

            {watch("gri201.climateRisks.exists") === "yes" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <h4 className="text-sm font-bold text-[#4639AA]">Climate Risk Table</h4>
                  <button
                    type="button"
                    onClick={() =>
                      setValue(
                        "gri201.climateRisks.risks",
                        [
                          ...(watch("gri201.climateRisks.risks") || []),
                          {
                            description: "",
                            type: "Physical",
                            financialImpact: 0,
                            timeHorizon: "Short-term",
                            likelihood: "Medium",
                            severity: "Medium",
                            managementAction: "",
                            cost: 0
                          }
                        ]
                      )
                    }
                    className="text-xs text-[#4639AA] font-bold"
                  >
                    + Add Risk
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse border border-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="p-2 border">Risk Description</th>
                        <th className="p-2 border">Type</th>
                        <th className="p-2 border">Financial Impact</th>
                        <th className="p-2 border">Time Horizon</th>
                        <th className="p-2 border">Likelihood</th>
                        <th className="p-2 border">Severity</th>
                        <th className="p-2 border">Management Action</th>
                        <th className="p-2 border">Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(watch("gri201.climateRisks.risks") || []).map((r, idx) => (
                        <tr key={idx}>
                          <td className="p-1 border">
                            <input
                              {...register(`gri201.climateRisks.risks.${idx}.description`)}
                              className="w-full p-1 border-none outline-none"
                              placeholder="e.g. Flood risk to factory"
                            />
                          </td>
                          <td className="p-1 border">
                            <select
                              {...register(`gri201.climateRisks.risks.${idx}.type`)}
                              className="w-full p-1 border-none outline-none bg-transparent"
                            >
                              <option>Physical</option>
                              <option>Regulatory</option>
                              <option>Market</option>
                            </select>
                          </td>
                          <td className="p-1 border">
                            <input
                              type="number"
                              {...register(`gri201.climateRisks.risks.${idx}.financialImpact`)}
                              className="w-full p-1 border-none outline-none"
                              placeholder="e.g. 100000"
                            />
                          </td>
                          <td className="p-1 border">
                            <select
                              {...register(`gri201.climateRisks.risks.${idx}.timeHorizon`)}
                              className="w-full p-1 border-none outline-none bg-transparent"
                            >
                              <option>Short-term</option>
                              <option>Medium-term</option>
                              <option>Long-term</option>
                            </select>
                          </td>
                          <td className="p-1 border">
                            <select
                              {...register(`gri201.climateRisks.risks.${idx}.likelihood`)}
                              className="w-full p-1 border-none outline-none bg-transparent"
                            >
                              <option>Low</option>
                              <option>Medium</option>
                              <option>High</option>
                            </select>
                          </td>
                          <td className="p-1 border">
                            <select
                              {...register(`gri201.climateRisks.risks.${idx}.severity`)}
                              className="w-full p-1 border-none outline-none bg-transparent"
                            >
                              <option>Low</option>
                              <option>Medium</option>
                              <option>High</option>
                            </select>
                          </td>
                          <td className="p-1 border">
                            <input
                              {...register(`gri201.climateRisks.risks.${idx}.managementAction`)}
                              className="w-full p-1 border-none outline-none"
                              placeholder="e.g. Adaptation plan"
                            />
                          </td>
                          <td className="p-1 border">
                            <input
                              type="number"
                              {...register(`gri201.climateRisks.risks.${idx}.cost`)}
                              className="w-full p-1 border-none outline-none"
                              placeholder="e.g. 25000"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="">
                  <InfoLabel
                    label="Q2. Is there a plan to develop financial assessment systems?"
                    info="If you cannot estimate cost impact yet, explain how and when you will start tracking it."
                  />
                 
                      <textarea
                        {...register("gri201.climateRisks.financialAssessmentPlan")}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[50px]"
                        placeholder="Short text"
                      />
                 

                 
                </div>
              </div>
            )}
          </div>

          {/* 201-3 Defined Benefit Plan Obligations */}
          <div className="bg-white p-3 rounded-md border border-gray-200">
            <h3 className="text-lg font-bold text-[#4639AA] mb-6 flex items-center gap-2">
              <Icon icon="mdi:account-cash" /> Defined Benefit Plan Obligations
            </h3>

            <InfoLabel
              label="Q1. Does the organization provide defined benefit pension plans?"
              info="Select Yes only if company guarantees fixed pension after retirement. If only provident fund or gratuity → Select No. "
            />

            <div className="flex gap-4 mb-6">
              {["yes", "no"].map((opt) => (
                <label key={opt} className="flex items-center gap-2">
                  <input
                    type="radio"
                    value={opt}
                    {...register("gri201.pension.exists")}
                    className="w-4 h-4 text-[#4639AA]"
                  />
                  <span className="capitalize text-sm">{opt}</span>
                </label>
              ))}
            </div>

            {watch("gri201.pension.exists") === "yes" && (
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-semibold  mb-1 block">
                    Pension funding structure
                  </label>
                  <select
                    {...register("gri201.pension.fundType")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
                  >
                    <option value="general">Covered through general funds</option>
                    <option value="separate">Separate pension fund exists</option>
                  </select>
                </div>

                {/* General fund: Q2 only */}
                {watch("gri201.pension.fundType") === "general" && (
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <InfoLabel
                        label="Q2. Estimated total pension liabilities"
                        info="Enter total future pension obligations from actuarial report."
                      />
                      <input
                        type="number"
                        {...register("gri201.pension.liabilities")}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]"
                        placeholder="e.g. 5000000"
                      />
                    </div>
                  </div>
                )}

                {/* Separate fund: Q3, Q4, Coverage Ratio, Strategy */}
                {watch("gri201.pension.fundType") === "separate" && (
                  <>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <InfoLabel
                          label="Q3. Total pension liabilities"
                          info="Enter total pension liabilities from actuarial report."
                        />
                        <input
                          type="number"
                          {...register("gri201.pension.liabilities")}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]"
                          placeholder="e.g. 5000000"
                        />
                      </div>
                      <div>
                        <label className="font-medium text-gray-700 mb-1 block">
                          Q4. Plan assets set aside
                        </label>
                        <input
                          type="number"
                          {...register("gri201.pension.planAssets")}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]"
                          placeholder="e.g. 2500000"
                        />
                      </div>
                    </div>
                    {/* Coverage Ratio and Strategy */}
                    {(() => {
                      const liabilities = Number(watch("gri201.pension.liabilities")) || 0;
                      const planAssets = Number(watch("gri201.pension.planAssets")) || 0;
                      const coverageRatio =
                        liabilities > 0 ? ((planAssets / liabilities) * 100).toFixed(1) : "0";
                      return (
                        <div className="bg-[#4639AA]/5 border border-[#4639AA]/15 p-4 rounded-lg mt-4">
                          <InfoLabel
                        label="Q6. Strategy to achieve full coverage"
                        info="Explain how company will close funding gap."
                      />
                          <div className="text-sm font-bold text-[#4639AA]">Coverage Ratio (%)</div>
                          <div className="text-2xl font-extrabold text-[#1893A1] mt-1">
                            {coverageRatio}%
                          </div>
                          
                         
                        </div>
                      );
                    })()}
                  </>
                )}

                {/* Contribution and Participation fields (always shown if pension exists) */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-medium text-gray-700 mb-1 block">
                      Q7. Contribution percentage – Employee %
                    </label>
                    <input
                      type="number"
                      {...register("gri201.pension.employeeContributionPct")}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]"
                      placeholder="e.g. 5"
                    />
                  </div>
                  <div>
                    <label className="font-medium text-gray-700 mb-1 block">
                      Q7. Contribution percentage – Employer %
                    </label>
                    <input
                      type="number"
                      {...register("gri201.pension.employerContributionPct")}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]"
                      placeholder="e.g. 10"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-medium text-gray-700 mb-1 block">
                      Q8. Participation – Enrolled employees
                    </label>
                    <input
                      type="number"
                      {...register("gri201.pension.enrolledEmployees")}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]"
                      placeholder="e.g. 120"
                    />
                  </div>
                  <div>
                    <label className="font-medium text-gray-700 mb-1 block">
                      Q8. Participation – Eligible employees
                    </label>
                    <input
                      type="number"
                      {...register("gri201.pension.eligibleEmployees")}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]"
                      placeholder="e.g. 150"
                    />
                  </div>
                </div>
                <div className="bg-[#1893A1]/5 border border-[#1893A1]/15 p-3 rounded-lg text-[#1893A1] font-bold text-right">
                  Participation Rate (%):{" "}
                  {Number(watch("gri201.pension.eligibleEmployees")) > 0
                    ? (
                      (Number(watch("gri201.pension.enrolledEmployees")) /
                        Number(watch("gri201.pension.eligibleEmployees"))) *
                      100
                    ).toFixed(1)
                    : "0.0"}
                  %
                </div>
              </div>
            )}
          </div>

          {/* 201-4 Financial Assistance from Government */}
          <div className="bg-white p-3 rounded-md border border-gray-200">
            <h3 className="text-lg font-bold text-[#4639AA] mb-6 flex items-center gap-2">
              <Icon icon="mdi:shield-account" /> Financial Assistance from Government
            </h3>

            <InfoLabel
              label="Q1. Government financial assistance received"
              info="Include tax relief, export rebates, subsidies, R&D grants (if applicable)."
            />

            <div className="flex gap-4 mb-6">
              {["yes", "no"].map((opt) => (
                <label key={opt} className="flex items-center gap-2">
                  <input
                    type="radio"
                    value={opt}
                    {...register("gri201.govtAssistance.exists")}
                    className="w-4 h-4 text-[#4639AA]"
                  />
                  <span className="capitalize text-sm">{opt}</span>
                </label>
              ))}
            </div>

            {watch("gri201.govtAssistance.exists") === "yes" && (
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse border border-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="p-2 border">Country</th>
                        <th className="p-2 border">Type</th>
                        <th className="p-2 border">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(watch("gri201.govtAssistance.items") || []).map((item, idx) => (
                        <tr key={idx}>
                          <td className="p-1 border">
                            <input
                              {...register(`gri201.govtAssistance.items.${idx}.country`)}
                              className="w-full p-1 border-none outline-none"
                              placeholder="e.g. Pakistan"
                            />
                          </td>
                          <td className="p-1 border">
                            <input
                              {...register(`gri201.govtAssistance.items.${idx}.type`)}
                              className="w-full p-1 border-none outline-none"
                              placeholder="e.g. Subsidy / tax relief"
                            />
                          </td>
                          <td className="p-1 border">
                            <input
                              type="number"
                              {...register(`gri201.govtAssistance.items.${idx}.amount`)}
                              className="w-full p-1 border-none outline-none"
                              placeholder="e.g. 100000"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setValue("gri201.govtAssistance.items", [
                      ...(watch("gri201.govtAssistance.items") || []),
                      { country: "", type: "", amount: 0 }
                    ])
                  }
                  className="text-xs text-[#4639AA] font-bold"
                >
                  + Add Assistance
                </button>

                <div className="bg-[#1893A1]/5 border border-[#1893A1]/15 p-3 rounded-lg text-[#1893A1] font-bold text-right">
                  Total Government Assistance: $
                  {(watch("gri201.govtAssistance.items") || [])
                    .reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0)
                    .toLocaleString()}
                </div>
              </div>
            )}
            <div className="mt-6">
              <label className="font-medium text-gray-700 mb-1 block">
                Q2. Is any government a shareholder?
              </label>
              <select
                {...register("gri201.govtAssistance.shareholderType")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
              >
                <option>No</option>
                <option>Yes - Minority</option>
                <option>Yes - Majority</option>
              </select>
            </div>
          </div>

        </>
      )}
    </div>
  );
//  Gri 202 Market Presence
  const renderGRI202 = () => (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white p-3 rounded-md border border-gray-200">
        <h3 className="text-lg font-bold text-[#4639AA] mb-6 flex items-center gap-2">
          <Icon icon="mdi:account-tie-outline" /> Market Presence
        </h3>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <InfoLabel
              label="Q1. Has Market Presence been identified as a material topic?"
              info="Select Yes if your hiring practices, salary levels, or preference for local suppliers are important for your business reputation, community relations, or compliance."
            />
            <div className="flex gap-4">
              {["yes", "no"].map(opt => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" value={opt} {...register("gri202.isMaterial")} className="w-4 h-4 text-[#4639AA]" />
                  <span className="capitalize text-sm">{opt}</span>
                </label>
              ))}
            </div>
          </div>
          {watch("gri202.isMaterial") === "yes" && (
            <>
              <div>
                <InfoLabel
                  label="Q2. How does the organization manage its market presence?"
                  info="Explain how your company sets employee salaries, ensures fair wages, hires locally, and supports local suppliers. Mention policies, HR procedures, or procurement rules if available."
                />
                <textarea {...register("gri202.managementDescription")} className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none min-h-[100px]" placeholder="Explain policy, HR procedures..." />
              </div>
              <div>
                <InfoLabel label="Q3. Who oversees market presence matters?"
                  info="Select who is responsible for salary decisions and local hiring practices. " />
                <select {...register("gri202.oversight")} className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none bg-white text-sm">
                  <option>HR Head</option>
                  <option>CEO / Owner</option>
                  <option>Board</option>
                  <option>Procurement Head</option>
                  <option>Other</option>
                </select>
              </div>
            </>
          )}
          {watch("gri202.isMaterial") === "no" && (
            <div className="mt-4 bg-[#4639AA]/5 border border-[#4639AA]/15 p-4 rounded-xl">
              <h4 className="text-sm font-bold text-[#4639AA] mb-3">Omission Logic (GRI 202)</h4>
              <ul className="list-disc pl-5 text-xs text-gray-600 space-y-1 mb-4">
                <li>Entry-level wage comparison not provided</li>
                <li>Local senior management percentage not calculated</li>
                <li>Local definition not explained</li>
              </ul>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <InfoLabel label="Reason for omission" info="Select reason for omitting GRI 202 disclosures." />
                  <select
                    {...register("gri202.omissionReason")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
                  >
                    <option value="">Select reason</option>
                    <option value="Not applicable">Not applicable</option>
                    <option value="Data unavailable">Data unavailable</option>
                    <option value="Legal restriction">Legal restriction</option>
                    <option value="Confidentiality">Confidentiality</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <InfoLabel label="Explanation (required)" info="Provide explanation for omission." />
                  <textarea
                    {...register("gri202.omissionExplanation")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[100px]"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {watch("gri202.isMaterial") === "yes" && (
        <>
          {/*GRI 202-1 Ratios of Standard Entry Level Wage by Gender Compared to Local Minimum Wage */}
          <div className="bg-white p-3 rounded-md border border-gray-200">
            <span className="flex items-start gap-2">
              <InfoHeading icon="mdi:cash-multiple"
                heading="Ratios of Standard Entry Level Wage by Gender Compared to Local Minimum Wage"
                info="This checks whether your company pays entry-level employees at least equal to or above legal minimum wage." />
            </span>

            <div className="space-y-6">

              {/* SECTION A: Significant Locations */}
              <section className="space-y-3">
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b pb-1">
                  Section A – Identify Significant Locations
                </h4>
                <InfoLabel
                  label="Q1. List significant locations of operation."
                  info="List all locations where you have offices, factories, or branches with significant employees. Example: Lahore factory, Dubai branch, Karachi warehouse."
                />
                <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-2 border" title="Location name (e.g., Lahore factory)">Location</th>
                      <th className="p-2 border" title="Country where the location is situated">Country</th>
                      <th className="p-2 border" title="Total number of employees at this location">Total Employees</th>
                      </tr>
                  </thead>
                  <tbody>
                    {(watch("gri202.locations") || []).map((loc, idx) => {
                      return (
                        <tr key={idx}>
                          <td className="p-1 border">
                            <input {...register(`gri202.locations.${idx}.name`)} className="w-full p-1 border-none outline-none" placeholder="Location Name" />
                          </td>
                          <td className="p-1 border">
                            <input {...register(`gri202.locations.${idx}.country`)} className="w-full p-1 border-none outline-none" placeholder="Country" />
                          </td>
                          <td className="p-1 border">
                            <input type="number" {...register(`gri202.locations.${idx}.employees`)} className="w-full p-1 border-none outline-none" placeholder="0" />
                          </td>
                          
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <button type="button" onClick={() => setValue("gri202.locations", [...(watch("gri202.locations") || []), { name: "", country: "", employees: 0, minWage: 0, maleWage: 0, femaleWage: 0 }])} className="text-xs text-[#4639AA] font-bold">+ Add Location</button>
              </section>

              {/* SECTION B: Entry-Level Wage Comparison */}
              {Array.isArray(watch("gri202.locations")) && watch("gri202.locations").length > 0 && (
                <section className="space-y-3">
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b pb-1">
                    Section B – Entry-Level Wage Comparison
                  </h4>
                  {watch("gri202.locations").map((loc, idx) => {
                    const mRatio = Number(loc.minWage) > 0 ? (Number(loc.maleWage) / Number(loc.minWage)).toFixed(2) : "0.00";
                    const fRatio = Number(loc.minWage) > 0 ? (Number(loc.femaleWage) / Number(loc.minWage)).toFixed(2) : "0.00";
                    const mNonCompliant = Number(mRatio) < 1 && Number(loc.maleWage) > 0 && Number(loc.minWage) > 0;
                    const fNonCompliant = Number(fRatio) < 1 && Number(loc.femaleWage) > 0 && Number(loc.minWage) > 0;
                    return (
                      <div key={idx} className=" rounded p-3 mb-4 space-y-3 bg-gray-50/80">
                        <div className="">
                          <InfoLabel
                            label="Q2. What is the local minimum wage?"
                            info="Enter the official government minimum wage for that location. In Pakistan: Provincial minimum wage notification. In UAE: Check Ministry of Human Resources guidelines."
                          />
                          <input type="number" {...register(`gri202.locations.${idx}.minWage`)} className="w-full p-1 border-none outline-none" placeholder="e.g. 25000" />
                        </div>
                        <div className="">
                          <InfoLabel
                            label="Q3. What is the standard entry-level wage for male employees?"
                            info="Enter the starting salary paid to new male employees in the lowest category (excluding interns)."
                          />
                          <input type="number" {...register(`gri202.locations.${idx}.maleWage`)} className={`w-full p-1 border-none outline-none ${mNonCompliant ? 'border-red-500 bg-red-50' : ''}`} placeholder="e.g. 27000" />
                          {mNonCompliant && (
                            <div className="text-xs text-red-600 mt-1">Non-compliant: Male entry wage is below minimum wage.</div>
                          )}
                        </div>
                        <div className="">
                          <InfoLabel
                            label="Q4. What is the standard entry-level wage for female employees?"
                            info="Enter the starting salary paid to new female employees in the lowest category."
                          />
                          <input type="number" {...register(`gri202.locations.${idx}.femaleWage`)} className={`w-full p-1 border-none outline-none ${fNonCompliant ? 'border-red-500 bg-red-50' : ''}`} placeholder="e.g. 27000" />
                          {fNonCompliant && (
                            <div className="text-xs text-red-600 mt-1">Non-compliant: Female entry wage is below minimum wage.</div>
                          )}
                        </div>
                        <div className="flex gap-4 mt-2">
                          <div className={`px-2 py-1.5 border font-medium rounded ${Number(mRatio) >= 1 ? 'text-green-500/90 border-green-100 bg-green-50/80' : 'text-red-500/90 border-red-100 bg-red-50/80'}`}
                            title="Male Wage Ratio = Male Entry Wage ÷ Local Minimum Wage">
                            Male Ratio: {mRatio}
                          </div>
                          <div className={`px-2 py-1.5 border font-medium rounded ${Number(fRatio) >= 1 ? 'text-green-500/90 border-green-100 bg-green-50/80' : 'text-red-500/90 border-red-100 bg-red-50/80'}`}
                            title="Female Wage Ratio = Female Entry Wage ÷ Local Minimum Wage">
                            Female Ratio: {fRatio}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </section>
              )}
              
              <div className="mt-4">
                <InfoLabel
                  label="Q5. Is there a significant variation in wage ratio between men and women?"
                  info="If male and female entry wages are different, explain why."
                />
                <select
                  {...register("gri202.wageVariation")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
                >
                  <option value="">Select option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              {watch("gri202.wageVariation") === "yes" && (
                <div className="mt-4">
                  <label className="font-medium text-gray-700 mb-1 block">
                    Explanation (required if Yes)
                  </label>
                  
                  <textarea
                    {...register("gri202.wageVariationExplanation")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[120px]"
                    placeholder="e.g. Different entry-level roles, pay scales, or tenure policies..."
                  />
                </div>
              )}
            </div>
          </div>

          {/*GRI 202-2 Proportion of Senior Management Hired from Local Community */}
          <div className="bg-white p-3 rounded-md border border-gray-200">
            <span className="flex items-start gap-2">
              <InfoHeading icon="mdi:account-group"
                heading="Proportion of Senior Management Hired from Local Community"
                info="This shows whether your top management is hired locally or from outside the country/region." />
            </span>
            <h3 className="text-lg font-bold text-[#4639AA] mb-6 flex items-center gap-2">
              <Icon icon="" />

            </h3>

            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b pb-1 mt-4">
              Section A - Define Senior Management
            </h4>
            <div className="mt-4">
              <InfoLabel
                label="Q1. Define who is considered senior management."
                info="Senior management can include Directors, CEO, CFO, General Manager, and Factory Manager."
              />
              <input
                {...register("gri202.seniorManagement.definitionScope")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]"
                placeholder="e.g. Directors, CEO, CFO, General Managers"
              />
            </div>
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 border-b pb-1 mt-5">
              Section B - Local Hiring Data
            </h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="font-medium text-gray-700 mb-1 block">
                  Q2. Total number of senior management employees
                </label>
                <input type="number" {...register("gri202.seniorManagement.total")} className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none" />
              </div>
              <div>
                <InfoLabel
                  label="Q3. Number of senior management hired from local community"
                  info="Local community may mean same country, province/emirate, or city based on your organization definition."
                />
                <input type="number" {...register("gri202.seniorManagement.local")} className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none" />
              </div>
            </div>
            <div className="mt-4 bg-[#4639AA]/5 p-3 rounded-lg text-[#4639AA] font-bold text-center">
              Local Hiring Percentage: {Number(watch("gri202.seniorManagement.total")) > 0 ? ((Number(watch("gri202.seniorManagement.local")) / Number(watch("gri202.seniorManagement.total"))) * 100).toFixed(1) : "0"}%
            </div>

            <div className="mt-4">
              <InfoLabel
                label="Q4. How does the organization define “local”?"
                info="Explain whether local means same city, province, or country (based on your company definition)."
              />
              <textarea
                {...register("gri202.seniorManagement.definition")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[80px]"
                placeholder="e.g. Same country"
              />
            </div>

            {Number(watch("gri202.seniorManagement.total")) > 0 &&
              (Number(watch("gri202.seniorManagement.local")) /
                Number(watch("gri202.seniorManagement.total"))) *
              100 <
              50 && (
                <div className="mt-4">
                  <InfoLabel
                    label="Q5. If local hiring percentage is low, explain why"
                    info="Possible reasons: skills not available locally, specialized expertise required, global leadership structure."
                  />
                  <textarea
                    {...register("gri202.seniorManagement.lowLocalReason")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[100px]"
                    placeholder="e.g. Specialized finance expertise is not available locally..."
                  />
                </div>
              )}
          </div>
        </>
      )}
    </div>
  );
//  Gri 203 Indirect Economic Impacts
  const renderGRI203 = () => (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white p-3 rounded-md border border-gray-200">
        <h3 className="text-lg font-bold text-[#4639AA] mb-6 flex items-center gap-2">
          <Icon icon="mdi:leaf" /> Indirect Economic Impacts
        </h3>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <InfoLabel
              label="Q1. Has Indirect Economic Impact been identified as a material topic?"
              info="Select Yes if your business activities significantly affect local employment, infrastructure development, small businesses, community income, or the local economy. Example: Factory creates jobs in rural area."
            />
            <div className="flex gap-4">
              {["yes", "no"].map(opt => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" value={opt} {...register("gri203.isMaterial")} className="w-4 h-4 text-[#4639AA]" />
                  <span className="capitalize text-sm">{opt}</span>
                </label>
              ))}
            </div>
          </div>
          {watch("gri203.isMaterial") === "no" && (
            <div className="mt-4 bg-[#4639AA]/5 border border-[#4639AA]/15 p-4 rounded-xl">
              <h4 className="text-sm font-bold text-[#4639AA] mb-3">Omission Logic (GRI 203)</h4>
              <ul className="list-disc pl-5 text-xs text-gray-600 space-y-1 mb-4">
                <li>Infrastructure investment not assessed</li>
                <li>Indirect impacts not described</li>
              </ul>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <InfoLabel label="Reason for omission" info="Select reason for omitting GRI 203 disclosures." />
                  <select
                    {...register("gri203.omissionReason")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
                  >
                    <option value="">Select reason</option>
                    <option value="Not applicable">Not applicable</option>
                    <option value="Data unavailable">Data unavailable</option>
                    <option value="Confidentiality">Confidentiality</option>
                    <option value="Legal restriction">Legal restriction</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <InfoLabel label="Explanation (required)" info="Provide explanation for omission." />
                  <textarea
                    {...register("gri203.omissionExplanation")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[100px]"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {watch("gri203.isMaterial") === "yes" && (
        <>
          <div className="bg-white p-3 rounded-md border border-gray-200">
            <div className="space-y-6">
              <div>
                <InfoLabel
                  label="Q2. How does the organization manage its indirect economic impacts?"
                  info="Explain how your company contributes to economic development.
                    Examples:
                    • Hiring locally
                    • Building infrastructure
                    • Supporting SMEs
                    • Creating supply chain jobs
                    Mention policies or business strategy if applicable.
                    "
                />
                <textarea
                  {...register("gri203.managementDescription")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none min-h-[110px] focus:border-[#4639AA]"
                  placeholder="Describe your approach to managing indirect economic impacts..."
                />
              </div>

              <div>
                <label className="font-medium text-gray-700 mb-1 block">
                  Q3. Who is responsible for overseeing economic impact on communities?
                </label>
                
                <select
                  {...register("gri203.oversight")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none bg-white text-sm focus:border-[#4639AA]"
                >
                  <option>CEO / Owner</option>
                  <option>CSR Head</option>
                  <option>Operations Head</option>
                  <option>Board</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white p-3 rounded-md border border-gray-200">
            <span className="flex items-start gap-2 mb-2">
              <InfoHeading icon="mdi:bridge"
                heading="Infrastructure Investments and Services Supported"
                info="This section reports investments made to support public infrastructure or community services." />
            </span>

            <div className="space-y-4">

              <InfoLabel
                label="Q1. Has the organization invested in infrastructure or community services?"
                info="Examples: Building roads, installing water systems, school construction, health clinics, and renewable energy projects for community."
              />
              <div className="flex gap-4 mb-4">
                {["yes", "no"].map(opt => (
                  <label key={opt} className="flex items-center gap-2">
                    <input type="radio" value={opt} {...register("gri203.infrastructure.exists")} className="w-4 h-4 text-[#4639AA]" />
                    <span className="capitalize text-sm">{opt}</span>
                  </label>
                ))}
              </div>
              {watch("gri203.infrastructure.exists") === "yes" && (
                <div className="overflow-x-auto">
                  <div className="mb-2">
                    <label className="font-medium text-gray-700 mb-1 block">
                      Infrastructure Investment Table</label>
                  </div>
                  <table className="w-full text-xs text-left border-collapse border border-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="p-2 border">Project Name</th>
                        <th className="p-2 border">Location</th>
                        <th className="p-2 border">Type</th>
                        <th className="p-2 border">Amount Invested</th>
                        <th className="p-2 border">Public/Private</th>
                        <th className="p-2 border">Commercial/Pro-bono</th>
                        <th className="p-2 border">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(watch("gri203.infrastructure.projects") || []).map((p, idx) => (
                        <tr key={idx}>
                          <td className="p-1 border">
                            <input
                              {...register(`gri203.infrastructure.projects.${idx}.name`)}
                              className="w-full p-1 border-none outline-none"
                              placeholder="Project name"
                            />
                          </td>
                          <td className="p-1 border">
                            <input
                              {...register(`gri203.infrastructure.projects.${idx}.location`)}
                              className="w-full p-1 border-none outline-none"
                              placeholder="Location"
                            />
                          </td>
                          <td className="p-1 border">
                            <select
                              {...register(`gri203.infrastructure.projects.${idx}.type`)}
                              className="w-full p-1 border-none outline-none bg-transparent"
                              title="Select category of support."
                            >
                              <option>Transport</option>
                              <option>Energy</option>
                              <option>Water & Sanitation</option>
                              <option>Education</option>
                              <option>Health</option>
                              <option>Digital infrastructure</option>
                              <option>Other</option>
                            </select>
                          </td>
                          <td className="p-1 border">
                            <input
                              type="number"
                              {...register(`gri203.infrastructure.projects.${idx}.amount`)}
                              className="w-full p-1 border-none outline-none"
                              placeholder="0"
                            />
                          </td>
                          <td className="p-1 border">
                            <select
                              {...register(`gri203.infrastructure.projects.${idx}.publicPrivate`)}
                              className="w-full p-1 border-none outline-none bg-transparent"
                              title="Public = benefits general community. Private = supports business operations only."
                            >
                              <option>Public</option>
                              <option>Private</option>
                            </select>
                          </td>
                          <td className="p-1 border">
                            <select
                              {...register(`gri203.infrastructure.projects.${idx}.commercialProBono`)}
                              className="w-full p-1 border-none outline-none bg-transparent"
                              title="Commercial = business benefit expected. Pro-bono = voluntary / CSR support."
                            >
                              <option>Commercial</option>
                              <option>Pro-bono</option>
                            </select>
                          </td>
                          <td className="p-1 border">
                            <select
                              {...register(`gri203.infrastructure.projects.${idx}.status`)}
                              className="w-full p-1 border-none outline-none bg-transparent"
                            >
                              <option>Ongoing</option>
                              <option>Completed</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button
                    type="button"
                    onClick={() =>
                      setValue("gri203.infrastructure.projects", [
                        ...(watch("gri203.infrastructure.projects") || []),
                        {
                          name: "",
                          location: "",
                          type: "Transport",
                          amount: 0,
                          publicPrivate: "Public",
                          commercialProBono: "Commercial",
                          status: "Ongoing"
                        }
                      ])
                    }
                    className="mt-2 text-xs text-[#4639AA] font-bold"
                  >
                    + Add Project
                  </button>
                  <div className="mt-3 bg-[#1893A1]/5 border border-[#1893A1]/15 p-3 rounded-lg text-[#1893A1] font-bold text-right">
                    <div className="text-left text-xs font-semibold mb-1"></div>
                    Total Infrastructure Investment: $
                    {(watch("gri203.infrastructure.projects") || [])
                      .reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0)
                      .toLocaleString()}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white p-3 rounded-md border border-gray-200">
            <span className="flex items-start gap-2 mb-2">
              <InfoHeading icon="mdi:bullseye-arrow"
                heading="Significant Indirect Economic Impacts"
                info="This describes positive or negative economic impacts your business creates indirectly." />
            </span>

            <div className="space-y-4">
              <InfoLabel
                label="Q1. Describe significant indirect economic impacts."
                info="Examples: Positive - job creation, skill development, local supplier growth. Negative - increased housing cost, traffic congestion, environmental degradation affecting farmers. Explain impact clearly."
              />
              <textarea {...register("gri203.impacts.description")} className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none min-h-[100px]" placeholder="Job creation, skill development, local supplier growth..." />
              <div className="flex gap-6">
                <div className="flex-1">
                  <label className="font-medium text-gray-700 mb-1 block">Q2. Are these impacts positive, negative, or both?</label>
                  <select {...register("gri203.impacts.type")} className="w-full px-3 py-3 border border-gray-300 rounded-lg outline-none bg-white">
                    <option>Positive</option><option>Negative</option><option>Both</option>
                  </select>
                </div>
                <div className="flex-1">
                  <InfoLabel
                    label="Q3. Does the organization measure these impacts quantitatively?"
                    info="Select Yes if you track numbers like: Jobs created, Supplier growth, Income increase"
                  />

                  <select {...register("gri203.impacts.measured")} className="w-full px-3 py-3 border border-gray-300 rounded-lg outline-none bg-white">
                    <option value="no">No</option><option value="yes">Yes</option>
                  </select>
                </div>
              </div>

              {watch("gri203.impacts.measured") === "yes" && (
                <div className="mt-2">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <h4 className="text-sm font-bold text-[#4639AA]">Impact Metrics (Optional)</h4>
                    <button
                      type="button"
                      onClick={() =>
                        setValue("gri203.impacts.metrics", [
                          ...(watch("gri203.impacts.metrics") || []),
                          { impactType: watch("gri203.impacts.type") || "Positive", indicator: "", value: 0, unit: "" }
                        ])
                      }
                      className="text-xs text-[#4639AA] font-bold"
                    >
                      + Add Metric
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left border-collapse border border-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="p-2 border">Impact Type</th>
                          <th className="p-2 border">Indicator</th>
                          <th className="p-2 border">Value</th>
                          <th className="p-2 border">Unit</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(watch("gri203.impacts.metrics") || []).map((m, idx) => (
                          <tr key={idx}>
                            <td className="p-1 border">
                              <select
                                {...register(`gri203.impacts.metrics.${idx}.impactType`)}
                                className="w-full p-1 border-none outline-none bg-transparent"
                              >
                                <option>Positive</option>
                                <option>Negative</option>
                                <option>Both</option>
                              </select>
                            </td>
                            <td className="p-1 border">
                              <input
                                {...register(`gri203.impacts.metrics.${idx}.indicator`)}
                                className="w-full p-1 border-none outline-none"
                                placeholder="e.g. Jobs created"
                              />
                            </td>
                            <td className="p-1 border">
                              <input
                                type="number"
                                {...register(`gri203.impacts.metrics.${idx}.value`)}
                                className="w-full p-1 border-none outline-none"
                                placeholder="0"
                              />
                            </td>
                            <td className="p-1 border">
                              <input
                                {...register(`gri203.impacts.metrics.${idx}.unit`)}
                                className="w-full p-1 border-none outline-none"
                                placeholder="e.g. People"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
//  Gri 204 Procurement Practices
  const renderGRI204 = () => {
    // Watchers for calculations
    const totalSpend = Number(watch('gri204.totalSpend')) || 0;
    const localSpend = Number(watch('gri204.localSpend')) || 0;
    const localPct = totalSpend > 0 ? ((localSpend / totalSpend) * 100).toFixed(1) : '0.0';

    return (
      <div className="space-y-8 animate-fadeIn">
        <div className="bg-white p-3 rounded-md border border-gray-200">
          <h3 className="text-lg font-bold text-[#4639AA] mb-6 flex items-center gap-2">
            <Icon icon="mdi:weather-partly-cloudy" /> PROCUREMENT PRACTICES
          </h3>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <InfoLabel
                label="Q1. Has Procurement Practices been identified as a material topic?"
                info={
                  <span>
                    Select Yes if supplier selection and local procurement significantly affect:<br />
                    • Local economy<br />
                    • Cost structure<br />
                    • ESG risk<br />
                    • Supply chain transparency
                  </span>
                }
              />
              <div className="flex gap-4">
                {['yes', 'no'].map(opt => (
                  <label key={opt} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" value={opt} {...register('gri204.isMaterial')}
                      className="w-4 h-4 text-[#4639AA] focus:ring-[#4639AA]" />
                    <span className="capitalize text-sm text-gray-700">{opt}</span>
                  </label>
                ))}
              </div>
            </div>
            {watch('gri204.isMaterial') === 'yes' && (
              <>
                <div>
                  <InfoLabel
                    label="Q2. How does the organization manage supplier selection?"
                    info={
                      <span>
                        Explain:<br />
                        • How suppliers are selected<br />
                        • Whether local suppliers are preferred<br />
                        • Whether ESG criteria are used<br />
                        Mention procurement policy if available.
                      </span>
                    }
                  />
                  <textarea
                    {...register('gri204.managementDescription')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[100px]"
                    placeholder="Describe supplier selection, local preference, ESG criteria, procurement policy..."
                  />
                </div>
                <div>
                  <label className="font-medium mb-2 text-gray-700 flex items-center gap-1">Q3. Who oversees procurement?</label>

                  <select {...register('gri204.oversight')} className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm">
                    <option>Procurement Head</option>
                    <option>Operations Head</option>
                    <option>CEO</option>
                    <option>Finance Head</option>
                    <option>Other</option>
                  </select>
                </div>
              </>
            )}
            {watch('gri204.isMaterial') === 'no' && (
              <div className="mt-4 bg-[#4639AA]/5 border border-[#4639AA]/15 p-4 rounded-xl">
                <h4 className="text-sm font-bold text-[#4639AA] mb-3">Omission Logic – GRI 204</h4>
                <ul className="list-disc pl-5 text-xs text-gray-600 space-y-1 mb-4">
                  <li>Local definition missing</li>
                  <li>Total procurement not reported</li>
                  <li>Local procurement percentage not calculated</li>
                </ul>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <InfoLabel label="Reason for omission" info="Select reason for omitting GRI 204 disclosures." />
                    <select
                      {...register('gri204.omissionReason')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
                    >
                      <option value="">Select reason</option>
                      <option value="Not applicable">Not applicable</option>
                      <option value="Data unavailable">Data unavailable</option>
                      <option value="Confidentiality">Confidentiality</option>
                      <option value="Legal restriction">Legal restriction</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <InfoLabel label="Explanation (required)" info="Provide explanation for omission." />
                    <textarea
                      {...register('gri204.omissionExplanation')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[100px]"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {watch('gri204.isMaterial') === 'yes' && (
          <>
            <div className="bg-white p-3 rounded-md border border-gray-200">
              <InfoHeading icon="mdi:cash-multiple"
                heading="Proportion of Spending on Local Suppliers"
                info="This measures how much of your total purchasing is spent on local suppliers." />
             
              <div className="space-y-6 mt-4">
                <section className="space-y-4">
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b pb-1">Section A – Define Local Supplier</h4>
                  <InfoLabel
                    label="Q1. How does the organization define 'local supplier'?"
                    info={
                      <span>
                        Local can mean:<br />
                        • Same city<br />
                        • Same province<br />
                        • Same country<br />
                        Define clearly.
                      </span>
                    }
                  />
                  <input
                    {...register('gri204.localDefinition')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]"
                    placeholder="e.g. Same city, province, or country"
                  />
                </section>
                <section className="space-y-4">
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b pb-1">Section B – Procurement Data</h4>
                  <InfoLabel
                    label="Q2. Total procurement spending for the reporting period"
                    info="Enter total payments made to suppliers (raw materials, services, contractors). Take from income statement or procurement records."
                  />
                  <input
                    type="number"
                    {...register('gri204.totalSpend')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]"
                    placeholder="Total procurement spend (currency)"
                  />
                  <InfoLabel
                    label="Q3. Amount spent on local suppliers"
                    info="Enter total spending on suppliers that meet your definition of 'local'."
                  />
                  <input
                    type="number"
                    {...register('gri204.localSpend')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]"
                    placeholder="Local supplier spend (currency)"
                  />
                  <div className="bg-[#4639AA]/5 border border-[#4639AA]/15 p-3 rounded-lg text-[#4639AA] font-bold text-right mt-2">
                    Local Procurement Percentage (%): {localPct}%
                  </div>
                </section>
                <section className="space-y-4">
                  <label className=" font-medium text-gray-700 block mb-1">
                    Q4. Provide breakdown by significant locations (if applicable)</label>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left border-collapse border border-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="p-2 border">Location</th>
                          <th className="p-2 border">Total Procurement</th>
                          <th className="p-2 border">Local Procurement</th>
                          <th className="p-2 border">% Local (Auto)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {breakdownRows.map((row, idx) => {
                          const pct = Number(row.total) > 0 ? ((Number(row.local) / Number(row.total)) * 100).toFixed(1) : '0.0';
                          return (
                            <tr key={idx}>
                              <td className="p-1 border">
                                <input
                                  value={row.location}
                                  onChange={e => {
                                    const updated = [...breakdownRows];
                                    updated[idx].location = e.target.value;
                                    setBreakdownRows(updated);
                                  }}
                                  className="w-full p-1 border-none outline-none"
                                  placeholder="Location"
                                />
                              </td>
                              <td className="p-1 border">
                                <input
                                  type="number"
                                  value={row.total}
                                  onChange={e => {
                                    const updated = [...breakdownRows];
                                    updated[idx].total = e.target.value;
                                    setBreakdownRows(updated);
                                  }}
                                  className="w-full p-1 border-none outline-none"
                                  placeholder="0"
                                />
                              </td>
                              <td className="p-1 border">
                                <input
                                  type="number"
                                  value={row.local}
                                  onChange={e => {
                                    const updated = [...breakdownRows];
                                    updated[idx].local = e.target.value;
                                    setBreakdownRows(updated);
                                  }}
                                  className="w-full p-1 border-none outline-none"
                                  placeholder="0"
                                />
                              </td>
                              <td className="p-2 border font-bold bg-gray-50">{pct}%</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <button
                    type="button"
                    onClick={() => setBreakdownRows([...breakdownRows, { location: '', total: 0, local: 0 }])}
                    className="text-xs text-[#4639AA] font-bold mt-2"
                  >
                    + Add Location Row
                  </button>
                  
                </section>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };
//  Gri 205 Anti-Corruption
  const renderGRI205 = () => (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white p-3 rounded-md border border-gray-200">
        <h3 className="text-lg font-bold text-[#4639AA] mb-6 flex items-center gap-2">
          <Icon icon="mdi:handshake" /> ANTI-CORRUPTION
        </h3>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <InfoLabel
              label="Q1. Has Anti-Corruption been identified as a material topic?"
              info={<span>Select Yes if your business faces risks related to:<br />• Bribery<br />• Facilitation payments<br />• Kickbacks<br />• Fraud<br />• Conflict of interest<br /><br />In Pakistan and UAE, this is usually relevant for companies dealing with:<br />• Government contracts<br />• Customs<br />• Licensing authorities<br />• Large procurement contracts</span>}
            />
            <div className="flex gap-4">
              {['yes', 'no'].map(opt => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" value={opt} {...register('gri205.isMaterial')} className="w-4 h-4 text-[#4639AA] focus:ring-[#4639AA]" />
                  <span className="capitalize text-sm text-gray-700">{opt}</span>
                </label>
              ))}
            </div>
          </div>
          {watch('gri205.isMaterial') === 'yes' && (
            <>
              <div>
                <InfoLabel
                  label="Q2. Does the organization have an Anti-Corruption Policy?"
                  info="Select Yes if you have a written policy prohibiting bribery, corruption, and unethical payments."
                />
                <div className="flex gap-4">
                  {['yes', 'no'].map(opt => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" value={opt} {...register('gri205.hasPolicy')} className="w-4 h-4 text-[#4639AA] focus:ring-[#4639AA]" />
                      <span className="capitalize text-sm text-gray-700">{opt}</span>
                    </label>
                  ))}
                </div>
                {watch('gri205.hasPolicy') === 'yes' && (
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Upload Policy Document</label>
                    <label className="relative flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-[#4639AA]/40 rounded-xl cursor-pointer bg-slate-50 hover:border-[#4639AA] transition">
                      <Icon className="text-4xl text-gray-300 mb-2"
                        icon="mdi:cloud-upload-outline"/>
                      <p className="text-sm font-medium text-gray-700">
                        Click to upload or drag & drop</p>
                      <p className="text-xs text-gray-500 mt-1">
                        PDF, DOC, XLS, PNG, JPG • Max 5MB per file</p>
                      <input type="file" multiple className="absolute inset-0 opacity-0 cursor-pointer"/>
                    </label>
                  </div>
                )}
              </div>
              <div>
                <InfoLabel
                  label="Q3. How are corruption risks identified and managed?"
                  info={<span>Explain how you prevent corruption:<br />• Approval processes<br />• Dual signatories<br />• Internal audit<br />• Vendor due diligence<br />• Whistleblowing channel</span>}
                />
                <textarea
                  {...register('gri205.riskManagement')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[100px]"
                  placeholder="Describe risk identification, controls, audits, due diligence, whistleblowing..."
                />
              </div>
              <div>
                <label className=" font-medium text-gray-700 block mb-1">
                  Q4. Who oversees anti-corruption compliance?</label>
                <select {...register('gri205.oversight')} className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm">
                  <option>CEO / Owner</option>
                  <option>Compliance Officer</option>
                  <option>Finance Head</option>
                  <option>Internal Auditor</option>
                  <option>Board</option>
                  <option>Other</option>
                </select>
              </div>
            </>
          )}
          {watch('gri205.isMaterial') === 'no' && (
            <div className="mt-4 bg-[#4639AA]/5 border border-[#4639AA]/15 p-4 rounded-xl">
              <h4 className="text-sm font-bold text-[#4639AA] mb-3">Omission Logic – GRI 205</h4>
              <ul className="list-disc pl-5 text-xs text-gray-600 space-y-1 mb-4">
                <li>No policy</li>
                <li>No risk assessment</li>
                <li>No training data</li>
                <li>Incidents not disclosed</li>
              </ul>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <InfoLabel label="Reason for omission" info="Select reason for omitting GRI 205 disclosures." />
                  <select
                    {...register('gri205.omissionReason')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
                  >
                    <option value="">Select reason</option>
                    <option value="Not applicable">Not applicable</option>
                    <option value="Data unavailable">Data unavailable</option>
                    <option value="Confidentiality">Confidentiality</option>
                    <option value="Legal restriction">Legal restriction</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <InfoLabel label="Explanation (required)" info="Provide explanation for omission." />
                  <textarea
                    {...register('gri205.omissionExplanation')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[100px]"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {watch('gri205.isMaterial') === 'yes' && (
        <>
          {/* 205-1 Operations Assessed for Risks Related to Corruption */}
          <div className="bg-white p-3 rounded-md border border-gray-200">
            <h3 className="text-lg font-bold text-[#4639AA] mb-6 flex items-center gap-2">
              <Icon icon="mdi:file-document-outline" /> Operations Assessed for Risks Related to Corruption
            </h3>
            <div className="space-y-6">
              <div>
                <InfoLabel
                  label="Q1. Total number of operations"
                  info="Operations include factories, branches, offices, major projects."
                />
                <input
                  type="number"
                  {...register('gri205.totalOperations')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]"
                  placeholder="Total operations"
                />
              </div>

              <div>
                <InfoLabel
                  label="Q2. Number of operations assessed for corruption risk"
                  info="Select number of locations where corruption risk assessment was conducted."
                />
                <input
                  type="number"
                  {...register('gri205.assessedOperations')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]"
                  placeholder="Assessed operations"
                />
              </div>
              <div className="bg-[#4639AA]/5 border border-[#4639AA]/15 p-3 rounded-lg text-[#4639AA] font-bold text-right mt-2">
                Assessment Coverage (%): {coveragePct}%
              </div>

              <div>
                <InfoLabel
                  label="Q3. Identify significant corruption risks found"
                  info="Examples: Licensing delays, customs clearance, government tender bidding, high-cash transactions."
                />
                <textarea
                  {...register('gri205.risksFound')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[80px]"
                  placeholder="Describe significant risks..."
                />
              </div>
            </div>
          </div>

          {/* 205-2 Communication and Training on Anti-Corruption */}
          <div className="bg-white p-3 rounded-md border border-gray-200">
            <h3 className="text-lg font-bold text-[#4639AA] mb-6 flex items-center gap-2">
              <Icon icon="mdi:account-group" /> Communication and Training on Anti-Corruption
            </h3>
            <div className="space-y-5">
              <div>
                <label className=" font-medium text-gray-700 block mb-1">
                  Q1. Is anti-corruption policy communicated to employees?</label>
                <div className="flex gap-4">
                  {['yes', 'no'].map(opt => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" value={opt} {...register('gri205.policyCommunicated')} className="w-4 h-4 text-[#4639AA] focus:ring-[#4639AA]" />
                      <span className="capitalize text-sm text-gray-700">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className=" font-medium text-gray-700 block mb-1">
                  Q2. Is training provided?</label>

                <div className="flex gap-4">
                  {['yes', 'no'].map(opt => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" value={opt} {...register('gri205.trainingProvided')} className="w-4 h-4 text-[#4639AA] focus:ring-[#4639AA]" />
                      <span className="capitalize text-sm text-gray-700">{opt}</span>
                    </label>
                  ))}
                </div>
                {watch('gri205.trainingProvided') === 'yes' && (
                  <div className="space-y-4 mt-2">
                    <label className=" font-medium text-gray-700 block mb-1">Training Table</label>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left border-collapse border border-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="p-2 border">Employee Category</th>
                            <th className="p-2 border">Total Employees</th>
                            <th className="p-2 border">Employees Trained</th>
                            <th className="p-2 border">% Trained (Auto)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {acTrainingRows.map((row, idx) => {
                            const pct = Number(row.total) > 0 ? ((Number(row.trained) / Number(row.total)) * 100).toFixed(1) : '0.0';
                            return (
                              <tr key={idx}>
                                <td className="p-1 border">
                                  <input
                                    value={row.category}
                                    onChange={e => {
                                      const updated = [...acTrainingRows];
                                      updated[idx].category = e.target.value;
                                      setAcTrainingRows(updated);
                                    }}
                                    className="w-full p-1 border-none outline-none"
                                    placeholder="Category"
                                  />
                                </td>
                                <td className="p-1 border">
                                  <input
                                    type="number"
                                    value={row.total}
                                    onChange={e => {
                                      const updated = [...acTrainingRows];
                                      updated[idx].total = e.target.value;
                                      setAcTrainingRows(updated);
                                    }}
                                    className="w-full p-1 border-none outline-none"
                                    placeholder="0"
                                  />
                                </td>
                                <td className="p-1 border">
                                  <input
                                    type="number"
                                    value={row.trained}
                                    onChange={e => {
                                      const updated = [...acTrainingRows];
                                      updated[idx].trained = e.target.value;
                                      setAcTrainingRows(updated);
                                    }}
                                    className="w-full p-1 border-none outline-none"
                                    placeholder="0"
                                  />
                                </td>
                                <td className="p-2 border font-bold bg-gray-50">{pct}%</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAcTrainingRows([...acTrainingRows, { category: '', total: 0, trained: 0 }])}
                      className="text-xs text-[#4639AA] font-bold mt-2"
                    >
                      + Add Category Row
                    </button>
                    
                  </div>
                )}
              </div>
              <div>
                <InfoLabel
                  label="Q3. Is policy communicated to business partners?"
                  info="Select Yes if suppliers, contractors, agents are informed of anti-corruption policy."
                />
                <div className="flex gap-4">
                  {['yes', 'no'].map(opt => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" value={opt} {...register('gri205.policyToPartners')} className="w-4 h-4 text-[#4639AA] focus:ring-[#4639AA]" />
                      <span className="capitalize text-sm text-gray-700">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 205-3 Confirmed Incidents of Corruption */}
          <div className="bg-white p-3 rounded-md border border-gray-200">
            <h3 className="text-lg font-bold text-[#4639AA] mb-6 flex items-center gap-2">
              <Icon icon="mdi:alert-octagon-outline" />  Confirmed Incidents of Corruption
            </h3>
            <div className="space-y-5">
              <div>
              <label className=" font-medium text-gray-700 block mb-1">
                Q1. Number of confirmed corruption incidents
              </label>

              <input
                type="number"
                {...register('gri205.incidents')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]"
                placeholder="0"
                min={0}
              />
              </div>
              {Number(watch('gri205.incidents')) > 0 && (
                <div className="space-y-4 mt-2">
                  <label className="text-sm font-medium text-gray-700 block mb-1">
                    Incident Table</label>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left border-collapse border border-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="p-2 border">Incident Type</th>
                          <th className="p-2 border">Employees Disciplined</th>
                          <th className="p-2 border">Contracts Terminated</th>
                          <th className="p-2 border">Legal Cases</th>
                        </tr>
                      </thead>
                      <tbody>
                        {acIncidentRows.map((row, idx) => (
                          <tr key={idx}>
                            <td className="p-1 border">
                              <input
                                value={row.type}
                                onChange={e => {
                                  const updated = [...acIncidentRows];
                                  updated[idx].type = e.target.value;
                                  setAcIncidentRows(updated);
                                }}
                                className="w-full p-1 border-none outline-none"
                                placeholder="Type"
                              />
                            </td>
                            <td className="p-1 border">
                              <input
                                type="number"
                                value={row.disciplined}
                                onChange={e => {
                                  const updated = [...acIncidentRows];
                                  updated[idx].disciplined = e.target.value;
                                  setAcIncidentRows(updated);
                                }}
                                className="w-full p-1 border-none outline-none"
                                placeholder="0"
                              />
                            </td>
                            <td className="p-1 border">
                              <input
                                type="number"
                                value={row.terminated}
                                onChange={e => {
                                  const updated = [...acIncidentRows];
                                  updated[idx].terminated = e.target.value;
                                  setAcIncidentRows(updated);
                                }}
                                className="w-full p-1 border-none outline-none"
                                placeholder="0"
                              />
                            </td>
                            <td className="p-1 border">
                              <input
                                type="number"
                                value={row.legal}
                                onChange={e => {
                                  const updated = [...acIncidentRows];
                                  updated[idx].legal = e.target.value;
                                  setAcIncidentRows(updated);
                                }}
                                className="w-full p-1 border-none outline-none"
                                placeholder="0"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAcIncidentRows([...acIncidentRows, { type: '', disciplined: 0, terminated: 0, legal: 0 }])}
                    className="text-xs text-[#4639AA] font-bold mt-2"
                  >
                    + Add Incident Row
                  </button>
                </div>
              )}
              <div>
                <label className=" font-medium text-gray-700 block mb-1">
                  Q2. Were any public legal cases filed?</label>

                <div className="flex gap-4">
                  {['yes', 'no'].map(opt => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" value={opt} {...register('gri205.legalCases')} className="w-4 h-4 text-[#4639AA] focus:ring-[#4639AA]" />
                      <span className="capitalize text-sm text-gray-700">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
//  Gri 206 Anti-Competitive Behavior
  const renderGRI206 = () => (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white p-3 rounded-md border border-gray-200">
        <h3 className="text-lg font-bold text-[#4639AA] mb-6 flex items-center gap-2">
          <Icon icon="mdi:hand-back-right" /> ANTI-COMPETITIVE BEHAVIOR
        </h3>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <InfoLabel
              label="Q1. Has Anti-Competitive Behavior been identified as material?"
              info="Select Yes if your company operates in competitive markets where risks include price fixing, cartel behavior, market manipulation."
            />
            <div className="flex gap-4">
              {['yes', 'no'].map(opt => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" value={opt} {...register('gri206.isMaterial')} className="w-4 h-4 text-[#4639AA] focus:ring-[#4639AA]" />
                  <span className="capitalize text-sm text-gray-700">{opt}</span>
                </label>
              ))}
            </div>
          </div>
          {watch('gri206.isMaterial') === 'yes' && (
            <>
              <div>
                <label className=" font-medium text-gray-700 block mb-1">
                  Q2. Does the organization have a competition compliance policy?
                </label>
                <div className="flex gap-4">
                  {['yes', 'no'].map(opt => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" value={opt} {...register('gri206.hasPolicy')} className="w-4 h-4 text-[#4639AA] focus:ring-[#4639AA]" />
                      <span className="capitalize text-sm text-gray-700">{opt}</span>
                    </label>
                  ))}
                </div>
                {watch('gri206.hasPolicy') === 'yes' && (
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Upload Policy Document</label>
                    <label className="relative flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-[#4639AA]/40 rounded-xl cursor-pointer bg-slate-50 hover:border-[#4639AA] transition">
                      <Icon className="text-4xl text-gray-300 mb-2"
                        icon="mdi:cloud-upload-outline"/>
                      <p className="text-sm font-medium text-gray-700">
                        Click to upload or drag & drop</p>
                      <p className="text-xs text-gray-500 mt-1">
                        PDF, DOC, XLS, PNG, JPG • Max 5MB per file</p>
                      <input type="file" multiple className="absolute inset-0 opacity-0 cursor-pointer"/>
                    </label>
                  </div>
                )}
              </div>
              <div>
                <label className=" font-medium text-gray-700 block mb-1">
                  Q3. Who oversees compliance with competition laws?
                </label>
                <select {...register('gri206.oversight')} className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm">
                  <option>CEO</option>
                  <option>Legal Counsel</option>
                  <option>Compliance Officer</option>
                  <option>Board</option>
                  <option>Other</option>
                </select>
              </div>
            </>
          )}
          {watch('gri206.isMaterial') === 'no' && (
            <div className="mt-4 bg-[#4639AA]/5 border border-[#4639AA]/15 p-4 rounded-xl">
              <h4 className="text-sm font-bold text-[#4639AA] mb-3">Omission Logic – GRI 206</h4>
              <ul className="list-disc pl-5 text-xs text-gray-600 space-y-1 mb-4">
                <li>Legal cases not disclosed</li>
                <li>Fines not reported</li>
              </ul>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <InfoLabel label="Reason for omission" info="Select reason for omitting GRI 206 disclosures." />
                  <select
                    {...register('gri206.omissionReason')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
                  >
                    <option value="">Select reason</option>
                    <option value="Not applicable">Not applicable</option>
                    <option value="Data unavailable">Data unavailable</option>
                    <option value="Confidentiality">Confidentiality</option>
                    <option value="Legal restriction">Legal restriction</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <InfoLabel label="Explanation (required)" info="Provide explanation for omission." />
                  <textarea
                    {...register('gri206.omissionExplanation')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[100px]"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {watch('gri206.isMaterial') === 'yes' && (
        <>
          {/* 206-1 Legal Actions for Anti-Competitive Behavior */}
          <div className="bg-white p-3 rounded-md border border-gray-200">
            <h3 className="text-lg font-bold text-[#4639AA] mb-6 flex items-center gap-2">
              <Icon icon="mdi:file-document-outline" /> Legal Actions for Anti-Competitive Behavior
            </h3>
            <div className="space-y-5">
              <div>
                <InfoLabel
                  label="Q1. Were there any legal actions for anti-competitive behavior?"
                  info={<span>This question asks whether your company has faced any legal cases or penalties related to unfair business practices that harm competition.<br />

                  Examples include:<br />
                  * Price fixing with competitors<br />
                  * Market sharing agreements<br />
                  * Bid rigging<br />
                  * Abuse of dominant market position<br />
                  * Violations of competition or antitrust laws<br />

                  If your company has received fines, penalties, or legal notices from regulators or courts related to such practices, select Yes. Otherwise, select No</span>}
                />
               

                <div className="flex gap-4">
                  {['yes', 'no'].map(opt => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" value={opt} {...register('gri206.legalActions')} className="w-4 h-4 text-[#4639AA] focus:ring-[#4639AA]" />
                      <span className="capitalize text-sm text-gray-700">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
              {watch('gri206.legalActions') === 'yes' && (
                <div className="space-y-4 mt-2">
                  <label className="text-sm font-medium text-gray-700 block mb-1">
                    Legal Actions Table</label>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left border-collapse border border-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="p-2 border">Type of Case</th>
                          <th className="p-2 border">Number</th>
                          <th className="p-2 border">Financial Impact</th>
                          <th className="p-2 border">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {acbCaseRows.map((row, idx) => (
                          <tr key={idx}>
                            <td className="p-1 border">
                              <input
                                value={row.type}
                                onChange={e => {
                                  const updated = [...acbCaseRows];
                                  updated[idx].type = e.target.value;
                                  setAcbCaseRows(updated);
                                }}
                                className="w-full p-1 border-none outline-none"
                                placeholder="Type"
                              />
                            </td>
                            <td className="p-1 border">
                              <input
                                type="number"
                                value={row.number}
                                onChange={e => {
                                  const updated = [...acbCaseRows];
                                  updated[idx].number = e.target.value;
                                  setAcbCaseRows(updated);
                                }}
                                className="w-full p-1 border-none outline-none"
                                placeholder="0"
                              />
                            </td>
                            <td className="p-1 border">
                              <input
                                type="number"
                                value={row.impact}
                                onChange={e => {
                                  const updated = [...acbCaseRows];
                                  updated[idx].impact = e.target.value;
                                  setAcbCaseRows(updated);
                                }}
                                className="w-full p-1 border-none outline-none"
                                placeholder="0"
                              />
                            </td>
                            <td className="p-1 border">
                              <input
                                value={row.status}
                                onChange={e => {
                                  const updated = [...acbCaseRows];
                                  updated[idx].status = e.target.value;
                                  setAcbCaseRows(updated);
                                }}
                                className="w-full p-1 border-none outline-none"
                                placeholder="Status"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAcbCaseRows([...acbCaseRows, { type: '', number: 0, impact: 0, status: '' }])}
                    className="text-xs text-[#4639AA] font-bold mt-2"
                  >
                    + Add Case Row
                  </button>
                </div>
              )}

              <div>
                <label className=" font-medium text-gray-700 block mb-1">
                  Q2. Total monetary value of fines
                </label>
                <input
                  type="number"
                  {...register('gri206.fines')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]"
                  placeholder="0"
                  min={0}
                />
              </div>
              <div>
                <InfoLabel
                  label="Q3. Were any legal actions material to business operations?"
                  info="Indicate whether any legal action resulted in significant operational disruption, market restrictions, or structural remedies."
                />
                <div className="flex gap-4">
                  {['yes', 'no'].map(opt => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" value={opt} {...register('gri206.materialLegalActions')} className="w-4 h-4 text-[#4639AA] focus:ring-[#4639AA]" />
                      <span className="capitalize text-sm text-gray-700">{opt}</span>
                    </label>
                  ))}
                </div>

                {watch('gri206.materialLegalActions') === 'yes' && (
                  <div className="mt-2">
                    <label className=" font-medium text-gray-700 block mb-1">
                      Explanation (required)
                    </label>
                    
                    <textarea
                      {...register('gri206.materialExplanation')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[100px]"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
//  Gri 207 Tax
  const renderGRI207 = () => {
    return (
      <div className=" animate-fadeIn">
        <Tax register={register} watch={watch} setValue={setValue} />
      </div>
    );
  };


  return (
    <div className=" min-h-screen relative">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 p-6 bg-white border border-gray-200 rounded-lg">
          <div>
            <h1 className="text-2xl font-semibold text-gray-700">
              <span className="text-[#4639AA]">MODULE 4:</span> Economic Disclosures
            </h1>
            <div className="mt-1 inline-flex items-center gap-2   text-[#1893A1] font-medium">
              Define and track your GRI-aligned management strategies
            </div>
          </div>
          <div>
            <button
              type="button"
              onClick={() => {
                setAiLoading(true);
                setTimeout(() => setAiLoading(false), 500);
              }}
              disabled={aiLoading}
              className="bg-slate-50/70 border border-gray-400 text-nowrap text-gray-600 flex items-center gap-2 font-medium px-4 py-2 rounded-md transition duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {aiLoading ? (
                <>
                  <Icon icon="eos-icons:loading" className="animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Icon icon="ix:ai" className="animate-pulse" />
                  Fill With AI
                </>
              )}
            </button>
          </div>
        </header>

        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className=" flex flex-col gap-2 p-3 bg-white border border-gray-200 rounded-lg w-full md:w-fit lg:h-[calc(100vh-150px)]">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center text-start text-nowrap gap-2 px-4 py-2 rounded font-semibold transition-all ${activeTab === tab.id ? "bg-gradient-to-r from-[#4639AA] to-[#1893A1] text-white" : "text-gray-500 hover:bg-gray-50"
                  }`}
              >
                <Icon icon={tab.icon} className="text-xl" />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="w-full bg-white border border-gray-200 rounded-lg p-4 ">
            <div className="lg:h-[calc(90vh-150px)] overflow-y-auto scroll-hide">
              {activeTab === 0 && renderGRI201()}
              {activeTab === 1 && renderGRI202()}
              {activeTab === 2 && renderGRI203()}
              {activeTab === 3 && renderGRI204()}
              {activeTab === 4 && renderGRI205()}
              {activeTab === 5 && renderGRI206()}
              {activeTab === 6 && renderGRI207()}
            </div>

            <div className=" mt-2   z-50">
              <div className=" flex justify-between items-center">
                {/* LEFT SIDE */}
                <div className="text-sm text-gray-600 font-medium">

                </div>
                {/* RIGHT SIDE ACTIONS */}
                <div className="flex items-center gap-3">
                  <button
                    disabled={activeTab === 0}
                    onClick={() => setActiveTab((prev) => Math.max(0, prev - 1))}
                    className="px-6 py-2 bg-gray-100 text-gray-700 rounded font-medium hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Back
                  </button>
                   <button
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                    disabled={loading}
                    className="px-5 py-2 bg-[#1893A1] text-white rounded shadow-sm hover:shadow-md hover:opacity-95 transition font-semibold disabled:opacity-50"
                  >
                    {loading ? "Saving..." : "Save Progress"}
                  </button>
                  <button
                    type="button"
                    onClick={handleManualNext}
                    className="px-8 py-2 bg-gradient-to-br from-[#4639AA] to-[#1893A1] text-white rounded font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {activeTab === tabs.length - 1 ? "Save & Finish" : "Next Step"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Navigation Footer - Governance/Organization Style */}
      
    </div>
  );
};

export default ManagementApproach;
