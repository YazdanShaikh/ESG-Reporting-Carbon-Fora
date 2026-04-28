import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Dummy images for illustration, replace with actual assets as needed
import DashboardImg from '../../assets/images/logo/log-2.png';
import ESGScoreImg from '../../assets/images/post/post1.png';
import CarbonImg from '../../assets/images/post/post2.png';


const COLORS = {
  primary: "#4639AA",
  secondary: "#1893A1",
  accent: "#633DB7",
  bgGradient: "from-[#F8F9FF] to-[#E9E6FA]",
  cardBg: "bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl",
};



const solutionFeatures = [
  {
    icon: "mdi:robot",
    title: "AI ESG Data Engine",
    desc: "Automatically collects and analyzes sustainability data across operations."
  },
  {
    icon: "mdi:map-search-outline",
    title: "Smart ESG Framework Mapping",
    desc: "Aligns reporting with global standards including GRI, IFRS S1 S2, TCFD and other frameworks."
  },
  {
    icon: "mdi:chart-bar",
    title: "Automated Impact Measurement",
    desc: "Tracks environmental and social impact indicators without manual spreadsheets."
  },
  {
    icon: "mdi:leaf",
    title: "Carbon Accounting Integration",
    desc: "Connects operational data to carbon reduction metrics."
  },
  {
    icon: "mdi:bitcoin",
    title: "Blockchain Verification Layer",
    desc: "Ensures transparency and traceability for carbon credit related transactions."
  },
  {
    icon: "mdi:view-dashboard",
    title: "Real Time ESG Dashboard",
    desc: "Executives get a clear sustainability view without complex reporting tools."
  },
];

const comparisonRows = [
  {
    label: "Focus on reporting only",
    traditional: true,
    launchpad: false
  },
  {
    label: "Built for large enterprises",
    traditional: true,
    launchpad: false
  },
  {
    label: "Consultant dependent",
    traditional: true,
    launchpad: false
  },
  {
    label: "Expensive annual subscriptions",
    traditional: true,
    launchpad: false
  },
  {
    label: "No carbon integration",
    traditional: true,
    launchpad: false
  },
  {
    label: "AI powered ESG automation",
    traditional: false,
    launchpad: true
  },
  {
    label: "Built for SMEs and growing businesses",
    traditional: false,
    launchpad: true
  },
  {
    label: "Carbon asset integration",
    traditional: false,
    launchpad: true
  },
  {
    label: "Blockchain verified reporting",
    traditional: false,
    launchpad: true
  },
  {
    label: "Connected to a global climate participation platform",
    traditional: false,
    launchpad: true
  },
];

const pricingTiers = [
  {
    name: "Starter",
    price: "$49",
    period: "/month",
    desc: "Ideal for startups",
    features: [
      "ESG readiness assessment",
      "Basic ESG dashboard",
      "Framework alignment guidance",
      "Impact data tracking"
    ],
    cta: "Join Waitlist"
  },
  {
    name: "Growth",
    price: "$199",
    period: "/month",
    desc: "Ideal for SMEs",
    features: [
      "Advanced ESG reporting",
      "Automated framework mapping",
      "Carbon footprint tracking",
      "Impact analytics"
    ],
    cta: "Join Waitlist"
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "Full ESG platform",
    features: [
      "Carbon integration",
      "API integrations",
      "Custom reporting",
      "Dedicated support"
    ],
    cta: "Request Enterprise Demo"
  },
];

