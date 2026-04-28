import React from "react";
import { Icon } from "@iconify/react";
import InfoLabel from "../ui/InfoLabel";

const Tax = ({ register, watch, setValue }) => {
    const isMaterial = watch("gri207.isMaterial");
    const hasFormalStrategy = watch("gri207.hasFormalStrategy");
    const strategyPublic = watch("gri207.strategy.isPublic");
    const hasPension207 = watch("gri207.governance.hasWhistleblow");
    const hasAssurance = watch("gri207.governance.hasAssurance");
    const hasStateless = watch("gri207.cbcr.hasStateless");
    const deferredExcluded = watch("gri207.cbcr.deferredExcluded");
    const empMethod = watch("gri207.cbcr.employeeMethod") || "Headcount";
    const jurisdictions = watch("gri207.cbcr.jurisdictions") || [];
    const consolidatedRevenue = Number(watch("gri207.cbcr.consolidatedRevenue")) || 0;
    const consolidatedProfit = Number(watch("gri207.cbcr.consolidatedProfit")) || 0;
    const consolidatedAssets = Number(watch("gri207.cbcr.consolidatedAssets")) || 0;
    const consolidatedTaxPaid = Number(watch("gri207.cbcr.consolidatedTaxPaid")) || 0;
    const sumRevenues = jurisdictions.reduce((a, j) => a + (Number(j.thirdPartyRev) || 0) + (Number(j.intraGroupRev) || 0), 0);
    const sumProfit = jurisdictions.reduce((a, j) => a + (Number(j.profitLoss) || 0), 0);
    const sumAssets = jurisdictions.reduce((a, j) => a + (Number(j.tangibleAssets) || 0), 0);
    const sumTaxPaid = jurisdictions.reduce((a, j) => a + (Number(j.taxPaid) || 0), 0);

    return (
      <div className="space-y-8">
        
        <div className="bg-white p-3 rounded-md border border-gray-200 ">
          <h3 className="text-lg font-bold text-[#4639AA] mb-4 flex items-center gap-2">
            <Icon icon="mdi:file-document-outline" /> Management Approach – Tax
          </h3>

          <div className="space-y-6 mt-4">

            {/* Q1 */}
            <div>
              <InfoLabel
                label="Q1. Has Tax been identified as a material topic?"
                info="Select Yes if tax transparency and compliance are significant for stakeholders, regulators, or investors."
              />
              <div className="flex gap-4">
                {["yes", "no"].map(opt => (
                  <label key={opt} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" value={opt} {...register("gri207.isMaterial")} className="w-4 h-4 text-[#4639AA] focus:ring-[#4639AA]" />
                    <span className="capitalize text-sm text-gray-700">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            {isMaterial === "yes" && (
              <>
                {/* Q2 */}
                <div>
                  <InfoLabel
                    label="Q2. Does the organization have a formal tax strategy?"
                    info={
                      <span>
                        Select Yes if there is a written document explaining:
                        <ul className="list-disc list-inside mt-1 text-gray-500">
                          <li>Approach to tax compliance</li>
                          <li>Tax planning principles</li>
                          <li>Risk management</li>
                        </ul>
                        Upload document if available.
                      </span>
                    }
                  />
                  <div className="flex gap-4">
                    {["yes", "no"].map(opt => (
                      <label key={opt} className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" value={opt} {...register("gri207.hasFormalStrategy")} className="w-4 h-4 text-[#4639AA] focus:ring-[#4639AA]" />
                        <span className="capitalize text-sm text-gray-700">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Q3 */}
                <div>
                  <label className="font-medium text-gray-700 block mb-1">
                    Q3. Who is responsible for tax governance?
                  </label>

                  <select {...register("gri207.taxGovernanceOwner")} className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm">
                    <option>CFO</option>
                    <option>Finance Head</option>
                    <option>Board</option>
                    <option>Owner</option>
                    <option>External Tax Advisor</option>
                  </select>
                </div>
              </>
            )}

            {/* Omission Logic */}
            {isMaterial === "no" && (
              <div className="mt-4 bg-[#4639AA]/5 border border-[#4639AA]/15 p-4 rounded-xl">
                <h4 className="text-sm font-bold text-[#4639AA] mb-3">Omission Logic (GRI 207)</h4>
                <ul className="list-disc pl-5 text-xs text-gray-600 space-y-1 mb-4">
                  <li>Tax strategy not disclosed</li>
                  <li>Governance not described</li>
                  <li>Country data missing (if applicable)</li>
                </ul>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <InfoLabel label="Reason for omission" info="Select the closest reason for not disclosing this topic." />
                    <select {...register("gri207.omissionReason")} className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm">
                      <option value="">Select reason</option>
                      <option>Not applicable</option>
                      <option>Data unavailable</option>
                      <option>Legal restriction</option>
                      <option>Confidentiality</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <InfoLabel label="Explanation (required)" info="Explain why this disclosure is omitted for GRI 207." />
                    <textarea {...register("gri207.omissionExplanation")} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[100px]" placeholder="e.g. Tax is not a material topic for this reporting period..." />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {isMaterial === "yes" && (
          <>
            {/* ── DISCLOSURE 207-1 ── Approach to Tax */}
            <div className="bg-white p-3 rounded-md border border-gray-200 ">
              <h3 className="text-lg font-bold text-[#4639AA] mb-4 flex items-center gap-2">
                <Icon icon="mdi:scale-balance" /> Approach to Tax
              </h3>

              <div className="space-y-6 mt-4">

                {/* Q1 */}
                <div>
                  <InfoLabel
                    label="Q1. Does the organization have a formal tax strategy?"
                    info="If public, provide link. If not, provide summary. If limited scope, specify entities/jurisdictions."
                  />
                  <div className="flex gap-4 mb-3">
                    {["yes", "no"].map(opt => (
                      <label key={opt} className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" value={opt} {...register("gri207.strategy.isPublic")} className="w-4 h-4 text-[#4639AA] focus:ring-[#4639AA]" />
                        <span className="capitalize text-sm text-gray-700">{opt}</span>
                      </label>
                    ))}
                  </div>
                  {strategyPublic === "yes" && (
                    <input {...register("gri207.strategy.publicLink")} className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] text-sm" placeholder="https://... (public link to tax strategy)" />
                  )}
                  {strategyPublic === "no" && (
                    <textarea {...register("gri207.strategy.summary")} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[100px] text-sm" placeholder="Provide a summary of your tax strategy..." />
                  )}
                </div>

                {/* Q2 */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <InfoLabel
                      label="Q2. Who reviews and approves the tax strategy, and how frequently?"
                      info="Identify governance body and review frequency"
                    />
                    <select {...register("gri207.strategy.reviewBody")} className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm">
                      <option>Board of Directors</option>
                      <option>Audit Committee</option>
                      <option>CFO</option>
                      <option>Finance Head</option>
                      <option>External Tax Advisor</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-medium text-gray-700 block mb-1">Review frequency
                    </label>

                    <select {...register("gri207.strategy.reviewFrequency")} className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm">
                      <option>Annually</option>
                      <option>Bi-annually</option>
                      <option>Quarterly</option>
                      <option>As needed</option>
                    </select>
                  </div>
                </div>

                {/* Q3 */}
                <div>
                  <InfoLabel
                    label="Q3. Describe approach to regulatory compliance."
                    info="Explain whether compliance follows both legal form and legislative intent."
                  />
                  <textarea {...register("gri207.strategy.complianceApproach")} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[100px] text-sm" placeholder="Describe how the organization ensures tax compliance with legal form and intent..." />
                </div>

                {/* Q4 */}
                <div>
                  <InfoLabel
                    label="Q4. Link between tax and business strategy."
                    info="Explain alignment between tax planning and commercial activities."
                  />
                  <textarea {...register("gri207.strategy.businessLink")} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[100px] text-sm" placeholder="Explain how tax planning aligns with business activities and commercial decisions..." />
                </div>

                {/* Q5 */}
                <div>
                  <InfoLabel
                    label="Q5. Link between tax and sustainable development strategy."
                    info="Explain how economic and social impacts were considered in tax planning."
                  />
                  <textarea {...register("gri207.strategy.sustainabilityLink")} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[100px] text-sm" placeholder="Explain how sustainability and social impact considerations factor into tax planning..." />
                </div>
              </div>
            </div>

            {/* ── DISCLOSURE 207-2 ── Tax Governance, Control & Risk Management */}
            <div className="bg-white p-3 rounded-md border border-gray-200 ">
              <h3 className="text-lg font-bold text-[#4639AA] mb-4 flex items-center gap-2">
                <Icon icon="mdi:shield-check-outline" /> Tax Governance, Control & Risk Management
              </h3>
              <div className="space-y-6 mt-4">
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b pb-1">
                  Section A – Governance</h4>

                {/* Q1 */}
                <div>
                  <InfoLabel
                    label="Q1. Accountable body for tax compliance."
                    info="Identify the governance body or executive accountable for tax compliance."
                  />
                  <select {...register("gri207.governance.accountableBody")} className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm">
                    <option>Board of Directors</option>
                    <option>Audit Committee</option>
                    <option>CFO</option>
                    <option>Finance Head</option>
                    <option>Tax Director</option>
                    <option>External Tax Advisor</option>
                    <option>Owner / Managing Director</option>
                  </select>
                </div>

                {/* Q2 */}
                <div>
                  <InfoLabel
                    label="Q2. How is tax approach embedded?"
                    info="Describe training, incentive schemes, transparency initiatives."
                  />
                  <textarea {...register("gri207.governance.embeddedApproach")} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[100px] text-sm" placeholder="Describe internal training, codes of conduct, or incentives related to tax compliance..." />
                </div>

                {/* Q3 */}
                <div>
                  <InfoLabel
                    label="Q3. Describe approach to tax risks."
                    info="Include risk appetite, identification process, and management mechanisms."
                  />
                  <textarea {...register("gri207.governance.riskApproach")} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[100px] text-sm" placeholder="Explain how tax risks are identified, assessed, and managed..." />
                </div>

                {/* Q4 */}
                <div>
                  <InfoLabel
                    label="Q4. How is compliance evaluated?"
                    info="Describe monitoring, internal audits, and governance review processes."
                  />
                  <textarea {...register("gri207.governance.complianceEvaluation")} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[100px] text-sm" placeholder="Describe internal audit cycles, compliance checklists, or board review mechanisms..." />
                </div>

                {/* Q5 */}
                <div>
                  <InfoLabel
                    label="Q5. Mechanisms to raise concerns about tax conduct?"
                    info="Indicate availability of whistleblowing or ethics channels."
                  />
                  <div className="flex gap-4">
                    {["yes", "no"].map(opt => (
                      <label key={opt} className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" value={opt} {...register("gri207.governance.hasWhistleblow")} className="w-4 h-4 text-[#4639AA] focus:ring-[#4639AA]" />
                        <span className="capitalize text-sm text-gray-700">{opt}</span>
                      </label>
                    ))}
                  </div>
                  {hasPension207 === "yes" && (
                    <textarea {...register("gri207.governance.whistleblowDetails")} className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[80px] text-sm" placeholder="Describe the whistleblowing or ethics channel available (e.g. hotline, online portal)..." />
                  )}
                </div>

                {/* Q6 */}
                <div>
                  <InfoLabel
                    label="Q6. Are tax disclosures assured?"
                    info="Indicate internal or external assurance process."
                  />
                  <div className="flex gap-4">
                    {["yes", "no"].map(opt => (
                      <label key={opt} className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" value={opt} {...register("gri207.governance.hasAssurance")} className="w-4 h-4 text-[#4639AA] focus:ring-[#4639AA]" />
                        <span className="capitalize text-sm text-gray-700">{opt}</span>
                      </label>
                    ))}
                  </div>
                  {hasAssurance === "yes" && (
                    <div className="grid md:grid-cols-2 gap-4 mt-2">
                      <div>
                        <label className="font-medium text-gray-700 block mb-1">Type of assurance</label>
                        <select {...register("gri207.governance.assuranceType")} className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm">
                          <option>Internal Audit</option>
                          <option>External Audit</option>
                          <option>Both</option>
                        </select>
                      </div>
                      <div>
                        <label className="font-medium text-gray-700 block mb-1">Assurance provider</label>
                        <input {...register("gri207.governance.assuranceProvider")} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] text-sm" placeholder="e.g. Big4 firm, Internal Audit Department..." />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ── DISCLOSURE 207-3 ── Stakeholder Engagement */}
            <div className="bg-white p-3 rounded-md border border-gray-200 ">
              <h3 className="text-lg font-bold text-[#4639AA] mb-4 flex items-center gap-2">
                <Icon icon="mdi:account-group-outline" /> Stakeholder Engagement
              </h3>

              <div className="space-y-5 mt-4">

                {/* Q1 */}
                <div>
                  <InfoLabel
                    label="Q1. Engagement with tax authorities."
                    info="Include cooperative compliance, advance pricing agreements, risk discussions."
                  />
                  <textarea {...register("gri207.stakeholder.authorityEngagement")} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[100px] text-sm" placeholder="Describe any cooperative compliance agreements, advance pricing agreements, or regular discussions with tax authorities..." />
                </div>

                {/* Q2 */}
                <div>
                  <InfoLabel
                    label="Q2. Public policy advocacy on tax."
                    info="Describe lobbying, association membership, and position alignment."
                  />
                  <textarea {...register("gri207.stakeholder.publicAdvocacy")} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[100px] text-sm" placeholder="Describe any tax-related lobbying, industry association participation, or public policy positions..." />
                </div>

                {/* Q3 */}
                <div>
                  <InfoLabel
                    label="Q3. Stakeholder feedback processes on tax."
                    info="Explain how stakeholder input influences tax strategy."
                  />
                  <textarea {...register("gri207.stakeholder.feedbackProcess")} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[100px] text-sm" placeholder="Describe mechanisms for collecting and integrating stakeholder feedback on tax..." />
                </div>
              </div>
            </div>

            {/* ── DISCLOSURE 207-4 ── Country-by-Country Reporting */}
            <div className="bg-white p-3 rounded-md border border-gray-200 mb-4 ">
              <h3 className="text-lg font-bold text-[#4639AA] mb-4 flex items-center gap-2">
                <Icon icon="mdi:earth" />  Country-by-Country Reporting
              </h3>

              <div className="space-y-8 my-4">

                {/* SECTION A – Jurisdictions Table */}
                <section className="space-y-4">
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b pb-1">Section A – Jurisdictions</h4>
                  <InfoLabel
                    label="Q1. List all tax jurisdictions."
                    info="Include all resident entities within audited consolidated financial statements."
                  />
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left border-collapse border border-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          {["Tax Jurisdiction", "ISO Code", "Entity Name", "Legal Type", "Perm. Estab.", "Dormant", "% Ownership", "In Consolidation", "Notes"].map(h => (
                            <th key={h} className="p-2 border border-gray-200 whitespace-nowrap">{h}</th>
                          ))}
                          <th className="p-2 border border-gray-200">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(watch("gri207.cbcr.jurisdictionList") || []).map((j, idx) => (
                          <tr key={idx}>
                            {["jurisdiction", "isoCode", "entityName", "legalType"].map(field => (
                              <td key={field} className="p-1 border border-gray-200">
                                <input {...register(`gri207.cbcr.jurisdictionList.${idx}.${field}`)} className="w-full p-1 border-none outline-none min-w-[80px]" placeholder="—" />
                              </td>
                            ))}
                            {["permEstab", "dormant", "inConsolidation"].map(field => (
                              <td key={field} className="p-1 border border-gray-200 text-center">
                                <select {...register(`gri207.cbcr.jurisdictionList.${idx}.${field}`)} className="p-1 border-none outline-none bg-transparent text-xs">
                                  <option>Yes</option>
                                  <option>No</option>
                                </select>
                              </td>
                            ))}
                            <td className="p-1 border border-gray-200">
                              <input type="number" min={0} max={100} {...register(`gri207.cbcr.jurisdictionList.${idx}.ownership`)} className="w-full p-1 border-none outline-none" placeholder="100" />
                            </td>
                            <td className="p-1 border border-gray-200">
                              <input {...register(`gri207.cbcr.jurisdictionList.${idx}.notes`)} className="w-full p-1 border-none outline-none" placeholder="Optional" />
                            </td>
                            <td className="p-1 border border-gray-200 text-center">
                              <button type="button" onClick={() => {
                                const list = watch("gri207.cbcr.jurisdictionList") || [];
                                setValue("gri207.cbcr.jurisdictionList", list.filter((_, i) => i !== idx));
                              }} className="text-red-400 hover:text-red-600 font-bold text-xs">✕</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newJurisdiction = { jurisdiction: "", isoCode: "", entityName: "", legalType: "", permEstab: "No", dormant: "No", ownership: 100, inConsolidation: "Yes", notes: "" };
                      setValue("gri207.cbcr.jurisdictionList", [...(watch("gri207.cbcr.jurisdictionList") || []), newJurisdiction]);
                    }}
                    className="text-xs text-[#4639AA] font-bold mt-1"
                  >
                    + Add Jurisdiction
                  </button>
                </section>

                {/* SECTION B – Jurisdictional Data */}
                <section className="space-y-4">
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b pb-1">Section B – Jurisdictional Data</h4>

                  {/* Q2: Number of Employees */}
                  <div className="space-y-4">
                    <div>
                      <InfoLabel
                        label="Q2. Number of Employees"
                        info="Report number of employees in this jurisdiction. Use a consistent method across all jurisdictions (Headcount or FTE)."
                      />
                      <select {...register("gri207.cbcr.employeeMethod")} className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm">
                        <option value="Headcount">Headcount</option>
                        <option value="FTE">FTE</option>
                      </select>
                    </div>
                    {empMethod === "FTE" && (
                      <>
                        <div>
                            <label className="font-medium text-gray-700 block mb-1">Total hours worked during reporting period</label>
                            <input type="number" {...register("gri207.cbcr.totalHoursWorked")} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]" placeholder="e.g. 200000" />
                        </div>
                        <div>
                            <label className="font-medium text-gray-700 block mb-1">Standard annual full-time hours</label>
                            <input type="number" {...register("gri207.cbcr.standardAnnualHours")} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]" placeholder="e.g. 2080" />
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          <span className="font-semibold">FTE (Auto): </span>
                          {Number(watch("gri207.cbcr.totalHoursWorked")) && Number(watch("gri207.cbcr.standardAnnualHours"))
                            ? (Number(watch("gri207.cbcr.totalHoursWorked")) / Number(watch("gri207.cbcr.standardAnnualHours"))).toFixed(2)
                            : "—"}
                        </div>
                      </>
                    )}
                  </div>

                  

                  
                  <div><label className=" font-medium  mt-6">Q3-Q9. Per-jurisdiction financial data</label>
                  </div>
                  <div className="space-y-4">
                    {jurisdictions.map((j, idx) => {
                      const totalRev = (Number(j.thirdPartyRev) || 0) + (Number(j.intraGroupRev) || 0);
                      const operatingExpenses = Number(j.operatingExpenses) || 0;
                      const hasProfitInput = String(j.profitLoss ?? "").trim() !== "";
                      const profit = hasProfitInput ? (Number(j.profitLoss) || 0) : totalRev - operatingExpenses;
                      const historicalCost = Number(j.historicalCost) || 0;
                      const accumulatedDepreciation = Number(j.accumulatedDepreciation) || 0;
                      const netBookValue = historicalCost - accumulatedDepreciation;
                      const accrued = Number(j.taxAccrued) || 0;
                      const statutoryRate = Number(j.statutoryRate) || 0;
                      const expectedTax = profit * (statutoryRate / 100);
                      const taxDifference = accrued - expectedTax;
                      const etr = profit !== 0 ? ((accrued / profit) * 100).toFixed(1) : "—";
                      return (
                        <div key={idx} className="border border-gray-200 rounded-lg p-4 space-y-4">
                          <div className="flex items-center justify-between gap-3">
                            <InfoLabel
                              label={`Jurisdiction ${idx + 1}`}
                              info="Enter jurisdiction name for this data block."
                            />
                            <button type="button" onClick={() => setValue("gri207.cbcr.jurisdictions", jurisdictions.filter((_, i) => i !== idx))} className="text-red-400 hover:text-red-600 font-bold text-sm">Remove</button>
                          </div>
                          <input {...register(`gri207.cbcr.jurisdictions.${idx}.name`)} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]" placeholder="e.g. UAE" />

                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <InfoLabel label="Q3. Revenues from Third-Party Sales" info="Enter revenue from external customers. Exclude intra-group transactions." />
                              <input type="number" {...register(`gri207.cbcr.jurisdictions.${idx}.thirdPartyRev`)} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]" placeholder="0" />
                            </div>
                            <div>
                              <InfoLabel label="Q4. Revenues from Intra-Group Transactions (Cross-Jurisdiction)" info="Enter revenue from related entities located in other tax jurisdictions. Exclude intra-group transactions within the same jurisdiction." />
                              <input type="number" {...register(`gri207.cbcr.jurisdictions.${idx}.intraGroupRev`)} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]" placeholder="0" />
                            </div>
                          </div>

                          

                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <InfoLabel label="Q5. Profit / Loss Before Tax" info="Enter profit or loss before corporate income tax for resident entities in this jurisdiction." />
                              <input type="number" {...register(`gri207.cbcr.jurisdictions.${idx}.profitLoss`)} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]" placeholder="Leave blank to auto-calculate" />
                            </div>
                            <div>
                              <InfoLabel label="Total Operating Expenses (supporting input)" info="If profit/loss is unknown, provide operating expenses to auto-calculate Profit Before Tax." />
                              <input type="number" {...register(`gri207.cbcr.jurisdictions.${idx}.operatingExpenses`)} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]" placeholder="0" />
                            </div>
                          </div>

                          <div className="bg-gray-50 border border-gray-200 p-3 rounded-lg text-sm text-gray-700">
                           
                            <p className="mt-1 font-semibold">Auto Profit: ${profit.toLocaleString()}</p>
                          </div>

                          <div className="grid md:grid-cols-3 gap-4">
                            <div>
                              <InfoLabel label="Q6. Tangible Assets (Excluding Cash)" info="Report net book value of tangible assets in this jurisdiction." />
                              <input type="number" {...register(`gri207.cbcr.jurisdictions.${idx}.tangibleAssets`)} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]" placeholder="0" />
                            </div>
                            <div>
                                <label className="font-medium text-gray-700 block mb-1">
                              Historical Cost</label>
                              <input type="number" {...register(`gri207.cbcr.jurisdictions.${idx}.historicalCost`)} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]" placeholder="0" />
                            </div>
                            <div>
                                <label className="font-medium text-gray-700 block mb-1">
                                    Accumulated Depreciation</label>
                              
                              <input type="number" {...register(`gri207.cbcr.jurisdictions.${idx}.accumulatedDepreciation`)} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]" placeholder="0" />
                            </div>
                          </div>

                          <div className="bg-gray-50 border border-gray-200 p-3 rounded-lg text-sm text-gray-700">
                            <p className="mt-1 font-semibold">${netBookValue.toLocaleString()}</p>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <InfoLabel label="Q7. Corporate Income Tax Paid (Cash Basis)" info="Enter total corporate income tax paid during reporting period, including withholding taxes." />
                              <input type="number" {...register(`gri207.cbcr.jurisdictions.${idx}.taxPaid`)} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]" placeholder="0" />
                            </div>
                            <div>
                              <InfoLabel label="Q8. Corporate Income Tax Accrued (Current Tax Only)" info="Enter current corporate income tax expense. Exclude deferred tax and uncertain tax provisions." />
                              <input type="number" {...register(`gri207.cbcr.jurisdictions.${idx}.taxAccrued`)} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]" placeholder="0" />
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="font-medium text-gray-700 block mb-1">
                                    Current Tax Expense (validation input)
                                </label>
                              <input type="number" {...register(`gri207.cbcr.jurisdictions.${idx}.currentTaxExpense`)} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]" placeholder="0" />
                            </div>
                            <div>
                                <label className="font-medium text-gray-700 block mb-1">Deferred Tax Expense (validation only)</label>
                                <input type="number" {...register(`gri207.cbcr.jurisdictions.${idx}.deferredTaxExpense`)} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]" placeholder="0" />
                            </div>
                          </div>

                          <div>
                            <InfoLabel label="Q9. Statutory Tax Rate" info="Enter official corporate income tax rate applicable in this jurisdiction." />
                            <input type="number" step="0.01" {...register(`gri207.cbcr.jurisdictions.${idx}.statutoryRate`)} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]" placeholder="e.g. 21" />
                          </div>

                          <div>
                            <InfoLabel label={`Q10. Explain Difference Between Expected and Accrued Tax - ${j.name || `Jurisdiction ${idx + 1}`}`} info="Explain material differences due to incentives, reliefs, preferential rates, losses carried forward, etc." />
                            <textarea {...register(`gri207.cbcr.jurisdictions.${idx}.explanation`)} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[80px] text-sm" placeholder="Provide explanation for material tax differences..." />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newRow = {
                        name: "",
                        employees: 0,
                        thirdPartyRev: 0,
                        intraGroupRev: 0,
                        profitLoss: "",
                        operatingExpenses: 0,
                        tangibleAssets: 0,
                        historicalCost: 0,
                        accumulatedDepreciation: 0,
                        taxPaid: 0,
                        taxAccrued: 0,
                        currentTaxExpense: 0,
                        deferredTaxExpense: 0,
                        statutoryRate: 0,
                        explanation: ""
                      };
                      setValue("gri207.cbcr.jurisdictions", [...jurisdictions, newRow]);
                    }}
                    className="text-xs text-[#4639AA] font-bold mt-1"
                  >
                    + Add Jurisdiction Row
                  </button>

                  
                </section>

                {/* SECTION C – Consolidated Reconciliation */}
                <section className="space-y-4">
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b pb-1">
                    Section C – Consolidated Reconciliation</h4>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Q11 */}
                    <div>
                      <InfoLabel label="Q11. Consolidated Revenue ($)" info="Enter total consolidated revenue from audited financial statements." />
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-gray-400 text-sm">$</span>
                        <input type="number" {...register("gri207.cbcr.consolidatedRevenue")} className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]" placeholder="0" />
                      </div>
                      <div className={`mt-1 text-xs font-medium ${Math.abs(sumRevenues - consolidatedRevenue) > 1 ? "text-red-500" : "text-emerald-600"}`}>
                        {Math.abs(sumRevenues - consolidatedRevenue) > 1
                          ? `⚠ Mismatch: Jurisdiction sum = $${sumRevenues.toLocaleString()}`
                          : consolidatedRevenue > 0 ? "✓ Revenue reconciled" : ""}
                      </div>
                    </div>

                    {/* Q12 */}
                    <div>
                      <InfoLabel label="Q12. Consolidated Profit Before Tax ($)" info="Enter consolidated profit before tax from audited financial statements." />
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-gray-400 text-sm">$</span>
                        <input type="number" {...register("gri207.cbcr.consolidatedProfit")} className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]" placeholder="0" />
                      </div>
                      <div className={`mt-1 text-xs font-medium ${Math.abs(sumProfit - consolidatedProfit) > 1 ? "text-red-500" : "text-emerald-600"}`}>
                        {Math.abs(sumProfit - consolidatedProfit) > 1
                          ? `⚠ Mismatch: Jurisdiction sum = $${sumProfit.toLocaleString()}`
                          : consolidatedProfit !== 0 ? "✓ Profit reconciled" : ""}
                      </div>
                    </div>

                    {/* Q13 */}
                    <div>
                      <InfoLabel label="Q13. Consolidated Tangible Assets ($)"
                        info="Enter consolidated tangible assets value." />
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-gray-400 text-sm">$</span>
                        <input type="number" {...register("gri207.cbcr.consolidatedAssets")} className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]" placeholder="0" />
                      </div>
                      <div className={`mt-1 text-xs font-medium ${Math.abs(sumAssets - consolidatedAssets) > 1 ? "text-red-500" : "text-emerald-600"}`}>
                        {Math.abs(sumAssets - consolidatedAssets) > 1
                          ? `⚠ Mismatch: Jurisdiction sum = $${sumAssets.toLocaleString()}`
                          : consolidatedAssets > 0 ? "✓ Assets reconciled" : ""}
                      </div>
                    </div>

                    {/* Q14 */}
                    <div>
                      <InfoLabel label="Q14. Consolidated Corporate Tax Paid ($)" info="Enter total corporate income tax paid (cash basis) per consolidated financial statements." />
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-gray-400 text-sm">$</span>
                        <input type="number" {...register("gri207.cbcr.consolidatedTaxPaid")} className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]" placeholder="0" />
                      </div>
                      <div className={`mt-1 text-xs font-medium ${Math.abs(sumTaxPaid - consolidatedTaxPaid) > 1 ? "text-red-500" : "text-emerald-600"}`}>
                        {Math.abs(sumTaxPaid - consolidatedTaxPaid) > 1
                          ? `⚠ Mismatch: Jurisdiction sum = $${sumTaxPaid.toLocaleString()}`
                          : consolidatedTaxPaid > 0 ? "✓ Tax paid reconciled" : ""}
                      </div>
                    </div>
                  </div>

                  {/* Q15 */}
                  <div>
                    <InfoLabel
                      label="Q15. Confirm Exclusion of Deferred Tax"
                      info="Confirm that deferred tax has not been included in accrued corporate income tax."
                    />
                    <div className="flex gap-4">
                      {["yes", "no"].map(opt => (
                        <label key={opt} className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" value={opt} {...register("gri207.cbcr.deferredExcluded")} className="w-4 h-4 text-[#4639AA] focus:ring-[#4639AA]" />
                          <span className="capitalize text-sm text-gray-700">{opt === "yes" ? "Yes – deferred tax excluded" : "No – deferred tax is included (requires correction)"}</span>
                        </label>
                      ))}
                    </div>
                    {deferredExcluded === "no" && (
                      <div className="mt-2 bg-red-50 border border-red-200 p-3 rounded-lg text-xs text-red-600 font-medium">
                        ⚠ GRI 207-4 requires that deferred tax is excluded from accrued corporate income tax. Please correct your figures.
                      </div>
                    )}
                  </div>

                  {/* Q16 */}
                  <div>
                    <InfoLabel
                      label="Q16. Are there stateless entities?"
                      info="If any entity is not resident in a tax jurisdiction, disclose separately."
                    />
                    <div className="flex gap-4">
                      {["yes", "no"].map(opt => (
                        <label key={opt} className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" value={opt} {...register("gri207.cbcr.hasStateless")} className="w-4 h-4 text-[#4639AA] focus:ring-[#4639AA]" />
                          <span className="capitalize text-sm text-gray-700">{opt}</span>
                        </label>
                      ))}
                    </div>
                    {hasStateless === "yes" && (
                      <textarea {...register("gri207.cbcr.statelessDetails")} className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[80px] text-sm" placeholder="Disclose details of stateless entities not resident in any tax jurisdiction..." />
                    )}
                  </div>
                </section>

              </div>
            </div>
          </>
        )}
      </div>
    );
};

export default Tax;