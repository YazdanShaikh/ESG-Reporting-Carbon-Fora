import React, { useState } from "react";
import { Icon } from "@iconify/react";

const InfoLabel = ({ label, info }) => { 
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-1 mb-2">
      <label className=" font-medium text-gray-700 flex items-center gap-1">

        {label}
        <button type="button" onClick={() => setOpen(!open)} className="focus:outline-none">
          <Icon
            icon="material-symbols:info-outline-rounded"
            className={`text-base cursor-pointer transition-colors ${open ? "text-[#4639AA]" : "text-gray-400 hover:text-[#4639AA]"}`}
          />
        </button>
      </label>
      {open && <div className="text-sm text-gray-600  animate-fadeIn">{info}</div>}
    </div>
  );
};
export default InfoLabel;