import React from 'react';
import { Icon } from "@iconify/react/dist/iconify.js";

const Sequences = () => {
  const sequenceOptions = [
    {
      title: "Create using AI",
      description: "Use our powerful AI to write your entire sequence using your product offering and services.",
      icon: "bi:magic",
    },
    {
      title: "Create from Template",
      description: "Choose a pre-made proven template from our library to fast track your campaign creation.",
      icon: "tdesign:template-filled",
    },
    {
      title: "Create from Scratch",
      description: "Create a brand new sequence and customize each email step to your liking.",
      icon: "game-icons:light-bulb",
    },
  ];

  return (
    <section className="bg-white flex flex-col items-center justify-center py-20 px-4">
      <div className='bg-gray-300 rounded-xl p-6 w-full max-w-5xl'>
        <h3 className='text-2xl mb-5'>Create New Sequence</h3>

        <div className='flex flex-col md:flex-row gap-5'>
          {sequenceOptions.map((option, idx) => (
            <div
              key={idx}
              className='flex items-start w-full md:w-1/3 bg-gray-100 p-4 rounded-xl'
            >
              <div className='mt-1 mr-3'>
                <Icon icon={option.icon} className='text-3xl' />
              </div>
              <div>
                <h5 className='text-xl mb-1'>{option.title}</h5>
                <p className='text-base'>{option.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>      
    </section>
  );
};

export default Sequences;
