import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

import Apple from '../../assets/images/all-img/applestore.png';
import Hero1 from '../../assets/images/all-img/heroban1.png';
import Hero2 from '../../assets/images/all-img/heroban2.png';
import Brand1 from '../../assets/images/chat/ban1.png';
import Brand2 from '../../assets/images/chat/ban2.png';
import Brand3 from '../../assets/images/chat/ban3.png';
import Brand4 from '../../assets/images/chat/ban4.png';
import Brand5 from '../../assets/images/chat/ban5.png';
import Brand6 from '../../assets/images/chat/ban6.png';

import Banner from '../../assets/images/shap/Vector 1.png';
import Shap1 from '../../assets/images/shap/Group 1.png';
import Shap2 from '../../assets/images/shap/Rectangle 12.png';
import Shap3 from '../../assets/images/shap/Polygon 3.png';
import Shap4 from '../../assets/images/shap/Polygon 1.png';
import Play from '../../assets/images/auth/play.png';
import App from '../../assets/images/auth/app.png';



const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <section id="home" className="relative  bg-gradient-to-r from-[#4639AA]  to-[#1893A1]  ">
      <section className='bg-white md:pt-32 py-32  relative z-10 '>
        <div className='relative z-10 '>
          <div className="max-w-6xl  w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center mx-auto justify-center">
            {/* Left Text Section */}
            <div className="text-white space-y-6 px-6">
              {/* Logo */}
              <span className="inline-block text-sm md:text-base font-medium text-gray-800 border border-gray-800 px-3 md:px-6 py-1 rounded-full">
                Every small choice counts. Ready to make yours?
              </span>
              {/* Heading */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                Turn Everyday Choices Into Real-World Climate Impact
              </h1>
              {/* Subtext */}
              <p className="mt-6 text-lg text-gray-600 ">
                CarbonFora makes sustainability part of your lifestyle. Log everyday eco-actions from skipping plastic to biking to work and we'll verify them with AI, record them on blockchain, and reward you with credits you can redeem for real value.
              </p>
              {/* Buttons */}
              <div className="md:mt-6 flex justify-start items-center space-x-4">
                <a target="_blank" href='https://play.google.com/store/apps/details?id=com.carbonfora.carbon_fora'>
                    <img src={Play} alt="playstore" className='w-36 '/>
                  </a>
                
                <a target="_blank" href='https://apps.apple.com/us/app/carbonfora-climate-rewards/id6752239906'>
                  <img src={App} alt="playstore" className='w-36 '/>
                </a>
                
              </div>
            </div>

            {/* Right Image Section */}
            <div className="relative w-full flex justify-end items-center">
              {/* Top image with speech bubble */}
              <div className="relative  flex justify-end">
                <img
                  src={Hero1}
                  alt="Person taking the bus"
                  className="w-[220px] md:w-[300px] rounded-xl "
                />
                <div className=' absolute -z-10 -top-6 -right-14'>
                  <img src={Shap1} alt='shap' />
                </div>
                
              </div>

              {/* Group image behind */}
              <div className="absolute -bottom-6 left-0 translate-x-6 translate-y-6">
                <img
                  src={Hero2}
                  alt="Group of friends"
                  className="w-[220px] md:w-[300px] rounded-xl "
                />
                <div className=' absolute -z-10 -bottom-10 -left-14'>
                  <img src={Shap1} alt='shap' />
                </div>
              </div>
            </div>

            <div className=' absolute right-0'><img src={Shap2} alt="shap" className='h-[70vh]' /> </div>
          </div>
          <div className='lg:absolute hidden lg:block top-16 -z-10'>
            <h1 className='text-[12rem] select-none stroke-text1 text-white opacity-5'>Make Climate Moves. Get Real Rewards.</h1>
          </div>
          <div className='absolute top-1/2 -z-10'>
            <img src={Shap4} alt="shap" className='h-[25vh]' />
          </div>
          <div className='absolute left-2/4 top-10 -z-10'>
            <img src={Shap3} alt="shap" className='h-[30vh]' />
          </div>
        </div>
        {/* <div className="absolute top-60 w-full"><img src={Banner} alt="Banner" className="w-full " /></div> */}
      </section>
     

      {/* Background Gradient Wave */}
      
      {/* <section className=" md:pt-20 pb-10 relative container my-20">
        <div className='relative z-10'>
        <h3 className="text-center text-2xl md:text-4xl font-bold text-white mt-20">Trusted by Leading Brands</h3>
        <div className="grid grid-cols-6 justify-center items-center  gap-4  pt-4 opacity-90">
          <img src={Brand1} alt="brand" className="w-full md:p-5" />
          <img src={Brand2} alt="brand" className="w-full md:p-5" />
          <img src={Brand3} alt="brand" className="w-full md:p-4" />
          <img src={Brand4} alt="brand" className="w-full md:p-4" />
          <img src={Brand5} alt="brand" className="w-full md:p-4" />
          <img src={Brand6} alt="brand" className="w-full md:p-4" />
          
        </div>
        </div>
        
      </section> */}
    </section>
  );
};

export default Header;
