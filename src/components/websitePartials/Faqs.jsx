import { useState } from "react";
import { Icon } from "@iconify/react";
import Shap from '../../assets/images/shap/c.png';


export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      q: "How does CarbonFora verify my actions?",
      a: "We use a combination of AI and contextual data to verify every action you log ensuring that each carbon credit represents a real and measurable impact.",
    },
    {
      q: "What exactly are carbon credits?",
      a: "A carbon credit is essentially a unit of impact. One credit represents the verified reduction of 1 kilogram of CO₂e (carbon dioxide equivalent) from the atmosphere.",
    },
    {
      q: "What happens after I earn carbon credits?",
      a: "Once your credits are issued, they're stored in your personal CarbonFora wallet a secure, blockchain-backed ledger that you can access anytime.",
    },
    {
      q: "How does blockchain make my impact traceable?",
      a: "Blockchain is a digital ledger that records every transaction in a way that can't be changed or tampered with. Once your credits are issued, they're added to a public, time-stamped chain that proves when, how, and why they were created.",
    },
    {
      q: "Is my data safe with CarbonFora?",
      a: "Absolutely. Data security and privacy are built into CarbonFora from the ground up. We collect only the information necessary to verify actions like photos, timestamps, or location data and we anonymize or encrypt it before storing.",
    },
    {
      q: "How accurate is the AI verification system?",
      a: "Our AI verification system uses multiple data points and contextual analysis to achieve over 95% accuracy in validating sustainable actions.",
    },
    {
      q: "Can I use CarbonFora without sharing my location?",
      a: "Yes, while location data helps with verification accuracy, you can use CarbonFora with limited location sharing. However, some action types may require alternative verification methods.",
    },
    {
      q: "What types of actions can I log on CarbonFora?",
      a: "CarbonFora supports a wide range of sustainable actions across transportation, consumption, energy use, and waste reduction categories.",
    },
  ];

  return (
    <section className="bg-[#1893A1] py-16 relative">
      <div className="container mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-start">
        {/* Left Side - Heading */}
        <div>
          <button className="px-4 py-1 border text-white text-sm rounded-full mb-4">
            Frequently Asked Questions
          </button>

          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4 leading-snug">
            Got Questions? <br /> We’ve Got Answers
          </h2>

          <p className="text-cyan-100 text-lg leading-relaxed max-w-md">
            Find clear, simple answers to everything you need to know about
            CarbonFora.
          </p>
        </div>

        {/* Right Side - FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-cyan-700/10 border  rounded-lg"
            >
              <button
                className="w-full flex justify-between items-center p-4 text-left text-white font-medium"
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.q}</span>
                <Icon
                  icon={
                    openIndex === index
                      ? "mdi:chevron-up"
                      : "mdi:chevron-down"
                  }
                  className="w-6 h-6 text-cyan-200"
                />
              </button>

              {/* Answer with smooth transition */}
              <div
                className={`overflow-hidden transition-all duration-500 ${
                  openIndex === index ? "max-h-40 p-4 pt-0" : "max-h-0"
                }`}
              >
                <p className="text-cyan-100 text-sm">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-10 -left-40"><img src={Shap} alt="shap" className='w-[30rem] opacity-5' /> </div>
    </section>
  );
}
