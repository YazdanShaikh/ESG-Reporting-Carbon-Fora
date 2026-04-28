import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const tags = [
  {
    id: "/",
    label: "Climate-Positive Lifestyle",
    icon: "mdi:earth",
    desc: "Turn your daily choices into measurable climate action.",
  },
  {
    id: "/",
    label: "Gen Z & Millennials",
    icon: "mdi:account-group-outline",
    desc: "Empowering the next generation of conscious consumers.",
  },
  {
    id: "/",
    label: "AI & Blockchain Verification",
    icon: "mdi:cpu-64-bit",
    desc: "Advanced tech ensures every action and credit is verified.",
  },
  
];

const KeyTagsSection = ({ onTagClick }) => {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="relative py-20 px-6 md:px-12 bg-gradient-to-r from-[#4639AA] to-[#1893A1] text-white overflow-hidden">
      {/* subtle decorative background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/white-wall.png')] opacity-10"></div>

      <div className="relative max-w-6xl mx-auto text-center">
        {/* <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl md:text-5xl font-bold mb-4 text-white"
        >
          Suggested Key Tags
        </motion.h2> */}

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-white/90 max-w-2xl mx-auto mb-10 text-xl"
        >
          Explore CarbonFora’s universe click or hover on each tag to discover
          how it connects to your climate-positive journey.
        </motion.p>

        {/* Tag Grid */}
        <div className="flex flex-wrap justify-center gap-4">
          {tags.map((tag, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="relative"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
            <Link to={tag.id} onClick={() => onTagClick(tag)}>
              <span className="flex items-center gap-2 bg-white text-[#4639AA] px-5 py-2 rounded-full text-sm font-semibold shadow-md hover:bg-[#F6F4EB] hover:text-[#1893A1] cursor-pointer transition-all">
                <Icon icon={tag.icon} className="w-5 h-5" />
                {tag.label}
              </span></Link>

              {/* Tooltip */}
              <div
                className={`absolute z-10 left-1/2 -translate-x-1/2 -top-16 w-60 bg-white text-[#4639AA] text-sm rounded-lg shadow-lg border border-[#4639AA]/10 p-3 transition-all duration-200 ${
                  hovered === i
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible translate-y-2"
                }`}
              >
                {tag.desc}
                <span className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-b border-r border-[#4639AA]/10"></span>
              </div>
            </motion.div>
          ))}
        </div>

        
      </div>
    </section>
  );
};

export default KeyTagsSection;
