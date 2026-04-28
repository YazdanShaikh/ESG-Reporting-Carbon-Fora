import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import Val from "../../assets/images/all-img/val1.png";
import Logo from "../../assets/images/logo/logo-car.png";
import Shap1 from "../../assets/images/shap/c.png";
import Shap2 from "../../assets/images/shap/ctag.png";

const Home = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && setIsOpen(false);
    if (isOpen) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <section className="min-h-screen bg-gradient-to-r from-[#4639AA] to-[#1893A1] relative flex items-center overflow-hidden px-6">
      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center relative z-50">

        {/* LEFT CONTENT */}
        <div className="text-white">

          {/* Logo */}
          <img src={Logo} alt="The CM Stack" className="h-9 mb-8" />

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#30c4d4]  leading-tight">
            Meet your
            <span className="block text-white">
              On-Demand ESG Software
            </span>
          </h1>

          <p className="mt-6 text-lg text-white/90 max-w-xl">
            I’m <span className="font-semibold">CarbonFora</span> — your growth reports.
            Get instant access to marketing leadership without the full-time cost.
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={() => navigate("/register")}
              className="flex items-center gap-3 bg-white text-[#4639AA] px-8 py-3 rounded-lg text-lg font-semibold hover:opacity-90"
            >
              <Icon icon="mdi:rocket-launch" />
              Get Started Now
            </button>

            <button
              onClick={() => setIsOpen(true)}
              className="px-8 py-3 rounded-lg border border-white/40 text-white hover:bg-white/10"
            >
              How it works
            </button>
          </div>

          {/* Trust */}
          <div className="mt-10 flex flex-wrap gap-4 text-sm">
            {[
              { icon: "mdi:shield-check", text: "Secure & Private" },
              { icon: "mdi:account-group", text: "500+ Startups" },
              { icon: "mdi:star", text: "4.9/5 Rating" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full"
              >
                <Icon icon={item.icon} />
                {item.text}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT VISUAL */}
        <div className="relative hidden md:flex justify-center">
          <div className="absolute w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <img
            src={Val}
            alt="VAL"
            className="relative w-64 md:w-96 drop-shadow-2xl"
          />
        </div>
      </div>
      <div className="absolute bottom-0 -right-60 z-10">
        <img src={Shap1} alt="Shape" className="opacity-10 w-[600px] " />
      </div>
      <div className="absolute -left-20 z-10">
        <img src={Shap2} alt="Shape" className="h-full w-full opacity-50" />
      </div>

      {/* MODAL (unchanged) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          <div className="relative z-10 w-full max-w-[500px] rounded-2xl bg-white p-8 shadow-2xl">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 text-gray-500 text-lg"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-8 text-center">
              How CarbonFora Works
            </h2>

            <div className="grid grid-cols-2 gap-5">
              {[
                { icon: "material-symbols:search-rounded", title: "Discover", desc: "Find expertise" },
                { icon: "la:handshake-solid", title: "Match", desc: "Vetted leaders" },
                { icon: "material-symbols:group", title: "Collaborate", desc: "Build strategy" },
                { icon: "material-symbols:trending-up", title: "Grow", desc: "Scale faster" },
              ].map((step, i) => (
                <div key={i} className="bg-purple-50 rounded-xl p-5 text-center">
                  <div className="text-3xl mb-2 text-[#1893A1] flex justify-center">
                    <Icon icon={step.icon} />
                  </div>
                  <h3 className="font-semibold text-lg">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Home;
