import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axiosInstance from "../../../configs/axios.config";
import { toast } from "react-toastify";
import { handleError } from "../../../utils/functions";
import Gri from "../../../components/partials/GRIDisclosureIndex"

const GovernanceSetup = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [globalFiles, setGlobalFiles] = useState([]);
  const [existingGlobalFiles, setExistingGlobalFiles] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [aiLoading, setAiLoading] = useState(false);

  // File states for each sub-module
  const [moduleFiles, setModuleFiles] = useState({
    subModule2_10: [],
    subModule2_12: [],
    subModule2_13: [],
    subModule2_14: [],
    subModule2_15: [],
    subModule2_16: [],
    subModule2_17: [],
  });

  const [existingModuleFiles, setExistingModuleFiles] = useState({
    subModule2_10: [],
    subModule2_12: [],
    subModule2_13: [],
    subModule2_14: [],
    subModule2_15: [],
    subModule2_16: [],
    subModule2_17: [],
  });

  const tabs = [
    { id: 0, number: "2.1:", label: "Governance Structure", module: "subModule2_1", icon: "mdi:sitemap" },
    { id: 1, number: "2.2:", label: "Sustainability Oversight", module: "subModule2_2", icon: "mdi:leaf-circle-outline" },
    { id: 2, number: "2.3:", label: "Conflicts of Interest", module: "subModule2_3", icon: "mdi:account-alert-outline" },
    { id: 3, number: "2.4:", label: "Critical Concerns", module: "subModule2_4", icon: "mdi:message-alert-outline" },
    { id: 4, number: "2.5:", label: "Pay & Equity", module: "subModule2_5", icon: "mdi:scale-balance" },
    { id: 5, number: "2.6:", label: "Performance Review", module: "subModule2_6", icon: "mdi:chart-line-variant" },
    { id: 6, number: "2.7:", label: "Pay Policies", module: "subModule2_7", icon: "mdi:file-document-check-outline" },
    { id: 7, number: "2.8:", label: "Pay Process", module: "subModule2_8", icon: "mdi:cogs" },
    { id: 8, number: "2.9:", label: "Pay Ratio", module: "subModule2_9", icon: "mdi:calculator-variant-outline" },
    { id: 9, number: "2.10:", label: "Sustainability Strategy", module: "subModule2_10", icon: "mdi:strategy" },
    { id: 10, number: "2.11:", label: "Business Conduct", module: "subModule2_11", icon: "mdi:handshake-outline" },
    { id: 11, number: "2.12:", label: "Policy Integration", module: "subModule2_12", icon: "mdi:layers-triple-outline" },
    { id: 12, number: "2.13:", label: "Advice & Grievances", module: "subModule2_13", icon: "mdi:comment-question-outline" },
    { id: 13, number: "2.14:", label: "Legal Compliance", module: "subModule2_14", icon: "mdi:gavel" },
    { id: 14, number: "2.15:", label: "Memberships", module: "subModule2_15", icon: "mdi:account-group-outline" },
    { id: 15, number: "2.16:", label: "Stakeholder Engagement", module: "subModule2_16", icon: "mdi:account-multiple-outline" },
    { id: 16, number: "2.17:", label: "Collective Bargaining", module: "subModule2_17", icon: "mdi:file-sign" },
  ];

  // Validation schemas for each tab
  const tabSchemas = {
    0: yup.object({
      governanceStructure: yup.string().required("Governance structure is required"),
      highestGovernanceBody: yup.string().required("Highest governance body is required"),
      highestGovernanceBodyOther: yup.string(),
      membersCount: yup.number().required("Number of members is required").min(1),
      composition: yup.string().required("Composition is required"),
      nominationSelectionProcess: yup.string().required("Nomination and selection process is required"),
      sustainabilityCompetenciesConsidered: yup.string().required("Sustainability competencies consideration is required"),
      isChairIndependent: yup.string().required("Chair independence is required"),
      chairNotIndependentSafeguards: yup.string(),
    }),
    1: yup.object({
      oversightSustainabilityImpacts: yup.string().required("Sustainability oversight is required"),
      delegationSustainabilityResponsibilities: yup.string().required("Delegation is required"),
      sustainabilityCommittee: yup.string(),
      reviewSustainabilityInfo: yup.string().required("Review before publication is required"),
      considerSustainabilityInStrategy: yup.string().required("Strategy consideration is required"),
    }),
    2: yup.object({
      hasConflictOfInterestProcesses: yup.string(),
      conflictOfInterestProcessesDescription: yup.string(),
      discloseConflictsToStakeholders: yup.string(),
      hasCrossBoardMemberships: yup.string(),
      discloseCrossBoardMemberships: yup.string(),
      crossBoardMembershipsDescription: yup.string(),
      hasCrossShareholding: yup.string(),
      discloseCrossShareholding: yup.string(),
      crossShareholdingDescription: yup.string(),
      hasControllingShareholders: yup.string(),
      discloseControllingShareholders: yup.string(),
      controllingShareholdersDescription: yup.string(),
      hasRelatedParties: yup.string(),
      discloseRelatedParties: yup.string(),
      relatedPartiesDescription: yup.string(),
    }),
    3: yup.object({
      hasCommunicationProcesses: yup.string(),
      communicationProcessesDescription: yup.string(),
      criticalConcernsCount: yup.number().min(0),
      criticalConcernsNature: yup.string(),
      advancedCollectiveKnowledge: yup.string(),
      knowledgeMeasures: yup.string(),
      skillsMeasures: yup.string(),
      experienceMeasures: yup.string(),
      participatedInLearning: yup.string(),
      learningActivitiesTypes: yup.array(),
      learningFrequency: yup.string(),
      learningFrequencyOther: yup.string(),
      learningDelivery: yup.array(),
    }),
    4: yup.object({
      hasRemunerationPolicy: yup.string(),
      remunerationPolicyApprover: yup.string(),
      remunerationPolicyApproverOther: yup.string(),
      remunerationConsidersSustainability: yup.string(),
      sustainabilityPayImpactDescription: yup.string(),
      compensationRatio: yup.string(),
      compensationIncreasePercentage: yup.string(),
    }),
    5: yup.object({
      hasPerformanceEvaluationProcesses: yup.string().required("Performance evaluation is required"),
      performanceEvaluationProcessesDescription: yup.string().required("Evaluation process is required"),
      independentEvaluations: yup.string().required("Evaluation independence is required"),
      evaluationIndependenceDescription: yup.string(),
      evaluationFrequency: yup.string().required("Evaluation frequency is required"),
      evaluationFrequencyOther: yup.string(),
      actionsTakenFromEvaluation: yup.string().required("Evaluation actions is required"),
      actionsTakenDescription: yup.string(),
      compositionChangesFromEvaluation: yup.string().required("Composition changes is required"),
      compositionChangesDescription: yup.string(),
      practiceChangesFromEvaluation: yup.string().required("Practice changes is required"),
      practiceChangesDescription: yup.string(),
    }),
    6: yup.object({
      hasDocumentedRemunerationPolicies: yup.string().required("Documented remuneration policies is required"),
      fixedPayBoard: yup.string(),
      variablePayBoard: yup.string(),
      fixedPayExecutives: yup.string(),
      variablePayExecutives: yup.string(),
      signOnBonusesBoard: yup.string(),
      signOnBonusesExecutives: yup.string(),
      terminationPaymentsBoard: yup.string(),
      terminationPaymentsExecutives: yup.string(),
      clawbackPoliciesBoard: yup.string(),
      clawbackPoliciesExecutives: yup.string(),
      retirementBenefitsBoard: yup.string(),
      retirementBenefitsExecutives: yup.string(),
      remunerationRelationToESGBoard: yup.string(),
      remunerationRelationToESGExecutives: yup.string(),
      regularReviewRemunerationPolicies: yup.string(),
      lastRemunerationReviewDate: yup.date(),
      remunerationOversightPerson: yup.string(),
    }),
    7: yup.object({
      independentOversightRemuneration: yup.string(),
      remunerationCommitteeComposition: yup.string(),
      stakeholderViewsSought: yup.string(),
      stakeholderViewsConsidered: yup.string(),
      remunerationConsultantsInvolved: yup.string(),
      independentRemunerationConsultants: yup.string(),
      consultantIndependenceAssurance: yup.string(),
      shareholderVotesReported: yup.string(),
      shareholderVoteResults: yup.string(),
      designingRemunerationPoliciesProcess: yup.string(),
      determiningIndividualRemunerationProcess: yup.string(),
      lastReviewRemunerationProcessDate: yup.date(),
      remunerationProcessOversightPerson: yup.string(),
    }),
    8: yup.object({
      highestPaidIndividualCompensation: yup.number(),
      medianEmployeeCompensation: yup.number(),
      compensationRatioComputed: yup.string(),
      highestPaidIncreasePercentage: yup.number(),
      medianIncreasePercentage: yup.number(),
      increaseRatioComputed: yup.string(),
      compensationAdjustmentsDescription: yup.string(),
      medianCalculationMethodology: yup.string(),
      compensationContextualInfo: yup.string(),
      dataCompilationDate: yup.date(),
      compensationReportingPerson: yup.string(),
    }),
    9: yup.object({
      hasSustainabilityStatement: yup.string(),
      statementProviderName: yup.string(),
      statementProviderTitle: yup.string(),
      sustainabilityStatement: yup.string(),
      sustainabilityIntegrationDescription: yup.string(),
      statementDate: yup.date(),
      statementSupportingDocument: yup.array().nullable(),
      statementResponsiblePerson: yup.string(),
    }),
    10: yup.object({
      hasResponsibleBusinessPolicies: yup.string(),
      authoritativeInstruments: yup.array().nullable(),
      policiesStipulateDueDiligence: yup.string(),
      policiesStipulatePrecautionaryPrinciple: yup.string(),
      policiesStipulateHumanRights: yup.string(),
      humanRightsCommitmentDescription: yup.string(),
      humanRightsInstrumentsCovered: yup.array().nullable(),
      stakeholderGroupsAttention: yup.array().nullable(),
      policiesPubliclyAvailable: yup.string(),
      policiesPublicLink: yup.string(),
      policiesNotPublicReason: yup.string(),
      policiesApprovalLevel: yup.string(),
      policiesApprovedAtSeniorLevel: yup.string(),
      policiesApplyToOwnActivities: yup.string(),
      policiesApplyToBusinessRelationships: yup.string(),
      policiesCommunicationMethod: yup.string(),
    }),
    11: yup.object({
      policyResponsibilityAllocation: yup.string(),
      policyIntegrationIntoStrategy: yup.string(),
      policyIntegrationIntoProcedures: yup.string(),
      policyImplementationWithPartners: yup.string(),
      policyTrainingDescription: yup.string(),
      policyTrainingRecipients: yup.array().min(1, "Select at least one training recipient"),
      policyTrainingFrequency: yup.string(),
      hasRemediationCommitment: yup.string(),
      remediationCommitmentDescription: yup.string(),
      grievanceIdentificationApproach: yup.string(),
      grievanceMechanismsList: yup.string(),
      otherRemediationProcesses: yup.string(),
      stakeholderInvolvementInDesign: yup.string(),
      stakeholderInvolvementInReview: yup.string(),
      stakeholderInvolvementInImprovement: yup.string(),
      grievanceEffectivenessTracking: yup.string(),
      grievanceEffectivenessExamples: yup.string(),
      lastRemediationReviewDate: yup.date(),
      grievanceOversightPerson: yup.string(),
      remediationSupportingDocuments: yup.array().nullable(),
    }),
    12: yup.object({
      hasAdviceMechanisms: yup.string(),
      adviceMechanismsDescription: yup.string(),
      hasConcernRaisingMechanisms: yup.string(),
      concernRaisingMechanismsDescription: yup.string(),
      mechanismsAccessibleToAll: yup.string(),
      responseProcessDescription: yup.string(),
      confidentialityProtectionDescription: yup.string(),
      lastAdviceMechanismReviewDate: yup.date(),
      adviceMechanismOversightPerson: yup.string(),
      adviceMechanismSupportingDocuments: yup.array().nullable(),
    }),
    13: yup.object({
      totalNonComplianceInstances: yup.number(),
      instancesWithFines: yup.number(),
      instancesWithNonMonetarySanctions: yup.number(),
      totalFinesPaid: yup.number(),
      finesCurrentPeriod: yup.number(),
      finesPreviousPeriods: yup.number(),
      nonComplianceDescription: yup.string(),
      nonComplianceDeterminationMethod: yup.string(),
      lastComplianceReviewDate: yup.date(),
      complianceReportingPerson: yup.string(),
      complianceSupportingDocuments: yup.array().nullable(),
    }),
    14: yup.object({
      participatesInAssociations: yup.string(),
      industryAssociations: yup.string(),
      otherMembershipAssociations: yup.string(),
      nationalAdvocacyOrganizations: yup.string(),
      internationalAdvocacyOrganizations: yup.string(),
      participationSignificance: yup.string(),
      associationObjectivesActivities: yup.string(),
      lastMembershipReviewDate: yup.string(),
      membershipManagementPerson: yup.string(),
    }),
    15: yup.object({
      hasFormalStakeholderEngagement: yup.string().required("Formal stakeholder engagement question is required"),
      stakeholderCategories: yup.array().when("hasFormalStakeholderEngagement", {
        is: (val) => val === "yes",
        then: (schema) => schema.min(1, "Select at least one stakeholder category"),
        otherwise: (schema) => schema,
      }),
      stakeholderIdentificationMethod: yup.string().when("hasFormalStakeholderEngagement", {
        is: (val) => val === "yes",
        then: (schema) => schema.required("Stakeholder identification method is required"),
        otherwise: (schema) => schema,
      }),
      stakeholderEngagementPurpose: yup.string().when("hasFormalStakeholderEngagement", {
        is: (val) => val === "yes",
        then: (schema) => schema.required("Stakeholder engagement purpose is required"),
        otherwise: (schema) => schema,
      }),
      meaningfulEngagementApproach: yup.string().when("hasFormalStakeholderEngagement", {
        is: (val) => val === "yes",
        then: (schema) => schema.required("Meaningful engagement approach is required"),
        otherwise: (schema) => schema,
      }),
      engagementFrequency: yup.string().when("hasFormalStakeholderEngagement", {
        is: (val) => val === "yes",
        then: (schema) => schema.required("Engagement frequency is required"),
        otherwise: (schema) => schema,
      }),
      engagementToolsPlatforms: yup.string().when("hasFormalStakeholderEngagement", {
        is: (val) => val === "yes",
        then: (schema) => schema.required("Engagement tools and platforms are required"),
        otherwise: (schema) => schema,
      }),
      feedbackIncorporationMethod: yup.string().when("hasFormalStakeholderEngagement", {
        is: (val) => val === "yes",
        then: (schema) => schema.required("Feedback incorporation method is required"),
        otherwise: (schema) => schema,
      }),
      lastStakeholderEngagementReviewDate: yup.date().when("hasFormalStakeholderEngagement", {
        is: (val) => val === "yes",
        then: (schema) => schema.required("Last review date is required"),
        otherwise: (schema) => schema,
      }),
      stakeholderEngagementResponsiblePerson: yup.string(),
    }),
    16: yup.object({
      hasCollectiveBargainingAgreements: yup.string(),
      percentageCoveredByCBAs: yup.number().min(0).max(100),
      nonCBADeterminedByCBAsCovering: yup.string(),
      nonCBADeterminedByCBAsOther: yup.string(),
      nonCBAWorkingConditionsDescription: yup.string(),
      lastCBAReviewDate: yup.string(),
      cbaOversightPerson: yup.string(),
    }),
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(tabSchemas[activeTab]),
    mode: "onChange",
    shouldUnregister: true,
  });

  // Fetch governance data on mount
  useEffect(() => {
    const fetchGovernanceData = async () => {
      try {
        const res = await axiosInstance.get("/brand/governance/");
        if (res.data.success && res.data.data) {
          const data = res.data.data;
          const toRadio = (val) => val === true ? "yes" : (val === false ? "no" : "");

          // Map each sub-module data to form fields
          Object.keys(data).forEach((key) => {
            if (key.startsWith("subModule2_")) {
              const moduleData = data[key];
              if (moduleData && moduleData.disclosures) {
                // Process each field in the module
                Object.keys(moduleData).forEach((fieldKey) => {
                  if (fieldKey !== "reference" && fieldKey !== "disclosures") {
                    // Convert boolean values to "yes"/"no" for radio buttons
                    const fieldValue = moduleData[fieldKey];
                    if (typeof fieldValue === "boolean") {
                      setValue(fieldKey, toRadio(fieldValue));
                    } else if (typeof fieldValue === "string" && /^\d{4}-\d{2}-\d{2}T/.test(fieldValue)) {
                      // Format ISO date to yyyy-mm-dd for HTML date inputs
                      setValue(fieldKey, fieldValue.split("T")[0]);
                    } else {
                      setValue(fieldKey, fieldValue);
                    }
                  }
                });

                // Set existing files if present
                if (key === "subModule2_10" && moduleData.statementSupportingDocument) {
                  setExistingModuleFiles((prev) => ({
                    ...prev,
                    subModule2_10: moduleData.statementSupportingDocument,
                  }));
                }
                if (key === "subModule2_12" && moduleData.remediationSupportingDocuments) {
                  setExistingModuleFiles((prev) => ({
                    ...prev,
                    subModule2_12: moduleData.remediationSupportingDocuments,
                  }));
                }
                if (key === "subModule2_13" && moduleData.adviceMechanismSupportingDocuments) {
                  setExistingModuleFiles((prev) => ({
                    ...prev,
                    subModule2_13: moduleData.adviceMechanismSupportingDocuments,
                  }));
                }
                if (key === "subModule2_14" && moduleData.complianceSupportingDocuments) {
                  setExistingModuleFiles((prev) => ({
                    ...prev,
                    subModule2_14: moduleData.complianceSupportingDocuments,
                  }));
                }
                if (key === "subModule2_15" && moduleData.membershipSupportingDocuments) {
                  setExistingModuleFiles((prev) => ({
                    ...prev,
                    subModule2_15: moduleData.membershipSupportingDocuments,
                  }));
                }
                if (key === "subModule2_16" && moduleData.stakeholderEngagementSupportingDocuments) {
                  setExistingModuleFiles((prev) => ({
                    ...prev,
                    subModule2_16: moduleData.stakeholderEngagementSupportingDocuments,
                  }));
                }
                if (key === "subModule2_17" && moduleData.cbaSupportingDocuments) {
                  setExistingModuleFiles((prev) => ({
                    ...prev,
                    subModule2_17: moduleData.cbaSupportingDocuments,
                  }));
                }
              }
            }
          });

          // Set global governance documents
          if (data.governanceDocuments) {
            setExistingGlobalFiles(data.governanceDocuments);
          }
        }
      } catch (err) {
        console.error("Failed to fetch governance data", err);
      }
    };
    fetchGovernanceData();
  }, [setValue]);

  // Submit current module
  const handleModuleSubmit = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();
      const currentModule = tabs[activeTab];
      const subModuleKey = currentModule.module;

      // Add subModule parameter
      formData.append("subModule", subModuleKey);

      // Normalize comma- or newline-separated list fields into arrays for expected API arrays
      const arrayFields = [
        "industryAssociations",
        "otherMembershipAssociations",
        "nationalAdvocacyOrganizations",
        "internationalAdvocacyOrganizations",
        "participationSignificance",
      ];
      arrayFields.forEach((f) => {
        if (values[f] && typeof values[f] === "string") {
          const parts = values[f]
            .split(/\r?\n|,/) // split on newline or comma
            .map((s) => s.trim())
            .filter(Boolean);
          values[f] = parts;
        }
      });

      // Helper functions for form data
      const setBool = (key, val) => formData.append(key, val === "yes" ? true : false);
      const setText = (key, val) => formData.append(key, val || "");
      const setNum = (key, val) => formData.append(key, val || 0);
      const setArray = (key, val) => {
        if (Array.isArray(val)) {
          val.forEach((v) => formData.append(key, v));
        }
      };

      // Process all form values
      Object.keys(values).forEach((key) => {
        const value = values[key];
        if (value === undefined || value === null) return;

        // Handle boolean fields (yes/no radio buttons)
        if (key.includes("has") || key.includes("is") || key.includes("Disclosed") || key.includes("Processes") || key.includes("Consider") || key.includes("Review") || key.includes("Evaluation") || key.includes("Actions") || key.includes("Changes") || key.includes("Involved") || key.includes("Independent") || key.includes("Reported") || key.includes("Commitment") || key.includes("Available") || key.includes("Approved") || key.includes("Accessible") || key.includes("Mechanis") || key.includes("Raising") || key.includes("Determined")) {
          if (typeof value === "string" && (value === "yes" || value === "no")) {
            setBool(key, value);
            return;
          } else if (typeof value === "string" && (value === "notApplicable" || value === "yes" || value === "no")) {
            // Handle Yes/No/Not Applicable fields
            setText(key, value);
            return;
          }
        }

        // Handle array fields
        if (Array.isArray(value)) {
          setArray(key, value);
        } else if (typeof value === "number") {
          setNum(key, value);
        } else {
          setText(key, value);
        }
      });

      // Add files for this module
      if (moduleFiles[subModuleKey] && moduleFiles[subModuleKey].length > 0) {
        const fileKey = getFileKeyForModule(subModuleKey);
        if (fileKey) {
          moduleFiles[subModuleKey].forEach((file) => {
            formData.append(fileKey, file);
          });
        } else {
          console.warn("No file key defined for module:", subModuleKey);
        }
      }

      // Add global files only on last submission
      if (activeTab === 16) {
        if (globalFiles && globalFiles.length > 0) {
          globalFiles.forEach((file) => {
            formData.append("governanceDocuments", file);
          });
        }
        formData.append("isAccurate", true);
      }

      const res = await axiosInstance.post("/brand/governance/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        toast.success(`${currentModule.label} saved successfully!`);
        if (activeTab < 16) {
          setActiveTab((prev) => prev + 1);
        } else {
          toast.success("Governance setup completed successfully!");
          navigate("/dashboard");
        }
      } else {
        throw new Error(res.data.message || "Submission failed");
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const getFileKeyForModule = (subModule) => {
    const fileKeys = {
      subModule2_10: "statementSupportingDocument",
      subModule2_12: "remediationSupportingDocuments",
      subModule2_13: "adviceMechanismSupportingDocuments",
      subModule2_14: "complianceSupportingDocuments",
      subModule2_15: "membershipSupportingDocuments",
      subModule2_16: "stakeholderEngagementSupportingDocuments",
      subModule2_17: "cbaSupportingDocuments",
    };
    return fileKeys[subModule] || null;
  };

  // Automatic calculation for Pay Ratio (Sub-Module 2.9)
  const highestPaid = watch("highestPaidIndividualCompensation");
  const medianPaid = watch("medianEmployeeCompensation");
  const highestIncrease = watch("highestPaidIncreasePercentage");
  const medianIncrease = watch("medianIncreasePercentage");

  useEffect(() => {
    const hp = parseFloat(highestPaid);
    const mp = parseFloat(medianPaid);
    if (!isNaN(hp) && !isNaN(mp) && mp !== 0) {
      const ratio = hp / mp;
      const displayRatio = Number.isInteger(ratio) ? ratio : ratio.toFixed(2);
      setValue("compensationRatioComputed", `${displayRatio}:1`);
    } else {
      setValue("compensationRatioComputed", "");
    }
  }, [highestPaid, medianPaid, setValue]);

  useEffect(() => {
    const hi = parseFloat(highestIncrease);
    const mi = parseFloat(medianIncrease);
    if (!isNaN(hi) && !isNaN(mi) && mi !== 0) {
      const ratio = hi / mi;
      const displayRatio = Number.isInteger(ratio) ? ratio : ratio.toFixed(2);
      setValue("increaseRatioComputed", displayRatio.toString());
    } else {
      setValue("increaseRatioComputed", "");
    }
  }, [highestIncrease, medianIncrease, setValue]);

  const handleNext = async () => {
    const isValid = await new Promise((resolve) => {
      handleSubmit(
        () => resolve(true),
        () => resolve(false)
      )();
    });

    if (isValid) {
      handleSubmit(handleModuleSubmit)();
    } else {
      toast.error("Please fill all required fields correctly");
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
    const highestGovernanceBodyOptions = [
      "Board of Directors", "Supervisory Board", "Management Board", "Executive Board",
      "Board of Trustees", "Partners / Partnership Board", "Owner / Sole Proprietor",
      "Cooperative Board", "Governing Council", "Other"
    ];

    switch (activeTab) {
      case 0:
        return (
          <div className="space-y-8">
            <h2 className="text-xl font-semibold text-gray-700">
              <span className="text-[#4639AA]">Sub-Module 2.1: Governance Structure & Composition</span>
            </h2>
            <div className="space-y-6">


              <div>
                <InfoLabel
                  label="What is the governance structure of the organization?"
                  info="Describe the organization’s governance framework, including governing bodies and management structure."
                />
                <textarea rows={3} {...register("governanceStructure")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="e.g. Board of Directors and Executive Management" />
                {errors.governanceStructure && <p className="text-red-500 text-sm mt-1">{errors.governanceStructure.message}</p>}
              </div>

              <div>
                <InfoLabel
                  label="What is the highest governance body?"
                  info="Identify the body with ultimate authority over strategic direction and oversight of the organization."
                />
                <select {...register("highestGovernanceBody")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] bg-white">
                  <option value="">Select option</option>
                  {highestGovernanceBodyOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                {errors.highestGovernanceBody && <p className="text-red-500 text-sm mt-1">{errors.highestGovernanceBody.message}</p>}
              </div>

              {watch("highestGovernanceBody") === "Other" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Please specify</label>
                  <input type="text" {...register("highestGovernanceBodyOther")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]" placeholder="Specify highest governance body" />
                </div>
              )}

              <div>
                <InfoLabel
                  label="Number of members in the highest governance body"
                  info="Report the total number of individuals serving on the highest governance body during the reporting period."
                />
                <input type="number" min="1" {...register("membersCount")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]" placeholder="7" />
                {errors.membersCount && <p className="text-red-500 text-sm mt-1">{errors.membersCount.message}</p>}
              </div>

              <div>
                <InfoLabel
                  label="Composition of the highest governance body"
                  info="Describe the composition of the governance body, including executive, non-executive, and independent members."
                />
                <input type="text" {...register("composition")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]" placeholder="e.g. 3 executive, 4 non-executive" />
                {errors.composition && <p className="text-red-500 text-sm mt-1">{errors.composition.message}</p>}
              </div>

              <div>
                <InfoLabel
                  label="How are members of the highest governance body nominated and selected?"
                  info="Explain the formal process used to nominate, select, and appoint members of the highest governance body."
                />
                <textarea rows={3} {...register("nominationSelectionProcess")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="Describe the process..." />
                {errors.nominationSelectionProcess && <p className="text-red-500 text-sm mt-1">{errors.nominationSelectionProcess.message}</p>}
              </div>

              <div>
                <InfoLabel
                  label="Are sustainability-related competencies considered in board selection?"
                  info="Indicate whether expertise related to sustainability or impacts is considered in governance appointments."
                />
                <div className="flex items-center gap-6">
                  <label className="flex items-center">
                    <input type="radio" {...register("sustainabilityCompetenciesConsidered")} value="yes" className="h-4 w-4 text-[#4639AA]" />
                    <span className="ml-2 text-sm text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" {...register("sustainabilityCompetenciesConsidered")} value="no" className="h-4 w-4 text-[#4639AA]" />
                    <span className="ml-2 text-sm text-gray-700">No</span>
                  </label>
                </div>
                {errors.sustainabilityCompetenciesConsidered && <p className="text-red-500 text-sm mt-1">{errors.sustainabilityCompetenciesConsidered.message}</p>}
              </div>

              <div>
                <InfoLabel
                  label="Is the Chair of the highest governance body independent?"
                  info="State whether the Chair is independent of executive management."
                />
                <div className="flex items-center gap-6">
                  <label className="flex items-center">
                    <input type="radio" {...register("isChairIndependent")} value="yes" className="h-4 w-4 text-[#4639AA]" />
                    <span className="ml-2 text-sm text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" {...register("isChairIndependent")} value="no" className="h-4 w-4 text-[#4639AA]" />
                    <span className="ml-2 text-sm text-gray-700">No</span>
                  </label>
                </div>
                {errors.isChairIndependent && <p className="text-red-500 text-sm mt-1">{errors.isChairIndependent.message}</p>}
              </div>

              {watch("isChairIndependent") === "no" && (
                <div>
                  <InfoLabel
                    label="If the Chair is not independent, describe safeguards"
                    info="Describe measures used to prevent conflicts of interest when the Chair is not independent."
                  />
                  <textarea rows={3} {...register("chairNotIndependentSafeguards")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="Describe safeguards..." />
                </div>
              )}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-8">
            <h2 className="text-xl font-semibold text-gray-700">
              <span className="text-[#4639AA]">Sub-Module 2.2: Governance Oversight of Sustainability</span>
            </h2>
            <div className="space-y-6">
              <div>
                <InfoLabel
                  label="How does the highest governance body oversee sustainability impacts?"
                  info="Describe how the governance body oversees impacts on the economy, environment, and people."
                />
                <textarea rows={3} {...register("oversightSustainabilityImpacts")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="Describe the process..." />
                {errors.oversightSustainabilityImpacts && <p className="text-red-500 text-sm mt-1">{errors.oversightSustainabilityImpacts.message}</p>}
              </div>

              <div>
                <InfoLabel
                  label="How are sustainability responsibilities delegated to management?"
                  info="Explain how responsibility for managing impacts is assigned within management."
                />
                <textarea rows={3} {...register("delegationSustainabilityResponsibilities")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="Describe the delegation..." />
                {errors.delegationSustainabilityResponsibilities && <p className="text-red-500 text-sm mt-1">{errors.delegationSustainabilityResponsibilities.message}</p>}
              </div>

              <div>
                <InfoLabel
                  label="Is there a committee responsible for sustainability matters?"
                  info="Indicate whether a committee or equivalent body oversees sustainability-related topics."
                />
                <input type="text" {...register("sustainabilityCommittee")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]" placeholder="e.g. Sustainability Committee" />
              </div>

              <div>
                <InfoLabel
                  label="Does the governance body review sustainability information before publication?"
                  info="Confirm whether the highest governance body reviews and approves reported sustainability information."
                />
                <div className="flex items-center gap-6">
                  <label className="flex items-center">
                    <input type="radio" {...register("reviewSustainabilityInfo")} value="yes" className="h-4 w-4 text-[#4639AA]" />
                    <span className="ml-2 text-sm text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" {...register("reviewSustainabilityInfo")} value="no" className="h-4 w-4 text-[#4639AA]" />
                    <span className="ml-2 text-sm text-gray-700">No</span>
                  </label>
                </div>
                {errors.reviewSustainabilityInfo && <p className="text-red-500 text-sm mt-1">{errors.reviewSustainabilityInfo.message}</p>}
              </div>

              <div>
                <InfoLabel
                  label="How does the governance body consider sustainability in strategy decisions?"
                  info="Describe how sustainability considerations are integrated into strategic decision-making."
                />
                <textarea rows={3} {...register("considerSustainabilityInStrategy")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="Describe how sustainability is considered..." />
                {errors.considerSustainabilityInStrategy && <p className="text-red-500 text-sm mt-1">{errors.considerSustainabilityInStrategy.message}</p>}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <h2 className="text-xl font-semibold text-gray-700">
              <span className="text-[#4639AA]">Sub-Module 2.3: Conflicts of Interest</span>
            </h2>
            <div className="space-y-6">
              {/* Basic conflicts processes */}
              <div>
                <InfoLabel
                  label="Does the organization have processes to identify, prevent, and mitigate conflicts of interest?"
                  info="Confirm whether formal processes exist to identify and manage conflicts of interest."
                />
                <div className="flex items-center gap-6">
                  <label className="flex items-center"><input type="radio" {...register("hasConflictOfInterestProcesses")} value="yes" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">Yes</span></label>
                  <label className="flex items-center"><input type="radio" {...register("hasConflictOfInterestProcesses")} value="no" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">No</span></label>
                </div>
              </div>

              <div>
                <InfoLabel
                  label="Describe the processes used to prevent and mitigate conflicts of interest"
                  info="Explain mechanisms used to prevent, identify, and address conflicts of interest."
                />
                <textarea rows={2} {...register("conflictOfInterestProcessesDescription")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="Annual declarations, recusal from decisions..." />
              </div>

              <div>
                <InfoLabel
                  label="Are conflicts of interest related to the highest governance body disclosed to stakeholders?"
                  info="Indicate whether material conflicts of interest are disclosed transparently."
                />
                <div className="flex items-center gap-6">
                  <label className="flex items-center"><input type="radio" {...register("discloseConflictsToStakeholders")} value="yes" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">Yes</span></label>
                  <label className="flex items-center"><input type="radio" {...register("discloseConflictsToStakeholders")} value="no" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">No</span></label>
                </div>
              </div>

              {/* Cross-Board Memberships */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Cross-Board Memberships</h3>
                <div>
                  <InfoLabel
                    label="Do any members hold cross-board memberships?"
                    info="State whether governance members serve on boards of other organizations."
                  />
                  <div className="flex items-center gap-6">
                    <label className="flex items-center"><input type="radio" {...register("hasCrossBoardMemberships")} value="yes" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">Yes</span></label>
                    <label className="flex items-center"><input type="radio" {...register("hasCrossBoardMemberships")} value="no" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">No</span></label>
                  </div>
                </div>
                {watch("hasCrossBoardMemberships") === "yes" && (
                  <>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">If yes, describe cross-board memberships and disclose overlaps if material</label>
                      <textarea rows={2} {...register("crossBoardMembershipsDescription")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="Describe members' cross-board roles and overlaps" />
                    </div>
                  </>
                )}
                {/* Controlling Shareholders */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Controlling Shareholders</h3>
                  <div>
                    <InfoLabel
                      label="Does the organization have controlling shareholders?"
                      info="Disclose whether any shareholder has controlling influence over the organization."
                    />
                    <div className="flex items-center gap-6">
                      <label className="flex items-center"><input type="radio" {...register("hasControllingShareholders")} value="yes" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">Yes</span></label>
                      <label className="flex items-center"><input type="radio" {...register("hasControllingShareholders")} value="no" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">No</span></label>
                    </div>
                  </div>
                  {watch("hasControllingShareholders") === "yes" && (
                    <>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">If yes, is the existence of controlling shareholders disclosed to stakeholders?</label>
                        <div className="flex items-center gap-6">
                          <label className="flex items-center"><input type="radio" {...register("discloseControllingShareholders")} value="yes" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">Yes</span></label>
                          <label className="flex items-center"><input type="radio" {...register("discloseControllingShareholders")} value="no" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">No</span></label>
                        </div>
                      </div>
                      {watch("discloseControllingShareholders") === "yes" && (
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">If disclosed, identify the controlling shareholder(s).</label>
                          <input type="text" {...register("controllingShareholdersDescription")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]" placeholder="ABC Holdings owns 65% of shares..." />
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Related Parties */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Related Parties</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Are there related parties with whom the organization has relationships, transactions, or outstanding balances?</label>
                    <div className="flex items-center gap-6">
                      <label className="flex items-center"><input type="radio" {...register("hasRelatedParties")} value="yes" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">Yes</span></label>
                      <label className="flex items-center"><input type="radio" {...register("hasRelatedParties")} value="no" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">No</span></label>
                    </div>
                  </div>
                  {watch("hasRelatedParties") === "yes" && (
                    <>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">If yes, are these related-party relationships, transactions, and balances disclosed to stakeholders?</label>
                        <div className="flex items-center gap-6">
                          <label className="flex items-center"><input type="radio" {...register("discloseRelatedParties")} value="yes" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">Yes</span></label>
                          <label className="flex items-center"><input type="radio" {...register("discloseRelatedParties")} value="no" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">No</span></label>
                        </div>
                      </div>
                      {watch("discloseRelatedParties") === "yes" && (
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">If disclosed, describe the related parties, relationships, transactions, and outstanding balances.</label>
                          <textarea rows={2} {...register("relatedPartiesDescription")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="Lease with sister company; outstanding balance..." />
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <h2 className="text-xl font-semibold text-gray-700">
              <span className="text-[#4639AA]">Sub-Module 2.4: Communication of Critical Concerns</span>
            </h2>
            <div className="space-y-6">
              {/* Critical Concerns Communication */}
              <div>
                <InfoLabel
                  label="Does the organization have processes to communicate critical concerns to the highest governance body?"
                  info="Confirm whether concerns about significant negative impacts are escalated to governance level."
                />
                <div className="flex items-center gap-6">
                  <label className="flex items-center"><input type="radio" {...register("hasCommunicationProcesses")} value="yes" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">Yes</span></label>
                  <label className="flex items-center"><input type="radio" {...register("hasCommunicationProcesses")} value="no" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">No</span></label>
                </div>
              </div>

              <div>
                <InfoLabel
                  label="Describe how critical concerns are communicated"
                  info="Explain the formal channels used to report critical concerns to governance bodies."
                />
                <textarea rows={2} {...register("communicationProcessesDescription")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="Through internal audit reports and whistleblowing summaries..." />
              </div>

              <div>
                <InfoLabel
                  label="Total number of critical concerns communicated"
                  info="Report the number of critical concerns raised during the reporting period."
                />
                <input type="number" min="0" {...register("criticalConcernsCount")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]" placeholder="3" />
              </div>

              <div>
                <InfoLabel
                  label="Describe the nature of the critical concerns communicated"
                  info="Summarize the types of concerns related to actual or potential negative impacts."
                />
                <textarea rows={2} {...register("criticalConcernsNature")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="Health & safety incident, data privacy breach..." />
              </div>

              {/* Knowledge, Skills, and Experience Advancement */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Knowledge, Skills, and Experience Advancement</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Has the organization taken measures to advance the collective knowledge, skills, and experience of the highest governance body on sustainable development?</label>
                  <div className="flex items-center gap-6">
                    <label className="flex items-center"><input type="radio" {...register("advancedCollectiveKnowledge")} value="yes" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">Yes</span></label>
                    <label className="flex items-center"><input type="radio" {...register("advancedCollectiveKnowledge")} value="no" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">No</span></label>
                  </div>
                </div>

                {watch("advancedCollectiveKnowledge") === "yes" && (
                  <>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Describe the measures taken to advance the collective knowledge of the highest governance body on sustainable development.</label>
                      <textarea rows={2} {...register("knowledgeMeasures")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="ESG briefings, expert-led workshops..." />
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Describe the measures taken to advance the skills of the highest governance body on sustainable development.</label>
                      <textarea rows={2} {...register("skillsMeasures")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="Climate risk training, human rights training..." />
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Describe the measures taken to advance the experience of the highest governance body on sustainable development.</label>
                      <textarea rows={2} {...register("experienceMeasures")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="Appointment of directors with ESG background..." />
                    </div>
                  </>
                )}
              </div>

              {/* Sustainability-Related Learning Activities */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Sustainability-Related Learning Activities</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">During the reporting period, did members of the highest governance body participate in sustainability-related learning activities?</label>
                  <div className="flex items-center gap-6">
                    <label className="flex items-center"><input type="radio" {...register("participatedInLearning")} value="yes" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">Yes</span></label>
                    <label className="flex items-center"><input type="radio" {...register("participatedInLearning")} value="no" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">No</span></label>
                  </div>
                </div>

                {watch("participatedInLearning") === "yes" && (
                  <>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">If yes, specify the types of learning activities provided.</label>
                      <div className="space-y-2">
                        {["External ESG seminars", "Internal strategy sessions", "Workshops", "Training programs", "Conferences", "Online courses", "Expert briefings"].map((activity) => (
                          <label key={activity} className="flex items-center">
                            <input type="checkbox" {...register("learningActivitiesTypes")} value={activity} className="h-4 w-4 text-[#4639AA] border-gray-300 rounded" />
                            <span className="ml-2 text-sm text-gray-700">{activity}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">How frequently are sustainability-related learning activities provided to the highest governance body?</label>
                      <select {...register("learningFrequency")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] bg-white">
                        <option value="">Select frequency</option>
                        <option value="Not provided">Not provided</option>
                        <option value="Ad hoc / As needed">Ad hoc / As needed</option>
                        <option value="Annually">Annually</option>
                        <option value="Biannually">Biannually</option>
                        <option value="Quarterly">Quarterly</option>
                        <option value="More than once per year">More than once per year</option>
                        <option value="Integrated into regular board meetings">Integrated into regular board meetings</option>
                        <option value="Ongoing / Continuous learning">Ongoing / Continuous learning</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {watch("learningFrequency") === "Other" && (
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Please specify other frequency</label>
                        <input type="text" {...register("learningFrequencyOther")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]" placeholder="Specify other frequency..." />
                      </div>
                    )}

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Who delivers sustainability-related learning to the highest governance body?</label>
                      <div className="space-y-2">
                        {["External experts", "Internal ESG team", "Consultants", "Academic institutions", "Professional associations", "Industry bodies"].map((delivery) => (
                          <label key={delivery} className="flex items-center">
                            <input type="checkbox" {...register("learningDelivery")} value={delivery} className="h-4 w-4 text-[#4639AA] border-gray-300 rounded" />
                            <span className="ml-2 text-sm text-gray-700">{delivery}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <h2 className="text-xl font-semibold text-gray-700">
              <span className="text-[#4639AA]">Sub-Module 2.5: Remuneration & Pay Equity</span>
            </h2>
            <div className="space-y-6">
              <div>
                <InfoLabel
                  label="Does the organization have a remuneration policy?"
                  info="Confirm whether formal remuneration policies exist for governance and senior executives."
                />
                <div className="flex items-center gap-6">
                  <label className="flex items-center"><input type="radio" {...register("hasRemunerationPolicy")} value="yes" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">Yes</span></label>
                  <label className="flex items-center"><input type="radio" {...register("hasRemunerationPolicy")} value="no" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">No</span></label>
                </div>
              </div>

              <div>
                <InfoLabel
                  label="Who approves remuneration policies?"
                  info="Identify the body responsible for approving remuneration policies."
                />
                <select {...register("remunerationPolicyApprover")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] bg-white">
                  <option value="">Select approver</option>
                  <option value="Shareholders / General Meeting">Shareholders / General Meeting</option>
                  <option value="Board of Directors">Board of Directors</option>
                  <option value="Supervisory Board">Supervisory Board</option>
                  <option value="Remuneration / Compensation Committee">Remuneration / Compensation Committee</option>
                  <option value="Independent Directors">Independent Directors</option>
                  <option value="Owner / Founder">Owner / Founder</option>
                  <option value="Parent Company Board">Parent Company Board</option>
                  <option value="External Authority / Regulator">External Authority / Regulator</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {watch("remunerationPolicyApprover") === "Other" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Please specify</label>
                  <input type="text" {...register("remunerationPolicyApproverOther")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]" placeholder="Specify approver..." />
                </div>
              )}

              {/* <div>
                <InfoLabel
                  label="Does remuneration consider sustainability performance?"
                  info="Indicate whether remuneration is linked to sustainability or impact-related objectives."
                />
                <div className="flex items-center gap-6">
                  <label className="flex items-center"><input type="radio" {...register("remunerationConsidersSustainability")} value="yes" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">Yes</span></label>
                  <label className="flex items-center"><input type="radio" {...register("remunerationConsidersSustainability")} value="no" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">No</span></label>
                </div>
              </div>

              {watch("remunerationConsidersSustainability") === "yes" && (
                <div>
                  <InfoLabel
                    label="Describe how sustainability factors affect pay"
                    info="Explain how sustainability performance influences remuneration outcomes."
                  />
                  <textarea rows={2} {...register("sustainabilityPayImpactDescription")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="ESG targets linked to bonuses..." />
                </div>
              )}

              <div>
                <InfoLabel
                  label="Ratio of annual total compensation (highest-paid vs median employee)"
                  info="Report the ratio between highest-paid individual and median employee compensation."
                />
                <input type="text" {...register("compensationRatio")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]" placeholder="25:1" />
              </div>

              <div>
                <InfoLabel
                  label="Percentage increase in compensation (highest-paid vs median employee)"
                  info="Report year-on-year changes in compensation for highest-paid and median employees."
                />
                <input type="text" {...register("compensationIncreasePercentage")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]" placeholder="8% vs 6%" />
              </div> */}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-8">
            <h2 className="text-xl font-semibold text-gray-700">
              <span className="text-[#4639AA]">Sub-Module 2.6: Evaluation of the Performance of the Highest Governance Body</span>
            </h2>
            <div className="space-y-6">
              <div>
                <InfoLabel
                  label="Does the organization evaluate governance performance on sustainability oversight?"
                  info="Confirm whether governance performance is evaluated with respect to sustainability oversight."
                />
                <div className="flex items-center gap-6">
                  <label className="flex items-center"><input type="radio" {...register("hasPerformanceEvaluationProcesses")} value="yes" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">Yes</span></label>
                  <label className="flex items-center"><input type="radio" {...register("hasPerformanceEvaluationProcesses")} value="no" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">No</span></label>
                </div>
              </div>

              <div>
                <InfoLabel
                  label="Describe the evaluation processes used"
                  info="Explain how governance performance evaluations are conducted."
                />
                <textarea rows={2} {...register("performanceEvaluationProcessesDescription")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="Annual board evaluation covering ESG oversight..." />
              </div>

              <div>
                <InfoLabel
                  label="Are evaluations conducted independently?"
                  info="Indicate whether governance evaluations involve independent assessment."
                />
                <div className="flex items-center gap-6">
                  <label className="flex items-center"><input type="radio" {...register("independentEvaluations")} value="yes" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">Yes</span></label>
                  <label className="flex items-center"><input type="radio" {...register("independentEvaluations")} value="no" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">No</span></label>
                </div>
              </div>

              {watch("independentEvaluations") === "yes" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">If yes, describe the actions taken in response to the evaluation.</label>
                  <textarea rows={2} {...register("evaluationIndependenceDescription")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="Conducted by external governance consultant..." />
                </div>
              )}

              <div>
                <InfoLabel
                  label="How frequently are evaluations conducted?"
                  info="State how often governance performance evaluations take place."
                />
                <select {...register("evaluationFrequency")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] bg-white">
                  <option value="">Select frequency</option>
                  <option value="Not conducted">Not conducted</option>
                  <option value="Ad hoc / As needed">Ad hoc / As needed</option>
                  <option value="Annually">Annually</option>
                  <option value="Every two years">Every two years</option>
                  <option value="Every three years">Every three years</option>
                  <option value="Upon major organizational changes">Upon major organizational changes</option>
                  <option value="Ongoing / Continuous evaluation">Ongoing / Continuous evaluation</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {watch("evaluationFrequency") === "Other" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Please specify other frequency</label>
                  <input type="text" {...register("evaluationFrequencyOther")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]" placeholder="Specify frequency..." />
                </div>
              )}

              <div>
                <InfoLabel
                  label="Were actions taken following the evaluation?"
                  info="Disclose whether evaluation outcomes resulted in improvements or corrective actions."
                />
                <div className="flex items-center gap-6">
                  <label className="flex items-center"><input type="radio" {...register("actionsTakenFromEvaluation")} value="yes" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">Yes</span></label>
                  <label className="flex items-center"><input type="radio" {...register("actionsTakenFromEvaluation")} value="no" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">No</span></label>
                </div>
              </div>

              {watch("actionsTakenFromEvaluation") === "yes" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">If yes, describe the actions taken in response to the evaluation.</label>
                  <textarea rows={2} {...register("actionsTakenDescription")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="Revised board ESG committee mandate..." />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Did the evaluation result in changes to the composition of the highest governance body?</label>
                <div className="flex items-center gap-6">
                  <label className="flex items-center"><input type="radio" {...register("compositionChangesFromEvaluation")} value="yes" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">Yes</span></label>
                  <label className="flex items-center"><input type="radio" {...register("compositionChangesFromEvaluation")} value="no" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">No</span></label>
                </div>
              </div>

              {watch("compositionChangesFromEvaluation") === "yes" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">If yes, describe the changes made to the composition of the highest governance body.</label>
                  <textarea rows={2} {...register("compositionChangesDescription")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="Appointment of ESG-experienced director..." />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Did the evaluation result in changes to organizational practices related to sustainability oversight?</label>
                <div className="flex items-center gap-6">
                  <label className="flex items-center"><input type="radio" {...register("practiceChangesFromEvaluation")} value="yes" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">Yes</span></label>
                  <label className="flex items-center"><input type="radio" {...register("practiceChangesFromEvaluation")} value="no" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">No</span></label>
                </div>
              </div>

              {watch("practiceChangesFromEvaluation") === "yes" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">If yes, describe the changes to organizational practices.</label>
                  <textarea rows={2} {...register("practiceChangesDescription")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="Enhanced ESG reporting procedures..." />
                </div>
              )}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-8">
            <h2 className="text-xl font-semibold text-gray-700">
              <span className="text-[#4639AA]">Sub-Module 2.7: Remuneration Policies</span>
            </h2>
            <div className="space-y-6">
              <div>
                <InfoLabel
                  label="Does the organization have documented remuneration policies for members of the highest governance body and senior executives?"
                  info="Confirm whether formal, documented remuneration policies exist for governance body members and senior executives."
                />
                <div className="flex items-center gap-6">
                  <label className="flex items-center"><input type="radio" {...register("hasDocumentedRemunerationPolicies")} value="yes" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">Yes</span></label>
                  <label className="flex items-center"><input type="radio" {...register("hasDocumentedRemunerationPolicies")} value="no" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">No</span></label>
                </div>
              </div>

              <div className="border-t pt-6">
                <InfoLabel
                  label="Describe the fixed pay for members of the highest governance body."
                  info="Describe fixed remuneration components provided to members of the highest governance body."
                />
                <textarea rows={2} {...register("fixedPayBoard")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="e.g. Board members receive a fixed annual fee of $50,000" />
              </div>

              {/** Board fixed and variable pay details **/}
              <div className="border-t pt-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Describe the variable pay for members of the highest governance body.</label>
                <textarea rows={2} {...register("variablePayBoard")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="Performance-based bonus up to 20% of annual fixed pay based on ESG and financial targets" />
              </div>

              <div className="mt-4">
                <InfoLabel
                  label="Are there sign-on bonuses or recruitment incentives for members of the highest governance body?"
                  info="Indicate whether recruitment incentives or sign-on bonuses are provided to governance body members."
                />
                <div className="flex items-center gap-6">
                  <label className="flex items-center"><input type="radio" {...register("signOnBonusesBoardPresent")} value="yes" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">Yes</span></label>
                  <label className="flex items-center"><input type="radio" {...register("signOnBonusesBoardPresent")} value="no" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">No</span></label>
                </div>
                {watch("signOnBonusesBoardPresent") === "yes" && (
                  <textarea rows={2} {...register("signOnBonusesBoard")} className="w-full mt-3 px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="e.g. Yes, $10,000 signing bonus for new board members" />
                )}
              </div>

              <div className="mt-6">
                <InfoLabel
                  label="Are termination payments provided to members of the highest governance body?"
                  info="Disclose whether severance or termination payments are provided to governance body members."
                />
                <div className="flex items-center gap-6">
                  <label className="flex items-center"><input type="radio" {...register("terminationPaymentsBoardPresent")} value="yes" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">Yes</span></label>
                  <label className="flex items-center"><input type="radio" {...register("terminationPaymentsBoardPresent")} value="no" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">No</span></label>
                </div>
                {watch("terminationPaymentsBoardPresent") === "yes" && (
                  <textarea rows={2} {...register("terminationPaymentsBoard")} className="w-full mt-3 px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="e.g. Severance pay equal to 6 months of fixed salary" />
                )}
              </div>

              <div className="mt-6">
                <InfoLabel
                  label="Does the organization have clawback policies for members of the highest governance body?"
                  info="State whether remuneration can be reclaimed under defined circumstances."
                />
                <div className="flex items-center gap-6">
                  <label className="flex items-center"><input type="radio" {...register("clawbackPoliciesBoardPresent")} value="yes" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">Yes</span></label>
                  <label className="flex items-center"><input type="radio" {...register("clawbackPoliciesBoardPresent")} value="no" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">No</span></label>
                </div>
                {watch("clawbackPoliciesBoardPresent") === "yes" && (
                  <textarea rows={2} {...register("clawbackPoliciesBoard")} className="w-full mt-3 px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="e.g. Bonuses may be reclaimed if targets are not met or misconduct occurs" />
                )}
              </div>

              <div className="mt-6">
                <InfoLabel
                  label="Describe retirement benefits for members of the highest governance body."
                  info="Describe pension or retirement benefit arrangements for governance body members."
                />
                <textarea rows={2} {...register("retirementBenefitsBoard")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="e.g. Eligible for a pension of 10% of annual fixed pay after 5 years of service" />
              </div>

              <div className="mt-6">
                <InfoLabel
                  label="How do the remuneration policies for the highest governance body relate to ESG and sustainability performance?"
                  info="Explain how remuneration is linked to managing impacts on the economy, environment, and people."
                />
                <textarea rows={2} {...register("remunerationRelationToESGBoard")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="e.g. Board bonuses linked to achievement of ESG targets and sustainability KPIs" />
              </div>

              {/** Senior executives section **/}

              <div className="border-t pt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Does senior management/executive team have remuneration structure?</label>
                <div className="flex items-center gap-6">
                  <label className="flex items-center"><input type="radio" {...register("seniorExecHasRemuneration")} value="yes" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">Yes</span></label>
                  <label className="flex items-center"><input type="radio" {...register("seniorExecHasRemuneration")} value="no" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">No</span></label>
                </div>
              </div>

              {watch("seniorExecHasRemuneration") === "yes" && (
                <div>
                  <InfoLabel
                    label="Describe the fixed pay for senior executives."
                    info="Report fixed salary components for senior executives."
                  />
                  <textarea rows={3} {...register("fixedPayExecutives")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="e.g. Senior executives receive a fixed annual salary ranging from $120,000 – $250,000" />

                  <div className="mt-4">
                    <InfoLabel
                      label="Describe the variable pay for senior executives."
                      info="Describe performance-based or incentive remuneration for senior executives."
                    />
                    <textarea rows={2} {...register("variablePayExecutives")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="e.g. Bonus of up to 30% of annual salary linked to company performance, ESG targets, and personal KPIs" />
                  </div>

                  <div className="mt-4">
                    <InfoLabel
                      label="Are there sign-on bonuses or recruitment incentives for senior executives?"
                      info="Indicate whether recruitment incentives or sign-on bonuses are provided to senior executives."
                    />
                    <div className="flex items-center gap-6">
                      <label className="flex items-center"><input type="radio" {...register("signOnBonusesExecutivesPresent")} value="yes" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">Yes</span></label>
                      <label className="flex items-center"><input type="radio" {...register("signOnBonusesExecutivesPresent")} value="no" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">No</span></label>
                    </div>
                    {watch("signOnBonusesExecutivesPresent") === "yes" && (
                      <textarea rows={2} {...register("signOnBonusesExecutives")} className="w-full mt-3 px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="e.g. Yes, $20,000 signing bonus for new executives" />
                    )}
                  </div>

                  <div className="mt-4">
                    <InfoLabel
                      label="Are termination payments provided to senior executives?"
                      info="Disclose whether severance or termination payments are provided to senior executives."
                    />
                    <div className="flex items-center gap-6">
                      <label className="flex items-center"><input type="radio" {...register("terminationPaymentsExecutivesPresent")} value="yes" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">Yes</span></label>
                      <label className="flex items-center"><input type="radio" {...register("terminationPaymentsExecutivesPresent")} value="no" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">No</span></label>
                    </div>
                    {watch("terminationPaymentsExecutivesPresent") === "yes" && (
                      <textarea rows={2} {...register("terminationPaymentsExecutives")} className="w-full mt-3 px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="e.g. Severance pay equal to 12 months of fixed salary" />
                    )}
                  </div>

                  <div className="mt-4">
                    <InfoLabel
                      label="Does the organization have clawback policies for senior executives?"
                      info="State whether executive remuneration is subject to clawback provisions."
                    />
                    <div className="flex items-center gap-6">
                      <label className="flex items-center"><input type="radio" {...register("clawbackPoliciesExecutivesPresent")} value="yes" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">Yes</span></label>
                      <label className="flex items-center"><input type="radio" {...register("clawbackPoliciesExecutivesPresent")} value="no" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">No</span></label>
                    </div>
                    {watch("clawbackPoliciesExecutivesPresent") === "yes" && (
                      <textarea rows={2} {...register("clawbackPoliciesExecutives")} className="w-full mt-3 px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="e.g. All bonuses are subject to clawback in case of financial misreporting" />
                    )}
                  </div>

                  <div className="mt-4">
                    <InfoLabel
                      label="Describe retirement benefits for senior executives."
                      info="Describe pension or retirement benefit arrangements for senior executives."
                    />
                    <textarea rows={2} {...register("retirementBenefitsExecutives")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="e.g. Pension plan of 15% of annual salary, plus 401(k) contributions" />
                  </div>

                  <div className="mt-4">
                    <InfoLabel
                      label="How do the remuneration policies for senior executives relate to ESG and sustainability performance?"
                      info="Describe how executive pay aligns with sustainability objectives and impact management."
                    />
                    <textarea rows={2} {...register("remunerationRelationToESGExecutives")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="e.g. 25% of variable pay tied to environmental, social, and economic impact performance" />
                  </div>
                </div>
              )}

              <div className="border-t pt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Is sustainability performance linked to remuneration?</label>
                <div className="flex items-center gap-6">
                  <label className="flex items-center"><input type="radio" {...register("sustainabilityLinkedRemuneration")} value="yes" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">Yes</span></label>
                  <label className="flex items-center"><input type="radio" {...register("sustainabilityLinkedRemuneration")} value="no" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">No</span></label>
                </div>
              </div>

              {watch("sustainabilityLinkedRemuneration") === "yes" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Describe how sustainability metrics are incorporated into remuneration</label>
                  <textarea rows={2} {...register("sustainabilityRemunDetails")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="Climate targets, social impact KPIs, governance metrics..." />
                </div>
              )}

              <div className="border-t pt-6">
                <InfoLabel
                  label="Are remuneration policies reviewed regularly to align with organizational impacts?"
                  info="Indicate whether remuneration policies are periodically reviewed for alignment with impacts."
                />
                <select {...register("regularReviewRemunerationPolicies")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] bg-white">
                  <option value="">Select review frequency</option>
                  <option value="Annually">Annually</option>
                  <option value="Every two years">Every two years</option>
                  <option value="Every three years">Every three years</option>
                  <option value="As needed / Ad hoc">As needed / Ad hoc</option>
                  <option value="No formal schedule">No formal schedule</option>
                  <option value="Other">Other</option>
                </select>

                <div className="mt-4">
                  <InfoLabel
                    label="Date of last remuneration policy review."
                    info="Report the most recent date the remuneration policy was reviewed."
                  />
                  <input type="date" {...register("lastRemunerationReviewDate")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]" />
                </div>

                {watch("regularReviewRemunerationPolicies") === "Other" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Please specify review frequency</label>
                    <input type="text" {...register("remunerationPolicyReviewFrequencyOther")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]" placeholder="Specify frequency..." />
                  </div>
                )}

                <div className="mt-4">
                  <InfoLabel
                    label="Person responsible for remuneration policy oversight."
                    info="Identify the role or body responsible for overseeing remuneration policies."
                  />
                  <select {...register("remunerationOversightPerson")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] bg-white">
                    <option value="">Select responsible person</option>
                    <option value="Chief HR Officer">Chief HR Officer</option>
                    <option value="Chair of Remuneration Committee">Chair of Remuneration Committee</option>
                    <option value="Chief Financial Officer">Chief Financial Officer</option>
                    <option value="Board Chair">Board Chair</option>
                    <option value="CEO">CEO</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-8">
            <h2 className="text-xl font-semibold text-gray-700">
              <span className="text-[#4639AA]">Sub-Module 2.8: Process to Determine Remuneration</span>
            </h2>
            <div className="space-y-6">
              <div>
                <InfoLabel
                  label="Does an independent highest governance body member or independent remuneration committee oversee the process of determining remuneration?"
                  info="Confirm whether remuneration decisions are overseen by independent governance members."
                />
                <div className="flex items-center gap-6">
                  <label className="flex items-center"><input type="radio" {...register("independentOversightRemuneration")} value="yes" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">Yes</span></label>
                  <label className="flex items-center"><input type="radio" {...register("independentOversightRemuneration")} value="no" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">No</span></label>
                </div>
              </div>

              <div>
                <InfoLabel
                  label="Describe the composition of the remuneration committee."
                  info="Describe the membership and independence of the remuneration committee."
                />
                <textarea rows={2} {...register("remunerationCommitteeComposition")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="e.g. 3 independent board members with experience in HR, finance, and sustainability" />
              </div>

              <div className="border-t pt-6">
                <InfoLabel
                  label="How are stakeholder views (including shareholders) regarding remuneration sought?"
                  info="Explain how stakeholder input on remuneration is collected."
                />
                <textarea rows={2} {...register("stakeholderViewsSought")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="e.g. Through annual shareholder meetings, surveys, and feedback forms" />
              </div>

              <div>
                <InfoLabel
                  label="How are stakeholder views considered in the remuneration process?"
                  info="Describe how stakeholder feedback influences remuneration decisions."
                />
                <textarea rows={2} {...register("stakeholderViewsConsidered")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="e.g. Feedback influences bonus structures and ESG-linked targets for executives" />
              </div>

              <div className="border-t pt-6">
                <InfoLabel
                  label="Are remuneration consultants involved in determining remuneration?"
                  info="Indicate whether external remuneration consultants are used."
                />
                <div className="flex items-center gap-6">
                  <label className="flex items-center"><input type="radio" {...register("remunerationConsultantsInvolved")} value="yes" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">Yes</span></label>
                  <label className="flex items-center"><input type="radio" {...register("remunerationConsultantsInvolved")} value="no" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">No</span></label>
                </div>
              </div>

              {watch("remunerationConsultantsInvolved") === "yes" && (
                <>
                  <div>
                    <InfoLabel
                      label="Are the remuneration consultants independent of the organization, its highest governance body, and senior executives?"
                      info="Confirm the independence of remuneration consultants from decision-makers."
                    />
                    <div className="flex items-center gap-6">
                      <label className="flex items-center"><input type="radio" {...register("independentRemunerationConsultants")} value="yes" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">Yes</span></label>
                      <label className="flex items-center"><input type="radio" {...register("independentRemunerationConsultants")} value="no" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">No</span></label>
                    </div>
                  </div>

                  <div>
                    <InfoLabel
                      label="How does the organization ensure independence of remuneration consultants?"
                      info="Describe safeguards ensuring consultants’ independence."
                    />
                    <textarea rows={2} {...register("consultantIndependenceAssurance")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="e.g. Consultants have no other contractual relationships with executives or board members" />
                  </div>
                </>
              )}

              <div className="border-t pt-6">
                <InfoLabel
                  label="Were the results of shareholder votes on remuneration policies or proposals reported?"
                  info="State whether outcomes of shareholder votes on remuneration were disclosed."
                />
                <div className="flex items-center gap-6">
                  <label className="flex items-center"><input type="radio" {...register("shareholderVotesReported")} value="yes" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">Yes</span></label>
                  <label className="flex items-center"><input type="radio" {...register("shareholderVotesReported")} value="no" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">No</span></label>
                </div>
              </div>

              {watch("shareholderVotesReported") === "yes" && (
                <div>
                  <InfoLabel
                    label="Report the results of the most recent shareholder vote on remuneration."
                    info="Provide voting outcomes related to remuneration proposals."
                  />
                  <textarea rows={2} {...register("shareholderVoteResults")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="e.g. Approved: 85%, Against: 10%, Abstained: 5%" />
                </div>
              )}

              <div className="border-t pt-6">
                <InfoLabel
                  label="Describe the process for designing remuneration policies."
                  info="Explain how remuneration policies are developed and approved."
                />
                <textarea rows={2} {...register("designingRemunerationPoliciesProcess")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="e.g. HR and finance departments draft policies; reviewed by remuneration committee; benchmarked against industry and ESG targets" />
              </div>

              <div>
                <InfoLabel
                  label="Describe the process for determining individual remuneration."
                  info="Describe how individual pay levels are determined."
                />
                <textarea rows={2} {...register("determiningIndividualRemunerationProcess")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="e.g. Base salary set by role and experience; variable pay linked to financial and ESG KPIs; approved by remuneration committee" />
              </div>

              <div className="border-t pt-6">
                <InfoLabel
                  label="Date of last review of remuneration determination process."
                  info="Report when the remuneration determination process was last reviewed."
                />
                <input type="date" {...register("lastReviewRemunerationProcessDate")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] bg-white" />
              </div>

              <div>
                <InfoLabel
                  label="Person responsible for overseeing the remuneration determination process."
                  info="Identify the role responsible for remuneration governance."
                />
                <select {...register("remunerationProcessOversightPerson")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] bg-white">
                  <option value="">Select responsible person</option>
                  <option value="Chair of Remuneration Committee">Chair of Remuneration Committee</option>
                  <option value="Chief HR Officer">Chief HR Officer</option>
                  <option value="Chief Financial Officer">Chief Financial Officer</option>
                  <option value="Board Chair">Board Chair</option>
                  <option value="CEO">CEO</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-8">
            <h2 className="text-xl font-semibold text-gray-700">
              <span className="text-[#4639AA]">Sub-Module 2.9: Annual Total Compensation Ratio</span>
            </h2>
            <div className="space-y-6">
              <div>
                <InfoLabel
                  label="Enter the total annual compensation of the highest-paid individual."
                  info="Report total annual compensation for the highest-paid individual."
                />
                <input type="number"  {...register("highestPaidIndividualCompensation")}
                  className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]"
                  placeholder="$50,000" />
              </div>

              <div>
                <InfoLabel
                  label="Enter the median total annual compensation of all other employees."
                  info="Report the median total annual compensation of employees."
                />
                <input type="number" {...register("medianEmployeeCompensation")}
                  className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]"
                  placeholder="$50,000" />
              </div>

              {/* This field is automatically calculated as: Highest Paid ÷ Median Paid */}
              <div className="bg-[#F0EEFF] border border-[#4639AA] rounded-lg p-4">
                <label className="block text-sm font-medium text-[#4639AA] mb-1">
                  Compensation Ratio (Highest Paid : Median)</label>
                <input type="text" {...register("compensationRatioComputed")} readOnly className="w-full px-4 py-2.5 border border-[#4639AA] bg-white outline-none rounded-lg text-[#4639AA] font-semibold"
                  placeholder="Ratio will be calculated automatically (e.g., 10:1)..." />
              </div>

              {/* <div className="border-t pt-6">
                <InfoLabel
                  label="Calculate the ratio of the percentage increase for the highest-paid individual to the median percentage increase."
                  info="Calculate the ratio of compensation increases."
                />
                <input type="number" step="0.01" {...register("highestPaidIncreasePercentage")}
                  className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]"
                  placeholder="e.g. 5" />
              </div> */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enter the annual percentage increase in total compensation for the highest-paid individual.</label>
                <input type="number" step="0.01" {...register("highestPaidIncreasePercentage")}
                  className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]"
                  placeholder="e.g. 5" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enter the median annual percentage increase in total compensation for all other employees (%)</label>
                <input type="number" step="0.01" {...register("medianIncreasePercentage")}
                  className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]"
                  placeholder="e.g. 3" />
              </div>

              <div className="bg-[#F0EEFF] border border-[#4639AA] rounded-lg p-4">
                <label className="block text-sm font-medium text-[#4639AA] mb-1">
                  Increase Ratio (Highest % ÷ Median %)</label>
                <input type="text" {...register("increaseRatioComputed")} readOnly className="w-full px-4 py-2.5 border border-[#4639AA] bg-white outline-none rounded-lg text-[#4639AA] font-semibold" placeholder="Ratio will be calculated automatically (e.g., 1.67)..." />
                <p className="text-xs text-[#4639AA] mt-2">This field shows the ratio of percentage increases</p>
              </div>

              <div className="border-t pt-6">
                <InfoLabel
                  label="Describe any adjustments made to total compensation for comparability."
                  info="Explain adjustments used to ensure comparability of compensation data."
                />
                <textarea rows={2} {...register("compensationAdjustmentsDescription")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="e.g. Bonuses included; part-time employees annualized..." />
              </div>

              <div>
                <InfoLabel
                  label="Explain the methodology used to calculate the median compensation."
                  info="Describe how the median employee compensation was calculated."
                />
                <textarea rows={2} {...register("medianCalculationMethodology")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="e.g. Median calculated based on full-time equivalent salaries, excluding highest-paid individual..." />
              </div>

              <div>
                <InfoLabel
                  label="Provide any contextual information necessary to understand the compensation data."
                  info="Provide context to support interpretation of compensation disclosures."
                />
                <textarea rows={2} {...register("compensationContextualInfo")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="e.g. Includes all employees globally; excludes contractors; data based on fiscal year 2025..." />
              </div>

              <div className="border-t pt-6">
                <InfoLabel
                  label="Date of data compilation."
                  info="Report the date compensation data was compiled."
                />
                <input type="date" {...register("dataCompilationDate")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] bg-white" />
              </div>

              <div>
                <InfoLabel
                  label="Person responsible for compensation data reporting."
                  info="Identify who is responsible for reporting compensation data."
                />
                <select {...register("compensationReportingPerson")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] bg-white">
                  <option value="">Select responsible person</option>
                  <option value="Chief HR Officer">Chief HR Officer</option>
                  <option value="Payroll Manager">Payroll Manager</option>
                  <option value="Chief Financial Officer">Chief Financial Officer</option>
                  <option value="Compensation Manager">Compensation Manager</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 9:
        return (
          <div className="space-y-8">
            <h2 className="text-xl font-semibold text-gray-700">
              <span className="text-[#4639AA]">Sub-Module 2.10: Statement on Sustainable Development Strategy</span>
            </h2>
            <div className="space-y-6">
              <div>
                <InfoLabel
                  label="Does the organization provide a statement from the highest governance body or most senior executive on sustainable development?"
                  info="Confirm whether a formal sustainability statement from senior leadership is provided."
                />
                <div className="flex items-center gap-6">
                  <label className="flex items-center">
                    <input type="radio" {...register("hasSustainabilityStatement")}
                      value="yes" className="h-4 w-4 text-[#4639AA]" />
                    <span className="ml-2 text-sm text-gray-700">Yes</span></label>

                  <label className="flex items-center">
                    <input type="radio" {...register("hasSustainabilityStatement")}
                      value="no" className="h-4 w-4 text-[#4639AA]" />
                    <span className="ml-2 text-sm text-gray-700">No</span></label>
                </div>
              </div>

              {watch("hasSustainabilityStatement") === "yes" && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <InfoLabel
                        label="Name of the person providing the statement"
                        info="Identify the senior leader issuing the sustainability statement."
                      />
                      <input type="text" {...register("statementProviderName")} placeholder="e.g. Jane Doe"
                        className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]" />
                    </div>

                    <div>
                      <InfoLabel
                        label="Title of the person providing the statement"
                        info="Identify the senior leader’s official title."
                      />
                      <input type="text" {...register("statementProviderTitle")} placeholder="e.g. CEO, Board Chair"
                        className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]" />
                    </div>
                  </div>

                  <div>
                    <InfoLabel
                      label="Provide the statement regarding the relevance of sustainable development to the organization"
                      info="Provide a leadership statement on sustainability’s relevance to strategy and performance."
                    />
                    <textarea rows={3} {...register("sustainabilityStatement")}
                      className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y"
                      placeholder="Sustainable development is core to our strategy, guiding decisions across operations, supply chain, and stakeholder engagement..." />
                  </div>

                  <div>
                    <InfoLabel
                      label="Describe how sustainable development is integrated into the organization's strategy"
                      info="Explain how sustainability is embedded in organizational strategy."
                    />
                    <textarea rows={2} {...register("sustainabilityIntegrationDescription")}
                      className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y"
                      placeholder="ESG goals linked to business KPIs, renewable energy adoption, community programs, circular economy initiatives..." />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <InfoLabel
                        label="Date of the statement"
                        info="Report the date the sustainability statement was issued."
                      />
                      <input type="date" {...register("statementDate")}
                        className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] bg-white" />
                    </div>

                    <div>
                      <InfoLabel
                        label="Person responsible for the content and approval of the statement"
                        info="Identify who approved and is accountable for the statement’s content."
                      />
                      <select {...register("statementResponsiblePerson")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] bg-white">
                        <option value="">Select responsible person</option>
                        <option value="Chief Executive Officer">Chief Executive Officer</option>
                        <option value="Chief Sustainability Officer">Chief Sustainability Officer</option>
                        <option value="Board Chair">Board Chair</option>
                        <option value="Chief Financial Officer">Chief Financial Officer</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="border-t pt-6 space-y-4">
                    {/* Label */}
                    <InfoLabel
                      label="Upload supporting document for the statement"
                      info="Upload documentation supporting the sustainability statement, if available."
                    />

                    {/* Upload Box */}
                    <label className="relative flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-[#4639AA]/40 rounded-xl cursor-pointer bg-slate-50 hover:border-[#4639AA] transition">
                      <Icon
                        icon="mdi:cloud-upload-outline"
                        className="text-4xl text-gray-300 mb-2"
                      />

                      <p className="text-sm font-medium text-gray-700">
                        Click to upload or drag & drop
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PDF, DOC, XLS, PNG, JPG • Max 5MB per file
                      </p>

                      <input
                        type="file"
                        multiple
                        onChange={(e) => {
                          const files = Array.from(e.target.files || []);
                          setModuleFiles((prev) => ({
                            ...prev,
                            subModule2_10: [...(prev.subModule2_10 || []), ...files],
                          }));
                        }}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />

                      {/* Selected Files */}
                      {moduleFiles.subModule2_10?.length > 0 && (
                        <div className="w-full mt-4 border-t pt-3">
                          <ul className="space-y-2">
                            {moduleFiles.subModule2_10.map((file, idx) => (
                              <li
                                key={idx}
                                className="flex items-center gap-2 text-sm text-blue-800"
                              >
                                <Icon
                                  icon="mdi:file-document-outline"
                                  className="text-[#4639AA] shrink-0"
                                />
                                <span className="truncate">{file.name}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </label>
                  </div>
                </>
              )}
            </div>
          </div>
        );

      case 10:
        return (
          <div className="space-y-8">
            <h2 className="text-xl font-semibold text-gray-700">
              <span className="text-[#4639AA]">Sub-Module 2.11: Policy Commitments for Responsible Business Conduct</span>
            </h2>
            <div className="space-y-6">
              <div>
                <InfoLabel
                  label="Does the organization have policy commitments for responsible business conduct?"
                  info="Confirm whether formal policy commitments exist for responsible business conduct."
                />
                <div className="flex items-center gap-6">
                  <label className="flex items-center"><input type="radio" {...register("hasResponsibleBusinessPolicies")} value="yes" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">Yes</span></label>
                  <label className="flex items-center"><input type="radio" {...register("hasResponsibleBusinessPolicies")} value="no" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">No</span></label>
                </div>
              </div>

              {watch("hasResponsibleBusinessPolicies") === "yes" && (
                <>
                  <div>
                    <InfoLabel
                      label="Which authoritative intergovernmental instruments do these policy commitments reference? (Select all that apply)"
                      info="Identify recognized international instruments referenced in the policy commitments."
                    />
                    <div className="space-y-2">
                      {[
                        { id: "ungp", label: "UN Guiding Principles on Business and Human Rights" },
                        { id: "oecdGuidelines", label: "OECD Guidelines for Multinational Enterprises" },
                        { id: "iloConventions", label: "ILO Core Conventions" },
                        { id: "universalDeclaration", label: "Universal Declaration of Human Rights" },
                        { id: "sdgs", label: "UN Sustainable Development Goals" },
                        { id: "iloDeclaration", label: "ILO Declaration on Fundamental Principles and Rights at Work" },
                        { id: "other", label: "Other" }
                      ].map((item) => (
                        <label key={item.id} className="flex items-center">
                          <input type="checkbox" {...register("authoritativeInstruments")} value={item.id} className="h-4 w-4 text-[#4639AA] rounded" />
                          <span className="ml-2 text-sm text-gray-700">{item.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <InfoLabel
                      label="Do the policy commitments stipulate conducting due diligence?"
                      info="Indicate whether the policies require due diligence to identify and manage impacts."
                    />
                    <div className="flex items-center gap-6">
                      <label className="flex items-center"><input type="radio" {...register("policiesStipulateDueDiligence")} value="yes" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">Yes</span></label>
                      <label className="flex items-center"><input type="radio" {...register("policiesStipulateDueDiligence")} value="no" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">No</span></label>
                    </div>
                  </div>

                  <div>
                    <InfoLabel
                      label="Do the policy commitments stipulate applying the precautionary principle?"
                      info="State whether the organization commits to applying the precautionary principle."
                    />
                    <div className="flex items-center gap-6">
                      <label className="flex items-center"><input type="radio" {...register("policiesStipulatePrecautionaryPrinciple")} value="yes" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">Yes</span></label>
                      <label className="flex items-center"><input type="radio" {...register("policiesStipulatePrecautionaryPrinciple")} value="no" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">No</span></label>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-4">Human Rights Commitments</h3>

                    <div>
                      <InfoLabel
                        label="Do the policy commitments stipulate respecting human rights?"
                        info="Confirm whether the policies include a commitment to respect human rights."
                      />
                      <div className="flex items-center gap-6">
                        <label className="flex items-center"><input type="radio" {...register("policiesStipulateHumanRights")} value="yes" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">Yes</span></label>
                        <label className="flex items-center"><input type="radio" {...register("policiesStipulateHumanRights")} value="no" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">No</span></label>
                      </div>
                    </div>

                    {watch("policiesStipulateHumanRights") === "yes" && (
                      <>
                        <div className="mt-4">
                          <InfoLabel
                            label="Describe the organization's specific policy commitment to respect human rights"
                            info="Describe how the organization commits to respecting human rights in its policies."
                          />
                          <textarea rows={2} {...register("humanRightsCommitmentDescription")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="e.g. Commitment aligned with UNGPs and OECD Guidelines" />
                        </div>

                        <div className="mt-4">
                          <InfoLabel
                            label="Which internationally recognized human rights are covered by this commitment? (Select all that apply)"
                            info="Identify the internationally recognized human rights referenced in the commitment."
                          />
                          <div className="space-y-2">
                            {[
                              { id: "iloCoreLaborRights", label: "ILO Core Labor Rights" },
                              { id: "childLabor", label: "Child Labor Prohibition" },
                              { id: "forcedLabor", label: "Forced Labor Prohibition" },
                              { id: "freedomAssociation", label: "Freedom of Association & Collective Bargaining" },
                              { id: "healthSafety", label: "Health & Safety" },
                              { id: "wagesFairCompensation", label: "Fair Wages & Compensation" },
                              { id: "workingHours", label: "Working Hours Standards" },
                              { id: "landRights", label: "Land & Property Rights" },
                              { id: "culturalRights", label: "Cultural and Indigenous Rights" },
                              { id: "accessJustice", label: "Access to Justice & Remediation" },
                              { id: "freedomSpeech", label: "Freedom of Speech & Expression" },
                              { id: "other", label: "Other" }
                            ].map((item) => (
                              <label key={item.id} className="flex items-center">
                                <input type="checkbox" {...register("humanRightsInstrumentsCovered")} value={item.id} className="h-4 w-4 text-[#4639AA] rounded" />
                                <span className="ml-2 text-sm text-gray-700">{item.label}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div className="mt-4">
                          <InfoLabel
                            label="Which stakeholder groups are given particular attention in the commitment, including at-risk or vulnerable groups? (Select all that apply)"
                            info="Identify stakeholder groups specifically addressed in the policy commitments."
                          />
                          <div className="space-y-2">
                            {[
                              { id: "workers", label: "Workers & Employees" },
                              { id: "contractLabor", label: "Contract & Temporary Labor" },
                              { id: "localCommunities", label: "Local Communities" },
                              { id: "indigenous", label: "Indigenous Peoples" },
                              { id: "children", label: "Children" },
                              { id: "women", label: "Women & Girls" },
                              { id: "migrants", label: "Migrant Workers" },
                              { id: "minorities", label: "Ethnic & Religious Minorities" },
                              { id: "disabled", label: "People with Disabilities" },
                              { id: "lgbtq", label: "LGBTQ+ Persons" },
                              { id: "suppliers", label: "Suppliers & Business Partners" },
                              { id: "consumers", label: "Consumers & Customers" }
                            ].map((item) => (
                              <label key={item.id} className="flex items-center">
                                <input type="checkbox" {...register("stakeholderGroupsAttention")} value={item.id} className="h-4 w-4 text-[#4639AA] rounded" />
                                <span className="ml-2 text-sm text-gray-700">{item.label}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-4">Public Availability & Approval</h3>

                    <div>
                      <InfoLabel
                        label="Are the policy commitments publicly available?"
                        info="Indicate whether the policy commitments are publicly accessible."
                      />
                      <div className="flex items-center gap-6">
                        <label className="flex items-center"><input type="radio" {...register("policiesPubliclyAvailable")} value="yes" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">Yes</span></label>
                        <label className="flex items-center"><input type="radio" {...register("policiesPubliclyAvailable")} value="no" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">No</span></label>
                      </div>
                    </div>

                    {watch("policiesPubliclyAvailable") === "yes" && (
                      <div className="mt-4">
                        <InfoLabel
                          label="Provide a link to the policy commitments"
                          info="Provide a public link to the policy commitments, if applicable."
                        />
                        <input type="url" {...register("policiesPublicLink")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]" placeholder="https://www.company.com/policies" />
                      </div>
                    )}

                    {watch("policiesPubliclyAvailable") === "no" && (
                      <div className="mt-4">
                        <InfoLabel
                          label="If not publicly available, explain the reason"
                          info="Explain why the policy commitments are not publicly available."
                        />
                        <textarea rows={2} {...register("policiesNotPublicReason")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="e.g. Internal policy under review, confidential business reasons" />
                      </div>
                    )}

                    <div className="mt-4">
                      <InfoLabel
                        label="At what level were the policy commitments approved within the organization?"
                        info="Identify the organizational level that approved the policy commitments."
                      />
                      <select {...register("policiesApprovalLevel")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] bg-white">
                        <option value="">Select approval level</option>
                        <option value="Board of Directors">Board of Directors</option>
                        <option value="CEO/Executive">CEO/Executive Level</option>
                        <option value="Senior Management">Senior Management</option>
                        <option value="Middle Management">Middle Management</option>
                        <option value="Department Level">Department Level</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="mt-4">
                      <InfoLabel
                        label="Is this approval at the most senior level of the organization?"
                        info="Confirm whether approval was granted by the highest governance body."
                      />
                      <div className="flex items-center gap-6">
                        <label className="flex items-center"><input type="radio" {...register("policiesApprovedAtSeniorLevel")} value="yes" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">Yes</span></label>
                        <label className="flex items-center"><input type="radio" {...register("policiesApprovedAtSeniorLevel")} value="no" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">No</span></label>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-4">Scope of Application</h3>

                    <div>
                      <InfoLabel
                        label="To what extent do the policy commitments apply to the organization's own activities?"
                        info="Describe the scope of application of the policies to internal operations."
                      />
                      <select {...register("policiesApplyToOwnActivities")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] bg-white">
                        <option value="">Select scope</option>
                        <option value="All operations">All operations globally</option>
                        <option value="Majority of operations">Majority of operations</option>
                        <option value="Specific business units">Specific business units</option>
                        <option value="Specific geographies">Specific geographic regions</option>
                        <option value="Limited scope">Limited scope</option>
                        <option value="Under development">Under development</option>
                      </select>
                    </div>

                    <div className="mt-4">
                      <InfoLabel
                        label="To what extent do the policy commitments apply to business relationships (e.g., suppliers, partners)?"
                        info="Describe how the policies apply to suppliers, partners, or other business relationships."
                      />
                      <select {...register("policiesApplyToBusinessRelationships")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] bg-white">
                        <option value="">Select scope</option>
                        <option value="All suppliers and partners">All suppliers and business partners</option>
                        <option value="Tier-1 suppliers">Tier-1 suppliers only</option>
                        <option value="Major suppliers">Major/critical suppliers</option>
                        <option value="Selected categories">Selected supplier categories</option>
                        <option value="Specific geographies">Specific geographic suppliers</option>
                        <option value="Limited application">Limited application</option>
                        <option value="Under development">Under development</option>
                      </select>
                    </div>

                    <div className="mt-4">
                      <InfoLabel
                        label="How are the policy commitments communicated to workers, business partners, and other relevant parties?"
                        info="Explain how the policy commitments are communicated internally and externally."
                      />
                      <textarea rows={3} {...register("policiesCommunicationMethod")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="e.g. Trainings, supplier contracts, company intranet, public website, stakeholder meetings" />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        );

      case 11:
        return (
          <div className="space-y-8">
            <h2 className="text-xl font-semibold text-gray-700">
              <span className="text-[#4639AA]">Sub-Module 2.12: Embedding Policies in Business Operations</span>
            </h2>
            <div className="space-y-6">
              <div>
                <InfoLabel
                  label="How is responsibility for implementing policy commitments allocated?"
                  info="Describe how responsibility for implementing policy commitments is assigned across the organization."
                />
                <textarea rows={2} {...register("policyResponsibilityAllocation")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="e.g. Compliance team at HQ; site managers locally" />
              </div>

              <div>
                <InfoLabel
                  label="How are policy commitments integrated into organizational strategies?"
                  info="Explain how policy commitments are incorporated into strategic planning."
                />
                <textarea rows={2} {...register("policyIntegrationIntoStrategy")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="e.g. Included in corporate ESG strategy" />
              </div>

              <div>
                <InfoLabel
                  label="How are policy commitments integrated into operational policies and procedures?"
                  info="Describe how policy commitments are embedded in operational processes."
                />
                <textarea rows={2} {...register("policyIntegrationIntoProcedures")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="e.g. Embedded in procurement and HR procedures" />
              </div>

              <div>
                <InfoLabel
                  label="How does the organization implement policy commitments through business relationships?"
                  info="Explain how policy commitments are applied in business relationships."
                />
                <textarea rows={2} {...register("policyImplementationWithPartners")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="e.g. Supplier code of conduct and audits" />
              </div>

              <div className="border-t pt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-4">Training on Policy Commitments</h3>

                <div>
                  <InfoLabel
                    label="What training does the organization provide on implementing policy commitments?"
                    info="Describe training provided to support implementation of policy commitments."
                  />
                  <textarea rows={2} {...register("policyTrainingDescription")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="e.g. Annual ethics and human rights training" />
                </div>

                <div className="mt-4">
                  <InfoLabel
                    label="Who receives training on implementing the policy commitments?"
                    info="Identify the groups receiving training on policy commitments."
                  />
                  <div className="space-y-2">
                    {["Employees", "Managers", "Suppliers", "Contractors", "Partners", "Board Members"].map((recipient) => (
                      <label key={recipient} className="flex items-center">
                        <input type="checkbox" {...register("policyTrainingRecipients")} value={recipient} className="h-4 w-4 text-[#4639AA] rounded" />
                        <span className="ml-2 text-sm text-gray-700">{recipient}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <InfoLabel
                    label="How frequently is training on policy commitments conducted?"
                    info="State how often training on policy commitments is provided."
                  />
                  <select {...register("policyTrainingFrequency")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] bg-white">
                    <option value="">Select frequency</option>
                    <option value="Annually">Annually</option>
                    <option value="Biannually">Biannually</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="On-demand">On-demand</option>
                    <option value="Continuous">Continuous</option>
                  </select>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-4">Remediation Commitments</h3>

                <div>
                  <InfoLabel
                    label="Does the organization have a commitment to provide or cooperate in remediation?"
                    info="Confirm whether the organization commits to remediation of negative impacts."
                  />
                  <div className="flex items-center gap-6">
                    <label className="flex items-center"><input type="radio" {...register("hasRemediationCommitment")} value="yes" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">Yes</span></label>
                    <label className="flex items-center"><input type="radio" {...register("hasRemediationCommitment")} value="no" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">No</span></label>
                  </div>
                </div>

                {watch("hasRemediationCommitment") === "yes" && (
                  <div className="mt-4">
                    <InfoLabel
                      label="Describe the organization’s commitments for remediation of negative impacts."
                      info="Describe how the organization addresses and remediates negative impacts."
                    />
                    <textarea rows={3} {...register("remediationCommitmentDescription")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="e.g. Committed to financial compensation, corrective actions, and stakeholder engagement for environmental and social impacts" />
                  </div>
                )}
              </div>

              <div className="border-t pt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-4">Grievance Mechanisms</h3>

                <div>
                  <InfoLabel
                    label="Describe the organization’s approach to identify grievances."
                    info="Explain how grievances related to impacts are identified."
                  />
                  <textarea rows={2} {...register("grievanceIdentificationApproach")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="e.g. Grievances identified via stakeholder reports, internal audits, whistleblowing channels, and community engagement" />
                </div>

                <div className="mt-4">
                  <InfoLabel
                    label="List the grievance mechanisms established or participated in."
                    info="Identify grievance mechanisms available to affected stakeholders."
                  />
                  <textarea rows={2} {...register("grievanceMechanismsList")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="e.g. Internal grievance portal, hotline, email reporting, and third-party mediation platforms" />
                </div>

                <div className="mt-4">
                  <InfoLabel
                    label="Describe other processes used to remediate negative impacts."
                    info="Describe additional remediation processes beyond grievance mechanisms."
                  />
                  <textarea rows={2} {...register("otherRemediationProcesses")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="e.g. Collaborative remediation with affected communities, corrective action plans, supplier engagement programs" />
                </div>

                <div className="mt-4">
                  <InfoLabel
                    label="How are stakeholders involved in the design of grievance mechanisms?"
                    info="Explain stakeholder involvement in designing grievance mechanisms."
                  />
                  <textarea rows={2} {...register("stakeholderInvolvementInDesign")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="e.g. Stakeholders consulted through surveys, focus groups, and advisory panels" />
                </div>

                <div className="mt-4">
                  <InfoLabel
                    label="How are stakeholders involved in the review and operation of grievance mechanisms?"
                    info="Describe stakeholder involvement in operating and reviewing grievance mechanisms."
                  />
                  <textarea rows={2} {...register("stakeholderInvolvementInReview")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="e.g. Stakeholders review grievance policies annually and provide feedback on usability" />
                </div>

                <div className="mt-4">
                  <InfoLabel
                    label="How are stakeholders involved in improving grievance mechanisms?"
                    info="Explain how stakeholder feedback is used to improve grievance mechanisms."
                  />
                  <textarea rows={2} {...register("stakeholderInvolvementInImprovement")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="e.g. Feedback is incorporated into updates, training, and process optimization" />
                </div>

                <div className="mt-4">
                  <InfoLabel
                    label="How does the organization track the effectiveness of grievance mechanisms?"
                    info="Describe how effectiveness of grievance mechanisms is monitored."
                  />
                  <textarea rows={2} {...register("grievanceEffectivenessTracking")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="e.g. Tracking via number of grievances received, resolution rates, response times, and stakeholder satisfaction surveys" />
                </div>

                <div className="mt-4">
                  <InfoLabel
                    label="Provide examples demonstrating effectiveness of grievance mechanisms."
                    info="Provide examples showing outcomes of grievance mechanisms."
                  />
                  <textarea rows={2} {...register("grievanceEffectivenessExamples")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="e.g. 95% of grievances resolved within 30 days; community feedback indicates improved trust and transparency" />
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <InfoLabel
                      label="Date of last review or update of remediation processes."
                      info="Report the most recent review date of remediation processes."
                    />
                    <input type="date" {...register("lastRemediationReviewDate")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] bg-white" />
                  </div>

                  <div>
                    <InfoLabel
                      label="Person responsible for oversight of grievance and remediation processes."
                      info="Identify the role responsible for grievance and remediation oversight."
                    />
                    <select {...register("grievanceOversightPerson")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] bg-white">
                      <option value="">Select role</option>
                      <option value="Chief Compliance Officer">Chief Compliance Officer</option>
                      <option value="Sustainability Manager">Sustainability Manager</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

              </div>

              <div className="border-t pt-6 space-y-4">
                {/* Label */}
                <InfoLabel
                  label="Upload supporting documents on remediation and grievance processes."
                  info="Upload documentation supporting remediation and grievance processes, if available."
                />

                {/* Upload Box */}
                <label className="relative flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-[#4639AA]/40 rounded-xl cursor-pointer bg-slate-50 hover:border-[#4639AA] transition">
                  <Icon
                    icon="mdi:cloud-upload-outline"
                    className="text-4xl text-gray-300 mb-2"
                  />

                  <p className="text-sm font-medium text-gray-700 text-center">
                    Click to upload or drag & drop
                  </p>

                  <p className="text-xs text-gray-500 mt-1 text-center">
                    PDF, DOC, XLS, PNG, JPG • Max 5MB per file
                  </p>

                  <input
                    type="file"
                    multiple
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      setModuleFiles((prev) => ({
                        ...prev,
                        subModule2_12: [...(prev.subModule2_12 || []), ...files],
                      }));
                    }}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />

                  {/* Selected Files */}
                  {moduleFiles.subModule2_12?.length > 0 && (
                    <div className="w-full mt-4 border-t pt-3">
                      <ul className="space-y-2">
                        {moduleFiles.subModule2_12.map((file, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2 text-sm text-blue-800"
                          >
                            <Icon
                              icon="mdi:file-document-outline"
                              className="text-[#4639AA] shrink-0"
                            />
                            <span className="truncate">{file.name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </label>
              </div>
            </div>
          </div>
        );

      case 12:
        return (
          <div className="space-y-8">
            <h2 className="text-xl font-semibold text-gray-700">
              <span className="text-[#4639AA]">Sub-Module 2.13: Mechanisms for Raising & Resolving Concerns</span>
            </h2>
            <div className="space-y-6">
              <div className="border-b pb-4">
                <InfoLabel
                  label="Does the organization provide mechanisms to seek advice on responsible business conduct?"
                  info="Confirm whether mechanisms exist to seek advice on responsible business conduct."
                />
                <div className="flex items-center gap-6">
                  <label className="flex items-center"><input type="radio" {...register("hasAdviceMechanisms")} value="yes" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">Yes</span></label>
                  <label className="flex items-center"><input type="radio" {...register("hasAdviceMechanisms")} value="no" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">No</span></label>
                </div>

                {watch("hasAdviceMechanisms") === "yes" && (
                  <div className="mt-3">
                    <InfoLabel
                      label="Describe the mechanisms available for seeking advice."
                      info="Describe channels available for obtaining advice on business conduct issues."
                    />
                    <textarea rows={2} {...register("adviceMechanismsDescription")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="Ethics hotline, email support, intranet FAQ, HR guidance sessions" />
                  </div>
                )}
              </div>

              <div className="border-t pt-6">
                <InfoLabel
                  label="Does the organization provide mechanisms to raise concerns about business conduct?"
                  info="Confirm whether mechanisms exist to raise concerns or report misconduct."
                />
                <div className="flex items-center gap-6">
                  <label className="flex items-center"><input type="radio" {...register("hasConcernRaisingMechanisms")} value="yes" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">Yes</span></label>
                  <label className="flex items-center"><input type="radio" {...register("hasConcernRaisingMechanisms")} value="no" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">No</span></label>
                </div>

                {watch("hasConcernRaisingMechanisms") === "yes" && (
                  <div className="mt-3">
                    <InfoLabel
                      label="Describe the mechanisms available for raising concerns."
                      info="Describe channels for reporting concerns or misconduct."
                    />
                    <textarea rows={2} {...register("concernRaisingMechanismsDescription")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="Whistleblower hotline, confidential email reporting, anonymous portal, grievance submission forms" />
                  </div>
                )}
              </div>

              <div className="border-t pt-6">
                <InfoLabel
                  label="Are these mechanisms accessible to all employees and stakeholders?"
                  info="Indicate whether mechanisms are accessible to all relevant stakeholders."
                />
                <div className="flex items-center gap-6">
                  <label className="flex items-center"><input type="radio" {...register("mechanismsAccessibleToAll")} value="yes" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">Yes</span></label>
                  <label className="flex items-center"><input type="radio" {...register("mechanismsAccessibleToAll")} value="no" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">No</span></label>
                </div>
              </div>

              <div>
                <InfoLabel
                  label="Describe the process for responding to advice requests and concerns."
                  info="Explain how requests and concerns are handled and responded to."
                />
                <textarea rows={2} {...register("responseProcessDescription")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="All queries are logged, assigned to responsible department, and responded to within 5 business days" />
              </div>

              <div>
                <InfoLabel
                  label="How does the organization ensure confidentiality and protection?"
                  info="Describe measures to protect confidentiality and prevent retaliation."
                />
                <textarea rows={2} {...register("confidentialityProtectionDescription")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="Anonymous reporting, non-retaliation policy, and secure data handling" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <InfoLabel
                    label="Date of last review of advice and concern mechanisms."
                    info="Report when these mechanisms were last reviewed."
                  />
                  <input type="date" {...register("lastAdviceMechanismReviewDate")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] bg-white" />
                </div>

                <div>
                  <InfoLabel
                    label="Person responsible for oversight of these mechanisms."
                    info="Identify the role responsible for oversight of advice and concern mechanisms."
                  />
                  <select {...register("adviceMechanismOversightPerson")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] bg-white">
                    <option value="">Select role</option>
                    <option value="Chief Compliance Officer">Chief Compliance Officer</option>
                    <option value="Ethics Committee Chair">Ethics Committee Chair</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {watch("hasConcernRaisingMechanisms") === "yes" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Types of mechanisms available (Select all that apply)</label>
                    <div className="space-y-2">
                      {[
                        { id: "ethicsHotline", label: "Ethics Hotline/Whistleblower Hotline" },
                        { id: "emailReporting", label: "Email Reporting" },
                        { id: "onlinePortal", label: "Online Reporting Portal" },
                        { id: "supervisorReporting", label: "Report to Supervisor" },
                        { id: "hrReport", label: "Report to HR Department" },
                        { id: "complianceOfficer", label: "Report to Compliance Officer" },
                        { id: "auditCommittee", label: "Report to Audit Committee" },
                        { id: "externalCounselor", label: "External Counselor/Ombudsman" }
                      ].map((item) => (
                        <label key={item.id} className="flex items-center">
                          <input type="checkbox" {...register("concernsMechanismTypes", { validate: (value) => Array.isArray(value) })} value={item.id} className="h-4 w-4 text-[#4639AA] rounded" />
                          <span className="ml-2 text-sm text-gray-700">{item.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">How are concerns received and documented?</label>
                    <textarea rows={2} {...register("concernsDocumentation")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="Process for recording, tracking, and maintaining confidentiality..." />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Is there protection against retaliation for raising concerns?</label>
                    <div className="flex items-center gap-6">
                      <label className="flex items-center"><input type="radio" {...register("retaliationProtection")} value="yes" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">Yes</span></label>
                      <label className="flex items-center"><input type="radio" {...register("retaliationProtection")} value="no" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">No</span></label>
                    </div>
                  </div>

                  {watch("retaliationProtection") === "yes" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Describe anti-retaliation policy and safeguards</label>
                      <textarea rows={2} {...register("antiRetaliationPolicy")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="Policy provisions, monitoring mechanisms, enforcement procedures..." />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Average time to resolve concerns (in days)</label>
                    <input type="number" {...register("averageResolutionTime")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]" placeholder="Number of days..." />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Number of concerns raised in the last reporting year</label>
                    <input type="number" {...register("concernsRaisedCount")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]" placeholder="Total number of concerns..." />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Number of concerns resolved/closed</label>
                    <input type="number" {...register("concernsResolvedCount")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]" placeholder="Number resolved..." />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Who oversees the concerns resolution process?</label>
                    <input type="text" {...register("concernsOverseer")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]" placeholder="Role/department responsible..." />
                  </div>

                  <div className="border-t pt-6 space-y-4">
                    {/* Label */}
                    <InfoLabel
                      label="Upload supporting documents."
                      info="Upload supporting documentation, if applicable."
                    />

                    {/* Upload Box */}
                    <label className="relative flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-[#4639AA]/40 rounded-xl cursor-pointer bg-slate-50 hover:border-[#4639AA] transition">
                      <Icon
                        icon="mdi:cloud-upload-outline"
                        className="text-4xl text-gray-300 mb-2"
                      />

                      <p className="text-sm font-medium text-gray-700">
                        Click to upload or drag & drop
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PDF, DOC, XLS • Max 5MB per file
                      </p>

                      <input
                        type="file"
                        multiple
                        onChange={(e) => {
                          const files = Array.from(e.target.files || []);
                          setModuleFiles((prev) => ({
                            ...prev,
                            subModule2_13: [...(prev.subModule2_13 || []), ...files],
                          }));
                        }}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />

                      {/* Selected Files */}
                      {moduleFiles.subModule2_13?.length > 0 && (
                        <div className="w-full flex justify-center pt-3">
                          <ul className="space-y-2">
                            {moduleFiles.subModule2_13.map((file, idx) => (
                              <li
                                key={idx}
                                className="flex items-center gap-2 text-sm text-blue-800"
                              >
                                <Icon
                                  icon="mdi:file-outline"
                                  className="text-blue-600 shrink-0"
                                />
                                <span className="truncate">{file.name}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </label>
                  </div>

                </>
              )}
            </div>
          </div>
        );

      case 13:
        return (
          <div className="space-y-8">
            <h2 className="text-xl font-semibold text-gray-700">
              <span className="text-[#4639AA]">Sub-Module 2.14: Compliance with Laws & Regulations</span>
            </h2>
            <div className="space-y-6">
              <div>
                <InfoLabel
                  label="What regulatory frameworks and sustainability standards does the organization comply with?"
                  info="Report applicable regulations, standards, and frameworks relevant to compliance."
                />
                <textarea rows={3} {...register("reguatoryFrameworks")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="List applicable regulations, standards, and frameworks..." />
              </div>

              <div className="border-t pt-6">
                <InfoLabel
                  label="How many legal or regulatory violations related to sustainability occurred in the last three years?"
                  info="Report the number of significant non-compliance incidents during the reporting period."
                />
                <input type="number" {...register("sustainabilityViolationsCount")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]" placeholder="Number of violations..." />
              </div>

              <div>
                <InfoLabel
                  label="If violations occurred, describe the nature and corrective actions"
                  info="Describe the nature of significant non-compliance cases."
                />
                <textarea rows={2} {...register("violationsDescription")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="Type of violations, fines/penalties, remediation measures..." />
              </div>

              <div className="border-t pt-6">
                <InfoLabel
                  label="Does the organization have a compliance management system?"
                  info="Indicate whether a formal compliance management system exists."
                />
                <div className="flex items-center gap-6">
                  <label className="flex items-center"><input type="radio" {...register("hasComplianceSystem")} value="yes" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">Yes</span></label>
                  <label className="flex items-center"><input type="radio" {...register("hasComplianceSystem")} value="no" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">No</span></label>
                </div>
              </div>

              {watch("hasComplianceSystem") === "yes" && (
                <>
                  <div>
                    <InfoLabel
                      label="Describe the compliance management system"
                      info="Explain how the compliance system operates, including processes and tools."
                    />
                    <textarea rows={2} {...register("complianceSystemDescription")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="Components, processes, tools used for compliance..." />
                  </div>

                  <div>
                    <InfoLabel
                      label="Is the compliance system regularly audited?"
                      info="Confirm whether compliance processes are periodically audited."
                    />
                    <div className="flex items-center gap-6">
                      <label className="flex items-center"><input type="radio" {...register("complianceAudited")} value="yes" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">Yes</span></label>
                      <label className="flex items-center"><input type="radio" {...register("complianceAudited")} value="no" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">No</span></label>
                    </div>
                  </div>

                  {watch("complianceAudited") === "yes" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Frequency of compliance audits</label>
                      <select {...register("complianceAuditFrequency")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] bg-white">
                        <option value="">Select frequency</option>
                        <option value="Annually">Annually</option>
                        <option value="Semi-annually">Semi-annually</option>
                        <option value="Quarterly">Quarterly</option>
                        <option value="Continuously">Continuously/Real-time monitoring</option>
                        <option value="As needed">As needed / Ad hoc</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  )}
                </>
              )}

              <div className="border-t pt-6">
                <InfoLabel
                  label="Is there a dedicated compliance officer or department?"
                  info="Identify whether a dedicated compliance function exists."
                />
                <div className="flex items-center gap-6">
                  <label className="flex items-center"><input type="radio" {...register("hasDedicatedCompliance")} value="yes" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">Yes</span></label>
                  <label className="flex items-center"><input type="radio" {...register("hasDedicatedCompliance")} value="no" className="h-4 w-4 text-[#4639AA]" /><span className="ml-2 text-sm text-gray-700">No</span></label>
                </div>
              </div>

              {watch("hasDedicatedCompliance") === "yes" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role/title of compliance officer and reporting structure</label>
                  <textarea rows={2} {...register("complianceOfficerRole")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="Title, department, reporting hierarchy, responsibilities..." />
                </div>
              )}

              <div className="border-t pt-6">
                <InfoLabel
                  label="How are employees trained on compliance requirements?"
                  info="Explain how employees are educated on compliance policies and procedures."
                />
                <textarea rows={2} {...register("complianceTraining")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="Training types, frequency, coverage, assessment methods..." />
              </div>

              <div className="border-t pt-6 space-y-4">
                <h3 className="text-sm font-medium text-gray-700">Compliance incidents & fines</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <InfoLabel
                      label="Total number of significant instances of non-compliance"
                      info="Report the number of significant non-compliance incidents during the reporting period."
                    />
                    <input type="number" min={0} {...register("totalNonComplianceInstances")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]" placeholder="e.g. 3" />
                  </div>

                  <div>
                    <InfoLabel
                      label="Number of instances with fines"
                      info="Report how many non-compliance cases resulted in fines."
                    />
                    <input type="number" min={0} {...register("instancesWithFines")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]" placeholder="e.g. 2" />
                  </div>

                  <div>
                    <InfoLabel
                      label="Number of instances with non-monetary sanctions"
                      info="Report non-compliance cases resulting in non-monetary sanctions."
                    />
                    <input type="number" min={0} {...register("instancesWithNonMonetarySanctions")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]" placeholder="e.g. 1" />
                  </div>

                  <div>
                    <InfoLabel
                      label="Total monetary value of fines paid (USD)"
                      info="Report the total value of fines paid during the reporting period."
                    />
                    <input type="number" min={0} step="0.01" {...register("totalFinesPaid")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]" placeholder="50000" />
                  </div>

                  <div>
                    <InfoLabel
                      label="Fines for current reporting period (USD)"
                      info="Report fines related to the current reporting period."
                    />
                    <input type="number" min={0} step="0.01" {...register("finesCurrentPeriod")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]" placeholder="30000" />
                  </div>

                  <div>
                    <InfoLabel
                      label="Fines for previous reporting periods (USD)"
                      info="Report fines related to previous reporting periods."
                    />
                    <input type="number" min={0} step="0.01" {...register("finesPreviousPeriods")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]" placeholder="20000" />
                  </div>
                </div>

                <div>
                  <InfoLabel
                    label="Describe the significant instances of non-compliance"
                    info="Describe the nature of significant non-compliance cases."
                  />
                  <textarea rows={3} {...register("nonComplianceDescription")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="e.g. 1 environmental violation, 1 labor law violation, 1 tax reporting issue" />
                </div>

                <div>
                  <InfoLabel
                    label="Describe how significant instances are determined"
                    info="Explain the criteria used to define significance of non-compliance."
                  />
                  <textarea rows={2} {...register("nonComplianceDeterminationMethod")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y" placeholder="Based on materiality assessment: financial impact, legal risk, stakeholder concern, regulatory scrutiny" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <InfoLabel
                      label="Date of last compliance review"
                      info="Report the most recent compliance review date."
                    />
                    <input type="date" {...register("lastComplianceReviewDate")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] bg-white" />
                  </div>

                  <div>
                    <InfoLabel
                      label="Person responsible for compliance reporting"
                      info="Identify the role responsible for compliance reporting."
                    />
                    <select {...register("complianceReportingPerson")} className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] bg-white">
                      <option value="">Select role</option>
                      <option value="Chief Legal Officer">Chief Legal Officer</option>
                      <option value="Compliance Manager">Compliance Manager</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>


                {/* Label */}
                <InfoLabel
                  label="Upload supporting compliance reports or documentation"
                  info="Upload compliance documentation, if available."
                />

                {/* Upload Box */}
                <label className="relative flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-[#4639AA]/40 rounded-xl cursor-pointer bg-slate-50 hover:border-[#4639AA] transition group">
                  <Icon
                    icon="mdi:cloud-upload-outline"
                    className="text-4xl text-gray-300 mb-2 transition"
                  />

                  <p className="text-sm font-medium text-gray-700 text-center">
                    Click to upload or drag & drop
                  </p>

                  <p className="text-xs text-gray-500 mt-1 text-center">
                    PDF, DOC, XLS, PNG, JPG • Max 5MB per file
                  </p>

                  <input
                    type="file"
                    multiple
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      setModuleFiles((prev) => ({
                        ...prev,
                        subModule2_14: [...(prev.subModule2_14 || []), ...files],
                      }));
                    }}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />

                  {/* Selected Files */}
                  {moduleFiles.subModule2_14?.length > 0 && (
                    <div className="w-full mt-4 border-t pt-3">
                      <ul className="space-y-2">
                        {moduleFiles.subModule2_14.map((file, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2 text-sm text-blue-800"
                          >
                            <Icon
                              icon="mdi:file-document-outline"
                              className="text-[#4639AA] shrink-0"
                            />
                            <span className="truncate">{file.name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </label>
              </div>

            </div>
          </div>
        );

      case 14:
        return (
          <div className="space-y-8">
            <h2 className="text-xl font-semibold text-gray-700">
              <span className="text-[#4639AA]">Sub-Module 2.15: Memberships in Associations</span>
            </h2>
            <div className="space-y-6">
              {/* Question 1: Does the organization participate in associations? */}
              <div>
                <InfoLabel
                  label="Does the organization participate in industry, membership, or advocacy associations?"
                  info="Confirm participation in industry or advocacy associations."
                  required
                />
                <div className="flex items-center gap-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      {...register("participatesInAssociations")}
                      value="yes"
                      className="h-4 w-4 text-[#4639AA]"
                    />
                    <span className="ml-2 text-sm text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      {...register("participatesInAssociations")}
                      value="no"
                      className="h-4 w-4 text-[#4639AA]"
                    />
                    <span className="ml-2 text-sm text-gray-700">No</span>
                  </label>
                </div>
              </div>

              {/* Conditional fields - show if participates in associations */}
              {watch("participatesInAssociations") === "yes" && (
                <>
                  {/* Question 2: Industry associations */}
                  <div className="border-t pt-6">
                    <InfoLabel
                      label="List the industry associations the organization participates in."
                      info="Identify industry associations the organization is a member of."
                    />
                    <textarea
                      rows={3}
                      {...register("industryAssociations")}
                      className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y"
                      placeholder="Enter comma-separated names or one per line (e.g., International Chamber of Commerce, Global ESG Alliance)"
                    />
                  </div>

                  {/* Question 3: Other membership associations */}
                  <div className="border-t pt-6">
                    <InfoLabel
                      label="List other membership associations the organization participates in."
                      info="Identify other associations the organization participates in."
                    />
                    <textarea
                      rows={2}
                      {...register("otherMembershipAssociations")}
                      className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y"
                      placeholder="Enter comma-separated names or one per line (e.g., National Business Council, Local Sustainability Forum)"
                    />
                  </div>

                  {/* Question 4: National advocacy organizations */}
                  <div className="border-t pt-6">
                    <InfoLabel
                      label="List national advocacy organizations the organization participates in."
                      info="Identify national advocacy organizations the organization engages with."
                    />
                    <textarea
                      rows={2}
                      {...register("nationalAdvocacyOrganizations")}
                      className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y"
                      placeholder="Enter comma-separated names or one per line"
                    />
                  </div>

                  {/* Question 5: International advocacy organizations */}
                  <div className="border-t pt-6">
                    <InfoLabel
                      label="List international advocacy organizations the organization participates in."
                      info="Identify international advocacy organizations the organization engages with."
                    />
                    <textarea
                      rows={2}
                      {...register("internationalAdvocacyOrganizations")}
                      className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y"
                      placeholder="Enter comma-separated names or one per line (e.g., UN Global Compact, WBCSD)"
                    />
                  </div>

                  {/* Question 6: Significance of participation */}
                  <div className="border-t pt-6">
                    <InfoLabel
                      label="Indicate the significance of the organization's participation in each association."
                      info="Describe the organization’s role and level of involvement in associations."
                    />
                    <textarea
                      rows={2}
                      {...register("participationSignificance")}
                      className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y"
                      placeholder="e.g., Active member, participates in policy discussions, contributes to ESG working groups"
                    />
                  </div>

                  {/* Question 7: Objectives and activities */}
                  <div className="border-t pt-6">
                    <InfoLabel
                      label="Describe the organization's objectives or activities within these associations."
                      info="Explain the purpose of participation in associations."
                    />
                    <textarea
                      rows={3}
                      {...register("associationObjectivesActivities")}
                      className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y"
                      placeholder="Sharing best practices, influencing policy, promoting sustainable business conduct"
                    />
                  </div>

                  {/* Question 8: Date of last review */}
                  <div className="border-t pt-6">
                    <InfoLabel
                      label="Date of last review or update of membership list."
                      info="Report the date the membership list was last reviewed."
                    />
                    <input
                      type="date"
                      {...register("lastMembershipReviewDate")}
                      className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]"
                    />
                  </div>

                  {/* Question 9: Responsible person */}
                  <div className="border-t pt-6">
                    <InfoLabel
                      label="Person responsible for managing organizational memberships."
                      info="Identify who manages organizational memberships."
                    />
                    <select
                      {...register("membershipManagementPerson")}
                      className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] bg-white"
                    >
                      <option value="">Select responsible person/role</option>
                      <option value="Chief Sustainability Officer">Chief Sustainability Officer</option>
                      <option value="Public Affairs Manager">Public Affairs Manager</option>
                      <option value="Chief HR Officer">Chief HR Officer</option>
                      <option value="Corporate Affairs Manager">Corporate Affairs Manager</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </>
              )}

              {/* File Upload - Always visible */}
              <div className="border-t pt-6 space-y-4">
                <InfoLabel
                  label="Upload supporting documentation"
                  info="Upload documentation related to memberships, if applicable."
                />

                {/* Upload Box */}
                <label className="relative flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-[#4639AA]/40 rounded-xl cursor-pointer bg-slate-50 hover:border-[#4639AA] transition group">
                  <Icon
                    icon="mdi:cloud-upload-outline"
                    className="text-4xl text-gray-300 mb-2 transition"
                  />

                  <p className="text-sm font-medium text-gray-700 text-center">
                    Click to upload or drag & drop
                  </p>

                  <p className="text-xs text-gray-500 mt-1 text-center">
                    PDF, DOC, XLS, PNG, JPG • Max 5MB per file
                  </p>

                  <input
                    type="file"
                    multiple
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      setModuleFiles((prev) => ({
                        ...prev,
                        subModule2_15: [...(prev.subModule2_15 || []), ...files],
                      }));
                    }}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />

                  {/* Selected Files */}
                  {moduleFiles.subModule2_15?.length > 0 && (
                    <div className="w-full mt-4 border-t pt-3">
                      <ul className="space-y-2">
                        {moduleFiles.subModule2_15.map((file, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2 text-sm text-blue-800"
                          >
                            <Icon
                              icon="mdi:file-document-outline"
                              className="text-[#4639AA] shrink-0"
                            />
                            <span className="truncate">{file.name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </label>


              </div>
            </div>
          </div>
        );

      case 15:
        return (
          <div className="space-y-8">
            <h2 className="text-xl font-semibold text-gray-700">
              <span className="text-[#4639AA]">Sub-Module 2.16: Stakeholder Engagement</span>
            </h2>
            <div className="space-y-6">
              <div>
                <InfoLabel
                  label="Does the organization have a formal approach to stakeholder engagement?"
                  info="Confirm whether a formal stakeholder engagement approach exists."
                />
                <div className="flex items-center gap-6">
                  <label className="flex items-center">
                    <input type="radio" {...register("hasFormalStakeholderEngagement")}
                      value="yes" className="h-4 w-4 text-[#4639AA]" />
                    <span className="ml-2 text-sm text-gray-700">Yes</span></label>

                  <label className="flex items-center">
                    <input type="radio" {...register("hasFormalStakeholderEngagement")}
                      value="no" className="h-4 w-4 text-[#4639AA]" />
                    <span className="ml-2 text-sm text-gray-700">No</span></label>
                </div>
              </div>

              {watch("hasFormalStakeholderEngagement") === "yes" && (
                <>
                  <div>
                    <InfoLabel
                      label="List the categories of stakeholders engaged."
                      info="Identify stakeholder groups the organization engages with."
                    />
                    <div className="space-y-2">
                      {[
                        { id: "employees", label: "Employees" },
                        { id: "customers", label: "Customers/Clients" },
                        { id: "suppliers", label: "Suppliers/Vendors" },
                        { id: "investors", label: "Investors/Shareholders" },
                        { id: "communities", label: "Local Communities" },
                        { id: "ngos", label: "NGOs & Civil Society" },
                        { id: "governments", label: "Government & Regulators" },
                        { id: "industry", label: "Industry Peers/Associations" }
                      ].map((item) => (
                        <label key={item.id} className="flex items-center">
                          <input type="checkbox" {...register("stakeholderCategories",
                            { validate: (value) => Array.isArray(value) })} value={item.id}
                            className="h-4 w-4 text-[#4639AA] rounded" />
                          <span className="ml-2 text-sm text-gray-700">{item.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <InfoLabel
                      label="How are stakeholders identified?"
                      info="Describe how stakeholders are identified and prioritized."
                    />
                    <textarea rows={2} {...register("stakeholderIdentificationMethod")}
                      className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y"
                      placeholder="Methodology for stakeholder identification and selection..." />
                  </div>

                  <div className="border-t pt-6">
                    <InfoLabel
                      label="What is the purpose of engaging with stakeholders?"
                      info="Explain why the organization engages with stakeholders."
                    />
                    <textarea rows={2} {...register("stakeholderEngagementPurpose")}
                      className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y"
                      placeholder="Goals and objectives of engagement processes..." />
                  </div>

                  <div className="border-t pt-6">
                    <InfoLabel
                      label="How does the organization ensure meaningful engagement?"
                      info="Describe how engagement is designed to be meaningful and effective."
                    />
                    <textarea rows={2} {...register("meaningfulEngagementApproach")}
                      className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y"
                      placeholder="Approach to ensure meaningful and inclusive engagement..." />
                  </div>

                  <div className="border-t pt-6">
                    <InfoLabel
                      label="Frequency of stakeholder engagement activities."
                      info="State how often stakeholder engagement activities occur."
                    />
                    <select {...register("engagementFrequency")}
                      className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] bg-white">
                      <option value="">Select frequency</option>
                      <option value="Continuously">Continuously / Ongoing</option>
                      <option value="Annually">Annually</option>
                      <option value="Semi-annually">Semi-annually</option>
                      <option value="Quarterly">Quarterly</option>
                      <option value="Ad hoc">Ad hoc / As needed</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="border-t pt-6">
                    <InfoLabel
                      label="Describe tools or platforms used for engagement."
                      info="Identify tools or platforms used for stakeholder engagement."
                    />
                    <textarea rows={2} {...register("engagementToolsPlatforms")}
                      className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y"
                      placeholder="Methods, channels, platforms used (surveys, focus groups, online portals, etc.)..." />
                  </div>

                  <div className="border-t pt-6">
                    <InfoLabel
                      label="How is stakeholder feedback incorporated into decisions?"
                      info="Explain how stakeholder input influences decisions and actions."
                    />
                    <textarea rows={2} {...register("feedbackIncorporationMethod")}
                      className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y"
                      placeholder="Process for incorporating feedback, decision-making mechanisms..." />
                  </div>

                  <div className="border-t pt-6">
                    <InfoLabel
                      label="Date of last review of stakeholder engagement approach."
                      info="Report the most recent review date of the engagement approach."
                    />
                    <input type="date" {...register("lastStakeholderEngagementReviewDate")}
                      className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]" />
                  </div>

                  <div className="border-t pt-6">
                    <InfoLabel
                      label="Person responsible for stakeholder engagement."
                      info="Identify the role responsible for stakeholder engagement."
                    />
                    <select {...register("stakeholderEngagementResponsiblePerson")}
                      className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] bg-white">
                      <option value="">Select responsible person</option>
                      <option value="Chief Sustainability Officer">Chief Sustainability Officer</option>
                      <option value="Corporate Affairs Manager">Corporate Affairs Manager</option>

                    </select>

                  </div>

                  <div className="border-t pt-6 space-y-4">
                    {/* Label */}
                    <InfoLabel
                      label="Upload supporting documentation. (if applicable)"
                      info="Upload documentation supporting stakeholder engagement, if applicable."
                    />

                    {/* Upload Box */}
                    <label className="relative flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-[#4639AA]/40 rounded-xl cursor-pointer bg-slate-50 hover:border-[#4639AA] transition group">
                      <Icon
                        icon="mdi:cloud-upload-outline"
                        className="text-4xl text-gray-300 mb-2 transition"
                      />

                      <p className="text-sm font-medium text-gray-700 text-center">
                        Click to upload or drag & drop
                      </p>

                      <p className="text-xs text-gray-500 mt-1 text-center">
                        PDF, DOC, XLS, PNG, JPG • Max 5MB per file
                      </p>

                      <input
                        type="file"
                        multiple
                        onChange={(e) => {
                          const files = Array.from(e.target.files || []);
                          setModuleFiles((prev) => ({
                            ...prev,
                            subModule2_16: [...(prev.subModule2_16 || []), ...files],
                          }));
                        }}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />

                      {/* Selected Files */}
                      {moduleFiles.subModule2_16?.length > 0 && (
                        <div className="w-full mt-4 border-t pt-3">
                          <ul className="space-y-2">
                            {moduleFiles.subModule2_16.map((file, idx) => (
                              <li
                                key={idx}
                                className="flex items-center gap-2 text-sm text-blue-800"
                              >
                                <Icon
                                  icon="mdi:file-document-outline"
                                  className="text-[#4639AA] shrink-0"
                                />
                                <span className="truncate">{file.name}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </label>
                  </div>
                </>
              )}
            </div>
          </div>
        );

      case 16:
        return (
          <div className="space-y-8">
            <h2 className="text-xl font-semibold text-gray-700">
              <span className="text-[#4639AA]">Sub-Module 2.17: Collective Bargaining Agreements</span>
            </h2>
            <div className="space-y-6">
              {/* Question 1: Does the organization have employees covered by CBAs? */}
              <div>
                <InfoLabel
                  label="Does the organization have employees covered by CBAs? (Required)"
                  info="Confirm whether employees are covered by collective bargaining agreements."
                />
                <div className="flex items-center gap-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      {...register("hasCollectiveBargainingAgreements")}
                      value="yes"
                      className="h-4 w-4 text-[#4639AA]"
                    />
                    <span className="ml-2 text-sm text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      {...register("hasCollectiveBargainingAgreements")}
                      value="no"
                      className="h-4 w-4 text-[#4639AA]"
                    />
                    <span className="ml-2 text-sm text-gray-700">No</span>
                  </label>
                </div>
                {errors.hasCollectiveBargainingAgreements && (
                  <p className="text-red-600 text-sm mt-1">{errors.hasCollectiveBargainingAgreements.message}</p>
                )}
              </div>

              {/* Conditional content - show if has CBAs */}
              {watch("hasCollectiveBargainingAgreements") === "yes" && (
                <>
                  {/* Question 2: Percentage of employees covered by CBAs */}
                  <div className="border-t pt-6">
                    <InfoLabel
                      label="Percentage of employees covered by CBAs."
                      info="Report the percentage of employees covered by CBAs."
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        {...register("percentageCoveredByCBAs")}
                        min="0"
                        max="100"
                        className="w-20 px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]"
                        placeholder="0"
                      />
                      <span className="text-sm text-gray-700">%</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Enter a value between 0-100</p>
                  </div>

                  {/* Question 3: Working conditions for non-CBA employees determined by CBAs covering other employees */}
                  <div className="border-t pt-6">
                    <InfoLabel
                      label="For employees not covered by CBAs, are working conditions based on CBAs?"
                      info="Indicate whether CBAs influence working conditions of non-covered employees."
                    />
                    <div className="flex items-center gap-6">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          {...register("nonCBADeterminedByCBAsCovering")}
                          value="yes"
                          className="h-4 w-4 text-[#4639AA]"
                        />
                        <span className="ml-2 text-sm text-gray-700">Yes</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          {...register("nonCBADeterminedByCBAsCovering")}
                          value="no"
                          className="h-4 w-4 text-[#4639AA]"
                        />
                        <span className="ml-2 text-sm text-gray-700">No</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          {...register("nonCBADeterminedByCBAsCovering")}
                          value="notApplicable"
                          className="h-4 w-4 text-[#4639AA]"
                        />
                        <span className="ml-2 text-sm text-gray-700">Not Applicable</span>
                      </label>
                    </div>
                  </div>

                  {/* Question 4: Working conditions determined by CBAs from other organizations */}
                  <div className="border-t pt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      For employees not covered by CBAs, does the organization determine their working conditions based on CBAs from other organizations?
                    </label>
                    <div className="flex items-center gap-6">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          {...register("nonCBADeterminedByCBAsOther")}
                          value="yes"
                          className="h-4 w-4 text-[#4639AA]"
                        />
                        <span className="ml-2 text-sm text-gray-700">Yes</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          {...register("nonCBADeterminedByCBAsOther")}
                          value="no"
                          className="h-4 w-4 text-[#4639AA]"
                        />
                        <span className="ml-2 text-sm text-gray-700">No</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          {...register("nonCBADeterminedByCBAsOther")}
                          value="notApplicable"
                          className="h-4 w-4 text-[#4639AA]"
                        />
                        <span className="ml-2 text-sm text-gray-700">Not Applicable</span>
                      </label>
                    </div>
                  </div>

                  {/* Question 5: How working conditions are determined for non-CBA employees */}
                  <div className="border-t pt-6">
                    <InfoLabel
                      label="Describe how working conditions are determined for non-CBA employees."
                      info="Explain how employment terms are set for employees not covered by CBAs."
                    />
                    <textarea
                      rows={3}
                      {...register("nonCBAWorkingConditionsDescription")}
                      className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] resize-y"
                      placeholder="Salaries, benefits, and working hours aligned with company policies benchmarked against industry standards and existing CBAs..."
                    />
                  </div>

                  {/* Question 6: Date of last review of CBA coverage */}
                  <div className="border-t pt-6">
                    <InfoLabel
                      label="Date of last review of CBA coverage."
                      info="Report the most recent review date of CBA coverage."
                    />
                    <input
                      type="date"
                      {...register("lastCBAReviewDate")}
                      className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]"
                    />
                  </div>

                  {/* Question 7: Person responsible for overseeing CBAs */}
                  <div className="border-t pt-6">
                    <InfoLabel
                      label="Person responsible for overseeing CBAs."
                      info="Identify the role responsible for CBA oversight."
                    />
                    <select
                      {...register("cbaOversightPerson")}
                      className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-lg focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA] bg-white"
                    >
                      <option value="">Select responsible person/role</option>
                      <option value="Chief HR Officer">Chief HR Officer</option>
                      <option value="Labor Relations Manager">Labor Relations Manager</option>
                      <option value="General Counsel">General Counsel</option>
                      <option value="HR Director">HR Director</option>
                      <option value="Employee Relations Director">Employee Relations Director</option>
                      <option value="Other">Other (Please Specify)</option>
                    </select>
                  </div>
                </>
              )}

              {/* File Upload - Always visible */}
              <div className="border-t pt-6 space-y-4">
                <InfoLabel
                  label="Upload supporting documents."
                  info="Upload CBA-related documentation, if applicable."
                />

                {/* Upload Box */}
                <label className="relative flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-[#4639AA]/40 rounded-xl cursor-pointer bg-slate-50 hover:border-[#4639AA] transition group">
                  <Icon
                    icon="mdi:cloud-upload-outline"
                    className="text-4xl text-gray-300 mb-2 transition"
                  />

                  <p className="text-sm font-medium text-gray-700 text-center">
                    Click to upload or drag & drop
                  </p>

                  <p className="text-xs text-gray-500 mt-1 text-center">
                    PDF, DOC, XLS, PNG, JPG • Max 5MB per file
                  </p>

                  <input
                    type="file"
                    multiple
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      setModuleFiles((prev) => ({
                        ...prev,
                        subModule2_17: [...(prev.subModule2_17 || []), ...files],
                      }));
                    }}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />

                  {/* Selected Files */}
                  {moduleFiles.subModule2_17?.length > 0 && (
                    <div className="w-full mt-4 border-t pt-3">
                      <ul className="space-y-2">
                        {moduleFiles.subModule2_17.map((file, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2 text-sm text-blue-800"
                          >
                            <Icon
                              icon="mdi:file-document-outline"
                              className="text-[#4639AA] shrink-0"
                            />
                            <span className="truncate">{file.name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </label>


              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-8">
            <h2 className="text-xl font-semibold text-gray-700">
              <span className="text-[#4639AA]">{tabs[activeTab].label}</span>
            </h2>
            <div className="text-gray-600 p-4 bg-gray-50 rounded-lg">
              <p className="font-medium">All governance modules (Tabs 0-16) are fully implemented!</p>
              <p className="text-sm mt-2">You can now navigate through all 17 tabs to complete your governance disclosure.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto ">
        {/* Header Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-700">
                <span className="text-[#4639AA]">MODULE 2:</span> Governance, Ethics & Integrity
              </h1>
              <p className="mt-2 text-[#1893A1] font-medium">
                Complete, auditable disclosure on governance structure, decision-making, ethics, remuneration, stakeholder engagement, and compliance.
              </p>
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
                Step {activeTab + 1} of 17
              </span>
              <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-br from-[#4639AA] to-[#1893A1] transition-all duration-500"
                  style={{ width: `${((activeTab + 1) / 17) * 100}%` }}
                />
              </div>
            </div>
            <span className="text-sm text-gray-600 mt-2 sm:mt-0">
              {Math.round(((activeTab + 1) / 17) * 100)}% Complete
            </span>
          </div>
        </div>

        {/* Main Layout */}
        <div className="lg:flex justify-start items-start gap-6">
          {/* Sidebar Navigation */}
          <div className="w-full lg:w-1/3 mb-6 lg:mb-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:sticky lg:top-6">
              <div className="space-y-2 h-[calc(89vh-150px)] overflow-y-auto scrollbar-theme">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-md text-left transition-all ${activeTab === tab.id
                      ? "bg-gradient-to-br from-[#4639AA] to-[#1893A1] text-white shadow-sm"
                      : "text-gray-700 hover:bg-[#F0EEFF]"
                      }`}
                  >
                    <Icon icon={tab.icon} className="text-xl flex-shrink-0" />
                    <span className="font-medium text-sm">{tab.number} {tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
              <div className="h-[calc(75vh-150px)] overflow-y-auto scrollbar-theme pb-6">
                {renderTabContent()}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 mt-6 border-t">
                <button
                  disabled={activeTab === 0}
                  onClick={() => setActiveTab((prev) => Math.max(0, prev - 1))}
                  className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Back
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={loading}
                  className="px-8 py-2 bg-gradient-to-br from-[#4639AA] to-[#1893A1] text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <Icon icon="eos-icons:loading" className="animate-spin" />
                      Saving...
                    </>
                  ) : activeTab === 16 ? (
                    "Save & Finish"
                  ) : (
                    "Next Step"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovernanceSetup;