function App() {


  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className={`min-h-screen bg-[#F8F9FF] font-sans text-gray-900 selection:bg-[#4639AA]/20`}>
    
      {/* HERO SECTION */}
      <section id="hero" className="relative pt-36 pb-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full -z-10">
          <div className="absolute top-20 left-[10%] w-72 h-72 bg-[#4639AA]/10 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-20 right-[10%] w-96 h-96 bg-[#1893A1]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "2s" }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="initial"
            animate="animate"
            variants={{
              animate: { transition: { staggerChildren: 0.1 } }
            }}
          >
            <motion.div
              variants={fadeIn}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#4639AA]/5 border border-[#4639AA]/10 text-[#4639AA] text-sm font-semibold mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4639AA] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4639AA]"></span>
              </span>
              AI-Powered ESG Reporting
            </motion.div>

            <motion.h1
              variants={fadeIn}
              className="text-3xl lg:text-5xl font-bold text-[#1a1542] leading-[1.1] mb-8"
            >
              ESG Reporting Should <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4639AA] to-[#1893A1]">Not Cost</span> a Fortune
            </motion.h1>

            <motion.p
              variants={fadeIn}
              className="text-lg text-gray-600 mb-10 max-w-xl leading-relaxed"
            >
              CarbonFora Launchpad uses AI to help companies measure, manage, and report their ESG impact while connecting verified climate actions to real carbon assets.
            </motion.p>

            <motion.div
              variants={fadeIn}
              className="flex flex-wrap gap-4 items-center mb-8"
            >
              {/* <Link to="/home">
                <button className="px-8 py-3 text-lg bg-gradient-to-r from-[#4639AA] to-[#1893A1] text-white font-semibold rounded-lg  shadow-indigo-500/20 transition-transform active:scale-95 group flex items-center gap-2">
                  Start Free ESG Assessment
                  <Icon icon="mdi:arrow-right" className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link> */}
              <Link to="/book-demo">
                <button className="px-8 py-3 text-lg bg-gradient-to-r from-[#4639AA] to-[#1893A1] text-white font-semibold rounded-lg  shadow-indigo-500/20 transition-transform active:scale-95 group flex items-center gap-2">
                  Join Waitlist
                  <Icon icon="mdi:arrow-right" className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link> 
              {/* <Link to="/book-demo">
                <button className="px-8 py-3 text-lg bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-lg  transition-colors active:scale-95 shadow-sm">
                  Book a Demo
                </button>
              </Link> */}
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="flex items-center gap-4 p-4 rounded-lg bg-white/50 border border-white/50 backdrop-blur-sm shadow-sm max-w-md"
            >
              <div className="w-10 h-10 rounded-full  flex items-center justify-center">
                <Icon icon="mdi:shield-check" className="text-[#4639AA] text-xl" />
              </div>
              <p className="text-[11px] text-gray-500 leading-tight">
                Built on CarbonFora's climate infrastructure combining <span className="text-gray-900 font-semibold">AI-based digital MRV</span> and <span className="text-gray-900 font-semibold">blockchain-verified</span> carbon accounting
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            {/* Dashboard Mockup Representation */}
            <div className="relative z-10 max-w-md mx-auto ">
              <img src={DashboardImg} alt="Dashboard Preview" className="rounded-xl w-full " />
            </div>

          
          </motion.div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="py-28 px-6 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Background Glow */}
            <div className="absolute -top-16 -left-16 w-40 h-40 bg-[#4639AA]/10 rounded-full blur-3xl"></div>

            {/* Heading */}
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 leading-tight mb-6">
              ESG Compliance Is <br />
              <span className="bg-gradient-to-r from-[#4639AA] to-[#1893A1] bg-clip-text text-transparent">
                Becoming Mandatory
              </span>
            </h2>

            {/* Description */}
            <div className="space-y-5 text-gray-600 text-lg leading-relaxed">
              <p>
                ESG reporting is quickly becoming a regulatory and investor requirement worldwide.
                Frameworks like <span className="font-semibold text-[#4639AA]">CSRD</span> and{" "}
                <span className="font-semibold text-[#4639AA]">IFRS S1 & S2</span> are already shaping the future.
              </p>

              <p>
                Yet most ESG tools are built for enterprises — leaving SMEs struggling with systems that are:
              </p>
            </div>

            {/* Problems Grid */}
            <div className="grid sm:grid-cols-2 gap-5 mt-10">
              {[
                { icon: "mdi:currency-usd-off", label: "Expensive" },
                { icon: "mdi:cog-off", label: "Complicated" },
                { icon: "mdi:account-group", label: "Consultant dependent" },
                { icon: "mdi:calendar-clock", label: "Hard to maintain" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="group flex items-center gap-4 p-3 rounded-lg bg-white border border-gray-100 shadow-sm  transition-all"
                >
                  <div className="w-11 h-11 rounded-lg bg-[#1893A1]/10 flex items-center justify-center text-[#1893A1] ">
                    <Icon icon={item.icon} className="text-xl" />
                  </div>
                  <span className="font-semibold text-gray-800">
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT CARD */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Outer Glow Card */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#4639AA]/20 to-[#1893A1]/20 blur-2xl opacity-30 rounded-3xl"></div>

            {/* Main Card */}
            <div className="relative bg-white rounded-xl p-10 shadow border border-gray-200">

              {/* Quote Icon */}
              <Icon
                icon="mdi:format-quote-open"
                className="text-6xl text-[#1893A1]/10 mb-6"
              />

              {/* Quote Text */}
              <p className="text-xl md:text-2xl text-gray-800 font-medium italic leading-relaxed mb-8">
                “This creates a massive gap between ESG expectations and ESG accessibility.”
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#4639AA] to-[#1893A1] flex items-center justify-center text-white font-bold">
                  CP
                </div>

                <div>
                  <p className="font-semibold text-gray-900">
                    CarbonFora Purpose
                  </p>
                  <p className="text-sm text-gray-500">
                    Bridging the ESG accessibility gap
                  </p>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* SOLUTION SECTION */}
      <section className="py-24 px-6 bg-[#F1F4FF]" id="solutions">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-4xl font-bold text-[#1a1542] mb-3">
              AI Powered <span className="text-[#1893A1]">ESG Infrastructure</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              CarbonFora Launchpad simplifies ESG reporting through automation, AI analysis and carbon tracking.
            </p>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutionFeatures.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-8 rounded-lg bg-white border border-transparent hover:border-[#4639AA]/10 transition-all shadow"
            >
              <div className="w-14 h-14 rounded-lg bg-[#4639AA]/5 flex items-center justify-center mb-6 group-hover:bg-[#4639AA] transition-colors duration-300">
                <Icon icon={f.icon} className="text-3xl text-[#4639AA] group-hover:text-white transition-colors animate-pulse group-hover:animate-none" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{f.title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="px-10 py-3 text-lg rounded-lg bg-gradient-to-r from-[#4639AA] to-[#1893A1] text-white font-semibold shadow-lg  transition-all flex items-center gap-3 mx-auto"
          >
            See the Platform
            <Icon icon="mdi:arrow-right" />
          </motion.button>
        </div>
      </section>

      {/* WHY CARBONFORA SECTION */}
      <section className="py-20 px-6 bg-white" id="why">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-[#4639AA] mb-3">Why CarbonFora Is Different</h2>
          <p className="text-lg text-gray-700 mb-10 max-w-3xl ">
            Most ESG tools only help companies write reports. CarbonFora goes further by building a complete climate participation infrastructure.
          </p>
          <div className="overflow-x-auto border rounded-lg">
            <table className="min-w-full border rounded-lg overflow-hidden">
              <thead className="bg-gradient-to-r from-[#4639AA]/10 to-[#1893A1]/10">
                <tr className=" text-[#4639AA]">
                  <th className="py-3 px-4 text-left">&nbsp;</th>
                  <th className="py-3 px-4">Traditional ESG Platforms</th>
                  <th className="py-3 px-4">CarbonFora Launchpad</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={i} className="border-t">
                    <td className="py-2 px-4 font-medium text-gray-700">{row.label}</td>
                    <td className="py-2 px-4 text-center">{row.traditional ? <span className="text-green-600">&#10003;</span> : ""}</td>
                    <td className="py-2 px-4 text-center">{row.launchpad ? <span className="text-green-600">&#10003;</span> : ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-20 px-6 bg-[#f6fafd]" id="how-it-works">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-[#4639AA] mb-10">Your ESG Journey in Four Steps</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow p-5 flex flex-col md:flex-row md:gap-4 items-start md:items-center">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-[#4639AA] to-[#1893A1] text-white mb-4 md:mb-0">
                <Icon icon="mdi:database-import" className="text-2xl" /></div>
              <div>
                <h3 className="font-semibold text-lg  mb-">Connect Your Data</h3>
                <p className="text-gray-600 text-sm ">Upload operational data or integrate systems.</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-5 flex flex-col md:flex-row md:gap-4 items-start md:items-center">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-[#4639AA] to-[#1893A1] text-white mb-4 md:mb-0">
                <Icon icon="mdi:robot" className="text-2xl" /></div>
              <div>
                <h3 className="font-semibold text-lg  mb-">AI Impact Analysis</h3>
                <p className="text-gray-600 text-sm ">The platform analyzes environmental, social and governance indicators.</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-5 flex flex-col md:flex-row md:gap-4 items-start md:items-center">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-[#4639AA] to-[#1893A1] text-white mb-4 md:mb-0">
                <Icon icon="mdi:view-dashboard" className="text-2xl" /></div>
              <div>
                <h3 className="font-semibold text-lg  mb-">ESG Dashboard and Reporting</h3>
                <p className="text-gray-600 text-sm ">Automated reporting aligned with global frameworks.</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-5 flex flex-col md:flex-row md:gap-4 items-start md:items-center">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-[#4639AA] to-[#1893A1] text-white mb-4 md:mb-0">
                <Icon icon="mdi:leaf" className="text-2xl" /></div>
              <div>
                <h3 className="font-semibold text-lg  mb-">Carbon Integration</h3>
                <p className="text-gray-600 text-sm ">Verified carbon reductions can be tracked and converted into measurable carbon assets.</p>
              </div>
            </div>

          </div>
          <div className="mt-14 text-center">
            <Link to="/book-demo" className="px-8 py-3 bg-gradient-to-br from-[#4639AA] to-[#1893A1] text-white font-semibold rounded-full shadow hover:opacity-90">Join Waitlist</Link>
          </div>
        </div>
      </section>

      {/* CARBON INTEGRATION SECTION */}
      <section className="py-20 px-6 bg-white" id="carbon-integration">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-[#4639AA] mb-4">Beyond ESG Reporting</h2>
          <p className="text-lg text-gray-700 mb-6">CarbonFora Launchpad connects ESG reporting with real climate action.</p>
          <ul className="list-disc pl-8 text-gray-700 mb-6">
            <li>Track carbon reduction metrics</li>
            <li>Connect climate initiatives to measurable impact</li>
            <li>Receive verified carbon assets from CarbonFora ecosystem participation</li>
          </ul>
          <p className="text-lg text-gray-700 mb-4">These carbon assets can support: Corporate ESG disclosures, climate commitments, voluntary carbon initiatives. This creates a bridge between corporate ESG reporting and real climate participation.</p>
        </div>
      </section>

      {/* TARGET USERS SECTION */}
      <section className="py-20 px-6 bg-[#f6fafd]" id="target-users">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl max-w-2xl font-bold text-[#4639AA] mb-10">Built for the Companies Driving Tomorrow's Economy</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <Icon icon="mdi:factory" className="text-4xl text-[#4639AA] mb-2" />
              <h3 className="font-semibold text-lg mb-2">SMEs</h3>
              <p className="text-gray-600 text-sm text-center">Start ESG reporting without expensive consultants.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <Icon icon="mdi:rocket-launch-outline" className="text-4xl text-[#4639AA] mb-2" />
              <h3 className="font-semibold text-lg mb-2">Startups</h3>
              <p className="text-gray-600 text-sm text-center">Prepare sustainability reporting for investors and international expansion.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <Icon icon="mdi:domain" className="text-4xl text-[#4639AA] mb-2" />
              <h3 className="font-semibold text-lg mb-2">Corporates</h3>
              <p className="text-gray-600 text-sm text-center">Track ESG metrics and connect climate initiatives with verified carbon impact.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <Icon icon="mdi:tag-heart" className="text-4xl text-[#4639AA] mb-2" />
              <h3 className="font-semibold text-lg mb-2">Brands</h3>
              <p className="text-gray-600 text-sm text-center">Engage consumers through climate positive actions within the CarbonFora ecosystem.</p>
            </div>
          </div>
        </div>
      </section>

      {/* DASHBOARD SECTION */}
      <section className="py-20 px-6 bg-white" id="dashboard">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-2xl md:text-4xl font-bold text-[#4639AA] mb-6">A Simple ESG Command Center</h2>
            <p className=" text-gray-700 mb-10">
              ESG Scorecard,
              Carbon Footprint Tracking,
              Impact Metrics,
              Compliance Mapping,
              AI Sustainability Insights,
              Report Generation.
            </p>
           
            <a href="#" className="px-8 py-3 bg-gradient-to-r from-[#4639AA] to-[#1893A1] text-white font-semibold rounded-full shadow hover:opacity-90">See Platform Demo</a>
          </div>
          <div className="flex-1 flex justify-center">
            <img src={ESGScoreImg} alt="ESG Dashboard" className="rounded-2xl shadow-xl w-full max-w-md" />
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section className="py-20 px-6 bg-[#f6fafd]" id="pricing">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-[#4639AA] mb-8">ESG Reporting That Scales With You</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-20">
            {pricingTiers.map((tier, i) => (
              <div
                key={i}
                className="relative group bg-white rounded-lg shadow-sm  border border-gray-200 p-8 flex flex-col transition-all duration-300"
              >

                {/* Popular Badge */}
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#4639AA] to-[#1893A1] text-white text-xs font-semibold px-4 py-1 rounded-full shadow">
                    Most Popular
                  </span>
                )}

                {/* Plan Name */}
                <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">
                  {tier.name}
                </h3>

                {/* Price */}
                <div className="text-center mb-4">
                  <span className="text-4xl font-bold text-[#4639AA]">
                    {tier.price} </span>
                  <span className="text-gray-500 ml-1">
                    {tier.period} </span>
                </div>

                {/* Description */}
                <p className="text-gray-500 text-sm text-center mb-6">
                  {tier.desc}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {tier.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-gray-600 text-sm">
                      <span className="w-5 h-5 rounded-full  flex items-center justify-center text-[#1893A1] text-sm">
                        ✓ </span> {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link to="/book-demo" className="mt-auto text-center px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-[#4639AA] to-[#633DB7] shadow-lg  transition" >
                  {tier.cta} </Link>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARKET CONTEXT SECTION */}
      <section className="py-28 px-6 bg-gradient-to-b from-white to-gray-50" id="market-context">
        <div className="max-w-7xl mx-auto">

          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800">
              The ESG Market Is{" "}
              <span className="bg-gradient-to-r from-[#4639AA] to-[#1893A1] text-transparent bg-clip-text">
                Growing Rapidly
              </span>
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Sustainability is no longer optional it's a competitive advantage.
            </p>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            
            {[
              {
                title: "$50T+ Market",
                desc: "Global ESG assets are projected to exceed $50 trillion by 2030.",
                icon: "mdi:chart-line"
              },
              {
                title: "Regulatory Pressure",
                desc: "Governments are increasing sustainability disclosure requirements worldwide.",
                icon: "mdi:gavel"
              },
              {
                title: "Competitive Edge",
                desc: "Early adopters gain investment access, global reach, and brand trust.",
                icon: "mdi:rocket-launch"
              }
            ].map((item, i) => (
              <div
                key={i}
                className="group p-8 bg-white rounded-md border border-gray-200  transition-all duration-300"
              >
                <div className="w-14 h-14 mb-6 rounded-xl bg-[#1893A1]/10 flex items-center justify-center text-[#1893A1]  transition">
                  <Icon icon={item.icon} className="text-2xl" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>

                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom Highlight */}
          <div className="mt-16 text-center max-w-3xl mx-auto">
            <p className="text-lg text-gray-700">
              CarbonFora Launchpad ensures companies can participate in this shift
              <span className="font-semibold text-[#4639AA]"> without heavy consulting costs.</span>
            </p>
          </div>

        </div>
      </section>

      {/* ABOUT CARBONFORA SECTION */}
      <section className="py-20 px-6 bg-[#f6fafd]" id="about">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-[#4639AA] mb-6">Built on CarbonFora Climate Infrastructure</h2>
          <p className="text-lg text-gray-700 mb-4">CarbonFora is a climate technology platform designed to democratize access to the carbon economy. The ecosystem enables individuals and organizations to convert verified climate positive actions into measurable carbon assets using AI enabled digital MRV and blockchain architecture. Launchpad extends this infrastructure to businesses by providing accessible ESG reporting and carbon integration tools.</p>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-12 px-6 bg-gradient-to-r from-[#1C8BA2] to-[#633DB7] text-white" id="final-cta">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">Start Your ESG Journey Today</h2>
            <p className="text-lg mb-6">Measure your impact. Report your sustainability. Participate in the carbon economy.</p>
            <div className="flex flex-wrap gap-4">
              <Link to="/book-demo" className="px-6 py-2.5 bg-white text-[#633DB7] font-semibold rounded-full shadow hover:bg-white/90">Join Waitlist</Link>
              {/* <Link to="/book-demo" className="px-6 py-2.5 bg-white text-[#633DB7] font-semibold rounded-full shadow hover:bg-white/90">Book a Demo</Link> */}
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <img src={CarbonImg} alt="ESG Journey" className="rounded-2xl shadow-xl w-full max-w-md" />
          </div>
        </div>
      </section>

    </div>
  );
}

export default App;




