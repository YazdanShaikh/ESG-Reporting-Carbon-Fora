import React from "react";
import Button from "@/components/ui/Button";

export default function MaterialityResult({ impacts, thresholds, onNext, onBack }) {

  const maxImpactScore = Math.max(...impacts.map(i => i.scores?.finalImpactScore || 0), 0);
  const maxConcernScore = Math.max(...impacts.map(i => i.scores?.stakeholderConcern || 0), 0);

  const isImpactHigh = maxImpactScore >= (thresholds.impactScore || 15);
  const isConcernHigh = maxConcernScore >= (thresholds.stakeholderConcern || 4.0);

  let status = "Not Material";
  let statusColor = "text-red-500 bg-red-50 border-red-200";
  let statusIcon = "🔴";
  let statusBadge = "bg-red-500";

  if (isImpactHigh && isConcernHigh) {
    status = "Material Topic";
    statusColor = "text-green-700 bg-green-50 border-green-200";
    statusIcon = "🟢";
    statusBadge = "bg-green-500";
  } else if (isImpactHigh || isConcernHigh) {
    status = "Material Topic";
    statusColor = "text-yellow-700 bg-yellow-50 border-yellow-200";
    statusIcon = "🟡";
    statusBadge = "bg-yellow-500";
  }

  // Matrix Logic
  const getQuadrant = (impact, concern) => {
    const highImpact = impact >= (thresholds.impactScore || 15);
    const highConcern = concern >= (thresholds.stakeholderConcern || 4.0);
    if (highImpact && highConcern) return "Q1";
    if (!highImpact && highConcern) return "Q2";
    if (highImpact && !highConcern) return "Q4";
    return "Q3";
  };

  const quadrant = getQuadrant(maxImpactScore, maxConcernScore);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-slate-800 dark:text-white">
        Metric: <span className="text-[#4639AA]">Materiality Result</span>
      </h2>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <div className={`p-6 rounded-xl border ${statusColor} mb-6 text-center shadow-sm`}>
            <span className="block text-4xl mb-2">{statusIcon}</span>
            <h3 className="text-2xl font-bold mb-1">{status}</h3>
            <p className="text-sm opacity-80 font-medium">Materiality Status</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
            <h4 className="font-bold text-slate-700 mb-4 border-b pb-3">Materiality Determination</h4>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-sm text-slate-500">Max Impact Score</span>
                  <span className="text-xs text-slate-400">Threshold: {thresholds.impactScore}</span>
                </div>
                <span className={`font-bold text-lg ${isImpactHigh ? 'text-green-600' : 'text-slate-700'}`}>{maxImpactScore}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-sm text-slate-500">Max Stakeholder Concern</span>
                  <span className="text-xs text-slate-400">Threshold: {thresholds.stakeholderConcern.toFixed(1)}</span>
                </div>
                <span className={`font-bold text-lg ${isConcernHigh ? 'text-green-600' : 'text-slate-700'}`}>{maxConcernScore.toFixed(1)}</span>
              </div>

              {/* <div className="pt-3 border-t">
                <div className="bg-slate-50 p-3 rounded text-sm">
                  <span className="font-semibold block mb-1">Logic Applied:</span>
                  <ul className="space-y-1 text-slate-600">
                    <li className={`${isImpactHigh && isConcernHigh ? 'font-bold text-[#4639AA]' : 'opacity-60'}`}>• High Impact & High Concern → 🟢 Material</li>
                    <li className={`${isImpactHigh && !isConcernHigh ? 'font-bold text-[#4639AA]' : 'opacity-60'}`}>• High Impact & Low Concern → 🟡 Material</li>
                    <li className={`${!isImpactHigh && isConcernHigh ? 'font-bold text-[#4639AA]' : 'opacity-60'}`}>• Low Impact & High Concern → 🟡 Material</li>
                    <li className={`${!isImpactHigh && !isConcernHigh ? 'font-bold text-[#4639AA]' : 'opacity-60'}`}>• Low Impact & Low Concern → 🔴 Not Material</li>
                  </ul>
                </div>
              </div> */}
            </div>
          </div>
        </div>

        <div>
          {/* Materiality Matrix */}
          <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm h-full flex flex-col">
            <h4 className="text-2xl font-bold text-slate-700 mb-5">Materiality Matrix</h4>

            <div className="flex-1 relative mb-12 ml-10">
              {/* Y-Axis Label */}
              <div className="absolute -left-12 top-1/2 -rotate-90 origin-center text-xs font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">
                Stakeholder Concern
              </div>

              {/* X-Axis Label */}
              <div className="absolute -bottom-10 left-1/2 -translateX-1/2 text-xs font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">
                Impact Significance
              </div>

              {/* Grid */}
              <div className="w-full h-full border-l-2 border-b-2 border-slate-400 grid grid-cols-2 grid-rows-2">
                {/* Q2: Low Impact, High Concern (Top Left) */}
                <div className={`border-r border-b border-slate-200 flex items-center justify-center relative ${quadrant === 'Q2' ? 'bg-yellow-50' : 'bg-slate-50/30'}`}>
                  <span className="text-xs font-bold text-slate-300 absolute top-2 left-2">Q2</span>
                  {quadrant === 'Q2' && <div className="w-4 h-4 rounded-full bg-yellow-500 shadow-lg animate-pulse"></div>}
                </div>

                {/* Q1: High Impact, High Concern (Top Right) */}
                <div className={`border-b border-slate-200 flex items-center justify-center relative ${quadrant === 'Q1' ? 'bg-green-50' : 'bg-slate-50/30'}`}>
                  <span className="text-xs font-bold text-slate-300 absolute top-2 left-2">Q1</span>
                  {quadrant === 'Q1' && <div className="w-4 h-4 rounded-full bg-green-500 shadow-lg animate-pulse"></div>}
                </div>

                {/* Q3: Low Impact, Low Concern (Bottom Left) */}
                <div className={`border-r border-slate-200 flex items-center justify-center relative ${quadrant === 'Q3' ? 'bg-red-50' : 'bg-slate-50/30'}`}>
                  <span className="text-xs font-bold text-slate-300 absolute top-2 left-2">Q3</span>
                  {quadrant === 'Q3' && <div className="w-4 h-4 rounded-full bg-red-500 shadow-lg animate-pulse"></div>}
                </div>

                {/* Q4: High Impact, Low Concern (Bottom Right) */}
                <div className={`flex items-center justify-center relative ${quadrant === 'Q4' ? 'bg-yellow-50' : 'bg-slate-50/30'}`}>
                  <span className="text-xs font-bold text-slate-300 absolute top-2 left-2">Q4</span>
                  {quadrant === 'Q4' && <div className="w-4 h-4 rounded-full bg-yellow-500 shadow-lg animate-pulse"></div>}
                </div>
              </div>

              {/* Labels for High/Low */}
              <div className="absolute -left-6 top-0 text-[10px] items-center text-slate-400 font-bold uppercase tracking-tighter">High</div>
              <div className="absolute -left-6 bottom-0 text-[10px] items-center text-slate-400 font-bold uppercase tracking-tighter">Low</div>
              <div className="absolute left-0 -bottom-6 text-[10px] items-center text-slate-400 font-bold uppercase tracking-tighter">Low</div>
              <div className="absolute right-0 -bottom-6 text-[10px] items-center text-slate-400 font-bold uppercase tracking-tighter">High</div>
            </div>

            <div className="mt-3 flex flex-wrap gap-3 justify-center">
              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                <span>Material (Q1)</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                <span>Material (Q2/Q4)</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span>Not Material (Q3)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
        <Button
          text="Back"
          className="bg-white border border-slate-300 text-slate-600 hover:bg-slate-50 px-6"
          onClick={onBack}
        />
        <Button
          text="Confirm & Proceed"
          className="bg-gradient-to-br from-[#4639AA] to-[#1893A1] hover:bg-[#3b3096] text-white px-6 shadow-md"
          onClick={onNext}
        />
      </div>
    </div>
  );
}
