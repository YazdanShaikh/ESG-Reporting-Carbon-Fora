import React, { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Icon } from "@iconify/react";

const impactScoringSchema = yup.object({
  scale: yup.number().min(1).max(5).required(),
  scope: yup.number().min(1).max(5).required(),
  irremediability: yup.number().min(1).max(5).optional(),
  likelihood: yup.number().min(1).max(5).optional(),
  stakeholderConcern: yup.number().min(1).max(5).required(),
});

export default function ImpactScoring({ impact, impactIndex, totalImpacts, onSave, onBack }) {
  const isNegative = impact.type === "Negative";
  const isActual = impact.actualPotential === "Actual";

  // Determine max concern if it's an object, otherwise use the value directly
  const getMaxConcern = (concern) => {
    if (typeof concern === 'object' && concern !== null) {
      const values = Object.values(concern);
      return values.length > 0 ? Math.max(...values) : 3;
    }
    return Number(concern) || 3;
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(impactScoringSchema),
    defaultValues: {
      scale: 3,
      scope: 3,
      irremediability: 3,
      likelihood: 3,
      stakeholderConcern: getMaxConcern(impact.stakeholderConcern)
    }
  });

  const formData = watch();

  useEffect(() => {
    const initialConcern = getMaxConcern(impact.stakeholderConcern);
    if (impact.scores) {
      reset({
        scale: impact.scores.scale || 3,
        scope: impact.scores.scope || 3,
        irremediability: impact.scores.irremediability || 3,
        likelihood: impact.scores.likelihood || 3,
        stakeholderConcern: impact.scores.stakeholderConcern || initialConcern
      });
    } else {
      reset({
        scale: 3,
        scope: 3,
        irremediability: 3,
        likelihood: 3,
        stakeholderConcern: initialConcern
      });
    }
  }, [impact, reset]);

  const calculateScores = (values) => {
    const s = Number(values.scale);
    const sc = Number(values.scope);
    const irr = Number(values.irremediability || 0);
    const l = Number(values.likelihood || 1);
    const stC = Number(values.stakeholderConcern);

    let severity = 0;
    let finalScore = 0;

    if (isNegative) {
      severity = Math.max(s, sc, irr);
      if (isActual) {
        // Actual Negative Impact Score = Severity × Stakeholder Concern Factor
        finalScore = severity * stC;
      } else {
        // Potential Negative Impact Score = (Severity × Likelihood) × Stakeholder Concern
        finalScore = (severity * l) * stC;
      }
    } else {
      const positiveBase = s * sc;
      if (isActual) {
        // Actual Positive Impact Score = (Scale × Scope) × Stakeholder Concern Factor
        finalScore = positiveBase * stC;
      } else {
        // Potential Positive Impact Score = (Scale × Scope × Likelihood) × Stakeholder Concern Factor
        finalScore = (positiveBase * l) * stC;
      }
    }

    return {
      severity: isNegative ? severity : (s * sc),
      impactScore: Math.round(finalScore),
      stakeholderConcern: stC
    };
  };

  const scores = calculateScores(formData);

  const handleSave = (data) => {
    onSave({
      ...impact,
      scores: {
        ...data,
        finalImpactScore: scores.impactScore,
        severity: scores.severity,
        stakeholderConcern: scores.stakeholderConcern
      }
    });
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

  const options = ["1", "2", "3", "4", "5"];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
          Impact Scoring <span className="text-sm font-normal text-slate-500 ml-2">({impactIndex} of {totalImpacts})</span>
        </h2>
      </div>

      <div className="bg-[#4639AA]/5 border border-[#4639AA]/20 p-4 rounded-lg mb-6 flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-[#4639AA]">{impact.name}</h3>
          <p className="text-xs text-slate-500">
            {impact.type} • {impact.actualPotential}
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-500 block">Stakeholder Concern</span>
          <span className="font-bold text-lg text-[#4639AA]">{formData.stakeholderConcern}</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <InfoLabel
                label="Scale (Gravity of impact)"
                info="How serious is the impact?<br/>1 = Very small impact<br/>3 = Medium impact<br/>5 = Very serious damage"
              />

            </div>
            <select
              {...register("scale")}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] bg-white"
            >
              {options.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <InfoLabel
                label="Scale (Gravity of impact)"
                info="How serious is the impact?<br/>1 = Very small impact<br/>3 = Medium impact<br/>5 = Very serious damage"
              />

            </div>
            <select
              {...register("scale")}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] bg-white"
            >
              {options.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <InfoLabel
                label="Scope (Reach of impact)"
                info="How many people or how large an area is affected?<br/>1 = Very limited<br/>3 = Moderate<br/>5 = Very widespread"
              />

            </div>
            <select
              {...register("scope")}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] bg-white"
            >
              {options.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>

          {isNegative && (
            <div>
              <div className="flex items-center gap-2 mb-1">
                <InfoLabel
                  label="Irremediability (Difficulty to restore)"
                  info="Can the damage be fixed?<br/>1 = Easy to fix<br/>3 = Takes time<br/>5 = Permanent or very hard to fix"
                />

              </div>
              <select
                {...register("irremediability")}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] bg-white"
              >
                {options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          )}

          {!isActual && (
            <div>
              <div className="flex items-center gap-2 mb-1">
                <InfoLabel
                  label="Likelihood (Probability)"
                  info="How likely is this to happen?<br/>1 = Very unlikely<br/>3 = Possible<br/>5 = Very likely"
                />
              </div>
              <select
                {...register("likelihood")}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] bg-white"
              >
                {options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          )}
        </div>

        <div>
          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg border border-slate-200 h-full">
            <h4 className="font-semibold text-slate-700 mb-4 border-b border-slate-200 pb-2">Calculation Result</h4>

            <div className="space-y-4">
              {isNegative ? (
                <>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Severity</span>
                    <span className="font-bold text-slate-800">{scores.severity}</span>
                  </div>
                  <div className="mt-8 text-center">
                    <span className="block text-xs uppercase tracking-wide text-slate-500 mb-1">
                      Final Impact Score
                    </span>
                    <div className="text-4xl font-bold text-[#4639AA]">
                      {scores.impactScore}
                    </div>
                    {/* <span className="text-xs text-slate-400 mt-2 block">
                      {isActual
                        ? `Severity (${scores.severity}) × Concern (${scores.stakeholderConcern})`
                        : `(Severity × Likelihood) × Concern`
                      }
                    </span> */}
                  </div>
                </>
              ) : (
                <div className="mt-8 text-center">
                  <span className="block text-xs uppercase tracking-wide text-slate-500 mb-1">
                    Final Positive Score
                  </span>
                  <div className="text-4xl font-bold text-green-600">
                    {scores.impactScore}
                  </div>
                </div>
              )}
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
          text={impactIndex < totalImpacts ? "Assess Next" : "Save & Continue"}
          className="bg-gradient-to-br from-[#4639AA] to-[#1893A1] hover:bg-[#3b3096] text-white px-6"
          onClick={handleSubmit(handleSave)}
        />
      </div>
    </div>
  );
}
