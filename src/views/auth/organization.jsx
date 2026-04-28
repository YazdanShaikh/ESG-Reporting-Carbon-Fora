import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Shap1 from "../../assets/images/shap/c.png";

const OrganizationSetup = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
  { id: 0, label: "Organization Profile", icon: "mdi:office-building" },
  { id: 1, label: "Reporting Period & Restatements", icon: "mdi:calendar-range" },
  { id: 2, label: "Organizational Boundary", icon: "mdi:vector-square" },
  { id: 3, label: "Legal Entities & Sites", icon: "mdi:factory" },
  { id: 4, label: "Reporting Standards & Assurance", icon: "mdi:file-certificate" },
];
  const [entities, setEntities] = useState([
  {
    name: "ABC Spinning Unit",
    country: "Pakistan",
    type: "manufacturing",
    ownership: "100",
    included: true,
    exclusionReason: "",
    employees: "600",
    envSignificant: true,
    highRisk: false,
    status: "active",
  },
]);

const addEntity = () => {
  setEntities([
    ...entities,
    {
      name: "",
      country: "",
      type: "manufacturing",
      ownership: "",
      included: true,
      exclusionReason: "",
      employees: "",
      envSignificant: false,
      highRisk: false,
      status: "active",
    },
  ]);
};

const removeEntity = (index) => {
  setEntities(entities.filter((_, i) => i !== index));
};

