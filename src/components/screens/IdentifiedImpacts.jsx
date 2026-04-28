import React, { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import { Icon } from "@iconify/react";

// InfoLabel component for impact info
const InfoLabel = ({ label, info }) => {
  const [open, setOpen] = useState(false);

  if (!info) return <span className="text-base font-bold text-slate-700">{label}</span>;

  return (
    <div className="space-y-1 mb-1">
      <span className="text-base font-bold text-slate-700 flex items-center gap-1">
        {label}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="focus:outline-none"
        >
          <Icon
            icon="material-symbols:info-outline-rounded"
            className={`text-base cursor-pointer transition-colors ${open ? "text-[#4639AA]" : "text-gray-400 hover:text-[#4639AA]"}`}
          />
        </button>
      </span>
      {open && info && (
        <div
          className="text-sm text-gray-500 animate-fadeIn"
          dangerouslySetInnerHTML={{ __html: info }}
        />
      )}
    </div>
  );
};


export default function IdentifiedImpacts({ impacts, predefinedImpacts, onAddImpact, onRemoveImpact, onNext, onPrev }) {
  const [newImpactName, setNewImpactName] = useState("");
  const [isAdding, setIsAdding] = useState(false);


  // Initialize with predefined impacts if empty
  useEffect(() => {
    if (impacts.length === 0 && predefinedImpacts && predefinedImpacts.length > 0) {
      predefinedImpacts.forEach(item => {
        onAddImpact({
          name: item.name,
          info: item.info || "",
          type: "Negative", // Default
          actualPotential: "Actual", // Default
          stakeholders: [],
          stakeholderConcern: 3
        });
      });
    }
  }, []); // Run once on mount

  const handleAddNew = () => {
    if (newImpactName.trim()) {
      onAddImpact({
        name: newImpactName,
        type: "Negative",
        actualPotential: "Potential", // User added might be potential
        stakeholders: [],
        stakeholderConcern: 3
      });
      setNewImpactName("");
      setIsAdding(false);
    }
  };


  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
          Identified Impacts
        </h2>
        <p className="text-sm text-slate-500 mt-1">Review the impacts identified based on your screening answers. You can add more or remove irrelevant ones.</p>
      </div>

      <div className="space-y-4 mb-8">
        {impacts.map((impact, idx) => {
          return (
            <div
              key={idx}
              className="flex items-center justify-between px-4 py-2 bg-slate-50/40 border-slate-200 rounded-lg border-2  transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-[#4639AA]">
                  <Icon
                    icon="mdi:leaf"
                    className="text-xl"
                  />
                </div>

                <div>
                  <InfoLabel label={impact.name} info={impact.info} />
                  {/* <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider bg-slate-50 px-1 py-0.5 rounded">
                    {impact.type} • {impact.actualPotential}
                  </span> */}
                </div>
              </div>
              {/* ...existing code... */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5  font-bold  opacity-0 group-hover:opacity-100 transition-opacity">
                  <Icon icon="mdi:check-circle" className="  text-green-600 text-lg" />
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveImpact(idx);
                  }}
                  className="p-2 text-slate-300 hover:text-red-500  transition-all"
                  title="Remove impact"
                >
                  <Icon icon="mdi:close-circle-outline" className="text-xl" />
                </button>
              </div>
            </div>
          );
        })}


        {isAdding ? (
          <div className="p-2 border-2 border-[#4639AA] rounded-lg bg-[#4639AA]/5 animate-scaleIn flex items-center gap-3 shadow-inner">
            <div className="w-10 h-10  flex items-center justify-center text-[#4639AA] shadow-sm">
              <Icon icon="mdi:plus-circle" className="text-xl" />
            </div>
            <input
              type="text"
              autoFocus
              className="flex-1 bg-transparent border-none outline-none text-slate-800 font-bold placeholder-slate-400 px-2 text-base"
              placeholder="Describe the new impact..."
              value={newImpactName}
              onChange={(e) => setNewImpactName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddNew()}
            />
            <div className="flex gap-2 pr-2">
              <button onClick={handleAddNew} className=" text-slate-400 hover:text-green-600 px-2  transition-colors">
                <Icon icon="mdi:check" className="text-xl" />
              </button>
              <button onClick={() => setIsAdding(false)} className=" text-slate-400 p-2  hover:text-red-500 transition-colors">
                <Icon icon="mdi:close" className="text-xl" />
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="w-full py-4 border-2 border-dashed border-slate-200 text-slate-400 rounded-lg hover:border-[#4639AA]/30 hover:text-[#4639AA] hover:bg-[#4639AA]/5 transition-all flex items-center justify-center gap-3 font-bold text-base"
          >
            <div className="p-1 bg-slate-100 rounded-full group-hover:bg-[#4639AA]/10 transition-colors">
              <Icon icon="mdi:plus" className="text-xl" />
            </div>
            Add Custom Impact
          </button>
        )}
      </div>

      <div className="flex justify-between pt-8 border-t border-slate-100">
        <Button
          text="Back"
          className="bg-white border border-slate-300 text-slate-600 hover:bg-slate-50 px-8 rounded-lg font-bold"
          onClick={onPrev}
        />
        <Button
          text="Proceed to Assessment"
          disabled={impacts.length === 0 || isAdding}
          className={`px-10 py-3 rounded-lg  transition-all font-bold ${impacts.length > 0 && !isAdding ? "bg-gradient-to-br from-[#4639AA] to-[#1893A1]  text-white" : "bg-slate-200 text-slate-600 border cursor-not-allowed"}`}
          onClick={onNext}
        />
      </div>
    </div>
  );
}
