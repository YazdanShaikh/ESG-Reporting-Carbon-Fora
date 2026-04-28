import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Upload,
  Chrome,
  Mail,
  Inbox,
  AtSign,
  Check,
  Crown,
} from "lucide-react";
import Select from "../ui/Select";
import React from "react";

const features = [
  "Automatic OAuth Setup",
  "Starting at $4/mo",
  "Automatic reconnects",
  "Automated SPF, DKIM, DMARC setup",
  "US IPs only",
  "Email deliverability optimised",
];

const Leads = () => {
  return (
    <section className="bg-white flex flex-col items-center justify-center py-3">
      {/* header */}
      <div className="text-center mx-auto mb-8">
        <h3 className="text-2xl font-semibold mb-2">Add Leads to Campaign</h3>
        <p className="text-gray-400">
          Start adding your Leads to start your campaign
        </p>
      </div>

      {/* Left Side - Connect Email Accounts */}
      <div className="md:w-[650px] w-full p-8 bg-gray-300 rounded-xl border border-gray-500/50">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-lg font-medium text-black-500">
            Bulk Lead Addition
          </h4>
          <button className="text-blue-500">See Sample CSV File</button>
        </div>

        {/* File Upload Section */}
        <div className="mb-2">
          <div className="flex items-center gap-4 border-2 border-dashed border-gray-500/50 px-6 py-2 rounded-lg cursor-pointer bg-gray-100 text-black-500">
            <label className="flex flex-wrap md:justify-start justify-center items-center gap-4 w-full cursor-pointer">
              <div className=" p-3 rounded-lg">
                <Upload className="w-8 h-8 text-black-500" />
              </div>
              <div className="md:text-left text-center text-black-500">
                <p className="font-medium ">Drag & Drop CSV file here</p>
                <p className="text-sm text-gray-600">
                  Upload from your system, choose file
                </p>
              </div>
              <input
                type="file"
                accept=".csv"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    console.log("Selected file:", e.target.files[0]);
                  }
                }}
              />
            </label>
          </div>
        </div>
        {/* Use Lead Finder */}
        <div className="mb-8">
          <div className="flex items-center gap-4 border-2 border-dashed border-gray-500/50 px-6 py-2 rounded-lg cursor-pointer bg-gray-100 text-black-500">
            <label className="flex flex-wrap md:justify-start justify-center items-center gap-4 w-full cursor-pointer">
              <div className=" p-3 rounded-lg">
                <Icon icon={"mingcute:user-search-fill"} className="text-4xl" />
              </div>
              <div className="md:text-left text-center text-black-500">
                <p className="font-medium ">Use Lead Finder</p>
                <p className="text-sm text-gray-600">
                  Find and reach out to 500M+ leads
                </p>
              </div>
            </label>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 md:justify-between justify-center">
          {/* Add Via */}
          <div>
            <h5 className="text-black-500 font-medium mb-4 text-base">
              Add Via
            </h5>

            <div className="grid grid-cols-2 gap-6 justify-center">
              {/* First Option */}
              <div className="text-center flex flex-col items-center">
                <button className="md:w-28 md:h-28 w-14 h-14 flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg border border-gray-500/50">
                  <Icon
                    icon={"devicon:google"}
                    className="text-4xl text-black-500"
                  />
                </button>
                <p className="text-sm font-medium text-black-500 mt-2">
                  Google Sheet
                </p>
              </div>

              {/* Second Option */}
              <div className="text-center flex flex-col items-center">
                <button className="md:w-28 md:h-28 w-14 h-14 flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg border border-gray-500/50">
                  <Icon
                    icon={"ic:outline-email"}
                    className="text-4xl text-black-500"
                  />
                </button>
                <p className="text-sm font-medium text-black-500 mt-2">
                  Add Manually
                </p>
              </div>
            </div>
          </div>

          {/* Other Email Provider */}
          <div>
            <h5 className="text-black-500 font-medium text-base">
              Add From Lead List
            </h5>
            <p>Select the lead List you would like to add?</p>

            <Select
              options={["Select", "no leads list available"]}
              className="bg-gray-100 my-4"
              placeholder="Select"
            />

            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-lg font-semibold ">
              Import Leads
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Leads;