const updateEntity = (index, field, value) => {
  const newEntities = [...entities];
  newEntities[index] = { ...newEntities[index], [field]: value };
  setEntities(newEntities);
};

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return (
            <div className="space-y-8">
            <h2 className="text-xl font-semibold  text-gray-700">
                Sub-Module 1.1: <span className="text-[#4639AA]"> Organization Profile </span>
            </h2>

            {/* Basic Information */}
            <div className=" space-y-6">
                <h3 className="text-lg font-medium text-gray-800">Basic Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    Legal Name of the Reporting Organization
                    </label>
                    <input
                    type="text"
                    className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]"
                    defaultValue="ABC Manufacturing Pvt. Ltd."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    Headquarters Location
                    </label>
                    <input
                    type="text"
                    className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]"
                    defaultValue="Karachi, Pakistan"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    Organization Website
                    </label>
                    <input
                    type="url"
                    className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]"
                    defaultValue="https://www.abc.com"
                    placeholder="https://www.example.com"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    Primary Activities
                    </label>
                    <textarea
                    rows={2}
                    className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y"
                    defaultValue="Textile spinning and fabric manufacturing"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    Significant Products / Services
                    </label>
                    <textarea
                    rows={2}
                    className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y"
                    defaultValue="Cotton yarn, woven fabrics"
                    />
                </div>
                </div>
            </div>

            {/* Operations & Markets */}
            <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-800">Operations & Markets</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    Countries of Operation
                    </label>
                    <div className="flex flex-wrap gap-6">
                    {["Pakistan", "Bangladesh"].map((country) => (
                        <label key={country} className="flex items-center">
                        <input
                            type="checkbox"
                            defaultChecked
                            className="h-4 w-4 text-[#4639AA] focus:ring-[#4639AA] border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">{country}</span>
                        </label>
                    ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    Markets Served
                    </label>
                    <div className="flex flex-wrap gap-6">
                    {["Domestic", "EU", "US"].map((market) => (
                        <label key={market} className="flex items-center">
                        <input
                            type="checkbox"
                            defaultChecked
                            className="h-4 w-4 text-[#4639AA] focus:ring-[#4639AA] border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">{market}</span>
                        </label>
                    ))}
                    </div>
                </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reporting Currency
                    </label>
                    <select
                    className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] bg-white"
                    >
                    <option value="PKR">PKR - Pakistani Rupee</option>
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="other">Other</option>
                    </select>
                </div>
                </div>
            </div>

            {/* Organization Structure */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <h3 className="text-lg font-medium text-gray-800 md:col-span-2">Organization Structure</h3>

                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ownership Structure & Legal Form
                </label>
                <select
                    className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] bg-white"
                >
                    <option>Privately owned limited company</option>
                    <option>Public limited company</option>
                    <option>Partnership</option>
                    <option>Other</option>
                </select>
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sector(s)
                </label>
                <select
                    className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] bg-white"
                >
                    <option>Manufacturing – Textiles</option>
                    <option>Textile & Apparel</option>
                    <option>Other Manufacturing</option>
                </select>
                </div>
            </div>

            {/* Workforce Information */}
            <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-800">Workforce Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Number of Employees
                    </label>
                    <input
                    type="number"
                    min="0"
                    className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]"
                    defaultValue="1250"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    Male Employees
                    </label>
                    <input
                    type="number"
                    min="0"
                    className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]"
                    defaultValue="900"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    Female Employees
                    </label>
                    <input
                    type="number"
                    min="0"
                    className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]"
                    defaultValue="350"
                    />
                </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    Permanent Employees
                    </label>
                    <input
                    type="number"
                    min="0"
                    className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]"
                    defaultValue="1100"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    Temporary / Contract Employees
                    </label>
                    <input
                    type="number"
                    min="0"
                    className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]"
                    defaultValue="150"
                    />
                </div>
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Are there workers who are not employees? (e.g. contract labor, freelancers)
                </label>
                <div className="flex items-center gap-6 mb-3">
                    <label className="flex items-center">
                    <input
                        type="radio"
                        name="nonEmployees"
                        value="yes"
                        className="h-4 w-4 text-[#4639AA] focus:ring-[#4639AA]"
                    />
                    <span className="ml-2 text-sm text-gray-700">Yes</span>
                    </label>
                    <label className="flex items-center">
                    <input
                        type="radio"
                        name="nonEmployees"
                        value="no"
                        defaultChecked
                        className="h-4 w-4 text-[#4639AA] focus:ring-[#4639AA]"
                    />
                    <span className="ml-2 text-sm text-gray-700">No</span>
                    </label>
                </div>

                <textarea
                    rows={2}
                    className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y"
                    placeholder="If yes, describe (e.g. contract labor)"
                    defaultValue="Yes – contract labor"
                />
                </div>
            </div>

            {/* Changes During Reporting Period */}
            <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-800">Changes During Reporting Period</h3>

                <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    Have there been significant organizational changes?
                    </label>
                    <div className="flex gap-4 items-start">
                    <select
                        className="w-32 px-3 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]"
                    >
                        <option>No</option>
                        <option>Yes</option>
                    </select>
                    <input
                        type="text"
                        className="flex-1 px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]"
                        placeholder="Explanation (if yes)"
                    />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    Have there been significant supply chain changes?
                    </label>
                    <div className="flex gap-4 items-start">
                    <select
                        className="w-32 px-3 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]"
                    >
                        <option>Yes</option>
                        <option>No</option>
                    </select>
                    <input
                        type="text"
                        className="flex-1 px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]"
                        defaultValue="New raw cotton supplier added"
                        placeholder="Explanation (if yes)"
                    />
                    </div>
                </div>
                </div>
            </div>

            {/* Note */}
            <div className="text-sm text-gray-500 bg-blue-50 border border-blue-100 p-4 rounded-lg">
                <strong>Note:</strong> This information forms the foundation of your GRI-compliant report. Ensure accuracy for transparency and comparability.
            </div>
            </div>
        );

      case 1:
        return (
            <div className="space-y-8">
            <h2 className="text-xl font-semibold text-gray-700">
                Sub-Module 1.2: <span className="text-[#4639AA]"> Reporting Period & Restatements </span>
            </h2>

            {/* Current Reporting Period */}
            <div className="">
                <h3 className="text-lg font-medium text-gray-800 mb-4">
                Current Reporting Period
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reporting Period Start Date
                    </label>
                    <input
                    type="date"
                    className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] transition-colors"
                    defaultValue="2024-01-01"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reporting Period End Date
                    </label>
                    <input
                    type="date"
                    className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] transition-colors"
                    defaultValue="2024-12-31"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reporting Frequency
                    </label>
                    <select
                    className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] bg-white"
                    >
                    <option value="annual">Annual</option>
                    <option value="biannual">Biannual</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="other">Other</option>
                    </select>
                </div>
                </div>
            </div>

            {/* Previous Period */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                Previous Reporting Period (for comparison)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                <div>
                    <input
                    type="date"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50"
                    defaultValue="2023-01-01"
                    disabled
                    />
                </div>
                <div>
                    <input
                    type="date"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50"
                    defaultValue="2023-12-31"
                    disabled
                    />
                </div>
                </div>
            </div>

            {/* Period Change */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                Has the reporting period changed compared to last year?
                </label>
                <div className="flex items-center gap-6">
                <label className="flex items-center">
                    <input
                    type="radio"
                    name="periodChanged"
                    value="no"
                    defaultChecked
                    className="h-4 w-4 text-[#4639AA] focus:ring-[#4639AA]"
                    />
                    <span className="ml-2 text-sm text-gray-700">No</span>
                </label>
                <label className="flex items-center">
                    <input
                    type="radio"
                    name="periodChanged"
                    value="yes"
                    className="h-4 w-4 text-[#4639AA] focus:ring-[#4639AA]"
                    />
                    <span className="ml-2 text-sm text-gray-700">Yes</span>
                </label>
                </div>
            </div>

            {/* Restatements */}
            <div className="space-y-4">
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Are there restatements of previously reported information?
                </label>
                <div className="flex items-center gap-6">
                    <label className="flex items-center">
                    <input
                        type="radio"
                        name="restatements"
                        value="yes"
                        className="h-4 w-4 text-[#4639AA] focus:ring-[#4639AA]"
                    />
                    <span className="ml-2 text-sm text-gray-700">Yes</span>
                    </label>
                    <label className="flex items-center">
                    <input
                        type="radio"
                        name="restatements"
                        value="no"
                        defaultChecked
                        className="h-4 w-4 text-[#4639AA] focus:ring-[#4639AA]"
                    />
                    <span className="ml-2 text-sm text-gray-700">No</span>
                    </label>
                </div>
                </div>

                {/* Conditional restatement description */}
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    If yes, describe the restatement and reason
                </label>
                <textarea
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y"
                    placeholder="e.g. Correction of energy data due to meter error"
                    defaultValue="Correction of energy data due to meter error"
                />
                </div>
            </div>

            {/* Note */}
            <div className="text-sm text-gray-500 bg-blue-50 border border-blue-100 p-4 rounded-lg">
                <strong>Note:</strong> Restatements should be clearly explained as per GRI requirements to ensure comparability and transparency.
            </div>
            </div>
        );

      case 2:
        return (
            <div className="space-y-8">
            <h2 className="text-xl font-semibold text-gray-700">
                Sub-Module 1.3: <span className="text-[#4639AA]"> Organizational Boundary </span>
            </h2>

            {/* Boundary Approach */}
            <div className="">
                <h3 className="text-lg font-medium text-gray-800 mb-4">
                Boundary Definition
                </h3>

                <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    Which boundary approach is used?
                    </label>
                    <select
                    className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] bg-white"
                    >
                    <option value="operational">Operational control</option>
                    <option value="equity">Equity share</option>
                    <option value="financial">Financial control</option>
                    <option value="other">Other</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    Describe the reporting boundary
                    </label>
                    <textarea
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y"
                    defaultValue="All manufacturing units under direct operational control"
                    placeholder="Describe which entities, activities, facilities, or operations are included..."
                    />
                </div>
                </div>
            </div>

            {/* Alignment with Financial Reporting */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                Is the sustainability boundary aligned with financial reporting?
                </label>
                <div className="flex items-center gap-6">
                <label className="flex items-center">
                    <input
                    type="radio"
                    name="boundaryAligned"
                    value="yes"
                    defaultChecked
                    className="h-4 w-4 text-[#4639AA] focus:ring-[#4639AA]"
                    />
                    <span className="ml-2 text-sm text-gray-700">Yes</span>
                </label>
                <label className="flex items-center">
                    <input
                    type="radio"
                    name="boundaryAligned"
                    value="no"
                    className="h-4 w-4 text-[#4639AA] focus:ring-[#4639AA]"
                    />
                    <span className="ml-2 text-sm text-gray-700">No</span>
                </label>
                </div>

                {/* Conditional field - shown only if "No" */}
                <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    If not aligned, explain differences
                </label>
                <textarea
                    rows={2}
                    className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y bg-gray-50"
                    placeholder="e.g. Sustainability includes upstream suppliers not in financial consolidation..."
                    defaultValue="N/A"
                />
                </div>
            </div>

            {/* Consolidation & Exclusions */}
            <div className="space-y-6">
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    What consolidation method is applied?
                </label>
                <select
                    className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] bg-white"
                >
                    <option>Full consolidation</option>
                    <option>Proportionate consolidation</option>
                    <option>Equity method</option>
                    <option>None</option>
                </select>
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Which entities or activities are excluded?
                </label>
                <textarea
                    rows={2}
                    className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y"
                    defaultValue="Joint venture in Lahore"
                    placeholder="List excluded entities, joint ventures, non-operated assets, etc."
                />
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Justification for exclusions
                </label>
                <textarea
                    rows={2}
                    className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y"
                    defaultValue="No operational control"
                    placeholder="e.g. No operational control, minority share, immaterial impact..."
                />
                </div>
            </div>

            {/* Boundary Changes & Significant Impacts */}
            <div className="space-y-6">
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Has the reporting boundary changed since last year?
                </label>
                <div className="flex items-center gap-6">
                    <label className="flex items-center">
                    <input
                        type="radio"
                        name="boundaryChanged"
                        value="no"
                        defaultChecked
                        className="h-4 w-4 text-[#4639AA] focus:ring-[#4639AA]"
                    />
                    <span className="ml-2 text-sm text-gray-700">No</span>
                    </label>
                    <label className="flex items-center">
                    <input
                        type="radio"
                        name="boundaryChanged"
                        value="yes"
                        className="h-4 w-4 text-[#4639AA] focus:ring-[#4639AA]"
                    />
                    <span className="ml-2 text-sm text-gray-700">Yes</span>
                    </label>
                </div>
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Are there significant impacts outside the reporting boundary?
                </label>
                <div className="flex items-center gap-6 mb-3">
                    <label className="flex items-center">
                    <input
                        type="radio"
                        name="impactsOutside"
                        value="yes"
                        className="h-4 w-4 text-[#4639AA] focus:ring-[#4639AA]"
                    />
                    <span className="ml-2 text-sm text-gray-700">Yes</span>
                    </label>
                    <label className="flex items-center">
                    <input
                        type="radio"
                        name="impactsOutside"
                        value="no"
                        defaultChecked
                        className="h-4 w-4 text-[#4639AA] focus:ring-[#4639AA]"
                    />
                    <span className="ml-2 text-sm text-gray-700">No</span>
                    </label>
                </div>

                <textarea
                    rows={2}
                    className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y"
                    defaultValue="Yes – upstream cotton farming"
                    placeholder="Describe significant impacts (e.g. Scope 3 emissions from suppliers, downstream activities...)"
                />
                </div>
            </div>

            {/* Helpful Note */}
            <div className="text-sm text-gray-500 bg-blue-50 border border-blue-100 p-4 rounded-lg">
                <strong>Note:</strong> The organizational boundary should be consistent with the chosen approach and clearly documented as per GRI 103-1.
            </div>
            </div>
        );

      case 3:
        return (
            <div className="space-y-8">
                <div>
                    <h2 className="text-xl font-semibold text-gray-700">
                        Sub-Module 1.4: <span className="text-[#4639AA]"> Legal Entities & Operational Sites </span>
                    </h2>

                    <p className="text-gray-600 mt-1">
                        List all legal entities and operational sites included in (or excluded from) the reporting boundary.
                    </p>
                </div>

                {/* Entities List */}
                <div className="space-y-6">
                    {entities.map((entity, index) => (
                        <div
                            key={index}
                            className="bg-gray-50 border border-gray-200 rounded-lg p-5 relative"
                        >
                            {/* Remove button - hidden for first entry if you want to force at least one */}
                            {entities.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeEntity(index)}
                                className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-sm font-medium"
                            >
                                Remove
                            </button>
                            )}

                            <h3 className="text-lg font-medium text-gray-800 mb-4">
                            Entity / Site {index + 1}
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                Name of Entity / Site
                                </label>
                                <input
                                type="text"
                                value={entity.name}
                                onChange={(e) => updateEntity(index, "name", e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]"
                                placeholder="e.g. ABC Spinning Unit"
                                />
                            </div>

                            {/* Country */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                Country of Operation
                                </label>
                                <select
                                value={entity.country}
                                onChange={(e) => updateEntity(index, "country", e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] bg-white"
                                >
                                <option value="">Select country</option>
                                <option value="Pakistan">Pakistan</option>
                                <option value="Bangladesh">Bangladesh</option>
                                <option value="India">India</option>
                                {/* Add more countries as needed */}
                                </select>
                            </div>

                            {/* Entity Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                Entity Type
                                </label>
                                <select
                                value={entity.type}
                                onChange={(e) => updateEntity(index, "type", e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] bg-white"
                                >
                                <option value="manufacturing">Manufacturing facility</option>
                                <option value="office">Head office</option>
                                <option value="warehouse">Warehouse / Distribution</option>
                                <option value="other">Other</option>
                                </select>
                            </div>

                            {/* Ownership % */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                Ownership Percentage
                                </label>
                                <input
                                type="number"
                                min="0"
                                max="100"
                                value={entity.ownership}
                                onChange={(e) => updateEntity(index, "ownership", e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]"
                                placeholder="100"
                                />
                            </div>

                            {/* Included in boundary */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                Included in reporting boundary?
                                </label>
                                <div className="flex items-center gap-6">
                                <label className="flex items-center">
                                    <input
                                    type="radio"
                                    name={`included-${index}`}
                                    value="yes"
                                    checked={entity.included}
                                    onChange={() => updateEntity(index, "included", true)}
                                    className="h-4 w-4 text-[#4639AA] focus:ring-[#4639AA]"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">Yes</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                    type="radio"
                                    name={`included-${index}`}
                                    value="no"
                                    checked={!entity.included}
                                    onChange={() => updateEntity(index, "included", false)}
                                    className="h-4 w-4 text-[#4639AA] focus:ring-[#4639AA]"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">No</span>
                                </label>
                                </div>
                            </div>

                            {/* Conditional - Reason if excluded */}
                            {!entity.included && (
                                <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Reason for exclusion
                                </label>
                                <textarea
                                    rows={2}
                                    value={entity.exclusionReason}
                                    onChange={(e) => updateEntity(index, "exclusionReason", e.target.value)}
                                    className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y"
                                    placeholder="e.g. No operational control"
                                />
                                </div>
                            )}

                            {/* Employees */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                Number of Employees at Site
                                </label>
                                <input
                                type="number"
                                min="0"
                                value={entity.employees}
                                onChange={(e) => updateEntity(index, "employees", e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]"
                                placeholder="600"
                                />
                            </div>

                            {/* Environmentally significant */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                Is this an environmentally significant site?
                                </label>
                                <div className="flex items-center gap-6">
                                <label className="flex items-center">
                                    <input
                                    type="radio"
                                    name={`envSignificant-${index}`}
                                    value="yes"
                                    checked={entity.envSignificant}
                                    onChange={() => updateEntity(index, "envSignificant", true)}
                                    className="h-4 w-4 text-[#4639AA] focus:ring-[#4639AA]"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">Yes</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                    type="radio"
                                    name={`envSignificant-${index}`}
                                    value="no"
                                    checked={!entity.envSignificant}
                                    onChange={() => updateEntity(index, "envSignificant", false)}
                                    className="h-4 w-4 text-[#4639AA] focus:ring-[#4639AA]"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">No</span>
                                </label>
                                </div>
                            </div>

                            {/* High-risk site */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                Is this a high-risk site (H&S / human rights)?
                                </label>
                                <div className="flex items-center gap-6">
                                <label className="flex items-center">
                                    <input
                                    type="radio"
                                    name={`highRisk-${index}`}
                                    value="yes"
                                    checked={entity.highRisk}
                                    onChange={() => updateEntity(index, "highRisk", true)}
                                    className="h-4 w-4 text-[#4639AA] focus:ring-[#4639AA]"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">Yes</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                    type="radio"
                                    name={`highRisk-${index}`}
                                    value="no"
                                    checked={!entity.highRisk}
                                    onChange={() => updateEntity(index, "highRisk", false)}
                                    className="h-4 w-4 text-[#4639AA] focus:ring-[#4639AA]"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">No</span>
                                </label>
                                </div>
                            </div>

                            {/* Operational Status */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                Operational Status
                                </label>
                                <select
                                value={entity.status}
                                onChange={(e) => updateEntity(index, "status", e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] bg-white"
                                >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                                <option value="under-construction">Under construction</option>
                                <option value="closed">Closed</option>
                                </select>
                            </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Add new entity button */}
                <button
                    type="button"
                    onClick={addEntity}
                    className="px-6 py-2.5 border border-[#4639AA] hover:bg-[#3a2f8f] text-[#4639AA] rounded-lg font-medium transition-colors"
                >
                    + Add Another Entity / Site
                </button>

                {/* Summary note */}
                <div className="text-sm text-gray-500 bg-blue-50 border border-blue-100 p-4 rounded-lg mt-6">
                    <strong>Note:</strong> Include all entities and sites relevant to your operational control boundary. 
                    Clearly document exclusions to ensure GRI compliance.
                </div>
            </div>
        );

      case 4:
        return (
            <div className="space-y-8">
                <div>
                    <h2 className="text-xl font-semibold text-gray-700">
                        Sub-Module 1.5: <span className="text-[#4639AA]"> Reporting Standards, Options & Assurance </span>
                    </h2>

                    <p className="text-gray-600 mt-1">
                        Define which standards and frameworks are applied, the level of compliance, and any external assurance.
                    </p>
                </div>

            {/* GRI Standards Section */}
            <div className=" space-y-6">
                <h3 className="text-lg font-medium text-gray-800">GRI Reporting</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* In Accordance */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Is the report prepared in accordance with GRI?
                        </label>
                        <div className="flex items-center gap-6">
                            <label className="flex items-center">
                            <input
                                type="radio"
                                name="griInAccordance"
                                value="yes"
                                defaultChecked
                                className="h-4 w-4 text-[#4639AA] focus:ring-[#4639AA]"
                            />
                            <span className="ml-2 text-sm text-gray-700">Yes</span>
                            </label>
                            <label className="flex items-center">
                            <input
                                type="radio"
                                name="griInAccordance"
                                value="no"
                                className="h-4 w-4 text-[#4639AA] focus:ring-[#4639AA]"
                            />
                            <span className="ml-2 text-sm text-gray-700">No</span>
                            </label>
                        </div>
                    </div>

                    {/* GRI Version */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                        GRI version applied
                        </label>
                        <select
                        className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] bg-white"
                        >
                        <option>GRI 2021</option>
                        <option>GRI 2016</option>
                        <option>GRI 2024 (Universal Standards)</option>
                        </select>
                    </div>

                    {/* Reporting Standards - Multi-select */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                        Which reporting standards are used?
                        </label>
                        <div className="space-y-2">
                        {["GRI Standards", "SASB", "CDP", "Other"].map((standard) => (
                            <label key={standard} className="flex items-center">
                            <input
                                type="checkbox"
                                defaultChecked={standard === "GRI Standards"}
                                className="h-4 w-4 text-[#4639AA] focus:ring-[#4639AA] border-gray-300 rounded"
                            />
                            <span className="ml-2 text-sm text-gray-700">{standard}</span>
                            </label>
                        ))}
                        </div>
                    </div>
                </div>

                {/* GRI Claim */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Which GRI claim is used?
                    </label>
                    <select
                        className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] bg-white"
                    >
                        <option>In accordance – Core</option>
                        <option>In accordance – Comprehensive</option>
                        <option>With reference to GRI Standards</option>
                        <option>None</option>
                    </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Content Index */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Is a GRI Content Index included?
                        </label>
                        <div className="flex items-center gap-6">
                            <label className="flex items-center">
                            <input
                                type="radio"
                                name="contentIndex"
                                value="yes"
                                defaultChecked
                                className="h-4 w-4 text-[#4639AA] focus:ring-[#4639AA]"
                            />
                            <span className="ml-2 text-sm text-gray-700">Yes</span>
                            </label>
                            <label className="flex items-center">
                            <input
                                type="radio"
                                name="contentIndex"
                                value="no"
                                className="h-4 w-4 text-[#4639AA] focus:ring-[#4639AA]"
                            />
                            <span className="ml-2 text-sm text-gray-700">No</span>
                            </label>
                        </div>
                    </div>

                    {/* External Assurance */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Is external assurance obtained?
                        </label>
                        <div className="flex items-center gap-6">
                            <label className="flex items-center">
                            <input
                                type="radio"
                                name="assurance"
                                value="no"
                                defaultChecked
                                className="h-4 w-4 text-[#4639AA] focus:ring-[#4639AA]"
                            />
                            <span className="ml-2 text-sm text-gray-700">No</span>
                            </label>
                            <label className="flex items-center">
                            <input
                                type="radio"
                                name="assurance"
                                value="yes"
                                className="h-4 w-4 text-[#4639AA] focus:ring-[#4639AA]"
                            />
                            <span className="ml-2 text-sm text-gray-700">Yes</span>
                            </label>
                        </div> 
                    </div>

                     {/* Conditional assurance details */}
                    <div className="">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                        If yes, scope and assurance provider
                        </label>
                        <textarea
                        rows={2}
                        className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y bg-gray-50"
                        placeholder="e.g. Limited assurance on GHG emissions by KPMG"
                        defaultValue="N/A"
                        />
                    </div>

                    {/* Report Type */}
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Report type
                    </label>
                    <select
                        className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] bg-white"
                    >
                        <option>Standalone sustainability report</option>
                        <option>Integrated annual report</option>
                        <option>Sustainability section in annual report</option>
                        <option>Other</option>
                    </select>
                    </div>
                </div>
            </div>

            {/* Report Type & Other Frameworks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Publication Format - Multi-select */}
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Report publication format
                </label>
                <div className="space-y-2">
                    {["PDF", "Website (HTML)", "Interactive online report", "Printed report", "Other"].map((format) => (
                    <label key={format} className="flex items-center">
                        <input
                        type="checkbox"
                        defaultChecked={["PDF", "Website (HTML)"].includes(format)}
                        className="h-4 w-4 text-[#4639AA] focus:ring-[#4639AA] border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">{format}</span>
                    </label>
                    ))}
                </div>
                </div>

                {/* Other Frameworks - Multi-select */}
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Are other frameworks used?
                </label>
                <div className="space-y-2">
                    {["TCFD", "UN SDGs", "SBTi", "CDP", "ISSB", "None"].map((fw) => (
                    <label key={fw} className="flex items-center">
                        <input
                        type="checkbox"
                        defaultChecked={["TCFD", "UN SDGs"].includes(fw)}
                        className="h-4 w-4 text-[#4639AA] focus:ring-[#4639AA] border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">{fw}</span>
                    </label>
                    ))}
                </div>
                </div>
            </div>

           

            {/* Final Note */}
            <div className="text-sm text-gray-500 bg-blue-50 border border-blue-100 p-4 rounded-lg">
                <strong>Note:</strong> Selecting the appropriate GRI claim and including a Content Index is required for formal "in accordance" reports.
            </div>
            </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4639AA] to-[#1893A1] overflow-hidden relative py-8 px-4 ">
      <div className="max-w-7xl mx-auto relative z-50">

        {/* Header Card */}
        <div className="bg-white/85 backdrop-blur-2xl rounded-xl shadow p-6">
          <h1 className="text-2xl  font-bold text-gray-700">
            <span className="text-[#4639AA]">MODULE 1:</span> Organization & Reporting Setup
          </h1>
          <div className=" inline-flex items-center gap-2 text-lg  text-[#1893A1] font-medium">
            Sets up the basics of the organization and its operations.
        </div>

          {/* Progress */}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:gap-6">
            <div className="flex items-center gap-4 flex-1">
              <span className="text-sm font-medium text-gray-600 whitespace-nowrap">
                Step {activeTab + 1} of 5
              </span>
              <div className="flex-1 h-3 bg-gray-50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-br from-[#4639AA]  to-[#1893A1] transition-all duration-500"
                  style={{ width: `${((activeTab + 1) / 5) * 100}%` }}
                />
              </div>
            </div>
            <span className="text-sm text-gray-600 mt-2 sm:mt-0">
              {Math.round(((activeTab + 1) / 5) * 100)}% Complete
            </span>
          </div>
        </div>

        {/* Main Layout - Sidebar + Content */}
        <div className="lg:flex justify-start items-start gap-6">
          {/* Sidebar Navigation */}
          <div className="w-full lg:w-1/3 mt-6">
            <div className="bg-white/85 backdrop-blur-2xl rounded-xl shadow border border-gray-200 p-4 lg:h-[calc(88vh-150px)]">
              <div className="space-y-2">
                {tabs.map((tab, index) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-md text-left transition-all
                            ${
                            activeTab === tab.id
                                ? "bg-gradient-to-br from-[#4639AA]  to-[#1893A1] text-white shadow-sm"
                                : "text-gray-700 hover:bg-[#F0EEFF]"
                            }`}
                        >
                        
                        {/* Icon */}
                        <Icon
                            icon={tab.icon}
                            className={`text-2xl ${
                            activeTab === tab.id ? "text-white" : "text-gray-600"
                            }`}
                        />

                        {/* Label */}
                        <span className=" font-medium text-nowrap">{tab.label}</span>
                    </button>
                ))}
                </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full ">
            <div className="bg-white/85 backdrop-blur-2xl rounded-xl shadow border border-gray-200 p-6 md:p-8 mt-6 ">
                <div className="lg:h-[calc(80vh-150px)] overflow-y-auto scrollbar-theme">
                    {renderTabContent()}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between pt-4 mt-6 border-t">
                        <button
                        disabled={activeTab === 0}
                        onClick={() => setActiveTab((prev) => Math.max(0, prev - 1))}
                        className="px-6 py-2 bg-gray-50 text-gray-700 rounded-lg font-medium hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                        Back
                        </button>

                        <button
                        onClick={() => setActiveTab((prev) => Math.min(4, prev + 1))}
                        className="px-8 py-2 text-lg bg-gradient-to-br from-[#4639AA]  to-[#1893A1] text-white rounded-lg font-medium hover:bg-[#3a2f8f] transition-colors"
                        >
                        {activeTab === 4 ? "Save & Finish" : "Save & Next"}
                        </button>
                    </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute -bottom-40 -right-60 z-10">
              <img src={Shap1} alt="Shape" className="h-full w-[500px] opacity-10" />
            </div>
            <div className="absolute -top-40 -left-60 z-10">
              <img src={Shap1} alt="Shape" className="h-full w-[500px] opacity-10" />
            </div>
    </div>
  );
};

export default OrganizationSetup;