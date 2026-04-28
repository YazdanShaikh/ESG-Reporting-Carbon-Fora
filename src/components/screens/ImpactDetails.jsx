import React, { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Icon } from "@iconify/react";

const stakeholderOptions = [
  "Employees",
  "Communities",
  "Customers",
  "Regulators",
  "Investors",
  "Suppliers"
];

const impactDetailsSchema = yup.object({
  name: yup.string().required("Impact name is required"),
  type: yup.string().oneOf(["Negative", "Positive"]).required(),
  actualPotential: yup.string().oneOf(["Actual", "Potential"]).required(),
  stakeholders: yup.array().min(1, "At least one stakeholder must be selected").required(),
  stakeholderConcern: yup.object().required()
});


export default function ImpactDetails({
  impact,
  impactIndex,
  totalImpacts,
  onSave,
  onBack
}) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid: formIsValid },
    reset
  } = useForm({
    resolver: yupResolver(impactDetailsSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      type: "Negative",
      actualPotential: "Actual",
      stakeholders: [],
      stakeholderConcern: {}
    }
  });

  const formData = watch();

  useEffect(() => {
    if (impact) {
      const concernInit = {};
      stakeholderOptions.forEach(s => {
        concernInit[s] = impact?.stakeholderConcern?.[s] ?? 3;
      });

      reset({
        name: impact.name || "",
        type: impact.type || "Negative",
        actualPotential: impact.actualPotential || "Actual",
        stakeholders: impact.stakeholders || [],
        stakeholderConcern: concernInit
      });
    }
  }, [impact, reset]);

  const toggleStakeholder = stakeholder => {
    const currentStakeholders = formData.stakeholders || [];
    const exists = currentStakeholders.includes(stakeholder);
    const newValue = exists
      ? currentStakeholders.filter(s => s !== stakeholder)
      : [...currentStakeholders, stakeholder];

    setValue("stakeholders", newValue, { shouldValidate: true });
  };

  const updateConcern = (stakeholder, value) => {
    setValue("stakeholderConcern", {
      ...formData.stakeholderConcern,
      [stakeholder]: Number(value)
    }, { shouldValidate: true });
  };

  const handleSave = (data) => {
    onSave({ ...impact, ...data });
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
          <div
            className="text-sm text-gray-600 bg-[#4639AA]/5 p-3 rounded-lg border border-[#4639AA]/15 animate-fadeIn"
            dangerouslySetInnerHTML={{ __html: info }}
          />
        )}
      </div>
    );
  };

  return (
    <div className="mx-auto bg-white/95 backdrop-blur border border-[#4639AA]/10 rounded-3xl shadow-lg p-6 sm:p-8">
      <div className="mb-6">
        <div className="text-sm font-medium text-[#4639AA] flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-[#1893A1]" />
          <span>Module 3: Impact Details</span>
        </div>
        <h2 className="text-lg font-semibold text-slate-800 mt-2 mb-0">
          Impact Details
          <span className="text-sm text-slate-500 ml-2">
            ({impactIndex} of {totalImpacts})
          </span>
        </h2>
      </div>

      {/* Header */}
      {/* Header moved to the theme header block above */}

      {/* Impact Name */}
      <div className="mb-5">
        <label className="text-sm text-slate-600 font-medium">Impact Name</label>
        <input
          {...register("name")}
          className={`w-full mt-1 px-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4639AA]/20 ${
            errors.name ? "border-red-500" : "border-slate-300"
          }`}
          placeholder="Enter impact name"
        />
        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Impact Type */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <InfoLabel
                label="Impact Type"
                info="Negative = Harmful effect (pollution, injury, waste, legal risk).<br/>Positive = Beneficial effect (jobs, energy savings, community support)."
              />
            
          </div>
          <div className="flex gap-2">
            {["Negative", "Positive"].map(option => (
              <button
                key={option}
                type="button"
                onClick={() => setValue("type", option, { shouldValidate: true })}
                className={`px-4 py-1.5 rounded text-sm font-medium border transition
                  ${formData.type === option
                    ? option === "Negative"
                      ? "bg-red-500 text-white border-red-500"
                      : "bg-blue-500 text-white border-blue-500"
                    : "bg-slate-100 text-slate-600 border-slate-300"
                  }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Actual / Potential */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <InfoLabel
                label="Impact Nature"
                info="Actual = Happening now.<br/>Potential = Could happen in the future."
              />
          </div>
          <div className="flex gap-2">
            {["Actual", "Potential"].map(option => (
              <button
                key={option}
                type="button"
                onClick={() => setValue("actualPotential", option, { shouldValidate: true })}
                className={`px-4 py-1.5 rounded text-sm font-medium border transition
                  ${formData.actualPotential === option
                    ? "bg-[#4639AA] text-white border-[#4639AA]"
                    : "bg-slate-100 text-slate-600 border-slate-300"
                  }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stakeholders */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <InfoLabel
              label="Affected Stakeholders"
              info="Stakeholders are people affected by your business: employees, customers, local community, regulators, suppliers, investors."
            />
          
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {stakeholderOptions.map(option => (
            <label
              key={option}
              className="flex items-center gap-2 border rounded px-3 py-1.5 text-sm cursor-pointer transition">
              <input
                type="checkbox"
                checked={formData.stakeholders?.includes(option)}
                onChange={() => toggleStakeholder(option)}
                className="accent-[#4639AA]"
              />
              {option}
            </label>
          ))}
        </div>
        {errors.stakeholders && <p className="text-xs text-red-500 mt-2">{errors.stakeholders.message}</p>}
      </div>

      {/* Stakeholder Concern Table */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <InfoLabel
              label="Rate Stakeholder Concern"
              info="How important is this issue to affected people?<br/>1 = Not important<br/>3 = Moderately important<br/>5 = Extremely important / highly sensitive"
            />
          
        </div>

        <div className="border rounded overflow-hidden">
          <table className="w-full text-sm">
              <thead className="bg-[#4639AA]/5 text-[#4639AA]">
              <tr>
                <th className="text-left px-3 py-2">Stakeholder</th>
                <th className="text-center px-3 py-2">Concern (1-5)</th>
              </tr>
            </thead>
            <tbody>
              {(formData.stakeholders || []).map(s => (
                <tr key={s} className="border-t">
                  <td className="px-3 py-2">{s}</td>
                  <td className="px-3 py-2 text-center">
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={formData.stakeholderConcern?.[s] || 3}
                      onChange={e => updateConcern(s, e.target.value)}
                      className="w-16 text-center border rounded px-1 py-0.5 focus:ring-1 focus:ring-[#4639AA]"
                    />
                  </td>
                </tr>
              ))}

              {(formData.stakeholders || []).length === 0 && (
                <tr>
                  <td
                    colSpan="2"
                    className="text-center text-slate-400 py-4 italic"
                  >
                    Select stakeholders to rate concern
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between border-t pt-4">
        <Button
          text="Back"
          className="bg-white border border-slate-200 text-slate-700 hover:bg-[#4639AA]/5 px-6"
          onClick={onBack}
        />

        <Button
          text={impactIndex < totalImpacts ? "Next Impact" : "Proceed"}
          className={`px-6 ${
            formIsValid
              ? "bg-gradient-to-br from-[#4639AA] to-[#1893A1] hover:bg-[#3b3096] text-white"
              : "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
          }`}
          onClick={handleSubmit(handleSave)}
          disabled={!formIsValid}
        />
      </div>
    </div>
  );
}
