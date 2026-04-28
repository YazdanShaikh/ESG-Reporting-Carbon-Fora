import { Icon } from "@iconify/react/dist/iconify.js";
import { Upload } from "lucide-react";
import React, { useState } from "react";
import AddEmailAppPasswordModal from "../../../components/shared/AddEmailAppPasswordModal";
import AddEmailOAuthModal from "../../../components/shared/AddEmailOAuthModal";

const AddEmail = () => {
  const [activeModal, setActiveModal] = useState(null);

  return (
    <>
      <section className="bg-white  flex flex-col items-center justify-center py-3">
        {/* header */}
        <div className="text-center mx-auto mb-8">
          <h3 className="text-2xl font-semibold mb-2">Add Email Accounts</h3>
          <p className="text-gray-400">Connect or purchase email accounts to start sending campaigns effortlessly</p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 w-full px-4">
          {/* Left Side - Connect Email Accounts */}
          <div className="md:w-[650px] w-full p-8 bg-gray-100 rounded-xl border border-gray-500/50">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-lg font-medium text-black-500">Connect Email Accounts</h4>
              <button className="text-blue-500">See Sample CSV File</button>
            </div>

            {/* File Upload Section */}
            <div className="mb-8">
              <div className="flex items-center gap-4 border-2 border-dashed border-gray-500/50 p-6 rounded-lg cursor-pointer bg-white text-black-500">
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
            </div>

            <div className="flex flex-wrap gap-2 md:justify-between justify-center">
              {/* Connect Google/Gmail Account */}
              <div>
                <h5 className="text-black-500 font-medium mb-4 text-base">Connect Google / Gmail Account</h5>

                <div className="grid grid-cols-2 gap-6 justify-center">
                  {/* First Option */}
                  <div className="text-center flex flex-col items-center">
                    <button
                      className="md:w-28 md:h-28 w-14 h-14 flex flex-col items-center justify-center p-4 bg-white rounded-lg border border-gray-500/50"
                      onClick={() => setActiveModal("google-oauth")}
                    >
                      <Icon icon={"devicon:google"} className="text-4xl text-black-500" />
                    </button>
                    <p className="text-sm font-medium text-black-500 mt-2">OAuth</p>
                    <p className="text-xs text-gray-600">One Click Setup</p>
                  </div>

                  {/* Second Option */}
                  <div className="text-center flex flex-col items-center">
                    <button
                      className="md:w-28 md:h-28 w-14 h-14 flex flex-col items-center justify-center p-4 bg-white rounded-lg border border-gray-500/50"
                      onClick={() => setActiveModal("google-password")}
                    >
                      <Icon icon={"ic:outline-email"} className="text-4xl text-black-500" />
                    </button>
                    <p className="text-sm font-medium text-black-500 mt-2">App Password</p>
                    <p className="text-xs text-gray-600">SMTP Setup</p>
                  </div>
                </div>
              </div>

              {/* Other Email Provider */}
              <div>
                <h5 className="text-black-500 font-medium mb-4 text-base">Other Email Provider</h5>
                <div className="grid grid-cols-2 gap-6 justify-center">
                  {/* First Option */}
                  <div className="text-center flex flex-col items-center">
                    <button className="md:w-28 md:h-28 w-14 h-14 flex flex-col items-center justify-center p-4 bg-white rounded-lg border border-gray-500/50">
                      <Icon icon={"picon:msoffice"} className="text-4xl text-orange-700" />
                    </button>
                    <p className="text-sm font-medium text-black-500 mt-2">OAuth</p>
                    <p className="text-xs text-gray-600">Google Setup</p>
                  </div>

                  {/* Second Option */}
                  <div className="text-center flex flex-col items-center">
                    <button className="md:w-28 md:h-28 w-14 h-14 flex flex-col items-center justify-center p-4 bg-white rounded-lg border border-gray-500/50">
                      <Icon icon={"line-md:at"} className="text-4xl text-black-500" />
                    </button>
                    <p className="text-sm font-medium text-black-500 mt-2">OAuth</p>
                    <p className="text-xs text-gray-600">Google Setup</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <AddEmailAppPasswordModal active={activeModal === "google-password"} handleClose={() => setActiveModal(null)} />
      <AddEmailOAuthModal active={activeModal === "google-oauth"} handleClose={() => setActiveModal(null)} />
    </>
  );
};

export default AddEmail;
