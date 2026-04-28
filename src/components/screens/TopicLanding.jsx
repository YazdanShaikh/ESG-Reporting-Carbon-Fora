import React from "react";
import Button from "@/components/ui/Button";
import { Icon } from "@iconify/react";

export default function TopicLanding({
  topicCode,
  topicName,
  description,
  onNext,
  onBack,
  selectedTopics = [],
  activeIndex = 0
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center animate-fadeIn">
      <div className="max-w-4xl w-full space-y-8">

        {/* Selection Overview Banner */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-4">
          <div className="flex items-center justify-between mb-3 px-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Assessment Progress</h3>
            <span className="text-xs font-bold text-[#4639AA] bg-[#4639AA]/10 px-2 py-0.5 rounded-full">
              {activeIndex + 1} / {selectedTopics.length} Topics
            </span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {selectedTopics.map((topic, idx) => (
              <div
                key={idx}
                className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${idx === activeIndex
                    ? "bg-[#4639AA] text-white border-[#4639AA] shadow-sm transform scale-105"
                    : idx < activeIndex
                      ? "bg-green-50 text-green-600 border-green-100"
                      : "bg-white text-slate-400 border-slate-100"
                  }`}
              >
                {topic.code}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="inline-block px-4 py-1 rounded-full bg-[#4639AA]/10 text-[#4639AA] text-sm font-bold tracking-wider uppercase">
            {topicCode}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight">
            Topic: <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4639AA] to-[#1893A1]">{topicName}</span>
          </h1>
          <div className="h-1.5 w-24 bg-gradient-to-r from-[#4639AA] to-[#1893A1] mx-auto rounded-full"></div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Icon icon="mdi:format-quote-close" className="text-6xl" />
          </div>
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3 text-center">Topic Description</h2>
          <p className="text-lg text-slate-600 leading-relaxed font-medium">
            {description || `This topic covers the essential disclosures related to ${topicName}. It involves an assessment of how the organization manages this specific ESG aspect.`}
          </p>
        </div>

        <div className="pt-6 flex flex-col items-center gap-4">
          <Button
            className="group relative overflow-hidden bg-[#4639AA] hover:bg-[#3b3096] text-white text-xl px-12 py-4 rounded-xl shadow-xl transition-all hover:scale-105 active:scale-95"
            onClick={onNext}
          >
            <div className="flex items-center gap-2">
              <span>Start Assessment</span>
              <Icon icon="mdi:arrow-right" className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Button>

          <button
            onClick={onBack}
            className="text-slate-400 hover:text-slate-600 text-sm font-bold transition-colors"
          >
            ← Back to Selection
          </button>
        </div>
      </div>
    </div>
  );
}
