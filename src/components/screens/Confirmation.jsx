import React from "react";
import Button from "@/components/ui/Button";

export default function Confirmation({ impacts, onConfirm, onBack, topicCode, topicName, hasNextTopic }) {

  const maxImpactScore = Math.max(...impacts.map(i => i.scores?.finalImpactScore || 0), 0);
  const maxConcernScore = Math.max(...impacts.map(i => i.scores?.stakeholderConcern || 0), 0);

  // Status Logic
  const isMaterial = maxImpactScore >= 15 || maxConcernScore >= 4.0; // Simplify display logic

  const allStakeholders = Array.from(new Set(impacts.flatMap(i => i.stakeholders || [])));

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-slate-800 dark:text-white">
        Metric: <span className="text-[#4639AA]">Confirmation</span>
      </h2>

      <div className="bg-[#4639AA]/5 border border-[#4639AA]/20 p-6 rounded-xl mb-8">
        <h3 className="text-lg font-bold text-[#4639AA] mb-4">Topic Summary: {topicName}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white p-3 rounded-lg border shadow-sm">
            <span className="block text-xs text-slate-400 uppercase font-bold">Status</span>
            <span className={`text-lg font-bold ${isMaterial ? 'text-green-600' : 'text-red-500'}`}>
              {isMaterial ? '🟢 Material' : '🔴 Not Material'}
            </span>
          </div>
          <div className="bg-white p-3 rounded-lg border shadow-sm">
            <span className="block text-xs text-slate-400 uppercase font-bold">Max Impact</span>
            <span className="text-xl font-bold text-slate-800">{maxImpactScore}</span>
          </div>
          <div className="bg-white p-3 rounded-lg border shadow-sm">
            <span className="block text-xs text-slate-400 uppercase font-bold">Max Concern</span>
            <span className="text-xl font-bold text-slate-800">{maxConcernScore.toFixed(1)}</span>
          </div>
          <div className="bg-white p-3 rounded-lg border shadow-sm">
            <span className="block text-xs text-slate-400 uppercase font-bold">Stakeholders</span>
            <span className="text-sm font-bold text-slate-800 truncate block">{allStakeholders.length} Identified</span>
          </div>
        </div>
      </div>

      <h3 className="text-md font-bold text-slate-700 mb-3">Detailed Impact Assessment</h3>
      <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden overflow-x-auto scrollbar-theme mb-8">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
          <thead className="bg-slate-50 dark:bg-slate-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Impact Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Nature</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Stakeholders</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Score</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Concern</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-slate-900 divide-y divide-slate-200 dark:divide-slate-700">
            {impacts.map((impact, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">
                  {impact.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${impact.type === 'Negative'
                    ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    }`}>
                    {impact.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                  {impact.actualPotential}
                </td>
                <td className="px-6 py-4 text-sm text-slate-500 max-w-xs truncate">
                  {impact.stakeholders?.join(", ") || "None"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-700 dark:text-slate-300">
                  {impact.scores?.finalImpactScore || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                  {impact.scores?.stakeholderConcern || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end gap-4 border-t pt-6 border-slate-200">
        <Button
          text="Back"
          className="bg-white border border-slate-300 text-slate-600 hover:bg-slate-50 px-6"
          onClick={onBack}
        />
        <Button
          text="Confirm"
          className="bg-gradient-to-br from-[#4639AA] to-[#1893A1] hover:bg-[#3b3096] text-white px-8"
          onClick={onConfirm}
        />
      </div>
    </div>
  );
}
