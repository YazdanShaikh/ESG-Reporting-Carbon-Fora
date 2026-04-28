
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Starter",
    price: "$49",
    period: "/month",
    desc: "Ideal for startups and small teams beginning their ESG journey.",
    features: [
      "ESG readiness assessment",
      "Basic ESG dashboard",
      "Framework alignment guidance",
      "Impact data tracking",
      "Email support",
      "1 User license"
    ],
    cta: "Start Free Assessment",
    color: "bg-blue-50 text-blue-600",
    border: "border-blue-100"
  },
  {
    name: "Growth",
    price: "$199",
    period: "/month",
    desc: "Advanced tools for SMEs to scale their impact and transparency.",
    features: [
      "Everything in Starter",
      "Advanced ESG reporting",
      "Automated framework mapping",
      "Carbon footprint tracking",
      "Impact analytics",
      "Priority support",
      "5 User licenses"
    ],
    cta: "Start Free Assessment",
    popular: true,
    color: "bg-[#4639AA]/5 text-[#4639AA]",
    border: "border-[#4639AA]/20"
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "Full-scale ESG platform for large organizations and brands.",
    features: [
      "Everything in Growth",
      "Full Carbon integration",
      "API & System integrations",
      "Custom reporting & branding",
      "Dedicated account manager",
      "Unlimited users",
      "Blockchain-verified proof"
    ],
    cta: "Request Enterprise Demo",
    color: "bg-purple-50 text-purple-600",
    border: "border-purple-100"
  },
];

const Pricing = () => {
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
          className="text-center md:text-start mb-20"
        >
          <motion.div 
            variants={fadeIn}
            className="inline-flex items-center gap-2 px-6 py-1 rounded-full border border-gray-500  font-semibold text-gray-600 mb-6"
          >
            Flexible Plans
          </motion.div>
          <motion.h1 
            variants={fadeIn}
            className="text-3xl md:text-5xl font-bold text-[#1a1542] mb-6"
          >
            ESG Reporting That <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4639AA] to-[#1893A1]">Scales With You</span>
          </motion.h1>
          <motion.p 
            variants={fadeIn}
            className="text-lg text-gray-600  "
          >
            Choose a plan that fits your current needs and scale as your sustainability impact grows.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative p-8 rounded-xl bg-white border ${plan.border} shadow hover:shadow-xl transition-all duration-300 flex flex-col ${plan.popular ? 'scale-105 z-10' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#4639AA] to-[#1893A1] text-white text-xs font-semibold px-4 py-1 rounded-full ">
                  MOST POPULAR
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-sm text-gray-500 min-h-[40px] leading-relaxed">{plan.desc}</p>
              </div>
              
              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-[#1a1542]">{plan.price}</span>
                  <span className="text-gray-400 font-medium">{plan.period}</span>
                </div>
              </div>

              <div className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <div className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center ${plan.color} shrink-0`}>
                      <Icon icon="mdi:check" className="text-sm" />
                    </div>
                    <span className="text-sm text-gray-600 leading-tight">{feature}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-4 rounded-lg font-semibold transition-all active:scale-95 shadow ${
                plan.popular 
                ? 'bg-gradient-to-br from-[#4639AA] to-[#1893A1] text-white hover:bg-[#3b328a] hover:shadow-[#4639AA]/20' 
                : 'bg-[#4639AA] border-2 border-gray-200 text-white hover:bg-[#4639AA]/90'
              }`}>
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className=" mx-auto p-12 rounded-xl bg-gradient-to-br from-[#4639AA] to-[#1893A1] border border-indigo-100  overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Need a custom solution?</h3>
            <p className="text-gray-100 leading-relaxed">
              We offer bespoke enterprise integrations, dedicated support, and custom ESG framework mapping for global brands.
            </p>
          </div>
          <button className="px-8 py-3 bg-white text-[#4639AA] font-bold rounded-lg border border-indigo-100 hover:bg-gray-50 transition shadow-sm whitespace-nowrap">
            Speak to an Expert
          </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Pricing;
