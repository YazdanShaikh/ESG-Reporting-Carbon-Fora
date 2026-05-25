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
    3: yup.object({
      gri404: yup.object({
        hasTrainingPolicies: yup.string().required(),
        trainingDescription: yup.string().when("hasTrainingPolicies", { is: "yes", then: yup.string().required() }),
        responsible: yup.string().required(),
        developmentActions: yup.array().min(1, "Select at least one action"),
        monitoring: yup.array().min(1, "Select at least one monitoring method"),
        tracksTrainingHours: yup.string().required(),
        trainingHoursData: yup.array().of(yup.object({
          employeeCategory: yup.string().required(),
          gender: yup.string().required(),
          averageTrainingHours: yup.number().min(0)
        })).when("tracksTrainingHours", { is: "yes", then: yup.array().min(1, "Add at least one training hours row") }),
        trainingHoursMethodology: yup.string().when("tracksTrainingHours", { is: "yes", then: yup.string().required() }),
        hasSkillPrograms: yup.string().required(),
        skillPrograms: yup.array().when("hasSkillPrograms", { is: "yes", then: yup.array().min(1, "Select at least one program type") }),
        skillProgramsDescription: yup.string().when("hasSkillPrograms", { is: "yes", then: yup.string().required() }),
        conductsReviews: yup.string().required(),
        reviewData: yup.array().of(yup.object({
          employeeCategory: yup.string().required(),
          gender: yup.string().required(),
          reviewCoverage: yup.number().min(0).max(100)
        })).when("conductsReviews", { is: "yes", then: yup.array().min(1, "Add at least one review row") }),
        reviewFrequency: yup.string().when("conductsReviews", { is: "yes", then: yup.string().required() }),
        omissionReason: yup.string().when(["tracksTrainingHours", "conductsReviews"], {
          is: (tracksTrainingHours, conductsReviews) => [tracksTrainingHours, conductsReviews].includes("no"),
          then: yup.string().required(),
          otherwise: yup.string()
        }),
        omissionExplanation: yup.string().when(["tracksTrainingHours", "conductsReviews"], {
          is: (tracksTrainingHours, conductsReviews) => [tracksTrainingHours, conductsReviews].includes("no"),
          then: yup.string().required(),
          otherwise: yup.string()
        })
      })
    }),
    4: yup.object({
      gri405: yup.object({
        hasDiversityPolicies: yup.string().required(),
        diversityDescription: yup.string().when("hasDiversityPolicies", { is: "yes", then: yup.string().required() }),
        responsible: yup.string().required(),
        diversityActions: yup.array().min(1, "Select at least one action"),
        diversityMonitoring: yup.array().min(1, "Select at least one monitoring method"),
        tracksDiversityData: yup.string().required(),
        governanceDiversityData: yup.array().of(yup.object({
          governanceLevel: yup.string().required(),
          gender: yup.string().required(),
          ageGroup: yup.string().required(),
          number: yup.number().min(0)
        })).when("tracksDiversityData", { is: "yes", then: yup.array().min(1, "Add at least one governance diversity entry") }),
        employeeDiversityData: yup.array().of(yup.object({
          employeeCategory: yup.string().required(),
          gender: yup.string().required(),
          ageGroup: yup.string().required(),
          number: yup.number().min(0)
        })).when("tracksDiversityData", { is: "yes", then: yup.array().min(1, "Add at least one employee diversity entry") }),
        tracksPayRatios: yup.string().required(),
        payRatioData: yup.array().of(yup.object({
          employeeCategory: yup.string().required(),
          averageFemaleRemuneration: yup.number().min(0),
          averageMaleRemuneration: yup.number().min(0)
        })).when("tracksPayRatios", { is: "yes", then: yup.array().min(1, "Add at least one pay ratio entry") }),
        payRatioMethodology: yup.string().when("tracksPayRatios", { is: "yes", then: yup.string().required() }),
        omissionReason: yup.string().when(["tracksDiversityData", "tracksPayRatios"], {
          is: (tracksDiversity, tracksPayRatios) => [tracksDiversity, tracksPayRatios].includes("no"),
          then: yup.string().required(),
          otherwise: yup.string()
        }),
        omissionExplanation: yup.string().when(["tracksDiversityData", "tracksPayRatios"], {
          is: (tracksDiversity, tracksPayRatios) => [tracksDiversity, tracksPayRatios].includes("no"),
          then: yup.string().required(),
          otherwise: yup.string()
        })
      })
    }),
    5: yup.object({
      gri406: yup.object({
        hasNonDiscriminationPolicies: yup.string().required(),
        discriminationDescription: yup.string().when("hasNonDiscriminationPolicies", { is: "yes", then: yup.string().required() }),
        responsible: yup.string().required(),
        preventionActions: yup.array().min(1, "Select at least one action"),
        discriminationMonitoring: yup.array().min(1, "Select at least one monitoring method"),
        recordsIncidents: yup.string().required(),
        incidentsReported: yup.string().when("recordsIncidents", { is: "yes", then: yup.string().required() }),
        discriminationIncidents: yup.array().of(yup.object({
          discriminationType: yup.string().required(),
          numberOfIncidents: yup.number().min(0),
          correctiveActions: yup.string().required()
        })).when("incidentsReported", { is: "yes", then: yup.array().min(1, "Add at least one incident entry") }),
        correctiveActionTypes: yup.array().when("incidentsReported", { is: "yes", then: yup.array().min(1, "Select at least one corrective action type") }),
        omissionReason: yup.string().when("recordsIncidents", { is: "no", then: yup.string().required() }),
        omissionExplanation: yup.string().when("recordsIncidents", { is: "no", then: yup.string().required() })
      })
    }),
    6: yup.object({
      gri407: yup.object({
        hasFreedomAssociationPolicies: yup.string().required(),
        freedomAssociationDescription: yup.string().when("hasFreedomAssociationPolicies", { is: "yes", then: yup.string().required() }),
        responsible: yup.string().required(),
        freedomAssociationActions: yup.array().min(1, "Select at least one action"),
        freedomAssociationMonitoring: yup.array().min(1, "Select at least one monitoring method"),
        assessedRisks: yup.string().required(),
        risksIdentified: yup.string().when("assessedRisks", { is: "yes", then: yup.string().required() }),
        operationRiskDetails: yup.array().of(yup.object({
          operationSupplier: yup.string().required(),
          countryRegion: yup.string().required(),
          natureOfRisk: yup.string().required(),
          actionsTaken: yup.string().required()
        })).when("risksIdentified", { is: "yes", then: yup.array().min(1, "Add at least one operation/supplier entry") }),
        addressingActions: yup.array().when("risksIdentified", { is: "yes", then: yup.array().min(1, "Select at least one addressing action") }),
        omissionReason: yup.string().when("assessedRisks", { is: "no", then: yup.string().required() }),
        omissionExplanation: yup.string().when("assessedRisks", { is: "no", then: yup.string().required() })
      })
    }),
    7: yup.object({
      gri408: yup.object({
        hasChildLaborPolicies: yup.string().required(),
        childLaborDescription: yup.string().when("hasChildLaborPolicies", { is: "yes", then: yup.string().required() }),
        alignedStandards: yup.array().when("hasChildLaborPolicies", { is: "yes", then: yup.array().min(1, "Select at least one standard") }),
        responsible: yup.string().required(),
        preventionActions: yup.array().min(1, "Select at least one action"),
        monitoring: yup.array().min(1, "Select at least one monitoring method"),
        assessedRisks: yup.string().required(),
        totalSuppliers: yup.number().min(0).when("assessedRisks", { is: "yes", then: yup.number().required() }),
        suppliersAssessed: yup.number().min(0).when("assessedRisks", { is: "yes", then: yup.number().required().max(yup.ref("totalSuppliers"), "Cannot exceed total suppliers") }),
        risksIdentified: yup.string().when("assessedRisks", { is: "yes", then: yup.string().required() }),
        childLaborRiskDetails: yup.array().of(yup.object({
          operationSupplier: yup.string().required(),
          countryRegion: yup.string().required(),
          typeOfRisk: yup.string().required(),
          category: yup.string().required(),
          actionsTaken: yup.string().required()
        })).when("risksIdentified", { is: "yes", then: yup.array().min(1, "Add at least one entry") }),
        highRiskSuppliers: yup.number().min(0).when("risksIdentified", { is: "yes", then: yup.number().required().max(yup.ref("suppliersAssessed"), "Cannot exceed assessed suppliers") }),
        riskClassificationBasis: yup.array().when("risksIdentified", { is: "yes", then: yup.array().min(1, "Select at least one basis") }),
        addressingMeasures: yup.array().when("risksIdentified", { is: "yes", then: yup.array().min(1, "Select at least one measure") }),
        suppliersWithActions: yup.number().min(0).when("risksIdentified", { is: "yes", then: yup.number().required().max(yup.ref("highRiskSuppliers"), "Cannot exceed high-risk suppliers") }),
        omissionReason: yup.string().when("assessedRisks", { is: "no", then: yup.string().required() }),
        omissionExplanation: yup.string().when("assessedRisks", { is: "no", then: yup.string().required() })
      })
    }),
    8: yup.object({
      gri409: yup.object({
        hasForcedLaborPolicies: yup.string().required(),
        forcedLaborDescription: yup.string().when("hasForcedLaborPolicies", { is: "yes", then: yup.string().required() }),
        alignedStandards: yup.array().when("hasForcedLaborPolicies", { is: "yes", then: yup.array().min(1, "Select at least one standard") }),
        responsible: yup.string().required(),
        preventionActions: yup.array().min(1, "Select at least one action"),
        monitoring: yup.array().min(1, "Select at least one monitoring method"),
        assessedRisks: yup.string().required(),
        totalSuppliers: yup.number().min(0).when("assessedRisks", { is: "yes", then: yup.number().required() }),
        suppliersAssessed: yup.number().min(0).when("assessedRisks", { is: "yes", then: yup.number().required().max(yup.ref("totalSuppliers"), "Cannot exceed total suppliers") }),
        risksIdentified: yup.string().when("assessedRisks", { is: "yes", then: yup.string().required() }),
        forcedLaborRiskDetails: yup.array().of(yup.object({
          operationSupplier: yup.string().required(),
          countryRegion: yup.string().required(),
          typeOfRiskIndicator: yup.string().required(),
          category: yup.string().required(),
          actionsTaken: yup.string().required()
        })).when("risksIdentified", { is: "yes", then: yup.array().min(1, "Add at least one entry") }),
        highRiskSuppliers: yup.number().min(0).when("risksIdentified", { is: "yes", then: yup.number().required().max(yup.ref("suppliersAssessed"), "Cannot exceed assessed suppliers") }),
        riskClassificationBasis: yup.array().when("risksIdentified", { is: "yes", then: yup.array().min(1, "Select at least one basis") }),
        addressingMeasures: yup.array().when("risksIdentified", { is: "yes", then: yup.array().min(1, "Select at least one measure") }),
        suppliersWithActions: yup.number().min(0).when("risksIdentified", { is: "yes", then: yup.number().required().max(yup.ref("highRiskSuppliers"), "Cannot exceed high-risk suppliers") }),
        omissionReason: yup.string().when("assessedRisks", { is: "no", then: yup.string().required() }),
        omissionExplanation: yup.string().when("assessedRisks", { is: "no", then: yup.string().required() })
      })
    }),
    9: yup.object({
      gri410: yup.object({
        hasSecurityPracticesPolicies: yup.string().required(),
        securityPracticesDescription: yup.string().when("hasSecurityPracticesPolicies", { is: "yes", then: yup.string().required() }),
        alignedStandards: yup.array().when("hasSecurityPracticesPolicies", { is: "yes", then: yup.array().min(1, "Select at least one standard") }),
        responsible: yup.string().required(),
        preventionActions: yup.array().min(1, "Select at least one action"),
        monitoring: yup.array().min(1, "Select at least one monitoring method"),
        totalSecurityPersonnel: yup.number().min(0).required(),
        securityPersonnelTrained: yup.number().min(0).required().max(yup.ref("totalSecurityPersonnel"), "Cannot exceed total security personnel"),
        includesThirdPartyPersonnel: yup.string().required(),
        thirdPartyTrainingRequired: yup.string().required(),
        thirdPartyTrainingDescription: yup.string().when("thirdPartyTrainingRequired", { is: "yes", then: yup.string().required() }),
        trainingTypes: yup.array().min(1, "Select at least one training type"),
        omissionReason: yup.string(),
        omissionExplanation: yup.string()
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
      },
      gri404: {
        hasTrainingPolicies: "no",
        trainingDescription: "",
        responsible: "Human Resources",
        developmentActions: [],
        monitoring: [],
        tracksTrainingHours: "no",
        trainingHoursData: [{ employeeCategory: "", gender: "Male", averageTrainingHours: 0 }],
        trainingHoursMethodology: "LMS data",
        hasSkillPrograms: "no",
        skillPrograms: [],
        skillProgramsDescription: "",
        conductsReviews: "no",
        reviewData: [{ employeeCategory: "", gender: "Male", reviewCoverage: 0 }],
        reviewFrequency: "Annual",
        omissionReason: "",
        omissionExplanation: ""
      },
      gri405: {
        hasDiversityPolicies: "no",
        diversityDescription: "",
        responsible: "Human Resources",
        diversityActions: [],
        diversityMonitoring: [],
        tracksDiversityData: "no",
        governanceDiversityData: [{ governanceLevel: "", gender: "Male", ageGroup: "", number: 0 }],
        employeeDiversityData: [{ employeeCategory: "", gender: "Male", ageGroup: "", number: 0 }],
        tracksPayRatios: "no",
        payRatioData: [{ employeeCategory: "", averageFemaleRemuneration: 0, averageMaleRemuneration: 0 }],
        payRatioMethodology: "Payroll data analysis",
        omissionReason: "",
        omissionExplanation: ""
      },
      gri406: {
        hasNonDiscriminationPolicies: "no",
        discriminationDescription: "",
        responsible: "Human Resources",
        preventionActions: [],
        discriminationMonitoring: [],
        recordsIncidents: "no",
        incidentsReported: "no",
        discriminationIncidents: [{ discriminationType: "", numberOfIncidents: 0, correctiveActions: "" }],
        correctiveActionTypes: [],
        omissionReason: "",
        omissionExplanation: ""
      },
      gri407: {
        hasFreedomAssociationPolicies: "no",
        freedomAssociationDescription: "",
        responsible: "Human Resources",
        freedomAssociationActions: [],
        freedomAssociationMonitoring: [],
        assessedRisks: "no",
        risksIdentified: "no",
        operationRiskDetails: [{ operationSupplier: "", countryRegion: "", natureOfRisk: "", actionsTaken: "" }],
        addressingActions: [],
        omissionReason: "",
        omissionExplanation: ""
      },
      gri408: {
        hasChildLaborPolicies: "no",
        childLaborDescription: "",
        alignedStandards: [],
        responsible: "Human Resources",
        preventionActions: [],
        monitoring: [],
        assessedRisks: "no",
        totalSuppliers: 0,
        suppliersAssessed: 0,
        risksIdentified: "no",
        childLaborRiskDetails: [{ operationSupplier: "", countryRegion: "", typeOfRisk: "Child labor", category: "Own operations", actionsTaken: "" }],
        highRiskSuppliers: 0,
        riskClassificationBasis: [],
        addressingMeasures: [],
        suppliersWithActions: 0,
        omissionReason: "",
        omissionExplanation: ""
      },
      gri409: {
        hasForcedLaborPolicies: "no",
        forcedLaborDescription: "",
        alignedStandards: [],
        responsible: "Human Resources",
        preventionActions: [],
        monitoring: [],
        assessedRisks: "no",
        totalSuppliers: 0,
        suppliersAssessed: 0,
        risksIdentified: "no",
        forcedLaborRiskDetails: [{ operationSupplier: "", countryRegion: "", typeOfRiskIndicator: "Withholding of identity documents", category: "Own operations", actionsTaken: "" }],
        highRiskSuppliers: 0,
        riskClassificationBasis: [],
        addressingMeasures: [],
        suppliersWithActions: 0,
        omissionReason: "",
        omissionExplanation: ""
      },
      gri410: {
        hasSecurityPracticesPolicies: "no",
        securityPracticesDescription: "",
        alignedStandards: [],
        responsible: "Security department",
        preventionActions: [],
        monitoring: [],
        totalSecurityPersonnel: 0,
        securityPersonnelTrained: 0,
        includesThirdPartyPersonnel: "no",
        thirdPartyTrainingRequired: "no",
        thirdPartyTrainingDescription: "",
        trainingTypes: [],
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
  const { fields: trainingHoursFields, append: appendTrainingHours } = useFieldArray({ control, name: "gri404.trainingHoursData" });
  const { fields: reviewFields, append: appendReview } = useFieldArray({ control, name: "gri404.reviewData" });
  const { fields: governanceDiversityFields, append: appendGovernanceDiversity } = useFieldArray({ control, name: "gri405.governanceDiversityData" });
  const { fields: employeeDiversityFields, append: appendEmployeeDiversity } = useFieldArray({ control, name: "gri405.employeeDiversityData" });
  const { fields: payRatioFields, append: appendPayRatio } = useFieldArray({ control, name: "gri405.payRatioData" });
  const { fields: discriminationIncidentsFields, append: appendDiscriminationIncident } = useFieldArray({ control, name: "gri406.discriminationIncidents" });
  const { fields: operationRiskDetailsFields, append: appendOperationRiskDetail } = useFieldArray({ control, name: "gri407.operationRiskDetails" });
  const { fields: forcedLaborRiskDetailsFields, append: appendForcedLaborRiskDetail } = useFieldArray({ control, name: "gri409.forcedLaborRiskDetails" });
  const { fields: childLaborRiskDetailsFields, append: appendChildLaborRiskDetail } = useFieldArray({ control, name: "gri408.childLaborRiskDetails" });

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

  // Add useFieldArray for indigenous incidents
  const { fields: indigenousIncidentFields, append: appendIndigenousIncident } = useFieldArray({
    control,
    name: "gri411.incidentDetails",
  });


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
  //  Gri 402 Labor / Management Relations
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
        <h3 className="text-lg font-bold text-[#4639AA] mb-4 flex items-center gap-2">
          <Icon icon="mdi:clipboard-check" /> Occupational Health and Safety
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
          <Icon icon="mdi:clipboard-check" /> Occupational Health and Safety Management System
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

          <h3 className="text-lg font-bold text-[#4639AA] mb-6 flex items-center gap-2">
            <Icon icon="mdi:shield-check" /> Hazard Identification, Risk Assessment, and Incident Investigation
          </h3>

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

          <h3 className="text-lg font-bold text-[#4639AA] mb-6 flex items-center gap-2">
            <Icon icon="mdi:shield-check" /> Occupational Health Services
          </h3>

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

          <h3 className="text-lg font-bold text-[#4639AA] mb-6 flex items-center gap-2">
            <Icon icon="mdi:shield-check" /> Worker Participation, Consultation, and Communication on OHS
          </h3>

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
          <Icon icon="mdi:briefcase-check" /> Worker Training on OHS
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

          <h3 className="text-lg font-bold text-[#4639AA] mb-4 flex items-center gap-2">
            <Icon icon="mdi:briefcase-check" /> Promotion of Worker Health
          </h3>

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

          <h3 className="text-lg font-bold text-[#4639AA] mb-4 flex items-center gap-2">
            <Icon icon="mdi:briefcase-check" /> Prevention and Mitigation of OHS Impacts Directly Linked by Business Relationships
          </h3>

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
          <Icon icon="mdi:chart-line" /> Workers Covered by an OHS Management System
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

          <h3 className="text-lg font-bold text-[#4639AA] mb-4 flex items-center gap-2">
            <Icon icon="mdi:chart-line" /> Work-Related Injuries
          </h3>

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

          <h3 className="text-lg font-bold text-[#4639AA] mb-4 flex items-center gap-2">
            <Icon icon="mdi:chart-line" /> Work-Related Ill Health
          </h3>

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
  //  Gri 404 TRAINING AND EDUCATION
  const renderGRI404 = () => (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white p-3 rounded-md border border-gray-200">
        <h3 className="text-lg font-bold text-[#4639AA] mb-6 flex items-center gap-2">
          <Icon icon="mdi:book-open-variant" /> Training and Education
        </h3>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <InfoLabel
              label="Q1. Does the organization have policies or practices related to employee training and education?"
              info="Select Yes if your company has any system or usual way of training employees or improving their skills (formal or informal)."
            />
            <div className="flex gap-4">
              {["yes", "no"].map((opt) => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value={opt}
                    {...register("gri404.hasTrainingPolicies")}
                    className="w-4 h-4 text-[#4639AA] focus:ring-[#4639AA]"
                  />
                  <span className="capitalize text-sm text-gray-700">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {watch("gri404.hasTrainingPolicies") === "yes" && (
            <div>
              <InfoLabel
                label="Brief description of policies or practices"
                info="Briefly describe how your company provides training or learning opportunities to employees."
              />
              <textarea
                {...register("gri404.trainingDescription")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[120px]"
                placeholder="Describe training and education policies..."
              />
            </div>
          )}

          <div>
            <InfoLabel
              label="Q2. Who is responsible for managing training and education–related impacts?"
              info="Select the person or department responsible for employee training, learning, and skill development."
            />
            <select
              {...register("gri404.responsible")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
            >
              <option>Human Resources</option>
              <option>Learning & Development function</option>
              <option>Senior management</option>
              <option>Local management</option>
              <option>Sustainability team</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <InfoLabel
              label="Q3. What actions are taken to support employee training and development?"
              info="Select all types of training or development your company provides to employees."
            />
            <div className="flex flex-wrap gap-4">
              {["Technical skills training", "Leadership development programs", "Health, safety, or compliance training", "Digital or e-learning programs", "Tuition assistance or scholarships", "Other"].map((action) => (
                <label key={action} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={action}
                    {...register("gri404.developmentActions")}
                    className="w-4 h-4 text-[#4639AA]"
                  />
                  <span className="text-sm">{action}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <InfoLabel
              label="Q4. How does the organization monitor training and education performance?"
              info="Select how you track training activities, such as hours, systems, employee reviews, or feedback. Select 'Not monitored' if nothing is tracked."
            />
            <div className="flex flex-wrap gap-4">
              {["Training hours tracking", "Learning management systems (LMS)", "Employee performance reviews", "Employee feedback or surveys", "Not monitored"].map((method) => (
                <label key={method} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={method}
                    {...register("gri404.monitoring")}
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
          <Icon icon="mdi:chart-bar" /> Average Hours of Training per Year per Employee
        </h3>
        <div className="space-y-4">
          <div>
            <InfoLabel
              label="Q5. Does the organization track training hours provided to employees?"
              info="Select Yes if your company records how many hours of training employees receive."
            />
            <div className="flex gap-4">
              {["yes", "no"].map((opt) => (
                <label key={opt} className="flex items-center gap-2">
                  <input
                    type="radio"
                    value={opt}
                    {...register("gri404.tracksTrainingHours")}
                    className="w-4 h-4 text-[#4639AA]"
                  />
                  <span className="capitalize text-sm">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {watch("gri404.tracksTrainingHours") === "yes" && (
            <>
              <div>
                <InfoLabel
                  label="Q6. Provide average training hours per employee during the reporting period."
                  info="Enter average number of training hours per employee during the year, broken down by category and gender."
                />
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse border border-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="p-2 border border-gray-200">Employee category</th>
                        <th className="p-2 border border-gray-200">Gender</th>
                        <th className="p-2 border border-gray-200">Average training hours</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trainingHoursFields.map((item, idx) => (
                        <tr key={item.id}>
                          <td className="p-1 border border-gray-200">
                            <input
                              {...register(`gri404.trainingHoursData.${idx}.employeeCategory`)}
                              className="w-full p-1 border-none outline-none"
                              placeholder="e.g. Office staff"
                            />
                          </td>
                          <td className="p-1 border border-gray-200">
                            <select
                              {...register(`gri404.trainingHoursData.${idx}.gender`)}
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
                              {...register(`gri404.trainingHoursData.${idx}.averageTrainingHours`)}
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
                  onClick={() => appendTrainingHours({ employeeCategory: "", gender: "Male", averageTrainingHours: 0 })}
                  className="text-xs text-[#4639AA] font-bold"
                >
                  + Add Row
                </button>
              </div>
              <div>
                <InfoLabel
                  label="Q7. What methodology is used to calculate training hours?"
                  info="Select how you calculate training hours (e.g., system records, attendance sheets, or estimates)."
                />
                <select
                  {...register("gri404.trainingHoursMethodology")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
                >
                  <option>LMS data</option>
                  <option>HR records</option>
                  <option>Training attendance logs</option>
                  <option>Estimates</option>
                  <option>Other</option>
                </select>
              </div>
            </>
          )}

          {watch("gri404.tracksTrainingHours") === "no" && (
            <div className="mt-4 bg-[#4639AA]/5 border border-[#4639AA]/15 p-4 rounded-xl">
              <h4 className="text-sm font-bold text-[#4639AA] mb-3">Omission Logic (GRI 404-1)</h4>
              <p className="text-xs text-gray-600">Training hours are not tracked or not available.</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white p-3 rounded-md border border-gray-200">
        <h3 className="text-lg font-bold text-[#4639AA] mb-4 flex items-center gap-2">
          <Icon icon="mdi:account-cog" /> Programs for Upgrading Employee Skills and Transition Assistance Programs
        </h3>
        <div className="space-y-4">
          <div>
            <InfoLabel
              label="Q8. Are programs in place to upgrade employee skills?"
              info="Select Yes if your company provides programs to improve employee skills or help them grow in their careers."
            />
            <div className="flex gap-4">
              {["yes", "no"].map((opt) => (
                <label key={opt} className="flex items-center gap-2">
                  <input
                    type="radio"
                    value={opt}
                    {...register("gri404.hasSkillPrograms")}
                    className="w-4 h-4 text-[#4639AA]"
                  />
                  <span className="capitalize text-sm">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {watch("gri404.hasSkillPrograms") === "yes" && (
            <>
              <div>
                <InfoLabel
                  label="Q9. What types of skill development or transition programs are offered?"
                  info="Select all programs your company offers to improve skills or support employees in career changes."
                />
                <div className="flex flex-wrap gap-4">
                  {["Reskilling or upskilling programs", "Career development planning", "Mentoring or coaching", "Redeployment or transition support", "Retirement preparation programs", "Other"].map((program) => (
                    <label key={program} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        value={program}
                        {...register("gri404.skillPrograms")}
                        className="w-4 h-4 text-[#4639AA]"
                      />
                      <span className="text-sm">{program}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <InfoLabel
                  label="Q10. Describe how these programs support long-term employability."
                  info="Briefly explain how these programs help employees stay employable, improve skills, or grow in their careers."
                />
                <textarea
                  {...register("gri404.skillProgramsDescription")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[120px]"
                  placeholder="Describe the impact of skill development programs..."
                />
              </div>
            </>
          )}

          {watch("gri404.hasSkillPrograms") === "no" && (
            <div className="mt-4 bg-[#4639AA]/5 border border-[#4639AA]/15 p-4 rounded-xl">
              <h4 className="text-sm font-bold text-[#4639AA] mb-3">Not applicable (GRI 404-2)</h4>
              <p className="text-xs text-gray-600">No skill development programs are currently offered.</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white p-3 rounded-md border border-gray-200">
        <h3 className="text-lg font-bold text-[#4639AA] mb-4 flex items-center gap-2">
          <Icon icon="mdi:account-check" /> Percentage of Employees Receiving Regular Performance and Career Development Reviews
        </h3>
        <div className="space-y-4">
          <div>
            <InfoLabel
              label="Q11. Does the organization conduct regular performance and career development reviews?"
              info="Select Yes if employees are regularly evaluated on their performance and career progress."
            />
            <div className="flex gap-4">
              {["yes", "no"].map((opt) => (
                <label key={opt} className="flex items-center gap-2">
                  <input
                    type="radio"
                    value={opt}
                    {...register("gri404.conductsReviews")}
                    className="w-4 h-4 text-[#4639AA]"
                  />
                  <span className="capitalize text-sm">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {watch("gri404.conductsReviews") === "yes" && (
            <>
              <div>
                <InfoLabel
                  label="Q12. Provide data on employees receiving performance and career development reviews."
                  info="Enter percentage of employees who received performance or career reviews during the year."
                />
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse border border-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="p-2 border border-gray-200">Employee category</th>
                        <th className="p-2 border border-gray-200">Gender</th>
                        <th className="p-2 border border-gray-200">% receiving reviews</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reviewFields.map((item, idx) => (
                        <tr key={item.id}>
                          <td className="p-1 border border-gray-200">
                            <input
                              {...register(`gri404.reviewData.${idx}.employeeCategory`)}
                              className="w-full p-1 border-none outline-none"
                              placeholder="e.g. Operations"
                            />
                          </td>
                          <td className="p-1 border border-gray-200">
                            <select
                              {...register(`gri404.reviewData.${idx}.gender`)}
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
                              {...register(`gri404.reviewData.${idx}.reviewCoverage`)}
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
                  onClick={() => appendReview({ employeeCategory: "", gender: "Male", reviewCoverage: 0 })}
                  className="text-xs text-[#4639AA] font-bold"
                >
                  + Add Row
                </button>
              </div>
              <div>
                <InfoLabel
                  label="Q13. How often are performance and career development reviews conducted?"
                  info="Select how often employee performance reviews are done in your company."
                />
                <select
                  {...register("gri404.reviewFrequency")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
                >
                  <option>Annual</option>
                  <option>Biannual</option>
                  <option>Quarterly</option>
                  <option>Ad hoc</option>
                  <option>Other</option>
                </select>
              </div>
            </>
          )}

          {(watch("gri404.tracksTrainingHours") === "no" || watch("gri404.conductsReviews") === "no") && (
            <div className="mt-4 bg-[#4639AA]/5 border border-[#4639AA]/15 p-4 rounded-xl">
              <h4 className="text-sm font-bold text-[#4639AA] mb-3">Omission Logic (GRI 404)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <InfoLabel
                    label="Reason for omission"
                    info="If you cannot provide required data, select the closest reason."
                  />
                  <select
                    {...register("gri404.omissionReason")}
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
                    {...register("gri404.omissionExplanation")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[100px]"
                    placeholder="e.g. Training hours are not tracked in our current system..."
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
  //  Gri 405 DIVERSITY AND EQUAL OPPORTUNITY
  const renderGRI405 = () => (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white p-3 rounded-md border border-gray-200">
        <h3 className="text-lg font-bold text-[#4639AA] mb-6 flex items-center gap-2">
          <Icon icon="mdi:diversity" /> Diversity and Equal Opportunity
        </h3>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <InfoLabel
              label="Q1. Does the organization have policies or practices related to diversity and equal opportunity?"
              info="Select Yes if your company has any rules or practices to ensure fair treatment of all employees regardless of gender, age, or background."
            />
            <div className="flex gap-4">
              {["yes", "no"].map((opt) => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value={opt}
                    {...register("gri405.hasDiversityPolicies")}
                    className="w-4 h-4 text-[#4639AA] focus:ring-[#4639AA]"
                  />
                  <span className="capitalize text-sm text-gray-700">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {watch("gri405.hasDiversityPolicies") === "yes" && (
            <div>
              <InfoLabel
                label="Brief description of policies or practices"
                info="Briefly describe how your company promotes fairness and equal opportunities for all employees."
              />
              <textarea
                {...register("gri405.diversityDescription")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[120px]"
                placeholder="Describe diversity and equal opportunity policies..."
              />
            </div>
          )}

          <div>
            <InfoLabel
              label="Q2. Who is responsible for managing diversity and equal opportunity–related impacts?"
              info="Select the person or department responsible for fairness, diversity, and equal treatment of employees."
            />
            <select
              {...register("gri405.responsible")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
            >
              <option>Human Resources</option>
              <option>Senior management</option>
              <option>Diversity & inclusion function</option>
              <option>Sustainability team</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <InfoLabel
              label="Q3. What actions are taken to promote diversity and equal opportunity?"
              info="Select actions your company takes to ensure fair hiring, equal pay, and an inclusive workplace."
            />
            <div className="flex flex-wrap gap-4">
              {["Equal opportunity policies", "Diversity hiring initiatives", "Pay equity assessments", "Inclusion and awareness training", "Anti-discrimination measures", "Other"].map((action) => (
                <label key={action} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={action}
                    {...register("gri405.diversityActions")}
                    className="w-4 h-4 text-[#4639AA]"
                  />
                  <span className="text-sm">{action}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <InfoLabel
              label="Q4. How does the organization monitor diversity and equal opportunity performance?"
              info="Select how you track diversity and fairness, such as workforce data, pay comparisons, surveys, or audits. Select 'Not monitored' if nothing is tracked."
            />
            <div className="flex flex-wrap gap-4">
              {["Workforce diversity data analysis", "Pay equity analysis", "Employee surveys", "Internal audits", "Not monitored"].map((method) => (
                <label key={method} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={method}
                    {...register("gri405.diversityMonitoring")}
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
          <Icon icon="mdi:chart-bar" /> Diversity of Governance Bodies and Employees
        </h3>
        <div className="space-y-4">
          <div>
            <InfoLabel
              label="Q5. Does the organization track diversity data for governance bodies and employees?"
              info="Select Yes if your company records diversity data (e.g., gender, age) for management and employees."
            />
            <div className="flex gap-4">
              {["yes", "no"].map((opt) => (
                <label key={opt} className="flex items-center gap-2">
                  <input
                    type="radio"
                    value={opt}
                    {...register("gri405.tracksDiversityData")}
                    className="w-4 h-4 text-[#4639AA]"
                  />
                  <span className="capitalize text-sm">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {watch("gri405.tracksDiversityData") === "yes" && (
            <>
              <div>
                <InfoLabel
                  label="Q6. Provide diversity data for governance bodies."
                  info="Enter number of people in leadership (e.g., board, senior management) by gender and age group."
                />
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse border border-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="p-2 border border-gray-200">Governance level</th>
                        <th className="p-2 border border-gray-200">Gender</th>
                        <th className="p-2 border border-gray-200">Age group</th>
                        <th className="p-2 border border-gray-200">Number</th>
                      </tr>
                    </thead>
                    <tbody>
                      {governanceDiversityFields.map((item, idx) => (
                        <tr key={item.id}>
                          <td className="p-1 border border-gray-200">
                            <input
                              {...register(`gri405.governanceDiversityData.${idx}.governanceLevel`)}
                              className="w-full p-1 border-none outline-none"
                              placeholder="e.g. Board of Directors"
                            />
                          </td>
                          <td className="p-1 border border-gray-200">
                            <select
                              {...register(`gri405.governanceDiversityData.${idx}.gender`)}
                              className="w-full p-1 border-none outline-none bg-transparent"
                            >
                              <option>Male</option>
                              <option>Female</option>
                              <option>Other</option>
                            </select>
                          </td>
                          <td className="p-1 border border-gray-200">
                            <select
                              {...register(`gri405.governanceDiversityData.${idx}.ageGroup`)}
                              className="w-full p-1 border-none outline-none bg-transparent"
                            >
                              <option>Under 30</option>
                              <option>30-50</option>
                              <option>Over 50</option>
                            </select>
                          </td>
                          <td className="p-1 border border-gray-200">
                            <input
                              type="number"
                              {...register(`gri405.governanceDiversityData.${idx}.number`)}
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
                  onClick={() => appendGovernanceDiversity({ governanceLevel: "", gender: "Male", ageGroup: "30-50", number: 0 })}
                  className="text-xs text-[#4639AA] font-bold"
                >
                  + Add Row
                </button>
              </div>

              <div>
                <InfoLabel
                  label="Q7. Provide diversity data for employees."
                  info="Enter number of employees by category, gender, and age group."
                />
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse border border-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="p-2 border border-gray-200">Employee category</th>
                        <th className="p-2 border border-gray-200">Gender</th>
                        <th className="p-2 border border-gray-200">Age group</th>
                        <th className="p-2 border border-gray-200">Number</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employeeDiversityFields.map((item, idx) => (
                        <tr key={item.id}>
                          <td className="p-1 border border-gray-200">
                            <input
                              {...register(`gri405.employeeDiversityData.${idx}.employeeCategory`)}
                              className="w-full p-1 border-none outline-none"
                              placeholder="e.g. Office staff"
                            />
                          </td>
                          <td className="p-1 border border-gray-200">
                            <select
                              {...register(`gri405.employeeDiversityData.${idx}.gender`)}
                              className="w-full p-1 border-none outline-none bg-transparent"
                            >
                              <option>Male</option>
                              <option>Female</option>
                              <option>Other</option>
                            </select>
                          </td>
                          <td className="p-1 border border-gray-200">
                            <select
                              {...register(`gri405.employeeDiversityData.${idx}.ageGroup`)}
                              className="w-full p-1 border-none outline-none bg-transparent"
                            >
                              <option>Under 30</option>
                              <option>30-50</option>
                              <option>Over 50</option>
                            </select>
                          </td>
                          <td className="p-1 border border-gray-200">
                            <input
                              type="number"
                              {...register(`gri405.employeeDiversityData.${idx}.number`)}
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
                  onClick={() => appendEmployeeDiversity({ employeeCategory: "", gender: "Male", ageGroup: "30-50", number: 0 })}
                  className="text-xs text-[#4639AA] font-bold"
                >
                  + Add Row
                </button>
              </div>
            </>
          )}

          {watch("gri405.tracksDiversityData") === "no" && (
            <div className="mt-4 bg-[#4639AA]/5 border border-[#4639AA]/15 p-4 rounded-xl">
              <h4 className="text-sm font-bold text-[#4639AA] mb-3">Omission Logic (GRI 405-1)</h4>
              <p className="text-xs text-gray-600">Diversity data is not tracked or not available.</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white p-3 rounded-md border border-gray-200">
        <h3 className="text-lg font-bold text-[#4639AA] mb-4 flex items-center gap-2">
          <Icon icon="mdi:currency-usd" /> Ratio of Basic Salary and Remuneration of Women to Men
        </h3>
        <div className="space-y-4">
          <div>
            <InfoLabel
              label="Q8. Does the organization track gender pay ratios?"
              info="Select Yes if your company compares salaries of male and female employees."
            />
            <div className="flex gap-4">
              {["yes", "no"].map((opt) => (
                <label key={opt} className="flex items-center gap-2">
                  <input
                    type="radio"
                    value={opt}
                    {...register("gri405.tracksPayRatios")}
                    className="w-4 h-4 text-[#4639AA]"
                  />
                  <span className="capitalize text-sm">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {watch("gri405.tracksPayRatios") === "yes" && (
            <>
              <div>
                <InfoLabel
                  label="Q9. Provide remuneration ratio data by employee category."
                  info="Enter average salaries for female and male employees. System will calculate the ratio automatically."
                />
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse border border-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="p-2 border border-gray-200">Employee category</th>
                        <th className="p-2 border border-gray-200">Average female remuneration</th>
                        <th className="p-2 border border-gray-200">Average male remuneration</th>
                        <th className="p-2 border border-gray-200">Ratio (auto)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payRatioFields.map((item, idx) => {
                        const femaleRemun = Number(watch(`gri405.payRatioData.${idx}.averageFemaleRemuneration`)) || 0;
                        const maleRemun = Number(watch(`gri405.payRatioData.${idx}.averageMaleRemuneration`)) || 0;
                        const ratio = maleRemun > 0 ? (femaleRemun / maleRemun).toFixed(2) : "0.00";
                        return (
                          <tr key={item.id}>
                            <td className="p-1 border border-gray-200">
                              <input
                                {...register(`gri405.payRatioData.${idx}.employeeCategory`)}
                                className="w-full p-1 border-none outline-none"
                                placeholder="e.g. Management"
                              />
                            </td>
                            <td className="p-1 border border-gray-200">
                              <input
                                type="number"
                                {...register(`gri405.payRatioData.${idx}.averageFemaleRemuneration`)}
                                className="w-full p-1 border-none outline-none"
                                placeholder="0"
                              />
                            </td>
                            <td className="p-1 border border-gray-200">
                              <input
                                type="number"
                                {...register(`gri405.payRatioData.${idx}.averageMaleRemuneration`)}
                                className="w-full p-1 border-none outline-none"
                                placeholder="0"
                              />
                            </td>
                            <td className="p-2 border border-gray-200 font-bold bg-gray-50">
                              {ratio}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <button
                  type="button"
                  onClick={() => appendPayRatio({ employeeCategory: "", averageFemaleRemuneration: 0, averageMaleRemuneration: 0 })}
                  className="text-xs text-[#4639AA] font-bold"
                >
                  + Add Row
                </button>
              </div>

              <div>
                <InfoLabel
                  label="Q10. What methodology is used to calculate remuneration ratios?"
                  info="Select how you calculate salary comparisons (e.g., payroll data, surveys, or estimates)."
                />
                <select
                  {...register("gri405.payRatioMethodology")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
                >
                  <option>Payroll data analysis</option>
                  <option>Compensation surveys</option>
                  <option>Estimates</option>
                  <option>Other</option>
                </select>
              </div>
            </>
          )}

          {watch("gri405.tracksPayRatios") === "no" && (
            <div className="mt-4 bg-[#4639AA]/5 border border-[#4639AA]/15 p-4 rounded-xl">
              <h4 className="text-sm font-bold text-[#4639AA] mb-3">Omission Logic (GRI 405-2)</h4>
              <p className="text-xs text-gray-600">Gender pay ratio data is not tracked or not available.</p>
            </div>
          )}

          {(watch("gri405.tracksDiversityData") === "no" || watch("gri405.tracksPayRatios") === "no") && (
            <div className="mt-4 bg-[#4639AA]/5 border border-[#4639AA]/15 p-4 rounded-xl">
              <h4 className="text-sm font-bold text-[#4639AA] mb-3">Omission Logic (GRI 405)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <InfoLabel
                    label="Reason for omission"
                    info="If you cannot provide required data, select the closest reason."
                  />
                  <select
                    {...register("gri405.omissionReason")}
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
                    {...register("gri405.omissionExplanation")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[100px]"
                    placeholder="e.g. Diversity data collection system is being implemented..."
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
  //  Gri 406 NON-DISCRIMINATION
  const renderGRI406 = () => (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white p-3 rounded-md border border-gray-200">
        <h3 className="text-lg font-bold text-[#4639AA] mb-6 flex items-center gap-2">
          <Icon icon="mdi:shield-check" /> Non-Discrimination
        </h3>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <InfoLabel
              label="Q1. Does the organization have policies or practices related to preventing discrimination?"
              info="Select Yes if your company has rules or practices to prevent unfair treatment based on gender, age, religion, ethnicity, or other factors."
            />
            <div className="flex gap-4">
              {["yes", "no"].map((opt) => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value={opt}
                    {...register("gri406.hasNonDiscriminationPolicies")}
                    className="w-4 h-4 text-[#4639AA] focus:ring-[#4639AA]"
                  />
                  <span className="capitalize text-sm text-gray-700">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {watch("gri406.hasNonDiscriminationPolicies") === "yes" && (
            <div>
              <InfoLabel
                label="Brief description of policies or practices"
                info="Briefly describe how your company prevents discrimination and ensures fair treatment of employees."
              />
              <textarea
                {...register("gri406.discriminationDescription")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[120px]"
                placeholder="Describe non-discrimination policies..."
              />
            </div>
          )}

          <div>
            <InfoLabel
              label="Q2. Who is responsible for managing non-discrimination-related impacts?"
              info="Select the person or department responsible for handling discrimination issues and ensuring fair treatment."
            />
            <select
              {...register("gri406.responsible")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
            >
              <option>Human Resources</option>
              <option>Senior management</option>
              <option>Ethics or compliance function</option>
              <option>Sustainability team</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <InfoLabel
              label="Q3. What actions are taken to prevent discrimination in the workplace?"
              info="Select actions your company takes to prevent discrimination and promote fair behavior at work."
            />
            <div className="flex flex-wrap gap-4">
              {["Anti-discrimination policies", "Employee training and awareness", "Grievance and reporting mechanisms", "Disciplinary procedures", "Diversity and inclusion initiatives", "Other"].map((action) => (
                <label key={action} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={action}
                    {...register("gri406.preventionActions")}
                    className="w-4 h-4 text-[#4639AA]"
                  />
                  <span className="text-sm">{action}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <InfoLabel
              label="Q4. How does the organization monitor non-discrimination performance?"
              info="Select how you track discrimination issues, such as complaints, surveys, audits, or compliance checks. Select 'Not monitored' if nothing is tracked."
            />
            <div className="flex flex-wrap gap-4">
              {["Grievance tracking", "Employee surveys", "Internal audits", "Compliance reviews", "Not monitored"].map((method) => (
                <label key={method} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={method}
                    {...register("gri406.discriminationMonitoring")}
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
          <Icon icon="mdi:alert-circle" /> Incidents of Discrimination and Corrective Actions
        </h3>
        <div className="space-y-4">
          <div>
            <InfoLabel
              label="Q5. Does the organization record incidents of discrimination?"
              info="Select Yes if your company keeps records of discrimination complaints or incidents."
            />
            <div className="flex gap-4">
              {["yes", "no"].map((opt) => (
                <label key={opt} className="flex items-center gap-2">
                  <input
                    type="radio"
                    value={opt}
                    {...register("gri406.recordsIncidents")}
                    className="w-4 h-4 text-[#4639AA]"
                  />
                  <span className="capitalize text-sm">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {watch("gri406.recordsIncidents") === "yes" && (
            <>
              <div>
                <InfoLabel
                  label="Q6. Were any incidents of discrimination reported during the reporting period?"
                  info="Select Yes if any discrimination cases were reported during the year. Select No if none were reported."
                />
                <div className="flex gap-4">
                  {["yes", "no"].map((opt) => (
                    <label key={opt} className="flex items-center gap-2">
                      <input
                        type="radio"
                        value={opt}
                        {...register("gri406.incidentsReported")}
                        className="w-4 h-4 text-[#4639AA]"
                      />
                      <span className="capitalize text-sm">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              {watch("gri406.incidentsReported") === "yes" && (
                <>
                  <div>
                    <InfoLabel
                      label="Q7. Provide data on discrimination incidents and actions taken."
                      info="Enter types of discrimination cases, number of incidents, and what actions were taken to address them."
                    />
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left border-collapse border border-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="p-2 border border-gray-200">Type of discrimination</th>
                            <th className="p-2 border border-gray-200">Number of incidents</th>
                            <th className="p-2 border border-gray-200">Corrective actions taken</th>
                          </tr>
                        </thead>
                        <tbody>
                          {discriminationIncidentsFields.map((item, idx) => (
                            <tr key={item.id}>
                              <td className="p-1 border border-gray-200">
                                <input
                                  {...register(`gri406.discriminationIncidents.${idx}.discriminationType`)}
                                  className="w-full p-1 border-none outline-none"
                                  placeholder="e.g. Gender discrimination"
                                />
                              </td>
                              <td className="p-1 border border-gray-200">
                                <input
                                  type="number"
                                  {...register(`gri406.discriminationIncidents.${idx}.numberOfIncidents`)}
                                  className="w-full p-1 border-none outline-none"
                                  placeholder="0"
                                />
                              </td>
                              <td className="p-1 border border-gray-200">
                                <input
                                  {...register(`gri406.discriminationIncidents.${idx}.correctiveActions`)}
                                  className="w-full p-1 border-none outline-none"
                                  placeholder="e.g. Disciplinary action taken"
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <button
                      type="button"
                      onClick={() => appendDiscriminationIncident({ discriminationType: "", numberOfIncidents: 0, correctiveActions: "" })}
                      className="text-xs text-[#4639AA] font-bold"
                    >
                      + Add Row
                    </button>
                  </div>

                  <div>
                    <InfoLabel
                      label="Q8. What types of corrective actions are implemented?"
                      info="Select actions your company takes after a discrimination case (e.g., discipline, training, policy changes)."
                    />
                    <div className="flex flex-wrap gap-4">
                      {["Disciplinary action", "Policy updates", "Additional training", "Mediation or resolution processes", "Other"].map((action) => (
                        <label key={action} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            value={action}
                            {...register("gri406.correctiveActionTypes")}
                            className="w-4 h-4 text-[#4639AA]"
                          />
                          <span className="text-sm">{action}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {watch("gri406.incidentsReported") === "no" && (
                <div className="mt-4 bg-[#4639AA]/5 border border-[#4639AA]/15 p-4 rounded-xl">
                  <h4 className="text-sm font-bold text-[#4639AA] mb-3">No incidents reported</h4>
                  <p className="text-xs text-gray-600">Zero discrimination incidents were reported during the reporting period.</p>
                </div>
              )}
            </>
          )}

          {watch("gri406.recordsIncidents") === "no" && (
            <div className="mt-4 bg-[#4639AA]/5 border border-[#4639AA]/15 p-4 rounded-xl">
              <h4 className="text-sm font-bold text-[#4639AA] mb-3">Omission Logic (GRI 406-1)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <InfoLabel
                    label="Reason for omission"
                    info="If you cannot provide required data, select the closest reason."
                  />
                  <select
                    {...register("gri406.omissionReason")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
                  >
                    <option value="">Select reason</option>
                    <option value="Incidents not tracked">Incidents not tracked</option>
                    <option value="Reporting system not in place">Reporting system not in place</option>
                    <option value="Confidentiality concerns">Confidentiality concerns</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <InfoLabel
                    label="Explanation (mandatory)"
                    info="Provide a brief explanation why the data is omitted."
                  />
                  <textarea
                    {...register("gri406.omissionExplanation")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[100px]"
                    placeholder="e.g. Incident tracking system is under development..."
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
  //  Gri 407 FREEDOM OF ASSOCIATION AND COLLECTIVE BARGAINING
  const renderGRI407 = () => (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white p-3 rounded-md border border-gray-200">
        <h3 className="text-lg font-bold text-[#4639AA] mb-6 flex items-center gap-2">
          <Icon icon="mdi:handshake" /> Freedom of Association and Collective Bargaining
        </h3>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <InfoLabel
              label="Q1. Does the organization have policies or practices supporting freedom of association and collective bargaining?"
              info="Select Yes if your company allows employees to join unions or groups and discuss working conditions with management."
            />
            <div className="flex gap-4">
              {["yes", "no"].map((opt) => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value={opt}
                    {...register("gri407.hasFreedomAssociationPolicies")}
                    className="w-4 h-4 text-[#4639AA] focus:ring-[#4639AA]"
                  />
                  <span className="capitalize text-sm text-gray-700">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {watch("gri407.hasFreedomAssociationPolicies") === "yes" && (
            <div>
              <InfoLabel
                label="Brief description of policies or practices"
                info="Briefly describe how your company supports employee rights to join groups or unions and discuss workplace matters."
              />
              <textarea
                {...register("gri407.freedomAssociationDescription")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[120px]"
                placeholder="Describe freedom of association policies..."
              />
            </div>
          )}

          <div>
            <InfoLabel
              label="Q2. Who is responsible for managing freedom of association–related impacts?"
              info="Select the person or department responsible for handling employee rights, unions, and labor-related issues."
            />
            <select
              {...register("gri407.responsible")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
            >
              <option>Human Resources</option>
              <option>Senior management</option>
              <option>Legal or compliance function</option>
              <option>Employee relations function</option>
              <option>Sustainability team</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <InfoLabel
              label="Q3. What actions are taken to respect freedom of association and collective bargaining?"
              info="Select actions your company takes to support employee rights to organize, join unions, and discuss working conditions."
            />
            <div className="flex flex-wrap gap-4">
              {["Policy commitments aligned with international standards", "Engagement with trade unions", "Worker awareness and training", "Supplier requirements on labor rights", "Grievance and remediation mechanisms", "Other"].map((action) => (
                <label key={action} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={action}
                    {...register("gri407.freedomAssociationActions")}
                    className="w-4 h-4 text-[#4639AA]"
                  />
                  <span className="text-sm">{action}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <InfoLabel
              label="Q4. How does the organization monitor compliance with freedom of association commitments?"
              info="Select how you check that employee rights are being respected (e.g., audits, feedback, complaints, supplier checks). Select 'Not monitored' if nothing is tracked."
            />
            <div className="flex flex-wrap gap-4">
              {["Internal audits", "Worker or union feedback", "Grievance tracking", "Supplier assessments", "Not monitored"].map((method) => (
                <label key={method} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={method}
                    {...register("gri407.freedomAssociationMonitoring")}
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
          <Icon icon="mdi:alert-circle" /> Operations and Suppliers in Which the Right to Freedom of Association and Collective Bargaining May Be at Risk
        </h3>
        <div className="space-y-4">
          <div>
            <InfoLabel
              label="Q5. Has the organization assessed operations and suppliers for risks related to freedom of association and collective bargaining?"
              info="Select Yes if your company checks whether employees or suppliers may face restrictions in joining unions or raising concerns."
            />
            <div className="flex gap-4">
              {["yes", "no"].map((opt) => (
                <label key={opt} className="flex items-center gap-2">
                  <input
                    type="radio"
                    value={opt}
                    {...register("gri407.assessedRisks")}
                    className="w-4 h-4 text-[#4639AA]"
                  />
                  <span className="capitalize text-sm">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {watch("gri407.assessedRisks") === "yes" && (
            <>
              <div>
                <InfoLabel
                  label="Q6. Were any operations or suppliers identified where these rights may be at risk?"
                  info="Select Yes if any locations or suppliers were found where employee rights may not be fully respected."
                />
                <div className="flex gap-4">
                  {["yes", "no"].map((opt) => (
                    <label key={opt} className="flex items-center gap-2">
                      <input
                        type="radio"
                        value={opt}
                        {...register("gri407.risksIdentified")}
                        className="w-4 h-4 text-[#4639AA]"
                      />
                      <span className="capitalize text-sm">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              {watch("gri407.risksIdentified") === "yes" && (
                <>
                  <div>
                    <InfoLabel
                      label="Q7. Provide details of operations or suppliers where risks were identified."
                      info="Enter details of locations or suppliers where risks were found, what the risk is, and what actions were taken."
                    />
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left border-collapse border border-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="p-2 border border-gray-200">Operation / Supplier</th>
                            <th className="p-2 border border-gray-200">Country / Region</th>
                            <th className="p-2 border border-gray-200">Nature of risk</th>
                            <th className="p-2 border border-gray-200">Actions taken</th>
                          </tr>
                        </thead>
                        <tbody>
                          {operationRiskDetailsFields.map((item, idx) => (
                            <tr key={item.id}>
                              <td className="p-1 border border-gray-200">
                                <input
                                  {...register(`gri407.operationRiskDetails.${idx}.operationSupplier`)}
                                  className="w-full p-1 border-none outline-none"
                                  placeholder="e.g. Factory A, Supplier XYZ"
                                />
                              </td>
                              <td className="p-1 border border-gray-200">
                                <input
                                  {...register(`gri407.operationRiskDetails.${idx}.countryRegion`)}
                                  className="w-full p-1 border-none outline-none"
                                  placeholder="e.g. Vietnam, South Asia"
                                />
                              </td>
                              <td className="p-1 border border-gray-200">
                                <input
                                  {...register(`gri407.operationRiskDetails.${idx}.natureOfRisk`)}
                                  className="w-full p-1 border-none outline-none"
                                  placeholder="e.g. Restrictions on union membership"
                                />
                              </td>
                              <td className="p-1 border border-gray-200">
                                <input
                                  {...register(`gri407.operationRiskDetails.${idx}.actionsTaken`)}
                                  className="w-full p-1 border-none outline-none"
                                  placeholder="e.g. Engagement with supplier"
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <button
                      type="button"
                      onClick={() => appendOperationRiskDetail({ operationSupplier: "", countryRegion: "", natureOfRisk: "", actionsTaken: "" })}
                      className="text-xs text-[#4639AA] font-bold"
                    >
                      + Add Row
                    </button>
                  </div>

                  <div>
                    <InfoLabel
                      label="Q8. What actions are taken to address identified risks?"
                      info="Select actions your company takes to fix or reduce these risks (e.g., working with suppliers, training, or ending relationships)."
                    />
                    <div className="flex flex-wrap gap-4">
                      {["Engagement with management or suppliers", "Contractual requirements", "Corrective action plans", "Capacity-building or training", "Termination of relationship", "Other"].map((action) => (
                        <label key={action} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            value={action}
                            {...register("gri407.addressingActions")}
                            className="w-4 h-4 text-[#4639AA]"
                          />
                          <span className="text-sm">{action}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {watch("gri407.risksIdentified") === "no" && (
                <div className="mt-4 bg-[#4639AA]/5 border border-[#4639AA]/15 p-4 rounded-xl">
                  <h4 className="text-sm font-bold text-[#4639AA] mb-3">No risks identified</h4>
                  <p className="text-xs text-gray-600">No operations or suppliers were identified where freedom of association rights may be at risk.</p>
                </div>
              )}
            </>
          )}

          {watch("gri407.assessedRisks") === "no" && (
            <div className="mt-4 bg-[#4639AA]/5 border border-[#4639AA]/15 p-4 rounded-xl">
              <h4 className="text-sm font-bold text-[#4639AA] mb-3">Omission Logic (GRI 407-1)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <InfoLabel
                    label="Reason for omission"
                    info="If you cannot provide required data, select the closest reason."
                  />
                  <select
                    {...register("gri407.omissionReason")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
                  >
                    <option value="">Select reason</option>
                    <option value="Risk assessments not conducted">Risk assessments not conducted</option>
                    <option value="Data not tracked">Data not tracked</option>
                    <option value="Systems not in place">Systems not in place</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <InfoLabel
                    label="Explanation (mandatory)"
                    info="Provide a brief explanation why the data is omitted."
                  />
                  <textarea
                    {...register("gri407.omissionExplanation")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[100px]"
                    placeholder="e.g. Risk assessment process is being developed..."
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
  //  Gri 408 CHILD LABOR
  const renderGRI408 = () => (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white p-3 rounded-md border border-gray-200">
        <h3 className="text-lg font-bold text-[#4639AA] mb-6 flex items-center gap-2">
          <Icon icon="mdi:child" /> Child Labor
        </h3>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <InfoLabel
              label="Q1. Does the organization have policies or commitments prohibiting child labor?"
              info="Select Yes if your company has rules or commitments to not employ children below the legal working age."
            />
            <div className="flex gap-4">
              {["yes", "no"].map((opt) => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value={opt}
                    {...register("gri408.hasChildLaborPolicies")}
                    className="w-4 h-4 text-[#4639AA] focus:ring-[#4639AA]"
                  />
                  <span className="capitalize text-sm text-gray-700">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {watch("gri408.hasChildLaborPolicies") === "yes" && (
            <>
              <div>
                <InfoLabel
                  label="Brief description of policies or commitments"
                  info="Briefly describe your company's rules to prevent child labor (e.g., following laws, supplier rules, or international standards)."
                />
                <textarea
                  {...register("gri408.childLaborDescription")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[120px]"
                  placeholder="Describe child labor policies..."
                />
              </div>

              <div>
                <InfoLabel
                  label="Q2. Which standards or frameworks are these policies aligned with?"
                  info="Select the standards or laws your company follows to prevent child labor."
                />
                <div className="flex flex-wrap gap-4">
                  {["ILO Convention 138 (Minimum Age)", "ILO Convention 182 (Worst Forms of Child Labour)", "OECD Guidelines for Multinational Enterprises", "UN Global Compact", "National labor laws", "Other"].map((standard) => (
                    <label key={standard} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        value={standard}
                        {...register("gri408.alignedStandards")}
                        className="w-4 h-4 text-[#4639AA]"
                      />
                      <span className="text-sm">{standard}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          <div>
            <InfoLabel
              label="Q3. Who is responsible for managing child labor–related risks?"
              info="Select the person or department responsible for preventing child labor in your company and supply chain."
            />
            <select
              {...register("gri408.responsible")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
            >
              <option>Human Resources</option>
              <option>Compliance / Legal team</option>
              <option>Supply chain / Procurement team</option>
              <option>Sustainability team</option>
              <option>Senior management</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <InfoLabel
              label="Q4. What actions are taken to prevent child labor?"
              info="Select actions your company takes to ensure no child labor is used (e.g., checking age, supplier rules, audits)."
            />
            <div className="flex flex-wrap gap-4">
              {["Supplier code of conduct enforcement", "Age verification systems", "Worker documentation checks", "Supplier audits and inspections", "Training and awareness programs", "Contractual clauses prohibiting child labor", "Remediation and rehabilitation programs", "Other"].map((action) => (
                <label key={action} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={action}
                    {...register("gri408.preventionActions")}
                    className="w-4 h-4 text-[#4639AA]"
                  />
                  <span className="text-sm">{action}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <InfoLabel
              label="Q5. How does the organization monitor compliance with child labor policies?"
              info="Select how you check that child labor rules are being followed (e.g., audits, supplier checks, complaints system). Select 'Not monitored' if nothing is tracked."
            />
            <div className="flex flex-wrap gap-4">
              {["Internal audits", "Third-party audits", "Supplier assessments", "Worker grievance mechanisms", "Collaboration with NGOs or external bodies", "Not monitored"].map((method) => (
                <label key={method} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={method}
                    {...register("gri408.monitoring")}
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
          <Icon icon="mdi:alert-circle" /> Operations and Suppliers at Significant Risk for Incidents of Child Labor
        </h3>
        <div className="space-y-4">
          <div>
            <InfoLabel
              label="Q6. Has the organization assessed operations and suppliers for child labor risk?"
              info="Select Yes if your company checks its operations and suppliers for risk of child labor."
            />
            <div className="flex gap-4">
              {["yes", "no"].map((opt) => (
                <label key={opt} className="flex items-center gap-2">
                  <input
                    type="radio"
                    value={opt}
                    {...register("gri408.assessedRisks")}
                    className="w-4 h-4 text-[#4639AA]"
                  />
                  <span className="capitalize text-sm">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {watch("gri408.assessedRisks") === "yes" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <InfoLabel
                    label="Q7. Enter total number of suppliers"
                    info="Enter total number of suppliers your company works with during the reporting period."
                  />
                  <input
                    type="number"
                    {...register("gri408.totalSuppliers")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]"
                    placeholder="0"
                    min="0"
                  />
                </div>
                <div>
                  <InfoLabel
                    label="Q8. Enter number of suppliers assessed for child labor risk"
                    info="Enter how many of your suppliers were checked for child labor risk."
                  />
                  <input
                    type="number"
                    {...register("gri408.suppliersAssessed")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]"
                    placeholder="0"
                    min="0"
                  />
                  {watch("gri408.totalSuppliers") > 0 && (
                    <p className="text-xs text-gray-600 mt-1">
                      % of suppliers assessed: {((watch("gri408.suppliersAssessed") / watch("gri408.totalSuppliers")) * 100).toFixed(1)}%
                      {((watch("gri408.suppliersAssessed") / watch("gri408.totalSuppliers")) * 100) < 50 && (
                        <span className="text-red-500 ml-2">⚠ Low risk coverage</span>
                      )}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <InfoLabel
                  label="Q9. Were any operations or suppliers identified with significant risk?"
                  info="Select Yes if any supplier or operation was found to have a high risk of child labor."
                />
                <div className="flex gap-4">
                  {["yes", "no"].map((opt) => (
                    <label key={opt} className="flex items-center gap-2">
                      <input
                        type="radio"
                        value={opt}
                        {...register("gri408.risksIdentified")}
                        className="w-4 h-4 text-[#4639AA]"
                      />
                      <span className="capitalize text-sm">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              {watch("gri408.risksIdentified") === "yes" && (
                <>
                  <div>
                    <InfoLabel
                      label="Q10. Provide details of operations and suppliers at significant risk"
                      info="Enter details of suppliers or operations where child labor risk was found, including location, type of risk, and actions taken."
                    />
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left border-collapse border border-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="p-2 border border-gray-200">Operation / Supplier</th>
                            <th className="p-2 border border-gray-200">Country / Region</th>
                            <th className="p-2 border border-gray-200">Type of Risk</th>
                            <th className="p-2 border border-gray-200">Category</th>
                            <th className="p-2 border border-gray-200">Actions Taken</th>
                          </tr>
                        </thead>
                        <tbody>
                          {childLaborRiskDetailsFields.map((item, idx) => (
                            <tr key={item.id}>
                              <td className="p-1 border border-gray-200">
                                <input
                                  {...register(`gri408.childLaborRiskDetails.${idx}.operationSupplier`)}
                                  className="w-full p-1 border-none outline-none"
                                  placeholder="e.g. Factory A, Supplier XYZ"
                                />
                              </td>
                              <td className="p-1 border border-gray-200">
                                <input
                                  {...register(`gri408.childLaborRiskDetails.${idx}.countryRegion`)}
                                  className="w-full p-1 border-none outline-none"
                                  placeholder="e.g. Vietnam, South Asia"
                                />
                              </td>
                              <td className="p-1 border border-gray-200">
                                <select
                                  {...register(`gri408.childLaborRiskDetails.${idx}.typeOfRisk`)}
                                  className="w-full p-1 border-none outline-none bg-transparent"
                                >
                                  <option>Child labor</option>
                                  <option>Young workers in hazardous work</option>
                                </select>
                              </td>
                              <td className="p-1 border border-gray-200">
                                <select
                                  {...register(`gri408.childLaborRiskDetails.${idx}.category`)}
                                  className="w-full p-1 border-none outline-none bg-transparent"
                                >
                                  <option>Own operations</option>
                                  <option>Tier 1 supplier</option>
                                  <option>Tier 2+ supplier</option>
                                </select>
                              </td>
                              <td className="p-1 border border-gray-200">
                                <input
                                  {...register(`gri408.childLaborRiskDetails.${idx}.actionsTaken`)}
                                  className="w-full p-1 border-none outline-none"
                                  placeholder="e.g. Supplier engagement"
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <button
                      type="button"
                      onClick={() => appendChildLaborRiskDetail({ operationSupplier: "", countryRegion: "", typeOfRisk: "Child labor", category: "Own operations", actionsTaken: "" })}
                      className="text-xs text-[#4639AA] font-bold"
                    >
                      + Add Row
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <InfoLabel
                        label="Q11. Enter number of high-risk suppliers identified"
                        info="Enter total number of suppliers identified as high risk for child labor."
                      />
                      <input
                        type="number"
                        {...register("gri408.highRiskSuppliers")}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]"
                        placeholder="0"
                        min="0"
                      />
                      {watch("gri408.suppliersAssessed") > 0 && (
                        <p className="text-xs text-gray-600 mt-1">
                          % of high-risk suppliers: {((watch("gri408.highRiskSuppliers") / watch("gri408.suppliersAssessed")) * 100).toFixed(1)}%
                        </p>
                      )}
                    </div>
                    <div>
                      <InfoLabel
                        label="Q14. Enter number of high-risk suppliers where actions were taken"
                        info="Enter number of high-risk suppliers where your company took action."
                      />
                      <input
                        type="number"
                        {...register("gri408.suppliersWithActions")}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]"
                        placeholder="0"
                        min="0"
                      />
                      {watch("gri408.highRiskSuppliers") > 0 && (
                        <p className="text-xs text-gray-600 mt-1">
                          % of high-risk suppliers with action taken: {((watch("gri408.suppliersWithActions") / watch("gri408.highRiskSuppliers")) * 100).toFixed(1)}%
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <InfoLabel
                      label="Q12. Identify basis for risk classification"
                      info="Select how you identified the risk (e.g., industry type, country risk, past issues, or external reports)."
                    />
                    <div className="flex flex-wrap gap-4">
                      {["Industry/sector risk (e.g., manufacturing, agriculture)", "Geographic risk (high-risk countries/regions)", "Supplier screening results", "Past incidents", "External data sources (ILO, OECD, NGO reports)", "Other"].map((basis) => (
                        <label key={basis} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            value={basis}
                            {...register("gri408.riskClassificationBasis")}
                            className="w-4 h-4 text-[#4639AA]"
                          />
                          <span className="text-sm">{basis}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <InfoLabel
                      label="Q13. What measures were taken to address and eliminate child labor risks?"
                      info="Select actions taken to reduce or eliminate child labor risk (e.g., working with suppliers, training, ending contracts)."
                    />
                    <div className="flex flex-wrap gap-4">
                      {["Supplier engagement and corrective actions", "Contract termination with non-compliant suppliers", "Capacity-building and supplier training", "Collaboration with industry initiatives", "Community or education programs", "Remediation support for affected children", "Other"].map((measure) => (
                        <label key={measure} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            value={measure}
                            {...register("gri408.addressingMeasures")}
                            className="w-4 h-4 text-[#4639AA]"
                          />
                          <span className="text-sm">{measure}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {watch("gri408.risksIdentified") === "no" && (
                <div className="mt-4 bg-[#4639AA]/5 border border-[#4639AA]/15 p-4 rounded-xl">
                  <h4 className="text-sm font-bold text-[#4639AA] mb-3">No significant risks identified</h4>
                  <p className="text-xs text-gray-600">No operations or suppliers were identified with significant risk for incidents of child labor.</p>
                </div>
              )}
            </>
          )}

          {watch("gri408.assessedRisks") === "no" && (
            <div className="mt-4 bg-[#4639AA]/5 border border-[#4639AA]/15 p-4 rounded-xl">
              <h4 className="text-sm font-bold text-[#4639AA] mb-3">Omission Logic (GRI 408-1)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <InfoLabel
                    label="Reason for omission"
                    info="If you cannot provide required data, select the closest reason."
                  />
                  <select
                    {...register("gri408.omissionReason")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
                  >
                    <option value="">Select reason</option>
                    <option value="Risk assessments not conducted">Risk assessments not conducted</option>
                    <option value="Supplier data not available">Supplier data not available</option>
                    <option value="Systems not in place">Systems not in place</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <InfoLabel
                    label="Explanation (mandatory)"
                    info="Provide a brief explanation why the data is omitted."
                  />
                  <textarea
                    {...register("gri408.omissionExplanation")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[100px]"
                    placeholder="e.g. Child labor risk assessment is being implemented..."
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
  //  Gri 409 FORCED OR COMPULSORY LABOR
  const renderGRI409 = () => (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white p-3 rounded-md border border-gray-200">
        <h3 className="text-lg font-bold text-[#4639AA] mb-6 flex items-center gap-2">
          <Icon icon="mdi:handcuffs" /> Forced or Compulsory Labor
        </h3>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <InfoLabel
              label="Q1. Does the organization have policies prohibiting forced or compulsory labor?"
              info="Select Yes if your company has rules to prevent forced work, such as bonded labor, human trafficking, or holding employee documents."
            />
            <div className="flex gap-4">
              {["yes", "no"].map((opt) => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value={opt}
                    {...register("gri409.hasForcedLaborPolicies")}
                    className="w-4 h-4 text-[#4639AA] focus:ring-[#4639AA]"
                  />
                  <span className="capitalize text-sm text-gray-700">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {watch("gri409.hasForcedLaborPolicies") === "yes" && (
            <>
              <div>
                <InfoLabel
                  label="Brief description of policies or commitments"
                  info="Briefly describe your company's rules to ensure workers are not forced to work and are free to leave their job."
                />
                <textarea
                  {...register("gri409.forcedLaborDescription")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[120px]"
                  placeholder="Describe forced labor policies..."
                />
              </div>

              <div>
                <InfoLabel
                  label="Q2. Which standards or frameworks are these policies aligned with?"
                  info="Select the international standards or laws your company follows to prevent forced labor."
                />
                <div className="flex flex-wrap gap-4">
                  {["ILO Forced Labour Convention (No. 29)", "ILO Abolition of Forced Labour Convention (No. 105)", "OECD Guidelines for Multinational Enterprises", "UN Guiding Principles on Business and Human Rights", "National labor laws", "Other"].map((standard) => (
                    <label key={standard} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        value={standard}
                        {...register("gri409.alignedStandards")}
                        className="w-4 h-4 text-[#4639AA]"
                      />
                      <span className="text-sm">{standard}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          <div>
            <InfoLabel
              label="Q3. Who is responsible for managing forced labor–related risks?"
              info="Select the person or department responsible for preventing forced labor in your company and supply chain."
            />
            <select
              {...register("gri409.responsible")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
            >
              <option>Human Resources</option>
              <option>Compliance / Legal team</option>
              <option>Supply chain / Procurement team</option>
              <option>Sustainability team</option>
              <option>Senior management</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <InfoLabel
              label="Q4. What actions are taken to prevent forced or compulsory labor?"
              info="Select actions your company takes to ensure workers are not forced to work (e.g., no recruitment fees, fair contracts, audits)."
            />
            <div className="flex flex-wrap gap-4">
              {["Supplier code of conduct enforcement", "Prohibition of recruitment fees", "No retention of worker identity documents", "Worker contracts in local language", "Ethical recruitment practices", "Supplier audits and inspections", "Worker awareness and training", "Grievance and remediation mechanisms", "Other"].map((action) => (
                <label key={action} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={action}
                    {...register("gri409.preventionActions")}
                    className="w-4 h-4 text-[#4639AA]"
                  />
                  <span className="text-sm">{action}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <InfoLabel
              label="Q5. How does the organization monitor compliance with forced labor policies?"
              info="Select how you check that forced labor rules are followed (e.g., audits, worker interviews, complaints system). Select 'Not monitored' if nothing is tracked."
            />
            <div className="flex flex-wrap gap-4">
              {["Internal audits", "Third-party audits", "Supplier assessments", "Worker interviews", "Grievance mechanisms", "Collaboration with NGOs or external bodies", "Not monitored"].map((method) => (
                <label key={method} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={method}
                    {...register("gri409.monitoring")}
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
          <Icon icon="mdi:alert-circle" /> Operations and Suppliers at Significant Risk for Forced or Compulsory Labor
        </h3>
        <div className="space-y-4">
          <div>
            <InfoLabel
              label="Q6. Has the organization assessed operations and suppliers for forced labor risk?"
              info="Select Yes if your company checks its operations and suppliers for risk of forced labor."
            />
            <div className="flex gap-4">
              {["yes", "no"].map((opt) => (
                <label key={opt} className="flex items-center gap-2">
                  <input
                    type="radio"
                    value={opt}
                    {...register("gri409.assessedRisks")}
                    className="w-4 h-4 text-[#4639AA]"
                  />
                  <span className="capitalize text-sm">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {watch("gri409.assessedRisks") === "yes" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <InfoLabel
                    label="Q7. Enter total number of suppliers"
                    info="Enter total number of suppliers your company works with during the reporting period."
                  />
                  <input
                    type="number"
                    {...register("gri409.totalSuppliers")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]"
                    placeholder="0"
                    min="0"
                  />
                </div>
                <div>
                  <InfoLabel
                    label="Q8. Enter number of suppliers assessed for forced labor risk"
                    info="Enter how many of your suppliers were checked for forced labor risk."
                  />
                  <input
                    type="number"
                    {...register("gri409.suppliersAssessed")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]"
                    placeholder="0"
                    min="0"
                  />
                  {watch("gri409.totalSuppliers") > 0 && (
                    <p className="text-xs text-gray-600 mt-1">
                      % of suppliers assessed: {((watch("gri409.suppliersAssessed") / watch("gri409.totalSuppliers")) * 100).toFixed(1)}%
                      {((watch("gri409.suppliersAssessed") / watch("gri409.totalSuppliers")) * 100) < 50 && (
                        <span className="text-red-500 ml-2">⚠ Low risk coverage</span>
                      )}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <InfoLabel
                  label="Q9. Were any operations or suppliers identified with significant risk?"
                  info="Select Yes if any supplier or operation was found to have a high risk of forced labor."
                />
                <div className="flex gap-4">
                  {["yes", "no"].map((opt) => (
                    <label key={opt} className="flex items-center gap-2">
                      <input
                        type="radio"
                        value={opt}
                        {...register("gri409.risksIdentified")}
                        className="w-4 h-4 text-[#4639AA]"
                      />
                      <span className="capitalize text-sm">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              {watch("gri409.risksIdentified") === "yes" && (
                <>
                  <div>
                    <InfoLabel
                      label="Q10. Provide details of operations and suppliers at significant risk"
                      info="Enter details of suppliers or operations where forced labor risk was found, including location, type of issue, and actions taken."
                    />
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left border-collapse border border-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="p-2 border border-gray-200">Operation / Supplier</th>
                            <th className="p-2 border border-gray-200">Country / Region</th>
                            <th className="p-2 border border-gray-200">Type of Risk Indicator</th>
                            <th className="p-2 border border-gray-200">Category</th>
                            <th className="p-2 border border-gray-200">Actions Taken</th>
                          </tr>
                        </thead>
                        <tbody>
                          {forcedLaborRiskDetailsFields.map((item, idx) => (
                            <tr key={item.id}>
                              <td className="p-1 border border-gray-200">
                                <input
                                  {...register(`gri409.forcedLaborRiskDetails.${idx}.operationSupplier`)}
                                  className="w-full p-1 border-none outline-none"
                                  placeholder="e.g. Factory A, Supplier XYZ"
                                />
                              </td>
                              <td className="p-1 border border-gray-200">
                                <input
                                  {...register(`gri409.forcedLaborRiskDetails.${idx}.countryRegion`)}
                                  className="w-full p-1 border-none outline-none"
                                  placeholder="e.g. Vietnam, South Asia"
                                />
                              </td>
                              <td className="p-1 border border-gray-200">
                                <select
                                  {...register(`gri409.forcedLaborRiskDetails.${idx}.typeOfRiskIndicator`)}
                                  className="w-full p-1 border-none outline-none bg-transparent"
                                >
                                  <option>Withholding of identity documents</option>
                                  <option>Recruitment fees / debt bondage</option>
                                  <option>Forced overtime</option>
                                  <option>Restricted movement</option>
                                  <option>Threats or coercion</option>
                                  <option>Other</option>
                                </select>
                              </td>
                              <td className="p-1 border border-gray-200">
                                <select
                                  {...register(`gri409.forcedLaborRiskDetails.${idx}.category`)}
                                  className="w-full p-1 border-none outline-none bg-transparent"
                                >
                                  <option>Own operations</option>
                                  <option>Tier 1 supplier</option>
                                  <option>Tier 2+ supplier</option>
                                </select>
                              </td>
                              <td className="p-1 border border-gray-200">
                                <input
                                  {...register(`gri409.forcedLaborRiskDetails.${idx}.actionsTaken`)}
                                  className="w-full p-1 border-none outline-none"
                                  placeholder="e.g. Supplier engagement"
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <button
                      type="button"
                      onClick={() => appendForcedLaborRiskDetail({ operationSupplier: "", countryRegion: "", typeOfRiskIndicator: "Withholding of identity documents", category: "Own operations", actionsTaken: "" })}
                      className="text-xs text-[#4639AA] font-bold"
                    >
                      + Add Row
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <InfoLabel
                        label="Q11. Enter number of high-risk suppliers identified"
                        info="Enter total number of suppliers identified as high risk for forced labor."
                      />
                      <input
                        type="number"
                        {...register("gri409.highRiskSuppliers")}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]"
                        placeholder="0"
                        min="0"
                      />
                      {watch("gri409.suppliersAssessed") > 0 && (
                        <p className="text-xs text-gray-600 mt-1">
                          % of high-risk suppliers: {((watch("gri409.highRiskSuppliers") / watch("gri409.suppliersAssessed")) * 100).toFixed(1)}%
                        </p>
                      )}
                    </div>
                    <div>
                      <InfoLabel
                        label="Q14. Enter number of high-risk suppliers where actions were taken"
                        info="Enter number of high-risk suppliers where your company took action."
                      />
                      <input
                        type="number"
                        {...register("gri409.suppliersWithActions")}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]"
                        placeholder="0"
                        min="0"
                      />
                      {watch("gri409.highRiskSuppliers") > 0 && (
                        <p className="text-xs text-gray-600 mt-1">
                          % of high-risk suppliers with action taken: {((watch("gri409.suppliersWithActions") / watch("gri409.highRiskSuppliers")) * 100).toFixed(1)}%
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <InfoLabel
                      label="Q12. Identify basis for risk classification"
                      info="Select how you identified the risk (e.g., industry type, country risk, complaints, or past issues)."
                    />
                    <div className="flex flex-wrap gap-4">
                      {["Industry/sector risk (e.g., construction, agriculture, manufacturing)", "Geographic risk (high-risk countries/regions)", "Supplier screening results", "Worker feedback or complaints", "Past incidents", "External data sources (ILO, OECD, NGO reports)", "Other"].map((basis) => (
                        <label key={basis} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            value={basis}
                            {...register("gri409.riskClassificationBasis")}
                            className="w-4 h-4 text-[#4639AA]"
                          />
                          <span className="text-sm">{basis}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <InfoLabel
                      label="Q13. What measures were taken to eliminate forced labor risks?"
                      info="Select actions taken to remove or reduce forced labor risks (e.g., working with suppliers, training, reimbursing fees, ending contracts)."
                    />
                    <div className="flex flex-wrap gap-4">
                      {["Supplier engagement and corrective actions", "Contract termination with non-compliant suppliers", "Ethical recruitment programs", "Reimbursement of recruitment fees", "Capacity-building and supplier training", "Collaboration with industry initiatives", "Worker remediation and support programs", "Other"].map((measure) => (
                        <label key={measure} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            value={measure}
                            {...register("gri409.addressingMeasures")}
                            className="w-4 h-4 text-[#4639AA]"
                          />
                          <span className="text-sm">{measure}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {watch("gri409.risksIdentified") === "no" && (
                <div className="mt-4 bg-[#4639AA]/5 border border-[#4639AA]/15 p-4 rounded-xl">
                  <h4 className="text-sm font-bold text-[#4639AA] mb-3">No significant risks identified</h4>
                  <p className="text-xs text-gray-600">No operations or suppliers were identified with significant risk for incidents of forced labor.</p>
                </div>
              )}
            </>
          )}

          {watch("gri409.assessedRisks") === "no" && (
            <div className="mt-4 bg-[#4639AA]/5 border border-[#4639AA]/15 p-4 rounded-xl">
              <h4 className="text-sm font-bold text-[#4639AA] mb-3">Omission Logic (GRI 409-1)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <InfoLabel
                    label="Reason for omission"
                    info="If you cannot provide required data, select the closest reason."
                  />
                  <select
                    {...register("gri409.omissionReason")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
                  >
                    <option value="">Select reason</option>
                    <option value="Risk assessments not conducted">Risk assessments not conducted</option>
                    <option value="Supplier data not available">Supplier data not available</option>
                    <option value="Systems not in place">Systems not in place</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <InfoLabel
                    label="Explanation (mandatory)"
                    info="Provide a brief explanation why the data is omitted."
                  />
                  <textarea
                    {...register("gri409.omissionExplanation")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[100px]"
                    placeholder="e.g. Forced labor risk assessment is being implemented..."
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
  //  Gri 410 SECURITY PRACTICES 
  const renderGRI410 = () => (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white p-3 rounded-md border border-gray-200">
        <h3 className="text-lg font-bold text-[#4639AA] mb-6 flex items-center gap-2">
          <Icon icon="mdi:shield-lock" /> Security Practices
        </h3>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <InfoLabel
              label="Q1. Does the organization have policies or procedures on security practices aligned with human rights?"
              info="Select Yes if your company has rules for security staff to act responsibly and respect people’s rights."
            />
            <div className="flex gap-4">
              {["yes", "no"].map((opt) => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value={opt}
                    {...register("gri410.hasSecurityPracticesPolicies")}
                    className="w-4 h-4 text-[#4639AA] focus:ring-[#4639AA]"
                  />
                  <span className="capitalize text-sm text-gray-700">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {watch("gri410.hasSecurityPracticesPolicies") === "yes" && (
            <>
              <div>
                <InfoLabel
                  label="Brief description of policies or procedures"
                  info="Briefly describe your company’s rules for security staff, including how they should behave and respect human rights."
                />
                <textarea
                  {...register("gri410.securityPracticesDescription")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[120px]"
                  placeholder="Describe security practices policies..."
                />
              </div>

              <div>
                <InfoLabel
                  label="Q2. Which standards or frameworks are these policies aligned with?"
                  info="Select the standards or laws your company follows to ensure security practices respect human rights."
                />
                <div className="flex flex-wrap gap-4">
                  {["UN Guiding Principles on Business and Human Rights", "International Code of Conduct for Private Security Service Providers (ICoC)", "Voluntary Principles on Security and Human Rights", "National laws and regulations", "Internal code of conduct", "Other"].map((standard) => (
                    <label key={standard} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        value={standard}
                        {...register("gri410.alignedStandards")}
                        className="w-4 h-4 text-[#4639AA]"
                      />
                      <span className="text-sm">{standard}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          <div>
            <InfoLabel
              label="Q3. Who is responsible for managing security practices and human rights risks?"
              info="Select the person or department responsible for security staff and related risks."
            />
            <select
              {...register("gri410.responsible")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
            >
              <option>Security department</option>
              <option>Human Resources</option>
              <option>Compliance / Legal team</option>
              <option>Sustainability team</option>
              <option>Senior management</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <InfoLabel
              label="Q4. What actions are taken to ensure security personnel respect human rights?"
              info="Select actions your company takes to ensure security staff behave properly (e.g., training, rules, checks)."
            />
            <div className="flex flex-wrap gap-4">
              {["Mandatory human rights training", "Rules on use of force", "Screening and vetting of security personnel", "Incident reporting mechanisms", "Monitoring and supervision", "Contractual clauses for third-party security providers", "Other"].map((action) => (
                <label key={action} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={action}
                    {...register("gri410.preventionActions")}
                    className="w-4 h-4 text-[#4639AA]"
                  />
                  <span className="text-sm">{action}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <InfoLabel
              label="Q5. How does the organization monitor security personnel compliance?"
              info="Select how you check that security staff follow rules (e.g., audits, complaints, performance reviews). Select 'Not monitored' if nothing is tracked."
            />
            <div className="flex flex-wrap gap-4">
              {["Internal audits", "Incident reporting systems", "Worker/community complaints", "Third-party assessments", "Performance evaluations", "Not monitored"].map((method) => (
                <label key={method} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={method}
                    {...register("gri410.monitoring")}
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
          <Icon icon="mdi:account-group" /> Security Personnel Trained in Human Rights Policies or Procedures
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <InfoLabel
                label="Q6. Enter total number of security personnel"
                info="Enter total number of all security staff, including outsourced or contracted personnel if applicable."
              />
              <input
                type="number"
                {...register("gri410.totalSecurityPersonnel")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]"
                placeholder="0"
                min="0"
              />
            </div>
            <div>
              <InfoLabel
                label="Q7. Enter number of security personnel who received formal human rights training"
                info="Enter number of security staff who received official training on human rights."
              />
              <input
                type="number"
                {...register("gri410.securityPersonnelTrained")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]"
                placeholder="0"
                min="0"
              />
              {watch("gri410.totalSecurityPersonnel") > 0 && (
                <p className="text-xs text-gray-600 mt-1">
                  % of trained personnel: {((watch("gri410.securityPersonnelTrained") / watch("gri410.totalSecurityPersonnel")) * 100).toFixed(1)}%
                  {((watch("gri410.securityPersonnelTrained") / watch("gri410.totalSecurityPersonnel")) * 100) < 70 && (
                    <span className="text-red-500 ml-2">⚠ Insufficient training coverage</span>
                  )}
                </p>
              )}
            </div>
          </div>

          <div>
            <InfoLabel
              label="Q8. Are third-party security personnel included in the above calculation?"
              info="Select Yes if outsourced or contracted security staff are included in the numbers above."
            />
            <div className="flex gap-4">
              {["yes", "no"].map((opt) => (
                <label key={opt} className="flex items-center gap-2">
                  <input
                    type="radio"
                    value={opt}
                    {...register("gri410.includesThirdPartyPersonnel")}
                    className="w-4 h-4 text-[#4639AA]"
                  />
                  <span className="capitalize text-sm">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <InfoLabel
              label="Q9. Do training requirements apply to third-party security providers?"
              info="Select Yes if your company requires outsourced security providers to complete human rights training."
            />
            <div className="flex gap-4">
              {["yes", "no"].map((opt) => (
                <label key={opt} className="flex items-center gap-2">
                  <input
                    type="radio"
                    value={opt}
                    {...register("gri410.thirdPartyTrainingRequired")}
                    className="w-4 h-4 text-[#4639AA]"
                  />
                  <span className="capitalize text-sm">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {watch("gri410.thirdPartyTrainingRequired") === "yes" && (
            <div>
              <InfoLabel
                label="Brief description of requirements"
                info="Briefly describe what training or rules third-party security providers must follow."
              />
              <textarea
                {...register("gri410.thirdPartyTrainingDescription")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[120px]"
                placeholder="Describe third-party security training requirements..."
              />
            </div>
          )}

          <div>
            <InfoLabel
              label="Q10. What type of human rights training is provided?"
              info="Select the types of training given to security staff on human rights and proper conduct."
            />
            <div className="flex flex-wrap gap-4">
              {["Dedicated human rights training", "Human rights module within general training", "Use of force guidelines", "Anti-discrimination training", "Community interaction protocols", "Identification and reporting procedures", "Other"].map((type) => (
                <label key={type} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={type}
                    {...register("gri410.trainingTypes")}
                    className="w-4 h-4 text-[#4639AA]"
                  />
                  <span className="text-sm">{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mt-4 bg-[#4639AA]/5 border border-[#4639AA]/15 p-4 rounded-xl">
            <h4 className="text-sm font-bold text-[#4639AA] mb-3">Omission Logic (GRI 410-1)</h4>
            <p className="text-xs text-gray-600 mb-3">If you cannot provide security training data, select a reason and explain why.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <InfoLabel
                  label="Reason for omission"
                  info="If you cannot provide required data, select the closest reason."
                />
                <select
                  {...register("gri410.omissionReason")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
                >
                  <option value="">Select reason</option>
                  <option value="Training data not tracked">Training data not tracked</option>
                  <option value="No formal training programs">No formal training programs</option>
                  <option value="Systems not in place">Systems not in place</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <InfoLabel
                  label="Explanation (mandatory)"
                  info="Provide a brief explanation why the data is omitted."
                />
                <textarea
                  {...register("gri410.omissionExplanation")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[100px]"
                  placeholder="e.g. Security training records are not available for subcontractors..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  //  Gri 411 RIGHTS OF INDIGENOUS PEOPLES
  const renderGRI411 = () => (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white p-3 rounded-md border border-gray-200">
        <h3 className="text-lg font-bold text-[#4639AA] mb-6 flex items-center gap-2">
          <Icon icon="mdi:account-voice" /> Rights of Indigenous Peoples
        </h3>
        <div className="grid grid-cols-1 gap-6">
          {/* Q1 */}
          <div>
            <InfoLabel
              label="Q1. Does the organization have policies or commitments respecting the rights of indigenous peoples?"
              info="Select Yes if your business has any rules, policies, or commitments to respect communities such as tribal or native groups. This may include: Respecting their land and resources, Taking permission before using their land (FPIC), Protecting their culture and traditions."
            />
            <div className="flex gap-4">
              {["yes", "no"].map((opt) => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value={opt}
                    {...register("gri411.hasIndigenousPolicies")}
                    className="w-4 h-4 text-[#4639AA] focus:ring-[#4639AA]"
                  />
                  <span className="capitalize text-sm text-gray-700">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Q1 Description */}
          {watch("gri411.hasIndigenousPolicies") === "yes" && (
            <div>
              <InfoLabel
                label="Provide brief description of policies"
                info="Briefly explain your policy. For example: Do you take permission before starting projects on community land? Do you protect cultural or religious sites? Do you ensure fair treatment of local communities?"
              />
              <textarea
                {...register("gri411.policyDescription", { maxLength: 300 })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[80px]"
                placeholder="Describe indigenous rights policies (max 300 chars)..."
                maxLength={300}
              />
              <div className="text-xs text-gray-500 text-right">{watch("gri411.policyDescription")?.length || 0}/300</div>
            </div>
          )}

          {/* Q2 */}
          <div>
            <InfoLabel
              label="Q2. Which standards or frameworks are these policies aligned with?"
              info="Select any guidelines or laws your company follows. If unsure, select what best matches your practice or choose 'Other'."
            />
            <div className="flex flex-wrap gap-4 mb-2">
              {["UN Declaration on the Rights of Indigenous Peoples (UNDRIP)", "ILO Convention 169 (Indigenous and Tribal Peoples)", "UN Guiding Principles on Business and Human Rights", "OECD Guidelines for Multinational Enterprises", "National laws and regulations"].map((standard) => (
                <label key={standard} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={standard}
                    {...register("gri411.alignedStandards")}
                    className="w-4 h-4 text-[#4639AA]"
                  />
                  <span className="text-sm">{standard}</span>
                </label>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="checkbox"
                value="Other"
                {...register("gri411.alignedStandards")}
                className="w-4 h-4 text-[#4639AA]"
              />
              <span className="text-sm">Other</span>
              {Array.isArray(watch("gri411.alignedStandards")) && watch("gri411.alignedStandards").includes("Other") && (
                <input
                  type="text"
                  {...register("gri411.alignedStandardsOther")}
                  className="ml-2 px-2 py-1 border border-gray-300 rounded"
                  placeholder="Please specify"
                />
              )}
            </div>
          </div>

          {/* Q3 */}
          <div>
            <InfoLabel
              label="Q3. Who is responsible for managing indigenous peoples’ rights–related impacts?"
              info="Select the person or team responsible for handling issues related to local or indigenous communities. This is usually the team that deals with:
                • Community matters
                • Legal risks
                • Social impact"
            />
            <select
              {...register("gri411.responsible")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
            >
              <option value="">Select responsible team</option>
              <option>Sustainability team</option>
              <option>Community relations / stakeholder engagement team</option>
              <option>Legal / compliance team</option>
              <option>Senior management</option>
              <option>Project management team</option>
              <option>Other</option>
            </select>
            {watch("gri411.responsible") === "Other" && (
              <input
                type="text"
                {...register("gri411.responsibleOther")}
                className="mt-2 px-2 py-1 border border-gray-300 rounded"
                placeholder="Please specify"
              />
            )}
          </div>

          {/* Q4 */}
          <div>
            <InfoLabel
              label="Q4. What actions are taken to respect indigenous peoples’ rights?"
              info="Select actions your company takes to protect local or indigenous communities. For example:
              • Taking permission before using land
              • Talking to communities before starting projects
              • Protecting cultural or religious places
              • Handling complaints properly"
            />
            <div className="flex flex-wrap gap-4 mb-2">
              {["Free, Prior and Informed Consent (FPIC) processes", "Community consultation and engagement", "Land rights assessments", "Cultural heritage protection measures", "Social impact assessments", "Grievance mechanisms for communities", "Compensation and benefit-sharing programs"].map((action) => (
                <label key={action} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={action}
                    {...register("gri411.respectActions")}
                    className="w-4 h-4 text-[#4639AA]"
                  />
                  <span className="text-sm">{action}</span>
                </label>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="checkbox"
                value="Other"
                {...register("gri411.respectActions")}
                className="w-4 h-4 text-[#4639AA]"
              />
              <span className="text-sm">Other</span>
              {Array.isArray(watch("gri411.respectActions")) && watch("gri411.respectActions").includes("Other") && (
                <input
                  type="text"
                  {...register("gri411.respectActionsOther")}
                  className="ml-2 px-2 py-1 border border-gray-300 rounded"
                  placeholder="Please specify"
                />
              )}
            </div>
          </div>

          {/* Q5 */}
          <div>
            <InfoLabel
              label="Q5. How does the organization monitor compliance with indigenous rights commitments?"
              info="Select how you check if your company is actually following its commitments. This can include:
                • Taking feedback from communities
                • Internal checks or audits
                • External reviews
                • Tracking complaints"
            />
            <div className="flex flex-wrap gap-4">
              {["Community feedback mechanisms", "Internal audits", "Third-party assessments", "Grievance tracking systems", "Ongoing stakeholder engagement", "Not monitored"].map((method) => (
                <label key={method} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={method}
                    {...register("gri411.monitoring")}
                    className="w-4 h-4 text-[#4639AA]"
                  />
                  <span className="text-sm">{method}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 411-1 Incidents Section */}
      <div className="bg-white p-3 rounded-md border border-gray-200">
        <h3 className="text-lg font-bold text-[#4639AA] mb-4 flex items-center gap-2">
          <Icon icon="mdi:alert-decagram" /> Incidents of Violations Involving Rights of Indigenous Peoples
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <InfoLabel
                label="Q6. Enter total number of identified incidents involving indigenous rights violations"
                info="Enter the total number of issues or complaints related to indigenous/community rights. Include: Complaints from communities, Legal cases, Issues found internally."
              />
              <input
                type="number"
                {...register("gri411.totalIncidents")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]"
                placeholder="0"
                min="0"
              />
            </div>
            <div>
              <InfoLabel
                label="Q7. Enter number of incidents reviewed by the organization"
                info="Enter how many of the reported incidents your company has checked or investigated."
              />
              <input
                type="number"
                {...register("gri411.incidentsReviewed")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]"
                placeholder="0"
                min="0"
              />
              {watch("gri411.totalIncidents") > 0 && (
                <p className="text-xs text-gray-600 mt-1">
                  % of incidents reviewed: {((watch("gri411.incidentsReviewed") / watch("gri411.totalIncidents")) * 100).toFixed(1)}%
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <InfoLabel
                label="Q8. Enter number of incidents with remediation plans being implemented"
                info="Enter how many cases have a fix or action plan in progress. Example: resolving land disputes, compensating communities, correcting actions."
              />
              <input
                type="number"
                {...register("gri411.incidentsRemediation")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]"
                placeholder="0"
                min="0"
              />
              {watch("gri411.totalIncidents") > 0 && (
                <p className="text-xs text-gray-600 mt-1">
                  % of incidents under remediation: {((watch("gri411.incidentsRemediation") / watch("gri411.totalIncidents")) * 100).toFixed(1)}%
                </p>
              )}
            </div>
            <div>
              <InfoLabel
                label="Q9. Enter number of incidents where remediation plans have been completed and reviewed"
                info="Enter how many issues have been fully resolved and checked to ensure the solution worked."
              />
              <input
                type="number"
                {...register("gri411.incidentsResolved")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]"
                placeholder="0"
                min="0"
              />
              {watch("gri411.totalIncidents") > 0 && (
                <p className="text-xs text-gray-600 mt-1">
                  % of incidents resolved: {((watch("gri411.incidentsResolved") / watch("gri411.totalIncidents")) * 100).toFixed(1)}%
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <InfoLabel
                label="Q10. Enter number of incidents no longer subject to action"
                info="Enter cases that are now closed and require no further action. This may include: Fully resolved cases, Cases closed after review."
              />
              <input
                type="number"
                {...register("gri411.incidentsClosed")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]"
                placeholder="0"
                min="0"
              />
              {watch("gri411.totalIncidents") > 0 && (
                <p className="text-xs text-gray-600 mt-1">
                  % of closed incidents: {((watch("gri411.incidentsClosed") / watch("gri411.totalIncidents")) * 100).toFixed(1)}%
                </p>
              )}
            </div>
          </div>

          {/* Q11 Table */}
          <div>
            <InfoLabel
              label="Q11. Provide details of key incidents (if any)"
              info="Provide details of important cases. Keep it simple and factual: What happened, Where it happened, Who was affected, What action was taken."
            />
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-2 border border-gray-200">Incident ID</th>
                    <th className="p-2 border border-gray-200">Location</th>
                    <th className="p-2 border border-gray-200">Type of Violation</th>
                    <th className="p-2 border border-gray-200">Stakeholder Group</th>
                    <th className="p-2 border border-gray-200">Status</th>
                    <th className="p-2 border border-gray-200">Actions Taken</th>
                  </tr>
                </thead>
                <tbody>
                  {indigenousIncidentFields?.map((item, idx) => (
                    <tr key={item.id}>
                      <td className="p-1 border border-gray-200">
                        <input
                          {...register(`gri411.incidentDetails.${idx}.incidentId`)}
                          className="w-full p-1 border-none outline-none"
                          placeholder="e.g. 001"
                        />
                      </td>
                      <td className="p-1 border border-gray-200">
                        <input
                          {...register(`gri411.incidentDetails.${idx}.location`)}
                          className="w-full p-1 border-none outline-none"
                          placeholder="e.g. Amazon, Canada"
                        />
                      </td>
                      <td className="p-1 border border-gray-200">
                        <select
                          {...register(`gri411.incidentDetails.${idx}.typeOfViolation`)}
                          className="w-full p-1 border-none outline-none bg-transparent"
                        >
                          <option>Land rights violation</option>
                          <option>Lack of FPIC</option>
                          <option>Cultural heritage impact</option>
                          <option>Displacement or relocation issue</option>
                          <option>Resource use conflict</option>
                          <option>Other</option>
                        </select>
                      </td>
                      <td className="p-1 border border-gray-200">
                        <input
                          {...register(`gri411.incidentDetails.${idx}.stakeholderGroup`)}
                          className="w-full p-1 border-none outline-none"
                          placeholder="e.g. Indigenous community"
                        />
                      </td>
                      <td className="p-1 border border-gray-200">
                        <select
                          {...register(`gri411.incidentDetails.${idx}.status`)}
                          className="w-full p-1 border-none outline-none bg-transparent"
                        >
                          <option>Under review</option>
                          <option>Remediation in progress</option>
                          <option>Resolved</option>
                          <option>Closed</option>
                        </select>
                      </td>
                      <td className="p-1 border border-gray-200">
                        <input
                          {...register(`gri411.incidentDetails.${idx}.actionsTaken`)}
                          className="w-full p-1 border-none outline-none"
                          placeholder="e.g. Compensation provided"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              type="button"
              onClick={() => appendIndigenousIncident({ incidentId: "", location: "", typeOfViolation: "Land rights violation", stakeholderGroup: "", status: "Under review", actionsTaken: "" })}
              className="text-xs text-[#4639AA] font-bold mt-2"
            >
              + Add Row
            </button>
          </div>

          {/* Omission Logic */}
          <div className="mt-4 bg-[#4639AA]/5 border border-[#4639AA]/15 p-4 rounded-xl">
            <h4 className="text-sm font-bold text-[#4639AA] mb-3">Omission Logic (GRI 411)</h4>
            <p className="text-xs text-gray-600 mb-3">If you cannot report this data, select a reason and explain why.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <InfoLabel
                  label="Reason for omission"
                  info="If you cannot provide required data, select the closest reason."
                />
                <select
                  {...register("gri411.omissionReason")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
                >
                  <option value="">Select reason</option>
                  <option value="Not applicable to your business">Not applicable to your business</option>
                  <option value="Data not available">Data not available</option>
                  <option value="Legal or confidentiality issue">Legal or confidentiality issue</option>
                  <option value="No system to track incidents">No system to track incidents</option>
                  <option value="No monitoring done">No monitoring done</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <InfoLabel
                  label="Explanation (mandatory)"
                  info="Provide a brief explanation why the data is omitted."
                />
                <textarea
                  {...register("gri411.omissionExplanation")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[100px]"
                  placeholder="e.g. No indigenous communities in our area of operation..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  //  Gri 412 LOCAL COMMUNITIES
  // Example: const isLocalCommunitiesMaterial = materialTopics?.includes('Local Communities');
  const isLocalCommunitiesMaterial = typeof materialTopics !== 'undefined' && materialTopics?.includes('Local Communities');

  // Table for Q11
  const { fields: localCommunityImpactFields, append: appendLocalCommunityImpact } = useFieldArray({
    control,
    name: "gri412.impactDetails",
  });

  const renderGRI412 = () => {
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white p-3 rounded-md border border-gray-200">
        <h3 className="text-lg font-bold text-[#4639AA] mb-6 flex items-center gap-2">
          <Icon icon="mdi:account-group" /> Local Communities
        </h3>
        <div className="grid grid-cols-1 gap-6">
          {/* Q1 */}
          <div>
            <InfoLabel
              label="Q1. Does the organization have policies or commitments related to local community engagement and impacts?"
              info="Select Yes if your business has any policy or approach to deal with nearby communities. This includes: Talking to local people before starting work, Managing negative impacts (noise, pollution, traffic, etc.), Supporting community development."
            />
            <div className="flex gap-4">
              {["yes", "no"].map((opt) => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value={opt}
                    {...register("gri413.hasLocalCommunityPolicies")}
                    className="w-4 h-4 text-[#4639AA] focus:ring-[#4639AA]"
                  />
                  <span className="capitalize text-sm text-gray-700">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Q1 Description */}
          {watch("gri413.hasLocalCommunityPolicies") === "yes" && (
            <div>
              <InfoLabel
                label="Provide brief description of policies"
                info="Briefly explain your policy. For example: How you communicate with local communities, How you reduce negative impacts, Any support programs for the community."
              />
              <textarea
                {...register("gri413.policyDescription", { maxLength: 300 })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[80px]"
                placeholder="Describe local community policies (max 300 chars)..."
                maxLength={300}
              />
              <div className="text-xs text-gray-500 text-right">{watch("gri413.policyDescription")?.length || 0}/300</div>
            </div>
          )}

          {/* Q2 */}
          <div>
            <InfoLabel
              label="Q2. Which standards or frameworks are these policies aligned with?"
              info="Select any international guidelines or local laws your business follows. If unsure, select the closest option or choose 'Other'."
            />
            <div className="flex flex-wrap gap-4 mb-2">
              {["Universal Declaration of Human Rights", "International Covenant on Civil and Political Rights", "International Covenant on Economic, Social and Cultural Rights", "IFC Performance Standards (PS1, PS4)", "UN Declaration on the Right to Development", "National laws and regulations"].map((standard) => (
                <label key={standard} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={standard}
                    {...register("gri413.alignedStandards")}
                    className="w-4 h-4 text-[#4639AA]"
                  />
                  <span className="text-sm">{standard}</span>
                </label>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="checkbox"
                value="Other"
                {...register("gri413.alignedStandards")}
                className="w-4 h-4 text-[#4639AA]"
              />
              <span className="text-sm">Other</span>
              {Array.isArray(watch("gri413.alignedStandards")) && watch("gri413.alignedStandards").includes("Other") && (
                <input
                  type="text"
                  {...register("gri413.alignedStandardsOther")}
                  className="ml-2 px-2 py-1 border border-gray-300 rounded"
                  placeholder="Please specify"
                />
              )}
            </div>
          </div>

          {/* Q3 */}
          <div>
            <InfoLabel
              label="Q3. Who is responsible for managing local community–related impacts?"
              info="Select the person or team responsible for dealing with community issues. This is usually the team that handles: Complaints from local people, Social or environmental impacts, Community relations."
            />
            <select
              {...register("gri413.responsible")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
            >
              <option value="">Select responsible team</option>
              <option>Community relations / stakeholder engagement team</option>
              <option>Sustainability team</option>
              <option>Environmental / social impact team</option>
              <option>Senior management</option>
              <option>Project management team</option>
              <option>Other</option>
            </select>
            {watch("gri413.responsible") === "Other" && (
              <input
                type="text"
                {...register("gri413.responsibleOther")}
                className="mt-2 px-2 py-1 border border-gray-300 rounded"
                placeholder="Please specify"
              />
            )}
          </div>

          {/* Q4 */}
          <div>
            <InfoLabel
              label="Q4. How does the organization engage with local communities?"
              info="Select how your business communicates and works with local communities. Examples: Meetings or consultations, Development programs (education, health, etc.), Handling complaints, Including vulnerable groups (women, low-income, etc.)."
            />
            <div className="flex flex-wrap gap-4 mb-2">
              {["Stakeholder mapping and engagement plans", "Public consultations", "Community development programs", "Social impact assessments", "Environmental impact assessments", "Grievance mechanisms", "Inclusion of vulnerable groups"].map((action) => (
                <label key={action} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={action}
                    {...register("gri413.engagementActions")}
                    className="w-4 h-4 text-[#4639AA]"
                  />
                  <span className="text-sm">{action}</span>
                </label>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="checkbox"
                value="Other"
                {...register("gri413.engagementActions")}
                className="w-4 h-4 text-[#4639AA]"
              />
              <span className="text-sm">Other</span>
              {Array.isArray(watch("gri413.engagementActions")) && watch("gri413.engagementActions").includes("Other") && (
                <input
                  type="text"
                  {...register("gri413.engagementActionsOther")}
                  className="ml-2 px-2 py-1 border border-gray-300 rounded"
                  placeholder="Please specify"
                />
              )}
            </div>
          </div>

          {/* Q5 */}
          <div>
            <InfoLabel
              label="Q5. How does the organization identify and address risks and impacts on local communities?"
              info="Select how you identify problems and manage risks for communities. This may include: Checking impacts before starting projects, Monitoring ongoing impacts, Getting external reviews, Working with local people."
            />
            <div className="flex flex-wrap gap-4">
              {["Impact assessments (social/environmental)", "Continuous monitoring programs", "Internal risk assessments", "Third-party assessments", "Collaboration with local stakeholders", "Not monitored"].map((method) => (
                <label key={method} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={method}
                    {...register("gri413.riskIdentification")}
                    className="w-4 h-4 text-[#4639AA]"
                  />
                  <span className="text-sm">{method}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 413-1 Operations with Community Engagement and Development Programs */}
      <div className="bg-white p-3 rounded-md border border-gray-200">
        <h3 className="text-lg font-bold text-[#4639AA] mb-4 flex items-center gap-2">
          <Icon icon="mdi:factory" /> Operations with Community Engagement and Development Programs
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <InfoLabel
                label="Q6. Enter total number of operations"
                info="Enter total number of business sites or operations (factories, branches, projects, etc.)."
              />
              <input
                type="number"
                {...register("gri413.totalOperations")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]"
                placeholder="0"
                min="0"
              />
            </div>
            <div>
              <InfoLabel
                label="Q7. Enter number of operations with community engagement, impact assessments, or development programs implemented"
                info="Enter how many of your operations: Engage with local communities, Conduct impact assessments, Run community programs."
              />
              <input
                type="number"
                {...register("gri413.operationsWithPrograms")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]"
                placeholder="0"
                min="0"
              />
              {watch("gri413.totalOperations") > 0 && (
                <p className="text-xs text-gray-600 mt-1">
                  % of operations with community programs: {((watch("gri413.operationsWithPrograms") / watch("gri413.totalOperations")) * 100).toFixed(1)}%
                </p>
              )}
            </div>
          </div>

          {/* Q8 */}
          <div>
            <InfoLabel
              label="Q8. Which elements are implemented across operations?"
              info="Select what actions are already in place across your operations. These are steps to manage and support local communities."
            />
            <div className="flex flex-wrap gap-4">
              {["Social impact assessments (including gender impact assessments)", "Environmental impact assessments and monitoring", "Public disclosure of impact assessment results", "Community development programs", "Stakeholder engagement plans", "Consultation committees including vulnerable groups", "Worker representation bodies (e.g., OHS committees)", "Formal grievance mechanisms"].map((element) => (
                <label key={element} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={element}
                    {...register("gri413.implementedElements")}
                    className="w-4 h-4 text-[#4639AA]"
                  />
                  <span className="text-sm">{element}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 413-2 Operations with Significant Impacts on Local Communities */}
      <div className="bg-white p-3 rounded-md border border-gray-200">
        <h3 className="text-lg font-bold text-[#4639AA] mb-4 flex items-center gap-2">
          <Icon icon="mdi:alert-decagram" /> Operations with Significant Impacts on Local Communities
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <InfoLabel
                label="Q9. Enter total number of operations assessed for community impact"
                info="Enter how many of your operations have been checked for impact on local communities."
              />
              <input
                type="number"
                {...register("gri413.totalAssessedOperations")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]"
                placeholder="0"
                min="0"
              />
            </div>
            <div>
              <InfoLabel
                label="Q10. Enter number of operations identified with significant negative impacts"
                info="Enter how many operations are causing major negative effects on communities. Examples: Pollution, Displacement, Health or safety issues."
              />
              <input
                type="number"
                {...register("gri413.highImpactOperations")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]"
                placeholder="0"
                min="0"
              />
              {watch("gri413.totalAssessedOperations") > 0 && (
                <p className="text-xs text-gray-600 mt-1">
                  % of high-impact operations: {((watch("gri413.highImpactOperations") / watch("gri413.totalAssessedOperations")) * 100).toFixed(1)}%
                </p>
              )}
            </div>
          </div>

          {/* Q11 Table */}
          <div>
            <InfoLabel
              label="Q11. Provide details of operations with significant impacts"
              info="Provide details of operations causing major impacts. Keep it simple: What is the issue, Where it is happening, How serious it is, How long it will last."
            />
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-2 border border-gray-200">Operation</th>
                    <th className="p-2 border border-gray-200">Location</th>
                    <th className="p-2 border border-gray-200">Type of Impact</th>
                    <th className="p-2 border border-gray-200">Severity</th>
                    <th className="p-2 border border-gray-200">Duration</th>
                    <th className="p-2 border border-gray-200">Reversibility</th>
                    <th className="p-2 border border-gray-200">Scale</th>
                  </tr>
                </thead>
                <tbody>
                  {localCommunityImpactFields?.map((item, idx) => (
                    <tr key={item.id}>
                      <td className="p-1 border border-gray-200">
                        <input
                          {...register(`gri413.impactDetails.${idx}.operation`)}
                          className="w-full p-1 border-none outline-none"
                          placeholder="e.g. Factory A"
                        />
                      </td>
                      <td className="p-1 border border-gray-200">
                        <input
                          {...register(`gri413.impactDetails.${idx}.location`)}
                          className="w-full p-1 border-none outline-none"
                          placeholder="e.g. City, Country"
                        />
                      </td>
                      <td className="p-1 border border-gray-200">
                        <select
                          {...register(`gri413.impactDetails.${idx}.typeOfImpact`)}
                          className="w-full p-1 border-none outline-none bg-transparent"
                        >
                          <option>Economic</option>
                          <option>Social</option>
                          <option>Environmental</option>
                          <option>Cultural</option>
                        </select>
                      </td>
                      <td className="p-1 border border-gray-200">
                        <select
                          {...register(`gri413.impactDetails.${idx}.severity`)}
                          className="w-full p-1 border-none outline-none bg-transparent"
                        >
                          <option>Low</option>
                          <option>Medium</option>
                          <option>High</option>
                        </select>
                      </td>
                      <td className="p-1 border border-gray-200">
                        <select
                          {...register(`gri413.impactDetails.${idx}.duration`)}
                          className="w-full p-1 border-none outline-none bg-transparent"
                        >
                          <option>Short-term</option>
                          <option>Medium-term</option>
                          <option>Long-term</option>
                        </select>
                      </td>
                      <td className="p-1 border border-gray-200">
                        <select
                          {...register(`gri413.impactDetails.${idx}.reversibility`)}
                          className="w-full p-1 border-none outline-none bg-transparent"
                        >
                          <option>Reversible</option>
                          <option>Partially reversible</option>
                          <option>Irreversible</option>
                        </select>
                      </td>
                      <td className="p-1 border border-gray-200">
                        <select
                          {...register(`gri413.impactDetails.${idx}.scale`)}
                          className="w-full p-1 border-none outline-none bg-transparent"
                        >
                          <option>Localized</option>
                          <option>Regional</option>
                          <option>Widespread</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              type="button"
              onClick={() => appendLocalCommunityImpact({ operation: "", location: "", typeOfImpact: "Economic", severity: "Low", duration: "Short-term", reversibility: "Reversible", scale: "Localized" })}
              className="text-xs text-[#4639AA] font-bold mt-2"
            >
              + Add Row
            </button>
          </div>

          {/* Q12 */}
          <div>
            <InfoLabel
              label="Q12. Identify factors contributing to community vulnerability"
              info="Select factors that make local communities more vulnerable or at risk. Examples: Poverty, Poor infrastructure (health, education), Weak local systems, Gender inequality."
            />
            <div className="flex flex-wrap gap-4 mb-2">
              {["Economic isolation", "Low socioeconomic development", "Weak infrastructure (health, education)", "Proximity to operations", "Weak governance systems", "Low social organization", "Gender inequality"].map((factor) => (
                <label key={factor} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={factor}
                    {...register("gri413.vulnerabilityFactors")}
                    className="w-4 h-4 text-[#4639AA]"
                  />
                  <span className="text-sm">{factor}</span>
                </label>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="checkbox"
                value="Other"
                {...register("gri413.vulnerabilityFactors")}
                className="w-4 h-4 text-[#4639AA]"
              />
              <span className="text-sm">Other</span>
              {Array.isArray(watch("gri413.vulnerabilityFactors")) && watch("gri413.vulnerabilityFactors").includes("Other") && (
                <input
                  type="text"
                  {...register("gri413.vulnerabilityFactorsOther")}
                  className="ml-2 px-2 py-1 border border-gray-300 rounded"
                  placeholder="Please specify"
                />
              )}
            </div>
          </div>

          {/* Q13 */}
          <div>
            <InfoLabel
              label="Q13. Identify exposure of communities to operational impacts"
              info="Select how communities are affected by your operations. Examples: Pollution, Hazardous materials, Land use changes, Dependence on your company for jobs."
            />
            <div className="flex flex-wrap gap-4 mb-2">
              {["Use of hazardous substances", "Pollution emissions", "Natural resource consumption", "Land use change / resettlement", "Dependency on organization as employer"].map((exposure) => (
                <label key={exposure} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={exposure}
                    {...register("gri413.communityExposure")}
                    className="w-4 h-4 text-[#4639AA]"
                  />
                  <span className="text-sm">{exposure}</span>
                </label>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="checkbox"
                value="Other"
                {...register("gri413.communityExposure")}
                className="w-4 h-4 text-[#4639AA]"
              />
              <span className="text-sm">Other</span>
              {Array.isArray(watch("gri413.communityExposure")) && watch("gri413.communityExposure").includes("Other") && (
                <input
                  type="text"
                  {...register("gri413.communityExposureOther")}
                  className="ml-2 px-2 py-1 border border-gray-300 rounded"
                  placeholder="Please specify"
                />
              )}
            </div>
          </div>

          {/* Q14 */}
          <div>
            <InfoLabel
              label="Q14. What actions are taken to manage or mitigate negative impacts?"
              info="Select actions your business takes to reduce or fix negative impacts. Examples: Reducing pollution, Supporting affected communities, Building infrastructure, Handling complaints properly."
            />
            <div className="flex flex-wrap gap-4 mb-2">
              {["Impact mitigation measures", "Community compensation programs", "Stakeholder engagement", "Infrastructure development", "Environmental controls", "Grievance redress mechanisms"].map((action) => (
                <label key={action} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={action}
                    {...register("gri413.mitigationActions")}
                    className="w-4 h-4 text-[#4639AA]"
                  />
                  <span className="text-sm">{action}</span>
                </label>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="checkbox"
                value="Other"
                {...register("gri413.mitigationActions")}
                className="w-4 h-4 text-[#4639AA]"
              />
              <span className="text-sm">Other</span>
              {Array.isArray(watch("gri413.mitigationActions")) && watch("gri413.mitigationActions").includes("Other") && (
                <input
                  type="text"
                  {...register("gri413.mitigationActionsOther")}
                  className="ml-2 px-2 py-1 border border-gray-300 rounded"
                  placeholder="Please specify"
                />
              )}
            </div>
          </div>

          {/* Omission Logic */}
          <div className="mt-4 bg-[#4639AA]/5 border border-[#4639AA]/15 p-4 rounded-xl">
            <h4 className="text-sm font-bold text-[#4639AA] mb-3">Omission Logic (GRI 413)</h4>
            <p className="text-xs text-gray-600 mb-3">If you cannot provide this data, select a reason and explain.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <InfoLabel
                  label="Reason for omission"
                  info="If you cannot provide required data, select the closest reason."
                />
                <select
                  {...register("gri413.omissionReason")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
                >
                  <option value="">Select reason</option>
                  <option value="Not applicable to your business">Not applicable to your business</option>
                  <option value="Data not available">Data not available</option>
                  <option value="Legal or confidentiality issue">Legal or confidentiality issue</option>
                  <option value="No community impact assessments done">No community impact assessments done</option>
                  <option value="No monitoring system exists">No monitoring system exists</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <InfoLabel
                  label="Explanation (mandatory)"
                  info="Provide a brief explanation why the data is omitted."
                />
                <textarea
                  {...register("gri413.omissionExplanation")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[100px]"
                  placeholder="e.g. No community impact assessments are conducted..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  };
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
              {activeTab === 8 && renderGRI409()}
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
