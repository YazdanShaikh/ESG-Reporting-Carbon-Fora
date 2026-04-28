import React, { useState } from "react";
import Val from "../../../assets/images/all-img/val.png";
import Logo from "../../../assets/images/logo/logo-car.png";
import Shap2 from "../../../assets/images/shap/ctag.png";
import Shap1 from "../../../assets/images/shap/Ellipse 2.png";
import Shap3 from "../../../assets/images/shap/Ellipse 3.png";
import { Icon } from "@iconify/react";

const steps = [
    "Company Profile",
    "Environmental",
    "Social",
    "Governance",
    "Scoring & Review",
];

const Boarding = () => {
    const [step, setStep] = useState(0);
    const [started, setStarted] = useState(false);

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
                                        <div
                                            className={`relative z-10 flex items-center justify-center w-7 h-7 md:w-10 md:h-10 rounded-full text-sm font-bold
                          ${isCompleted
                                                    ? "bg-transparent border-2  text-white"
                                                    : isActive
                                                        ? "border border-gray-300 text-[#4639AA] bg-white"
                                                        : "bg-white/70 text-gray-500"
                                                }`}
                                        >
                                            {i + 1}
                                        </div>

                                        {/* Connector (ONLY if not last step) */}
                                        {i !== steps.length - 1 && (
                                            <div className=" w-8 sm:w-12 md:w-20 lg:w-24 h-[2px] md:h-[3px] mx-1 sm:mx-2 rounded-full ">
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
                        <div className="bg-white/10 backdrop-blur-xl max-w-2xl mx-auto rounded-3xl shadow-2xl p-4 md:p-8 lg:p-12 border border-white/20">

                            {/* STEP 1 — COMPANY PROFILE */}
                            {step === 0 && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold text-white mb-4">Company Profile</h2>

                                    <Input label="Company Legal Name" placeholder="Full legal name" />

                                    <RadioGroup
                                        label="Where does your company operate?"
                                        options={["Pakistan", "UAE", "Both"]}
                                    />

                                    <Select
                                        label="Business Sector"
                                        options={["Textiles", "Manufacturing", "Energy", "Services", "Agriculture"]}
                                    />

                                    <RadioGroup
                                        label="Organization Type"
                                        options={["Private", "Public", "Listed", "SME"]}
                                    />

                                    <RadioGroup
                                        label="Number of Employees"
                                        options={["1–50", "51–250", "251–1000", "1000+"]}
                                    />

                                    <Input label="Company Website (optional)" placeholder="https://example.com" />
                                    <Upload label="Upload Company Profile (optional)" />
                                </div>
                            )}

                            {/* STEP 2 — ENVIRONMENTAL */}
                            {step === 1 && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold text-white mb-4">Environmental (GRI 302–306)</h2>

                                    <RadioGroup label="Do you use electricity?" options={["Yes", "No"]} />
                                    <Upload label="Upload Electricity Bills (optional)" />

                                    <CheckboxGroup
                                        label="Fuel Types Used"
                                        options={["Diesel", "Petrol", "Natural Gas", "LPG", "None"]}
                                    />

                                    <Input label="Annual Fuel Usage (Liters / kWh)" />
                                    <RadioGroup label="Use Renewable Energy?" options={["Yes", "No", "Not Sure"]} />

                                    <RadioGroup
                                        label="Track emissions frequency"
                                        options={["Annually", "Quarterly"]}
                                    />
                                </div>
                            )}

                            {/* STEP 3 — SOCIAL */}
                            {step === 2 && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold text-white mb-4">Social (GRI 401–406)</h2>

                                    <Upload label="Upload Workforce Gender Summary" />
                                    <RadioGroup label="Track Employee Turnover?" options={["Yes", "No"]} />
                                    <RadioGroup label="Any Safety Incidents?" options={["Yes", "No"]} />
                                    <RadioGroup label="Training Programs Provided?" options={["Yes", "No"]} />
                                </div>
                            )}

                            {/* STEP 4 — GOVERNANCE */}
                            {step === 3 && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold text-white mb-4">Governance (GRI 102, 205)</h2>

                                    <RadioGroup label="Board of Directors?" options={["Yes", "No"]} />
                                    <Input label="Women on Board (Number)" type="number" />

                                    <RadioGroup label="Ethics Policy?" options={["Yes", "No"]} />
                                    <RadioGroup label="Supplier Code of Conduct?" options={["Yes", "No"]} />

                                    <Upload label="Upload Governance Documents (optional)" />
                                </div>
                            )}

                            {/* STEP 5 — SCORING */}
                            {step === 4 && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold text-white mb-4">Scoring & Submission</h2>

                                    <RadioGroup label="Set ESG Targets?" options={["Yes", "No"]} />
                                    <RadioGroup label="Track ESG Over Time?" options={["Yes", "Snapshot Only"]} />
                                    <RadioGroup label="Receive ESG Score?" options={["Yes", "No"]} />

                                    <Upload label="Additional Supporting Documents (optional)" />

                                    <label className="flex items-center gap-2 text-white/90">
                                        <input type="checkbox" className="accent-[#4639AA]" />
                                        I confirm the information is accurate.
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
                                    onClick={() => setStep(step + 1)}
                                    disabled={step === steps.length - 1}
                                    className="px-8 py-2 rounded-full bg-white text-[#4639AA] font-semibold hover:scale-105 transition"
                                >
                                    {step === steps.length - 1 ? "Generate ESG Report" : "Next Step →"}
                                </button>
                            </div>
                        </div>

                        {/* VAL Assistant */}
                        <div className="mt-10 flex items-center gap-4 justify-center">
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
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#4639AA]"
        />
    </div>
);

const Select = ({ label, options }) => (
    <div>
        <label className="block text-sm font-medium mb-1 text-white">{label}</label>
        <select className="w-full border rounded-lg px-4 py-2">
            {options.map((o) => (
                <option key={o}>{o}</option>
            ))}
        </select>
    </div>
);

const RadioGroup = ({ label, options }) => {
    const [value, setValue] = useState(null);

    return (
        <div>
            <p className="block text-sm font-medium mb-1 text-white">{label}</p>
            <div className="flex gap-4 flex-wrap">
                {options.map((o) => {
                    const active = value === o;
                    return (
                        <button
                            key={o}
                            type="button"
                            onClick={() => setValue(o)}
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

const CheckboxGroup = ({ label, options }) => {
    const [selected, setSelected] = useState([]);

    const toggle = (value) => {
        setSelected((prev) =>
            prev.includes(value)
                ? prev.filter((v) => v !== value)
                : [...prev, value]
        );
    };

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
                            onClick={() => toggle(o)}
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

const Upload = ({ label }) => (
    <div className="w-full">
        <label className="block text-sm font-medium mb-2 text-white">{label}</label>
        <label className="flex flex-col items-center justify-center w-full h-32 border border-dashed border-gray-300/30 rounded-lg cursor-pointer bg-gray-800/20  hover:bg-gray-800/30 transition-colors">
            <Icon icon="mdi:cloud-upload" className="text-gray-300 text-4xl mb-2" />
            <span className="text-gray-300 text-sm">
                Click to upload or drag and drop
            </span>
            <input type="file" className="hidden" />
        </label>
    </div>
);

export default Boarding;
