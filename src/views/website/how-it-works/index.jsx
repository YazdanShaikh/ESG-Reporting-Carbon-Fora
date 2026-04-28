
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import Post1 from "../../../assets/images/post/post1.png";
import Post2 from "../../../assets/images/post/post2.png";
import Post3 from "../../../assets/images/post/post3.png";
import Post4 from "../../../assets/images/post/post4.png";

const steps = [
  {
    icon: Post1,
    title: "AI Data Collection",
    desc: "Seamlessly connect your operational data. Our AI engine automatically scans and extracts relevant ESG metrics from your existing systems, spreadsheets, and public records.",
    detail: "Using advanced NLP and machine learning, we identify patterns and anomalies in your sustainability data, ensuring high accuracy and reducing manual entry by up to 90%."
  },
  {
    icon: Post2,
    title: "Impact Measurement",
    desc: "Quantify your environmental and social footprint with precision. We translate raw data into actionable impact metrics.",
    detail: "Our platform calculates carbon footprints, energy efficiency, waste reduction, and social impact indicators based on globally recognized scientific methodologies."
  },
  {
    icon: Post3,
    title: "Reporting Frameworks",
    desc: "Stay compliant with ease. Our system maps your data to international standards like CSRD, GRI, TCFD, and IFRS.",
    detail: "Generate audit-ready reports with a single click. Our dynamic mapping engine ensures you're always aligned with the latest regulatory updates in your region."
  },
  {
    icon: Post4,
    title: "Carbon Integration",
    desc: "Close the loop by connecting your ESG reports to real carbon assets and climate participation pathways.",
    detail: "Verified reductions are tracked on the blockchain, allowing you to convert your sustainability wins into measurable carbon assets that can be used for climate commitments or voluntary markets."
  },
];

const HowItWorks = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FF] pt-36 pb-20 font-sans text-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial="initial"
          animate="animate"
          variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
          className="text-center mb-20"
        >
          <motion.h1 
            variants={fadeIn}
            className="text-3xl md:text-5xl font-bold text-[#1a1542] mb-6"
          >
            How <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4639AA] to-[#1893A1]">It Works</span>
          </motion.h1>
          <motion.p 
            variants={fadeIn}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            A streamlined, AI-driven process designed to move your company from data chaos to sustainability leadership.
          </motion.p>
        </motion.div>

        <div className="space-y-20">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col md:flex-row items-center gap-12 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="flex-1">
                
                <h2 className="text-3xl font-semibold text-[#1a1542] mb-4">{step.title}</h2>
                <p className="text-lg text-[#4639AA] font-semibold mb-4 leading-relaxed">
                  {step.desc}
                </p>
                <p className="text-gray-500 leading-relaxed italic">
                  {step.detail}
                </p>
              </div>
              <div className="flex-1 relative">
                <div className="w-full h-96   relative group ">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img src={step.icon} alt={step.title} className="object-contain rounded-lg h-full group-hover:scale-105 transition-transform duration-500 shadow" />
                  </div>
                 
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-32 p-12 rounded-xl bg-gradient-to-r from-[#1C8BA2] to-[#633DB7] text-white text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <h2 className="text-4xl font-bold mb-4 relative z-10 text-white">Ready to start your ESG journey?</h2>
          <p className="text-xl mb-10 text-white/80 relative z-10">Experience the future of sustainability reporting today.</p>
          <div className="flex flex-wrap gap-4 justify-center relative z-10">
            <button className="px-10 py-3 text-lg bg-white text-[#633DB7] font-semibold rounded-lg shadow  transition active:scale-95">
              Start Free Assessment
            </button>
            <button className="px-10 py-3 text-lg bg-white/10 border-2 border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition active:scale-95">
              Request a Demo
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HowItWorks;
