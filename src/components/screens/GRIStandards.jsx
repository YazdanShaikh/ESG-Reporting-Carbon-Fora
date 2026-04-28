import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axiosInstance from "../../configs/axios.config";
import { toast } from "react-toastify";
import { handleError } from "../../utils/functions";
import { clearAuth } from "../../store/slice/auth";

export const DEFAULT_GRI_TOPICS = [
    {
        section: "GRI 200 — Economic Topics",
        items: [
            {
                topic: "Economic Performance",
                code: "GRI 201",
                keywords:
                    "revenue, profit, loss, financial performance, economic impact, operating cost, investment, growth, expenditure, financial risk",
            },
            {
                topic: "Market Presence",
                code: "GRI 202",
                keywords:
                    "market presence, local hiring, local workforce, wage levels, minimum wage, pay ratio, senior management local, regional employment, local economy, economic contribution",
            },
            {
                topic: "Indirect Economic Impacts",
                code: "GRI 203",
                keywords:
                    "indirect impact, community development, infrastructure, local economy, economic development, livelihoods, social investment, community investment, regional development, public infrastructure",
            },
            {
                topic: "Procurement Practices",
                code: "GRI 204",
                keywords:
                    "procurement, purchasing, sourcing, local suppliers, supplier selection, vendor, supply base, purchasing policy, contract award, responsible procurement",
            },
            {
                topic: "Anti-Corruption",
                code: "GRI 205",
                keywords:
                    "corruption, bribery, fraud, unethical, misconduct, anti-bribery, whistleblower, compliance, integrity, corruption risk",
            },
            {
                topic: "Anti-Competitive Behavior",
                code: "GRI 206",
                keywords:
                    "competition, anti-competitive, monopoly, price fixing, cartel, unfair competition, market dominance, regulatory violation, trade practices, competition law",
            },
            {
                topic: "Tax",
                code: "GRI 207",
                keywords:
                    "tax, taxation, tax payments, corporate tax, income tax, tax compliance, tax transparency, tax policy, tax authority, tax reporting",
            },
        ],
    },
    {
        section: "GRI 300 — Environmental Topics",
        items: [
            {
                topic: "Materials",
                code: "GRI 301",
                keywords:
                    "materials, raw materials, material use, recycled materials, virgin materials, packaging, material sourcing, resource use, material efficiency, sustainable materials",
            },
            {
                topic: "Energy",
                code: "GRI 302",
                keywords:
                    "energy, electricity, fuel, diesel, natural gas, renewable energy, energy efficiency, power consumption, energy use, non-renewable",
            },
            {
                topic: "Water & Effluents",
                code: "GRI 303",
                keywords:
                    "water, water use, water withdrawal, water scarcity, effluent, wastewater, discharge, water stress, groundwater, water pollution",
            },
            {
                topic: "Biodiversity",
                code: "GRI 304",
                keywords:
                    "biodiversity, ecosystem, habitat, protected area, deforestation, wildlife, species, land use, conservation, ecological impact",
            },
            {
                topic: "Emissions",
                code: "GRI 305",
                keywords:
                    "emissions, carbon, CO2, greenhouse gas, GHG, climate change, global warming, carbon footprint, scope 1, scope 2, scope 3, net emissions, gross emissions",
            },
            {
                topic: "Waste",
                code: "GRI 306",
                keywords:
                    "waste, solid waste, hazardous waste, recycling, landfill, waste disposal, waste management, plastic waste, incineration, scrap",
            },
            {
                topic: "Supplier Environmental Assessment",
                code: "GRI 308",
                keywords:
                    "supplier environment, environmental assessment, supplier audit, environmental risk, supply chain environment, vendor compliance, supplier screening, environmental criteria, supplier evaluation, third-party environment",
            },
        ],
    },
    {
        section: "GRI 400 — Social Topics",
        items: [
            {
                topic: "Employment",
                code: "GRI 401",
                keywords:
                    "employment, hiring, recruitment, turnover, resignation, workforce, contracts, wages, salaries, benefits",
            },
            {
                topic: "Labor / Management Relations",
                code: "GRI 402",
                keywords:
                    "labor relations, management relations, employee dialogue, workforce consultation, change management, labor dispute, employee communication, worker engagement, negotiation, industrial relations",
            },
            {
                topic: "Occupational Health & Safety",
                code: "GRI 403",
                keywords:
                    "safety, injury, accident, incident, lost time, fatality, hazard, workplace safety, PPE, health risk",
            },
            {
                topic: "Training & Education",
                code: "GRI 404",
                keywords:
                    "training, education, learning, skills, development, capacity building, workshops, upskilling, reskilling, employee growth",
            },
            {
                topic: "Diversity & Equal Opportunity",
                code: "GRI 405",
                keywords:
                    "diversity, inclusion, gender, equality, women, minority, equal opportunity, pay gap, inclusion policy, representation",
            },
            {
                topic: "Non-Discrimination",
                code: "GRI 406",
                keywords:
                    "discrimination, harassment, bias, unfair treatment, grievance, complaint, misconduct, retaliation, abuse, unequal treatment",
            },
            {
                topic: "Freedom of Association & Collective Bargaining",
                code: "GRI 407",
                keywords:
                    "freedom of association, collective bargaining, labor union, trade union, worker rights, bargaining agreement, union membership, employee representation, labor rights, worker committee",
            },
            {
                topic: "Child Labor",
                code: "GRI 408",
                keywords:
                    "child labor, underage, minors, young workers, exploitation, illegal labor, child rights, labor violation, supply chain child labor, forced schooling",
            },
            {
                topic: "Forced or Compulsory Labor",
                code: "GRI 409",
                keywords:
                    "forced labor, bonded labor, compulsory work, human trafficking, modern slavery, coercion, involuntary labor, exploitation, passport retention, labor abuse",
            },
            {
                topic: "Security Practices",
                code: "GRI 410",
                keywords:
                    "security practices, security personnel, guards, use of force, human rights training, security risk, violence, misconduct, armed security, safety incident",
            },
            {
                topic: "Rights of Indigenous Peoples",
                code: "GRI 411",
                keywords:
                    "indigenous, indigenous peoples, tribal, native communities, land rights, ancestral land, cultural heritage, traditional land, community consent, displacement",
            },
            {
                topic: "Local Communities",
                code: "GRI 413",
                keywords:
                    "local communities, community engagement, community impact, social impact, resettlement, displacement, community complaints, stakeholder dialogue, social license, community development",
            },
            {
                topic: "Supplier Social Assessment",
                code: "GRI 414",
                keywords:
                    "supplier social, supplier audit, labor practices, supply chain labor, vendor assessment, contractor practices, supplier code, third-party labor, human rights supplier, supplier evaluation",
            },
            {
                topic: "Public Policy",
                code: "GRI 415",
                keywords:
                    "public policy, lobbying, political engagement, advocacy, policy influence, government relations, political contribution, legislation, regulation, public affairs",
            },
            {
                topic: "Customer Health & Safety",
                code: "GRI 416",
                keywords:
                    "customer safety, product safety, health risk, consumer protection, product quality, recalls, safety standards, harmful products, compliance, customer complaints",
            },
            {
                topic: "Marketing & Labeling",
                code: "GRI 417",
                keywords:
                    "marketing, labeling, product information, advertising, misleading claims, sustainability claims, consumer information, product disclosure, packaging labels, compliance",
            },
            {
                topic: "Customer Privacy",
                code: "GRI 418",
                keywords:
                    "customer privacy, data privacy, personal data, data protection, confidentiality, GDPR, data breach, information security, cyber security, privacy policy",
            },
        ],
    },
];

