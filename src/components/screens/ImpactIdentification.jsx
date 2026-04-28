import React, { useState } from "react";
import Button from "@/components/ui/Button";
import { Icon } from "@iconify/react";

export default function ImpactIdentification({ questions, info, savedAnswers, onNext, onPrev }) {
  const currentQuestions = questions && questions.length > 0 ? questions : [
    "Operations release GHG emissions?",
    "Activities cause local air pollution?",
    "Logistics/transportation generate emissions?",
    "Suppliers contribute to emissions?",
    "Community health impacts?",
    "Regulatory/legal impacts?"
  ];



  const [answers, setAnswers] = useState(() => {
    if (savedAnswers && Object.keys(savedAnswers).length > 0) {
      return savedAnswers;
    }
    return Object.fromEntries(currentQuestions.map((_, i) => [i, false]));
  });

  const anyYes = Object.values(answers).some(Boolean);


  const handleToggle = (index, value) => {
    setAnswers(prev => ({
      ...prev,
      [index]: value
    }));
  };



  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            Impact Identification
          </h2>
          <p className="text-sm text-slate-500 mt-1">Screen your topic activities to identify potential impacts.</p>
        </div>
        <div className="px-4 py-2 bg-slate-50 border rounded-lg text-sm font-semibold text-slate-600">
          {Object.values(answers).filter(Boolean).length} Impacts Identified
        </div>
      </div>

      <div className="space-y-4 mb-10">
        {currentQuestions.map((q, idx) => {
          const value = answers[idx];
          return (
            <div
              key={idx}
              className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 ${value === true
                ? "bg-[#4639AA]/5 border-[#4639AA]/20 shadow-sm"
                : value === false
                  ? "bg-slate-50/50 border-slate-100 shadow-none"
                  : "bg-white border-slate-100"
                }`}
            >
              <div className="flex items-center gap-4">
                <div className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${value === true ? 'bg-[#4639AA] text-white' : 'bg-slate-200 text-slate-500'}`}>
                  {idx + 1}
                </div>
                <div>
                  <span className={`text-base flex items-center gap-1 font-medium transition-colors ${value === true ? 'text-slate-900' : 'text-slate-600'}`}>
                    {q}
                  </span>
                </div>
              </div>

              <div className="inline-flex border-2 border-slate-200 rounded-full p-1">
                <button
                  type="button"
                  onClick={() => handleToggle(idx, true)}
                  className={`py-1 rounded-full text-sm font-medium transition-all
                    ${value === true
                      ? "bg-gradient-to-br from-[#4639AA] to-[#1893A1] text-white shadow-sm px-4"
                      : "text-slate-400 hover:text-slate-700 px-2"
                    }
                  `}
                >
                  Yes
                </button>

                <button
                  type="button"
                  onClick={() => handleToggle(idx, false)}
                  className={`py-1 rounded-full text-sm font-medium transition-all
                    ${value === false
                      ? "bg-gradient-to-br from-[#4639AA] to-[#1893A1] text-white shadow-sm px-4"
                      : "text-slate-400 hover:text-slate-700 px-2"
                    }
                  `}
                >
                  No
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between pt-6 border-t border-slate-200 dark:border-slate-700">
        <Button
          text="Back"
          className="bg-white border border-slate-300 text-slate-600 hover:bg-slate-50 py-2 px-6 rounded-lg"
          onClick={onPrev}
        />
        <Button
          text="Proceed to Assessment"
          disabled={!anyYes}
          className={`flex items-center gap-2 px-8 py-2 text-base rounded-lg shadow-lg transition-all ${anyYes ? "bg-gradient-to-br from-[#4639AA] to-[#1893A1] hover:bg-[#3b3096] text-white" : "bg-slate-200 text-slate-400 cursor-not-allowed"}`}
          onClick={() => onNext(answers)}
        >
          <span>Proceed</span>
          <Icon icon="mdi:chevron-right" className="text-xl" />
        </Button>
      </div>
    </div>
  );
}
