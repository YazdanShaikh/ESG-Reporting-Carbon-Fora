import React, { useState } from "react";
import { Icon } from "@iconify/react";

const InfoHeading = ({ heading, icon, info }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-1 mb-2">
      <label className=" text-lg font-bold text-[#4639AA]  flex items-center gap-1">
        <Icon icon={icon} />
        {heading}
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
export default InfoHeading;