const GRIStandards = ({ onNext }) => {
    const [loading, setLoading] = useState(false);
    const [griTopics, setGriTopics] = useState(DEFAULT_GRI_TOPICS);
    const [selectedTopics, setSelectedTopics] = useState({});
    const dispatch = useDispatch();

    // Validation schema
    const validationSchema = yup.object({
        selectedTopics: yup.object().test(
            "at-least-one-selected",
            "Please select at least one GRI topic",
            function (value) {
                return Object.values(value || {}).some((v) => v === true);
            }
        ),
    });

    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
        setValue,
    } = useForm({
        resolver: yupResolver(validationSchema),
        mode: "onChange",
        defaultValues: {
            selectedTopics: {},
        },
    });

    // Handle toggle
    const handleToggle = (key, value) => {
        const newSelected = {
            ...selectedTopics,
            [key]: value,
        };
        setSelectedTopics(newSelected);
        setValue("selectedTopics", newSelected);
    };

    // Handle final submission
    const handleFinalSubmit = async (values) => {
        onNext(values.selectedTopics);
    };

    if (loading && Object.keys(selectedTopics).length === 0) {
        return (
            <div className="bg-white min-h-[400px] rounded flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#4639AA]"></div>
                    <p className="text-slate-600 mt-4">Loading GRI Topics...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative">
            <form onSubmit={handleSubmit(handleFinalSubmit)} className="bg-white rounded">
                <div className=" mx-auto">
                    {/* HEADER */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-slate-800 flex items-center gap-3">
                            <span className="bg-gradient-to-br from-[#4639AA] to-[#1893A1] text-white w-8 h-8 flex items-center justify-center rounded-full text-sm">
                                1
                            </span>
                            Identified Topics Review
                        </h2>
                        <p className="text-sm text-slate-500 mt-2 max-w-3xl">
                            Review and confirm ESG topics identified based on disclosures, policies, and
                            operational context before proceeding to impact assessment.
                        </p>

                    </div>

                    {/* SECTIONS */}
                    {griTopics.map((group, gIndex) => (
                        <div
                            key={gIndex}
                            className="mb-10 bg-white rounded-xl shadow-sm border"
                        >
                            {/* SECTION HEADER */}
                            <div className="px-6 py-4 border-b">
                                <h3 className="text-lg font-bold text-slate-700">
                                    {group.section}
                                </h3>
                            </div>

                            {/* TABLE */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-slate-100 text-slate-600 z-10">
                                        <tr>
                                            <th className="text-left px-6 py-3">Topic</th>
                                            <th className="text-left px-6 py-3">GRI Code</th>
                                            <th className="text-left px-6 py-3">Status</th>
                                            <th className="text-center px-6 py-3">Include</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {group.items.map((item, i) => {
                                            const key = `${item.code}-${i}`;
                                            const value = selectedTopics[key] ?? false;

                                            return (
                                                <tr key={key} className="border-t transition hover:bg-slate-50">
                                                    {/* TOPIC */}
                                                    <td className="px-6 py-3 font-medium text-slate-800">
                                                        {item.topic}
                                                    </td>

                                                    {/* CODE */}
                                                    <td className="px-6 py-3">
                                                        <span className="inline-flex items-center text-sm px-3 py-1 rounded-full text-nowrap font-semibold bg-indigo-50/50 text-[#4639AA]">
                                                            {item.code}
                                                        </span>
                                                    </td>

                                                    {/* KEYWORDS (Hidden from UI, sent to backend only) */}
                                                    <td className="px-6 py-2">
                                                        <div className="text-xs text-slate-400">
                                                            Affilated With Model 2
                                                        </div>
                                                    </td>

                                                    {/* TOGGLE */}
                                                    <td className="px-6 py-3 text-center">
                                                        <div className="inline-flex border-2 border-slate-200 rounded-full p-1">
                                                            <button
                                                                type="button"
                                                                onClick={() => handleToggle(key, true)}
                                                                className={`py-1 rounded-full text-sm font-medium transition-all
                                    ${value
                                                                        ? "bg-gradient-to-br from-[#4639AA] to-[#1893A1] text-white shadow-sm px-4"
                                                                        : "text-slate-400 hover:text-slate-700 px-2"}
                                `}
                                                            >
                                                                Yes
                                                            </button>

                                                            <button
                                                                type="button"
                                                                onClick={() => handleToggle(key, false)}
                                                                className={`py-1 rounded-full text-sm font-medium transition-all
                                    ${!value
                                                                        ? "bg-gradient-to-br from-[#4639AA] to-[#1893A1] text-white shadow-sm px-4"
                                                                        : "text-slate-400 hover:text-slate-700 px-2"}
                                `}
                                                            >
                                                                No
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}

                    {/* VALIDATION ERROR MESSAGE */}
                    {errors.selectedTopics && (
                        <div className=" p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-700 text-sm font-medium">{errors.selectedTopics.message}</p>
                        </div>
                    )}


                    {/* FOOTER CTA */}
                    <div className="sticky bottom-0 left-0 bg-white"> 
                        <div className="flex justify-end items-center gap-4 relative mt-6 pt-3 pb-0 border-t  z-20">
                            {/* <button
                                type="button"
                                onClick={onNext}
                                className="text-slate-500 hover:text-slate-700 font-medium px-4 py-2 transition-colors"
                            >
                                Skip to Assessment →
                            </button> */}
                            <button
                                type="submit"
                                disabled={loading || isSubmitting}
                                className={`bg-gradient-to-r from-[#4639AA] to-[#1893A1] text-white text-lg px-8 py-3 rounded-md shadow-md transition
                    ${loading || isSubmitting
                                        ? "opacity-50 cursor-not-allowed"
                                        : ""}
                    `}
                            >
                                {loading || isSubmitting ? "Submitting..." : "Proceed to Impact Assessment →"}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default GRIStandards;
