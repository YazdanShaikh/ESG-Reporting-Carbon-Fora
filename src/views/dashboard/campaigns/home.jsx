import { Icon } from '@iconify/react/dist/iconify.js'
import Analytics from '../../../components/partials/Analytics';
import Leads from '../../../components/partials/Leads';
import Sequences from '../../../components/partials/Sequences';
import Schedule from '../../../components/partials/Schedule';
import Options from '../../../components/partials/Options';
import Subsequences from '../../../components/partials/Subsequences';
import React, { useState } from 'react';

const tabs = ["Analytics", "Leads", "Sequence", "Schedule", "Options", "Subsequences"];

const Home = () => {
  const [activeTab, setActiveTab] = useState("Analytics");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Analytics":
        return <Analytics />;
      case "Leads":
        return <Leads />;
      case "Sequence":
        return <Sequences />;
      case "Schedule":
        return <Schedule />;
      case "Options":
        return <Options />;
      case "Subsequences":
        return <Subsequences />;
      default:
        return <div className="text-center py-10">Content for {activeTab}</div>;
    }
  };

  return (
    <section className="bg-white text-black flex flex-col px-4 py-4 rounded-lg">
      {/* header */}
      <div>
        <p className='flex gap-2 items-center text-sm'>
          <span>Campaign</span>
          <Icon icon={"material-symbols-light:double-arrow"} />
          <span>Muhammad Hussain</span>
        </p>

        {/* Tabs */}
        <div className='mt-3 mx-7 text-black-500 text-lg overflow-x-auto'>
          <ul className='flex justify-between items-center whitespace-nowrap'>
            {tabs.map((tab, idx) => (
                <>
              <li 
                key={tab} 
                className={`flex items-center px-3 py-1 border-b-2 ${activeTab === tab ? 'border-blue-600 font-semibold' : '' } gap-1 cursor-pointer`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </li>
                {idx < tabs.length - 1 && <Icon icon={"ooui:next-ltr"} className='text-sm' />}
                </>
            ))}
          </ul>
        </div>
        <hr className='w-full bg-gray-300' />
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {renderTabContent()}
      </div>
    </section>
  );
};

export default Home;
