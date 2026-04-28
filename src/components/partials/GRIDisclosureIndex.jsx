import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import axiosInstance from "../../configs/axios.config";

const GRIDisclosureIndex = () => {
  const [disclosures, setDisclosures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedRows, setExpandedRows] = useState({});
  const [filterStandard, setFilterStandard] = useState("All");

  const griDisclosureMapping = [
    {
      id: 1,
      standard: "GRI 2",
      disclosure: "2-9",
      description: "Governance structure and composition",
      module: "Sub-Module 2.1: Governance Structure & Composition",
      location: "Module 2 – Governance",
      omissionStatus: "Fully Reported",
      submodule: "2.1",
    },
    {
      id: 2,
      standard: "GRI 2",
      disclosure: "2-10",
      description: "Nomination and selection of the highest governance body",
      module: "Sub-Module 2.1: Governance Structure & Composition",
      location: "Module 2 – Governance",
      omissionStatus: "Fully Reported",
      submodule: "2.1",
    },
    {
      id: 3,
      standard: "GRI 2",
      disclosure: "2-11",
      description: "Chair of the highest governance body",
      module: "Sub-Module 2.1: Governance Structure & Composition",
      location: "Module 2 – Governance",
      omissionStatus: "Fully Reported",
      submodule: "2.1",
    },
    {
      id: 4,
      standard: "GRI 2",
      disclosure: "2-12",
      description: "Role of the highest governance body in overseeing impacts",
      module: "Sub-Module 2.2: Governance Oversight of Sustainability",
      location: "Module 2 – Governance",
      omissionStatus: "Fully Reported",
      submodule: "2.2",
    },
    {
      id: 5,
      standard: "GRI 2",
      disclosure: "2-13",
      description: "Delegation of responsibility for managing impacts",
      module: "Sub-Module 2.2: Governance Oversight of Sustainability",
      location: "Module 2 – Governance",
      omissionStatus: "Fully Reported",
      submodule: "2.2",
    },
    {
      id: 6,
      standard: "GRI 2",
      disclosure: "2-14",
      description: "Role of the highest governance body in sustainability reporting",
      module: "Sub-Module 2.2: Governance Oversight of Sustainability",
      location: "Module 2 – Governance",
      omissionStatus: "Fully Reported",
      submodule: "2.2",
    },
    {
      id: 7,
      standard: "GRI 2",
      disclosure: "2-15",
      description: "Conflicts of interest",
      module: "Sub-Module 2.3: Conflicts of Interest",
      location: "Module 2 – Governance",
      omissionStatus: "Fully Reported",
      submodule: "2.3",
    },
    {
      id: 8,
      standard: "GRI 2",
      disclosure: "2-16",
      description: "Communication of critical concerns",
      module: "Sub-Module 2.4: Communication of Critical Concerns",
      location: "Module 2 – Governance",
      omissionStatus: "Fully Reported",
      submodule: "2.4",
    },
    {
      id: 9,
      standard: "GRI 2",
      disclosure: "2-17",
      description: "Collective knowledge of the highest governance body",
      module: "Sub-Module 2.4: Communication of Critical Concerns",
      location: "Module 2 – Governance",
      omissionStatus: "Fully Reported",
      submodule: "2.4",
    },
    {
      id: 10,
      standard: "GRI 2",
      disclosure: "2-18",
      description: "Evaluation of the performance of the highest governance body",
      module: "Sub-Module 2.6: Evaluation of the Performance",
      location: "Module 2 – Governance",
      omissionStatus: "Fully Reported",
      submodule: "2.6",
    },
    {
      id: 11,
      standard: "GRI 2",
      disclosure: "2-19",
      description: "Remuneration policies",
      module: "Sub-Module 2.7: Remuneration Policies",
      location: "Module 2 – Governance",
      omissionStatus: "Fully Reported",
      submodule: "2.7",
    },
    {
      id: 12,
      standard: "GRI 2",
      disclosure: "2-20",
      description: "Process to determine remuneration",
      module: "Sub-Module 2.8: Process to Determine Remuneration",
      location: "Module 2 – Governance",
      omissionStatus: "Fully Reported",
      submodule: "2.8",
    },
    {
      id: 13,
      standard: "GRI 2",
      disclosure: "2-21",
      description: "Annual total compensation ratio",
      module: "Sub-Module 2.9: Annual Total Compensation Ratio",
      location: "Module 2 – Governance",
      omissionStatus: "Fully Reported",
      submodule: "2.9",
    },
    {
      id: 14,
      standard: "GRI 2",
      disclosure: "2-22",
      description: "Statement on sustainable development strategy",
      module: "Sub-Module 2.10: Statement on Sustainable Development Strategy",
      location: "Module 2 – Governance",
      omissionStatus: "Fully Reported",
      submodule: "2.10",
    },
    {
      id: 15,
      standard: "GRI 2",
      disclosure: "2-23",
      description: "Policy commitments for responsible business conduct",
      module: "Sub-Module 2.11: Policy Commitments",
      location: "Module 2 – Governance",
      omissionStatus: "Fully Reported",
      submodule: "2.11",
    },
    {
      id: 16,
      standard: "GRI 2",
      disclosure: "2-24",
      description: "Embedding policy commitments",
      module: "Sub-Module 2.12: Embedding Policy Commitments",
      location: "Module 2 – Governance",
      omissionStatus: "Fully Reported",
      submodule: "2.12",
    },
    {
      id: 17,
      standard: "GRI 2",
      disclosure: "2-25",
      description: "Processes to remediate negative impacts",
      module: "Sub-Module 2.12: Embedding Policy Commitments",
      location: "Module 2 – Governance",
      omissionStatus: "Fully Reported",
      submodule: "2.12",
    },
    {
      id: 18,
      standard: "GRI 2",
      disclosure: "2-26",
      description: "Mechanisms for seeking advice and raising concerns",
      module: "Sub-Module 2.13: Mechanisms for Seeking Advice",
      location: "Module 2 – Governance",
      omissionStatus: "Fully Reported",
      submodule: "2.13",
    },
    {
      id: 19,
      standard: "GRI 2",
      disclosure: "2-27",
      description: "Compliance with laws and regulations",
      module: "Sub-Module 2.14: Compliance with Laws",
      location: "Module 2 – Governance",
      omissionStatus: "Fully Reported",
      submodule: "2.14",
    },
    {
      id: 20,
      standard: "GRI 2",
      disclosure: "2-28",
      description: "Membership associations",
      module: "Sub-Module 2.15: Membership Associations",
      location: "Module 2 – Governance",
      omissionStatus: "Fully Reported",
      submodule: "2.15",
    },
    {
      id: 21,
      standard: "GRI 2",
      disclosure: "2-29",
      description: "Approach to stakeholder engagement",
      module: "Sub-Module 2.16: Approach to Stakeholder Engagement",
      location: "Module 2 – Governance",
      omissionStatus: "Fully Reported",
      submodule: "2.16",
    },
    {
      id: 22,
      standard: "GRI 2",
      disclosure: "2-30",
      description: "Collective bargaining agreements",
      module: "Sub-Module 2.17: Collective Bargaining Agreements",
      location: "Module 2 – Governance",
      omissionStatus: "Fully Reported",
      submodule: "2.17",
    },
  ];

  useEffect(() => {
    // Load disclosures from API or local state
    setDisclosures(griDisclosureMapping);
    setLoading(false);
  }, []);

  const toggleRow = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredDisclosures =
    filterStandard === "All"
      ? disclosures
      : disclosures.filter((d) => d.standard === filterStandard);

  const getStatusColor = (status) => {
    switch (status) {
      case "Fully Reported":
        return "bg-green-100 text-green-800";
      case "Partially Reported":
        return "bg-yellow-100 text-yellow-800";
      case "Not Reported":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Fully Reported":
        return "mdi:check-circle";
      case "Partially Reported":
        return "mdi:alert-circle";
      case "Not Reported":
        return "mdi:close-circle";
      default:
        return "mdi:information";
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#4639AA] to-[#1893A1] rounded-xl p-8 text-white shadow-lg">
        <div>
        <h1 className="text-3xl font-bold mb-2 text-white">GRI Disclosure Content Index</h1>
        <p className="text-white/90">
          Complete mapping of GRI 2 standards to disclosure locations and reporting status
        </p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <label className="text-sm font-medium text-gray-700">Filter by Standard:</label>
          <div className="flex gap-2 flex-wrap">
            {["All", "GRI 2"].map((standard) => (
              <button
                key={standard}
                onClick={() => setFilterStandard(standard)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filterStandard === standard
                    ? "bg-[#4639AA] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {standard}
              </button>
            ))}
          </div>
          <div className="ml-auto text-sm text-gray-600">
            Total Disclosures: {filteredDisclosures.length}
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 flex items-center justify-center">
            <Icon icon="eos-icons:loading" className="text-4xl text-[#4639AA] animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm text-nowrap font-semibold text-gray-900">GRI Standard</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Disclosure</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Description</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Module Location</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredDisclosures.map((disclosure) => (
                  <React.Fragment key={disclosure.id}>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          {disclosure.standard}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-bold text-[#4639AA]">{disclosure.disclosure}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{disclosure.description}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{disclosure.module}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                            disclosure.omissionStatus
                          )}`}
                        >
                          <Icon icon={getStatusIcon(disclosure.omissionStatus)} className="text-lg" />
                          {disclosure.omissionStatus}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => toggleRow(disclosure.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Show more details"
                        >
                          <Icon
                            icon={
                              expandedRows[disclosure.id]
                                ? "mdi:chevron-up"
                                : "mdi:chevron-down"
                            }
                            className="text-2xl text-gray-600"
                          />
                        </button>
                      </td>
                    </tr>
                    {expandedRows[disclosure.id] && (
                      <tr className="bg-gradient-to-r from-blue-50 to-transparent">
                        <td colSpan="6" className="px-6 py-4">
                          <div className="space-y-4">
                            <div>
                              <h4 className="text-sm font-semibold text-gray-900 mb-2">Disclosure Details</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                  <p className="text-gray-600 font-medium">GRI Standard:</p>
                                  <p className="text-gray-900">{disclosure.standard}</p>
                                </div>
                                <div>
                                  <p className="text-gray-600 font-medium">Disclosure Number:</p>
                                  <p className="text-gray-900">{disclosure.disclosure}</p>
                                </div>
                                <div>
                                  <p className="text-gray-600 font-medium">Sub-Module:</p>
                                  <p className="text-gray-900">{disclosure.submodule}</p>
                                </div>
                                <div>
                                  <p className="text-gray-600 font-medium">Reporting Status:</p>
                                  <p className="text-gray-900">{disclosure.omissionStatus}</p>
                                </div>
                                <div className="md:col-span-2">
                                  <p className="text-gray-600 font-medium">Location in Report:</p>
                                  <p className="text-gray-900">{disclosure.location}</p>
                                </div>
                                <div className="md:col-span-2">
                                  <p className="text-gray-600 font-medium">Description:</p>
                                  <p className="text-gray-900">{disclosure.description}</p>
                                </div>
                              </div>
                            </div>
                            {disclosure.omissionStatus !== "Fully Reported" && (
                              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                <p className="text-sm font-semibold text-yellow-900 mb-2">
                                  <Icon icon="mdi:alert" className="inline mr-2" />
                                  Omission Information Required
                                </p>
                                <p className="text-sm text-yellow-800">
                                  Please provide omission reason and explanation in the form
                                </p>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-green-50 rounded-xl border border-green-200 p-6">
          <div className="flex items-start gap-4">
            <Icon icon="mdi:check-circle" className="text-4xl text-green-600 flex-shrink-0" />
            <div>
              <p className="text-sm text-green-600 font-medium">Fully Reported</p>
              <p className="text-3xl font-bold text-green-900">
                {filteredDisclosures.filter((d) => d.omissionStatus === "Fully Reported").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-yellow-50 rounded-xl border border-yellow-200 p-6">
          <div className="flex items-start gap-4">
            <Icon icon="mdi:alert-circle" className="text-4xl text-yellow-600 flex-shrink-0" />
            <div>
              <p className="text-sm text-yellow-600 font-medium">Partially Reported</p>
              <p className="text-3xl font-bold text-yellow-900">
                {filteredDisclosures.filter((d) => d.omissionStatus === "Partially Reported").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-red-50 rounded-xl border border-red-200 p-6">
          <div className="flex items-start gap-4">
            <Icon icon="mdi:close-circle" className="text-4xl text-red-600 flex-shrink-0" />
            <div>
              <p className="text-sm text-red-600 font-medium">Not Reported</p>
              <p className="text-3xl font-bold text-red-900">
                {filteredDisclosures.filter((d) => d.omissionStatus === "Not Reported").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
        <div className="flex gap-4">
          <Icon icon="mdi:information" className="text-2xl text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-sm font-semibold text-blue-900 mb-2">About This Index</h3>
            <p className="text-sm text-blue-800">
              This content index maps all GRI 2 disclosures related to governance, ethics, and integrity
              to their locations in the sustainability report. Click on each row to view detailed information
              about the disclosure and its reporting status.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GRIDisclosureIndex;
