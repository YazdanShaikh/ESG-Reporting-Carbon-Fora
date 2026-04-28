import { Icon } from "@iconify/react/dist/iconify.js";
import { Upload, User } from "lucide-react";



const AddLead = () => {


  return (
    <>
      <section className="bg-white  flex flex-col items-center justify-center py-3">
        {/* header */}

        <div className="text-center mx-auto mt-8">
          <h3 className="text-2xl font-semibold mb-2">Add New Leads to Lead List</h3>

        </div>
        <div className="flex flex-wrap justify-center gap-8 w-full px-4">
          <div className="md:w-[650px] w-full p-8 bg-gray-100 rounded-xl border border-gray-500/50">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-lg font-medium text-black-500">Bulk Lead Addition</h4>
              <button className="text-blue-500">See Sample CSV File</button>
            </div>

           
            <div className="mb-8">
              <div className="flex items-center mb-2 gap-4 border-2 border-dashed border-gray-500/50 p-6 rounded-lg cursor-pointer bg-white text-black-500">
                <label className="flex flex-wrap md:justify-start justify-center items-center gap-4 w-full cursor-pointer">
                  <div className=" p-3 rounded-lg">
                    <Upload className="w-6 h-6 text-black-500" />
                  </div>
                  <div className="md:text-left text-center text-black-500">
                    <p className="font-medium ">Drag & Drop CSV file here</p>
                    <p className="text-sm text-gray-600">Upload from your system, choose file</p>
                  </div>
                  <input
                    type="file"
                    accept=".csv"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        console.log("Selected file:", e.target.files[0]);
                      }
                    }}
                  />
                </label>
              </div>

              <div className="flex items-center gap-4 border  border-gray-500/50 p-6 rounded-lg cursor-pointer bg-white text-black-500">
                <label className="flex flex-wrap md:justify-start justify-center items-center gap-4 w-full cursor-pointer">
                  <div className=" p-3 rounded-lg">
                    <User className="w-6 h-6 text-black-500" />
                  </div>
                  <div className="md:text-left text-center text-black-500">
                    <p className="font-medium ">Use Lead Finder</p>
                    <p className="text-sm text-gray-600">Find and reach out to 500 M+ leads</p>
                  </div>
                  
                </label>
              </div>
            </div>

              <div>
                <h5 className="text-black-500 font-medium mb-4 text-base">Add Via</h5>
                <div className="grid grid-cols-2 gap-2 justify-center">
                
                  <div className="w-full text-center flex flex-col items-center">
                    <button
                      className="md:w-44 md:h-36 w-16 h-14 flex flex-col items-center justify-center p-4 bg-white rounded-lg border border-gray-500/50"
                    >
                      <Icon icon="devicon:google" className="text-4xl text-black-500" />
                    </button>
                    <p className="text-sm font-medium text-black-500 mt-2">Google Sheet</p>
                  </div>

                  <div className="w-full text-center flex flex-col items-center">
                    <button
                      className="md:w-44 md:h-36 w-16 h-14 flex flex-col items-center justify-center p-4 bg-white rounded-lg border border-gray-500/50"
                    >
                      <Icon icon="ic:outline-email" className="text-4xl text-black-500" />
                    </button>
                    <p className="text-sm font-medium text-black-500 mt-2">Add Manually</p>
                  </div>
                </div>
              </div>
           
          </div>
        </div>
      </section>
      
    </>
  );
};

export default AddLead;
