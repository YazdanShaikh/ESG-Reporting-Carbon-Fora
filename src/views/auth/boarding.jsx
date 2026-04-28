import React, { useState, useEffect, useRef } from "react";

import { useNavigate } from "react-router-dom";
import Val from "../../assets/images/all-img/val.png";
import Logo from "../../assets/images/logo/logo-car.png";
import Shap2 from "../../assets/images/shap/ctag.png";
import Shap1 from "../../assets/images/shap/Ellipse 2.png";
import Shap3 from "../../assets/images/shap/Ellipse 3.png";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import { submitOnboarding, getOnboarding } from "../../services/onboarding.service";
import CountryMultiSelect from "../../components/partials/CountryMultiSelect";
import { handleError } from "../../utils/functions";
import {
  operatingCountries,
  organizationType,
  employeeCount,
  useFuels,
  fuelUsageUnit as fuelUsageUnitOptions,
  useRenewableEnergy,
  trackingFrequency,
  trackPerformanceOverTime as trackPerformanceOverTimeOptions,
  yesNoOptions,
  businessSectors,
} from "../../constant/onboarding";

const steps = [
  "Company Profile",
  "Environmental",
  "Social",
  "Governance",
  "Scoring & Review",
];

const Boarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [started, setStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    // Step 1: Company Profile
    legalName: "",
    operatingCountries: [],
    sector: "Manufacturing",
    organizationType: "",
    employeeCount: "",
    website: "",
    companyProfileFile: null,

    // Step 2: Environmental
    useElectricity: false,
    electricityBills: null,
    useFuel: false,
    fuelTypes: [],
    fuelUsageQuantity: "",
    fuelUsageUnit: "",
    fuelPurchaseInvoices: null,
    generatorLogs: null,
    useRenewableEnergy: "Not Sure",
    renewableEnergyDocument: null,
    consumeWater: false,
    waterUtilityBills: null,
    generateWaste: false,
    trackWaste: false,
    wasteDisposalReceipts: null,
    wasteContractorAgreements: null,
    hazardousWasteManifests: null,
    calculatedEmissionsPast: false,
    carbonFootprintReport: null,
    ghgCalculationSpreadsheet: null,
    consultantReport: null,

    // Step 3: Social
    hasEmployeeList: false,
    organizationalChart: null,
    trackTurnover: false,
    hrTurnoverSummary: null,
    hasContractWorkers: false,
    safetyIncidents: false,
    incidentReports: null,
    safetyLogs: null,
    provideTraining: false,
    trainingAttendanceRecords: null,
    trainingPolicy: null,
    writtenPolicies: [],
    policyDocuments: null,
    hasGrievanceMechanism: false,
    whistleblowerPolicy: null,
    grievanceProcedureDocument: null,

    // Step 4: Governance
    hasBoardOfDirectors: false,
    totalBoardMembers: "",
    femaleBoardMembers: "",
    boardListOrAnnualReport: null,
    companyType: "Private Limited",
    hasEthicsPolicy: false,
    codeOfConductDocument: null,
    hasESGTraining: false,
    trainingMaterial: null,
    attendanceSheet: null,
    workWithSuppliers: false,
    askSuppliersEthicalCodes: false,
    supplierCodeOfConduct: null,
    vendorContracts: null,

    // Step 5: Scoring
    hasPublicESGTargets: false,
    esgTargetDocument: null,
    sustainabilityStrategy: null,
    conductedStakeholderSurveys: false,
    surveyResultsSummary: null,
    hasPreviousESGReport: false,
    previousESGReport: null,
    esgObjectives: [],

    isAccurate: false,
  });

  useEffect(() => {
    const fetchOnboardingData = async () => {
      try {
        const res = await getOnboarding();
        if (res.success && res.data) {
          // Merge fetched data with initial state, ensuring we don't break nulls/undefineds
          setFormData(prev => ({
            ...prev,
            ...res.data,
            // Ensure arrays are initialized if missing
            operatingCountries: res.data.operatingCountries || [],
            fuelTypes: res.data.fuelTypes || [],
            writtenPolicies: res.data.writtenPolicies || [],
            esgObjectives: res.data.esgObjectives || [],
          }));
        }
      } catch (error) {
        console.error("Failed to fetch onboarding data:", error);
      }
    };
    fetchOnboardingData();
  }, []);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field, value) => {
    setFormData((prev) => {
      const current = prev[field] || [];
      return {
        ...prev,
        [field]: current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value],
      };
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const data = new FormData();

    const booleanFields = [
      'useElectricity', 'useFuel', 'consumeWater', 'generateWaste', 'trackWaste',
      'calculatedEmissionsPast', 'hasEmployeeList', 'trackTurnover', 'hasContractWorkers',
      'safetyIncidents', 'provideTraining', 'hasGrievanceMechanism', 'hasBoardOfDirectors',
      'hasEthicsPolicy', 'hasESGTraining', 'workWithSuppliers', 'askSuppliersEthicalCodes',
      'hasPublicESGTargets', 'conductedStakeholderSurveys', 'hasPreviousESGReport', 'isAccurate',
    ];

    const arrayFields = ['operatingCountries', 'fuelTypes', 'writtenPolicies', 'esgObjectives'];
    const multiFileFields = ['electricityBills', 'policyDocuments'];

    try {
      for (const [key, value] of Object.entries(formData)) {
        if (value === null || value === undefined || value === '') continue;

        if (booleanFields.includes(key)) {
          // Backend expects "true" or "false" as strings
          data.append(key, (value === true || value === 'true' || value === 'Yes') ? 'true' : 'false');
        } else if (arrayFields.includes(key) && Array.isArray(value)) {
          // Guide says send as repeated keys: key[]
          value.forEach((item) => data.append(`${key}[]`, item));
        } else if (multiFileFields.includes(key) && (value instanceof FileList || Array.isArray(value))) {
          // Guide says Multiple files allowed
          const files = value instanceof FileList ? Array.from(value) : value;
          files.forEach((file) => data.append(key, file));
        } else {
          // Files, Strings, Numbers
          data.append(key, value);
        }
      }

      const res = await submitOnboarding(data);
      if (res.data.success) {
        toast.success("Your onboarding has been submitted!");
        navigate("/dashboard");
      } else {
        throw new Error(res.data.message || "Submission failed");
      }
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };


  const InfoLabel = ({ label, info }) => {
    const [open, setOpen] = useState(false);

    return (
      <div className="space-y-1 mb-2">
        <label className="text-sm font-medium text-white flex items-center gap-1">
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
                : "text-gray-200 hover:text-[#4639AA]"
                }`}
            />
          </button>
        </label>

        {open && (
          <div className="text-sm text-gray-200 animate-fadeIn ">
            {info}
          </div>
        )}
      </div>
    );
  };

  const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", 
  "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", 
  "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", 
  "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", 
  "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Costa Rica",
  "Congo (Congo-Brazzaville)", "Croatia", "Cuba", "Fiji", "Czechia (Czech Republic)", "Denmark",
  "Democratic Republic of the Congo", "Djibouti", "Dominica", "Cyprus", "Dominican Republic", 
  "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Swaziland", "Ethiopia", 
  "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Haiti", 
  "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Honduras", "Hungary", "Iceland", "India", "Iran",
  "Indonesia", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", 
  "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", 
  "Liechtenstein", "Lithuania", "Serbia", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", 
  "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", 
  "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Togo", "Myanmar (formerly Burma)", 
  "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Spain", "Nigeria", 
  "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine State", 
  "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", 
  "Romania", "Russia", "Turkey", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Yemen", 
  "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", 
  "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", 
  "Somalia", "South Africa", "South Korea", "South Sudan", "Sri Lanka", "Sudan", "Suriname", "Sweden", 
  "Switzerland", "Syria", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Tonga", "Tunisia", 
  "Zambia", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", 
  "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", 
  "Zimbabwe", "Trinidad and Tobago",
];


// Custom MultiSelect for Written Policies
                    

const WrittenPoliciesMultiSelect = ({ label, info, options, selected, onChange }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const toggleOption = (option) => {
    if (selected.includes(option)) {
      onChange(selected.filter((o) => o !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div className="mb-4" ref={containerRef}>
      <InfoLabel label={label} info={info} />
      <div
        className="relative"
      >
        <button
          type="button"
          className="w-full flex items-center justify-between border rounded-md px-4 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#4639AA] cursor-pointer"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="truncate text-left flex-1">
            {selected.length === 0 ? "Select Written Policies" : selected.join(", ")}
          </span>
          <Icon icon={open ? "mdi:chevron-up" : "mdi:chevron-down"} className="ml-2 text-xl text-[#4639AA]" />
        </button>
        {open && (
          <div className="absolute z-50 mt-1 w-full max-h-64 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-lg animate-fadeIn">
            {options.map((option) => (
              <label
                key={option}
                className={`flex items-center px-4 py-2 cursor-pointer hover:bg-[#f3f4f6] transition text-gray-800 gap-2 ${selected.includes(option) ? "bg-[#e0e7ff]" : ""}`}
              >
                <input
                  type="checkbox"
                  checked={selected.includes(option)}
                  onChange={() => toggleOption(option)}
                  className="accent-[#4639AA]"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

  return (
    <div className=" bg-gradient-to-r from-[#4639AA] to-[#1893A1] px-4 overflow-hidden">
      {!started && (
        <section className="min-h-screen flex items-center justify-center relative">
          <div className="max-w-5xl w-full text-center relative z-50"> {/* Logo */}
            <div className="flex justify-center items-center ">
              <img src={Logo} alt="The CM Stack" className="h-9 mb-8" />
            </div>
            {/* Heading */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-white">
              Welcome to ESG Onboarding
            </h1>

            <p className="mt-3 text-white/80 max-w-xl mx-auto">
              CarbonFora will guide you step-by-step to generate your ESG score & insights.
            </p>
            {/* <img src={Val} alt="Val" className="w-24 md:w-64 mx-auto my-6" /> */}
            {/* Footer Buttons */}
            <div className="mt-10 flex justify-center gap-4">
              <button
                onClick={() => setStarted(true)}
                className="px-10 py-3 rounded-full bg-white text-[#4639AA] font-semibold text-lg hover:scale-105 transition"
              >
                Let’s Get Started →
              </button>
            </div>
          </div>
          <div className="absolute  z-10">
            <img src={Shap2} alt="Shape" className="h-full w-full opacity-80" />
          </div>
        </section>
      )}
      {started && (
        <section className="min-h-screen relative">
          <div className="max-w-5xl mx-auto  py-10 relative z-50">

            {/* Header */}
            <div className="flex flex-col gap-1 items-center justify-between mb-10">
              {/* Left */}
              <img src={Logo} alt="The CM Stack" className="h-12 mb-4" />
              <h1 className="text-2xl font-bold text-white">ESG Onboarding</h1>
              <p className="text-white/90 font-medium text-lg">{steps[step]}</p>
            </div>

            {/* Progress */}
            <div className="flex items-center justify-center  mb-8">
              {steps.map((label, i) => {
                const isCompleted = i < step;
                const isActive = i === step;

                return (
                  <div key={i} className="flex items-center">

                    {/* Step Circle */}
                    <div className=" border-y md:border-y-2 border-white/70 p-1 rounded-full">
                      <div className={`relative z-10 flex items-center justify-center w-6 h-6 md:w-10 md:h-10 rounded-full text-sm font-bold
                            ${isCompleted
                            ? "bg-transparent border-2  text-white"
                            : isActive
                              ? "border border-gray-300 text-[#4639AA] bg-white"
                              : "bg-white/70 text-gray-500"
                          }`}
                      >
                        {i + 1}
                      </div>
                    </div>

                    {/* Connector (ONLY if not last step) */}
                    {i !== steps.length - 1 && (
                      <div className=" w-6 sm:w-12 md:w-20 lg:w-24 h-[2px] md:h-[3px] mx-1  rounded-full ">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${isCompleted
                            ? "bg-white"
                            : "bg-white/70"
                            }`}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Content Card */}
            <div className="bg-white/10  backdrop-blur-xl max-w-2xl mx-auto rounded-xl md:rounded-3xl shadow-2xl p-4  border border-white/20">
              <div className="md:p-6 lg:p-8 h-[90vh] overflow-y-auto scrollbar-theme">

                {/* STEP 1 — COMPANY PROFILE */}
                {step === 0 && (
                  <div className="space-y-6">
                    <div className="space-y-1 mb-2">
                      <label className="text-2xl font-bold text-white flex items-center gap-2">
                        Basic Company Details
                        <button
                          type="button"
                          onClick={() => setOpen(!open)}
                          className="focus:outline-none"
                        >
                          <Icon
                            icon="material-symbols:info-outline-rounded"
                            className={`text-lg cursor-pointer transition-colors ${open
                              ? "text-[#4639AA]"
                              : "text-gray-200 hover:text-[#4639AA]"
                              }`}
                          />
                        </button>
                      </label>

                      {open && (
                        <div className="text-sm text-white/80 animate-fadeIn ">
                          This helps determine which reporting requirements may apply.
                        </div>
                      )}
                    </div>

                    {/* Q1: Legal Name (unchanged) */}
                    <Input
                      label="Q1. What is your company’s legal name?"
                      placeholder="Full legal name"
                      value={formData.legalName}
                      onChange={(e) => handleChange("legalName", e.target.value)}
                    />

                    {/* Q2: Industry Dropdown */}
                      <Select
                        label="Q2. What industry do you operate in?"
                        options={["Manufacturing", "Services", "Retail", "Energy", "Construction", "Other (please mention)"]}
                        value={formData.sector}
                        onChange={(e) => {
                          handleChange("sector", e.target.value);
                          if (e.target.value !== "Other (please mention)") {
                            handleChange("sectorOther", "");
                          }
                        }}
                      />
                      {formData.sector === "Other (please mention)" && (
                        <Input
                          label="Please specify your industry"
                          placeholder="Enter your industry"
                          value={formData.sectorOther || ""}
                          onChange={(e) => handleChange("sectorOther", e.target.value)}
                        />
                      )}

                    {/* Q3: Number of Employees (numeric) */}
                    <Input
                      label="Q3. Number of employees (approximate)?"
                      type="number"
                      placeholder="e.g. 100"
                      value={formData.employeeCount}
                      onChange={(e) => handleChange("employeeCount", e.target.value)}
                    />

                    {/* Q4: Countries of Operation (multi-select) */}
                    <CountryMultiSelect
                      label="Q4. Countries of Operation"
                      options={COUNTRIES}
                      selected={formData.operatingCountries}
                      onChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          operatingCountries: value,
                        }))
                      }
                    />

                    {/* ...rest of the fields... */}
                    <RadioGroup
                      label="What is your organization type?"
                      options={organizationType}
                      value={formData.organizationType}
                      onChange={(val) => handleChange("organizationType", val)}
                    />

                    <Input
                      label="Do you have a company website or profile we can review?"
                      placeholder="https://example.com"
                      value={formData.website}
                      onChange={(e) => handleChange("website", e.target.value)}
                    />
                    <Upload
                      label="Upload Company Profile (optional)"
                      onChange={(files) => handleChange("companyProfileFile", files)}
                    />
                  </div>
                )}

                {/* STEP 2 — ENVIRONMENTAL */}
                {step === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white mb-4">Environmental Information</h2>

                    {/* Q1: Electricity Usage */}
                    <div>
                      <InfoLabel
                        label="Q1. Does your company use electricity in its operations?"
                        info="Select 'Yes' if you receive electricity bills for offices, factories, warehouses, or stores."
                      />
                      <RadioGroup
                        options={yesNoOptions}
                        value={formData.useElectricity}
                        onChange={(val) => handleChange("useElectricity", val)}
                      />
                    </div>
                    {formData.useElectricity && (
                      <Upload
                        label="Upload Electricity bills (last 12 months) Excel or PDF"
                        onChange={(files) => handleChange("electricityBills", files)}
                      />
                    )}
                    <RadioGroup
                      label="Q2. Does your company use fuel (diesel, petrol, gas, LPG, etc.)?"
                      options={yesNoOptions}
                      value={formData.useFuel}
                      onChange={(val) => handleChange("useFuel", val)}
                    />
                    {formData.useFuel && (
                      <>
                        <CheckboxGroup
                          label="a. What type of fuel do you use?"
                          options={["Diesel", "Petrol", "Natural Gas", "LPG", "Other"]}
                          selected={formData.fuelTypes}
                          onChange={(val) => handleCheckboxChange("fuelTypes", val)}
                        />
                        {(() => {
                          // Determine allowed units based on selected fuel types
                          const selected = formData.fuelTypes || [];
                          // Remove kWh from all unit options
                          const allUnits = ["Liters (L)", "Cubic meters (m³)", "MMBtu", "Kilograms (kg)"];
                          let allowedUnits = [];
                          if (selected.length === 1) {
                            if (selected.includes("Diesel") || selected.includes("Petrol")) {
                              allowedUnits = ["Liters (L)"];
                            } else if (selected.includes("Natural Gas")) {
                              allowedUnits = ["Cubic meters (m³)", "MMBtu"];
                            } else if (selected.includes("LPG")) {
                              allowedUnits = ["Kilograms (kg)", "Liters (L)"];
                            } else if (selected.includes("Other")) {
                              allowedUnits = allUnits;
                            }
                          } else if (selected.length > 1) {
                            // If multiple types, combine units for selected types
                            let unitsSet = new Set();
                            if (selected.includes("Diesel") || selected.includes("Petrol")) {
                              unitsSet.add("Liters (L)");
                            }
                            if (selected.includes("Natural Gas")) {
                              unitsSet.add("Cubic meters (m³)");
                              unitsSet.add("MMBtu");
                            }
                            if (selected.includes("LPG")) {
                              unitsSet.add("Kilograms (kg)");
                              unitsSet.add("Liters (L)");
                            }
                            if (selected.includes("Other")) {
                              allUnits.forEach(u => unitsSet.add(u));
                            }
                            allowedUnits = Array.from(unitsSet);
                          }
                          // If nothing selected, show all
                          if (allowedUnits.length === 0) allowedUnits = allUnits;
                          return (
                            <div className="flex gap-4">
                              <div className="w-2/3">
                                <Input
                                  label="b. Approximate annual quantity used (if known)"
                                  type="number"
                                  value={formData.fuelUsageQuantity}
                                  onChange={(e) => handleChange("fuelUsageQuantity", e.target.value)}
                                />
                              </div>
                              <div className="w-1/3">
                                <Select
                                  label="Unit"
                                  options={allowedUnits}
                                  value={formData.fuelUsageUnit}
                                  onChange={(e) => handleChange("fuelUsageUnit", e.target.value)}
                                />
                              </div>
                            </div>
                          );
                        })()} 
                        <Upload
                          label="Upload Fuel purchase invoices (monthly) Excel or PDF"
                          onChange={(files) => handleChange("fuelPurchaseInvoices", files)}
                        />
                        <Upload
                          label="Upload Generator logs (if applicable)"
                          onChange={(files) => handleChange("generatorLogs", files)}
                        />
                      </>
                    )}

                    {/* Q3: Renewable Energy */}
                    <div>
                      <InfoLabel
                        label="Q3. Do you use renewable energy (solar, wind, green electricity contracts)?"
                        info="If you purchase green electricity or have solar panels."
                      />
                      <RadioGroup
                        options={["Yes", "No", "Not Sure"]}
                        value={formData.useRenewableEnergy}
                        onChange={(val) => handleChange("useRenewableEnergy", val)}
                      />
                    </div>
                    {formData.useRenewableEnergy === "Yes" && (
                      <Upload
                        label="Upload any agreement, certificate, or installation document."
                        onChange={(files) => handleChange("renewableEnergyDocument", files)}
                      />
                    )}

                    {/* Q4: Water Consumption */}
                    <div>
                      <InfoLabel
                        label="Q4. Does your company consume water in operations?"
                        info="Include water used in offices, factories, and production processes."
                      />
                      <RadioGroup
                        options={yesNoOptions}
                        value={formData.consumeWater}
                        onChange={(val) => handleChange("consumeWater", val)}
                      />
                    </div>
                    {formData.consumeWater && (
                      <Upload
                        label="Upload Water utility bills (monthly)"
                        onChange={(files) => handleChange("waterUtilityBills", files)}
                      />
                    )}

                    {/* Q5: Waste Generation */}
                    <RadioGroup
                      label="Q5. Does your company generate waste?"
                      options={yesNoOptions}
                      value={formData.generateWaste}
                      onChange={(val) => handleChange("generateWaste", val)}
                    />
                    {formData.generateWaste && (
                      <>
                        <RadioGroup
                          label="Q5a. Do you track waste quantities?"
                          options={yesNoOptions}
                          value={formData.trackWaste}
                          onChange={(val) => handleChange("trackWaste", val)}
                        />
                        <div className="mb-2">
                          <InfoLabel
                            label="Upload Waste Disposal Receipts (if available)"
                            info={
                              `Upload any invoices, receipts, or payment slips you receive when your waste is collected or disposed of.\n\nExamples:\n* Payment receipt from municipal waste service\n* Invoice from private waste collection company\n* Dumping fee receipt`
                            }
                          />
                          <Upload onChange={(files) => handleChange("wasteDisposalReceipts", files)} />
                        </div>
                        <div className="mb-2">
                          <InfoLabel
                            label="Upload Waste Contractor Agreements (if available)"
                            info={
                              `Upload any written agreement or contract between your company and the company that collects your waste.\n\nThis may include:\n* Annual waste collection contract\n* Service agreement with waste management company\n* Municipal waste service agreement\n\nThis helps confirm how your waste is handled and whether it is managed legally and responsibly.`
                            }
                          />
                          <Upload onChange={(files) => handleChange("wasteContractorAgreements", files)} />
                        </div>
                        <div className="mb-2">
                          <InfoLabel
                            label="Upload Hazardous Waste Manifests (if applicable)"
                            info={
                              `Upload official documents related to the disposal of hazardous or dangerous waste.\n\nHazardous waste includes:\n* Chemical waste\n* Used oil\n* Paints or solvents\n* Medical or laboratory waste\n* Batteries`
                            }
                          />
                          <Upload onChange={(files) => handleChange("hazardousWasteManifests", files)} />
                        </div>
                      </>
                    )}

                    {/* Q6: Carbon Emissions Calculation */}
                    <RadioGroup
                      label="Q6. Have you previously calculated your carbon emissions?"
                      options={yesNoOptions}
                      value={formData.calculatedEmissionsPast}
                      onChange={(val) => handleChange("calculatedEmissionsPast", val)}
                    />
                    {formData.calculatedEmissionsPast && (
                      <>
                        <Upload
                          label="Upload Carbon footprint report"
                          onChange={(files) => handleChange("carbonFootprintReport", files)}
                        />
                        <Upload
                          label="Upload GHG calculation spreadsheet"
                          onChange={(files) => handleChange("ghgCalculationSpreadsheet", files)}
                        />
                        <Upload
                          label="Upload Consultant report (if any)"
                          onChange={(files) => handleChange("consultantReport", files)}
                        />
                      </>
                    )}
                  </div>
                )}

                {/* STEP 3 — SOCIAL */}
                {step === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white mb-4">Social Information</h2>

                    {/* Q1: Employee List & Roles */}
                    <RadioGroup
                      label="Q1. Do you maintain a list of employees and their roles?"
                      options={yesNoOptions}
                      value={formData.hasEmployeeList}
                      onChange={(val) => handleChange("hasEmployeeList", val)}
                    />
                    {formData.hasEmployeeList && (
                      <Upload
                        label="Upload Organizational Chart"
                        onChange={(files) => handleChange("organizationalChart", files)}
                      />
                    )}

                    {/* Q2: Employee Turnover */}
                    <RadioGroup
                      label="Q2. Do you track employee resignations or turnover?"
                      options={yesNoOptions}
                      value={formData.trackTurnover}
                      onChange={(val) => handleChange("trackTurnover", val)}
                    />
                    {formData.trackTurnover && (
                      <Upload
                        label="Upload HR turnover summary"
                        onChange={(files) => handleChange("hrTurnoverSummary", files)}
                      />
                    )}

                    {/* Q3: Contract/Temporary Workers */}
                    <RadioGroup
                      label="Q3. Do you have contract based or temporary workers?"
                      options={yesNoOptions}
                      value={formData.hasContractWorkers}
                      onChange={(val) => handleChange("hasContractWorkers", val)}
                    />

                    {/* Q4: Workplace Injuries */}
                    <div>
                      <InfoLabel
                        label="Q4. Have there been any workplace injuries in the last year?"
                        info="Include lost-time injuries and recordable incidents."
                      />
                      <RadioGroup
                        options={yesNoOptions}
                        value={formData.safetyIncidents}
                        onChange={(val) => handleChange("safetyIncidents", val)}
                      />
                    </div>
                    {formData.safetyIncidents && (
                      <>
                        <Upload
                          label="Upload Incident reports"
                          onChange={(files) => handleChange("incidentReports", files)}
                        />
                        <Upload
                          label="Upload Safety logs"
                          onChange={(files) => handleChange("safetyLogs", files)}
                        />
                      </>
                    )}

                    {/* Q5: Employee Training */}
                    <RadioGroup
                      label="Q5. Do you provide employee training programs?"
                      options={yesNoOptions}
                      value={formData.provideTraining}
                      onChange={(val) => handleChange("provideTraining", val)}
                    />
                    {formData.provideTraining && (
                      <>
                        <Upload
                          label="Upload Training attendance records"
                          onChange={(files) => handleChange("trainingAttendanceRecords", files)}
                        />
                        <Upload
                          label="Upload Training policy (if available)"
                          onChange={(files) => handleChange("trainingPolicy", files)}
                        />
                      </>
                    )}

                    {/* Q6: Written Policies Multi-select */}
                    <WrittenPoliciesMultiSelect
                      label="Q6. Does your company have any of the following written policies?"
                      info="Select only the policies that currently exist in written form."
                      options={[
                        // HR & Social Policies
                        "Employee Handbook",
                        "Code of Conduct",
                        "Anti-Discrimination Policy",
                        "Equal Opportunity Policy",
                        "Grievance Mechanism Policy",
                        "Whistleblower Policy",
                        "Anti-Harassment Policy",
                        "Health & Safety Policy",
                        "Training & Development Policy",
                        // Environmental Policies
                        "Environmental Policy",
                        "Energy Management Policy",
                        "Waste Management Policy",
                        "Water Management Policy",
                        "Climate Change Policy",
                        "Carbon Reduction Strategy",
                        // Governance & Ethics Policies
                        "Anti-Bribery & Anti-Corruption Policy",
                        "Supplier Code of Conduct",
                        "Procurement Policy",
                        "Data Protection Policy",
                        "Risk Management Policy",
                        "Conflict of Interest Policy"
                      ]}
                      selected={formData.writtenPolicies || []}
                      onChange={selected => handleChange("writtenPolicies", selected)}
                    />
                    
                    {Array.isArray(formData.writtenPolicies) && formData.writtenPolicies.length > 0 && (
                      <Upload
                        label="Upload selected policy documents (combine if needed)"
                        onChange={(files) => handleChange("policyDocuments", files)}
                      />
                    )}

                    {/* Q7: Grievance/Complaint Mechanism */}
                    <RadioGroup
                      label="Q7. Do employees have a grievance or complaint mechanism?"
                      options={yesNoOptions}
                      value={formData.hasGrievanceMechanism}
                      onChange={(val) => handleChange("hasGrievanceMechanism", val)}
                    />
                    {formData.hasGrievanceMechanism && (
                      <>
                        <Upload
                          label="Upload Whistleblower policy"
                          onChange={(files) => handleChange("whistleblowerPolicy", files)}
                        />
                        <Upload
                          label="Upload Grievance procedure document"
                          onChange={(files) => handleChange("grievanceProcedureDocument", files)}
                        />
                      </>
                    )}
                  </div>
                )}

                {/* STEP 4 — GOVERNANCE */}
                {step === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white mb-4">Governance Information </h2>

                    {/* Q1: Board of Directors */}
                    <RadioGroup
                      label="Q1. Does your company have a Board of Directors?"
                      options={yesNoOptions}
                      value={formData.hasBoardOfDirectors}
                      onChange={(val) => handleChange("hasBoardOfDirectors", val)}
                    />
                    {formData.hasBoardOfDirectors && (
                      <>
                        <Input
                          label="Q1a. Total number of board members"
                          type="number"
                          placeholder="e.g. 100"
                          value={formData.totalBoardMembers}
                          onChange={(e) => handleChange("totalBoardMembers", e.target.value)}
                        />
                        <Input
                          label="Q1b. Number of female board members"
                          type="number"
                          placeholder="e.g. 100"
                          value={formData.femaleBoardMembers}
                          onChange={(e) => handleChange("femaleBoardMembers", e.target.value)}
                        />
                        <Upload
                          label="Upload Board list / Annual report extract"
                          onChange={(files) => handleChange("boardListOrAnnualReport", files)}
                        />
                      </>
                    )}
                  
                      <Select
                        label="Select your company type"
                        options={["Sole Proprietor", "Partnership", "Private Limited", "Public Company"]}
                        value={formData.companyType}
                        onChange={(e) => handleChange("companyType", e.target.value)}
                      />
                  

                    {/* Q2: Code of Conduct */}
                    <RadioGroup
                      label="Q2. Do you have a written Code of Conduct or Ethics Policy?"
                      options={yesNoOptions}
                      value={formData.hasEthicsPolicy}
                      onChange={(val) => handleChange("hasEthicsPolicy", val)}
                    />
                    {formData.hasEthicsPolicy && (
                      <Upload
                        label="Upload Code of Conduct"
                        onChange={(files) => handleChange("codeOfConductDocument", files)}
                      />
                    )}

                    {/* Q3: Ethics/Compliance Training */}
                    <RadioGroup
                      label="Q3. Do you provide ethics or compliance training?"
                      options={yesNoOptions}
                      value={formData.hasESGTraining}
                      onChange={(val) => handleChange("hasESGTraining", val)}
                    />
                    {formData.hasESGTraining && (
                      <>
                        <Upload
                          label="Upload Training material (if available)"
                          onChange={(files) => handleChange("trainingMaterial", files)}
                        />
                        <Upload
                          label="Upload Attendance sheet (if available)"
                          onChange={(files) => handleChange("attendanceSheet", files)}
                        />
                      </>
                    )}

                    {/* Q4: External Suppliers */}
                    <RadioGroup
                      label="Q4. Do you work with external suppliers?"
                      options={yesNoOptions}
                      value={formData.workWithSuppliers}
                      onChange={(val) => handleChange("workWithSuppliers", val)}
                    />
                    {formData.workWithSuppliers && (
                      <>
                        <RadioGroup
                          label="Q4a. Do you require suppliers to follow ethical or environmental standards?"
                          options={yesNoOptions}
                          value={formData.askSuppliersEthicalCodes}
                          onChange={(val) => handleChange("askSuppliersEthicalCodes", val)}
                        />
                        {formData.askSuppliersEthicalCodes && (
                          <>
                            <Upload
                              label="Upload Supplier Code of Conduct (if available)"
                              onChange={(files) => handleChange("supplierCodeOfConduct", files)}
                            />
                            <Upload
                              label="Upload Vendor contracts (if available)"
                              onChange={(files) => handleChange("vendorContracts", files)}
                            />
                          </>
                        )}
                      </>
                    )}
                  </div>
                )}

                {/* STEP 5 — SCORING */}
                {step === 4 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white mb-4">Review and Conformation</h2>

                    {/* Q1: Public ESG Targets */}
                    <RadioGroup
                      label="Q1. Have you set any public sustainability or ESG targets?"
                      options={yesNoOptions}
                      value={formData.hasPublicESGTargets}
                      onChange={(val) => handleChange("hasPublicESGTargets", val)}
                    />
                    {formData.hasPublicESGTargets && (
                      <>
                        <Upload
                          label="Upload ESG target document"
                          onChange={(files) => handleChange("esgTargetDocument", files)}
                        />
                        <Upload
                          label="Upload Sustainability strategy"
                          onChange={(files) => handleChange("sustainabilityStrategy", files)}
                        />
                      </>
                    )}

                    {/* Q2: Stakeholder Surveys */}
                    <RadioGroup
                      label="Q2. Have you conducted stakeholder surveys (customers, employees, investors)?"
                      options={yesNoOptions}
                      value={formData.conductedStakeholderSurveys}
                      onChange={(val) => handleChange("conductedStakeholderSurveys", val)}
                    />
                    {formData.conductedStakeholderSurveys && (
                      <Upload
                        label="Upload Survey results summary"
                        onChange={(files) => handleChange("surveyResultsSummary", files)}
                      />
                    )}

                    {/* Q3: Previous ESG Report */}
                    <RadioGroup
                      label="Q3. Has your company previously prepared a sustainability or ESG report?"
                      options={yesNoOptions}
                      value={formData.hasPreviousESGReport}
                      onChange={(val) => handleChange("hasPreviousESGReport", val)}
                    />
                    {formData.hasPreviousESGReport && (
                      <Upload
                        label="Upload Previous ESG / Sustainability Report"
                        onChange={(files) => handleChange("previousESGReport", files)}
                      />
                    )}

                    {/* Q4: Main Objective for ESG Reporting */}
                    <CheckboxGroup
                      label="Q4. What is your main objective for ESG reporting?"
                      options={["Meet regulatory requirements", "Attract investors", "Improve company reputation", "Supply chain compliance", "Internal performance improvement", "Customer requirements", "Other"]}
                      selected={formData.esgObjectives}
                      onChange={(val) => handleCheckboxChange("esgObjectives", val)}
                    />

                    {/* Final Confirmation */}
                    <label className="flex items-center text-sm gap-2 text-white/90 cursor-pointer">
                      <input
                        type="checkbox"
                        className="accent-[#4639AA]"
                        checked={formData.isAccurate}
                        onChange={(e) => handleChange("isAccurate", e.target.checked)}
                      />
                      I confirm that the information provided is accurate to the best of my knowledge.
                    </label>
                  </div>
                )}

                {/* Navigation */}
                <div className="mt-12 flex justify-between">
                  <button
                    disabled={step === 0}
                    onClick={() => setStep(step - 1)}
                    className="px-6 py-1 rounded-full border border-white/40 text-white disabled:opacity-40"
                  >
                    Back
                  </button>

                  <button
                    onClick={() => {
                      if (step === steps.length - 1) {
                        handleSubmit();
                      } else {
                        setStep(step + 1);
                      }
                    }}
                    disabled={step === steps.length - 1 && (!formData.isAccurate || isLoading)}
                    className="px-8 py-2 rounded-full bg-white text-[#4639AA] font-semibold hover:scale-105 transition disabled:opacity-70 disabled:hover:scale-100"
                  >
                    {isLoading ? "Submitting..." : (step === steps.length - 1 ? "Generate ESG Report" : "Next Step →")}
                  </button>
                </div>
              </div>
            </div>

            {/* VAL Assistant */}
            <div className="mt-5 flex items-center gap-4 justify-center text-center">
              <p className="text-white/80">
                I’ll use this information to generate your ESG report and recommendations.
              </p>
            </div>
          </div>
          <div className="absolute -top-40 -left-40 z-10 animate-pulse">
            <img src={Shap1} alt="Shape" className="opacity-90 w-[370px] " />
          </div>
          <div className="absolute -bottom-40 -right-40 z-10 animate-pulse">
            <img src={Shap3} alt="Shape" className="opacity-90 w-[370px] " />
          </div>


        </section>
      )}
    </div>
  );
};

/* ---------- Reusable UI Blocks ---------- */



const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium mb-1 text-white">{label}</label>
    <input
      {...props}
      className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#4639AA] text-gray-800"
    />
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div>
    <label className="block text-sm font-medium mb-1 text-white">{label}</label>
    <select
      {...props}
      className="w-full border rounded-md px-4 py-2 text-gray-800 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#4639AA]"
    >
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  </div>
);

const RadioGroup = ({ label, options, value, onChange }) => {
  return (
    <div>
      <p className="block text-sm font-medium mb-1 text-white">{label}</p>
      <div className="flex gap-4 flex-wrap">
        {options.map((o) => {
          // Map "Yes"/"No" to true/false if value is boolean
          const isYesNo = o === "Yes" || o === "No";
          const optionValue = (isYesNo && typeof value === "boolean") ? (o === "Yes") : o;
          const active = value === optionValue;

          return (
            <button
              key={o}
              type="button"
              onClick={() => onChange(optionValue)}
              className={`flex items-center gap-2 px-4 py-1 rounded-full border text-sm transition
                ${active
                  ? "bg-white text-[#4639AA] border-white"
                  : "border-white/40 text-white/90 hover:bg-white/10"
                }`}
            >
              <Icon
                icon={
                  active
                    ? "mdi:radiobox-marked"
                    : "mdi:radiobox-blank"
                }
                className="text-base"
              />
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const CheckboxGroup = ({ label, options, selected = [], onChange }) => {
  return (
    <div>
      <p className="block text-sm font-medium mb-1 text-white">{label}</p>
      <div className="flex gap-4 flex-wrap">
        {options.map((o) => {
          const active = selected.includes(o);
          return (
            <button
              key={o}
              type="button"
              onClick={() => onChange(o)}
              className={`flex items-center gap-2 px-4 py-1 rounded-full font-medium border text-sm transition
                ${active
                  ? "bg-white  text-[#4639AA]"
                  : "border-white/50 text-white/90 hover:bg-white/10"
                }`}
            >
              {active && (
                <Icon icon="mdi:check" className="text-[#4639AA] text-sm" />
              )}
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const Upload = ({ label, onChange }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    onChange && onChange(selectedFile);
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium mb-2 text-white">
        {label}
      </label>

      <label className="flex flex-col items-center justify-center w-full min-h-[8rem] border border-dashed border-gray-300/30 rounded-lg cursor-pointer bg-gray-800/20 hover:bg-gray-800/30 transition-colors px-4 py-3">
        <Icon icon="mdi:cloud-upload" className="text-gray-300 text-4xl mb-2" />

        {!file ? (
          <span className="text-gray-300 text-sm text-center">
            Click to upload or drag and drop
          </span>
        ) : (
          <div className="text-center space-y-1">
            <p className="text-white text-sm font-medium truncate max-w-[220px]">
              {file.name}
            </p>
            <p className="text-gray-400 text-xs">
              Size : {(file.size / 1024).toFixed(1)} KB
            </p>
          </div>
        )}

        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default Boarding;



