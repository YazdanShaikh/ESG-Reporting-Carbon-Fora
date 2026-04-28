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


const ManagementApproach = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState({});

  const tabs = [
    { id: 0, label: "Materials", icon: "mdi:finance", module: "gri301" },
    { id: 1, label: "Energy", icon: "mdi:store-marker", module: "gri302" },
    { id: 2, label: "Water and Effluents", icon: "mdi:account-group", module: "gri303" },
    { id: 3, label: "Biodiversity", icon: "mdi:weather-partly-cloudy", module: "gri304" },
    { id: 4, label: "Emissions", icon: "mdi:cloud", module: "gri305" },
    { id: 5, label: "Waste Management", icon: "mdi:delete-outline", module: "gri306" },
    { id: 6, label: "Supplier Environmental Assessment", icon: "mdi:weather-partly-cloudy", module: "gri308" },

  ];

  // Validation schemas for each tab
  const tabSchemas = {
    0: yup.object({
      gri201: yup.object({
        isMaterial: yup.string(),
        managementDescription: yup.string().when("isMaterial", {
          is: "yes",
          then: yup.string().required("This field is required"),
          otherwise: yup.string()
        }),
        omissionReason: yup.string().when("isMaterial", {
          is: "no",
          then: yup.string().required("Select a reason for omission"),
          otherwise: yup.string()
        }),
        omissionExplanation: yup.string().when("isMaterial", {
          is: "no",
          then: yup.string().required("Explanation is required"),
          otherwise: yup.string()
        })
      })
    }),
    1: yup.object({
      gri202: yup.object({
        isMaterial: yup.string(),
        managementDescription: yup.string().when("isMaterial", {
          is: "yes",
          then: yup.string().required("This field is required"),
          otherwise: yup.string()
        }),
        omissionReason: yup.string().when("isMaterial", {
          is: "no",
          then: yup.string().required("Select a reason for omission"),
          otherwise: yup.string()
        }),
        omissionExplanation: yup.string().when("isMaterial", {
          is: "no",
          then: yup.string().required("Explanation is required"),
          otherwise: yup.string()
        })
      })
    }),
    2: yup.object({
      gri203: yup.object({
        isMaterial: yup.string(),
        waterInteraction: yup.string().when("isMaterial", {
          is: "yes",
          then: yup.string().required("This field is required"),
          otherwise: yup.string()
        }),
        impactIdentification: yup.string(),
        impactAddressing: yup.string(),
        stakeholderCollaboration: yup.string(),
        stakeholderEngagement: yup.array(),
        waterTargets: yup.string(),
        targetsTable: yup.array(),
        disclosure3031: yup.object({
          waterDescription: yup.string(),
          valueChainImpacts: yup.string(),
          valueChainTable: yup.array(),
          catchments: yup.array()
        }),
        disclosure3032: yup.object({
          effluentStandards: yup.string(),
          standardsDetermination: yup.string(),
          noDischargeRegions: yup.string(),
          internalStandards: yup.string()
        }),
        disclosure3033: yup.object({
          waterWithdrawal: yup.array(),
          withdrawalStressAreas: yup.array(),
          withdrawalByQuality: yup.array(),
          stressMethodology: yup.string()
        }),
        disclosure3034: yup.object({
          waterDischarge: yup.array(),
          dischargeByQuality: yup.array(),
          dischargeStressAreas: yup.array(),
          priorityPollutants: yup.array()
        }),
        disclosure3035: yup.object({
          totalConsumption: yup.number(),
          consumptionStressAreas: yup.number(),
          storageChange: yup.number(),
          storageStart: yup.number(),
          storageEnd: yup.number()
        }),
        omissionReason: yup.string().when("isMaterial", {
          is: "no",
          then: yup.string().required("Select a reason for omission"),
          otherwise: yup.string()
        }),
        omissionExplanation: yup.string().when("isMaterial", {
          is: "no",
          then: yup.string().required("Explanation is required"),
          otherwise: yup.string()
        })
      })
    }),
    3: yup.object({ gri204: yup.object({ isMaterial: yup.string() }) }),
    4: yup.object({
      gri205: yup.object({
        isMaterial: yup.string(),
        managementDescription: yup.string().when("isMaterial", {
          is: "yes",
          then: yup.string().required("This field is required"),
          otherwise: yup.string()
        }),
        oversight: yup.string(),
        hasTargets: yup.string(),
        offsetsUsage: yup.string(),
        subjectToRegulation: yup.string(),
        disclosure3051: yup.object({
          totalScope1: yup.number(),
          gasesIncluded: yup.string(),
          biogenicCO2: yup.number(),
          baseYear: yup.number(),
          baseYearEmissions: yup.number(),
          consolidationApproach: yup.string(),
          methodology: yup.string(),
          methodologyOther: yup.string()
        }),
        disclosure3052: yup.object({
          scope2Location: yup.number(),
          scope2Market: yup.number(),
          emissionFactorSource: yup.string()
        }),
        disclosure3053: yup.object({
          totalScope3: yup.number(),
          categories: yup.array()
        }),
        disclosure3054: yup.object({
          intensityMetric: yup.string(),
          denominatorValue: yup.number()
        }),
        disclosure3055: yup.object({
          totalReduced: yup.number(),
          reductionInitiatives: yup.array(),
          baseYear: yup.number()
        }),
        disclosure3056: yup.object({
          odsProduced: yup.number(),
          odsDestroyed: yup.number(),
          odsFeedstock: yup.number()
        }),
        disclosure3057: yup.object({
          nox: yup.number(),
          sox: yup.number(),
          voc: yup.number(),
          pm: yup.number(),
          hap: yup.number(),
          calculationMethod: yup.string()
        }),
        omissionReason: yup.string().when("isMaterial", {
          is: "no",
          then: yup.string().required("Select a reason for omission"),
          otherwise: yup.string()
        }),
        omissionExplanation: yup.string().when("isMaterial", {
          is: "no",
          then: yup.string().required("Explanation is required"),
          otherwise: yup.string()
        })
      })
    }),
    5: yup.object({
      gri306: yup.object({
        isMaterial: yup.string(),
        managementDescription: yup.string().when("isMaterial", {
          is: "yes",
          then: yup.string().required("This field is required"),
          otherwise: yup.string()
        }),
        responsiblePerson: yup.string(),
        omissionReason: yup.string().when("isMaterial", {
          is: "no",
          then: yup.string().required("Select a reason for omission"),
          otherwise: yup.string()
        }),
        omissionExplanation: yup.string().when("isMaterial", {
          is: "no",
          then: yup.string().required("Explanation is required"),
          otherwise: yup.string()
        })
      })
    }),
    6: yup.object({
      gri308: yup.object({
        isMaterial: yup.string(),
        screenNewSuppliers: yup.string().when("isMaterial", {
          is: "yes",
          then: yup.string().required("This field is required"),
          otherwise: yup.string()
        }),
        screeningCriteria: yup.array(),
        assessmentMethods: yup.array(),
        prioritizationMethod: yup.string().when("isMaterial", {
          is: "yes",
          then: yup.string().required("This field is required"),
          otherwise: yup.string()
        }),
        actionsForIssues: yup.array(),
        disclosure3081: yup.object({
          totalNewSuppliers: yup.number().when("isMaterial", {
            is: "yes",
            then: yup.number().required("This field is required").min(0),
            otherwise: yup.number()
          }),
          screenedSuppliers: yup.number().when("isMaterial", {
            is: "yes",
            then: yup.number().required("This field is required").min(0),
            otherwise: yup.number()
          })
        }),
        disclosure3082: yup.object({
          suppliersAssessed: yup.number().when("isMaterial", {
            is: "yes",
            then: yup.number().required("This field is required").min(0),
            otherwise: yup.number()
          }),
          suppliersWithImpacts: yup.number().when("isMaterial", {
            is: "yes",
            then: yup.number().required("This field is required").min(0),
            otherwise: yup.number()
          }),
          impactDescription: yup.string().when("isMaterial", {
            is: "yes",
            then: yup.string().required("This field is required"),
            otherwise: yup.string()
          }),
          suppliersWithPlans: yup.number().when("isMaterial", {
            is: "yes",
            then: yup.number().required("This field is required").min(0),
            otherwise: yup.number()
          }),
          suppliersTerminated: yup.number().when("isMaterial", {
            is: "yes",
            then: yup.number().required("This field is required").min(0),
            otherwise: yup.number()
          }),
          terminationReason: yup.string().when("isMaterial", {
            is: "yes",
            then: yup.string().required("This field is required"),
            otherwise: yup.string()
          })
        }),
        omissionReason: yup.string().when("isMaterial", {
          is: "no",
          then: yup.string().required("Select a reason for omission"),
          otherwise: yup.string()
        }),
        omissionExplanation: yup.string().when("isMaterial", {
          is: "no",
          then: yup.string().required("Explanation is required"),
          otherwise: yup.string()
        })
      })
    }),
  };

  const { register, control, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm({
    resolver: yupResolver(tabSchemas[activeTab]),
    defaultValues: {
      gri201: {
        isMaterial: "no",
        managementDescription: "",
        oversight: "Operations Manager",
        materials: [
          { materialType: "", category: "Renewable", unit: "kg", quantity: 0 }
        ],
        internalReuse: {
          exists: "no",
          items: [{ material: "", quantityReused: 0, unit: "kg" }]
        },
        recycledInputs: {
          items: [{ material: "", recycledQuantity: 0, unit: "kg" }]
        },
        reclaimed: {
          exists: "no",
          products: [{ productCategory: "", productsSold: 0, productsReclaimed: 0 }],
          packaging: [{ packagingType: "", unitsSold: 0, unitsReclaimed: 0 }]
        },
        omissionReason: "",
        omissionExplanation: ""
      },
      gri202: {
        isMaterial: "no",
        managementDescription: "",
        assignedFunction: "Operations",
        assignedFunctionOther: "",
        actions: [],
        actionsOther: "",
        monitoringMethods: [],
        monitoringOther: "",
        disclosure3021: {
          tracksFuel: "yes",
          nonRenewableFuel: [{ fuelType: "", energyConsumed: 0, unit: "GJ" }],
          renewableFuel: [{ fuelType: "", energyConsumed: 0, unit: "GJ" }],
          purchasedEnergy: [
            { energyType: "Electricity", amountConsumed: 0, unit: "GJ" },
            { energyType: "Heating", amountConsumed: 0, unit: "GJ" },
            { energyType: "Cooling", amountConsumed: 0, unit: "GJ" },
            { energyType: "Steam", amountConsumed: 0, unit: "GJ" }
          ],
          soldEnergy: [
            { energyType: "Electricity", amountSold: 0, unit: "GJ" },
            { energyType: "Heating", amountSold: 0, unit: "GJ" },
            { energyType: "Cooling", amountSold: 0, unit: "GJ" },
            { energyType: "Steam", amountSold: 0, unit: "GJ" }
          ],
          selfGeneratedNotConsumed: 0,
          standards: "National energy reporting standards",
          standardsOther: "",
          conversionFactors: "National conversion factors",
          conversionFactorsOther: ""
        },
        disclosure3022: {
          assessOutside: "no",
          outsideEnergy: [
            { category: "Purchased goods and services", energyConsumed: 0, unit: "GJ" },
            { category: "Capital goods", energyConsumed: 0, unit: "GJ" },
            { category: "Transportation and distribution", energyConsumed: 0, unit: "GJ" },
            { category: "Waste generated in operations", energyConsumed: 0, unit: "GJ" },
            { category: "Business travel", energyConsumed: 0, unit: "GJ" },
            { category: "Employee commuting", energyConsumed: 0, unit: "GJ" },
            { category: "Use of sold products", energyConsumed: 0, unit: "GJ" },
            { category: "End-of-life treatment of products", energyConsumed: 0, unit: "GJ" }
          ],
          methodology: ""
        },
        disclosure3023: {
          energyConsumption: 0,
          organizationMetric: "",
          energyIntensity: "",
          energyTypesIncluded: [],
          includesOutside: "no"
        },
        disclosure3024: {
          hasReductions: "no",
          energyReductions: [{ initiative: "", energyType: "", reductionAmount: 0, unit: "GJ" }],
          basis: "Baseline year comparison",
          basisOther: "",
          methodology: ""
        },
        disclosure3025: {
          productRedesign: "no",
          productReductions: [{ productService: "", baselineEnergy: 0, newEnergy: 0, reduction: 0, unit: "GJ" }],
          basis: "Industry use standards",
          basisOther: ""
        },
        omissionReason: "",
        omissionExplanation: ""
      },
      gri203: {
        isMaterial: "no",
        waterInteraction: "",
        impactIdentification: "",
        impactAddressing: "",
        stakeholderCollaboration: "no",
        stakeholderEngagement: [{ stakeholderType: "", activity: "", frequency: "", outcome: "" }],
        waterTargets: "no",
        targetsTable: [{ target: "", baselineYear: "", targetYear: "", progress: "" }],
        disclosure3031: {
          waterDescription: "",
          valueChainImpacts: "no",
          valueChainTable: [{ stage: "", impact: "", location: "" }],
          catchments: [{ catchment: "", country: "", impactDescription: "" }]
        },
        disclosure3032: {
          effluentStandards: "no",
          standardsDetermination: "",
          noDischargeRegions: "no",
          internalStandards: ""
        },
        disclosure3033: {
          waterWithdrawal: [
            { source: "Surface Water", totalWithdrawal: 0 },
            { source: "Groundwater", totalWithdrawal: 0 },
            { source: "Seawater", totalWithdrawal: 0 },
            { source: "Produced Water", totalWithdrawal: 0 },
            { source: "Third-party Water", totalWithdrawal: 0 }
          ],
          withdrawalStressAreas: [
            { source: "Surface Water", withdrawalStress: 0 },
            { source: "Groundwater", withdrawalStress: 0 },
            { source: "Seawater", withdrawalStress: 0 },
            { source: "Produced Water", withdrawalStress: 0 },
            { source: "Third-party Water", withdrawalStress: 0 }
          ],
          withdrawalByQuality: [
            { category: "Freshwater (≤1000 mg/L TDS)", volume: 0 },
            { category: "Other water (>1000 mg/L TDS)", volume: 0 }
          ],
          stressMethodology: "Aqueduct Water Risk Atlas"
        },
        disclosure3034: {
          waterDischarge: [
            { destination: "Surface Water", volume: 0 },
            { destination: "Groundwater", volume: 0 },
            { destination: "Seawater", volume: 0 },
            { destination: "Third-party Water", volume: 0 }
          ],
          dischargeByQuality: [
            { category: "Freshwater", volume: 0 },
            { category: "Other water", volume: 0 }
          ],
          dischargeStressAreas: [
            { category: "Freshwater", volume: 0 },
            { category: "Other water", volume: 0 }
          ],
          priorityPollutants: [{ pollutant: "", standard: "", limit: "", incidents: 0 }]
        },
        disclosure3035: {
          totalConsumption: 0,
          consumptionStressAreas: 0,
          storageChange: 0,
          storageStart: 0,
          storageEnd: 0
        },
        omissionReason: "",
        omissionExplanation: ""
      },
      gri204: {
        isMaterial: "no",
        managementDescription: "",
        hasBiodiversityPolicy: "no",
        integratesBiodiversity: "no",
        disclosure3041: {
          operatesNearProtected: "no",
          operationalSites: [{ siteName: "", country: "", geographicLocation: "", operationType: "", siteSize: "", positionRelative: "", ecosystemType: "", protectionStatus: "" }]
        },
        disclosure3042: {
          hasSignificantImpacts: "no",
          biodiversityImpacts: [{ activity: "", impactType: "", speciesAffected: "", areaImpacted: "", duration: "", reversible: "", description: "" }]
        },
        disclosure3043: {
          hasRestoredHabitats: "no",
          habitatProtection: [{ location: "", country: "", areaProtected: 0, restorationMethod: "", externalVerification: "", status: "" }],
          collaboratesWithPartners: "no",
          partners: [{ organization: "", program: "", outcome: "" }]
        },
        disclosure3044: {
          hasProtectedSpecies: "no",
          speciesImpacts: [{ speciesName: "", conservationList: "", riskCategory: "", habitatLocation: "" }]
        },
        omissionReason: "",
        omissionExplanation: ""
      },
      gri205: {
        isMaterial: "no",
        managementDescription: "",
        oversight: "CEO",
        hasTargets: "no",
        offsetsUsage: "No offsets used",
        subjectToRegulation: "no",
        disclosure3051: {
          totalScope1: 0,
          gasesIncluded: "CO₂",
          biogenicCO2: 0,
          baseYear: 2023,
          baseYearEmissions: 0,
          consolidationApproach: "Operational control",
          methodology: "GHG Protocol",
          methodologyOther: ""
        },
        disclosure3052: {
          scope2Location: 0,
          scope2Market: 0,
          emissionFactorSource: ""
        },
        disclosure3053: {
          totalScope3: 0,
          categories: []
        },
        disclosure3054: {
          intensityMetric: "Revenue",
          denominatorValue: 0
        },
        disclosure3055: {
          totalReduced: 0,
          reductionInitiatives: [],
          baseYear: 2023
        },
        disclosure3056: {
          odsProduced: 0,
          odsDestroyed: 0,
          odsFeedstock: 0
        },
        disclosure3057: {
          nox: 0,
          sox: 0,
          voc: 0,
          pm: 0,
          hap: 0,
          calculationMethod: "Direct measurement"
        },
        omissionReason: "",
        omissionExplanation: ""
      },
      gri306: {
        isMaterial: "no",
        managementDescription: "",
        responsiblePerson: "",
        omissionReason: "",
        omissionExplanation: "",
        disclosure3061: {
          wasteInputs: [],
          wasteLocation: ""
        },
        disclosure3062: {
          preventionActions: [],
          thirdPartyHandling: "no",
          contractors: [],
          monitoringMethods: []
        },
        disclosure3063: {
          wasteGenerated: []
        },
        disclosure3064: {
          wasteDiverted: []
        },
        disclosure3065: {
          wasteDisposed: []
        }
      },
    }
    });
   
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get("/brand/material/");
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

  const materials = watch("gri201.materials") || [];
  const totalRenewableMaterials = materials.reduce(
    (acc, item) => acc + ((item.category === "Renewable" ? Number(item.quantity) : 0) || 0),
    0
  );
  const totalNonRenewableMaterials = materials.reduce(
    (acc, item) => acc + ((item.category === "Non-renewable" ? Number(item.quantity) : 0) || 0),
    0
  );
  const totalMaterialsUsed = totalRenewableMaterials + totalNonRenewableMaterials;

  const recycledInputs = watch("gri201.recycledInputs.items") || [];
  const totalRecycledMaterials = recycledInputs.reduce(
    (acc, item) => acc + (Number(item.recycledQuantity) || 0),
    0
  );
  const recycledPercentage = totalMaterialsUsed > 0 ? (totalRecycledMaterials / totalMaterialsUsed) * 100 : 0;

  const reclaimedProducts = watch("gri201.reclaimed.products") || [];
  const totalProductsSold = reclaimedProducts.reduce(
    (acc, item) => acc + (Number(item.productsSold) || 0),
    0
  );
  const totalProductsReclaimed = reclaimedProducts.reduce(
    (acc, item) => acc + (Number(item.productsReclaimed) || 0),
    0
  );
  const reclamationRate = totalProductsSold > 0 ? (totalProductsReclaimed / totalProductsSold) * 100 : 0;

  const packagingRows = watch("gri201.reclaimed.packaging") || [];
  const totalPackagingSold = packagingRows.reduce(
    (acc, item) => acc + (Number(item.unitsSold) || 0),
    0
  );
  const totalPackagingReclaimed = packagingRows.reduce(
    (acc, item) => acc + (Number(item.unitsReclaimed) || 0),
    0
  );
  const packagingRecoveryRate = totalPackagingSold > 0 ? (totalPackagingReclaimed / totalPackagingSold) * 100 : 0;

  const totalNonRenewableFuel = (watch("gri202.disclosure3021.nonRenewableFuel") || []).reduce(
    (sum, item) => sum + (Number(item.energyConsumed) || 0),
    0
  );
  const totalRenewableFuel = (watch("gri202.disclosure3021.renewableFuel") || []).reduce(
    (sum, item) => sum + (Number(item.energyConsumed) || 0),
    0
  );
  const totalPurchasedEnergy = (watch("gri202.disclosure3021.purchasedEnergy") || []).reduce(
    (sum, item) => sum + (Number(item.amountConsumed) || 0),
    0
  );
  const totalEnergySold = (watch("gri202.disclosure3021.soldEnergy") || []).reduce(
    (sum, item) => sum + (Number(item.amountSold) || 0),
    0
  );
  const selfGeneratedNotConsumed = Number(watch("gri202.disclosure3021.selfGeneratedNotConsumed") || 0);
  const totalEnergyConsumption =
    totalNonRenewableFuel +
    totalRenewableFuel +
    totalPurchasedEnergy +
    selfGeneratedNotConsumed -
    totalEnergySold;
  const renewableEnergyShare = totalEnergyConsumption > 0 ? (totalRenewableFuel / totalEnergyConsumption) * 100 : 0;

  const [breakdownRows, setBreakdownRows] = useState([
    { location: '', total: 0, local: 0 }
  ]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const currentModule = tabs[activeTab].module;
      const moduleData = data[currentModule];

      // Check if there are any files to upload
      const hasFiles = uploadedFiles[`${currentModule}_policyDocument`]?.length > 0 ||
                      moduleData?.policyDocument?.length > 0;

      let requestBody;
      let headers = {};

      if (hasFiles) {
        // Use FormData for file uploads
        const formData = new FormData();
        formData.append('module', currentModule);
        formData.append('payload', JSON.stringify(moduleData));

        // Add files to FormData
        const files = uploadedFiles[`${currentModule}_policyDocument`] || moduleData?.policyDocument || [];
        files.forEach((file, index) => {
          formData.append(`policyDocument_${index}`, file);
        });

        requestBody = formData;
        headers = {
          'Content-Type': 'multipart/form-data'
        };
      } else {
        // Use JSON for non-file data
        requestBody = {
          module: currentModule,
          payload: moduleData
        };
      }

      const res = await axiosInstance.post("/brand/management-approach/", requestBody, { headers });

      if (res.data.success) {
        toast.success(`${tabs[activeTab].label} saved successfully!`);
        if (activeTab < 6) setActiveTab((prev) => prev + 1);
      }
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleManualNext = async () => {
    const isValid = await new Promise((resolve) => {
      handleSubmit(
        () => resolve(true),
        () => resolve(false)
      )();
    });

    if (isValid) {
      handleSubmit(onSubmit)();
    } else {
      toast.error("Please fill all required fields correctly");
    }
  };

  const [acTrainingRows, setAcTrainingRows] = useState([
    { category: '', total: 0, trained: 0 }
  ]);
  const [acIncidentRows, setAcIncidentRows] = useState([
    { type: '', disciplined: 0, terminated: 0, legal: 0 }
  ]);
  const totalOps = Number(watch('gri205.totalOperations')) || 0;
  const assessedOps = Number(watch('gri205.assessedOperations')) || 0;
  const coveragePct = totalOps > 0 ? ((assessedOps / totalOps) * 100).toFixed(1) : '0.0';

  const [acbCaseRows, setAcbCaseRows] = useState([
    { type: '', number: 0, impact: 0, status: '' }
  ]);

  const totalScope1 = Number(watch("gri205.disclosure3051.totalScope1") || 0);
  const scope2Location = Number(watch("gri205.disclosure3052.scope2Location") || 0);
  const scope3Total = Number(watch("gri205.disclosure3053.totalScope3") || 0);
  const totalGHG = totalScope1 + scope2Location + scope3Total;
  const denominatorValue = Number(watch("gri205.disclosure3054.denominatorValue") || 0);
  const ghgIntensity = denominatorValue > 0 ? totalGHG / denominatorValue : 0;
  const baseYearEmissions = Number(watch("gri205.disclosure3051.baseYearEmissions") || 0);
  const totalReduced = Number(watch("gri205.disclosure3055.totalReduced") || 0);
  const reductionPercent = baseYearEmissions > 0 ? (totalReduced / baseYearEmissions) * 100 : 0;
  const odsProduced = Number(watch("gri205.disclosure3056.odsProduced") || 0);
  const odsDestroyed = Number(watch("gri205.disclosure3056.odsDestroyed") || 0);
  const odsFeedstock = Number(watch("gri205.disclosure3056.odsFeedstock") || 0);
  const odsNet = odsProduced - odsDestroyed - odsFeedstock;


  //  Gri 301 Materials
  const renderGRI301 = () => (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white p-3 rounded-md border border-gray-200">
        <h3 className="text-lg font-bold text-[#4639AA] mb-6 flex items-center gap-2">
          <Icon icon="mdi:file-document-outline" /> Materials
        </h3>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <InfoLabel
              label="Q1. Has Materials been identified as a material topic?"
              info="Select Yes if your company’s environmental impact is influenced by the type or quantity of materials used, including raw materials, packaging materials, or recycled inputs. 
              Example situations: 
              Manufacturing companies using metals, plastics, chemicals; 
              Food companies using agricultural materials; 
              Businesses generating packaging waste."
            />
            <div className="flex gap-4">
              {["yes", "no"].map((opt) => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value={opt}
                    {...register("gri201.isMaterial")}
                    className="w-4 h-4 text-[#4639AA] focus:ring-[#4639AA]"
                  />
                  <span className="capitalize text-sm text-gray-700">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {watch("gri201.isMaterial") === "yes" && (
            <>
              <div>
                <InfoLabel
                  label="Q2. How does the organization manage materials used in its operations?"
                  info="Explain how your company manages the use of raw materials, packaging materials, and recycled inputs. 
                  You may include: 
                  Procurement policies, 
                  Supplier sustainability requirements, 
                  Use of recycled materials, 
                  Reduction of packaging, 
                  Waste minimization initiatives, 
                  Circular economy practices."
                />
                <textarea
                  {...register("gri201.managementDescription")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[120px]"
                  placeholder="Describe procurement policy, recycled inputs, packaging reduction, waste minimization, or circular economy practices..."
                />
              </div>

              <div>
                <InfoLabel
                  label="Q3. Who oversees materials management?"
                  info="Select the person or department responsible for monitoring material consumption and efficiency."
                />
                <select
                  {...register("gri201.oversight")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
                >
                  <option>Operations Manager</option>
                  <option>Procurement Head</option>
                  <option>Sustainability / ESG Manager</option>
                  <option>Production Manager</option>
                  <option>CEO / Owner</option>
                  <option>Other</option>
                </select>
              </div>
            </>
          )}

          {watch("gri201.isMaterial") === "no" && (
            <div className="mt-4 bg-[#4639AA]/5 border border-[#4639AA]/15 p-4 rounded-xl">
              <h4 className="text-sm font-bold text-[#4639AA] mb-3">Omission Logic (GRI 301)</h4>
              <ul className="list-disc pl-5 text-xs text-gray-600 space-y-1 mb-4">
                <li>Material consumption not reported</li>
                <li>Recycled inputs not calculated</li>
                <li>Reclaimed product data unavailable</li>
              </ul>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <InfoLabel
                    label="Reason for omission"
                    info="Disclosure is omitted when information is not applicable or not available. Select the closest reason."
                  />
                  <select
                    {...register("gri201.omissionReason")}
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
                    info="Explain why the disclosure is omitted for GRI 301."
                  />
                  <textarea
                    {...register("gri201.omissionExplanation")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[100px]"
                    placeholder="e.g. Material use is not tracked for this reporting period..."
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {watch("gri201.isMaterial") === "yes" && (
        <>
          {/* GRI 301-1 Materials Used by Weight or Volume */}
          <div className="bg-white p-3 rounded-md border border-gray-200">
            <span className="flex items-start gap-2 mb-2">
              <InfoHeading
                icon="mdi:chart-areaspline"
                heading="Materials Used by Weight or Volume"
                info={
                  <span>
                    This disclosure shows how much raw material your company used, whether materials are renewable or non-renewable, and the overall resource intensity of operations.
                  </span>
                }
              />
            </span>

            <section className="space-y-4">
              <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b pb-1">
                SECTION A – Material Categories
              </h4>
              <InfoLabel
                label="Q1. List main materials used in your operations"
                info="Include major raw materials or packaging materials used to produce your products or services. Examples: Steel, Plastic resin, Paper packaging, Glass bottles, Wood."
              />
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-2 border border-gray-200">Material Type</th>
                      <th className="p-2 border border-gray-200">Category</th>
                      <th className="p-2 border border-gray-200">Unit</th>
                      <th className="p-2 border border-gray-200">Quantity Used</th>
                    </tr>
                  </thead>
                  <tbody>
                    {materials.map((item, idx) => (
                      <tr key={idx}>
                        <td className="p-1 border border-gray-200">
                          <input
                            {...register(`gri201.materials.${idx}.materialType`)}
                            className="w-full p-1 border-none outline-none"
                            placeholder="e.g. Steel"
                          />
                        </td>
                        <td className="p-1 border border-gray-200">
                          <select
                            {...register(`gri201.materials.${idx}.category`)}
                            className="w-full p-1 border-none outline-none bg-transparent"
                          >
                            <option>Renewable</option>
                            <option>Non-renewable</option>
                          </select>
                        </td>
                        <td className="p-1 border border-gray-200">
                          <select
                            {...register(`gri201.materials.${idx}.unit`)}
                            className="w-full p-1 border-none outline-none bg-transparent"
                          >
                            <option>kg</option>
                            <option>tons</option>
                            <option>liters</option>
                            <option>cubic meters</option>
                          </select>
                        </td>
                        <td className="p-1 border border-gray-200">
                          <input
                            type="number"
                            {...register(`gri201.materials.${idx}.quantity`)}
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
                onClick={() =>
                  setValue("gri201.materials", [
                    ...materials,
                    { materialType: "", category: "Renewable", unit: "kg", quantity: 0 }
                  ])
                }
                className="text-xs text-[#4639AA] font-bold"
              >
                + Add Material
              </button>

              <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b pb-1">
                SECTION B – Total Material Consumption
              </h4>
              <div className="grid md:grid-cols-3 gap-4 mt-4 text-sm text-gray-700">
                <div className="bg-[#F8FAFC] p-3 rounded-lg border border-gray-200">
                  <div className="font-semibold">Total Renewable Materials</div>
                  <div className="mt-2">{totalRenewableMaterials.toLocaleString()}</div>
                </div>
                <div className="bg-[#F8FAFC] p-3 rounded-lg border border-gray-200">
                  <div className="font-semibold">Total Non-Renewable Materials</div>
                  <div className="mt-2">{totalNonRenewableMaterials.toLocaleString()}</div>
                </div>
                <div className="bg-[#F8FAFC] p-3 rounded-lg border border-gray-200">
                  <div className="font-semibold">Total Materials Used</div>
                  <div className="mt-2">{totalMaterialsUsed.toLocaleString()}</div>
                </div>
              </div>
            </section>

            <section className="space-y-4 mt-6">
              <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b pb-1">
                SECTION C – Internal vs External Sources
              </h4>
              <InfoLabel
                label="Q2. Were any materials sourced internally (reused within the company)?"
                info="Internal sourcing means materials recovered from internal processes or reused waste streams. Example: Metal scrap reused in production or Reprocessed plastic."
              />
              <div className="flex gap-4 mb-4">
                {['yes', 'no'].map((opt) => (
                  <label key={opt} className="flex items-center gap-2">
                    <input
                      type="radio"
                      value={opt}
                      {...register('gri201.internalReuse.exists')}
                      className="w-4 h-4 text-[#4639AA]"
                    />
                    <span className="capitalize text-sm">{opt}</span>
                  </label>
                ))}
              </div>
              {watch('gri201.internalReuse.exists') === 'yes' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse border border-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="p-2 border border-gray-200">Material</th>
                        <th className="p-2 border border-gray-200">Quantity Reused</th>
                        <th className="p-2 border border-gray-200">Unit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(watch('gri201.internalReuse.items') || []).map((item, idx) => (
                        <tr key={idx}>
                          <td className="p-1 border border-gray-200">
                            <input
                              {...register(`gri201.internalReuse.items.${idx}.material`)}
                              className="w-full p-1 border-none outline-none"
                              placeholder="e.g. Metal scrap"
                            />
                          </td>
                          <td className="p-1 border border-gray-200">
                            <input
                              type="number"
                              {...register(`gri201.internalReuse.items.${idx}.quantityReused`)}
                              className="w-full p-1 border-none outline-none"
                              placeholder="0"
                            />
                          </td>
                          <td className="p-1 border border-gray-200">
                            <select
                              {...register(`gri201.internalReuse.items.${idx}.unit`)}
                              className="w-full p-1 border-none outline-none bg-transparent"
                            >
                              <option>kg</option>
                              <option>tons</option>
                              <option>liters</option>
                              <option>cubic meters</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button
                    type="button"
                    onClick={() =>
                      setValue('gri201.internalReuse.items', [
                        ...(watch('gri201.internalReuse.items') || []),
                        { material: '', quantityReused: 0, unit: 'kg' }
                      ])
                    }
                    className="mt-2 text-xs text-[#4639AA] font-bold"
                  >
                    + Add Reused Material
                  </button>
                </div>
              )}
            </section>
          </div>
          {/* GRI 301-2 Recycled Input Materials Used */}
          <div className="bg-white p-3 rounded-md border border-gray-200">
            <span className="flex items-start gap-2 mb-2">
              <InfoHeading
                icon="mdi:recycle"
                heading="Recycled Input Materials Used"
                info="This disclosure measures how much recycled material your company uses instead of virgin material. Using recycled materials helps reduce:
                  • resource extraction
                  • environmental impacts
                  • waste generation"
              />
            </span>

            <section className="space-y-4">
              <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b pb-1">
                SECTION A – Recycled Inputs
              </h4>
              <InfoLabel
                label="Q1. Report recycled materials used as production inputs"
                info="Include materials that were previously used and then processed for reuse. Examples: recycled paper, recycled aluminum, recycled plastic pellets."
              />
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-2 border border-gray-200">Material</th>
                      <th className="p-2 border border-gray-200">Recycled Quantity</th>
                      <th className="p-2 border border-gray-200">Unit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(recycledInputs || []).map((item, idx) => (
                      <tr key={idx}>
                        <td className="p-1 border border-gray-200">
                          <input
                            {...register(`gri201.recycledInputs.items.${idx}.material`)}
                            className="w-full p-1 border-none outline-none"
                            placeholder="e.g. Recycled plastic"
                          />
                        </td>
                        <td className="p-1 border border-gray-200">
                          <input
                            type="number"
                            {...register(`gri201.recycledInputs.items.${idx}.recycledQuantity`)}
                            className="w-full p-1 border-none outline-none"
                            placeholder="0"
                          />
                        </td>
                        <td className="p-1 border border-gray-200">
                          <select
                            {...register(`gri201.recycledInputs.items.${idx}.unit`)}
                            className="w-full p-1 border-none outline-none bg-transparent"
                          >
                            <option>kg</option>
                            <option>tons</option>
                            <option>liters</option>
                            <option>cubic meters</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                type="button"
                onClick={() =>
                  setValue('gri201.recycledInputs.items', [
                    ...(recycledInputs || []),
                    { material: '', recycledQuantity: 0, unit: 'kg' }
                  ])
                }
                className="text-xs text-[#4639AA] font-bold"
              >
                + Add Recycled Material
              </button>
            </section>

            <section className="space-y-4 mt-4">
              <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b pb-1">
                SECTION B – Total Inputs Reference
              </h4>
              <div className="bg-[#F8FAFC] p-3 rounded-lg border border-gray-200 text-sm text-gray-700">
                <div>Total Materials Used (Disclosure 301-1): {totalMaterialsUsed.toLocaleString()}</div>
                <div>Total Recycled Materials: {totalRecycledMaterials.toLocaleString()}</div>
              </div>
            </section>

            <section className="space-y-4 mt-4">
              <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b pb-1">
                SECTION C – Recycled Material Percentage
              </h4>
              <div className="bg-[#F8FAFC] p-3 rounded-lg border border-gray-200 text-sm text-gray-700">
                <div className="font-semibold">Recycled Input Percentage:</div>
                <div className="mt-2">{recycledPercentage.toFixed(1)}%</div>
              </div>
            </section>
          </div>
          {/* GRI 301-3 Reclaimed Products and Packaging Materials */}
          <div className="bg-white p-3 rounded-md border border-gray-200">
            <span className="flex items-start gap-2 mb-2">
              <InfoHeading
                icon="mdi:package-variant-closed"
                heading="Reclaimed Products and Packaging Materials"
                info="This disclosure shows whether your company takes back used products or packaging for recycling, reuse, or recovery.
                Examples:
                • bottle return systems
                • electronics take-back programs
                • pallet reuse systems"
              />
            </span>

            <section className="space-y-4">
              <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b pb-1">
                SECTION A – Product Reclamation
              </h4>
              <InfoLabel
                label="Q1. Does the organization reclaim products or packaging materials after sale?"
                info="Select Yes if your company collects used products or packaging from customers for reuse or recycling."
              />
              <div className="flex gap-4">
                {['yes', 'no'].map((opt) => (
                  <label key={opt} className="flex items-center gap-2">
                    <input
                      type="radio"
                      value={opt}
                      {...register('gri201.reclaimed.exists')}
                      className="w-4 h-4 text-[#4639AA]"
                    />
                    <span className="capitalize text-sm">{opt}</span>
                  </label>
                ))}
              </div>

              {watch('gri201.reclaimed.exists') === 'yes' ? (
                <>
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b pb-1">
                      SECTION B – Reclaimed Products
                    </h4>
                    <InfoLabel
                      label="Q2. Report products reclaimed during the reporting period"
                      info="Include only products successfully collected for reuse, recycling, or recovery."
                    />
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left border-collapse border border-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="p-2 border border-gray-200">Product Category</th>
                            <th className="p-2 border border-gray-200">Products Sold</th>
                            <th className="p-2 border border-gray-200">Products Reclaimed</th>
                            <th className="p-2 border border-gray-200">Reclamation Rate</th>
                          </tr>
                        </thead>
                        <tbody>
                          {reclaimedProducts.map((item, idx) => {
                            const sold = Number(item.productsSold) || 0;
                            const reclaimed = Number(item.productsReclaimed) || 0;
                            const rate = sold > 0 ? (reclaimed / sold) * 100 : 0;
                            return (
                              <tr key={idx}>
                                <td className="p-1 border border-gray-200">
                                  <input
                                    {...register(`gri201.reclaimed.products.${idx}.productCategory`)}
                                    className="w-full p-1 border-none outline-none"
                                    placeholder="e.g. Bottles"
                                  />
                                </td>
                                <td className="p-1 border border-gray-200">
                                  <input
                                    type="number"
                                    {...register(`gri201.reclaimed.products.${idx}.productsSold`)}
                                    className="w-full p-1 border-none outline-none"
                                    placeholder="0"
                                  />
                                </td>
                                <td className="p-1 border border-gray-200">
                                  <input
                                    type="number"
                                    {...register(`gri201.reclaimed.products.${idx}.productsReclaimed`)}
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
                      onClick={() =>
                        setValue('gri201.reclaimed.products', [
                          ...reclaimedProducts,
                          { productCategory: '', productsSold: 0, productsReclaimed: 0 }
                        ])
                      }
                      className="text-xs text-[#4639AA] font-bold"
                    >
                      + Add Product Category
                    </button>
                  </div>

                  <div className="space-y-4 mt-6">
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b pb-1">
                      SECTION D – Packaging Recovery
                    </h4>
                    <InfoLabel
                      label="Q3. Report packaging materials reclaimed"
                      info="Include packaging collected for recycling or reuse, such as pallets, bottles, or boxes."
                    />
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left border-collapse border border-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="p-2 border border-gray-200">Packaging Type</th>
                            <th className="p-2 border border-gray-200">Units Sold</th>
                            <th className="p-2 border border-gray-200">Units Reclaimed</th>
                            <th className="p-2 border border-gray-200">Recovery Rate</th>
                          </tr>
                        </thead>
                        <tbody>
                          {packagingRows.map((item, idx) => {
                            const sold = Number(item.unitsSold) || 0;
                            const reclaimed = Number(item.unitsReclaimed) || 0;
                            const rate = sold > 0 ? (reclaimed / sold) * 100 : 0;
                            return (
                              <tr key={idx}>
                                <td className="p-1 border border-gray-200">
                                  <input
                                    {...register(`gri201.reclaimed.packaging.${idx}.packagingType`)}
                                    className="w-full p-1 border-none outline-none"
                                    placeholder="e.g. Bottles"
                                  />
                                </td>
                                <td className="p-1 border border-gray-200">
                                  <input
                                    type="number"
                                    {...register(`gri201.reclaimed.packaging.${idx}.unitsSold`)}
                                    className="w-full p-1 border-none outline-none"
                                    placeholder="0"
                                  />
                                </td>
                                <td className="p-1 border border-gray-200">
                                  <input
                                    type="number"
                                    {...register(`gri201.reclaimed.packaging.${idx}.unitsReclaimed`)}
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
                      onClick={() =>
                        setValue('gri201.reclaimed.packaging', [
                          ...packagingRows,
                          { packagingType: '', unitsSold: 0, unitsReclaimed: 0 }
                        ])
                      }
                      className="text-xs text-[#4639AA] font-bold"
                    >
                      + Add Packaging Type
                    </button>
                  </div>

                  <div className="bg-[#F8FAFC] p-3 rounded-lg border border-gray-200 text-sm text-gray-700">
                    <div className="font-semibold">Products Reclamation Rate:</div>
                    <div className="mt-1">{reclamationRate.toFixed(1)}%</div>
                    <div className="font-semibold mt-3">Packaging Recovery Rate:</div>
                    <div className="mt-1">{packagingRecoveryRate.toFixed(1)}%</div>
                  </div>
                </>
              ) : (
                <div className="mt-4 bg-[#4639AA]/5 border border-[#4639AA]/15 p-4 rounded-xl">
                  <h4 className="text-sm font-bold text-[#4639AA] mb-3">Omission Logic (GRI 301)</h4>
                  <p className="text-xs text-gray-600">Reclaimed product or packaging data is not available for the reporting period.</p>
                </div>
              )}
            </section>
          </div>
        </>
      )}
    </div>
  );
  //  Gri 302 Energy
  const renderGRI302 = () => (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white p-3 rounded-md border border-gray-200">
        <h3 className="text-lg font-bold text-[#4639AA] mb-6 flex items-center gap-2">
          <Icon icon="mdi:flash" /> Energy
        </h3>

        <div className="grid grid-cols-1 gap-6">
          <div>
            <InfoLabel
              label="Q1. Does the organization have policies or practices related to energy use and efficiency?"
              info="Describe organizational policies, procedures, or initiatives implemented to manage energy consumption and efficiency."
            />
            <div className="flex gap-4">
              {["yes", "no"].map((opt) => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value={opt}
                    {...register("gri202.isMaterial")}
                    className="w-4 h-4 text-[#4639AA]"
                  />
                  <span className="capitalize text-sm text-gray-700">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {watch("gri202.isMaterial") === "yes" && (
            <>
              <div>
                <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1">
                  Brief description of policies or practices (max 300 characters)</label>
                
                <input
                  type="text"
                  maxLength={300}
                  {...register("gri202.managementDescription")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
                  placeholder="Enter a short description of energy policies or practices..."
                />
              </div>

              <div>
                <InfoLabel
                  label="Q2. Who is responsible for managing energy-related impacts?"
                  info="Select the function responsible for monitoring and managing organizational energy consumption."
                />
                <select
                  {...register("gri202.assignedFunction")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
                >
                  <option>Operations</option>
                  <option>Facilities management</option>
                  <option>Sustainability team</option>
                  <option>Energy management function</option>
                  <option>Senior management</option>
                  <option>Other</option>
                </select>
                {watch("gri202.assignedFunction") === "Other" && (
                  <textarea
                    {...register("gri202.assignedFunctionOther")}
                    className="w-full mt-3 px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[100px]"
                    placeholder="Describe the other responsible function..."
                  />
                )}
              </div>

              <div>
                <InfoLabel
                  label="Q3. What actions are taken to reduce energy consumption?"
                  info="Select actions implemented to reduce energy consumption or improve efficiency."
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "Energy efficiency programs",
                    "Equipment upgrades",
                    "Process optimization",
                    "Renewable energy adoption",
                    "Employee awareness programs",
                    "Other"
                  ].map((action) => (
                    <label key={action} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        value={action}
                        {...register("gri202.actions")}
                        className="w-4 h-4 text-[#4639AA]"
                      />
                      <span>{action}</span>
                    </label>
                  ))}
                </div>
                {Array.isArray(watch("gri202.actions")) && watch("gri202.actions").includes("Other") && (
                  <textarea
                    {...register("gri202.actionsOther")}
                    className="w-full mt-3 px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[100px]"
                    placeholder="Describe other action..."
                  />
                )}
              </div>

              <div>
                <InfoLabel
                  label="Q4. How does the organization monitor energy consumption?"
                  info="Indicate the mechanisms used to track energy consumption."
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "Energy meters and monitoring systems",
                    "Utility billing analysis",
                    "Operational reporting",
                    "External energy audits",
                    "Not monitored",
                   
                  ].map((method) => (
                    <label key={method} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        value={method}
                        {...register("gri202.monitoringMethods")}
                        className="w-4 h-4 text-[#4639AA]"
                      />
                      <span>{method}</span>
                    </label>
                  ))}
                </div>
                
              </div>
            </>
          )}

          {watch("gri202.isMaterial") === "no" && (
            <div className="mt-4 bg-[#4639AA]/5 border border-[#4639AA]/15 p-4 rounded-xl">
              <h4 className="text-sm font-bold text-[#4639AA] mb-3">Omission Logic (GRI 302)</h4>
              <p className="text-xs text-gray-600 mb-4">
                A disclosure is omitted when energy data is not tracked, systems are not in place, or disclosure is not applicable to operations.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <InfoLabel
                    label="Reason for omission"
                    info="Select the reason for omitting the Energy disclosure."
                  />
                  <select
                    {...register("gri202.omissionReason")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
                  >
                    <option value="">Select reason</option>
                    <option value="Not applicable">Not applicable</option>
                    <option value="Information unavailable">Information unavailable</option>
                    <option value="Legal restrictions">Legal restrictions</option>
                    <option value="Confidential information">Confidential information</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <InfoLabel
                    label="Explanation (required)"
                    info="Provide a mandatory explanation for omission."
                  />
                  <textarea
                    {...register("gri202.omissionExplanation")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[100px]"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
       {watch("gri202.isMaterial") === "yes" && (
          <>
            {/* GRI 302-1: Energy Consumption Within the Organization */}
            <div className="bg-white p-3 rounded-md border border-gray-200">
              <h1 className="text-lg font-bold text-[#4639AA] mb-4 flex items-center gap-2">
                <Icon icon="mdi:flash-triangle"  /> 
                Energy Consumption Within the Organization
              </h1>
             

              <div className="space-y-6 mt-6">
                <div>
                  <label className="flex items-center gap-1  font-medium text-gray-700 mb-1">
                    Q5. Does the organization track fuel consumption within the organization?</label>
                  
                  <div className="flex gap-4">
                    {["yes", "no"].map((opt) => (
                      <label key={opt} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value={opt}
                          {...register("gri202.disclosure3021.tracksFuel")}
                          className="w-4 h-4 text-[#4639AA]"
                        />
                        <span className="capitalize text-sm text-gray-700">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {watch("gri202.disclosure3021.tracksFuel") === "no" ? (
                  <div className="mt-4 bg-[#4639AA]/5 border border-[#4639AA]/15 p-4 rounded-xl text-sm text-gray-700">
                    <p className="font-semibold text-[#4639AA] mb-2">Disclosure 302-1 omitted</p>
                    <p>Fuel consumption is not tracked within the organization.</p>
                  </div>
                ) : (
                  <>
                    <section className="space-y-4">
                      
                      <div className="grid gap-4 lg:grid-cols-2">
                        <div className="space-y-3">
                          
                          <div className="overflow-x-auto">
                            <InfoLabel
                              label="Q6. Provide total fuel consumption from non-renewable sources."
                              info="Include fuels used in boilers, generators, vehicles, turbines, furnaces, and other equipment owned or controlled by the organization."
                            />
                            <table className="w-full text-xs text-left border-collapse border border-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="p-2 border border-gray-200">Fuel type</th>
                                  <th className="p-2 border border-gray-200">Energy consumed</th>
                                  <th className="p-2 border border-gray-200">Unit</th>
                                </tr>
                              </thead>
                              <tbody>
                                {(watch("gri202.disclosure3021.nonRenewableFuel") || []).map((item, idx) => (
                                  <tr key={idx}>
                                    <td className="p-1 border border-gray-200">
                                      <input
                                        {...register(`gri202.disclosure3021.nonRenewableFuel.${idx}.fuelType`)}
                                        className="w-full p-1 border-none outline-none"
                                        placeholder="e.g. Diesel"
                                      />
                                    </td>
                                    <td className="p-1 border border-gray-200">
                                      <input
                                        type="number"
                                        step="any"
                                        {...register(`gri202.disclosure3021.nonRenewableFuel.${idx}.energyConsumed`)}
                                        className="w-full p-1 border-none outline-none"
                                        placeholder="0"
                                      />
                                    </td>
                                    <td className="p-1 border border-gray-200">
                                      <select
                                        {...register(`gri202.disclosure3021.nonRenewableFuel.${idx}.unit`)}
                                        className="w-full p-1 border-none outline-none bg-transparent"
                                      >
                                        <option>J</option>
                                        <option>MJ</option>
                                        <option>GJ</option>
                                      </select>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              setValue("gri202.disclosure3021.nonRenewableFuel", [
                                ...(watch("gri202.disclosure3021.nonRenewableFuel") || []),
                                { fuelType: "", energyConsumed: 0, unit: "GJ" }
                              ])
                            }
                            className="text-xs text-[#4639AA] font-bold"
                          >
                            + Add fuel row
                          </button>
                        </div>

                        <div className="space-y-3">
                          <div className="overflow-x-auto">
                            <InfoLabel
                              label="Q7. Provide total fuel consumption from renewable sources."
                              info="Renewable fuels can include biomass and biofuels used for energy generation."
                            />
                            <table className="w-full text-xs text-left border-collapse border border-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="p-2 border border-gray-200">Fuel type</th>
                                  <th className="p-2 border border-gray-200">Energy consumed</th>
                                  <th className="p-2 border border-gray-200">Unit</th>
                                </tr>
                              </thead>
                              <tbody>
                                {(watch("gri202.disclosure3021.renewableFuel") || []).map((item, idx) => (
                                  <tr key={idx}>
                                    <td className="p-1 border border-gray-200">
                                      <input
                                        {...register(`gri202.disclosure3021.renewableFuel.${idx}.fuelType`)}
                                        className="w-full p-1 border-none outline-none"
                                        placeholder="e.g. Biomass"
                                      />
                                    </td>
                                    <td className="p-1 border border-gray-200">
                                      <input
                                        type="number"
                                        step="any"
                                        {...register(`gri202.disclosure3021.renewableFuel.${idx}.energyConsumed`)}
                                        className="w-full p-1 border-none outline-none"
                                        placeholder="0"
                                      />
                                    </td>
                                    <td className="p-1 border border-gray-200">
                                      <select
                                        {...register(`gri202.disclosure3021.renewableFuel.${idx}.unit`)}
                                        className="w-full p-1 border-none outline-none bg-transparent"
                                      >
                                        <option>J</option>
                                        <option>MJ</option>
                                        <option>GJ</option>
                                      </select>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              setValue("gri202.disclosure3021.renewableFuel", [
                                ...(watch("gri202.disclosure3021.renewableFuel") || []),
                                { fuelType: "", energyConsumed: 0, unit: "GJ" }
                              ])
                            }
                            className="text-xs text-[#4639AA] font-bold"
                          >
                            + Add fuel row
                          </button>
                        </div>
                      </div>
                    </section>

                    <section className="space-y-4">
                      <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b pb-1">Q8 / Q9 – Purchased and Sold Energy</h4>
                      <div className="grid gap-6 xl:grid-cols-2">
                        <div>
                          <p className="text-sm font-semibold mb-2">Electricity, heating, cooling and steam consumed</p>
                          <div className="overflow-x-auto">
                            <table className="w-full text-xs text-left border-collapse border border-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="p-2 border border-gray-200">Energy type</th>
                                  <th className="p-2 border border-gray-200">Amount consumed</th>
                                  <th className="p-2 border border-gray-200">Unit</th>
                                </tr>
                              </thead>
                              <tbody>
                                {(watch("gri202.disclosure3021.purchasedEnergy") || []).map((item, idx) => (
                                  <tr key={idx}>
                                    <td className="p-1 border border-gray-200">{item.energyType}</td>
                                    <td className="p-1 border border-gray-200">
                                      <input
                                        type="number"
                                        step="any"
                                        {...register(`gri202.disclosure3021.purchasedEnergy.${idx}.amountConsumed`)}
                                        className="w-full p-1 border-none outline-none"
                                        placeholder="0"
                                      />
                                    </td>
                                    <td className="p-1 border border-gray-200">
                                      <select
                                        {...register(`gri202.disclosure3021.purchasedEnergy.${idx}.unit`)}
                                        className="w-full p-1 border-none outline-none bg-transparent"
                                      >
                                        <option>J</option>
                                        <option>MJ</option>
                                        <option>GJ</option>
                                      </select>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-semibold mb-2">Electricity, heating, cooling and steam sold</p>
                          <div className="overflow-x-auto">
                            <table className="w-full text-xs text-left border-collapse border border-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="p-2 border border-gray-200">Energy type</th>
                                  <th className="p-2 border border-gray-200">Amount sold</th>
                                  <th className="p-2 border border-gray-200">Unit</th>
                                </tr>
                              </thead>
                              <tbody>
                                {(watch("gri202.disclosure3021.soldEnergy") || []).map((item, idx) => (
                                  <tr key={idx}>
                                    <td className="p-1 border border-gray-200">{item.energyType}</td>
                                    <td className="p-1 border border-gray-200">
                                      <input
                                        type="number"
                                        step="any"
                                        {...register(`gri202.disclosure3021.soldEnergy.${idx}.amountSold`)}
                                        className="w-full p-1 border-none outline-none"
                                        placeholder="0"
                                      />
                                    </td>
                                    <td className="p-1 border border-gray-200">
                                      <select
                                        {...register(`gri202.disclosure3021.soldEnergy.${idx}.unit`)}
                                        className="w-full p-1 border-none outline-none bg-transparent"
                                      >
                                        <option>J</option>
                                        <option>MJ</option>
                                        <option>GJ</option>
                                      </select>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <InfoLabel
                          label="Self-generated electricity, heating, cooling and steam not consumed"
                          info="Enter energy produced and not consumed within the organization."
                        />
                        <input
                          type="number"
                          step="any"
                          {...register("gri202.disclosure3021.selfGeneratedNotConsumed")}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]"
                          placeholder="0"
                        />
                      </div>
                      <div className="bg-[#F8FAFC] p-4 rounded-lg border border-gray-200">
                        <div className="font-semibold text-sm">Q10. Total energy consumption within the organization</div>
                        <div className="mt-3 text-lg font-bold text-gray-900">
                          {(
                            (watch("gri202.disclosure3021.nonRenewableFuel") || []).reduce(
                              (sum, item) => sum + (Number(item.energyConsumed) || 0),
                              0
                            ) +
                            (watch("gri202.disclosure3021.renewableFuel") || []).reduce(
                              (sum, item) => sum + (Number(item.energyConsumed) || 0),
                              0
                            ) +
                            (watch("gri202.disclosure3021.purchasedEnergy") || []).reduce(
                              (sum, item) => sum + (Number(item.amountConsumed) || 0),
                              0
                            ) +
                            Number(watch("gri202.disclosure3021.selfGeneratedNotConsumed") || 0) -
                            (watch("gri202.disclosure3021.soldEnergy") || []).reduce(
                              (sum, item) => sum + (Number(item.amountSold) || 0),
                              0
                            )
                          ).toLocaleString()}
                        </div>
                        
                        <p className="text-xs text-gray-500 mt-1 font-semibold">
                          Renewable Energy Share: {renewableEnergyShare.toFixed(1)}%
                        </p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="flex items-center gap-1  font-medium text-gray-700 mb-1">
                          Q11. What standards or methodologies are used to calculate energy consumption?</label>
                        
                        <select
                          {...register("gri202.disclosure3021.standards")}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
                        >
                          <option>National energy reporting standards</option>
                          <option>ISO 50001</option>
                          <option>GHG Protocol</option>
                          <option>Internal methodology</option>
                          <option>Other</option>
                        </select>
                        {watch("gri202.disclosure3021.standards") === "Other" && (
                          <input
                            type="text"
                            maxLength={100}
                            {...register("gri202.disclosure3021.standardsOther")}
                            className="w-full mt-3 px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
                            placeholder="Describe other standards or methodologies..."
                          />
                        )}
                      </div>
                      <div>
                        <label className="flex items-center gap-1  font-medium text-gray-700 mb-1">
                          Q12. Source of conversion factors used.
                        </label>
                        
                        <select
                          {...register("gri202.disclosure3021.conversionFactors")}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
                        >
                          <option>National conversion factors</option>
                          <option>International Energy Agency (IEA)</option>
                          <option>IPCC</option>
                          <option>Other</option>
                        </select>
                        {watch("gri202.disclosure3021.conversionFactors") === "Other" && (
                          <input
                            type="text"
                            maxLength={100}
                            {...register("gri202.disclosure3021.conversionFactorsOther")}
                            className="w-full mt-3 px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
                            placeholder="Describe other conversion factor source..."
                          />
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            {/* GRI 302-2: Energy Consumption Outside the Organization */}
            <div className="bg-white p-3 rounded-md border border-gray-200">
              <h1 className="text-lg font-bold text-[#4639AA] mb-4 flex items-center gap-2">
                <Icon icon="mdi:map-marker-path"  />
                Energy Consumption Outside the Organization
              </h1>
              <div className="space-y-6 mt-6">
                <div>
                  <label className="flex items-center gap-1 font-medium text-gray-700 mb-1">
                    Q13. Does the organization assess energy consumption outside its operations?
                  </label>
                  <div className="flex gap-4">
                    {["yes", "no"].map((opt) => (
                      <label key={opt} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value={opt}
                          {...register("gri202.disclosure3022.assessOutside")}
                          className="w-4 h-4 text-[#4639AA]"
                        />
                        <span className="capitalize text-sm text-gray-700">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {watch("gri202.disclosure3022.assessOutside") === "no" ? (
                  <div className="mt-4 bg-[#4639AA]/5 border border-[#4639AA]/15 p-4 rounded-xl text-sm text-gray-700">
                    <p className="font-semibold text-[#4639AA] mb-2">Disclosure 302-2 omitted</p>
                    <p>Energy outside the organization is not assessed during the reporting period.</p>
                  </div>
                ) : (
                  <>
                    <div className="overflow-x-auto">
                      <InfoLabel
                        label="Q14. Provide energy consumption outside the organization."
                        info="Exclude energy consumption already reported in Disclosure 302-1."
                      />
                      <table className="w-full text-xs text-left border-collapse border border-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="p-2 border border-gray-200">Activity category</th>
                            <th className="p-2 border border-gray-200">Energy consumed</th>
                            <th className="p-2 border border-gray-200">Unit</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(watch("gri202.disclosure3022.outsideEnergy") || []).map((item, idx) => (
                            <tr key={idx}>
                              <td className="p-1 border border-gray-200">{item.category}</td>
                              <td className="p-1 border border-gray-200">
                                <input
                                  type="number"
                                  step="any"
                                  {...register(`gri202.disclosure3022.outsideEnergy.${idx}.energyConsumed`)}
                                  className="w-full p-1 border-none outline-none"
                                  placeholder="0"
                                />
                              </td>
                              <td className="p-1 border border-gray-200">
                                <select
                                  {...register(`gri202.disclosure3022.outsideEnergy.${idx}.unit`)}
                                  className="w-full p-1 border-none outline-none bg-transparent"
                                >
                                  <option>J</option>
                                  <option>MJ</option>
                                  <option>GJ</option>
                                </select>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-4">
                      <InfoLabel
                        label="Q15. What methodology is used to estimate energy consumption outside the organization?"
                        info="Describe standards, assumptions, or tools used to calculate energy consumption outside organizational boundaries."
                      />
                      <textarea
                        {...register("gri202.disclosure3022.methodology")}
                        maxLength={300}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[100px]"
                        placeholder="Describe methodology..."
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
            {/* GRI 302-3: Energy Intensity */}
            <div className="bg-white p-3 rounded-md border border-gray-200">
              <h1 className="text-lg font-bold text-[#4639AA] mb-4 flex items-center gap-2">
                 <Icon icon="mdi:chart-line" />
                 Energy Intensity
              </h1>
              
              <div className="space-y-6 mt-6">
                <div className="overflow-x-auto">
                 <label className="block text-sm font-medium text-gray-700 mb-1">
                    Q16. Provide energy intensity ratio.
                  </label>
                  <table className="w-full text-xs text-left border-collapse border border-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="p-2 border border-gray-200">Energy consumption</th>
                        <th className="p-2 border border-gray-200">Organization metric</th>
                        <th className="p-2 border border-gray-200">Energy intensity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-1 border border-gray-200">
                          <input
                            type="number"
                            step="any"
                            {...register("gri202.disclosure3023.energyConsumption")}
                            className="w-full p-1 border-none outline-none"
                            placeholder="0"
                          />
                        </td>
                        <td className="p-1 border border-gray-200">
                          <input
                            {...register("gri202.disclosure3023.organizationMetric")}
                            className="w-full p-1 border-none outline-none"
                            placeholder="e.g. Production volume"
                          />
                        </td>
                        <td className="p-1 border border-gray-200">
                          <input
                            {...register("gri202.disclosure3023.energyIntensity")}
                            className="w-full p-1 border-none outline-none"
                            placeholder="0"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div>
                  <label className="flex items-center gap-1 font-medium text-gray-700 mb-1">
                    Q17. Types of energy included in the intensity ratio.</label>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      "Fuel",
                      "Electricity",
                      "Heating",
                      "Cooling",
                      "Steam",
                      "All energy types"
                    ].map((type) => (
                      <label key={type} className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          value={type}
                          {...register("gri202.disclosure3023.energyTypesIncluded")}
                          className="w-4 h-4 text-[#4639AA]"
                        />
                        <span>{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-1 font-medium text-gray-700 mb-1">
                    Q18. Does the ratio include energy consumed outside the organization?
                  </label>
                  <div className="flex gap-4">
                    {["yes", "no"].map((opt) => (
                      <label key={opt} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value={opt}
                          {...register("gri202.disclosure3023.includesOutside")}
                          className="w-4 h-4 text-[#4639AA]"
                        />
                        <span className="capitalize text-sm text-gray-700">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* GRI 302-4: Reduction of Energy Consumption */}
            <div className="bg-white p-3 rounded-md border border-gray-200">
              <h1 className="text-lg font-bold text-[#4639AA] mb-4 flex items-center gap-2">
                <Icon icon="mdi:arrow-down-bold" /> Reduction of Energy Consumption
              </h1>
              
              <div className="space-y-6 mt-6">
                <div>
                  <label className="flex items-center gap-1 font-medium text-gray-700 mb-1">
                    Q19. Has the organization achieved reductions in energy consumption?
                  </label>
                  
                  <div className="flex gap-4">
                    {["yes", "no"].map((opt) => (
                      <label key={opt} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value={opt}
                          {...register("gri202.disclosure3024.hasReductions")}
                          className="w-4 h-4 text-[#4639AA]"
                        />
                        <span className="capitalize text-sm text-gray-700">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {watch("gri202.disclosure3024.hasReductions") === "no" ? (
                  <div className="mt-4 bg-[#4639AA]/5 border border-[#4639AA]/15 p-4 rounded-xl text-sm text-gray-700">
                    <p className="font-semibold text-[#4639AA] mb-2">Disclosure 302-4 not applicable</p>
                    <p>Reduction data is not applicable for this reporting period.</p>
                  </div>
                ) : (
                  <>
                    <div className="overflow-x-auto">
                       <label className="flex items-center gap-1 font-medium text-gray-700 mb-1">
                        Q20. Provide amount of energy reduction achieved.
                        </label>
                      <table className="w-full text-xs text-left border-collapse border border-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="p-2 border border-gray-200">Initiative</th>
                            <th className="p-2 border border-gray-200">Energy type</th>
                            <th className="p-2 border border-gray-200">Energy reduction</th>
                            <th className="p-2 border border-gray-200">Unit</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(watch("gri202.disclosure3024.energyReductions") || []).map((item, idx) => (
                            <tr key={idx}>
                              <td className="p-1 border border-gray-200">
                                <input
                                  {...register(`gri202.disclosure3024.energyReductions.${idx}.initiative`)}
                                  className="w-full p-1 border-none outline-none"
                                  placeholder="e.g. LED retrofit"
                                />
                              </td>
                              <td className="p-1 border border-gray-200">
                                <input
                                  {...register(`gri202.disclosure3024.energyReductions.${idx}.energyType`)}
                                  className="w-full p-1 border-none outline-none"
                                  placeholder="e.g. Electricity"
                                />
                              </td>
                              <td className="p-1 border border-gray-200">
                                <input
                                  type="number"
                                  step="any"
                                  {...register(`gri202.disclosure3024.energyReductions.${idx}.reductionAmount`)}
                                  className="w-full p-1 border-none outline-none"
                                  placeholder="0"
                                />
                              </td>
                              <td className="p-1 border border-gray-200">
                                <select
                                  {...register(`gri202.disclosure3024.energyReductions.${idx}.unit`)}
                                  className="w-full p-1 border-none outline-none bg-transparent"
                                >
                                  <option>J</option>
                                  <option>MJ</option>
                                  <option>GJ</option>
                                </select>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setValue("gri202.disclosure3024.energyReductions", [
                          ...(watch("gri202.disclosure3024.energyReductions") || []),
                          { initiative: "", energyType: "", reductionAmount: 0, unit: "GJ" }
                        ])
                      }
                      className="text-xs text-[#4639AA] font-bold"
                    >
                      + Add reduction initiative
                    </button>
                    <div className="grid md:grid-cols-2 gap-6 mt-4">
                      <div>
                        <label className="flex items-center gap-1 font-medium text-gray-700 mb-1">
                          Q21. Basis used for calculating reductions
                        </label>
                        <select
                          {...register("gri202.disclosure3024.basis")}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
                        >
                          <option>Baseline year comparison</option>
                          <option>Energy audit</option>
                          <option>Estimated savings</option>
                          <option>Other</option>
                        </select>
                        {watch("gri202.disclosure3024.basis") === "Other" && (
                          <input
                            type="text"
                            maxLength={100}
                            {...register("gri202.disclosure3024.basisOther")}
                            className="w-full mt-3 px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
                            placeholder="Describe other basis used..."
                          />
                        )}
                      </div>
                      <div>
                        <InfoLabel
                          label="Q22. What methodology was used?"
                          info="Explain if reductions are estimated, modeled, or directly measured."
                        />
                        <textarea
                          {...register("gri202.disclosure3024.methodology")}
                          maxLength={300}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[100px]"
                          placeholder="Describe methodology..."
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            {/* GRI 302-5: Reductions in Energy Requirements of Products and Services */}
            <div className="bg-white p-3 rounded-md border border-gray-200">
              <h1 className="text-lg font-bold text-[#4639AA] mb-4 flex items-center gap-2">
                <Icon icon="mdi:factory" />
                Reductions in Energy Requirements of Products and Services
              </h1>
              <div className="space-y-6 mt-6">
                <div>
                  <label className="flex items-center gap-1 font-medium text-gray-700 mb-1">
                    Q23. Have products or services been redesigned to reduce energy requirements?
                    </label>
                  <div className="flex gap-4">
                    {["yes", "no"].map((opt) => (
                      <label key={opt} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value={opt}
                          {...register("gri202.disclosure3025.productRedesign")}
                          className="w-4 h-4 text-[#4639AA]"
                        />
                        <span className="capitalize text-sm text-gray-700">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {watch("gri202.disclosure3025.productRedesign") === "yes" ? (
                  <>
                    <div className="overflow-x-auto">
                      <label className="flex items-center gap-1 font-medium text-gray-700 mb-1">
                        Q24. Provide reductions in energy requirements of products or services.
                      </label>
                      <table className="w-full text-xs text-left border-collapse border border-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="p-2 border border-gray-200">Product / Service</th>
                            <th className="p-2 border border-gray-200">Baseline energy requirement</th>
                            <th className="p-2 border border-gray-200">New energy requirement</th>
                            <th className="p-2 border border-gray-200">Reduction</th>
                            <th className="p-2 border border-gray-200">Unit</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(watch("gri202.disclosure3025.productReductions") || []).map((item, idx) => (
                            <tr key={idx}>
                              <td className="p-1 border border-gray-200">
                                <input
                                  {...register(`gri202.disclosure3025.productReductions.${idx}.productService`)}
                                  className="w-full p-1 border-none outline-none"
                                  placeholder="e.g. Pump system"
                                />
                              </td>
                              <td className="p-1 border border-gray-200">
                                <input
                                  type="number"
                                  step="any"
                                  {...register(`gri202.disclosure3025.productReductions.${idx}.baselineEnergy`)}
                                  className="w-full p-1 border-none outline-none"
                                  placeholder="0"
                                />
                              </td>
                              <td className="p-1 border border-gray-200">
                                <input
                                  type="number"
                                  step="any"
                                  {...register(`gri202.disclosure3025.productReductions.${idx}.newEnergy`)}
                                  className="w-full p-1 border-none outline-none"
                                  placeholder="0"
                                />
                              </td>
                              <td className="p-1 border border-gray-200">
                                <input
                                  type="number"
                                  step="any"
                                  {...register(`gri202.disclosure3025.productReductions.${idx}.reduction`)}
                                  className="w-full p-1 border-none outline-none"
                                  placeholder="0"
                                />
                              </td>
                              <td className="p-1 border border-gray-200">
                                <select
                                  {...register(`gri202.disclosure3025.productReductions.${idx}.unit`)}
                                  className="w-full p-1 border-none outline-none bg-transparent"
                                >
                                  <option>J</option>
                                  <option>MJ</option>
                                  <option>GJ</option>
                                  <option>kWh</option>
                                </select>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setValue("gri202.disclosure3025.productReductions", [
                          ...(watch("gri202.disclosure3025.productReductions") || []),
                          { productService: "", baselineEnergy: 0, newEnergy: 0, reduction: 0, unit: "GJ" }
                        ])
                      }
                      className="text-xs text-[#4639AA] font-bold"
                    >
                      + Add product/service reduction
                    </button>
                    <div className="mt-4">
                      <label className="flex items-center gap-1 font-medium text-gray-700 mb-1">
                        Q25. Basis used for calculating reductions
                      </label>
                      <select
                        {...register("gri202.disclosure3025.basis")}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
                      >
                        <option>Industry use standards</option>
                        <option>Product testing</option>
                        <option>Engineering estimates</option>
                        <option>Other</option>
                      </select>
                      {watch("gri202.disclosure3025.basis") === "Other" && (
                        <input
                          type="text"
                          maxLength={100}
                          {...register("gri202.disclosure3025.basisOther")}
                          className="w-full mt-3 px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
                          placeholder="Describe other basis used..."
                        />
                      )}
                    </div>
                  </>
                ) : (
                  <div className="mt-4 bg-[#4639AA]/5 border border-[#4639AA]/15 p-4 rounded-xl text-sm text-gray-700">
                    <p className="font-semibold text-[#4639AA] mb-2">Disclosure 302-5 not applicable</p>
                    <p>No product or service redesign for reduced energy requirements was reported.</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
    </div>
  );
  //  Gri 303 Water and Effluents
  const renderGRI303 = () => (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white p-3 rounded-md border border-gray-200">
        <h3 className="text-lg font-bold text-[#4639AA] mb-6 flex items-center gap-2">
          <Icon icon="mdi:water" /> Water and Effluents
        </h3>

        <div className="grid grid-cols-1 gap-6">
          <div>
            <InfoLabel
              label="Q1. Has Water and Effluents been identified as a material topic?"
              info="Select Yes if your organization uses significant amounts of water, discharges wastewater, or operates in areas where water availability or water pollution could impact communities or ecosystems."
            />
            <div className="flex gap-4">
              {["yes", "no"].map((opt) => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value={opt}
                    {...register("gri203.isMaterial")}
                    className="w-4 h-4 text-[#4639AA]"
                  />
                  <span className="capitalize text-sm text-gray-700">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {watch("gri203.isMaterial") === "yes" && (
            <>
              <div>
                <InfoLabel
                  label="Q2. How does the organization interact with water?"
                  info="Describe how water is withdrawn, consumed, reused, and discharged in your operations and value chain. Examples: • Water used in manufacturing • Cooling water • Cleaning processes • Agricultural irrigation • Wastewater discharge Include impacts caused directly or through suppliers."
                />
                <textarea
                  {...register("gri203.waterInteraction")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[120px]"
                  placeholder="Describe water interactions..."
                />
              </div>

              <div>
                <InfoLabel
                  label="Q3. How does the organization identify water-related impacts?"
                  info="Explain the methods used to assess water risks and impacts such as: • Environmental impact assessments • Life cycle assessments • Water footprint analysis • Stakeholder consultation • Scenario analysis Include the scope and timeframe of assessments."
                />
                <textarea
                  {...register("gri203.impactIdentification")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[120px]"
                  placeholder="Describe impact identification methods..."
                />
              </div>

              <div>
                <InfoLabel
                  label="Q4. How are water-related impacts addressed?"
                  info="Explain the actions taken to reduce water impacts, such as: • Water recycling and reuse • Wastewater treatment • Efficiency improvements • Collaboration with communities • Supplier engagement"
                />
                <textarea
                  {...register("gri203.impactAddressing")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[120px]"
                  placeholder="Describe how impacts are addressed..."
                />
              </div>

              <div>
                <InfoLabel
                  label="Q5. Does the organization collaborate with stakeholders to manage water resources?"
                  info="Water is a shared resource. Indicate whether the company works with: • Local communities • Governments • NGOs • Suppliers • Other water users in the same catchment"
                />
                <div className="flex gap-4">
                  {["yes", "no"].map((opt) => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value={opt}
                        {...register("gri203.stakeholderCollaboration")}
                        className="w-4 h-4 text-[#4639AA]"
                      />
                      <span className="capitalize text-sm text-gray-700">{opt}</span>
                    </label>
                  ))}
                </div>
                {watch("gri203.stakeholderCollaboration") === "yes" && (
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full text-xs text-left border-collapse border border-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="p-2 border border-gray-200">Stakeholder Type</th>
                          <th className="p-2 border border-gray-200">Engagement Activity</th>
                          <th className="p-2 border border-gray-200">Frequency</th>
                          <th className="p-2 border border-gray-200">Outcome</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(watch("gri203.stakeholderEngagement") || []).map((item, idx) => (
                          <tr key={idx}>
                            <td className="p-1 border border-gray-200">
                              <input
                                {...register(`gri203.stakeholderEngagement.${idx}.stakeholderType`)}
                                className="w-full p-1 border-none outline-none"
                                placeholder="e.g. Local community"
                              />
                            </td>
                            <td className="p-1 border border-gray-200">
                              <input
                                {...register(`gri203.stakeholderEngagement.${idx}.activity`)}
                                className="w-full p-1 border-none outline-none"
                                placeholder="e.g. Water quality monitoring"
                              />
                            </td>
                            <td className="p-1 border border-gray-200">
                              <input
                                {...register(`gri203.stakeholderEngagement.${idx}.frequency`)}
                                className="w-full p-1 border-none outline-none"
                                placeholder="e.g. Quarterly"
                              />
                            </td>
                            <td className="p-1 border border-gray-200">
                              <input
                                {...register(`gri203.stakeholderEngagement.${idx}.outcome`)}
                                className="w-full p-1 border-none outline-none"
                                placeholder="e.g. Improved water quality"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <button
                      type="button"
                      onClick={() =>
                        setValue("gri203.stakeholderEngagement", [
                          ...(watch("gri203.stakeholderEngagement") || []),
                          { stakeholderType: "", activity: "", frequency: "", outcome: "" }
                        ])
                      }
                      className="mt-2 text-xs text-[#4639AA] font-bold"
                    >
                      + Add stakeholder engagement
                    </button>
                  </div>
                )}
              </div>

              <div>
                <InfoLabel
                  label="Q6. Does the organization set water-related targets?"
                  info="Targets may include: • Water reduction targets • Wastewater quality improvements • Water reuse goals Targets should align with local water stress conditions and public policies such as SDG 6 (Clean Water and Sanitation)."
                />
                <div className="flex gap-4">
                  {["yes", "no"].map((opt) => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value={opt}
                        {...register("gri203.waterTargets")}
                        className="w-4 h-4 text-[#4639AA]"
                      />
                      <span className="capitalize text-sm text-gray-700">{opt}</span>
                    </label>
                  ))}
                </div>
                {watch("gri203.waterTargets") === "yes" && (
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full text-xs text-left border-collapse border border-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="p-2 border border-gray-200">Target</th>
                          <th className="p-2 border border-gray-200">Baseline Year</th>
                          <th className="p-2 border border-gray-200">Target Year</th>
                          <th className="p-2 border border-gray-200">Progress</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(watch("gri203.targetsTable") || []).map((item, idx) => (
                          <tr key={idx}>
                            <td className="p-1 border border-gray-200">
                              <input
                                {...register(`gri203.targetsTable.${idx}.target`)}
                                className="w-full p-1 border-none outline-none"
                                placeholder="e.g. Reduce water usage by 20%"
                              />
                            </td>
                            <td className="p-1 border border-gray-200">
                              <input
                                {...register(`gri203.targetsTable.${idx}.baselineYear`)}
                                className="w-full p-1 border-none outline-none"
                                placeholder="e.g. 2020"
                              />
                            </td>
                            <td className="p-1 border border-gray-200">
                              <input
                                {...register(`gri203.targetsTable.${idx}.targetYear`)}
                                className="w-full p-1 border-none outline-none"
                                placeholder="e.g. 2025"
                              />
                            </td>
                            <td className="p-1 border border-gray-200">
                              <input
                                {...register(`gri203.targetsTable.${idx}.progress`)}
                                className="w-full p-1 border-none outline-none"
                                placeholder="e.g. 15% complete"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <button
                      type="button"
                      onClick={() =>
                        setValue("gri203.targetsTable", [
                          ...(watch("gri203.targetsTable") || []),
                          { target: "", baselineYear: "", targetYear: "", progress: "" }
                        ])
                      }
                      className="mt-2 text-xs text-[#4639AA] font-bold"
                    >
                      + Add target
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {watch("gri203.isMaterial") === "no" && (
            <div className="mt-4 bg-[#4639AA]/5 border border-[#4639AA]/15 p-4 rounded-xl">
              <h4 className="text-sm font-bold text-[#4639AA] mb-3">Omission Logic (GRI 303)</h4>
              <p className="text-xs text-gray-600 mb-4">
                A disclosure is marked Omitted if: • Organization does not withdraw water • No water discharge occurs • Water impacts not material
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <InfoLabel
                    label="Reason for omission"
                    info="Select the reason for omitting the Water and Effluents disclosure."
                  />
                  <select
                    {...register("gri203.omissionReason")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
                  >
                    <option value="">Select reason</option>
                    <option value="Not applicable">Not applicable</option>
                    <option value="Data unavailable">Data unavailable</option>
                    <option value="Legal restrictions">Legal restrictions</option>
                    <option value="Confidential information">Confidential information</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <InfoLabel
                    label="Explanation (required)"
                    info="Provide a mandatory explanation for omission."
                  />
                  <textarea
                    {...register("gri203.omissionExplanation")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[100px]"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {watch("gri203.isMaterial") === "yes" && (
        <>
          {/* GRI 303-1: Interactions with Water as a Shared Resource */}
          <div className="bg-white p-3 rounded-md border border-gray-200">
            <InfoHeading
              icon="mdi:water-sync"
              heading=" Interactions with Water as a Shared Resource"
              info="This explains how the organization uses water and its impacts on water resources."
            />

            <div className="space-y-6 mt-6">
              <div>
                <InfoLabel
                  label="Q1. Describe where water is withdrawn, consumed, and discharged."
                  info="Include: • Rivers • Groundwater • Municipal water supply • Seawater"
                />
                <textarea
                  {...register("gri203.disclosure3031.waterDescription")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[120px]"
                  placeholder="Describe water withdrawal, consumption, and discharge locations..."
                />
              </div>

              <div>
                <InfoLabel
                  label="Q2. Does the organization identify significant water-related impacts in its value chain?"
                  info="Impacts may occur in: • Supplier operations • Agricultural production • Product use by customers"
                />
                <div className="flex gap-4">
                  {["yes", "no"].map((opt) => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value={opt}
                        {...register("gri203.disclosure3031.valueChainImpacts")}
                        className="w-4 h-4 text-[#4639AA]"
                      />
                      <span className="capitalize text-sm text-gray-700">{opt}</span>
                    </label>
                  ))}
                </div>
                {watch("gri203.disclosure3031.valueChainImpacts") === "yes" && (
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full text-xs text-left border-collapse border border-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="p-2 border border-gray-200">Value Chain Stage</th>
                          <th className="p-2 border border-gray-200">Water Impact</th>
                          <th className="p-2 border border-gray-200">Location</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(watch("gri203.disclosure3031.valueChainTable") || []).map((item, idx) => (
                          <tr key={idx}>
                            <td className="p-1 border border-gray-200">
                              <input
                                {...register(`gri203.disclosure3031.valueChainTable.${idx}.stage`)}
                                className="w-full p-1 border-none outline-none"
                                placeholder="e.g. Supplier operations"
                              />
                            </td>
                            <td className="p-1 border border-gray-200">
                              <input
                                {...register(`gri203.disclosure3031.valueChainTable.${idx}.impact`)}
                                className="w-full p-1 border-none outline-none"
                                placeholder="e.g. Water pollution"
                              />
                            </td>
                            <td className="p-1 border border-gray-200">
                              <input
                                {...register(`gri203.disclosure3031.valueChainTable.${idx}.location`)}
                                className="w-full p-1 border-none outline-none"
                                placeholder="e.g. Manufacturing facility"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <button
                      type="button"
                      onClick={() =>
                        setValue("gri203.disclosure3031.valueChainTable", [
                          ...(watch("gri203.disclosure3031.valueChainTable") || []),
                          { stage: "", impact: "", location: "" }
                        ])
                      }
                      className="mt-2 text-xs text-[#4639AA] font-bold"
                    >
                      + Add value chain impact
                    </button>
                  </div>
                )}
              </div>

              <div>
                <InfoLabel
                  label="Q3. Are there specific river basins or catchments with significant water impacts?"
                  info="List water basins where operations affect water availability or quality. Examples of tools used: • Water Risk Filter • Aqueduct Water Risk Atlas"
                />
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse border border-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="p-2 border border-gray-200">Catchment</th>
                        <th className="p-2 border border-gray-200">Country</th>
                        <th className="p-2 border border-gray-200">Impact Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(watch("gri203.disclosure3031.catchments") || []).map((item, idx) => (
                        <tr key={idx}>
                          <td className="p-1 border border-gray-200">
                            <input
                              {...register(`gri203.disclosure3031.catchments.${idx}.catchment`)}
                              className="w-full p-1 border-none outline-none"
                              placeholder="e.g. Yangtze River"
                            />
                          </td>
                          <td className="p-1 border border-gray-200">
                            <input
                              {...register(`gri203.disclosure3031.catchments.${idx}.country`)}
                              className="w-full p-1 border-none outline-none"
                              placeholder="e.g. China"
                            />
                          </td>
                          <td className="p-1 border border-gray-200">
                            <input
                              {...register(`gri203.disclosure3031.catchments.${idx}.impactDescription`)}
                              className="w-full p-1 border-none outline-none"
                              placeholder="e.g. Water withdrawal affects local agriculture"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button
                    type="button"
                    onClick={() =>
                      setValue("gri203.disclosure3031.catchments", [
                        ...(watch("gri203.disclosure3031.catchments") || []),
                        { catchment: "", country: "", impactDescription: "" }
                      ])
                    }
                    className="mt-2 text-xs text-[#4639AA] font-bold"
                  >
                    + Add catchment
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* GRI 303-2: Management of Water Discharge-Related Impacts */}
          <div className="bg-white p-3 rounded-md border border-gray-200">
            <InfoHeading
              icon="mdi:pipe-leak"
              heading="Management of Water Discharge-Related Impacts"
              info="This explains how wastewater is treated before being released into the environment."
            />

            <div className="space-y-6 mt-6">
              <div>
                <InfoLabel
                  label="Q1. Does the organization set minimum effluent quality standards?"
                  info="Effluent standards control pollutants before discharge into water bodies. These standards may be: • Government regulations • Internal environmental policies • Industry standards"
                />
                <div className="flex gap-4">
                  {["yes", "no"].map((opt) => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        
                        {...register("gri203.disclosure3032.effluentStandards")}
                        className="w-4 h-4 text-[#4639AA]"
                      />
                      <span className="capitalize text-sm text-gray-700">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <InfoLabel
                  label="Q2. How were effluent standards determined?"
                  info="Explain whether standards are based on: • National regulations • Industry standards • Internal environmental guidelines • Receiving water body characteristics"
                />
                <textarea
                  {...register("gri203.disclosure3032.standardsDetermination")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[120px]"
                  placeholder="Describe how effluent standards were determined..."
                />
              </div>
           
              <div>
                <label className="flex items-center gap-1 font-medium text-gray-700 mb-1">
                  Q3. Are there facilities located in regions with no discharge regulations?
                  </label>
                
                <div className="flex gap-4">
                  {["yes", "no"].map((opt) => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value={opt}
                        {...register("gri203.disclosure3032.noDischargeRegions")}
                        className="w-4 h-4 text-[#4639AA]"
                      />
                      <span className="capitalize text-sm text-gray-700">{opt}</span>
                    </label>
                  ))}
                </div>
                {watch("gri203.disclosure3032.noDischargeRegions") === "yes" && (
                  <div className="mt-4">
                    <label className="flex items-center gap-1 font-medium text-gray-700 mb-1">
                      Explain how internal standards were developed.
                    </label>
                    <textarea
                      {...register("gri203.disclosure3032.internalStandards")}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[120px]"
                      placeholder="Explain internal standards development..."
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* GRI 303-3: Water Withdrawal */}
          <div className="bg-white p-3 rounded-md border border-gray-200">
            <InfoHeading
              icon="mdi:water-pump"
              heading="Water Withdrawal"
              info="Measures how much water the organization takes from the environment."
            />

            <div className="space-y-6 mt-6">
              <div>
                <label className="flex items-center gap-1 font-medium text-gray-700 mb-1">
                  Q1. Water withdrawal by source
                </label>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse border border-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="p-2 border border-gray-200">Source</th>
                        <th className="p-2 border border-gray-200">Total Withdrawal (ML)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(watch("gri203.disclosure3033.waterWithdrawal") || []).map((item, idx) => (
                        <tr key={idx}>
                          <td className="p-1 border border-gray-200">{item.source}</td>
                          <td className="p-1 border border-gray-200">
                            <input
                              type="number"
                              step="any"
                              {...register(`gri203.disclosure3033.waterWithdrawal.${idx}.totalWithdrawal`)}
                              className="w-full p-1 border-none outline-none"
                              placeholder="0"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 bg-[#F8FAFC] p-4 rounded-lg border border-gray-200">
                  <div className="font-semibold text-sm">Total Water Withdrawal</div>
                  <div className="mt-2 text-lg font-bold text-gray-900">
                    {(watch("gri203.disclosure3033.waterWithdrawal") || []).reduce(
                      (sum, item) => sum + (Number(item.totalWithdrawal) || 0),
                      0
                    ).toLocaleString()} ML
                  </div>
                  {/* <p className="text-xs text-gray-500 mt-2">
                    Total = Surface Water + Groundwater + Seawater + Produced Water + Third-party Water
                  </p> */}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-1 font-medium text-gray-700 mb-1">
                  Q2. Water withdrawal from areas with water stress
                  </label>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse border border-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="p-2 border border-gray-200">Source</th>
                        <th className="p-2 border border-gray-200">Withdrawal in Water-Stress Areas (ML)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(watch("gri203.disclosure3033.withdrawalStressAreas") || []).map((item, idx) => (
                        <tr key={idx}>
                          <td className="p-1 border border-gray-200">{item.source}</td>
                          <td className="p-1 border border-gray-200">
                            <input
                              type="number"
                              step="any"
                              {...register(`gri203.disclosure3033.withdrawalStressAreas.${idx}.withdrawalStress`)}
                              className="w-full p-1 border-none outline-none"
                              placeholder="0"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-1 font-medium text-gray-700 mb-1">
                  Q3. Water withdrawal by quality
                </label>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse border border-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="p-2 border border-gray-200">Category</th>
                        <th className="p-2 border border-gray-200">Volume (ML)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(watch("gri203.disclosure3033.withdrawalByQuality") || []).map((item, idx) => (
                        <tr key={idx}>
                          <td className="p-1 border border-gray-200">{item.category}</td>
                          <td className="p-1 border border-gray-200">
                            <input
                              type="number"
                              step="any"
                              {...register(`gri203.disclosure3033.withdrawalByQuality.${idx}.volume`)}
                              className="w-full p-1 border-none outline-none"
                              placeholder="0"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-1 font-medium text-gray-700 mb-1">
                  Q4. Methodology used for water stress assessment
                </label>
                <select
                  {...register("gri203.disclosure3033.stressMethodology")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
                >
                  <option>Aqueduct Water Risk Atlas</option>
                  <option>WWF Water Risk Filter</option>
                  <option>Internal assessment</option>
                  <option>Government data</option>
                </select>
              </div>
            </div>
          </div>
          {/* GRI 303-4: Water Discharge */}
          <div className="bg-white p-3 rounded-md border border-gray-200">
            <InfoHeading
              icon="mdi:pipe"
              heading="Water Discharge"
              info="Measures how much water is released back into the environment."
            />

            <div className="space-y-6 mt-6">
              <div>
                <label className="flex items-center gap-1 font-medium text-gray-700 mb-1">
                  Q1. Water discharge by destination
                  </label>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse border border-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="p-2 border border-gray-200">Destination</th>
                        <th className="p-2 border border-gray-200">Volume (ML)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(watch("gri203.disclosure3034.waterDischarge") || []).map((item, idx) => (
                        <tr key={idx}>
                          <td className="p-1 border border-gray-200">{item.destination}</td>
                          <td className="p-1 border border-gray-200">
                            <input
                              type="number"
                              step="any"
                              {...register(`gri203.disclosure3034.waterDischarge.${idx}.volume`)}
                              className="w-full p-1 border-none outline-none"
                              placeholder="0"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 bg-[#F8FAFC] p-4 rounded-lg border border-gray-200">
                  <div className="font-semibold text-sm">Total Water Discharge</div>
                  <div className="mt-2 text-lg font-bold text-gray-900">
                    {(watch("gri203.disclosure3034.waterDischarge") || []).reduce(
                      (sum, item) => sum + (Number(item.volume) || 0),
                      0
                    ).toLocaleString()} ML
                  </div>
                  {/* <p className="text-xs text-gray-500 mt-2">
                    Total = Surface Water + Groundwater + Seawater + Third-party Water
                  </p> */}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-1 font-medium text-gray-700 mb-1">
                  Q2. Water discharge by quality
                  </label>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse border border-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="p-2 border border-gray-200">Category</th>
                        <th className="p-2 border border-gray-200">Volume (ML)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(watch("gri203.disclosure3034.dischargeByQuality") || []).map((item, idx) => (
                        <tr key={idx}>
                          <td className="p-1 border border-gray-200">{item.category}</td>
                          <td className="p-1 border border-gray-200">
                            <input
                              type="number"
                              step="any"
                              {...register(`gri203.disclosure3034.dischargeByQuality.${idx}.volume`)}
                              className="w-full p-1 border-none outline-none"
                              placeholder="0"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                 <label className="flex items-center gap-1 font-medium text-gray-700 mb-1">
                  Q3. Water discharge in areas with water stress
                  </label>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse border border-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="p-2 border border-gray-200">Category</th>
                        <th className="p-2 border border-gray-200">Volume (ML)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(watch("gri203.disclosure3034.dischargeStressAreas") || []).map((item, idx) => (
                        <tr key={idx}>
                          <td className="p-1 border border-gray-200">{item.category}</td>
                          <td className="p-1 border border-gray-200">
                            <input
                              type="number"
                              step="any"
                              {...register(`gri203.disclosure3034.dischargeStressAreas.${idx}.volume`)}
                              className="w-full p-1 border-none outline-none"
                              placeholder="0"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-1 font-medium text-gray-700 mb-1">
                  Q4. Priority pollutants in discharge
                  </label>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse border border-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="p-2 border border-gray-200">Pollutant</th>
                        <th className="p-2 border border-gray-200">Standard Used</th>
                        <th className="p-2 border border-gray-200">Discharge Limit</th>
                        <th className="p-2 border border-gray-200">Non-compliance incidents</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(watch("gri203.disclosure3034.priorityPollutants") || []).map((item, idx) => (
                        <tr key={idx}>
                          <td className="p-1 border border-gray-200">
                            <input
                              {...register(`gri203.disclosure3034.priorityPollutants.${idx}.pollutant`)}
                              className="w-full p-1 border-none outline-none"
                              placeholder="e.g. Nitrogen"
                            />
                          </td>
                          <td className="p-1 border border-gray-200">
                            <input
                              {...register(`gri203.disclosure3034.priorityPollutants.${idx}.standard`)}
                              className="w-full p-1 border-none outline-none"
                              placeholder="e.g. EPA standards"
                            />
                          </td>
                          <td className="p-1 border border-gray-200">
                            <input
                              {...register(`gri203.disclosure3034.priorityPollutants.${idx}.limit`)}
                              className="w-full p-1 border-none outline-none"
                              placeholder="e.g. 10 mg/L"
                            />
                          </td>
                          <td className="p-1 border border-gray-200">
                            <input
                              type="number"
                              {...register(`gri203.disclosure3034.priorityPollutants.${idx}.incidents`)}
                              className="w-full p-1 border-none outline-none"
                              placeholder="0"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button
                    type="button"
                    onClick={() =>
                      setValue("gri203.disclosure3034.priorityPollutants", [
                        ...(watch("gri203.disclosure3034.priorityPollutants") || []),
                        { pollutant: "", standard: "", limit: "", incidents: 0 }
                      ])
                    }
                    className="mt-2 text-xs text-[#4639AA] font-bold"
                  >
                    + Add pollutant
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* GRI 303-5: Water Consumption */}
          <div className="bg-white p-3 rounded-md border border-gray-200">
            <InfoHeading
              icon="mdi:water-percent"
              heading="Water Consumption"
              info="Water consumption measures water that is permanently removed from the environment."
            />

            <div className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-1 font-medium text-gray-700 mb-1">
                    Q1. Total water consumption
                    </label>
                  
                  <input
                    type="number"
                    step="any"
                    {...register("gri203.disclosure3035.totalConsumption")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1 font-medium text-gray-700 mb-1">
                    Q2. Water consumption in water-stress areas
                    </label>
                  
                  <input
                    type="number"
                    step="any"
                    {...register("gri203.disclosure3035.consumptionStressAreas")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="bg-[#F8FAFC] p-4 rounded-lg border border-gray-200">
                <div className="font-semibold text-sm">Calculated Water Consumption</div>
                <div className="mt-2 text-lg font-bold text-gray-900">
                  {(
                    (watch("gri203.disclosure3033.waterWithdrawal") || []).reduce(
                      (sum, item) => sum + (Number(item.totalWithdrawal) || 0),
                      0
                    ) -
                    (watch("gri203.disclosure3034.waterDischarge") || []).reduce(
                      (sum, item) => sum + (Number(item.volume) || 0),
                      0
                    )
                  ).toLocaleString()} ML
                </div>
                {/* <p className="text-xs text-gray-500 mt-2">
                  Water Consumption = Total Water Withdrawal − Total Water Discharge
                </p> */}
              </div>

              <div>
                <InfoLabel
                  label="Q3. Change in water storage"
                  info="Applies if water reservoirs or storage tanks significantly affect water availability."
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Storage Start of Period (ML)</label>
                    <input
                      type="number"
                      step="any"
                      {...register("gri203.disclosure3035.storageStart")}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Storage End of Period (ML)</label>
                    <input
                      type="number"
                      step="any"
                      {...register("gri203.disclosure3035.storageEnd")}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]"
                      placeholder="0"
                    />
                  </div>
                </div>
                <div className="mt-4 bg-[#F8FAFC] p-4 rounded-lg border border-gray-200">
                  <div className="font-semibold text-sm">Change in Water Storage</div>
                  <div className="mt-2 text-lg font-bold text-gray-900">
                    {(
                      Number(watch("gri203.disclosure3035.storageEnd") || 0) -
                      Number(watch("gri203.disclosure3035.storageStart") || 0)
                    ).toLocaleString()} ML
                  </div>
                  {/* <p className="text-xs text-gray-500 mt-2">
                    Change = Storage End of Period − Storage Start of Period
                  </p> */}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
  //  Gri 304 Biodiversity
  const renderGRI304 = () => (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white p-3 rounded-md border border-gray-200">
        <h3 className="text-lg font-bold text-[#4639AA] mb-6 flex items-center gap-2">
          <Icon icon="mdi:weather-partly-cloudy" /> Biodiversity
        </h3>

        <div className="grid grid-cols-1 gap-6">
          <div>
            <InfoLabel
              label="Q1. Has Biodiversity been identified as a material topic?"
              info="Select Yes if your organization's activities may affect natural habitats, wildlife, forests, rivers, or ecosystems. Examples: Construction projects, Manufacturing facilities, Mining or extraction, Agriculture, Infrastructure development."
            />
            <div className="flex gap-4">
              {["yes", "no"].map((opt) => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value={opt}
                    {...register("gri204.isMaterial")}
                    className="w-4 h-4 text-[#4639AA]"
                  />
                  <span className="capitalize text-sm text-gray-700">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {watch("gri204.isMaterial") === "yes" && (
            <>
              <div>
                <InfoLabel
                  label="Q2. How does the organization manage biodiversity impacts?"
                  info="Explain how your company prevents or reduces damage to ecosystems, wildlife, or natural habitats. Examples: Environmental impact assessments, Land protection programs, Biodiversity management plans, Sustainable land use practices."
                />
                <textarea
                  {...register("gri204.managementDescription")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[100px]"
                  placeholder="Describe biodiversity management..."
                />
              </div>

              <div>
                <InfoLabel
                  label="Q3. Does the organization have a biodiversity policy or strategy?"
                  info="A biodiversity policy explains how the company protects natural ecosystems and species affected by its operations. Examples: Environmental protection policy, Biodiversity conservation strategy, Land restoration commitments."
                />
                <div className="flex gap-4">
                  {["yes", "no"].map((opt) => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value={opt}
                        {...register("gri204.hasBiodiversityPolicy")}
                        className="w-4 h-4 text-[#4639AA]"
                      />
                      <span className="capitalize text-sm text-gray-700">{opt}</span>
                    </label>
                  ))}
                </div>
                {watch("gri204.hasBiodiversityPolicy") === "yes" && (
                  <div className="space-y-4">
                    <label className="relative flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-[#4639AA]/40 rounded-xl cursor-pointer bg-slate-50 hover:border-[#4639AA] transition">
                      <Icon
                        icon="mdi:cloud-upload-outline"
                        className="text-4xl text-gray-300 mb-2"
                      />

                      <p className="text-sm font-medium text-gray-700 text-center">
                        Upload Biodiversity Policy or Environmental Management Policy
                      </p>

                      <p className="text-xs text-gray-500 mt-1 text-center">
                        PDF, DOC, XLS, PNG, JPG • Max 5MB per file • Multiple files allowed
                      </p>

                      <input
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
                        onChange={(e) => {
                          const files = Array.from(e.target.files || []);
                          const validFiles = files.filter(file => {
                            const maxSize = 5 * 1024 * 1024; // 5MB
                            const allowedTypes = [
                              'application/pdf',
                              'application/msword',
                              'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                              'application/vnd.ms-excel',
                              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                              'image/png',
                              'image/jpeg',
                              'image/jpg'
                            ];

                            if (file.size > maxSize) {
                              toast.error(`${file.name} is too large. Maximum size is 5MB.`);
                              return false;
                            }

                            if (!allowedTypes.includes(file.type)) {
                              toast.error(`${file.name} has an invalid file type.`);
                              return false;
                            }

                            return true;
                          });

                          if (validFiles.length > 0) {
                            const currentFiles = uploadedFiles.gri204_policyDocument || [];
                            const newFiles = [...currentFiles, ...validFiles];
                            setUploadedFiles(prev => ({
                              ...prev,
                              gri204_policyDocument: newFiles
                            }));
                            setValue("gri204.policyDocument", newFiles);
                          }

                          // Reset input
                          e.target.value = '';
                        }}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </label>

                    {/* Selected Files */}
                    {uploadedFiles.gri204_policyDocument && uploadedFiles.gri204_policyDocument.length > 0 && (
                      <div className="w-full border-t pt-3">
                        <h4 className="text-sm font-medium text-gray-700 mb-3">Uploaded Files ({uploadedFiles.gri204_policyDocument.length})</h4>
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                          {uploadedFiles.gri204_policyDocument.map((file, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg border border-gray-200"
                            >
                              <Icon
                                icon="mdi:file-document-outline"
                                className="text-[#4639AA] shrink-0 text-lg"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                                <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  const currentFiles = uploadedFiles.gri204_policyDocument;
                                  const newFiles = currentFiles.filter((_, fileIdx) => fileIdx !== idx);
                                  setUploadedFiles(prev => ({
                                    ...prev,
                                    gri204_policyDocument: newFiles
                                  }));
                                  setValue("gri204.policyDocument", newFiles);
                                }}
                                className="text-red-500 hover:text-red-700 p-1"
                                title="Remove file"
                              >
                                <Icon icon="mdi:close" className="text-lg" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div>
                <InfoLabel
                  label="Q4. Does the organization integrate biodiversity considerations in environmental assessments?"
                  info="Environmental impact assessments (EIA) help identify risks to wildlife and ecosystems before starting projects."
                />
                <div className="flex gap-4">
                  {["yes", "no"].map((opt) => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value={opt}
                        {...register("gri204.integratesBiodiversity")}
                        className="w-4 h-4 text-[#4639AA]"
                      />
                      <span className="capitalize text-sm text-gray-700">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          {watch("gri204.isMaterial") === "no" && (
            <div className="mt-4 bg-[#4639AA]/5 border border-[#4639AA]/15 p-4 rounded-xl">
              <h4 className="text-sm font-bold text-[#4639AA] mb-3">Omission Logic (GRI 304)</h4>
              <p className="text-xs text-gray-600 mb-4">
                Disclosure marked Omitted if: Organization has no operations affecting ecosystems, No biodiversity assessments conducted, Data unavailable.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <InfoLabel
                    label="Reason for omission"
                    info="Select the reason for omitting the Biodiversity disclosure."
                  />
                  <select
                    {...register("gri204.omissionReason")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
                  >
                    <option value="">Select reason</option>
                    <option value="Not applicable">Not applicable</option>
                    <option value="Data unavailable">Data unavailable</option>
                    <option value="Legal restriction">Legal restriction</option>
                    <option value="Confidential information">Confidential information</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <InfoLabel
                    label="Explanation (required)"
                    info="Provide a mandatory explanation for omission."
                  />
                  <textarea
                    {...register("gri204.omissionExplanation")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[100px]"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {watch("gri204.isMaterial") === "yes" && (
        <>
          {/* GRI 304-1: Operational Sites in or Near Protected Areas */}
          <div className="bg-white p-3 rounded-md border border-gray-200">
            <InfoHeading
              icon="mdi:map-marker"
              heading="Operational Sites in or Near Protected Areas"
              info="This disclosure identifies company facilities located in or near protected ecosystems or biodiversity-sensitive areas."
            />

            <div className="space-y-6 mt-6">
              <div>
                <InfoLabel
                  label="Q1. Does the organization operate in or near protected areas or high biodiversity value areas?"
                  info="Protected areas include locations such as: National parks, Wildlife reserves, Wetlands, Forest conservation areas."
                />
                <div className="flex gap-4">
                  {["yes", "no"].map((opt) => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value={opt}
                        {...register("gri204.disclosure3041.operatesNearProtected")}
                        className="w-4 h-4 text-[#4639AA]"
                      />
                      <span className="capitalize text-sm text-gray-700">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              {watch("gri204.disclosure3041.operatesNearProtected") === "yes" && (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left border-collapse border border-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="p-2 border border-gray-200">Site Name</th>
                          <th className="p-2 border border-gray-200">Country</th>
                          <th className="p-2 border border-gray-200">Geographic Location</th>
                          <th className="p-2 border border-gray-200">Operation Type</th>
                          <th className="p-2 border border-gray-200">Site Size</th>
                          <th className="p-2 border border-gray-200">Position Relative to Protected Area</th>
                          <th className="p-2 border border-gray-200">Ecosystem Type</th>
                          <th className="p-2 border border-gray-200">Protection Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(watch("gri204.disclosure3041.operationalSites") || []).map((item, idx) => (
                          <tr key={idx}>
                            <td className="p-1 border border-gray-200">
                              <input
                                {...register(`gri204.disclosure3041.operationalSites.${idx}.siteName`)}
                                className="w-full p-1 border-none outline-none"
                                placeholder="Site name"
                              />
                            </td>
                            <td className="p-1 border border-gray-200">
                              <input
                                {...register(`gri204.disclosure3041.operationalSites.${idx}.country`)}
                                className="w-full p-1 border-none outline-none"
                                placeholder="Country"
                              />
                            </td>
                            <td className="p-1 border border-gray-200">
                              <input
                                {...register(`gri204.disclosure3041.operationalSites.${idx}.geographicLocation`)}
                                className="w-full p-1 border-none outline-none"
                                placeholder="Location"
                              />
                            </td>
                            <td className="p-1 border border-gray-200">
                              <select
                                {...register(`gri204.disclosure3041.operationalSites.${idx}.operationType`)}
                                className="w-full p-1 border-none outline-none bg-transparent"
                              >
                                <option>Office</option>
                                <option>Manufacturing</option>
                                <option>Production facility</option>
                                <option>Warehouse</option>
                                <option>Extractive operations</option>
                                <option>Agriculture</option>
                              </select>
                            </td>
                            <td className="p-1 border border-gray-200">
                              <input
                                {...register(`gri204.disclosure3041.operationalSites.${idx}.siteSize`)}
                                className="w-full p-1 border-none outline-none"
                                placeholder="Size"
                              />
                            </td>
                            <td className="p-1 border border-gray-200">
                              <select
                                {...register(`gri204.disclosure3041.operationalSites.${idx}.positionRelative`)}
                                className="w-full p-1 border-none outline-none bg-transparent"
                              >
                                <option>Inside protected area</option>
                                <option>Adjacent to protected area</option>
                                <option>Contains part of protected area</option>
                              </select>
                            </td>
                            <td className="p-1 border border-gray-200">
                              <select
                                {...register(`gri204.disclosure3041.operationalSites.${idx}.ecosystemType`)}
                                className="w-full p-1 border-none outline-none bg-transparent"
                              >
                                <option>Terrestrial ecosystem (land forests/grasslands)</option>
                                <option>Freshwater ecosystem (rivers/lakes)</option>
                                <option>Marine ecosystem (oceans/coastal)</option>
                              </select>
                            </td>
                            <td className="p-1 border border-gray-200">
                              <input
                                {...register(`gri204.disclosure3041.operationalSites.${idx}.protectionStatus`)}
                                className="w-full p-1 border-none outline-none"
                                placeholder="e.g. IUCN Protected Area"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setValue("gri204.disclosure3041.operationalSites", [
                        ...(watch("gri204.disclosure3041.operationalSites") || []),
                        { siteName: "", country: "", geographicLocation: "", operationType: "", siteSize: "", positionRelative: "", ecosystemType: "", protectionStatus: "" }
                      ])
                    }
                    className="text-xs text-[#4639AA] font-bold"
                  >
                    + Add operational site
                  </button>
                </>
              )}
            </div>
          </div>
          {/* GRI 304-2: Significant Impacts on Biodiversity */}
          <div className="bg-white p-3 rounded-md border border-gray-200">
            <InfoHeading
              icon="mdi:alert-circle"
              heading="Significant Impacts on Biodiversity"
              info="This explains how company activities affect ecosystems or wildlife."
            />

            <div className="space-y-6 mt-6">
              <div>
                <InfoLabel
                  label="Q1. Has the organization identified significant biodiversity impacts?"
                  info="Examples: Land clearing for facilities, Pollution affecting rivers, Habitat destruction, Introduction of invasive species."
                />
                <div className="flex gap-4">
                  {["yes", "no"].map((opt) => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value={opt}
                        {...register("gri204.disclosure3042.hasSignificantImpacts")}
                        className="w-4 h-4 text-[#4639AA]"
                      />
                      <span className="capitalize text-sm text-gray-700">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              {watch("gri204.disclosure3042.hasSignificantImpacts") === "yes" && (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left border-collapse border border-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="p-2 border border-gray-200">Activity</th>
                          <th className="p-2 border border-gray-200">Type of Impact</th>
                          <th className="p-2 border border-gray-200">Species Affected</th>
                          <th className="p-2 border border-gray-200">Area Impacted</th>
                          <th className="p-2 border border-gray-200">Duration</th>
                          <th className="p-2 border border-gray-200">Reversible</th>
                          <th className="p-2 border border-gray-200">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(watch("gri204.disclosure3042.biodiversityImpacts") || []).map((item, idx) => (
                          <tr key={idx}>
                            <td className="p-1 border border-gray-200">
                              <input
                                {...register(`gri204.disclosure3042.biodiversityImpacts.${idx}.activity`)}
                                className="w-full p-1 border-none outline-none"
                                placeholder="Activity"
                              />
                            </td>
                            <td className="p-1 border border-gray-200">
                              <select
                                {...register(`gri204.disclosure3042.biodiversityImpacts.${idx}.impactType`)}
                                className="w-full p-1 border-none outline-none bg-transparent"
                              >
                                <option>Habitat destruction</option>
                                <option>Pollution</option>
                                <option>Infrastructure development</option>
                                <option>Introduction of invasive species</option>
                                <option>Reduction of species population</option>
                                <option>Changes in ecosystem processes</option>
                              </select>
                            </td>
                            <td className="p-1 border border-gray-200">
                              <input
                                {...register(`gri204.disclosure3042.biodiversityImpacts.${idx}.speciesAffected`)}
                                className="w-full p-1 border-none outline-none"
                                placeholder="Species"
                              />
                            </td>
                            <td className="p-1 border border-gray-200">
                              <input
                                {...register(`gri204.disclosure3042.biodiversityImpacts.${idx}.areaImpacted`)}
                                className="w-full p-1 border-none outline-none"
                                placeholder="Area"
                              />
                            </td>
                            <td className="p-1 border border-gray-200">
                              <select
                                {...register(`gri204.disclosure3042.biodiversityImpacts.${idx}.duration`)}
                                className="w-full p-1 border-none outline-none bg-transparent"
                              >
                                <option>Short-term</option>
                                <option>Medium-term</option>
                                <option>Long-term</option>
                              </select>
                            </td>
                            <td className="p-1 border border-gray-200">
                              <select
                                {...register(`gri204.disclosure3042.biodiversityImpacts.${idx}.reversible`)}
                                className="w-full p-1 border-none outline-none bg-transparent"
                              >
                                <option>Reversible</option>
                                <option>Partially reversible</option>
                                <option>Irreversible</option>
                              </select>
                            </td>
                            <td className="p-1 border border-gray-200">
                              <input
                                {...register(`gri204.disclosure3042.biodiversityImpacts.${idx}.description`)}
                                className="w-full p-1 border-none outline-none"
                                placeholder="Description"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setValue("gri204.disclosure3042.biodiversityImpacts", [
                        ...(watch("gri204.disclosure3042.biodiversityImpacts") || []),
                        { activity: "", impactType: "", speciesAffected: "", areaImpacted: "", duration: "", reversible: "", description: "" }
                      ])
                    }
                    className="text-xs text-[#4639AA] font-bold"
                  >
                    + Add biodiversity impact
                  </button>
                </>
              )}
            </div>
          </div>
          {/* GRI 304-3: Habitats Protected or Restored */}
          <div className="bg-white p-3 rounded-md border border-gray-200">
            <InfoHeading
              icon="mdi:leaf"
              heading="Habitats Protected or Restored"
              info="This shows how the organization helps restore or protect ecosystems affected by its activities."
            />

            <div className="space-y-6 mt-6">
              <div>
                <InfoLabel
                  label="Q1. Has the organization restored or protected habitats?"
                  info="Examples: Tree plantation programs, Wetland restoration, Wildlife conservation programs, Habitat protection zones."
                />
                <div className="flex gap-4">
                  {["yes", "no"].map((opt) => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value={opt}
                        {...register("gri204.disclosure3043.hasRestoredHabitats")}
                        className="w-4 h-4 text-[#4639AA]"
                      />
                      <span className="capitalize text-sm text-gray-700">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              {watch("gri204.disclosure3043.hasRestoredHabitats") === "yes" && (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left border-collapse border border-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="p-2 border border-gray-200">Habitat Location</th>
                          <th className="p-2 border border-gray-200">Country</th>
                          <th className="p-2 border border-gray-200">Area Protected or Restored (km²)</th>
                          <th className="p-2 border border-gray-200">Restoration Method</th>
                          <th className="p-2 border border-gray-200">External Verification</th>
                          <th className="p-2 border border-gray-200">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(watch("gri204.disclosure3043.habitatProtection") || []).map((item, idx) => (
                          <tr key={idx}>
                            <td className="p-1 border border-gray-200">
                              <input
                                {...register(`gri204.disclosure3043.habitatProtection.${idx}.location`)}
                                className="w-full p-1 border-none outline-none"
                                placeholder="Location"
                              />
                            </td>
                            <td className="p-1 border border-gray-200">
                              <input
                                {...register(`gri204.disclosure3043.habitatProtection.${idx}.country`)}
                                className="w-full p-1 border-none outline-none"
                                placeholder="Country"
                              />
                            </td>
                            <td className="p-1 border border-gray-200">
                              <input
                                type="number"
                                step="any"
                                {...register(`gri204.disclosure3043.habitatProtection.${idx}.areaProtected`)}
                                className="w-full p-1 border-none outline-none"
                                placeholder="0"
                              />
                            </td>
                            <td className="p-1 border border-gray-200">
                              <input
                                {...register(`gri204.disclosure3043.habitatProtection.${idx}.restorationMethod`)}
                                className="w-full p-1 border-none outline-none"
                                placeholder="Method"
                              />
                            </td>
                            <td className="p-1 border border-gray-200">
                              <select
                                {...register(`gri204.disclosure3043.habitatProtection.${idx}.externalVerification`)}
                                className="w-full p-1 border-none outline-none bg-transparent"
                              >
                                <option>Yes – Independent expert</option>
                                <option>Yes – Government agency</option>
                                <option>No verification</option>
                              </select>
                            </td>
                            <td className="p-1 border border-gray-200">
                              <select
                                {...register(`gri204.disclosure3043.habitatProtection.${idx}.status`)}
                                className="w-full p-1 border-none outline-none bg-transparent"
                              >
                                <option>Restoration completed</option>
                                <option>Restoration ongoing</option>
                                <option>Protection program active</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setValue("gri204.disclosure3043.habitatProtection", [
                        ...(watch("gri204.disclosure3043.habitatProtection") || []),
                        { location: "", country: "", areaProtected: 0, restorationMethod: "", externalVerification: "", status: "" }
                      ])
                    }
                    className="text-xs text-[#4639AA] font-bold"
                  >
                    + Add habitat protection
                  </button>

                  <div>
                    <InfoLabel
                      label="Q2. Does the organization collaborate with external partners for biodiversity protection?"
                      info="Partners may include: NGOs, Government environmental agencies, Research institutes, Community organizations."
                    />
                    <div className="flex gap-4">
                      {["yes", "no"].map((opt) => (
                        <label key={opt} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            value={opt}
                            {...register("gri204.disclosure3043.collaboratesWithPartners")}
                            className="w-4 h-4 text-[#4639AA]"
                          />
                          <span className="capitalize text-sm text-gray-700">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {watch("gri204.disclosure3043.collaboratesWithPartners") === "yes" && (
                    <>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs text-left border-collapse border border-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="p-2 border border-gray-200">Partner Organization</th>
                              <th className="p-2 border border-gray-200">Program</th>
                              <th className="p-2 border border-gray-200">Outcome</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(watch("gri204.disclosure3043.partners") || []).map((item, idx) => (
                              <tr key={idx}>
                                <td className="p-1 border border-gray-200">
                                  <input
                                    {...register(`gri204.disclosure3043.partners.${idx}.organization`)}
                                    className="w-full p-1 border-none outline-none"
                                    placeholder="Organization"
                                  />
                                </td>
                                <td className="p-1 border border-gray-200">
                                  <input
                                    {...register(`gri204.disclosure3043.partners.${idx}.program`)}
                                    className="w-full p-1 border-none outline-none"
                                    placeholder="Program"
                                  />
                                </td>
                                <td className="p-1 border border-gray-200">
                                  <input
                                    {...register(`gri204.disclosure3043.partners.${idx}.outcome`)}
                                    className="w-full p-1 border-none outline-none"
                                    placeholder="Outcome"
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setValue("gri204.disclosure3043.partners", [
                            ...(watch("gri204.disclosure3043.partners") || []),
                            { organization: "", program: "", outcome: "" }
                          ])
                        }
                        className="text-xs text-[#4639AA] font-bold"
                      >
                        + Add partner
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
          {/* GRI 304-4: IUCN Red List Species Affected by Operations */}
          <div className="bg-white p-3 rounded-md border border-gray-200">
            <InfoHeading
              icon="mdi:bug"
              heading="IUCN Red List Species Affected by Operations"
              info="This identifies endangered species that may be affected by company operations."
            />

            <div className="space-y-6 mt-6">
              <div>
                <InfoLabel
                  label="Q1. Are there protected species living in areas affected by your operations?"
                  info="This includes species listed in: IUCN Red List, National wildlife protection lists."
                />
                <div className="flex gap-4">
                  {["yes", "no"].map((opt) => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value={opt}
                        {...register("gri204.disclosure3044.hasProtectedSpecies")}
                        className="w-4 h-4 text-[#4639AA]"
                      />
                      <span className="capitalize text-sm text-gray-700">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              {watch("gri204.disclosure3044.hasProtectedSpecies") === "yes" && (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left border-collapse border border-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="p-2 border border-gray-200">Species Name</th>
                          <th className="p-2 border border-gray-200">Conservation List</th>
                          <th className="p-2 border border-gray-200">Risk Category</th>
                          <th className="p-2 border border-gray-200">Habitat Location</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(watch("gri204.disclosure3044.speciesImpacts") || []).map((item, idx) => (
                          <tr key={idx}>
                            <td className="p-1 border border-gray-200">
                              <input
                                {...register(`gri204.disclosure3044.speciesImpacts.${idx}.speciesName`)}
                                className="w-full p-1 border-none outline-none"
                                placeholder="Species name"
                              />
                            </td>
                            <td className="p-1 border border-gray-200">
                              <input
                                {...register(`gri204.disclosure3044.speciesImpacts.${idx}.conservationList`)}
                                className="w-full p-1 border-none outline-none"
                                placeholder="e.g. IUCN Red List"
                              />
                            </td>
                            <td className="p-1 border border-gray-200">
                              <select
                                {...register(`gri204.disclosure3044.speciesImpacts.${idx}.riskCategory`)}
                                className="w-full p-1 border-none outline-none bg-transparent"
                              >
                                <option>Critically Endangered</option>
                                <option>Endangered</option>
                                <option>Vulnerable</option>
                                <option>Near Threatened</option>
                                <option>Least Concern</option>
                              </select>
                            </td>
                            <td className="p-1 border border-gray-200">
                              <input
                                {...register(`gri204.disclosure3044.speciesImpacts.${idx}.habitatLocation`)}
                                className="w-full p-1 border-none outline-none"
                                placeholder="Habitat location"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setValue("gri204.disclosure3044.speciesImpacts", [
                        ...(watch("gri204.disclosure3044.speciesImpacts") || []),
                        { speciesName: "", conservationList: "", riskCategory: "", habitatLocation: "" }
                      ])
                    }
                    className="text-xs text-[#4639AA] font-bold"
                  >
                    + Add species impact
                  </button>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
  //  Gri 305 Emissions
  const renderGRI305 = () => {
    
    return (
      <div className="space-y-8 animate-fadeIn">
        <div className="bg-white p-3 rounded-md border border-gray-200">
          <h3 className="text-lg font-bold text-[#4639AA] mb-6 flex items-center gap-2">
            <Icon icon="mdi:cloud" /> Emissions
          </h3>

          <div className="grid grid-cols-1 gap-6">
            <div>
              <InfoLabel
                label="Q1. Has Emissions been identified as a material topic?"
                info="Select Yes if your company’s activities release greenhouse gases or air pollutants that could impact climate change, air quality, or environmental regulations."
              />
              <div className="flex gap-4">
                {["yes", "no"].map((opt) => (
                  <label key={opt} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value={opt}
                      {...register("gri205.isMaterial")}
                      className="w-4 h-4 text-[#4639AA]"
                    />
                    <span className="capitalize text-sm text-gray-700">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            {watch("gri205.isMaterial") === "yes" && (
              <>
                <div>
                  <InfoLabel
                    label="Q2. How does the organization manage emissions?"
                    info="Explain how your company tracks and reduces emissions from fuel use, electricity use, manufacturing processes, transportation, or equipment. You may mention monitoring systems, emission reduction programs, cleaner technologies, or environmental policies."
                  />
                  <textarea
                    {...register("gri205.managementDescription")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[120px]"
                    placeholder="Describe emissions management..."
                  />
                </div>

                <div>
                  <InfoLabel
                    label="Q3. Who oversees emissions management?"
                    info="Select the person responsible for monitoring environmental impacts and emission reduction efforts."
                  />
                  <select
                    {...register("gri205.oversight")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
                  >
                    <option>CEO</option>
                    <option>Operations Manager</option>
                    <option>Sustainability Manager</option>
                    <option>EHS Manager</option>
                    <option>Board of Directors</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <InfoLabel
                    label="Q4. Does the organization have greenhouse gas (GHG) emission reduction targets?"
                    info="Select Yes if your company has set targets to reduce carbon emissions (for example: reduce emissions by 20% by 2030)."
                  />
                  <div className="flex gap-4">
                    {["yes", "no"].map((opt) => (
                      <label key={opt} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value={opt}
                          {...register("gri205.hasTargets")}
                          className="w-4 h-4 text-[#4639AA]"
                        />
                        <span className="capitalize text-sm text-gray-700">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {watch("gri205.hasTargets") === "yes" && (
                  <div>
                    <InfoLabel
                      label="Q4a. Are carbon offsets used to meet emission targets?"
                      info="Carbon offsets are credits purchased from projects that reduce emissions elsewhere (such as tree planting or renewable energy projects)."
                    />
                    <select
                      {...register("gri205.offsetsUsage")}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
                    >
                      <option>No offsets used</option>
                      <option>Offsets partially used</option>
                      <option>Offsets fully used</option>
                    </select>
                  </div>
                )}

                <div>
                  <InfoLabel
                    label="Q5. Is the organization subject to emission regulations?"
                    info="Select Yes if your company must follow environmental laws related to emissions (for example environmental permits, pollution control laws, carbon taxes)."
                  />
                  <div className="flex gap-4">
                    {["yes", "no"].map((opt) => (
                      <label key={opt} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value={opt}
                          {...register("gri205.subjectToRegulation")}
                          className="w-4 h-4 text-[#4639AA]"
                        />
                        <span className="capitalize text-sm text-gray-700">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}

            {watch("gri205.isMaterial") === "no" && (
              <div className="mt-4 bg-[#4639AA]/5 border border-[#4639AA]/15 p-4 rounded-xl">
                <h4 className="text-sm font-bold text-[#4639AA] mb-3">Omission Logic (GRI 305)</h4>
                <p className="text-xs text-gray-600 mb-4">
                  Disclosure marked Omitted if: No emissions calculated, Scope data unavailable, ODS not relevant, Air pollutants not monitored.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <InfoLabel
                      label="Reason for omission"
                      info="Select the reason for omitting the Emissions disclosure."
                    />
                    <select
                      {...register("gri205.omissionReason")}
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
                      info="Provide a mandatory explanation for omission."
                    />
                    <textarea
                      {...register("gri205.omissionExplanation")}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[100px]"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {watch("gri205.isMaterial") === "yes" && (
          <>
            {/* GRI 305-1: Direct (Scope 1) GHG Emissions */}
            <div className="bg-white p-3 rounded-md border border-gray-200">
              <InfoHeading
                icon="mdi:cloud-outline"
                heading=" Direct (Scope 1) GHG Emissions"
                info="This measures greenhouse gas emissions produced directly by your company, such as fuel burned in generators, company vehicles, manufacturing processes, or refrigerant leaks."
              />

              <div className="space-y-6 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <InfoLabel
                      label="Q1. Total direct (Scope 1) GHG emissions"
                      info="Enter the total greenhouse gas emissions generated directly from company operations during the reporting year. Unit: Metric tons CO₂ equivalent (tCO₂e)."
                    />
                    <input
                      type="number"
                      step="any"
                      {...register("gri205.disclosure3051.totalScope1")}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <InfoLabel
                      label="Q2. Which gases are included in the calculation?"
                      info="Select which greenhouse gases were included in the calculation."
                    />
                    <select
                      {...register("gri205.disclosure3051.gasesIncluded")}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
                    >
                      <option>CO₂</option>
                      <option>CO₂ + CH₄</option>
                      <option>CO₂ + CH₄ + N₂O</option>
                      <option>All Kyoto gases</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <InfoLabel
                      label="Q3. Biogenic CO₂ emissions"
                      info="Biogenic emissions come from natural materials like biomass or biofuels."
                    />
                    <input
                      type="number"
                      step="any"
                      {...register("gri205.disclosure3051.biogenicCO2")}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <InfoLabel
                      label="Q4. Base year used for emissions comparison"
                      info="A base year is the year used as a reference point for comparing future emission reductions."
                    />
                    <input
                      type="number"
                      {...register("gri205.disclosure3051.baseYear")}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]"
                      placeholder="2023"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Q5. Emissions in the base year</label>
                    <input
                      type="number"
                      step="any"
                      {...register("gri205.disclosure3051.baseYearEmissions")}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <InfoLabel
                      label="Q6. Consolidation approach used"
                      info="Select how emissions are calculated across company operations."
                    />
                    <select
                      {...register("gri205.disclosure3051.consolidationApproach")}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
                    >
                      <option>Operational control</option>
                      <option>Financial control</option>
                      <option>Equity share</option>
                    </select>
                  </div>
                  <div>
                    <InfoLabel
                      label="Q7. Methodology used for emission calculation"
                      info="Select the standard used for calculating greenhouse gas emissions."
                    />
                    <select
                      {...register("gri205.disclosure3051.methodology")}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
                    >
                      <option>GHG Protocol</option>
                      <option>ISO 14064</option>
                      <option>National emission factors</option>
                      <option>Consultant calculation</option>
                      <option>Other</option>
                    </select>
                    {watch("gri205.disclosure3051.methodology") === "Other" && (
                      <input
                        type="text"
                        maxLength={100}
                        {...register("gri205.disclosure3051.methodologyOther")}
                        className="w-full mt-3 px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
                        placeholder="Describe other methodology..."
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* GRI 305-2: Energy Indirect (Scope 2) GHG Emissions */}
            <div className="bg-white p-3 rounded-md border border-gray-200">
              <InfoHeading
                icon="mdi:flash-triangle"
                heading="Energy Indirect (Scope 2) GHG Emissions"
                info="These emissions come from electricity or energy purchased from outside suppliers."
              />
              <div className="space-y-6 mt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <InfoLabel
                      label="Q1. Total Scope 2 emissions (Location-based)"
                      info="Location-based emissions use the average emission factor of the electricity grid where your company operates."
                    />
                    <input
                      type="number"
                      step="any"
                      {...register("gri205.disclosure3052.scope2Location")}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <InfoLabel
                      label="Q2. Total Scope 2 emissions (Market-based)"
                      info="Market-based emissions reflect emissions from electricity contracts such as renewable electricity purchases."
                    />
                    <input
                      type="number"
                      step="any"
                      {...register("gri205.disclosure3052.scope2Market")}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <InfoLabel
                    label="Q3. Source of emission factors"
                    info="Indicate where the emission factors were taken from (government data, international database, consultant calculation)."
                  />
                  <input
                    type="text"
                    {...register("gri205.disclosure3052.emissionFactorSource")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
                    placeholder="Describe source of emission factors..."
                  />
                </div>
              </div>
            </div>
            {/* GRI 305-3: Other Indirect (Scope 3) GHG Emissions */}
            <div className="bg-white p-3 rounded-md border border-gray-200">
              <InfoHeading
                icon="mdi:earth"
                heading="Other Indirect (Scope 3) GHG Emissions"
                info="These emissions occur in your value chain but are not directly owned by your company.Examples
                • Supplier emissions
                • Employee commuting
                • Waste disposal
                • Business travel
                • Product transportation"
              />
              <div className="space-y-6 mt-6">
                <div>
                  <label className=" font-medium text-gray-700 pb-2">Q1. Total Scope 3 emissions</label>
                  <input
                    type="number"
                    step="any"
                    {...register("gri205.disclosure3053.totalScope3")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className=" font-medium text-gray-700 pb-2">Q2. Scope 3 categories included</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      "Purchased goods and services",
                      "Capital goods",
                      "Fuel-related activities",
                      "Transportation and distribution",
                      "Waste generated in operations",
                      "Business travel",
                      "Employee commuting",
                      "Use of sold products",
                      "End-of-life treatment of products"
                    ].map((category) => (
                      <label key={category} className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          value={category}
                          {...register("gri205.disclosure3053.categories")}
                          className="w-4 h-4 text-[#4639AA]"
                        />
                        <span>{category}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* GRI 305-4: GHG Emissions Intensity */}
            <div className="bg-white p-3 rounded-md border border-gray-200">
              <InfoHeading
                icon="mdi:chart-bubble"
                heading="GHG Emissions Intensity"
                info="Shows how efficient your company is in producing emissions relative to business activity."
              />
              <div className="space-y-6 mt-6">
                <div>
                  <InfoLabel
                    label="Q1. Choose denominator metric"
                    info="Select the business metric used to calculate emissions intensity."
                  />
                  <select
                    {...register("gri205.disclosure3054.intensityMetric")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
                  >
                    <option>Revenue</option>
                    <option>Production volume</option>
                    <option>Number of employees</option>
                    <option>Floor area</option>
                    <option>Units produced</option>
                  </select>
                </div>
                <div>
                  <InfoLabel
                    label="Q2. Value of denominator"
                    info="Example: Revenue = 10,000,000 USD."
                  />
                  <input
                    type="number"
                    step="any"
                    {...register("gri205.disclosure3054.denominatorValue")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]"
                    placeholder="0"
                  />
                </div>
                <div className="text-xs text-gray-500">
                  {/* <span>GHG Intensity = Total GHG Emissions ÷ Denominator. </span> */}
                  Computed value: {ghgIntensity.toFixed(2)}
                </div>
              </div>
            </div>
            {/* GRI 305-5: Reduction of GHG Emissions */}
            <div className="bg-white p-3 rounded-md border border-gray-200">
              <InfoHeading
                icon="mdi:arrow-down-bold"
                heading="Reduction of GHG Emissions"
                info="Shows how much emissions were reduced due to sustainability initiatives."
              />
              <div className="space-y-6 mt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className=" font-medium text-gray-700 pb-2">
                      Q1. Total emissions reduced
                      </label>
                    <input
                      type="number"
                      step="any"
                      {...register("gri205.disclosure3055.totalReduced")}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className=" font-medium text-gray-700 pb-2">
                      Q2. Reduction initiatives implemented
                      </label>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      "Energy efficiency improvements",
                      "Renewable energy adoption",
                      "Equipment upgrades",
                      "Process redesign",
                      "Fuel switching",
                      "Carbon offsets"
                    ].map((action) => (
                      <label key={action} className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          value={action}
                          {...register("gri205.disclosure3055.reductionInitiatives")}
                          className="w-4 h-4 text-[#4639AA]"
                        />
                        <span>{action}</span>
                      </label>
                    ))}
                  </div>
                  </div>
                </div>

                <div>
                  <label className=" font-medium text-gray-700 pb-2">
                    Q3. Base year used for reduction comparison
                    </label>
                  
                  <input
                    type="number"
                    {...register("gri205.disclosure3055.baseYear")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]"
                    placeholder="2023"
                  />
                </div>

                <div className="text-xs text-gray-500">
                  {/* Reduction % = (Emissions Base Year − Current Emissions) ÷ Base Year Emissions × 100.  */}
                  Estimated from reduced emissions: {reductionPercent.toFixed(1)}%
                </div>
              </div>
            </div>
            {/* GRI 305-6: Ozone Depleting Substances (ODS) */}
            <div className="bg-white p-3 rounded-md border border-gray-200">
              <InfoHeading
                icon="mdi:cloud-off-outline"
                heading="Ozone Depleting Substances (ODS)"
                info="Reports chemicals that damage the ozone layer, commonly used in refrigeration systems, air conditioning, or industrial solvents."
              />
              <div className="grid md:grid-cols-3 gap-6 mt-6">
                <div>
                  <label className=" font-medium text-gray-700 pb-2">
                    Q1. ODS produced
                  </label>
                  <input
                    type="number"
                    step="any"
                    {...register("gri205.disclosure3056.odsProduced")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className=" font-medium text-gray-700 pb-2">
                    Q2. ODS destroyed
                  </label>
                  <input
                    type="number"
                    step="any"
                    {...register("gri205.disclosure3056.odsDestroyed")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className=" font-medium text-gray-700 pb-2">
                    Q3. ODS used as feedstock
                  </label>
                  
                  <input
                    type="number"
                    step="any"
                    {...register("gri205.disclosure3056.odsFeedstock")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]"
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-4">
                {/* ODS Production = ODS Produced − ODS Destroyed − ODS Used as Feedstock.  */}
                Computed value: {odsNet.toLocaleString()}
              </div>
            </div>
            {/* GRI 305-7: Air Pollutant Emissions */}
            <div className="bg-white p-3 rounded-md border border-gray-200">
              <InfoHeading
                icon="mdi:factory"
                heading="Air Pollutant Emissions"
                info="Reports major air pollutants released into the atmosphere."
              />
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className=" font-medium text-gray-700 pb-2">
                    Q1. Nitrogen oxides (NOx)
                  </label>
                  
                  <input
                    type="number"
                    step="any"
                    {...register("gri205.disclosure3057.nox")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className=" font-medium text-gray-700 pb-2">
                    Q2. Sulfur oxides (SOx)
                  </label>
                  <input
                    type="number"
                    step="any"
                    {...register("gri205.disclosure3057.sox")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className=" font-medium text-gray-700 pb-2">
                    Q3. Volatile organic compounds (VOC)
                  </label>
                  <input
                    type="number"
                    step="any"
                    {...register("gri205.disclosure3057.voc")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className=" font-medium text-gray-700 pb-2">
                    Q4. Particulate matter (PM)
                  </label>
                  
                  <input
                    type="number"
                    step="any"
                    {...register("gri205.disclosure3057.pm")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className=" font-medium text-gray-700 pb-2">
                    Q5. Hazardous air pollutants
                  </label>
                  <input
                    type="number"
                    step="any"
                    {...register("gri205.disclosure3057.hap")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className=" font-medium text-gray-700 pb-2">
                    Q6. Method used for emission calculation
                  </label>
                  <select
                    {...register("gri205.disclosure3057.calculationMethod")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
                  >
                    <option>Direct measurement</option>
                    <option>Site-specific calculation</option>
                    <option>Emission factor calculation</option>
                    <option>Estimation</option>
                  </select>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };
  //  Gri 306 Waste Management
  const renderGRI306 = () => (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white p-3 rounded-md border border-gray-200">
        <h3 className="text-lg font-bold text-[#4639AA] mb-6 flex items-center gap-2">
          <Icon icon="mdi:delete-outline" /> Waste Management
        </h3>

        <div className="grid grid-cols-1 gap-6">
          <div>
            <InfoLabel
              label="Q1. Has Waste been identified as a material topic?"
              info="Select Yes if your company generates waste that could affect the environment or community. Examples: Manufacturing scrap, Packaging waste, Food waste, Chemical waste, Construction debris."
            />
            <div className="flex gap-4">
              {["yes", "no"].map((opt) => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value={opt}
                    {...register("gri306.isMaterial")}
                    className="w-4 h-4 text-[#4639AA]"
                  />
                  <span className="capitalize text-sm text-gray-700">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {watch("gri306.isMaterial") === "yes" && (
            <>
              <div>
                <InfoLabel
                  label="Q2. How does the organization manage waste?"
                  info="Explain how your company reduces, handles, and disposes waste. Examples: Waste segregation program, Recycling initiatives, Hazardous waste handling procedures, Supplier packaging reduction programs."
                />
                <textarea
                  {...register("gri306.managementDescription")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[100px]"
                  placeholder="Describe waste management..."
                />
              </div>

              <div>
                <InfoLabel
                  label="Q3. Who is responsible for waste management?"
                  info="Select the person responsible for managing waste policies and compliance."
                />
                <select
                  {...register("gri306.responsiblePerson")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
                >
                  <option value="">Select responsible person</option>
                  <option value="Environmental Manager">Environmental Manager</option>
                  <option value="Operations Manager">Operations Manager</option>
                  <option value="Facility Manager">Facility Manager</option>
                  <option value="HSE Manager">HSE Manager</option>
                  <option value="Owner / Director">Owner / Director</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </>
          )}

          {watch("gri306.isMaterial") === "no" && (
            <div className="mt-4 bg-[#4639AA]/5 border border-[#4639AA]/15 p-4 rounded-xl">
              <h4 className="text-sm font-bold text-[#4639AA] mb-3">Omission Logic (GRI 306)</h4>
              <p className="text-xs text-gray-600 mb-4">
                Disclosure marked Omitted if: No waste generated, Waste data unavailable, Waste handled fully by landlord / facility owner.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <InfoLabel
                    label="Reason for omission"
                    info="Select the reason for omitting the Waste disclosure."
                  />
                  <select
                    {...register("gri306.omissionReason")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
                  >
                    <option value="">Select reason</option>
                    <option value="Not applicable">Not applicable</option>
                    <option value="Data unavailable">Data unavailable</option>
                    <option value="Legal restriction">Legal restriction</option>
                    <option value="Confidential information">Confidential information</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <InfoLabel
                    label="Explanation (required)"
                    info="Provide a mandatory explanation for omission."
                  />
                  <textarea
                    {...register("gri306.omissionExplanation")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[100px]"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {watch("gri306.isMaterial") === "yes" && (
        <>
          {/* GRI 306-1: Waste Generation and Significant Waste Impacts */}
          <div className="bg-white p-3 rounded-md border border-gray-200">
            <InfoHeading
              icon="mdi:delete-variant"
              heading="Waste Generation and Significant Waste Impacts"
              info="This section explains how your business activities generate waste and where that waste occurs in the value chain."
            />

            <div className="space-y-6 mt-6">
              <div>
                <InfoLabel
                  label="Q1. Identify the main inputs that lead to waste generation"
                  info="Inputs are materials used by your company that may later become waste. Examples: Raw materials, Packaging materials, Chemicals, Production materials."
                />
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse border border-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="p-2 border border-gray-200">Input Material</th>
                        <th className="p-2 border border-gray-200">Activity Using Material</th>
                        <th className="p-2 border border-gray-200">Waste Generated</th>
                        <th className="p-2 border border-gray-200">Waste Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(watch("gri306.disclosure3061.wasteInputs") || []).map((item, idx) => (
                        <tr key={idx}>
                          <td className="p-1 border border-gray-200">
                            <input
                              {...register(`gri306.disclosure3061.wasteInputs.${idx}.inputMaterial`)}
                              className="w-full p-1 border-none outline-none"
                              placeholder="Input material"
                            />
                          </td>
                          <td className="p-1 border border-gray-200">
                            <input
                              {...register(`gri306.disclosure3061.wasteInputs.${idx}.activity`)}
                              className="w-full p-1 border-none outline-none"
                              placeholder="Activity"
                            />
                          </td>
                          <td className="p-1 border border-gray-200">
                            <input
                              {...register(`gri306.disclosure3061.wasteInputs.${idx}.wasteGenerated`)}
                              className="w-full p-1 border-none outline-none"
                              placeholder="Waste generated"
                            />
                          </td>
                          <td className="p-1 border border-gray-200">
                            <select
                              {...register(`gri306.disclosure3061.wasteInputs.${idx}.wasteType`)}
                              className="w-full p-1 border-none outline-none bg-transparent"
                            >
                              <option value="">Select</option>
                              <option value="Hazardous waste">Hazardous waste</option>
                              <option value="Non-hazardous waste">Non-hazardous waste</option>
                              <option value="Recyclable waste">Recyclable waste</option>
                              <option value="Organic waste">Organic waste</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setValue("gri306.disclosure3061.wasteInputs", [
                      ...(watch("gri306.disclosure3061.wasteInputs") || []),
                      { inputMaterial: "", activity: "", wasteGenerated: "", wasteType: "" }
                    ])
                  }
                  className="text-xs text-[#4639AA] font-bold mt-2"
                >
                  + Add input
                </button>
              </div>

              <div>
                <InfoLabel
                  label="Q2. Where does this waste occur?"
                  info="Identify where the waste is generated in the business process."
                />
                <select
                  {...register("gri306.disclosure3061.wasteLocation")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
                >
                  <option value="">Select location</option>
                  <option value="Internal operations (factory/office)">Internal operations (factory/office)</option>
                  <option value="Upstream supply chain">Upstream supply chain</option>
                  <option value="Downstream product use">Downstream product use</option>
                  <option value="Product end-of-life">Product end-of-life</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white p-3 rounded-md border border-gray-200">
            <InfoHeading
              icon="mdi:recycle"
              heading="Management of Waste Impacts"
              info="This section explains what actions the company takes to reduce waste and manage waste impacts."
            />

            <div className="space-y-6 mt-6">
              <div>
                <InfoLabel
                  label="Q1. What actions are taken to prevent waste generation?"
                  info="Examples: Reduce packaging, Use recyclable materials, Reuse production scrap, Improve product design for longer life."
                />
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "Reduce raw material use",
                    "Use recycled inputs",
                    "Replace hazardous materials",
                    "Product design improvements",
                    "Supplier waste reduction programs",
                    "Product take-back programs"
                  ].map((action) => (
                    <label key={action} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        value={action}
                        {...register("gri306.disclosure3062.preventionActions")}
                        className="w-4 h-4 text-[#4639AA]"
                      />
                      <span className="text-sm text-gray-700">{action}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <InfoLabel
                  label="Q2. Is waste handled by a third-party waste management company?"
                  info="Select Yes if an external company collects or disposes your waste."
                />
                <div className="flex gap-4">
                  {["yes", "no"].map((opt) => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value={opt}
                        {...register("gri306.disclosure3062.thirdPartyHandling")}
                        className="w-4 h-4 text-[#4639AA]"
                      />
                      <span className="capitalize text-sm text-gray-700">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              {watch("gri306.disclosure3062.thirdPartyHandling") === "yes" && (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse border border-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="p-2 border border-gray-200">Waste Contractor</th>
                        <th className="p-2 border border-gray-200">Service Type</th>
                        <th className="p-2 border border-gray-200">Compliance Verification</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(watch("gri306.disclosure3062.contractors") || []).map((item, idx) => (
                        <tr key={idx}>
                          <td className="p-1 border border-gray-200">
                            <input
                              {...register(`gri306.disclosure3062.contractors.${idx}.contractor`)}
                              className="w-full p-1 border-none outline-none"
                              placeholder="Contractor name"
                            />
                          </td>
                          <td className="p-1 border border-gray-200">
                            <select
                              {...register(`gri306.disclosure3062.contractors.${idx}.serviceType`)}
                              className="w-full p-1 border-none outline-none bg-transparent"
                            >
                              <option value="">Select</option>
                              <option value="Collection">Collection</option>
                              <option value="Recycling">Recycling</option>
                              <option value="Disposal">Disposal</option>
                              <option value="Hazardous waste handling">Hazardous waste handling</option>
                            </select>
                          </td>
                          <td className="p-1 border border-gray-200">
                            <input
                              {...register(`gri306.disclosure3062.contractors.${idx}.compliance`)}
                              className="w-full p-1 border-none outline-none"
                              placeholder="Verification"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div>
                <InfoLabel
                  label="Q3. How does the organization monitor waste data?"
                  info="Examples: Waste weighbridge measurement, Waste transfer notes, Monthly waste logs, Environmental audits."
                />
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "Waste weighbridge",
                    "Contractor reports",
                    "Manual logs",
                    "Digital monitoring system"
                  ].map((method) => (
                    <label key={method} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        value={method}
                        {...register("gri306.disclosure3062.monitoringMethods")}
                        className="w-4 h-4 text-[#4639AA]"
                      />
                      <span className="text-sm text-gray-700">{method}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-3 rounded-md border border-gray-200">
            <InfoHeading
              icon="mdi:scale-balance"
              heading="Waste Generated"
              info="This section reports total waste generated by the company during the reporting year."
            />

            <div className="space-y-6 mt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-2 border border-gray-200">Waste Type</th>
                      <th className="p-2 border border-gray-200">Waste Composition</th>
                      <th className="p-2 border border-gray-200">Weight (kg)</th>
                      <th className="p-2 border border-gray-200">Waste (tons)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(watch("gri306.disclosure3063.wasteGenerated") || []).map((item, idx) => (
                      <tr key={idx}>
                        <td className="p-1 border border-gray-200">
                          <select
                            {...register(`gri306.disclosure3063.wasteGenerated.${idx}.wasteType`)}
                            className="w-full p-1 border-none outline-none bg-transparent"
                          >
                            <option value="">Select</option>
                            <option value="Hazardous waste">Hazardous waste</option>
                            <option value="Non-hazardous waste">Non-hazardous waste</option>
                          </select>
                        </td>
                        <td className="p-1 border border-gray-200">
                          <input
                            {...register(`gri306.disclosure3063.wasteGenerated.${idx}.composition`)}
                            className="w-full p-1 border-none outline-none"
                            placeholder="e.g. Plastic, Metal"
                          />
                        </td>
                        <td className="p-1 border border-gray-200">
                          <input
                            type="number"
                            step="any"
                            {...register(`gri306.disclosure3063.wasteGenerated.${idx}.weightKg`)}
                            className="w-full p-1 border-none outline-none"
                            placeholder="0"
                          />
                        </td>
                        <td className="p-1 border border-gray-200">
                          <span className="text-sm">{((watch(`gri306.disclosure3063.wasteGenerated.${idx}.weightKg`) || 0) / 1000).toFixed(2)}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                type="button"
                onClick={() =>
                  setValue("gri306.disclosure3063.wasteGenerated", [
                    ...(watch("gri306.disclosure3063.wasteGenerated") || []),
                    { wasteType: "", composition: "", weightKg: 0 }
                  ])
                }
                className="text-xs text-[#4639AA] font-bold"
              >
                + Add waste type
              </button>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-bold text-[#4639AA] mb-2">Total Waste Generated</h4>
                <p className="text-lg font-semibold">
                  {((watch("gri306.disclosure3063.wasteGenerated") || []).reduce((sum, item) => sum + ((item.weightKg || 0) / 1000), 0)).toFixed(2)} tons
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-3 rounded-md border border-gray-200">
            <InfoHeading
              icon="mdi:recycle"
              heading="Waste Diverted from Disposal"
              info="This shows how much waste is recycled, reused, or recovered instead of going to landfill."
            />

            <div className="space-y-6 mt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-2 border border-gray-200">Waste Type</th>
                      <th className="p-2 border border-gray-200">Recovery Method</th>
                      <th className="p-2 border border-gray-200">Weight (kg)</th>
                      <th className="p-2 border border-gray-200">Onsite/Offsite</th>
                      <th className="p-2 border border-gray-200">Recovered Waste (tons)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(watch("gri306.disclosure3064.wasteDiverted") || []).map((item, idx) => (
                      <tr key={idx}>
                        <td className="p-1 border border-gray-200">
                          <input
                            {...register(`gri306.disclosure3064.wasteDiverted.${idx}.wasteType`)}
                            className="w-full p-1 border-none outline-none"
                            placeholder="Waste type"
                          />
                        </td>
                        <td className="p-1 border border-gray-200">
                          <select
                            {...register(`gri306.disclosure3064.wasteDiverted.${idx}.recoveryMethod`)}
                            className="w-full p-1 border-none outline-none bg-transparent"
                          >
                            <option value="">Select</option>
                            <option value="Preparation for reuse">Preparation for reuse</option>
                            <option value="Recycling">Recycling</option>
                            <option value="Composting">Composting</option>
                            <option value="Energy recovery">Energy recovery</option>
                            <option value="Other recovery">Other recovery</option>
                          </select>
                        </td>
                        <td className="p-1 border border-gray-200">
                          <input
                            type="number"
                            step="any"
                            {...register(`gri306.disclosure3064.wasteDiverted.${idx}.weightKg`)}
                            className="w-full p-1 border-none outline-none"
                            placeholder="0"
                          />
                        </td>
                        <td className="p-1 border border-gray-200">
                          <select
                            {...register(`gri306.disclosure3064.wasteDiverted.${idx}.location`)}
                            className="w-full p-1 border-none outline-none bg-transparent"
                          >
                            <option value="Onsite">Onsite</option>
                            <option value="Offsite">Offsite</option>
                          </select>
                        </td>
                        <td className="p-1 border border-gray-200">
                          <span className="text-sm">{((watch(`gri306.disclosure3064.wasteDiverted.${idx}.weightKg`) || 0) / 1000).toFixed(2)}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                type="button"
                onClick={() =>
                  setValue("gri306.disclosure3064.wasteDiverted", [
                    ...(watch("gri306.disclosure3064.wasteDiverted") || []),
                    { wasteType: "", recoveryMethod: "", weightKg: 0, location: "" }
                  ])
                }
                className="text-xs text-[#4639AA] font-bold"
              >
                + Add diverted waste
              </button>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-bold text-[#4639AA] mb-2">Total Waste Diverted</h4>
                <p className="text-lg font-semibold">
                  {((watch("gri306.disclosure3064.wasteDiverted") || []).reduce((sum, item) => sum + ((item.weightKg || 0) / 1000), 0)).toFixed(2)} tons
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-3 rounded-md border border-gray-200">
            <InfoHeading
              icon="mdi:delete-forever"
              heading="Waste Directed to Disposal"
              info="This section reports waste that is not recovered and instead disposed through landfill or incineration."
            />

            <div className="space-y-6 mt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-2 border border-gray-200">Waste Type</th>
                      <th className="p-2 border border-gray-200">Disposal Method</th>
                      <th className="p-2 border border-gray-200">Weight (kg)</th>
                      <th className="p-2 border border-gray-200">Onsite/Offsite</th>
                      <th className="p-2 border border-gray-200">Disposed Waste (tons)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(watch("gri306.disclosure3065.wasteDisposed") || []).map((item, idx) => (
                      <tr key={idx}>
                        <td className="p-1 border border-gray-200">
                          <input
                            {...register(`gri306.disclosure3065.wasteDisposed.${idx}.wasteType`)}
                            className="w-full p-1 border-none outline-none"
                            placeholder="Waste type"
                          />
                        </td>
                        <td className="p-1 border border-gray-200">
                          <select
                            {...register(`gri306.disclosure3065.wasteDisposed.${idx}.disposalMethod`)}
                            className="w-full p-1 border-none outline-none bg-transparent"
                          >
                            <option value="">Select</option>
                            <option value="Landfill">Landfill</option>
                            <option value="Incineration with energy recovery">Incineration with energy recovery</option>
                            <option value="Incineration without energy recovery">Incineration without energy recovery</option>
                            <option value="Other disposal">Other disposal</option>
                          </select>
                        </td>
                        <td className="p-1 border border-gray-200">
                          <input
                            type="number"
                            step="any"
                            {...register(`gri306.disclosure3065.wasteDisposed.${idx}.weightKg`)}
                            className="w-full p-1 border-none outline-none"
                            placeholder="0"
                          />
                        </td>
                        <td className="p-1 border border-gray-200">
                          <select
                            {...register(`gri306.disclosure3065.wasteDisposed.${idx}.location`)}
                            className="w-full p-1 border-none outline-none bg-transparent"
                          >
                            <option value="Onsite">Onsite</option>
                            <option value="Offsite">Offsite</option>
                          </select>
                        </td>
                        <td className="p-1 border border-gray-200">
                          <span className="text-sm">{((watch(`gri306.disclosure3065.wasteDisposed.${idx}.weightKg`) || 0) / 1000).toFixed(2)}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                type="button"
                onClick={() =>
                  setValue("gri306.disclosure3065.wasteDisposed", [
                    ...(watch("gri306.disclosure3065.wasteDisposed") || []),
                    { wasteType: "", disposalMethod: "", weightKg: 0, location: "" }
                  ])
                }
                className="text-xs text-[#4639AA] font-bold"
              >
                + Add disposed waste
              </button>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-bold text-[#4639AA] mb-2">Total Waste Disposed</h4>
                <p className="text-lg font-semibold">
                  {((watch("gri306.disclosure3065.wasteDisposed") || []).reduce((sum, item) => sum + ((item.weightKg || 0) / 1000), 0)).toFixed(2)} tons
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
  //  Gri 308 Supplier Environmental Assessment
  const renderGRI307 = () => (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white p-3 rounded-md border border-gray-200">
        <h3 className="text-lg font-bold text-[#4639AA] mb-6 flex items-center gap-2">
          <Icon icon="mdi:weather-partly-cloudy" /> Supplier Environmental Assessment
        </h3>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <InfoLabel
              label="Q1. Has Supplier Environmental Assessment been identified as a material topic?"
              info="Select Yes if your organization purchases goods or services from suppliers whose environmental practices may affect your company's sustainability performance. Examples: Raw material suppliers, Manufacturing partners, Logistics providers, Packaging suppliers, Waste management contractors."
            />
            <div className="flex gap-4">
              {["yes", "no"].map((opt) => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value={opt}
                    {...register("gri308.isMaterial")}
                    className="w-4 h-4 text-[#4639AA]"
                  />
                  <span className="capitalize text-sm text-gray-700">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {watch("gri308.isMaterial") === "yes" && (
            <>
              <div>
                <InfoLabel
                  label="Q2. Does the organization screen new suppliers using environmental criteria?"
                  info="Environmental criteria are requirements used to evaluate suppliers before doing business with them. Examples include: Compliance with environmental laws, Waste management practices, Energy efficiency measures, Pollution prevention policies, Environmental certifications (ISO 14001)."
                />
                <div className="flex gap-4">
                  {["yes", "no"].map((opt) => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value={opt}
                        {...register("gri308.screenNewSuppliers")}
                        className="w-4 h-4 text-[#4639AA]"
                      />
                      <span className="capitalize text-sm text-gray-700">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <InfoLabel
                  label="Q3. What environmental criteria are used to screen suppliers?"
                  info="Select the environmental standards or criteria your organization considers when selecting suppliers."
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "Compliance with environmental laws",
                    "Waste management practices",
                    "Emissions control measures",
                    "Water management practices",
                    "Energy efficiency measures",
                    "Environmental certifications (ISO 14001 etc.)",
                    "Hazardous material handling",
                    "Sustainable packaging practices",
                    "Other"
                  ].map((criteria) => (
                    <label key={criteria} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        value={criteria}
                        {...register("gri308.screeningCriteria")}
                        className="w-4 h-4 text-[#4639AA]"
                      />
                      <span>{criteria}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <InfoLabel
                  label="Q4. How are suppliers assessed for environmental impacts?"
                  info="Environmental assessments help identify whether suppliers create environmental risks in your supply chain. Examples: Supplier questionnaires, Environmental audits, Contractual environmental requirements, Sustainability certifications, On-site inspections."
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "Supplier self-assessment questionnaire",
                    "Environmental audit",
                    "Contract review",
                    "Third-party certification verification",
                    "Site inspection",
                    "Complaint / grievance review"
                  ].map((method) => (
                    <label key={method} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        value={method}
                        {...register("gri308.assessmentMethods")}
                        className="w-4 h-4 text-[#4639AA]"
                      />
                      <span>{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <InfoLabel
                  label="Q5. How are suppliers prioritized for environmental assessment?"
                  info="Some suppliers may pose higher environmental risks than others. Companies often prioritize assessments based on risk. Examples: Suppliers handling chemicals, Suppliers in high-pollution industries, Suppliers located in environmentally sensitive areas."
                />
                <select
                  {...register("gri308.prioritizationMethod")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
                >
                  <option value="">Select prioritization method</option>
                  <option value="Risk-based prioritization">Risk-based prioritization</option>
                  <option value="Spend-based prioritization">Spend-based prioritization</option>
                  <option value="Geographic risk prioritization">Geographic risk prioritization</option>
                  <option value="Industry-risk prioritization">Industry-risk prioritization</option>
                  <option value="All suppliers assessed equally">All suppliers assessed equally</option>
                </select>
              </div>

              <div>
                <InfoLabel
                  label="Q6. What actions are taken when suppliers have environmental issues?"
                  info="If a supplier is found to have environmental problems, organizations may take corrective actions. Examples: Require corrective action plans, Provide supplier training, Improve contract requirements, Terminate supplier relationship."
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "Corrective action plans",
                    "Supplier training / capacity building",
                    "Contractual performance improvement requirements",
                    "Increased monitoring",
                    "Supplier replacement / termination",
                    "No action taken"
                  ].map((action) => (
                    <label key={action} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        value={action}
                        {...register("gri308.actionsForIssues")}
                        className="w-4 h-4 text-[#4639AA]"
                      />
                      <span>{action}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          {watch("gri308.isMaterial") === "no" && (
            <div className="mt-4 bg-[#4639AA]/5 border border-[#4639AA]/15 p-4 rounded-xl">
              <h4 className="text-sm font-bold text-[#4639AA] mb-3">Omission Logic (GRI 308)</h4>
              <p className="text-xs text-gray-600 mb-4">
                Disclosure may be omitted if: Organization has no suppliers, Organization does not conduct environmental screening, Data unavailable. User must provide explanation.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <InfoLabel
                    label="Reason for omission"
                    info="Select the reason for omitting the Supplier Environmental Assessment disclosure."
                  />
                  <select
                    {...register("gri308.omissionReason")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] bg-white text-sm"
                  >
                    <option value="">Select reason</option>
                    <option value="Not applicable">Not applicable</option>
                    <option value="Data unavailable">Data unavailable</option>
                    <option value="Legal restriction">Legal restriction</option>
                    <option value="Confidentiality constraints">Confidentiality constraints</option>
                  </select>
                </div>
                <div>
                  <InfoLabel
                    label="Explanation (required)"
                    info="Provide a mandatory explanation for omission."
                  />
                  <textarea
                    {...register("gri308.omissionExplanation")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[100px]"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {watch("gri308.isMaterial") === "yes" && (
        <>
          <div className="bg-white p-3 rounded-md border border-gray-200">
            <InfoHeading
              icon="mdi:account-check"
              heading="New Suppliers Screened Using Environmental Criteria"
              info="This section shows how many new suppliers were evaluated using environmental sustainability criteria before onboarding."
            />

            <div className="space-y-6 mt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-2 border border-gray-200">Total New Suppliers</th>
                      <th className="p-2 border border-gray-200">Suppliers Screened Using Environmental Criteria</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-1 border border-gray-200">
                        <input
                          type="number"
                          step="1"
                          min="0"
                          {...register("gri308.disclosure3081.totalNewSuppliers")}
                          className="w-full p-1 border-none outline-none"
                          placeholder="0"
                        />
                      </td>
                      <td className="p-1 border border-gray-200">
                        <input
                          type="number"
                          step="1"
                          min="0"
                          {...register("gri308.disclosure3081.screenedSuppliers")}
                          className="w-full p-1 border-none outline-none"
                          placeholder="0"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-[#F8FAFC] p-4 rounded-lg border border-gray-200">
                <div className="font-semibold text-sm text-[#4639AA]">Percentage of New Suppliers Screened</div>
                <div className="mt-2 text-lg font-bold text-gray-900">
                  {(() => {
                    const total = Number(watch("gri308.disclosure3081.totalNewSuppliers") || 0);
                    const screened = Number(watch("gri308.disclosure3081.screenedSuppliers") || 0);
                    const rate = total > 0 ? ((screened / total) * 100).toFixed(1) : '0.0';
                    return `${rate}%`;
                  })()}
                </div>
                {/* <p className="text-xs text-gray-500 mt-2">
                  Supplier Screening Rate (%) = (Suppliers Screened ÷ Total New Suppliers) × 100
                </p> */}
              </div>
            </div>
          </div>

          <div className="bg-white p-3 rounded-md border border-gray-200">
            <InfoHeading
              icon="mdi:alert-circle"
              heading="Negative Environmental Impacts in the Supply Chain"
              info="This section explains whether suppliers were found to have environmental issues and what actions the organization took."
            />

            <div className="space-y-6 mt-6">
              <div>
                <InfoLabel
                  label="Q1. Number of suppliers assessed for environmental impacts"
                  info="Enter the number of suppliers that underwent environmental assessment during the reporting period."
                />
                <input
                  type="number"
                  step="1"
                  min="0"
                  {...register("gri308.disclosure3082.suppliersAssessed")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]"
                  placeholder="0"
                />
              </div>

              <div>
                <InfoLabel
                  label="Q2. Number of suppliers identified with significant environmental impacts"
                  info="Enter the number of suppliers found to have environmental issues such as: Pollution violations, Poor waste management, Illegal emissions, Environmental regulatory non-compliance."
                />
                <input
                  type="number"
                  step="1"
                  min="0"
                  {...register("gri308.disclosure3082.suppliersWithImpacts")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]"
                  placeholder="0"
                />
              </div>

              <div>
                <InfoLabel
                  label="Q3. Describe the significant environmental impacts identified"
                  info="Briefly describe the environmental issues discovered in suppliers. Examples: Illegal waste dumping, Excessive air emissions, Untreated wastewater discharge, Hazardous chemical mismanagement."
                />
                <textarea
                  {...register("gri308.disclosure3082.impactDescription")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[120px]"
                  placeholder="Describe environmental impacts..."
                />
              </div>

              <div>
                <InfoLabel
                  label="Q4. Suppliers with agreed improvement plans"
                  info="Enter the number of suppliers that agreed to improve their environmental performance after assessment."
                />
                <input
                  type="number"
                  step="1"
                  min="0"
                  {...register("gri308.disclosure3082.suppliersWithPlans")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]"
                  placeholder="0"
                />
              </div>

              <div className="bg-[#F8FAFC] p-4 rounded-lg border border-gray-200">
                <div className="font-semibold text-sm text-[#4639AA]">Improvement Agreement Rate</div>
                <div className="mt-2 text-lg font-bold text-gray-900">
                  {(() => {
                    const impacts = Number(watch("gri308.disclosure3082.suppliersWithImpacts") || 0);
                    const plans = Number(watch("gri308.disclosure3082.suppliersWithPlans") || 0);
                    const rate = impacts > 0 ? ((plans / impacts) * 100).toFixed(1) : '0.0';
                    return `${rate}%`;
                  })()}
                </div>
                {/* <p className="text-xs text-gray-500 mt-2">
                  Improvement Rate (%) = (Suppliers With Improvement Plans ÷ Suppliers With Environmental Impacts) × 100
                </p> */}
              </div>

              <div>
                <InfoLabel
                  label="Q5. Suppliers terminated due to environmental impacts"
                  info="Enter the number of suppliers whose contracts were terminated due to serious environmental violations. Examples: Repeated environmental law violations, Refusal to correct environmental damage, High environmental risk."
                />
                <input
                  type="number"
                  step="1"
                  min="0"
                  {...register("gri308.disclosure3082.suppliersTerminated")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA]"
                  placeholder="0"
                />
              </div>

              <div>
                <InfoLabel
                  label="Q6. Reason for termination"
                  info="Explain why the supplier relationship was ended. Examples: Environmental law violations, Failure to implement corrective actions, High environmental risk exposure."
                />
                <textarea
                  {...register("gri308.disclosure3082.terminationReason")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#4639AA] min-h-[120px]"
                  placeholder="Explain termination reasons..."
                />
              </div>

              <div className="bg-[#F8FAFC] p-4 rounded-lg border border-gray-200">
                <div className="font-semibold text-sm text-[#4639AA]">Termination Rate</div>
                <div className="mt-2 text-lg font-bold text-gray-900">
                  {(() => {
                    const impacts = Number(watch("gri308.disclosure3082.suppliersWithImpacts") || 0);
                    const terminated = Number(watch("gri308.disclosure3082.suppliersTerminated") || 0);
                    const rate = impacts > 0 ? ((terminated / impacts) * 100).toFixed(1) : '0.0';
                    return `${rate}%`;
                  })()}
                </div>
                {/* <p className="text-xs text-gray-500 mt-2">
                  Termination Rate (%) = (Suppliers Terminated ÷ Suppliers With Environmental Impacts) × 100
                </p> */}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );


  return (
    <div className=" min-h-screen relative">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 p-6 bg-white border border-gray-200 rounded-lg">
          <div>
            <h1 className="text-2xl font-semibold text-gray-700">
              <span className="text-[#4639AA]">MODULE 5:</span> Environment Disclosure
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
          <div className=" flex flex-col gap-2 p-3 bg-white border border-gray-200 rounded-lg w-full md:w-fit lg:h-[calc(100vh-150px)]">
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
              {activeTab === 0 && renderGRI301()}
              {activeTab === 1 && renderGRI302()}
              {activeTab === 2 && renderGRI303()}
              {activeTab === 3 && renderGRI304()}
              {activeTab === 4 && renderGRI305()}
              {activeTab === 5 && renderGRI306()}
              {activeTab === 6 && renderGRI307()}
            
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

export default ManagementApproach;
