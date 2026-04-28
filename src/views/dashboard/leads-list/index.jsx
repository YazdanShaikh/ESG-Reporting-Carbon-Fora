import { User, Mail, Shield, AlertCircle, CheckCircle } from "lucide-react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from "react-router-dom";
function LeadDashboard() {
  const navigate = useNavigate();

  const handleAddLeadList = () => {
    navigate("add");
  };
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900 rounded-lg">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Search */}
        <div className="p-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-3 py-2 text-sm border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Lead List Item */}
        <div className="px-4">
          <div className="flex justify-between items-center p-3 border rounded-md bg-blue-50 text-gray-900 font-medium">
            White Diamond
            <button className="text-gray-500 hover:text-gray-700">⋮</button>
          </div>
        </div>

        {/* Add New Lead List */}
        <div className="mt-auto p-4">
          <button onClick={handleAddLeadList} className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1">
            <span className="text-lg">+</span> Add New Lead List
          </button>
        </div>
      </aside>

      {/* Main Section */}
      <main className="flex-1 p-6">
        {/* Stats Row */}
        <div className="flex flex-wrap gap-3 mb-6">
          <StatCard label="Total Leads" value={0} color="bg-blue-500" Icon={User} />
          <StatCard label="Leads Contacted" value={0} color="bg-purple-500" Icon={User} />
          <StatCard label="Leads Opened" value={0} color="bg-orange-500" Icon={Mail} />
          <StatCard label="Leads Bounced" value={0} color="bg-red-500" Icon={AlertCircle} />
          <StatCard label="Completed Leads" value={0} color="bg-green-500" Icon={Shield} />
        </div>

        {/* Actions Row */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-2 border border-gray-400 rounded-md text-sm w-64 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button className="px-4 py-2 bg-white border flex items-center gap-1 border-gray-400 rounded-md text-sm font-medium hover:bg-gray-50">
            <Icon icon="material-symbols:action-key" /> Actions ▼
          </button>
          <button className="px-4 py-2 bg-white border flex items-center gap-1 border-gray-400 rounded-md text-sm font-medium hover:bg-gray-50">
            <Icon icon="ri:chat-check-line" /> AI Prompts
          </button>
          <button onClick={handleAddLeadList} className="ml-auto px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm rounded-md hover:bg-blue-700">
            + Add New Leads
          </button>
        </div>

        {/* Empty State */}
        <div className="flex justify-center items-center h-96">
          <div className="text-center py-12 px-16 border border-gray-400 rounded-lg bg-white shadow-sm max-w-md">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 flex items-center justify-center rounded-full">
                <User className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold">Lead List is Empty</h3>
            <p className="text-gray-500 mt-1 text-sm">
              Add new leads in the list
            </p>
            <button onClick={handleAddLeadList} className="mt-4 px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:bg-blue-700">
              + Add New Leads
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ label, value, color, Icon }) {
  return (
    <div className="flex items-center gap-2 border border-gray-400 bg-white rounded px-3 py-1.5 text-sm">
      <div className={`flex items-center justify-center`}>
        <Icon className="w-4 h-4" />
      </div>
      <span className="font-medium">{label}</span>
      <span className={`ml-2 px-2 py-0.5 rounded text-white text-xs ${color}`}>
        {value}
      </span>
    </div>
  );
}

export default LeadDashboard;
