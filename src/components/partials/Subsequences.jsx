import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";

const Subsequences = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section className="max-w-md mx-auto my-10 p-10 bg-gray-300 rounded-xl text-center border border-black-300/50">
      <div className="flex justify-center items-center">
        <Icon
          icon={"streamline-freehand-color:send-email-pop-up"}
          className="text-5xl"
        />
      </div>
      <h3 className="flex flex-wrap w-full items-center justify-center gap-2 text-2xl">
        Add a subsequence
      </h3>
      <div className="flex items-start text-sm text-left gap-2 bg-gray-100 p-3 rounded-xl my-3">
        <div>
          <Icon
            icon={"material-symbols:info-outline"}
            className="text-xl text-blue-500"
          />
        </div>
        <p>
          Subsequences help you react automatically to how a lead behaves. Think
          of it like a mini-sequence inside your main campaign.
        </p>
      </div>

      {/* dropdown */}
      <div className="max-w-md mx-auto mt-6">
        {/* Dropdown Header */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full px-4 py-2 rounded-lg font-medium focus:outline-none hover:bg-gray-100 transition"
        >
          <span>See Example</span>
          <Icon
            icon={isOpen ? "mdi:chevron-up" : "mdi:chevron-down"}
            className="w-5 h-5"
          />
        </button>

        {/* Dropdown Content */}
        {isOpen && (
          <ul className="text-left list-disc bg-gray-100 border border-gray-300 text-sm rounded-lg p-4">
            <li className="ml-4">
              Lead opened but didn't reply? → Send a gentle nudge.
            </li>
            <li className="ml-4">
              Lead clicked a link? → Start a more tailored follow-up.
            </li>
            <li className="ml-4">
              Lead replied with "Interested"? → Send next steps automatically.
            </li>
          </ul>
        )}
      </div>
      <button className="w-full mt-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-2 rounded-xl text-lg font-semibold flex items-center justify-center space-x-2">
        <Icon icon={"ic:baseline-plus"} className="text-2xl" />
        <span>Add new</span>
      </button>
    </section>
  );
};

export default Subsequences;
