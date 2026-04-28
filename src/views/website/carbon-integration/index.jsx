
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

const features = [
  {
    icon: "mdi:cube-outline",
    title: "Carbon Assets",
    desc: "Transform your verified carbon reductions into liquid digital assets.",
    detail: "Every ton of CO2 reduced is tokenized into a Carbon Asset, providing a tangible value to your sustainability efforts."
  },
  {
    icon: "mdi:storefront",
    title: "Impact Marketplace",
    desc: "A transparent ecosystem for trading verified climate actions.",
    detail: "Connect with buyers looking for high-quality, verified carbon offsets generated through CarbonFora's rigorous MRV process."
  },
  {
    icon: "mdi:shield-check-outline",
    title: "Impact Verification",
    desc: "AI-enabled digital Monitoring, Reporting, and Verification (dMRV).",
    detail: "Eliminate manual errors and fraud. Our AI models verify climate data in real-time, ensuring every asset is backed by scientific proof."
  },
  {
    icon: "mdi:link-variant",
    title: "Blockchain Tracking",
    desc: "Immutable traceability for every carbon transaction.",
    detail: "Using blockchain ensures that carbon assets cannot be double-counted and provides a clear provenance for corporate disclosures."
  },
];

const CarbonIntegration = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FF] pt-32 pb-20 font-sans text-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Background glow for the whole page */}
        <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] bg-[#1893A1]/10 rounded-full blur-[120px] -z-10"></div>
        <div className="absolute bottom-40 left-[-10%] w-[500px] h-[500px] bg-[#4639AA]/10 rounded-full blur-[120px] -z-10"></div>

        <motion.div 
          initial="initial"
          animate="animate"
          variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
          className="text-center mb-20"
        >
          <motion.div 
            variants={fadeIn}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full  border border-[#1C8BA2]  text-[#1C8BA2] text-sm font-semibold mb-6"
          >
            <Icon icon="mdi:bank-outline" className="text-xl" />
            The Future of Climate Finance
          </motion.div>
          <motion.h1 
            variants={fadeIn}
            className="text-3xl md:text-5xl font-bold text-[#1a1542] mb-8 tracking-tight"
          >
            Beyond <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1C8BA2] to-[#633DB7]">ESG Reporting</span>
          </motion.h1>
          <motion.p 
            variants={fadeIn}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            CarbonFora Launchpad connects your sustainability data with the global carbon economy, turning compliance into a competitive advantage.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {features.map((feature, i) => (
  <div
    key={i}
    className="group flex gap-6 p-6 rounded-lg bg-white border border-gray-200 hover:border-[#1893A1]/30 shadow  transition-all duration-300 hover:-translate-y-1"
  >
    
    {/* Icon */}
    <div className="w-14 h-14 shrink-0 rounded-lg bg-[#1893A1]/10 flex items-center justify-center text-[#1893A1] group-hover:bg-[#1893A1] group-hover:text-white transition-colors duration-300">
      <Icon icon={feature.icon} className="text-3xl" />
    </div>

    {/* Content */}
    <div className="flex flex-col">
      <h3 className="text-xl font-bold text-gray-800 mb-2">
        {feature.title}
      </h3>

      <p className="text-gray-500 leading-relaxed text-sm">
        {feature.desc}
      </p>

      {/* Hidden Detail (expands on hover) */}
      <div className="overflow-hidden max-h-0 group-hover:max-h-24 transition-all duration-500">
        <p className="text-[12px] text-gray-400 mt-3">
          {feature.detail}
        </p>
      </div>

    </div>
  </div>
))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="p-8 rounded-xl bg-gradient-to-br from-[#4639AA] to-[#1893A1] shadow-xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
              {/* Animated rings */}
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-white/5 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              
              <div className="relative z-10 text-white text-center">
                <div className="w-24 h-24 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center mx-auto mb-8">
                  <Icon icon="mdi:bitcoin" className="text-5xl" />
                </div>
                <h3 className="text-3xl font-semibold mb-4 text-white">Blockchain-Verified Assets</h3>
                <p className="text-white/80 leading-relaxed mb-8">
                  Every gram of carbon reduced is tracked on an immutable ledger, providing unparalleled transparency for stakeholders and investors.
                </p>
                <div className="flex justify-center gap-4">
                  <div className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold uppercase tracking-widest border border-white/10">TRACED</div>
                  <div className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold uppercase tracking-widest border border-white/10">VERIFIED</div>
                </div>
              </div>
            </div>
            
            {/* Outer floating icon */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-6 right-6  flex items-center justify-center "
            >
              <Icon icon="mdi:shield-check" className="text-white text-4xl" />
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white p-12 rounded-xl shadow border border-gray-100 text-center"
        >
          <h2 className="text-3xl font-bold text-[#1a1542] mb-6">Create a Bridge to Real Climate Action</h2>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto mb-10 leading-relaxed">
            These carbon assets support corporate ESG disclosures, climate commitments, and voluntary carbon initiatives, creating a direct link between compliance and action.
          </p>
          <button className="px-12 py-4 bg-gradient-to-br from-[#4639AA] to-[#1893A1] text-lg text-white font-semibold rounded-lg shadow  transition active:scale-95 flex items-center gap-3 mx-auto">
            Explore the Marketplace
            <Icon icon="mdi:arrow-right" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default CarbonIntegration;
