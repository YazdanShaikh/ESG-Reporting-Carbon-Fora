import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useForm, useFieldArray } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axiosInstance from "../../../configs/axios.config";
import { toast } from "react-toastify";
import { handleError } from "../../../utils/functions";
import InfoLabel from "../../../components/ui/InfoLabel";
import InfoHeading from "../../../components/ui/InfoHeading";
import { Info } from "lucide-react";


const SocialApproach = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState({});

  const tabs = [
    { id: 0, label: "EMPLOYMENT", icon: "mdi:finance", module: "gri401" },
    { id: 1, label: "LABOR / MANAGEMENT RELATIONS", icon: "mdi:store-marker", module: "gri402" },
    { id: 2, label: "OCCUPATIONAL HEALTH AND SAFETY", icon: "mdi:account-group", module: "gri403" },
    { id: 3, label: "TRAINING AND EDUCATION", icon: "mdi:weather-partly-cloudy", module: "gri404" },
    { id: 4, label: "DIVERSITY AND EQUAL OPPORTUNITY", icon: "mdi:cloud", module: "gri405" },
    { id: 5, label: "NON-DISCRIMINATION", icon: "mdi:delete-outline", module: "gri406" },
    { id: 6, label: "FREEDOM OF ASSOCIATION AND COLLECTIVE BARGAINING", icon: "mdi:weather-partly-cloudy", module: "gri407" },
    { id: 7, label: "CHILD LABOR", icon: "mdi:finance", module: "gri408" },
    { id: 8, label: "FORCED OR COMPULSORY LABOR", icon: "mdi:store-marker", module: "gri409" },
    { id: 9, label: "SECURITY PRACTICES", icon: "mdi:account-group", module: "gri410" },
    { id: 10, label: "RIGHTS OF INDIGENOUS PEOPLES", icon: "mdi:weather-partly-cloudy", module: "gri411" },
    { id: 11, label: "LOCAL COMMUNITIES", icon: "mdi:cloud", module: "gri412" },
    { id: 12, label: "SUPPLIER SOCIAL ASSESSMENT", icon: "mdi:delete-outline", module: "gri413" },
    { id: 13, label: "PUBLIC POLICY", icon: "mdi:weather-partly-cloudy", module: "gri414" },
    { id: 14, label: "CUSTOMER HEALTH AND SAFETY", icon: "mdi:cloud", module: "gri415" },
    { id: 15, label: "MARKETING AND LABELING", icon: "mdi:delete-outline", module: "gri416" },
    { id: 16, label: "CUSTOMER PRIVACY", icon: "mdi:weather-partly-cloudy", module: "gri417" },

  ];

  // Validation schemas for each tab
  const tabSchemas = {
    0: yup.object({
      gri401: yup.object({
        hasPolicies: yup.string().required(),
        policiesDescription: yup.string().when("hasPolicies", { is: "yes", then: yup.string().required() }),
        responsible: yup.string().required(),
        actions: yup.array().min(1, "Select at least one action"),
        monitoring: yup.array().min(1, "Select at least one monitoring method"),
        tracksHiresTurnover: yup.string().required(),
        newHires: yup.array().of(yup.object({
          employmentCategory: yup.string().required(),
          ageGroup: yup.string().required(),
          gender: yup.string().required(),
          numberOfNewHires: yup.number().min(0)
        })).when("tracksHiresTurnover", { is: "yes", then: yup.array().min(1) }),
        turnover: yup.array().of(yup.object({
          employmentCategory: yup.string().required(),
          ageGroup: yup.string().required(),
          gender: yup.string().required(),
          turnoverRate: yup.number().min(0).max(100)
        })).when("tracksHiresTurnover", { is: "yes", then: yup.array().min(1) }),
        turnoverMethodology: yup.string().when("tracksHiresTurnover", { is: "yes", then: yup.string().required() }),
        benefitsDiffer: yup.string().required(),
        benefits: yup.array().when("benefitsDiffer", { is: "yes", then: yup.array().min(1) }),
        providedAllLocations: yup.string().when("benefitsDiffer", { is: "yes", then: yup.string().required() }),
        locationExplanation: yup.string().when("providedAllLocations", { is: "no", then: yup.string().required() }),
        providesParentalLeave: yup.string().required(),
        parentalLeaveData: yup.array().of(yup.object({
          gender: yup.string().required(),
          numberEligible: yup.number().min(0),
          numberTookLeave: yup.number().min(0),
          numberReturned: yup.number().min(0)
        })).when("providesParentalLeave", { is: "yes", then: yup.array().min(1) }),
        omissionReason: yup.string().when("tracksHiresTurnover", { is: "no", then: yup.string().required() }),
        omissionExplanation: yup.string().when("tracksHiresTurnover", { is: "no", then: yup.string().required() })
      })
    }),
    1: yup.object({
      gri402: yup.object({
        hasRelationsPolicies: yup.string().required(),
        relationsDescription: yup.string().when("hasRelationsPolicies", { is: "yes", then: yup.string().required() }),
        responsible: yup.string().required(),
        consultationMechanisms: yup.array().min(1, "Select at least one mechanism"),
        relationMonitoring: yup.array().min(1, "Select at least one monitoring method"),
        hasNoticePeriods: yup.string().required(),
        noticePeriodsDefined: yup.string().when("hasNoticePeriods", { is: "yes", then: yup.string().required() }),
        noticePeriodDefinition: yup.string().when("noticePeriodsDefined", { is: "yes", then: yup.string().required() }),
        noticePeriods: yup.array().of(yup.object({
          employeeCategory: yup.string().required(),
          noticePeriod: yup.string().required(),
          unit: yup.string().required()
        })).when("hasNoticePeriods", { is: "yes", then: yup.array().min(1, "Add at least one notice period entry") }),
        variesByLocation: yup.string().required(),
        locationVariationExplanation: yup.string().when("variesByLocation", { is: "yes", then: yup.string().required() }),
        omissionReason: yup.string().when("hasNoticePeriods", { is: "no", then: yup.string().required() }),
        omissionExplanation: yup.string().when("hasNoticePeriods", { is: "no", then: yup.string().required() })
      })
    }),
    2: yup.object({
      gri403: yup.object({
        hasOhsPolicies: yup.string().required(),
        ohsDescription: yup.string().when("hasOhsPolicies", { is: "yes", then: yup.string().required() }),
        responsible: yup.string().required(),
        preventionActions: yup.array().min(1, "Select at least one action"),
        monitoring: yup.array().min(1, "Select at least one monitoring method"),
        hasOhsManagementSystem: yup.string().required(),
        managementSystemTypes: yup.array().when("hasOhsManagementSystem", { is: "yes", then: yup.array().min(1, "Select at least one system type") }),
        hasHazardProcesses: yup.string().required(),
        investigatesIncidents: yup.string().required(),
        investigationDescription: yup.string().when("investigatesIncidents", { is: "yes", then: yup.string().required() }),
        providesOccupationalHealthServices: yup.string().required(),
        healthServices: yup.array().when("providesOccupationalHealthServices", { is: "yes", then: yup.array().min(1, "Select at least one health service") }),
        workersInvolved: yup.string().required(),
        participationMechanisms: yup.array().when("workersInvolved", { is: "yes", then: yup.array().min(1, "Select at least one mechanism") }),
        providesOhsTraining: yup.string().required(),
        trainingData: yup.array().of(yup.object({
          workerCategory: yup.string().required(),
          numberTrained: yup.number().min(0),
          trainingHours: yup.number().min(0)
        })).when("providesOhsTraining", { is: "yes", then: yup.array().min(1, "Add at least one training row") }),
        hasHealthPrograms: yup.string().required(),
        healthPrograms: yup.array().when("hasHealthPrograms", { is: "yes", then: yup.array().min(1, "Select at least one program") }),
        addressesOhsInBusiness: yup.string().required(),
        businessRelationshipMeasures: yup.array().when("addressesOhsInBusiness", { is: "yes", then: yup.array().min(1, "Select at least one measure") }),
        workersCovered: yup.string().required(),
        coverageData: yup.array().of(yup.object({
          workerCategory: yup.string().required(),
          totalWorkers: yup.number().min(0),
          coveredBySystem: yup.number().min(0)
        })).when("workersCovered", { is: "yes", then: yup.array().min(1, "Add at least one coverage row") }),
        recordsInjuries: yup.string().required(),
        injuryData: yup.array().of(yup.object({
          injuryType: yup.string().required(),
          numberOfCases: yup.number().min(0)
        })).when("recordsInjuries", { is: "yes", then: yup.array().min(1, "Add at least one injury row") }),
        recordsIllHealth: yup.string().required(),
        illHealthData: yup.array().of(yup.object({
          illHealthType: yup.string().required(),
          numberOfCases: yup.number().min(0)
        })).when("recordsIllHealth", { is: "yes", then: yup.array().min(1, "Add at least one ill health row") }),
        omissionReason: yup.string().when(["hasOhsManagementSystem", "hasHazardProcesses", "providesOhsTraining", "recordsInjuries", "recordsIllHealth"], {
          is: (hasSystem, hasHazard, hasTraining, hasInjuries, hasIllHealth) => [hasSystem, hasHazard, hasTraining, hasInjuries, hasIllHealth].includes("no"),
          then: yup.string().required(),
          otherwise: yup.string()
        }),
        omissionExplanation: yup.string().when(["hasOhsManagementSystem", "hasHazardProcesses", "providesOhsTraining", "recordsInjuries", "recordsIllHealth"], {
          is: (hasSystem, hasHazard, hasTraining, hasInjuries, hasIllHealth) => [hasSystem, hasHazard, hasTraining, hasInjuries, hasIllHealth].includes("no"),
          then: yup.string().required(),
          otherwise: yup.string()
        })
      })
    }),
  };

  const { register, control, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm({
    resolver: yupResolver(tabSchemas[activeTab]),
    defaultValues: {
      gri401: {
        hasPolicies: "no",
        policiesDescription: "",
        responsible: "Human Resources",
        actions: [],
        monitoring: [],
        tracksHiresTurnover: "no",
        newHires: [{ employmentCategory: "", ageGroup: "", gender: "Male", numberOfNewHires: 0 }],
        turnover: [{ employmentCategory: "", ageGroup: "", gender: "Male", turnoverRate: 0 }],
        turnoverMethodology: "Average headcount method",
        benefitsDiffer: "no",
        benefits: [],
        providedAllLocations: "yes",
        locationExplanation: "",
        providesParentalLeave: "no",
        parentalLeaveData: [{ gender: "Male", numberEligible: 0, numberTookLeave: 0, numberReturned: 0 }, { gender: "Female", numberEligible: 0, numberTookLeave: 0, numberReturned: 0 }],
        omissionReason: "",
        omissionExplanation: ""
      },
      gri402: {
        hasRelationsPolicies: "no",
        relationsDescription: "",
        responsible: "Human Resources",
        consultationMechanisms: [],
        relationMonitoring: [],
        hasNoticePeriods: "no",
        noticePeriodsDefined: "no",
        noticePeriodDefinition: "",
        noticePeriods: [{ employeeCategory: "", noticePeriod: "", unit: "days" }],
        variesByLocation: "no",
        locationVariationExplanation: "",
        omissionReason: "",
        omissionExplanation: ""
      },
      gri403: {
        hasOhsPolicies: "no",
        ohsDescription: "",
        responsible: "Health & Safety function",
        preventionActions: [],
        monitoring: [],
        hasOhsManagementSystem: "no",
        managementSystemTypes: [],
        hasHazardProcesses: "no",
        investigatesIncidents: "no",
        investigationDescription: "",
        providesOccupationalHealthServices: "no",
        healthServices: [],
        workersInvolved: "no",
        participationMechanisms: [],
        providesOhsTraining: "no",
        trainingData: [{ workerCategory: "", numberTrained: 0, trainingHours: 0 }],
        hasHealthPrograms: "no",
        healthPrograms: [],
        addressesOhsInBusiness: "no",
        businessRelationshipMeasures: [],
        workersCovered: "no",
        coverageData: [{ workerCategory: "", totalWorkers: 0, coveredBySystem: 0 }],
        recordsInjuries: "no",
        injuryData: [{ injuryType: "", numberOfCases: 0 }],
        recordsIllHealth: "no",
        illHealthData: [{ illHealthType: "", numberOfCases: 0 }],
        omissionReason: "",
        omissionExplanation: ""
      }
    } 
    });
   
  const { fields: newHiresFields, append: appendNewHire } = useFieldArray({ control, name: "gri401.newHires" });
  const { fields: turnoverFields, append: appendTurnover } = useFieldArray({ control, name: "gri401.turnover" });
  const { fields: parentalLeaveFields, append: appendParentalLeave } = useFieldArray({ control, name: "gri401.parentalLeaveData" });
  const { fields: noticePeriodsFields, append: appendNoticePeriod } = useFieldArray({ control, name: "gri402.noticePeriods" });
  const { fields: trainingFields, append: appendTraining } = useFieldArray({ control, name: "gri403.trainingData" });
  const { fields: coverageFields, append: appendCoverage } = useFieldArray({ control, name: "gri403.coverageData" });
  const { fields: injuryFields, append: appendInjury } = useFieldArray({ control, name: "gri403.injuryData" });
  const { fields: illHealthFields, append: appendIllHealth } = useFieldArray({ control, name: "gri403.illHealthData" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get("/brand/social/");
        if (res.data.success && res.data.data) {
          // Merge API data with default values to ensure objects exist even if null on backend
          reset(res.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch data", err);
      }
    };
    fetchData();
  }, [reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axiosInstance.post("/brand/social/", data);
      if (res.data.success) {
        toast.success("Data saved successfully");
      } else {
        toast.error("Failed to save data");
      }
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleManualNext = () => {
    if (activeTab === tabs.length - 1) {
      // Save & Finish
      handleSubmit(onSubmit)();
    } else {
      setActiveTab(activeTab + 1);
    }
  };

  
  //  Gri 401 Employment
  const renderGRI401 = () => (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white p-3 rounded-md border border-gray-200">
        <h3 className="text-lg font-bold text-[#4639AA] mb-6 flex items-center gap-2">
          <Icon icon="mdi:account-group" /> Employment
        </h3>
        <div className="grid grid-cols-1 gap-6">
          {/* MANAGEMENT APPROACH (GRI 3-3) */}
          <div>
            <InfoLabel
              label="Q1. Does the organization have policies or practices related to employment, recruitment, and workforce management?"
              info="Select Yes if your company has any rules, system, or usual way of: • Hiring employees • Managing staff • Setting roles, salaries, or contracts This can be written policies or informal practices."
            />
            <div className="flex gap-4">
              {["yes", "no"].map((opt) => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value={opt}
                    {...register("gri401.hasPolicies")}
                    className="w-4 h-4 text-[#4639AA] focus:ring-[#4639AA]"
                  />
                  <span className="capitalize text-sm text-gray-700">{opt}</span>
                </label>
              ))}
            </div>
          </div>
          {watch("gri401.hasPolicies") === "yes" && (
            <div>
              <InfoLabel
                label="Brief description of policies or practices"
                info="Briefly describe how you hire and manage employees (e.g., hiring process, contracts, HR rules)."
              />
              <textarea
                {...register("gri401.policiesDescription")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[120px]"
                placeholder="Describe policies or practices..."
              />
            </div>
          )}
          <div>
            <InfoLabel
              label="Q2. Who is responsible for managing employment-related impacts?"
              info="Select the person or department responsible for hiring, managing employees, and handling staff-related matters."
            />
            <select
              {...register("gri401.responsible")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
            >
              <option>Human Resources</option>
              <option>Senior management</option>
              <option>Local management</option>
              <option>Sustainability team</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <InfoLabel
              label="Q3. What actions are taken to manage employment-related impacts?"
              info="Select all actions your company takes to manage employees, such as planning staff, hiring fairly, retaining employees, or providing benefits."
            />
            <div className="flex flex-wrap gap-4">
              {["Workforce planning", "Fair recruitment practices", "Employee retention programs", "Benefits and compensation programs", "Workforce diversity initiatives", "Other"].map((action) => (
                <label key={action} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={action}
                    {...register("gri401.actions")}
                    className="w-4 h-4 text-[#4639AA]"
                  />
                  <span className="text-sm">{action}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <InfoLabel
              label="Q4. How does the organization monitor employment performance?"
              info="Select how you track employee-related performance, such as using HR systems, reports, surveys, or internal checks. Select 'Not monitored' if nothing is tracked."
            />
            <div className="flex flex-wrap gap-4">
              {["HR information systems", "Workforce analytics", "Employee surveys", "Internal audits", "Not monitored"].map((method) => (
                <label key={method} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={method}
                    {...register("gri401.monitoring")}
                    className="w-4 h-4 text-[#4639AA]"
                  />
                  <span className="text-sm">{method}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* DISCLOSURE 401-1 New Employee Hires and Employee Turnover */}
      <div className="bg-white p-3 rounded-md border border-gray-200">
        <h3 className="text-lg font-bold text-[#4639AA] mb-4 flex items-center gap-2">
          <Icon icon="mdi:account-plus" /> New Employee Hires and Employee Turnover
        </h3>
      
        <div className="space-y-4">
          <div>
            <InfoLabel
              label="Q5. Does the organization track new employee hires and employee turnover?"
              info="Select Yes if you keep records of how many employees you hire and how many leave during the year."
            />
            <div className="flex gap-4">
              {["yes", "no"].map((opt) => (
                <label key={opt} className="flex items-center gap-2">
                  <input
                    type="radio"
                    value={opt}
                    {...register("gri401.tracksHiresTurnover")}
                    className="w-4 h-4 text-[#4639AA]"
                  />
                  <span className="capitalize text-sm">{opt}</span>
                </label>
              ))}
            </div>
          </div>
          {watch("gri401.tracksHiresTurnover") === "yes" ? (
            <>
              <div>
                <InfoLabel
                  label="Q6. Provide data on new employee hires during the reporting period."
                  info="Enter number of employees hired during the year. Break it down by job type, age group, and gender if available."
                />
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse border border-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="p-2 border border-gray-200">Employment category</th>
                        <th className="p-2 border border-gray-200">Age group</th>
                        <th className="p-2 border border-gray-200">Gender</th>
                        <th className="p-2 border border-gray-200">Number of new hires</th>
                      </tr>
                    </thead>
                    <tbody>
                      {newHiresFields.map((item, idx) => (
                        <tr key={item.id}>
                          <td className="p-1 border border-gray-200">
                            <input
                              {...register(`gri401.newHires.${idx}.employmentCategory`)}
                              className="w-full p-1 border-none outline-none"
                              placeholder="e.g. Full-time"
                            />
                          </td>
                          <td className="p-1 border border-gray-200">
                            <input
                              {...register(`gri401.newHires.${idx}.ageGroup`)}
                              className="w-full p-1 border-none outline-none"
                              placeholder="e.g. 18-30"
                            />
                          </td>
                          <td className="p-1 border border-gray-200">
                            <select
                              {...register(`gri401.newHires.${idx}.gender`)}
                              className="w-full p-1 border-none outline-none bg-transparent"
                            >
                              <option>Male</option>
                              <option>Female</option>
                              <option>Other</option>
                            </select>
                          </td>
                          <td className="p-1 border border-gray-200">
                            <input
                              type="number"
                              {...register(`gri401.newHires.${idx}.numberOfNewHires`)}
                              className="w-full p-1 border-none outline-none"
                              placeholder="0"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button
                  type="button"
                  onClick={() => appendNewHire({ employmentCategory: "", ageGroup: "", gender: "Male", numberOfNewHires: 0 })}
                  className="text-xs text-[#4639AA] font-bold"
                >
                  + Add Row
                </button>
              </div>
              <div>
                <InfoLabel
                  label="Q7. Provide data on employee turnover during the reporting period."
                  info="Enter how many employees left the company. Turnover rate means the percentage of employees who left during the year."
                />
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse border border-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="p-2 border border-gray-200">Employment category</th>
                        <th className="p-2 border border-gray-200">Age group</th>
                        <th className="p-2 border border-gray-200">Gender</th>
                        <th className="p-2 border border-gray-200">Turnover rate (%)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {turnoverFields.map((item, idx) => (
                        <tr key={item.id}>
                          <td className="p-1 border border-gray-200">
                            <input
                              {...register(`gri401.turnover.${idx}.employmentCategory`)}
                              className="w-full p-1 border-none outline-none"
                              placeholder="e.g. Full-time"
                            />
                          </td>
                          <td className="p-1 border border-gray-200">
                            <input
                              {...register(`gri401.turnover.${idx}.ageGroup`)}
                              className="w-full p-1 border-none outline-none"
                              placeholder="e.g. 18-30"
                            />
                          </td>
                          <td className="p-1 border border-gray-200">
                            <select
                              {...register(`gri401.turnover.${idx}.gender`)}
                              className="w-full p-1 border-none outline-none bg-transparent"
                            >
                              <option>Male</option>
                              <option>Female</option>
                              <option>Other</option>
                            </select>
                          </td>
                          <td className="p-1 border border-gray-200">
                            <input
                              type="number"
                              {...register(`gri401.turnover.${idx}.turnoverRate`)}
                              className="w-full p-1 border-none outline-none"
                              placeholder="0"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button
                  type="button"
                  onClick={() => appendTurnover({ employmentCategory: "", ageGroup: "", gender: "Male", turnoverRate: 0 })}
                  className="text-xs text-[#4639AA] font-bold"
                >
                  + Add Row
                </button>
              </div>
              <div>
                <InfoLabel
                  label="Q8. What methodology is used to calculate turnover?"
                  info="Select how you calculate employee turnover (e.g., based on average staff, opening/closing numbers, or HR system)."
                />
                <select
                  {...register("gri401.turnoverMethodology")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
                >
                  <option>Average headcount method</option>
                  <option>Opening/closing headcount method</option>
                  <option>HR system calculation</option>
                  <option>Other</option>
                </select>
              </div>
            </>
          ) : (
            <div className="mt-4 bg-[#4639AA]/5 border border-[#4639AA]/15 p-4 rounded-xl">
              <h4 className="text-sm font-bold text-[#4639AA] mb-3">Omission Logic (GRI 401-1)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <InfoLabel
                    label="Reason for omission"
                    info="Select the closest reason."
                  />
                  <select
                    {...register("gri401.omissionReason")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
                  >
                    <option value="">Select reason</option>
                    <option value="Not applicable">Not applicable</option>
                    <option value="Data unavailable">Data unavailable</option>
                    <option value="Legal restriction">Legal restriction</option>
                    <option value="Confidentiality">Confidentiality</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <InfoLabel
                    label="Explanation (required)"
                    info="Explain why the disclosure is omitted."
                  />
                  <textarea
                    {...register("gri401.omissionExplanation")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[100px]"
                    placeholder="e.g. Data not tracked..."
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* DISCLOSURE 401-2 Benefits Provided to Full-time Employees That Are Not Provided to Temporary or Part-time Employees */}
      <div className="bg-white p-3 rounded-md border border-gray-200">
        <h3 className="text-lg font-bold text-[#4639AA] mb-4 flex items-center gap-2">
          <Icon icon="mdi:hand-heart" /> Benefits Provided to Full-time Employees That Are Not Provided to Temporary or Part-time Employees
        </h3>
        
        <div className="space-y-4">
          <div>
            <InfoLabel
              label="Q9. Does the organization provide benefits that differ by employment type?"
              info="Select Yes if full-time employees receive benefits that part-time or temporary workers do not get."
            />
            <div className="flex gap-4">
              {["yes", "no"].map((opt) => (
                <label key={opt} className="flex items-center gap-2">
                  <input
                    type="radio"
                    value={opt}
                    {...register("gri401.benefitsDiffer")}
                    className="w-4 h-4 text-[#4639AA]"
                  />
                  <span className="capitalize text-sm">{opt}</span>
                </label>
              ))}
            </div>
          </div>
          {watch("gri401.benefitsDiffer") === "yes" ? (
            <>
              <div>
                <InfoLabel
                  label="Q10. Which benefits are provided only to full-time employees?"
                  info="Select benefits that are given only to full-time employees, such as medical, insurance, or retirement benefits."
                />
                <div className="flex flex-wrap gap-4">
                  {["Life insurance", "Health care", "Disability and invalidity coverage", "Parental leave", "Retirement benefits", "Stock ownership", "Other"].map((benefit) => (
                    <label key={benefit} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        value={benefit}
                        {...register("gri401.benefits")}
                        className="w-4 h-4 text-[#4639AA]"
                      />
                      <span className="text-sm">{benefit}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <InfoLabel
                  label="Q11. Are these benefits provided to employees in all significant locations of operation?"
                  info="Select Yes if employees in all locations receive the same benefits. Select No if benefits differ by location."
                />
                <div className="flex gap-4">
                  {["yes", "no"].map((opt) => (
                    <label key={opt} className="flex items-center gap-2">
                      <input
                        type="radio"
                        value={opt}
                        {...register("gri401.providedAllLocations")}
                        className="w-4 h-4 text-[#4639AA]"
                      />
                      <span className="capitalize text-sm">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
              {watch("gri401.providedAllLocations") === "no" && (
                <div>
                  <InfoLabel
                    label="Explanation of differences by location"
                    info="Briefly explain why benefits are different (e.g., local laws or business conditions)."
                  />
                  <textarea
                    {...register("gri401.locationExplanation")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[100px]"
                    placeholder="Explain differences..."
                  />
                </div>
              )}
            </>
          ) : (
            <div className="mt-4 bg-[#4639AA]/5 border border-[#4639AA]/15 p-4 rounded-xl">
              <h4 className="text-sm font-bold text-[#4639AA] mb-3">Not Applicable (GRI 401-2)</h4>
              <p className="text-xs text-gray-600">Benefits do not differ by employment type.</p>
            </div>
          )}
        </div>
      </div>
      {/* DISCLOSURE 401-3 Parental Leave */}
      <div className="bg-white p-3 rounded-md border border-gray-200">
        <h3 className="text-lg font-bold text-[#4639AA] mb-4 flex items-center gap-2">
          <Icon icon="mdi:baby-carriage" /> Parental Leave
        </h3>
        
        <div className="space-y-4">
          <div>
            <InfoLabel
              label="Q12. Does the organization provide parental leave to employees?"
              info="Select Yes if employees are allowed leave for maternity, paternity, or adoption."
            />
            <div className="flex gap-4">
              {["yes", "no"].map((opt) => (
                <label key={opt} className="flex items-center gap-2">
                  <input
                    type="radio"
                    value={opt}
                    {...register("gri401.providesParentalLeave")}
                    className="w-4 h-4 text-[#4639AA]"
                  />
                  <span className="capitalize text-sm">{opt}</span>
                </label>
              ))}
            </div>
          </div>
          {watch("gri401.providesParentalLeave") === "yes" ? (
            <>
              <div>
                <InfoLabel
                  label="Q13. Provide parental leave data for the reporting period."
                  info="Enter number of employees eligible for parental leave, those who took leave, and those who returned to work. The system will calculate return rate."
                />
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse border border-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="p-2 border border-gray-200">Gender</th>
                        <th className="p-2 border border-gray-200">Number eligible</th>
                        <th className="p-2 border border-gray-200">Number who took leave</th>
                        <th className="p-2 border border-gray-200">Number returned to work</th>
                        <th className="p-2 border border-gray-200">Return-to-work rate (%)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {parentalLeaveFields.map((item, idx) => {
                        const eligible = Number(watch(`gri401.parentalLeaveData.${idx}.numberEligible`)) || 0;
                        const took = Number(watch(`gri401.parentalLeaveData.${idx}.numberTookLeave`)) || 0;
                        const returned = Number(watch(`gri401.parentalLeaveData.${idx}.numberReturned`)) || 0;
                        const rate = took > 0 ? (returned / took) * 100 : 0;
                        return (
                          <tr key={item.id}>
                            <td className="p-1 border border-gray-200">
                              <select
                                {...register(`gri401.parentalLeaveData.${idx}.gender`)}
                                className="w-full p-1 border-none outline-none bg-transparent"
                              >
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                              </select>
                            </td>
                            <td className="p-1 border border-gray-200">
                              <input
                                type="number"
                                {...register(`gri401.parentalLeaveData.${idx}.numberEligible`)}
                                className="w-full p-1 border-none outline-none"
                                placeholder="0"
                              />
                            </td>
                            <td className="p-1 border border-gray-200">
                              <input
                                type="number"
                                {...register(`gri401.parentalLeaveData.${idx}.numberTookLeave`)}
                                className="w-full p-1 border-none outline-none"
                                placeholder="0"
                              />
                            </td>
                            <td className="p-1 border border-gray-200">
                              <input
                                type="number"
                                {...register(`gri401.parentalLeaveData.${idx}.numberReturned`)}
                                className="w-full p-1 border-none outline-none"
                                placeholder="0"
                              />
                            </td>
                            <td className="p-2 border border-gray-200 font-bold bg-gray-50">
                              {rate.toFixed(1)}%
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <button
                  type="button"
                  onClick={() => appendParentalLeave({ gender: "Male", numberEligible: 0, numberTookLeave: 0, numberReturned: 0 })}
                  className="text-xs text-[#4639AA] font-bold"
                >
                  + Add Row
                </button>
              </div>
              <div className="bg-[#F8FAFC] p-3 rounded-lg border border-gray-200 text-sm text-gray-700">
                <InfoLabel
                  label="Q14. What is the retention rate of employees returning from parental leave?"
                  info="Retention rate means how many employees stayed in the company after returning from parental leave. This may be calculated automatically."
                />
                
                <div className="mt-2">
                  {(() => {
                    const totalTook = parentalLeaveFields.reduce((sum, _, idx) => sum + (Number(watch(`gri401.parentalLeaveData.${idx}.numberTookLeave`)) || 0), 0);
                    const totalReturned = parentalLeaveFields.reduce((sum, _, idx) => sum + (Number(watch(`gri401.parentalLeaveData.${idx}.numberReturned`)) || 0), 0);
                    const retentionRate = totalTook > 0 ? (totalReturned / totalTook) * 100 : 0;
                    return `${retentionRate.toFixed(1)}%`;
                  })()}
                </div>
              </div>
            </>
          ) : (
            <div className="mt-4 bg-[#4639AA]/5 border border-[#4639AA]/15 p-4 rounded-xl">
              <h4 className="text-sm font-bold text-[#4639AA] mb-3">Not Applicable (GRI 401-3)</h4>
              <p className="text-xs text-gray-600">Parental leave is not provided.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
  //  Gri 402 LABOR / MANAGEMENT RELATIONS
  const renderGRI402 = () => (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white p-3 rounded-md border border-gray-200">
        <h3 className="text-lg font-bold text-[#4639AA] mb-6 flex items-center gap-2">
          <Icon icon="mdi:handshake" /> Labor / Management Relations
        </h3>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <InfoLabel
              label="Q1. Does the organization have policies or practices related to labor–management relations and employee consultation?"
              info="Select Yes if your company has any system or usual way to communicate with employees, take their feedback, or manage employee-employer relations."
            />
            <div className="flex gap-4">
              {["yes", "no"].map((opt) => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value={opt}
                    {...register("gri402.hasRelationsPolicies")}
                    className="w-4 h-4 text-[#4639AA] focus:ring-[#4639AA]"
                  />
                  <span className="capitalize text-sm text-gray-700">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {watch("gri402.hasRelationsPolicies") === "yes" && (
            <div>
              <InfoLabel
                label="Brief description of policies or practices"
                info="Briefly explain how you communicate with employees or take their input (e.g., meetings, policies, feedback systems)."
              />
              <textarea
                {...register("gri402.relationsDescription")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[120px]"
                placeholder="Describe how labor–management relations are managed..."
              />
            </div>
          )}

          <div>
            <InfoLabel
              label="Q2. Who is responsible for managing labor–management relations?"
              info="Select the person or department that handles employee relations, communication, and workplace issues."
            />
            <select
              {...register("gri402.responsible")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
            >
              <option>Human Resources</option>
              <option>Senior management</option>
              <option>Local management</option>
              <option>Employee relations function</option>
              <option>Sustainability team</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <InfoLabel
              label="Q3. What mechanisms are used to inform and consult employees on operational changes?"
              info="Select how you inform employees about business changes and take their feedback (e.g., meetings, unions, direct communication)."
            />
            <div className="flex flex-wrap gap-4">
              {["Collective bargaining agreements", "Works councils or employee committees", "Direct employee communication", "Union engagement", "Employee meetings or briefings", "Other"].map((mechanism) => (
                <label key={mechanism} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={mechanism}
                    {...register("gri402.consultationMechanisms")}
                    className="w-4 h-4 text-[#4639AA]"
                  />
                  <span className="text-sm">{mechanism}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <InfoLabel
              label="Q4. How does the organization monitor labor–management relations?"
              info="Select how you track employee relations, such as surveys, complaints, union feedback, or internal checks. Select 'Not monitored' if nothing is tracked."
            />
            <div className="flex flex-wrap gap-4">
              {["Employee surveys", "Grievance tracking", "Union feedback", "Internal audits", "Not monitored"].map((method) => (
                <label key={method} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={method}
                    {...register("gri402.relationMonitoring")}
                    className="w-4 h-4 text-[#4639AA]"
                  />
                  <span className="text-sm">{method}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-3 rounded-md border border-gray-200">
        <h3 className="text-lg font-bold text-[#4639AA] mb-4 flex items-center gap-2">
          <Icon icon="mdi:calendar-clock" /> Minimum Notice Periods Regarding Operational Changes
        </h3>
        <div className="space-y-4">
          <div>
            <InfoLabel
              label="Q5. Does the organization have defined minimum notice periods for significant operational changes?"
              info="Select Yes if employees are informed in advance before major changes like layoffs, restructuring, or shift changes."
            />
            <div className="flex gap-4">
              {["yes", "no"].map((opt) => (
                <label key={opt} className="flex items-center gap-2">
                  <input
                    type="radio"
                    value={opt}
                    {...register("gri402.hasNoticePeriods")}
                    className="w-4 h-4 text-[#4639AA]"
                  />
                  <span className="capitalize text-sm">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {watch("gri402.hasNoticePeriods") === "yes" ? (
            <>
              <div>
                <InfoLabel
                  label="Q6. Are minimum notice periods specified in collective agreements or policies?"
                  info="Select Yes if notice periods are written in company policies, employee contracts, agreements, or required by law."
                />
                <div className="flex gap-4">
                  {["yes", "no"].map((opt) => (
                    <label key={opt} className="flex items-center gap-2">
                      <input
                        type="radio"
                        value={opt}
                        {...register("gri402.noticePeriodsDefined")}
                        className="w-4 h-4 text-[#4639AA]"
                      />
                      <span className="capitalize text-sm">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              {watch("gri402.noticePeriodsDefined") === "yes" && (
                <div>
                  <InfoLabel
                    label="Where notice periods are defined"
                    info="Select where these notice period rules are officially written."
                  />
                  <select
                    {...register("gri402.noticePeriodDefinition")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
                  >
                    <option>Collective bargaining agreements</option>
                    <option>Company policy</option>
                    <option>Employment contracts</option>
                    <option>Legal requirements</option>
                    <option>Other</option>
                  </select>
                </div>
              )}

              <div>
                <InfoLabel
                  label="Q7. What is the typical minimum notice period provided to employees?"
                  info="Enter how much advance notice employees usually get before changes (for example: 15 days, 1 month)."
                />
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse border border-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="p-2 border border-gray-200">Employee category</th>
                        <th className="p-2 border border-gray-200">Notice period</th>
                        <th className="p-2 border border-gray-200">Unit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {noticePeriodsFields.map((item, idx) => (
                        <tr key={item.id}>
                          <td className="p-1 border border-gray-200">
                            <input
                              {...register(`gri402.noticePeriods.${idx}.employeeCategory`)}
                              className="w-full p-1 border-none outline-none"
                              placeholder="e.g. Full-time"
                            />
                          </td>
                          <td className="p-1 border border-gray-200">
                            <input
                              {...register(`gri402.noticePeriods.${idx}.noticePeriod`)}
                              className="w-full p-1 border-none outline-none"
                              placeholder="e.g. 30"
                            />
                          </td>
                          <td className="p-1 border border-gray-200">
                            <select
                              {...register(`gri402.noticePeriods.${idx}.unit`)}
                              className="w-full p-1 border-none outline-none bg-transparent"
                            >
                              <option>days</option>
                              <option>weeks</option>
                              <option>months</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button
                  type="button"
                  onClick={() => appendNoticePeriod({ employeeCategory: "", noticePeriod: "", unit: "days" })}
                  className="text-xs text-[#4639AA] font-bold"
                >
                  + Add Row
                </button>
              </div>

              <div>
                <InfoLabel
                  label="Q8. Do notice periods vary by country or region?"
                  info="Select Yes if notice periods are different depending on location or country."
                />
                <div className="flex gap-4">
                  {["yes", "no"].map((opt) => (
                    <label key={opt} className="flex items-center gap-2">
                      <input
                        type="radio"
                        value={opt}
                        {...register("gri402.variesByLocation")}
                        className="w-4 h-4 text-[#4639AA]"
                      />
                      <span className="capitalize text-sm">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              {watch("gri402.variesByLocation") === "yes" && (
                <div>
                  <InfoLabel
                    label="Explanation of differences"
                    info="Briefly explain why notice periods are different (e.g., due to local laws or company practices)."
                  />
                  <textarea
                    {...register("gri402.locationVariationExplanation")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[100px]"
                    placeholder="Explain location differences..."
                  />
                </div>
              )}
            </>
          ) : (
            <div className="mt-4 bg-[#4639AA]/5 border border-[#4639AA]/15 p-4 rounded-xl">
              <h4 className="text-sm font-bold text-[#4639AA] mb-3">Omission Logic (GRI 402-1)</h4>
              <p className="text-xs text-gray-600 mb-3">If notice periods are not defined or the data is not tracked, provide an omission reason and explanation.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <InfoLabel
                    label="Reason for omission"
                    info="Select the closest reason."
                  />
                  <select
                    {...register("gri402.omissionReason")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
                  >
                    <option value="">Select reason</option>
                    <option value="Not applicable">Not applicable</option>
                    <option value="Data unavailable">Data unavailable</option>
                    <option value="Notice periods not defined">Notice periods not defined</option>
                    <option value="Legal restriction">Legal restriction</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <InfoLabel
                    label="Explanation (required)"
                    info="Explain why the disclosure is omitted."
                  />
                  <textarea
                    {...register("gri402.omissionExplanation")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[100px]"
                    placeholder="e.g. Minimum notice periods are not tracked in our HR system..."
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
  //  Gri 403 OCCUPATIONAL HEALTH AND SAFETY
  const renderGRI403 = () => (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white p-3 rounded-md border border-gray-200">
        <h3 className="text-lg font-bold text-[#4639AA] mb-6 flex items-center gap-2">
          <Icon icon="mdi:shield-check" /> Occupational Health and Safety
        </h3>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <InfoLabel
              label="Q1. Does the organization have policies or practices related to occupational health and safety (OHS)?"
              info="Select Yes if your company has any rules, procedures, or usual practices to keep workers safe and healthy at the workplace."
            />
            <div className="flex gap-4">
              {["yes", "no"].map((opt) => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value={opt}
                    {...register("gri403.hasOhsPolicies")}
                    className="w-4 h-4 text-[#4639AA] focus:ring-[#4639AA]"
                  />
                  <span className="capitalize text-sm text-gray-700">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {watch("gri403.hasOhsPolicies") === "yes" && (
            <div>
              <InfoLabel
                label="Brief description of OHS policies or practices"
                info="Briefly describe how your company ensures worker safety (e.g., safety rules, training, protective equipment)."
              />
              <textarea
                {...register("gri403.ohsDescription")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[120px]"
                placeholder="Describe OHS policies or practices..."
              />
            </div>
          )}

          <div>
            <InfoLabel
              label="Q2. Who is responsible for managing occupational health and safety?"
              info="Select the person or department responsible for worker safety, health, and workplace conditions."
            />
            <select
              {...register("gri403.responsible")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
            >
              <option>Health & Safety function</option>
              <option>Human Resources</option>
              <option>Operations</option>
              <option>Senior management</option>
              <option>Sustainability team</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <InfoLabel
              label="Q3. What actions are taken to prevent work-related injuries and ill health?"
              info="Select actions your company takes to prevent accidents, injuries, or health issues at work."
            />
            <div className="flex flex-wrap gap-4">
              {["Hazard identification and risk assessment", "Safety training and awareness", "Use of personal protective equipment (PPE)", "Incident investigation and corrective actions", "Health surveillance and medical checks", "Other"].map((action) => (
                <label key={action} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={action}
                    {...register("gri403.preventionActions")}
                    className="w-4 h-4 text-[#4639AA]"
                  />
                  <span className="text-sm">{action}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <InfoLabel
              label="Q4. How does the organization monitor OHS performance?"
              info="Select how you track safety performance, such as accident records, inspections, or employee feedback. Select 'Not monitored' if nothing is tracked."
            />
            <div className="flex flex-wrap gap-4">
              {["Incident and injury reporting systems", "Safety audits and inspections", "Health surveillance data", "Employee feedback", "Not monitored"].map((method) => (
                <label key={method} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={method}
                    {...register("gri403.monitoring")}
                    className="w-4 h-4 text-[#4639AA]"
                  />
                  <span className="text-sm">{method}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-3 rounded-md border border-gray-200">
        <h3 className="text-lg font-bold text-[#4639AA] mb-4 flex items-center gap-2">
          <Icon icon="mdi:clipboard-check" /> OHS Management System & Processes
        </h3>
        <div className="space-y-4">
          <div>
            <InfoLabel
              label="Q5. Is an occupational health and safety management system implemented?"
              info="Select Yes if your company has a structured system to manage safety (formal or informal)."
            />
            <div className="flex gap-4">
              {["yes", "no"].map((opt) => (
                <label key={opt} className="flex items-center gap-2">
                  <input
                    type="radio"
                    value={opt}
                    {...register("gri403.hasOhsManagementSystem")}
                    className="w-4 h-4 text-[#4639AA]"
                  />
                  <span className="capitalize text-sm">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {watch("gri403.hasOhsManagementSystem") === "yes" && (
            <div>
              <InfoLabel
                label="Q6. What type of OHS management system is in place?"
                info="Select the type of safety system your company follows (international standard, national rules, or internal system)."
              />
              <div className="flex flex-wrap gap-4">
                {["ISO 45001", "National OHS standard", "Internal OHS system", "Other"].map((type) => (
                  <label key={type} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={type}
                      {...register("gri403.managementSystemTypes")}
                      className="w-4 h-4 text-[#4639AA]"
                    />
                    <span className="text-sm">{type}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div>
            <InfoLabel
              label="Q7. Are processes in place for hazard identification and risk assessment?"
              info="Select Yes if your company identifies risks (e.g., dangerous machines, unsafe areas) and takes steps to reduce them."
            />
            <div className="flex gap-4">
              {["yes", "no"].map((opt) => (
                <label key={opt} className="flex items-center gap-2">
                  <input
                    type="radio"
                    value={opt}
                    {...register("gri403.hasHazardProcesses")}
                    className="w-4 h-4 text-[#4639AA]"
                  />
                  <span className="capitalize text-sm">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <InfoLabel
              label="Q8. Are incidents and near misses investigated?"
              info="Select Yes if accidents or near accidents are reviewed to understand what went wrong and how to prevent it."
            />
            <div className="flex gap-4">
              {["yes", "no"].map((opt) => (
                <label key={opt} className="flex items-center gap-2">
                  <input
                    type="radio"
                    value={opt}
                    {...register("gri403.investigatesIncidents")}
                    className="w-4 h-4 text-[#4639AA]"
                  />
                  <span className="capitalize text-sm">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {watch("gri403.investigatesIncidents") === "yes" && (
            <div>
              <InfoLabel
                label="Brief description of investigation process"
                info="Briefly explain how you investigate incidents (e.g., review, reporting, corrective action)."
              />
              <textarea
                {...register("gri403.investigationDescription")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[100px]"
                placeholder="Describe incident investigation process..."
              />
            </div>
          )}

          <div>
            <InfoLabel
              label="Q9. Are occupational health services provided to workers?"
              info="Select Yes if your company provides any health-related support (e.g., medical checkups, health advice)."
            />
            <div className="flex gap-4">
              {["yes", "no"].map((opt) => (
                <label key={opt} className="flex items-center gap-2">
                  <input
                    type="radio"
                    value={opt}
                    {...register("gri403.providesOccupationalHealthServices")}
                    className="w-4 h-4 text-[#4639AA]"
                  />
                  <span className="capitalize text-sm">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {watch("gri403.providesOccupationalHealthServices") === "yes" && (
            <div>
              <InfoLabel
                label="Q10. What occupational health services are provided?"
                info="Select the health services your company provides to employees."
              />
              <div className="flex flex-wrap gap-4">
                {["Medical examinations", "Health monitoring", "Mental health support", "Ergonomic assessments", "Other"].map((service) => (
                  <label key={service} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={service}
                      {...register("gri403.healthServices")}
                      className="w-4 h-4 text-[#4639AA]"
                    />
                    <span className="text-sm">{service}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div>
            <InfoLabel
              label="Q11. Are workers involved in OHS decision-making?"
              info="Select Yes if employees are involved in safety decisions or can give input on workplace safety."
            />
            <div className="flex gap-4">
              {["yes", "no"].map((opt) => (
                <label key={opt} className="flex items-center gap-2">
                  <input
                    type="radio"
                    value={opt}
                    {...register("gri403.workersInvolved")}
                    className="w-4 h-4 text-[#4639AA]"
                  />
                  <span className="capitalize text-sm">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {watch("gri403.workersInvolved") === "yes" && (
            <div>
              <InfoLabel
                label="Q12. What mechanisms are used for worker participation and consultation?"
                info="Select how workers give feedback or participate in safety matters (e.g., meetings, representatives)."
              />
              <div className="flex flex-wrap gap-4">
                {["Safety committees", "Worker representatives", "Toolbox talks", "Suggestion systems", "Other"].map((mechanism) => (
                  <label key={mechanism} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={mechanism}
                      {...register("gri403.participationMechanisms")}
                      className="w-4 h-4 text-[#4639AA]"
                    />
                    <span className="text-sm">{mechanism}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white p-3 rounded-md border border-gray-200">
        <h3 className="text-lg font-bold text-[#4639AA] mb-4 flex items-center gap-2">
          <Icon icon="mdi:briefcase-check" /> Training, Health & Business Relationships
        </h3>
        <div className="space-y-4">
          <div>
            <InfoLabel
              label="Q13. Is OHS training provided to workers?"
              info="Select Yes if employees are given training on safety, risks, and how to avoid accidents."
            />
            <div className="flex gap-4">
              {["yes", "no"].map((opt) => (
                <label key={opt} className="flex items-center gap-2">
                  <input
                    type="radio"
                    value={opt}
                    {...register("gri403.providesOhsTraining")}
                    className="w-4 h-4 text-[#4639AA]"
                  />
                  <span className="capitalize text-sm">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {watch("gri403.providesOhsTraining") === "yes" && (
            <div>
              <InfoLabel
                label="Q14. Provide OHS training data for the reporting period."
                info="Enter number of workers trained and total training hours during the year."
              />
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-2 border border-gray-200">Worker category</th>
                      <th className="p-2 border border-gray-200">Number trained</th>
                      <th className="p-2 border border-gray-200">Training hours</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trainingFields.map((item, idx) => (
                      <tr key={item.id}>
                        <td className="p-1 border border-gray-200">
                          <input
                            {...register(`gri403.trainingData.${idx}.workerCategory`)}
                            className="w-full p-1 border-none outline-none"
                            placeholder="e.g. Production"
                          />
                        </td>
                        <td className="p-1 border border-gray-200">
                          <input
                            type="number"
                            {...register(`gri403.trainingData.${idx}.numberTrained`)}
                            className="w-full p-1 border-none outline-none"
                            placeholder="0"
                          />
                        </td>
                        <td className="p-1 border border-gray-200">
                          <input
                            type="number"
                            {...register(`gri403.trainingData.${idx}.trainingHours`)}
                            className="w-full p-1 border-none outline-none"
                            placeholder="0"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                type="button"
                onClick={() => appendTraining({ workerCategory: "", numberTrained: 0, trainingHours: 0 })}
                className="text-xs text-[#4639AA] font-bold"
              >
                + Add Row
              </button>
            </div>
          )}

          <div>
            <InfoLabel
              label="Q15. Are programs in place to promote worker health?"
              info="Select Yes if your company runs programs to improve employee health and well-being."
            />
            <div className="flex gap-4">
              {["yes", "no"].map((opt) => (
                <label key={opt} className="flex items-center gap-2">
                  <input
                    type="radio"
                    value={opt}
                    {...register("gri403.hasHealthPrograms")}
                    className="w-4 h-4 text-[#4639AA]"
                  />
                  <span className="capitalize text-sm">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {watch("gri403.hasHealthPrograms") === "yes" && (
            <div>
              <InfoLabel
                label="Q16. What worker health promotion initiatives are implemented?"
                info="Select programs your company offers to improve health (e.g., wellness, fitness, awareness)."
              />
              <div className="flex flex-wrap gap-4">
                {["Wellness programs", "Mental health initiatives", "Fitness or nutrition programs", "Health awareness campaigns", "Other"].map((program) => (
                  <label key={program} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={program}
                      {...register("gri403.healthPrograms")}
                      className="w-4 h-4 text-[#4639AA]"
                    />
                    <span className="text-sm">{program}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div>
            <InfoLabel
              label="Q17. Are OHS risks addressed in business relationships (e.g., contractors, suppliers)?"
              info="Select Yes if your company ensures safety standards are followed by contractors or suppliers."
            />
            <div className="flex gap-4">
              {["yes", "no"].map((opt) => (
                <label key={opt} className="flex items-center gap-2">
                  <input
                    type="radio"
                    value={opt}
                    {...register("gri403.addressesOhsInBusiness")}
                    className="w-4 h-4 text-[#4639AA]"
                  />
                  <span className="capitalize text-sm">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {watch("gri403.addressesOhsInBusiness") === "yes" && (
            <div>
              <InfoLabel
                label="Q18. What measures are taken to prevent or mitigate OHS risks in business relationships?"
                info="Select actions taken to ensure safety of contractors and suppliers."
              />
              <div className="flex flex-wrap gap-4">
                {["Contractor safety requirements", "Supplier OHS assessments", "Training for contractors", "Audits or inspections", "Other"].map((measure) => (
                  <label key={measure} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={measure}
                      {...register("gri403.businessRelationshipMeasures")}
                      className="w-4 h-4 text-[#4639AA]"
                    />
                    <span className="text-sm">{measure}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white p-3 rounded-md border border-gray-200">
        <h3 className="text-lg font-bold text-[#4639AA] mb-4 flex items-center gap-2">
          <Icon icon="mdi:chart-line" /> Coverage, Injuries & Ill Health
        </h3>
        <div className="space-y-4">
          <div>
            <InfoLabel
              label="Q19. Are workers covered by the OHS management system?"
              info="Select Yes if your safety system applies to all or most workers."
            />
            <div className="flex gap-4">
              {["yes", "no"].map((opt) => (
                <label key={opt} className="flex items-center gap-2">
                  <input
                    type="radio"
                    value={opt}
                    {...register("gri403.workersCovered")}
                    className="w-4 h-4 text-[#4639AA]"
                  />
                  <span className="capitalize text-sm">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {watch("gri403.workersCovered") === "yes" && (
            <div>
              <InfoLabel
                label="Q20. Provide coverage data for workers."
                info="Enter total number of workers and how many are covered by the safety system. System will calculate percentage."
              />
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-2 border border-gray-200">Worker category</th>
                      <th className="p-2 border border-gray-200">Total workers</th>
                      <th className="p-2 border border-gray-200">Covered by OHS system</th>
                      <th className="p-2 border border-gray-200">Coverage (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coverageFields.map((item, idx) => {
                      const total = Number(watch(`gri403.coverageData.${idx}.totalWorkers`)) || 0;
                      const covered = Number(watch(`gri403.coverageData.${idx}.coveredBySystem`)) || 0;
                      const percent = total > 0 ? (covered / total) * 100 : 0;
                      return (
                        <tr key={item.id}>
                          <td className="p-1 border border-gray-200">
                            <input
                              {...register(`gri403.coverageData.${idx}.workerCategory`)}
                              className="w-full p-1 border-none outline-none"
                              placeholder="e.g. Office staff"
                            />
                          </td>
                          <td className="p-1 border border-gray-200">
                            <input
                              type="number"
                              {...register(`gri403.coverageData.${idx}.totalWorkers`)}
                              className="w-full p-1 border-none outline-none"
                              placeholder="0"
                            />
                          </td>
                          <td className="p-1 border border-gray-200">
                            <input
                              type="number"
                              {...register(`gri403.coverageData.${idx}.coveredBySystem`)}
                              className="w-full p-1 border-none outline-none"
                              placeholder="0"
                            />
                          </td>
                          <td className="p-2 border border-gray-200 font-bold bg-gray-50">
                            {percent.toFixed(1)}%
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <button
                type="button"
                onClick={() => appendCoverage({ workerCategory: "", totalWorkers: 0, coveredBySystem: 0 })}
                className="text-xs text-[#4639AA] font-bold"
              >
                + Add Row
              </button>
            </div>
          )}

          <div>
            <InfoLabel
              label="Q21. Does the organization record work-related injuries?"
              info="Select Yes if your company keeps records of workplace injuries or accidents."
            />
            <div className="flex gap-4">
              {["yes", "no"].map((opt) => (
                <label key={opt} className="flex items-center gap-2">
                  <input
                    type="radio"
                    value={opt}
                    {...register("gri403.recordsInjuries")}
                    className="w-4 h-4 text-[#4639AA]"
                  />
                  <span className="capitalize text-sm">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {watch("gri403.recordsInjuries") === "yes" && (
            <div>
              <InfoLabel
                label="Q22. Provide work-related injury data."
                info="Enter number of injury cases during the year. System may calculate rate automatically."
              />
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-2 border border-gray-200">Injury type</th>
                      <th className="p-2 border border-gray-200">Number of cases</th>
                    </tr>
                  </thead>
                  <tbody>
                    {injuryFields.map((item, idx) => (
                      <tr key={item.id}>
                        <td className="p-1 border border-gray-200">
                          <input
                            {...register(`gri403.injuryData.${idx}.injuryType`)}
                            className="w-full p-1 border-none outline-none"
                            placeholder="e.g. Lacerations"
                          />
                        </td>
                        <td className="p-1 border border-gray-200">
                          <input
                            type="number"
                            {...register(`gri403.injuryData.${idx}.numberOfCases`)}
                            className="w-full p-1 border-none outline-none"
                            placeholder="0"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                type="button"
                onClick={() => appendInjury({ injuryType: "", numberOfCases: 0 })}
                className="text-xs text-[#4639AA] font-bold"
              >
                + Add Row
              </button>
            </div>
          )}

          <div>
            <InfoLabel
              label="Q23. Does the organization record work-related ill health cases?"
              info="Select Yes if your company tracks illnesses caused by work (e.g., stress, exposure, physical issues)."
            />
            <div className="flex gap-4">
              {["yes", "no"].map((opt) => (
                <label key={opt} className="flex items-center gap-2">
                  <input
                    type="radio"
                    value={opt}
                    {...register("gri403.recordsIllHealth")}
                    className="w-4 h-4 text-[#4639AA]"
                  />
                  <span className="capitalize text-sm">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {watch("gri403.recordsIllHealth") === "yes" && (
            <div>
              <InfoLabel
                label="Q24. Provide work-related ill health data."
                info="Enter number of work-related illness cases during the year."
              />
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-2 border border-gray-200">Ill health type</th>
                      <th className="p-2 border border-gray-200">Number of cases</th>
                    </tr>
                  </thead>
                  <tbody>
                    {illHealthFields.map((item, idx) => (
                      <tr key={item.id}>
                        <td className="p-1 border border-gray-200">
                          <input
                            {...register(`gri403.illHealthData.${idx}.illHealthType`)}
                            className="w-full p-1 border-none outline-none"
                            placeholder="e.g. Stress-related illness"
                          />
                        </td>
                        <td className="p-1 border border-gray-200">
                          <input
                            type="number"
                            {...register(`gri403.illHealthData.${idx}.numberOfCases`)}
                            className="w-full p-1 border-none outline-none"
                            placeholder="0"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                type="button"
                onClick={() => appendIllHealth({ illHealthType: "", numberOfCases: 0 })}
                className="text-xs text-[#4639AA] font-bold"
              >
                + Add Row
              </button>
            </div>
          )}

          {(watch("gri403.hasOhsManagementSystem") === "no" || watch("gri403.hasHazardProcesses") === "no" || watch("gri403.providesOhsTraining") === "no" || watch("gri403.recordsInjuries") === "no" || watch("gri403.recordsIllHealth") === "no") && (
            <div className="mt-4 bg-[#4639AA]/5 border border-[#4639AA]/15 p-4 rounded-xl">
              <h4 className="text-sm font-bold text-[#4639AA] mb-3">Omission Logic (GRI 403)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <InfoLabel
                    label="Reason for omission"
                    info="If you cannot provide required data, select the closest reason."
                  />
                  <select
                    {...register("gri403.omissionReason")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
                  >
                    <option value="">Select reason</option>
                    <option value="Data not tracked">Data not tracked</option>
                    <option value="Systems not in place">Systems not in place</option>
                    <option value="Legal restriction">Legal restriction</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <InfoLabel
                    label="Explanation (mandatory)"
                    info="Provide a brief explanation why the data is omitted."
                  />
                  <textarea
                    {...register("gri403.omissionExplanation")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[100px]"
                    placeholder="e.g. OHS management system is currently being developed..."
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
  //  Gri 404
  const renderGRI404 = () => (
    <div className="space-y-8 animate-fadeIn">
    </div>
  );
  //  Gri 405
  const renderGRI405 = () => (
    <div className="space-y-8 animate-fadeIn">
    </div>
  );
  //  Gri 406
  const renderGRI406 = () => (
    <div className="space-y-8 animate-fadeIn">
    </div>
  );
  //  Gri 407
  const renderGRI407 = () => (
    <div className="space-y-8 animate-fadeIn">
    </div>
  );
  //  Gri 408
  const renderGRI408 = () => (
    <div className="space-y-8 animate-fadeIn">
    </div>
  );
  //  Gri 409
  const renderGRI409 = () => (
    <div className="space-y-8 animate-fadeIn">
    </div>
  );
  //  Gri 410
  const renderGRI410 = () => (
    <div className="space-y-8 animate-fadeIn">
    </div>
  );
  //  Gri 411
  const renderGRI411 = () => (
    <div className="space-y-8 animate-fadeIn">
    </div>
  );
  //  Gri 412
  const renderGRI412 = () => (
    <div className="space-y-8 animate-fadeIn">
    </div>
  );
  //  Gri 413
  const renderGRI413 = () => (
    <div className="space-y-8 animate-fadeIn">
    </div>
  );
  //  Gri 414
  const renderGRI414 = () => (
    <div className="space-y-8 animate-fadeIn">
    </div>
  );
  //  Gri 415
  const renderGRI415 = () => (
    <div className="space-y-8 animate-fadeIn">
    </div>
  );
  //  Gri 416
  const renderGRI416 = () => (
    <div className="space-y-8 animate-fadeIn">
    </div>
  );
  



  return (
    <div className=" min-h-screen relative">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 p-6 bg-white border border-gray-200 rounded-lg">
          <div>
            <h1 className="text-2xl font-semibold text-gray-700">
              <span className="text-[#4639AA]">MODULE 6:</span> Social Disclosures
            </h1>
            <div className="mt-1 inline-flex items-center gap-2   text-[#1893A1] font-medium">
              Define and track your GRI-aligned management strategies
            </div>
          </div>
          <div>
            <button
              type="button"
              onClick={() => {
                setAiLoading(true);
                setTimeout(() => setAiLoading(false), 500);
              }}
              disabled={aiLoading}
              className="bg-slate-50/70 border border-gray-400 text-nowrap text-gray-600 flex items-center gap-2 font-medium px-4 py-2 rounded-md transition duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {aiLoading ? (
                <>
                  <Icon icon="eos-icons:loading" className="animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Icon icon="ix:ai" className="animate-pulse" />
                  Fill With AI
                </>
              )}
            </button>
          </div>
        </header>

        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className=" flex flex-col gap-2 p-3 bg-white border border-gray-200 rounded-lg w-full md:w-fit overflow-y-auto scroll-hide lg:h-[calc(100vh-150px)]">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center text-start text-nowrap gap-2 px-4 py-2 rounded font-semibold transition-all ${activeTab === tab.id ? "bg-gradient-to-r from-[#4639AA] to-[#1893A1] text-white" : "text-gray-500 hover:bg-gray-50"
                  }`}
              >
                <Icon icon={tab.icon} className="text-xl" />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="w-full bg-white border border-gray-200 rounded-lg p-4 ">
            <div className="lg:h-[calc(90vh-150px)] overflow-y-auto scroll-hide">
              {activeTab === 0 && renderGRI401()}
              {activeTab === 1 && renderGRI402()}
              {activeTab === 2 && renderGRI403()}
              {activeTab === 3 && renderGRI404()}
              {activeTab === 4 && renderGRI405()}
              {activeTab === 5 && renderGRI406()}
              {activeTab === 6 && renderGRI407()}
              {activeTab === 7 && renderGRI408()}
              {activeTab === 8 && renderGRI419()}
              {activeTab === 9 && renderGRI410()}
              {activeTab === 10 && renderGRI411()}
              {activeTab === 11 && renderGRI412()}
              {activeTab === 12 && renderGRI413()}
              {activeTab === 13 && renderGRI414()}
              {activeTab === 14 && renderGRI415()}
              {activeTab === 15 && renderGRI416()}
              {activeTab === 16 && renderGRI417()}
            
            </div>

            <div className=" mt-2   z-50">
              <div className=" flex justify-between items-center">
                {/* LEFT SIDE */}
                <div className="text-sm text-gray-600 font-medium">

                </div>
                {/* RIGHT SIDE ACTIONS */}
                <div className="flex items-center gap-3">
                  <button
                    disabled={activeTab === 0}
                    onClick={() => setActiveTab((prev) => Math.max(0, prev - 1))}
                    className="px-6 py-2 bg-gray-100 text-gray-700 rounded font-medium hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                    disabled={loading}
                    className="px-5 py-2 bg-[#1893A1] text-white rounded shadow-sm hover:shadow-md hover:opacity-95 transition font-semibold disabled:opacity-50"
                  >
                    {loading ? "Saving..." : "Save Progress"}
                  </button>
                  <button
                    type="button"
                    onClick={handleManualNext}
                    className="px-8 py-2 bg-gradient-to-br from-[#4639AA] to-[#1893A1] text-white rounded font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {activeTab === tabs.length - 1 ? "Save & Finish" : "Next Step"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Navigation Footer - Governance/Organization Style */}

    </div>
  );
};

export default SocialApproach;
