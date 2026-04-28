import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Textinput from "../../../components/ui/Textinput";
import { useNavigate } from "react-router-dom";

const add = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/dashboard/campaigns/home");
  };

  return (
    <section className=" min-h-screen text-black flex flex-col items-center px-10 py-10 rounded-lg">
      <div className=" mt-10 p-10 bg-white rounded-xl border border-black-400/50">
        <h3 className="w-full text-3xl">Let’s create a new campaign</h3>
        <p>What would you like to name it?</p>

        <form onSubmit={handleSubmit}>
          <Textinput
            placeholder="Campaign name"
            className="my-9 px-3 py-4 rounded-lg bg-gray-50 border border-black-400/50"
          />

          <div className="flex flex-wrap justify-start gap-4 mt-3">
            <button className="bg-gray-50 border border-black-400/50 px-4 py-2 rounded-lg  font-semibold flex items-center justify-center space-x-2">
              <span>Cancel</span>
            </button>

            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg  font-semibold flex items-center justify-center space-x-2"
            >
              <span>Continue</span>
              <Icon icon={"grommet-icons:next"} />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default add;
