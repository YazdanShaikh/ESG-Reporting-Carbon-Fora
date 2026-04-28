import React, { useEffect, useState } from "react";
import CountryMultiSelect from "../../../components/partials/CountryMultiSelect";
import MultiSelectDropdown from "../../../components/partials/MultiSelectDropdown";
import { SECTORS } from "../../../constants/sectors";
import { COUNTRIES } from "../../../constants/countries";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useFieldArray } from "react-hook-form";
import axiosInstance from "../../../configs/axios.config";
import { toast } from "react-toastify";
import { handleError } from "../../../utils/functions";
import { clearAuth } from "../../../store/slice/auth";

const OrganizationSetup = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const tabs = [
    { id: 0, label: "Organization Profile", icon: "mdi:office-building" },
    { id: 1, label: "Reporting Period & Restatements", icon: "mdi:calendar-range" },
    { id: 2, label: "Organizational Boundary", icon: "mdi:vector-square" },
    { id: 3, label: "Legal Entities & Sites", icon: "mdi:factory" },
    { id: 4, label: "Reporting Standards & Assurance", icon: "mdi:file-certificate" },
  ];

  // Validation schemas for each tab
  const tabSchemas = {
    0: yup.object({
      legalName: yup.string().required("Legal name is required"),
      headquarters: yup.string().required("Headquarters location is required"),
      website: yup.string().url("Invalid website URL").required("Website is required"),
      primaryActivities: yup.string().required("Primary activities are required"),
      significantProducts: yup.string().required("Significant products/services are required"),
      countriesOfOperation: yup.array().min(1, "At least one country must be selected"),
      marketsServed: yup.array().min(1, "At least one market must be selected"),
      reportingCurrency: yup.string().required("Reporting currency is required"),
      ownershipStructure: yup.string().required("Ownership structure is required"),
      sector: yup.array().required("Sector is required"),
      totalEmployees: yup.number().required("Total employees is required"),
      employeesByGender: yup.object({
        male: yup.number().required("Male employees count is required"),
        female: yup.number().required("Female employees count is required"),
      }),
    employeesByContract: yup.object({
        permanent: yup.number().required("Permanent employees count is required"),
        temporary: yup.number().required("Temporary employees count is required"),
      }),
      nonEmployeeWorkers: yup.object({
        exists: yup.string(),
        description: yup.string().when('exists', {
          is: 'yes',
          then: (schema) => schema.required("Description is required"),
        }),
      }),
      significantChanges: yup.object({
        exists: yup.string(),
        description: yup.string().when('exists', {
          is: 'yes',
          then: (schema) => schema.required("Description is required"),
        }),
      }),
      supplyChainChanges: yup.object({
        exists: yup.string(),
        description: yup.string().when('exists', {
          is: 'yes',
          then: (schema) => schema.required("Description is required"),
        }),
      }),
    }),
    1: yup.object({
      reportingPeriodStart: yup.date().required("Reporting period start is required"),
      reportingPeriodEnd: yup.date().required("Reporting period end is required"),
      reportingFrequency: yup.string().required("Reporting frequency is required"),
      previousReportingPeriod: yup.object({
        start: yup.date(),
        end: yup.date(),
      }),
      reportingPeriodChanged: yup.string(), // "yes"/"no"
      restatements: yup.object({
        exists: yup.string(),
        description: yup.string().when('exists', {
          is: 'yes',
          then: (schema) => schema.required("Description is required"),
        }),
      }),
    }),
    2: yup.object({
      boundaryApproach: yup.string().required("Boundary approach is required"),
      reportingBoundaryDescription: yup.string(),
      alignedWithFinancialReporting: yup.string(),
      differencesDescription: yup.string(),
      consolidationMethod: yup.string().required("Consolidation method is required"),
      excludedEntities: yup.string(),
      exclusionJustification: yup.string(),
      boundaryChanged: yup.string(),
      significantImpactsOutsideBoundary: yup.object({
        exists: yup.string(),
        description: yup.string().when('exists', {
          is: 'yes',
          then: (schema) => schema.required("Description is required"),
        }),
      }),
    }),
    3: yup.object({
      entities: yup.array().of(
        yup.object({
          name: yup.string().required("Entity name is required"),
          country: yup.string().required("Country is required"),
          type: yup.string().required("Entity type is required"),
          ownershipPercentage: yup.string().required("Ownership % is required"),
          includedInBoundary: yup.string(),
          exclusionReason: yup.string().when('includedInBoundary', {
            is: 'no',
            then: (schema) => schema.required("Reason is required"),
            otherwise: (schema) => schema.notRequired(),
          }),
          employeeCount: yup.string().required("Employee count is required"),
          environmentallySignificant: yup.string(),
          highRisk: yup.string(),
          status: yup.string(),
        })
      ),
    }),
    4: yup.object({
      reportingStandards: yup.string().required("Select standards"),
      griVersion: yup.string(),
      inAccordanceWithGRI: yup.string(),
      griClaim: yup.string(),
      griContentIndexIncluded: yup.string(),
      reportType: yup.string(),
      publicationFormat: yup.string().required("Select format"),
      otherFrameworks: yup.array(),
      externalAssurance: yup.object({
        obtained: yup.string(),
        scopeAndProvider: yup.string(),
      }),
    }),
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(tabSchemas[activeTab]),
    mode: "onChange",
    shouldUnregister: false,

  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "entities",
  });


  // Final submission handler
  const handleFinalSubmit = async (values) => {
    setLoading(true);
    try {
      // helper to convert "yes"/"no" to boolean
      const toBool = (val) => val === "yes";
      // helper to convert string number to number
      const toNum = (val) => parseInt(val, 10) || 0;

      const payload = {
        legalName: values.legalName,
        primaryActivities: values.primaryActivities,
        significantProducts: values.significantProducts,
        headquarters: values.headquarters,
        countriesOfOperation: values.countriesOfOperation,
        marketsServed: values.marketsServed,
        ownershipStructure: values.ownershipStructure,
        sector: values.sector,
        totalEmployees: toNum(values.totalEmployees),
        employeesByGender: {
          male: toNum(values.employeesByGender?.male),
          female: toNum(values.employeesByGender?.female)
        },
      employeesByContract: {
          permanent: toNum(values.employeesByContract?.permanent),
          temporary: toNum(values.employeesByContract?.temporary)
        },
        nonEmployeeWorkers: {
          exists: toBool(values.nonEmployeeWorkers?.exists),
          description: values.nonEmployeeWorkers?.description
        },
        significantChanges: {
          exists: toBool(values.significantChanges?.exists),
          description: values.significantChanges?.description
        },
        supplyChainChanges: {
          exists: toBool(values.supplyChainChanges?.exists),
          description: values.supplyChainChanges?.description
        },
        reportingCurrency: values.reportingCurrency,
        website: values.website,

        reportingPeriodStart: values.reportingPeriodStart,
        reportingPeriodEnd: values.reportingPeriodEnd,
        reportingFrequency: values.reportingFrequency,
        previousReportingPeriod: {
          start: values.previousReportingPeriod?.start,
          end: values.previousReportingPeriod?.end
        },
        reportingPeriodChanged: toBool(values.reportingPeriodChanged),
        restatements: {
          exists: toBool(values.restatements?.exists),
          description: values.restatements?.description
        },

        boundaryApproach: values.boundaryApproach,
        reportingBoundaryDescription: values.reportingBoundaryDescription,
        alignedWithFinancialReporting: toBool(values.alignedWithFinancialReporting),
        differencesDescription: values.differencesDescription,
        consolidationMethod: values.consolidationMethod,
        excludedEntities: values.excludedEntities,
        exclusionJustification: values.exclusionJustification,
        boundaryChanged: toBool(values.boundaryChanged),
        significantImpactsOutsideBoundary: {
          exists: toBool(values.significantImpactsOutsideBoundary?.exists),
          description: values.significantImpactsOutsideBoundary?.description
        },

        entities: values.entities?.map(e => ({
          name: e.name,
          country: e.country,
          type: e.type,
          ownershipPercentage: toNum(e.ownershipPercentage),
          includedInBoundary: toBool(e.includedInBoundary),
          exclusionReason: e.exclusionReason,
          employeeCount: toNum(e.employeeCount),
          environmentallySignificant: toBool(e.environmentallySignificant),
          highRisk: toBool(e.highRisk),
          status: e.status
        })) || [],

        reportingStandards: values.reportingStandards,
        griVersion: values.griVersion,
        inAccordanceWithGRI: toBool(values.inAccordanceWithGRI),
        griClaim: values.griClaim,
        griContentIndexIncluded: toBool(values.griContentIndexIncluded),
        reportType: values.reportType,
        otherFrameworks: values.otherFrameworks,
        externalAssurance: {
          obtained: toBool(values.externalAssurance?.obtained),
          scopeAndProvider: values.externalAssurance?.scopeAndProvider
        },
        publicationFormat: values.publicationFormat
      };

      const res = await axiosInstance.post("/brand/organization", payload);
      if (res.data.success) {
        toast.success("Organization setup completed successfully!");
        // navigate("/dashboard");
      } else {
        throw new Error(res.data.message || "Submission failed");
      }

    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle tab navigation with validation
  const handleNext = async (e) => {
    // Prevent default if called from button click directly (though type="button" handles this)
    if (e) e.preventDefault();

    // Validate current tab
    const isValid = await new Promise((resolve) => {
      handleSubmit(
        () => resolve(true),
        () => resolve(false)
      )();
    });

    if (isValid) {
      if (activeTab === 4) {
        // Last tab - Submit final form with all values
        handleSubmit(handleFinalSubmit)();
      } else {
        // Just move to next tab
        setActiveTab((prev) => Math.min(4, prev + 1));
      }
    } else {
      toast.error("Please fill all required fields correctly");
      console.log("Validation errors:", errors);
    }
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
            <div className="text-sm text-gray-500 animate-fadeIn ">
              {info}
            </div>
          )}
        </div>
      );
    };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <div className="space-y-8">
            <h2 className="text-xl font-semibold text-gray-700">
              <span className="text-[#4639AA]"> Organization Profile </span>
            </h2>
            {/* Basic Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-800">Basic Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <InfoLabel
                    label="What is the legal name of the reporting organization?"
                    info="Provide the officially registered legal name of the reporting organization."
                  />
                  
                  <input
                    type="text"
                    {...register("legalName")}
                    className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]"
                    placeholder="ABC Manufacturing Pvt. Ltd."
                  />
                  {errors.legalName && (
                    <p className="text-red-500 text-sm mt-1">{errors.legalName.message}</p>
                  )}
                </div>

                <div>
                  <InfoLabel
                    label="Where is the organization headquartered?"
                    info="Specify the city and country where the organization’s head office is located."
                  />
                  <input
                    type="text"
                    {...register("headquarters")}
                    className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]"
                    placeholder="Karachi, Pakistan"
                  />
                  {errors.headquarters && (
                    <p className="text-red-500 text-sm mt-1">{errors.headquarters.message}</p>
                  )}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Organization Website
                </label>
                <input
                  type="url"
                  {...register("website")}
                  className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]"

                  placeholder="https://www.example.com"
                />
                {errors.website && (
                  <p className="text-red-500 text-sm mt-1">{errors.website.message}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <InfoLabel
                    label="What are the organization’s primary activities?"
                    info="Describe the organization’s main business operations and core activities."
                  />
                
                <textarea
                  rows={2}
                  {...register("primaryActivities")}
                  className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y"
                  placeholder="Textile spinning and fabric manufacturing"
                />
                {errors.primaryActivities && (
                  <p className="text-red-500 text-sm mt-1">{errors.primaryActivities.message}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <InfoLabel
                  label="What products or services are significant?"
                  info="List key products or services that contribute substantially to revenue or impact."
                />
                
                <textarea
                  rows={2}
                  {...register("significantProducts")}
                  className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y"
                  placeholder="Cotton yarn, woven fabrics"
                />
                {errors.significantProducts && (
                  <p className="text-red-500 text-sm mt-1">{errors.significantProducts.message}</p>
                )}
              </div>
            </div>

            {/* Operations & Markets */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-800">Operations & Markets</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <InfoLabel
                    label="In which countries does the organization operate?"
                    info="Select all countries where the organization conducts business activities."
                  />
                  <CountryMultiSelect
                    label={null}
                    options={COUNTRIES}
                    selected={watch("countriesOfOperation") || []}
                    onChange={(value) => setValue("countriesOfOperation", value, { shouldValidate: true })}
                  />
                  {errors.countriesOfOperation && (
                    <p className="text-red-500 text-sm mt-1">{errors.countriesOfOperation.message}</p>
                  )}
                </div>

                <div>
                  <InfoLabel
                    label="Which markets are served?"
                    info="Identify geographic or customer markets served by the organization."
                  />
                  
                  <div className="flex flex-wrap gap-6">
                    {["Domestic", "EU", "US"].map((market) => (
                      <label key={market} className="flex items-center">
                        <input
                          type="checkbox"
                          {...register("marketsServed")}
                          value={market}
                          defaultChecked
                          className="h-4 w-4 text-[#4639AA] focus:ring-[#4639AA] border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">{market}</span>
                      </label>
                    ))}
                  </div>
                  {errors.marketsServed && (
                    <p className="text-red-500 text-sm mt-1">{errors.marketsServed.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <InfoLabel
                    label="What is the reporting currency?"
                    info="Select the primary currency used in financial and sustainability reporting."
                  />
                  <select
                    {...register("reportingCurrency")}
                    className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] bg-white"
                  >
                    <option value="PKR">PKR - Pakistani Rupee</option>
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="other">Other</option>
                  </select>
                  {/* Show input if 'Other' is selected */}
                  {watch("reportingCurrency") === "other" && (
                    <input
                      type="text"
                      {...register("reportingCurrencyOther")}
                      className="w-full mt-2 px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]"
                      placeholder="Please specify other currency"
                    />
                  )}
                  {errors.reportingCurrency && (
                    <p className="text-red-500 text-sm mt-1">{errors.reportingCurrency.message}</p>
                  )}
                  {errors.reportingCurrencyOther && watch("reportingCurrency") === "other" && (
                    <p className="text-red-500 text-sm mt-1">{errors.reportingCurrencyOther.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Organization Structure */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <h3 className="text-lg font-medium text-gray-800 md:col-span-2">Organization Structure</h3>

              <div>
                <InfoLabel
                    label="What is the ownership structure and legal form?"
                    info="Describe ownership type and legal registration structure."
                  />
                
                <select
                  {...register("ownershipStructure")}
                  className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] bg-white"
                >
                  <option>Privately owned limited company</option>
                  <option>Public limited company</option>
                  <option>Partnership</option>
                  <option>Other</option>
                </select>
                {errors.ownershipStructure && (
                  <p className="text-red-500 text-sm mt-1">{errors.ownershipStructure.message}</p>
                )}
              </div>

                <div>
                  <InfoLabel
                    label="Which sector(s) does the organization operate in?"
                    info="Select all sectors that represent the organization’s primary business activities. Multiple selections are allowed."
                  />
                  <MultiSelectDropdown
                    options={SECTORS}
                    selected={watch("sector") || []}
                    onChange={(value) => setValue("sector", value, { shouldValidate: true })}
                    placeholder="Select sector(s)..."
                    tooltip="Select all sectors that represent the organization’s primary business activities. Multiple selections are allowed."
                  />
                  {/* Show input if 'Other (Please Specify)' is selected */}
                  {(watch("sector") || []).includes("Other (Please Specify)") && (
                    <input
                      type="text"
                      {...register("sectorOther")}
                      className="w-full mt-2 px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]"
                      placeholder="Please specify other sector(s)"
                    />
                  )}
                  
                </div>
            </div>

            {/* Workforce Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-800">Workforce Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <InfoLabel
                    label="Total Number of Employees?"
                    info="Report total workforce size at the end of the reporting period."
                  />
                  <input
                    type="number"
                    min="0"
                    {...register("totalEmployees")}
                    className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]"
                    placeholder="1250"
                  />
                  {errors.totalEmployees && (
                    <p className="text-red-500 text-sm mt-1">{errors.totalEmployees.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Male Employees
                  </label>
                  <input
                    type="number"
                    min="0"
                    {...register("employeesByGender.male")}
                    className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]"
                    placeholder="900"
                  />
                  {errors.employeesByGender?.male && (
                    <p className="text-red-500 text-sm mt-1">{errors.employeesByGender.male.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Female Employees
                  </label>
                  <input
                    type="number"
                    min="0"
                    {...register("employeesByGender.female")}
                    className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]"
                    placeholder="350"
                  />
                  {errors.employeesByGender?.female && (
                    <p className="text-red-500 text-sm mt-1">{errors.employeesByGender.female.message}</p>
                  )}
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
                    {...register("employeesByContract.permanent")}
                    className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]"
                    placeholder="1100"
                  />
                  {errors.employeesByContract?.permanent && (
                    <p className="text-red-500 text-sm mt-1">{errors.employeesByContract.permanent.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Temporary / Contract Employees
                  </label>
                  <input
                    type="number"
                    min="0"
                    {...register("employeesByContract.temporary")}
                    className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]"
                    placeholder="150"
                  />
                  {errors.employeesByContract?.temporary && (
                    <p className="text-red-500 text-sm mt-1">{errors.employeesByContract.temporary.message}</p>
                  )}
                </div>
              </div>

              <div>
                <InfoLabel
                  label="Are there workers who are not employees? (e.g. contract labor, freelancers)"
                  info="Indicate whether contract or outsourced workers are engaged."
                />
                
                <div className="flex items-center gap-6 mb-3">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      {...register("nonEmployeeWorkers.exists")}
                      value="yes"
                      className="h-4 w-4 text-[#4639AA] focus:ring-[#4639AA]"
                    />
                    <span className="ml-2 text-sm text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      {...register("nonEmployeeWorkers.exists")}
                      value="no"
                      defaultChecked
                      className="h-4 w-4 text-[#4639AA] focus:ring-[#4639AA]"
                    />
                    <span className="ml-2 text-sm text-gray-700">No</span>
                  </label>
                </div>

                <textarea
                  rows={2}
                  {...register("nonEmployeeWorkers.description")}
                  className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y"
                  placeholder="If yes, describe (e.g. contract labor)"

                />
                {errors.nonEmployeeWorkers?.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.nonEmployeeWorkers.description.message}</p>
                )}
              </div>
            </div>

            {/* Changes During Reporting Period */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-800">Changes During Reporting Period</h3>

              <div className="space-y-6">
                <div>
                  <InfoLabel
                    label="Have there been significant organizational changes during the reporting period?"
                    info="Report major structural or operational changes during the reporting period."
                  />
                  
                  <div className="flex gap-4 items-start">
                    <select
                      {...register("significantChanges.exists")}
                      className="w-32 px-3 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]"
                    >
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                    <input
                      type="text"
                      {...register("significantChanges.description")}
                      className="flex-1 px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]"
                      placeholder="Explanation (if yes)"
                    />
                  </div>
                  {errors.significantChanges?.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.significantChanges.description.message}</p>
                  )}
                </div>

                <div>
                  <InfoLabel
                    label="Have there been significant supply chain changes?"
                    info="Describe significant modifications in suppliers or sourcing arrangements."
                  />
                  
                  <div className="flex gap-4 items-start">
                    <select
                      {...register("supplyChainChanges.exists")}
                      className="w-32 px-3 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]"
                    >
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                    <input
                      type="text"
                      {...register("supplyChainChanges.description")}
                      className="flex-1 px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]"

                      placeholder="Explanation (if yes)"
                    />
                  </div>
                  {errors.supplyChainChanges?.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.supplyChainChanges.description.message}</p>
                  )}
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
              <span className="text-[#4639AA]"> Reporting Period & Restatements </span>
            </h2>

            {/* Reporting Period */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Reporting Period Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <InfoLabel
                    label="Reporting Period Start Date"
                    info="Specify the beginning date of the sustainability reporting period."
                  />
                  
                  <input
                    type="date"
                    {...register("reportingPeriodStart")}
                    className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] transition-colors"
                    placeholder="2024-01-01"
                  />
                  {errors.reportingPeriodStart && (
                    <p className="text-red-500 text-sm mt-1">{errors.reportingPeriodStart.message}</p>
                  )}
                </div>

                <div>
                  <InfoLabel
                    label="Reporting Period End Date"
                    info="Specify the closing date of the reporting period."
                  />
                  
                  <input
                    type="date"
                    {...register("reportingPeriodEnd")}
                    min={watch("reportingPeriodStart") || undefined}
                    className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] transition-colors"
                    placeholder="2024-12-31"
                  />
                  {errors.reportingPeriodEnd && (
                    <p className="text-red-500 text-sm mt-1">{errors.reportingPeriodEnd.message}</p>
                  )}
                </div>

                <div>
                  <InfoLabel
                    label="Reporting Frequency"
                    info="Indicate how often sustainability reports are published."
                  />
                  
                  <select
                    {...register("reportingFrequency")}
                    className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] bg-white"
                  >
                    <option value="Annual">Annual</option>
                    <option value="Biannual">Biannual</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.reportingFrequency && (
                    <p className="text-red-500 text-sm mt-1">{errors.reportingFrequency.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Previous Period */}
            <div>
              <InfoLabel
                  label="Previous Reporting Period (for comparison)"
                  info="Provide dates for the organization’s last reporting cycle."
                />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                <div>
                  <input
                    type="date"
                    {...register("previousReportingPeriod.start")}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
                <div>
                  <input
                    type="date"
                    {...register("previousReportingPeriod.end")}
                    min={watch("previousReportingPeriod.start") || undefined}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
              </div>
            </div>

            {/* Period Change */}
            <div>
              <InfoLabel
                label="Has the reporting period changed compared to last year?"
                info="Confirm whether the reporting timeline differs from previous reports."
              />
              
              <div className="flex items-center gap-6">
                <label className="flex items-center">
                  <input
                    type="radio"
                    {...register("reportingPeriodChanged")}
                    value="no"
                    defaultChecked
                    className="h-4 w-4 text-[#4639AA] focus:ring-[#4639AA]"
                  />
                  <span className="ml-2 text-sm text-gray-700">No</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    {...register("reportingPeriodChanged")}
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
                <InfoLabel
                  label="Are there restatements of previously reported information?"
                  info="Indicate whether any information previously reported in sustainability disclosures has been revised due to corrections, updated methodologies, improved data accuracy, or organizational changes."
                />
                
                <div className="flex items-center gap-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      {...register("restatements.exists")}
                      value="yes"
                      className="h-4 w-4 text-[#4639AA] focus:ring-[#4639AA]"
                    />
                    <span className="ml-2 text-sm text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      {...register("restatements.exists")}
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
                <InfoLabel
                  label="If yes, describe the restatement and reason"
                  info="Describe corrections made and reasons for data restatement."
                />
                
                <textarea
                  rows={3}
                  {...register("restatements.description")}
                  className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y"
                  placeholder="e.g. Correction of energy data due to meter error"

                />
                {errors.restatements?.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.restatements.description.message}</p>
                )}
              </div>
            </div>

            {/* Note */}
            <div className="text-sm text-gray-500 bg-blue-50 border border-blue-100 p-4 rounded-lg">
              <strong>Note:</strong> Consistent reporting periods enable year-over-year performance comparison.
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <h2 className="text-xl font-semibold text-gray-700">
              <span className="text-[#4639AA]"> Organizational Boundary </span>
            </h2>

            {/* Boundary Approach */}
            <div className="">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Boundary Definition
              </h3>

              <div className="space-y-6">
                <div>
                  <InfoLabel
                    label="Which boundary approach is used?"
                    info="This question asks how you decide which parts of your business are included in the report.
                      • Operational control → Include operations you manage and control day-to-day (most common for SMEs).
                      • Financial control → Include operations where you control financial decisions.
                      • Equity share → Include operations based on your ownership percentage.
                      If you operate only one company and fully manage it, select Operational control.
                      "
                  />
                 
                  <select
                    {...register("boundaryApproach")}
                    className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] bg-white"
                  >
                    <option value="Operational control">Operational control</option>
                    <option value="Equity share">Equity share</option>
                    <option value="Financial control">Financial control</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.boundaryApproach && (
                    <p className="text-red-500 text-sm mt-1">{errors.boundaryApproach.message}</p>
                  )}
                </div>

                <div>
                  <InfoLabel
                    label="Describe the reporting boundary"
                    info="Describe which offices, factories, warehouses, or business units are included in this report.
                      Example:
                      “All manufacturing and office operations in Faisalabad.”
                      Do not include businesses you do not manage.
                      "
                  />
                  
                  <textarea
                    rows={3}
                    {...register("reportingBoundaryDescription")}
                    className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y"
                    placeholder="All manufacturing units under direct operational control"

                  />
                  {errors.reportingBoundaryDescription && (
                    <p className="text-red-500 text-sm mt-1">{errors.reportingBoundaryDescription.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Alignment with Financial Reporting */}
            <div>
              <InfoLabel
                label="Is the sustainability boundary aligned with financial reporting?"
                info="
                  Are the same offices, factories, and entities included in both your financial statements and this sustainability report?
                  • Select Yes if both reports cover the same operations.
                  • Select No only if the sustainability report includes more or fewer units than your financial report.
                  "
              />
             
              <div className="flex items-center gap-6">
                <label className="flex items-center">
                  <input
                    type="radio"
                    {...register("alignedWithFinancialReporting")}
                    value="yes"
                    defaultChecked
                    className="h-4 w-4 text-[#4639AA] focus:ring-[#4639AA]"
                  />
                  <span className="ml-2 text-sm text-gray-700">Yes</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    {...register("alignedWithFinancialReporting")}
                    value="no"
                    className="h-4 w-4 text-[#4639AA] focus:ring-[#4639AA]"
                  />
                  <span className="ml-2 text-sm text-gray-700">No</span>
                </label>
              </div>

              {/* Conditional field - shown only if "No" */}
              <div className="mt-4">
                <InfoLabel
                  label="If not aligned, explain differences"
                  info="Explain reasons for differences if boundaries are not aligned."
                />
                <textarea
                  rows={2}
                  {...register("differencesDescription")}
                  className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y bg-gray-50"
                  placeholder="e.g. Sustainability includes upstream suppliers not in financial consolidation..."

                />
              </div>
            </div>

            {/* Consolidation & Exclusions */}
            <div className="space-y-6">
              <div>
                <InfoLabel
                  label="What consolidation method is applied?"
                  info="This refers to how financial data from multiple entities is combined.
                    • Full consolidation → Used when you fully own and control an entity (most common).
                    • Equity method → Used when you partially own another company.
                    If you do not have subsidiaries or joint ventures, select Full consolidation.
                    "
                />
                <select
                  {...register("consolidationMethod")}
                  className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] bg-white"
                >
                  <option value="Full consolidation">Full consolidation</option>
                  <option value="Proportionate consolidation">Proportionate consolidation</option>
                  <option value="Equity method">Equity method</option>
                  <option value="None">None</option>
                </select>
                {errors.consolidationMethod && (
                  <p className="text-red-500 text-sm mt-1">{errors.consolidationMethod.message}</p>
                )}
              </div>

              <div>
                <InfoLabel
                  label="Which entities or activities are excluded?"
                  info="Mention any business unit, joint venture, or subsidiary that is NOT included in this report.
                    Example:
                    “Joint venture in Lahore not included due to minority ownership.”"
                />
                <textarea
                  rows={2}
                  {...register("excludedEntities")}
                  className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y"
                  placeholder="Joint venture in Lahore"

                />
              </div>

              <div>
                <InfoLabel
                  label="Justification for exclusions"
                  info="Explain why the excluded entity is not included.
                    Common reasons:
                    • No operational control
                    • Minority ownership
                    • Recently acquired"
                />
                <textarea
                  rows={2}
                  {...register("exclusionJustification")}
                  className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y"
                  placeholder="e.g. No operational control, minority share, immaterial impact..."
                />
              </div>
            </div>

            {/* Boundary Changes & Significant Impacts */}
            <div className="space-y-6">
              <div>
                <InfoLabel
                  label="Has the reporting boundary changed since last year?"
                  info="Report any changes in reporting scope compared to last year."
                />
                
                <div className="flex items-center gap-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      {...register("boundaryChanged")}
                      value="no"
                      defaultChecked
                      className="h-4 w-4 text-[#4639AA] focus:ring-[#4639AA]"
                    />
                    <span className="ml-2 text-sm text-gray-700">No</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      {...register("boundaryChanged")}
                      value="yes"
                      className="h-4 w-4 text-[#4639AA] focus:ring-[#4639AA]"
                    />
                    <span className="ml-2 text-sm text-gray-700">Yes</span>
                  </label>
                </div>
              </div>

              <div>
                <InfoLabel
                  label="Are there significant impacts outside the reporting boundary?"
                  info="This refers to environmental or social impacts in your supply chain or value chain that occur outside your direct operations.
                    Example:
                    • Cotton farming
                    • Raw material extraction
                    • Transportation by third-party logistics
                    Select Yes if your suppliers or distributors may create environmental or social impacts related to your business.
                    "
                />
                <div className="flex items-center gap-6 mb-3">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      {...register("significantImpactsOutsideBoundary.exists")}
                      value="yes"
                      className="h-4 w-4 text-[#4639AA] focus:ring-[#4639AA]"
                    />
                    <span className="ml-2 text-sm text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      {...register("significantImpactsOutsideBoundary.exists")}
                      value="no"
                      defaultChecked
                      className="h-4 w-4 text-[#4639AA] focus:ring-[#4639AA]"
                    />
                    <span className="ml-2 text-sm text-gray-700">No</span>
                  </label>
                </div>

                <textarea
                  rows={2}
                  {...register("significantImpactsOutsideBoundary.description")}
                  className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y"
                  placeholder="Yes – upstream cotton farming"

                />
                {errors.significantImpactsOutsideBoundary?.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.significantImpactsOutsideBoundary.description.message}</p>
                )}
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
                <span className="text-[#4639AA]"> Legal Entities & Operational Sites </span>
              </h2>

              <p className="text-gray-600 mt-1">
                List all legal entities and operational sites included in (or excluded from) the reporting boundary.
              </p>
            </div>

            {/* Entities List */}
            <div className="space-y-6">
              {fields.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-5 relative"
                >
                  {/* Remove button - hidden for first entry if you want to force at least one */}
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
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
                        {...register(`entities.${index}.name`)}
                        className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]"
                        placeholder="e.g. ABC Spinning Unit"
                      />
                      {errors.entities?.[index]?.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.entities[index].name.message}</p>
                      )}
                    </div>

                    {/* Country */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Country of Operation
                      </label>
                      <select
                        {...register(`entities.${index}.country`)}
                        className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] bg-white"
                      >
                        <option value="">Select country</option>
                        <option value="Pakistan">Pakistan</option>
                        <option value="Bangladesh">Bangladesh</option>
                        <option value="India">India</option>
                        {/* Add more countries as needed */}
                      </select>
                      {errors.entities?.[index]?.country && (
                        <p className="text-red-500 text-sm mt-1">{errors.entities[index].country.message}</p>
                      )}
                    </div>

                    {/* Entity Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Entity Type
                      </label>
                      <select
                        {...register(`entities.${index}.type`)}
                        className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] bg-white"
                      >
                        <option value="Manufacturing facility">Manufacturing facility</option>
                        <option value="Head office">Head office</option>
                        <option value="Warehouse / Distribution">Warehouse / Distribution</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.entities?.[index]?.type && (
                        <p className="text-red-500 text-sm mt-1">{errors.entities[index].type.message}</p>
                      )}
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
                        {...register(`entities.${index}.ownershipPercentage`)}
                        className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]"
                        placeholder="100"
                      />
                      {errors.entities?.[index]?.ownershipPercentage && (
                        <p className="text-red-500 text-sm mt-1">{errors.entities[index].ownershipPercentage.message}</p>
                      )}
                    </div>

                    {/* Included in boundary */}
                    <div>
                      <InfoLabel
                        label="Included in reporting boundary?"
                        info="Indicate whether the site is included in sustainability reporting."
                      />
                      <div className="flex items-center gap-6">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            value="yes"
                            {...register(`entities.${index}.includedInBoundary`)}
                            // defaultValue={item.included ? "yes" : "no"} // Or handle via defaultValues in useForm
                            className="h-4 w-4 text-[#4639AA] focus:ring-[#4639AA]"
                          />
                          <span className="ml-2 text-sm text-gray-700">Yes</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            value="no"
                            {...register(`entities.${index}.includedInBoundary`)}
                            className="h-4 w-4 text-[#4639AA] focus:ring-[#4639AA]"
                          />
                          <span className="ml-2 text-sm text-gray-700">No</span>
                        </label>
                      </div>
                    </div>

                    {/* Conditional - Reason if excluded */}
                    {/* Note: In RHF with useFieldArray, 'watch' is robust for values. */}
                    {watch(`entities.${index}.includedInBoundary`) === "no" && (
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Reason for exclusion
                        </label>
                        <textarea
                          rows={2}
                          {...register(`entities.${index}.exclusionReason`)}
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
                        {...register(`entities.${index}.employeeCount`)}
                        className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]"
                        placeholder="600"
                      />
                      {errors.entities?.[index]?.employeeCount && (
                        <p className="text-red-500 text-sm mt-1">{errors.entities[index].employeeCount.message}</p>
                      )}
                    </div>

                    {/* Environmentally significant */}
                    <div>
                      <InfoLabel
                        label="Is this an environmentally significant site?"
                        info="Select Yes if this location:
                        • Uses large amounts of energy or water
                        • Produces significant emissions or waste
                        • Is regulated under environmental permits
                        Offices are usually No.
                        Manufacturing facilities are often Yes."
                      />
                      <div className="flex items-center gap-6">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            value="yes"
                            {...register(`entities.${index}.environmentallySignificant`)}
                            className="h-4 w-4 text-[#4639AA] focus:ring-[#4639AA]"
                          />
                          <span className="ml-2 text-sm text-gray-700">Yes</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            value="no"
                            {...register(`entities.${index}.environmentallySignificant`)}
                            className="h-4 w-4 text-[#4639AA] focus:ring-[#4639AA]"
                          />
                          <span className="ml-2 text-sm text-gray-700">No</span>
                        </label>
                      </div>
                    </div>

                    {/* High-risk site */}
                    <div>
                      <InfoLabel
                        label="Is this a high-risk site (H&S / human rights)?"
                        info="Select Yes if this location: • Has machinery or industrial operations • Has experienced safety incidents • Operates in an area with known labor or safety risks"
                      />
                      <div className="flex items-center gap-6">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            value="yes"
                            {...register(`entities.${index}.highRisk`)}
                            className="h-4 w-4 text-[#4639AA] focus:ring-[#4639AA]"
                          />
                          <span className="ml-2 text-sm text-gray-700">Yes</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            value="no"
                            {...register(`entities.${index}.highRisk`)}
                            className="h-4 w-4 text-[#4639AA] focus:ring-[#4639AA]"
                          />
                          <span className="ml-2 text-sm text-gray-700">No</span>
                        </label>
                      </div>
                    </div>

                    {/* Operational Status */}
                    <div>
                      <InfoLabel
                        label="Operational status during reporting period"
                        info="Specify operational condition during the reporting period."
                      />
                      <select
                        {...register(`entities.${index}.status`)}
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
              onClick={() => append({
                name: "",
                country: "",
                type: "manufacturing",
                ownershipPercentage: "",
                includedInBoundary: "yes",
                exclusionReason: "",
                employeeCount: "",
                environmentallySignificant: "no",
                highRisk: "no",
                status: "active",
              })}
              className="px-6 py-2.5 border border-[#4639AA] hover:bg-[#3a2f8f] hover:text-white text-[#4639AA] rounded-lg font-medium transition-colors"
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
            <h2 className="text-xl font-semibold text-gray-700">
              <span className="text-[#4639AA]"> Reporting Standards & Assurance </span>
            </h2>

            {/* Standards & Options */}
            <div className="space-y-6">
              <div>
                <InfoLabel
                  label="Which reporting standards are used?"
                  info="Select GRI Standards if this report is being prepared using the Global Reporting Initiative framework. If unsure, consult your ESG consultant before selecting."
                />
                <select
                  {...register("reportingStandards")}
                  className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] bg-white"
                >
                  <option value="GRI Standards">GRI Standards</option>
                  <option value="SASB">SASB</option>
                  <option value="TCFD">TCFD</option>
                  <option value="Other">Other</option>
                </select>
                {errors.reportingStandards && (
                  <p className="text-red-500 text-sm mt-1">{errors.reportingStandards.message}</p>
                )}
              </div>

              <div>
                <InfoLabel
                  label="Is the report prepared in accordance with GRI?"
                  info={
                    `“In accordance” means the report fully follows GRI’s required disclosures.\n\nSelect Yes only if all required GRI disclosures are included.\nIf unsure, consult your ESG consultant.`
                  }
                />
                <div className="flex items-center gap-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="yes"
                      {...register("inAccordanceWithGRI")}
                      className="h-4 w-4 text-[#4639AA] focus:ring-[#4639AA]"
                    />
                    <span className="ml-2 text-sm text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="no"
                      {...register("inAccordanceWithGRI")}
                      className="h-4 w-4 text-[#4639AA] focus:ring-[#4639AA]"
                    />
                    <span className="ml-2 text-sm text-gray-700">No</span>
                  </label>
                </div>
              </div>

              {watch("inAccordanceWithGRI") === "yes" && (
                <div>
                  <InfoLabel
                    label="GRI version applied"
                    info="Select the latest applicable version being used for this report. Most current reports use GRI 2021. "
                  />
                  
                  <input
                    type="text"
                    {...register("griVersion")}
                    className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]"
                    placeholder="e.g. GRI Standards 2021"

                  />
                </div>
              )}

              <div>
                <InfoLabel
                  label="Which GRI claim is used?"
                  info={
                    `There are two levels of GRI reporting:\n\n• In accordance – Core → Basic required disclosures included\n• In accordance – Comprehensive → Includes all detailed disclosures\n\nIf unsure, select Core (most common for first-time reporters).`
                  }
                />
                <select
                  {...register("griClaim")}
                  className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] bg-white"
                >
                  <option value="In accordance – Core">In accordance – Core</option>
                  <option value="In accordance – Comprehensive">In accordance – Comprehensive</option>
                  <option value="With reference to GRI Standards">With reference to GRI Standards</option>
                  <option value="None">None</option>
                </select>
              </div>

              <div>
                <InfoLabel
                  label="Is a GRI Content Index included?"
                  info="A GRI Content Index is a table that lists where each GRI disclosure is located in the report. This is usually prepared by your ESG consultant."
                />
                <div className="flex items-center gap-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="yes"
                      {...register("griContentIndexIncluded")}
                      className="h-4 w-4 text-[#4639AA] focus:ring-[#4639AA]"
                    />
                    <span className="ml-2 text-sm text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="no"
                      {...register("griContentIndexIncluded")}
                      className="h-4 w-4 text-[#4639AA] focus:ring-[#4639AA]"
                    />
                    <span className="ml-2 text-sm text-gray-700">No</span>
                  </label>
                </div>
              </div>
            </div>

            {/* External Assurance */}
            <div className="space-y-6">
              <div>
                <InfoLabel
                  label="Is external assurance obtained?"
                  info="External assurance means an independent third party has reviewed and verified your sustainability data."
                />
                <div className="flex items-center gap-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="yes"
                      {...register("externalAssurance.obtained")}
                      className="h-4 w-4 text-[#4639AA] focus:ring-[#4639AA]"
                    />
                    <span className="ml-2 text-sm text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="no"
                      {...register("externalAssurance.obtained")}
                      className="h-4 w-4 text-[#4639AA] focus:ring-[#4639AA]"
                    />
                    <span className="ml-2 text-sm text-gray-700">No</span>
                  </label>
                </div>
              </div>

              {/* Conditional Assurance Details */}
              {watch("externalAssurance.obtained") === "yes" && (
                <div>
                  <InfoLabel
                    label="If yes, scope and assurance provider"
                    info="Provide assurance details if external verification exists."
                  />
                  <textarea
                    rows={2}
                    {...register("externalAssurance.scopeAndProvider")}
                    className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y"
                    placeholder="e.g. XYZ Auditors, Limited Assurance on GHG emissions"
                  />
                  {errors.externalAssurance?.scopeAndProvider && (
                    <p className="text-red-500 text-sm mt-1">{errors.externalAssurance.scopeAndProvider.message}</p>
                  )}
                </div>
              )}
            </div>

            {/* Report Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Report Type
              </label>
              <select
                {...register("reportType")}
                className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] bg-white"
              >
                <option value="Standalone sustainability report">Standalone sustainability report</option>
                <option value="Integrated annual report">Integrated annual report</option>
                <option value="Sustainability section in annual report">Sustainability section in annual report</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Publication Format & Frameworks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Publication Format */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Report publication format
                </label>
                <select
                  {...register("publicationFormat")}
                  className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] bg-white"
                >
                  <option value="PDF">PDF Download</option>
                  <option value="Web-based">Web-based Interactive</option>
                  <option value="Hardcopy">Hardcopy</option>
                  <option value="Integrated Report">Integrated Report</option>
                </select>
              </div>

              {/* Other Frameworks */}
              <div>
                <InfoLabel
                    label="Are other frameworks used?"
                    info="Select additional reporting frameworks or initiatives followed."
                  />
                <div className="space-y-2">
                  {["TCFD", "UN SDGs", "SBTi", "CDP", "ISSB", "None"].map((fw) => (
                    <label key={fw} className="flex items-center">
                      <input
                        type="checkbox"
                        {...register("otherFrameworks")}
                        value={fw}
                        className="h-4 w-4 text-[#4639AA] focus:ring-[#4639AA] border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{fw}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Note */}
            <div className="text-sm text-gray-500 bg-blue-50 border border-blue-100 p-4 rounded-lg">
              <strong>Note:</strong> External assurance enhances the credibility of your sustainability data.
            </div>
          </div>
        );
      default:
        return <div>Tab content not found</div>;
    }
  };

  return (
    <div className="min-h-screen  ">
      <div className="max-w-7xl mx-auto">

        {/* Header Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-700">
                <span className="text-[#4639AA]">MODULE 1:</span> Organization & Reporting Setup
              </h1>
              <div className="mt-1 inline-flex items-center gap-2   text-[#1893A1] font-medium">
                Sets up the basics of the organization and its operations.
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
          </div>

          {/* Progress */}
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:gap-6">
            <div className="flex items-center gap-4 flex-1">
              <span className="text-sm font-medium text-gray-600 whitespace-nowrap">
                Step {activeTab + 1} of 5
              </span>
              <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
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
          <div className="w-full lg:w-1/3 mt-6 h-full">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4  lg:h-[calc(100vh-150px)] ">
              <div className="space-y-2">
                {tabs.map((tab, index) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-md text-left transition-all
                            ${activeTab === tab.id
                        ? "bg-gradient-to-br from-[#4639AA]  to-[#1893A1] text-white shadow-sm"
                        : "text-gray-700 hover:bg-[#F0EEFF]"
                      }`}
                  >

                    {/* Icon */}
                    <Icon
                      icon={tab.icon}
                      className={`text-2xl ${activeTab === tab.id ? "text-white" : "text-gray-600"
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
          <div className="w-full">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 mt-6">
              <div className="h-[calc(92vh-150px)] overflow-y-auto scrollbar-theme">
                {renderTabContent()}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-4 mt-6 border-t">
                  <button
                    disabled={activeTab === 0}
                    onClick={() => setActiveTab((prev) => Math.max(0, prev - 1))}
                    className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Back
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={loading}
                    className="px-8 py-2 text-lg bg-gradient-to-br from-[#4639AA] to-[#1893A1] text-white rounded-lg font-medium hover:bg-[#3a2f8f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Icon icon="eos-icons:loading" className="animate-spin" />
                        Saving...
                      </>
                    ) : (
                      activeTab === 4 ? "Save & Finish" : "Next Step"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationSetup;