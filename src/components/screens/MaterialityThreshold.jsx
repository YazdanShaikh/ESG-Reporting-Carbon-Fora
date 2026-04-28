import React, { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { Icon } from "@iconify/react";

export default function MaterialityThreshold({ thresholds, onUpdate, onNext, onBack }) {

  const impactOptions = Array.from({ length: 25 }, (_, i) => String(i + 1));
  const concernOptions = ["1.0", "1.5", "2.0", "2.5", "3.0", "3.5", "4.0", "4.5", "5.0"];

  const handleUpdate = (key, value) => {
    onUpdate(key, Number(value));
  };

  const InfoLabel = ({ label, info }) => {
          const [open, setOpen] = useState(false);
      
          return (
            <div className="space-y-1 mb-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                {label}
                <button
                  type="button"
                  onClick={() => setOpen(!open)}
                  className="focus:outline-none"
                >
                  <Icon
                    icon="material-symbols:info-outline-rounded"
                    className={`text-base cursor-pointer transition-colors ${open
                      ? "text-[#4639AA]"
                      : "text-gray-400 hover:text-[#4639AA]"
                      }`}
                  />
                </button>
              </label>
      
              {open && (
                <div className="text-sm text-gray-500 animate-fadeIn " dangerouslySetInnerHTML={{ __html: info }} />
              )}
            </div>
          );
        };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-slate-800 dark:text-white">
        Metric: <span className="text-[#4639AA]">Threshold Configuration</span>
      </h2>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-6">
          {/* Section 1 */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <InfoLabel
                label="Minimum Impact Score for Materiality"
                info="This number decides when a topic becomes important enough to report.<br/>Recommended value: 15."
              />
              
            </div>
            <select
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] bg-white"
              value={String(thresholds.impactScore)}
              onChange={(e) => handleUpdate("impactScore", e.target.value)}
            >
              {impactOptions.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
            <p className="text-xs text-slate-400 mt-2">
              Derived from scale, scope, irremediability, and likelihood.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <InfoLabel
                label="Minimum Stakeholder Concern Score"
                info="Minimum concern level required for a topic to be considered important.<br/>Recommended value: 4."
              />
              
            </div>
            <select
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] bg-white"
              value={String((thresholds.stakeholderConcern || 4.0).toFixed(1))}
              onChange={(e) => handleUpdate("stakeholderConcern", e.target.value)}
            >
              {concernOptions.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
            <p className="text-xs text-slate-400 mt-2">
              Reflects importance to key stakeholder groups.
            </p>
          </div>
        </div>

        {/* Section 3 Read-only */}
        <div>
          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg border border-slate-200 h-full">
            <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-4">
              Logic Preview
            </h4>
            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <p>A topic is <strong className="text-green-600">Material</strong> if:</p>
              <ul className="list-disc list-inside ml-2 space-y-1">
                <li>Impact Score ≥ <span className="font-bold text-[#4639AA]">{thresholds.impactScore}</span></li>
                <li className="list-none pl-6 text-xs uppercase font-bold text-slate-400">OR</li>
                <li>Concern Score ≥ <span className="font-bold text-[#4639AA]">{(thresholds.stakeholderConcern || 4.0).toFixed(1)}</span></li>
              </ul>
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
          text="Apply Thresholds"
          className="bg-gradient-to-br from-[#4639AA] to-[#1893A1] hover:bg-[#3b3096] text-white px-6"
          onClick={onNext}
        />
      </div>
    </div>
  );
}