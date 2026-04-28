
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

const resources = [
  {
    type: "Whitepaper",
    title: "Future of Carbon Markets",
    desc: "A deep dive into how blockchain and AI are revolutionizing the voluntary carbon market.",
    
  },
  {
    type: "Guide",
    title: "ESG for SMEs",
    desc: "A comprehensive handbook for small and medium enterprises to start their sustainability journey.",
    
  },
  {
    type: "Report",
    title: "2030 Climate Outlook",
    desc: "An analysis of global ESG trends and the role of digital MRV in corporate reporting.",
    
  },
  {
    type: "Case Study",
    title: "Success Stories",
    desc: "How growing brands used CarbonFora to achieve transparency and investor trust.",
   
  },
];

const categories = ["All Resources", "Whitepapers", "Guides", "Case Studies", "Webinars"];

const Resources = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FF] pt-32 pb-20 font-sans text-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="lg:flex justify-between items-center">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
            className=" mb-16"
          >
            <motion.h1 
              variants={fadeIn}
              className="text-3xl md:text-5xl font-bold text-[#1a1542] mb-4"
            >
              Resources & <span className="text-[#1893A1]">Insights</span>
            </motion.h1>
            <motion.p 
              variants={fadeIn}
              className="text-lg text-gray-600 max-w-xl "
            >
              Stay ahead with the latest in ESG reporting, carbon markets, and sustainability technology.
            </motion.p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap md:flex-nowrap gap-3 justify-center mb-16"
          >
            {categories.map((cat, i) => (
              <button key={i} className={`px-6 py-2 rounded-full text-nowrap text-sm font-bold border transition ${
                i === 0 ? 'bg-gradient-to-r from-[#4639AA] to-[#1893A1] text-white' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
              }`}>
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {resources.map((res, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="group bg-white p-8 rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-all"
            >
             
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#1893A1] mb-2">
                {res.type}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-[#4639AA] transition-colors line-clamp-2">
                {res.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3">
                {res.desc}
              </p>
              <button className="flex items-center gap-2 text-sm  text-[#4639AA] hover:gap-3 transition-all">
                Download Now
                <Icon icon="mdi:arrow-right" />
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 p-12 rounded-xl bg-gradient-to-br from-[#4639AA] to-[#1893A1] text-white overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4 text-white">Subscribe to our newsletter</h2>
              <p className="text-white/80">Get monthly updates on climate policy, market shifts, and technology updates.</p>
            </div>
            <div className="flex-1 w-full max-w-md bg-white/10 backdrop-blur-md p-2 rounded-lg border border-white/20 flex items-center">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-transparent border-none text-white placeholder-white/50 flex-grow px-4 outline-none"
              />
              <button className="px-8 py-2.5 bg-white text-[#4639AA] font-bold rounded-lg  transition active:scale-95">
                Join
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Resources;
