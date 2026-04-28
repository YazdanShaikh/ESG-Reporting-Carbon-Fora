import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from "react-router-dom";
import Textinput from "../../../components/ui/Textinput";
import Select from "../../../components/ui/Select";
import Button from "../../../components/ui/Button";

const campaigns = [
  {
    name: "Muhammad Hussain",
    time: "5 minutes ago",
    status: "Draft",
    campaignStatus: {
      leads: 0,
      emailSent: 0,
      emailOpened: 0,
      reply: 0,
    },
    healthScore: 0,
  },
];

const Campaigns = () => {
  const navigate = useNavigate();

  const handleAddCampaign = () => {
    navigate("add");
  };

  return (
    <section className="bg-white min-h-screen text-black flex flex-col items-center px-10 py-10 rounded-lg">
      {/* if no emailAccounts */}
      {campaigns.length === 0 ? (
        <div className=" mt-10 p-10 bg-gray-300 rounded-xl text-center border border-black-300/50">
          <div className="flex justify-center items-center mb-10">
            <Icon icon={"ic:baseline-campaign"} className="text-9xl" />
          </div>
          <h3 className="flex flex-wrap w-full items-center justify-center gap-2 text-2xl">
            <span>
              <Icon icon={"twemoji:light-bulb"} />
            </span>{" "}
            Add a campaign to start sending emails
          </h3>
          <div className="flex flex-wrap justify-center gap-2 mt-3">
            <button
              onClick={handleAddCampaign}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl text-lg font-semibold flex items-center justify-center space-x-2"
            >
              <Icon icon={"ic:baseline-plus"} className="text-2xl" />
              <span>Add new</span>
            </button>
            <button className="bg-gray-100 px-4 py-2 rounded-xl text-lg font-semibold flex items-center justify-center space-x-2">
              <Icon icon={"ri:archive-fill"} className="text-2xl" />
              <span>See Archived</span>
            </button>
          </div>
        </div>
      ) : (
        // If their are Email Accounts
        <div className="w-full overflow-x-auto p-1">
          {/* header */}
          <div className="flex flex-wrap md:flex-nowrap justify-between mb-4 gap-3">
            {/* Search */}
            <div className="flex-1 min-w-[200px] max-w-[300px]">
              <Textinput
                placeholder="Search by campaign name or lead email"
                className="bg-white border border-gray-300 py-1 w-full "
                icon={"material-symbols:search"}
              />
            </div>

            {/* Buttons / Actions */}
            <div className="flex flex-wrap gap-3 justify-end">
              <Select
                className="w-[150px] bg-white border border-gray-300 py-1"
                options={["All Statuses", "opt1", "opt2"]}
              />
              <Select
                className="w-[150px] bg-white border border-gray-300 py-1"
                options={["Newest First", "opt1", "opt2"]}
              />
              <Button
                // text={"Health Check"}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-1 px-3"
                icon={"ri:archive-fill"}
              />

              <button
                onClick={handleAddCampaign}
                className="bg-gradient-to-r text-nowrap from-blue-600 to-purple-600 text-white px-3 py-1 rounded text-lg font-semibold flex items-center justify-center gap-1"
              >
                <Icon icon={"ic:baseline-plus"} className="text-2xl" />
                <span>Add new</span>
              </button>
            </div>
          </div>

          {/* table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] bg-white border border-gray-200 rounded-xl">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-6 text-left">
                    <input type="checkbox" />
                  </th>
                  <th className="py-3 px-6 text-left">Campaign Name</th>
                  <th className="py-3 px-6 text-left">Status</th>
                  <th className="py-3 px-6 text-center">Campaign Stats</th>
                  <th className="py-3 px-6 text-left"></th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((account, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-6">
                      <input type="checkbox" />
                    </td>
                    <td className="py-3 px-6">
                      <div className="flex flex-col justify-start items-start gap-1">
                        <span className=" font-bold">{account.name}</span>
                      <span className="text-xs">{account.time}</span>
                      
                      </div>
                      </td>
                    <td className="py-3 px-6">
                      <div className="px-3 py-1 bg-gray-200 text-gray-700 inline text-sm rounded-full">
                        {account.status}
                      </div>
                    </td>
                    <td className="py-3 px-6">
                      <div className="flex justify-center gap-6">
                        <p className="flex items-center gap-1"><Icon icon={"material-symbols:person"} /> {account.campaignStatus.leads}</p>{"|"}
                        <p className="flex items-center gap-1"><Icon icon={"wpf:sent"} /> {account.campaignStatus.emailSent}</p>{"|"}
                        <p className="flex items-center gap-1"><Icon icon={"mdi:email-open"} /> {account.campaignStatus.emailOpened}</p>{"|"}
                        <p className="flex items-center gap-1"><Icon icon={"mdi:share"} /> {account.campaignStatus.reply}</p>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <button className="">
                        <Icon icon={"tabler:dots"} className="text-2xl" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
};

export default Campaigns;
