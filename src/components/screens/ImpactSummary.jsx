import React from "react";
import Button from "@/components/ui/Button";
import { Icon } from "@iconify/react";

export default function ImpactSummary({ impacts, onNext, onBack }) {
  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
          Impact Assessment Summary
        </h2>
        <p className="text-sm text-slate-500 mt-1">Review all identified impacts and their calculated significance scores.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50/80">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Impact Description</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Type</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Nature</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Impact Score</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Concern</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {impacts.map((impact, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-slate-900">{impact.name}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{impact.stakeholders?.length || 0} stakeholders affected</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold ${impact.type === 'Negative'
                      ? 'bg-red-50 text-red-600 border border-red-100'
                      : 'bg-green-50 text-green-600 border border-green-100'
                      }`}>
                      {impact.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">
                      {impact.actualPotential}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="text-base font-bold text-slate-800">
                        {impact.scores?.finalImpactScore || 0}
                      </div>
                      <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${impact.scores?.finalImpactScore >= 15 ? 'bg-orange-500' : 'bg-[#4639AA]'}`}
                          style={{ width: `${Math.min((impact.scores?.finalImpactScore / 25) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-slate-700">
                      {impact.scores?.stakeholderConcern?.toFixed(1) || "-"}
                    </span>
                  </td>
                </tr>
              ))}

              {impacts.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-slate-400 italic">
                    No impacts recorded for this topic.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-[#4639AA]/5 border border-[#4639AA]/10 p-5 rounded-xl mb-10">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-[#4639AA]/10 rounded-lg">
            <Icon icon="mdi:information-outline" className="text-xl text-[#4639AA]" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#4639AA]">Note on Materiality</h4>
            <p className="text-sm text-slate-600 mt-1">
              These scores will be evaluated against your materiality thresholds in the next steps to determine if this topic is material for reporting.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-6 border-t border-slate-200">
        <Button
          text="Back"
          className="bg-white border border-slate-300 text-slate-600 hover:bg-slate-50 px-8 rounded-xl"
          onClick={onBack}
        />
        <Button
          text="Set Thresholds"
          className="bg-gradient-to-br from-[#4639AA] to-[#1893A1] hover:bg-[#3b3096] text-white px-8 py-3 rounded-xl shadow-lg transition-all"
          onClick={onNext}
        />
      </div>
    </div>
  );
}
