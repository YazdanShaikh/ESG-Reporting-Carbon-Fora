import { useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { axiosInstance } from "../../../configs/axios.config";

const BookDemo = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    companySize: "Select...",
    industry: "Select your industry...",
    country: "Select your country...",
    esgChallenge: "Select...",
    additionalInfo: "",
    referral: "Select...",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting payload to backend:", formData);
    try {
      const response = await axiosInstance.post("/leads/book-demo", formData);
      console.log("Backend response received:", response.data);
      if (response.data.success) {
        toast.success("Registration successful! Our team will contact you soon.");
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          companyName: "",
          companySize: "Select...",
          industry: "Select your industry...",
          country: "Select your country...",
          esgChallenge: "Select...",
          additionalInfo: "",
          referral: "Select...",
        });
      }
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const inputClass = "w-full px-6 py-2 rounded-md bg-gray-50 border border-gray-200 outline-none focus:border-[#4639AA]/30 focus:bg-white transition-all text-gray-900 placeholder:text-gray-400";

  return (
    <div className="min-h-screen bg-[#F8F9FF] pt-32 pb-20 font-sans text-gray-900">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 ">
        <motion.div
          initial="initial"
          animate="animate"
          variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.div
            variants={fadeIn}
            className="inline-flex items-center gap-2 px-6 py-1.5 rounded-full border border-[#4639AA] text-[#4639AA]/90 text-sm font-bold mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#1893A1] animate-ping"></span>
            ESG Launchpad — Coming Soon
          </motion.div>

          <motion.h1
            variants={fadeIn}
            className="text-3xl md:text-5xl font-bold text-[#1a1542] mb-8 leading-[1.1]"
          >
            Get early access to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4639AA] to-[#1893A1]">CarbonFora’s ESG </span> Launchpad
          </motion.h1>

          <motion.p
            variants={fadeIn}
            className="text-lg text-gray-600 mb-10 leading-relaxed max-w-xl"
          >
            Generate audit-ready ESG reports aligned to IFRS S1/S2 in under 10 minutes.<br />
            Join the waitlist and be first in when we launch.
          </motion.p>

          <motion.div variants={fadeIn} className="space-y-6">
            {[
              { icon: "ic:round-check", text: "Free ESG assessment for your business before public launch" },
              { icon: "ic:round-check", text: "Priority onboarding and 3 months free on the Starter plan" },
              { icon: "ic:round-check", text: "Shape the product direct input to our feature roadmap" },
              { icon: "ic:round-check", text: "IFRS S1/S2 aligned, UAE Federal Decree 11/2024 compliant reports" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="text-[#4639AA]">
                  <Icon icon={item.icon} className="text-xl" />
                </div>
                <span className="font-medium text-gray-700">{item.text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white p-8 rounded-2xl shadow border border-gray-200 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-500/5 to-transparent rounded-tr-2xl"></div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">First name</label>
                <input name="firstName" value={formData.firstName} onChange={handleChange} type="text" placeholder="Sara" className={inputClass} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Last name</label>
                <input name="lastName" value={formData.lastName} onChange={handleChange} type="text" placeholder="Al Mansouri" className={inputClass} required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Work email</label>
              <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="sara@company.com" className={inputClass} required />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Company name</label>
                <input name="companyName" value={formData.companyName} onChange={handleChange} type="text" placeholder="Acme Trading LLC" className={inputClass} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Company size</label>
                <select name="companySize" value={formData.companySize} onChange={handleChange} className={inputClass}>
                  <option>Select...</option>
                  <option>1-10</option>
                  <option>11-50</option>
                  <option>51-200</option>
                  <option>201-1000</option>
                  <option>1000+</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Industry</label>
              <select name="industry" value={formData.industry} onChange={handleChange} className={inputClass}>
                <option>Select your industry...</option>
                <option>Real Estate & Construction</option>
                <option>Manufacturing</option>
                <option>Financial Services</option>
                <option>Retail & E-Commerce</option>
                <option>Hospitality & Tourism</option>
                <option>Logistics & Supply Chain</option>
                <option>Technology</option>
                <option>Healthcare</option>
                <option>Education</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Country</label>
              <select name="country" value={formData.country} onChange={handleChange} className={inputClass}>
                <option>Select your country...</option>
                <option>United Arab Emirates</option>
                <option>Saudi Arabia</option>
                <option>Qatar</option>
                <option>Kuwait</option>
                <option>Bahrain</option>
                <option>Oman</option>
                <option>Pakistan</option>
                <option>India</option>
                <option>USA</option>
                <option>UK</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                What is your biggest ESG challenge right now?
              </label>
              <select name="esgChallenge" value={formData.esgChallenge} onChange={handleChange} className={inputClass}>
                <option>Select...</option>
                <option>I don't know where to start</option>
                <option>Reporting is too complex and time-consuming</option>
                <option>My bank / investor is asking for ESG documentation</option>
                <option>I need to comply with a new regulation</option>
                <option>I want to win government or enterprise contracts</option>
                <option>I need to measure and reduce our carbon footprint</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Anything else you'd like us to know? <span className="text-gray-400">(optional)</span>
              </label>
              <textarea
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                placeholder="e.g. We have a reporting deadline in Q3, or we operate across 3 countries..."
                className={`${inputClass} min-h-[120px] resize-none`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                How did you hear about CarbonFora?
              </label>
              <select name="referral" value={formData.referral} onChange={handleChange} className={inputClass}>
                <option>Select...</option>
                <option>Google</option>
                <option>LinkedIn</option>
                <option>Referral</option>
                <option>Event</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#4639AA] to-[#1893A1] text-white text-lg font-semibold rounded-lg shadow hover:shadow-lg transition active:scale-[0.98]"
            >
              Get Early Access →
            </button>

            <p className="text-center text-xs text-gray-400 mt-4 leading-relaxed">
              By submitting this form, you agree to our{" "}
              <a href="#" className="underline">Privacy Policy</a> and{" "}
              <a href="#" className="underline">Terms of Service</a>.
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default BookDemo;
