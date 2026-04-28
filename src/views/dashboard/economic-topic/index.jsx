
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axiosInstance from "../../../configs/axios.config";
import { toast } from "react-toastify";
import { handleError } from "../../../utils/functions";

import TopicLanding from "@/components/screens/TopicLanding";
import ImpactIdentification from "@/components/screens/ImpactIdentification";
import IdentifiedImpacts from "@/components/screens/IdentifiedImpacts";
import ImpactDetails from "@/components/screens/ImpactDetails";
import ImpactScoring from "@/components/screens/ImpactScoring";
import ImpactSummary from "@/components/screens/ImpactSummary";
import MaterialityThreshold from "@/components/screens/MaterialityThreshold";
import MaterialityResult from "@/components/screens/MaterialityResult";
import Confirmation from "@/components/screens/Confirmation";
import Card from "@/components/ui/Card";

import GRIStandards, { DEFAULT_GRI_TOPICS } from "@/components/screens/GRIStandards";
import { TOPIC_DATA } from "@/constants/topicData";

const EconomicTopicWizard = () => {
  const [step, setStep] = useState(1);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [activeTopicIndex, setActiveTopicIndex] = useState(0);
  const [selectedImpacts, setSelectedImpacts] = useState([]);
  const [currentImpactIndex, setCurrentImpactIndex] = useState(0);
  const [thresholds, setThresholds] = useState({
    impactScore: 15,
    stakeholderConcern: 4.0
  });
  const [screeningAnswers, setScreeningAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const steps = [
    { id: 1, label: "GRI Selection", icon: "mdi:format-list-checks" },
    { id: 2, label: "Topic Landing", icon: "mdi:flag-checkered" },
    { id: 3, label: "Impact Identification", icon: "mdi:magnify" },
    { id: 4, label: "Identified Impacts", icon: "mdi:format-list-bulleted" },
    { id: 5, label: "Impact Details", icon: "mdi:file-document-edit-outline" },
    { id: 6, label: "Impact Scoring", icon: "mdi:star-half-full" },
    { id: 7, label: "Impact Summary", icon: "mdi:table-large" },
    { id: 8, label: "Materiality Threshold", icon: "mdi:tune" },
    { id: 9, label: "Materiality Result", icon: "mdi:chart-box-outline" },
    { id: 10, label: "Confirmation", icon: "mdi:check-decagram" },
  ];

  const activeTopic = selectedTopics[activeTopicIndex] || null;
  const activeTopicData = activeTopic ? (TOPIC_DATA[activeTopic.code] || null) : null;

  // 1. Fetch data on mount
  useEffect(() => {
    const fetchEconomicData = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("/brand/economic/");
        if (res.data.success && res.data.data) {
          const doc = res.data.data;

          // Sync thresholds
          if (doc.thresholds) {
            setThresholds(doc.thresholds);
          }

          // Sync selected topics from sections
          if (doc.sections && doc.sections.length > 0) {
            const selected = [];
            doc.sections.forEach(sec => {
              sec.items.forEach(item => {
                if (item.selected) {
                  selected.push({ topic: item.topic, code: item.code, keywords: item.keywords });
                }
              });
            });
            setSelectedTopics(selected);
          }

          // Sync active topic
          if (doc.activeTopicCode && doc.activeTopicCode !== 'GRI_SETUP') {
            const idx = doc.sections?.flatMap(s => s.items).findIndex(i => i.code === doc.activeTopicCode && i.selected);
            if (idx >= 0) {
              // Note: This logic assumes we can map activeTopicCode back to index in selectedTopics
              // Since selectedTopics is derived from sections, we find it there
              const sIdx = doc.sections.flatMap(s => s.items).filter(i => i.selected).findIndex(i => i.code === doc.activeTopicCode);
              if (sIdx >= 0) setActiveTopicIndex(sIdx);
            }
          }
        }
      } catch (err) {
        handleError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEconomicData();
  }, []);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, steps.length));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleGRISelectionNext = async (selection) => {
    // selection is { 'GRI 201-0': true, 'GRI 202-1': false, ... }
    const selected = [];
    const payloadSections = DEFAULT_GRI_TOPICS.map(group => {
      const items = group.items.map((item, i) => {
        const isSelected = !!selection[`${item.code}-${i}`];
        if (isSelected) {
          selected.push({ ...item });
        }
        return {
          ...item,
          selected: isSelected
        };
      });
      return {
        section: group.section,
        items
      };
    });

    if (selected.length === 0) {
      toast.warning("Please select at least one GRI topic.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        activeTopicCode: "GRI_SETUP",
        sections: payloadSections,
        totalSelected: selected.length
      };
      const res = await axiosInstance.post("/brand/economic/", payload);
      if (res.data.success) {
        setSelectedTopics(selected);
        setActiveTopicIndex(0);
        setStep(2);
      }
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleImpactDetailsNext = (updatedImpact) => {
    const newImpacts = [...selectedImpacts];
    newImpacts[currentImpactIndex] = updatedImpact;
    setSelectedImpacts(newImpacts);

    if (currentImpactIndex < selectedImpacts.length - 1) {
      setCurrentImpactIndex(currentImpactIndex + 1);
    } else {
      setCurrentImpactIndex(0);
      nextStep();
    }
  };

  const handleImpactScoringNext = (updatedImpact) => {
    const newImpacts = [...selectedImpacts];
    newImpacts[currentImpactIndex] = updatedImpact;
    setSelectedImpacts(newImpacts);

    if (currentImpactIndex < selectedImpacts.length - 1) {
      setCurrentImpactIndex(currentImpactIndex + 1);
    } else {
      setCurrentImpactIndex(0);
      nextStep();
    }
  };

  const handleScreeningSubmit = (answers) => {
    setScreeningAnswers(answers);
    // Reset selected impacts when screening changes to avoid duplicates/stale data
    setSelectedImpacts([]);
    nextStep();
  };

  const handleAddImpact = (newImpact) => {
    setSelectedImpacts(prev => [...prev, newImpact]);
  };

  const handleRemoveImpact = (index) => {
    setSelectedImpacts(selectedImpacts.filter((_, i) => i !== index));
  };

  const handleFinalSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        activeTopicCode: activeTopic.code,
        topic: activeTopic.topic,
        selectedImpacts: selectedImpacts.map(imp => ({
          name: imp.name,
          type: imp.type,
          actualPotential: imp.actualPotential,
          stakeholders: imp.stakeholders || [],
          stakeholderConcern: imp.stakeholderConcern || {},
          scores: imp.scores || {}
        })),
        thresholds: thresholds,
        isCompleted: true
      };

      const res = await axiosInstance.post("/brand/economic/", payload);
      if (res.data.success) {
        toast.success(`${activeTopic.topic} Assessment Completed & Saved!`);
        if (activeTopicIndex < selectedTopics.length - 1) {
          // Move to next topic
          setActiveTopicIndex(prev => prev + 1);
          setStep(2); // Go back to landing for next topic
          setSelectedImpacts([]);
          setCurrentImpactIndex(0);
          setScreeningAnswers({});
        } else {
          toast.info("All selected topics completed!");
          setStep(10); // Stay on confirmation or move to a dashboard? 
        }
      }
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const renderScreen = () => {
    switch (step) {
      case 1:
        return <GRIStandards onNext={handleGRISelectionNext} />;
      case 2:
        if (!activeTopic) return <div className="p-8 text-center text-slate-500">Please select topics in Step 1</div>;
        return <TopicLanding
          topicName={activeTopic.topic}
          topicCode={activeTopic.code}
          description={activeTopicData?.description}
          selectedTopics={selectedTopics}
          activeIndex={activeTopicIndex}
          onNext={nextStep}
          onBack={prevStep}
        />;
      case 3:
        return <ImpactIdentification
          questions={activeTopicData?.questions || []}
          info={activeTopicData?.info || []}
          savedAnswers={screeningAnswers}
          onNext={handleScreeningSubmit}
          onPrev={prevStep}
        />;
      case 4:
        const identifiedPredefinedImpacts = (activeTopicData?.predefinedImpacts || [])
          .map((name, idx) => ({
            name,
            info: activeTopicData?.info?.[idx] || ""
          }))
          .filter((_, idx) => screeningAnswers[idx] === true);

        return <IdentifiedImpacts
          impacts={selectedImpacts}
          predefinedImpacts={identifiedPredefinedImpacts}
          onAddImpact={handleAddImpact}
          onRemoveImpact={handleRemoveImpact}
          onNext={() => {
            if (selectedImpacts.length > 0) {
              setCurrentImpactIndex(0);
              nextStep();
            } else {
              toast.warning("Please add at least one impact.");
            }
          }}
          onPrev={prevStep}
        />;
      case 5:
        return <ImpactDetails
          impact={selectedImpacts[currentImpactIndex] || {}}
          impactIndex={currentImpactIndex + 1}
          totalImpacts={selectedImpacts.length}
          onSave={handleImpactDetailsNext}
          onBack={() => {
            if (currentImpactIndex > 0) {
              setCurrentImpactIndex((prev) => prev - 1);
            } else {
              prevStep();
            }
          }}
        />;
      case 6:
        return <ImpactScoring
          impact={selectedImpacts[currentImpactIndex] || {}}
          impactIndex={currentImpactIndex + 1}
          totalImpacts={selectedImpacts.length}
          onSave={handleImpactScoringNext}
          onBack={() => {
            if (currentImpactIndex > 0) {
              setCurrentImpactIndex((prev) => prev - 1);
            } else {
              setCurrentImpactIndex(selectedImpacts.length - 1);
              prevStep();
            }
          }}
        />;
      case 7:
        return <ImpactSummary impacts={selectedImpacts} onNext={nextStep} onBack={prevStep} />;
      case 8:
        return <MaterialityThreshold
          thresholds={thresholds}
          onUpdate={(key, val) => {
            setThresholds(prev => ({ ...prev, [key]: val }));
          }}
          onNext={nextStep}
          onBack={prevStep}
        />;
      case 9:
        return <MaterialityResult
          impacts={selectedImpacts}
          thresholds={thresholds}
          onNext={nextStep}
          onBack={prevStep}
        />;
      case 10:
        return <Confirmation
          impacts={selectedImpacts}
          topicName={activeTopic?.topic}
          topicCode={activeTopic?.code}
          hasNextTopic={activeTopicIndex < selectedTopics.length - 1}
          onBack={prevStep}
          onConfirm={handleFinalSubmit}
        />;
      default:
        return <div>Unknown Step</div>;
    }
  };

  if (loading && step === 1 && selectedTopics.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4639AA]"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-white  p-5 border shadow-sm rounded-lg mb-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-700">
              <span className="text-[#4639AA]">MODULE 3:</span> Materiality Disclosure
            </h1>
            {activeTopic ? (
              <p className="mt-2 text-[#1893A1] font-medium uppercase tracking-wide">
                <span className="bg-[#1893A1]/10 px-2 py-0.5 rounded mr-2">{activeTopic.code}</span>
                {activeTopic.topic} — {steps[step - 1]?.label}
              </p>
            ) : (
              <p className="mt-2 text-slate-400 font-medium italic">
                Please select topics to start assessment — {steps[step - 1]?.label}
              </p>
            )}
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
              Step {step} of {steps.length}
            </span>
            <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-br from-[#4639AA] to-[#1893A1] transition-all duration-500"
                style={{ width: `${(step / steps.length) * 100}%` }}
              />
            </div>
          </div>
          <span className="text-sm text-gray-600 mt-2 sm:mt-0">
            {Math.round((step / steps.length) * 100)}% Complete
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-3">
          <div className=" bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="space-y-2 h-[calc(89vh-150px)] overflow-y-auto scrollbar-theme">
              {steps.map((s) => (
                <button
                  key={s.id}
                  disabled={s.id > 1 && !activeTopic}
                  className={`
                      w-full flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors border rounded-md
                      ${step === s.id
                      ? "bg-gradient-to-br from-[#4639AA] to-[#1893A1] text-white border-[#4639AA]/50 shadow-md"
                      : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 border-transparent"}
                      ${s.id > 1 && !activeTopic ? "opacity-30 cursor-not-allowed grayscale" : ""}
                    `}
                  onClick={() => setStep(s.id)}
                >
                  <Icon icon={s.icon} className="text-xl" />
                  <span className="text-sm font-medium">{s.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-9">
          <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 min-h-[600px]">
            <div className=" h-[calc(87vh-150px)] overflow-y-auto scrollbar-theme">
              {renderScreen()}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EconomicTopicWizard;
