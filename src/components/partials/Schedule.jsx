import React, { useState } from "react";
import {
  Calendar,
  Clock,
  Plus,
  Save,
  BookTemplate as Template,
} from "lucide-react";

const Schedule = () => {
  const [scheduleName, setScheduleName] = useState("New Schedule");
  const [startTime, setStartTime] = useState("09:00 AM");
  const [endTime, setEndTime] = useState("5:00 PM");
  const [timezone, setTimezone] = useState("Eastern Time (UTC-4:00)");
  const [selectedDays, setSelectedDays] = useState({
    Monday: true,
    Tuesday: true,
    Wednesday: true,
    Thursday: true,
    Friday: true,
    Saturday: false,
    Sunday: false,
  });

  const handleDayToggle = (day) => {
    setSelectedDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  const timeOptions = [
    "12:00 AM",
    "12:30 AM",
    "01:00 AM",
    "01:30 AM",
    "02:00 AM",
    "02:30 AM",
    "03:00 AM",
    "03:30 AM",
    "04:00 AM",
    "04:30 AM",
    "05:00 AM",
    "05:30 AM",
    "06:00 AM",
    "06:30 AM",
    "07:00 AM",
    "07:30 AM",
    "08:00 AM",
    "08:30 AM",
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
    "05:00 PM",
    "05:30 PM",
    "06:00 PM",
    "06:30 PM",
    "07:00 PM",
    "07:30 PM",
    "08:00 PM",
    "08:30 PM",
    "09:00 PM",
    "09:30 PM",
    "10:00 PM",
    "10:30 PM",
    "11:00 PM",
    "11:30 PM",
  ];

  const timezones = [
    "Eastern Time (UTC-4:00)",
    "Central Time (UTC-5:00)",
    "Mountain Time (UTC-6:00)",
    "Pacific Time (UTC-7:00)",
    "UTC (UTC+0:00)",
    "GMT (UTC+0:00)",
  ];

  return (
    <div className="bg-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gray-300 border border-gray-500/50 rounded-xl p-4 space-y-3">
              {/* Start Date */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-black" />
                  <span className="font-medium text-black">Start</span>
                </div>
                {"|"}
                <div className="text-sm text-black">
                  <span>Sun Aug 16 2025</span>
                </div>
              </div>

              {/* End Date */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-black" />
                  <span className="font-medium text-black">End</span>
                </div>
                {"|"}
                <div className="text-sm text-black">
                  <span>Sun Aug 16 2025</span>
                </div>
              </div>
            </div>

            {/* New Schedule Button |  Add Schedule Button  */}
            <div className="bg-gray-300 border border-gray-500/50 rounded-xl p-4 space-y-2">
              <button className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4" />
                New Schedule
              </button>
              <button className="bg-gray-100 w-full flex items-center justify-center gap-2 py-3 px-4 border border-gray-500/50 text-black rounded-lg font-medium hover:bg-gray-300 transition-colors">
                <Plus className="w-4 h-4" />
                Add Schedule
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Schedule Name */}
            <div className="bg-gray-300 border border-gray-500/50 rounded-xl p-6">
              <h3 className="text-lg font-medium text-black mb-4">
                Schedule Name
              </h3>
              <input
                type="text"
                value={scheduleName}
                onChange={(e) => setScheduleName(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-500/50 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter schedule name"
              />
            </div>

            {/* Timings */}
            <div className="bg-gray-300 border border-gray-500/50 rounded-xl p-6">
              <h3 className="text-lg font-medium text-black mb-4">Timings</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Start Time */}
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Start Time
                  </label>
                  <select
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-500/50 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {timeOptions.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>

                {/* End Time */}
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    End Time
                  </label>
                  <select
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-500/50 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {timeOptions.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Timezone */}
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Timezone
                  </label>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-500/50 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {timezones.map((tz) => (
                      <option key={tz} value={tz}>
                        {tz}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Days */}
            <div className="bg-gray-300 border border-gray-500/50 rounded-xl p-6">
              <h3 className="text-lg font-medium text-black mb-4">Days</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                {Object.entries(selectedDays).map(([day, isSelected]) => (
                  <label
                    key={day}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleDayToggle(day)}
                      className="w-4 h-4 text-blue-600 bg-white border-gray-500/50 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="text-sm font-medium text-black">
                      {day}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-3">
                <button className="flex items-center gap-2 px-6 py-3 bg-gray-300 border border-gray-500/50 text-black rounded-lg font-medium hover:bg-gray-300 transition-colors">
                  <Template className="w-4 h-4" />
                  Save as Template
                </button>
                <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200">
                  <Save className="w-4 h-4" />
                  Save
                </button>
              </div>

              <button className="flex items-center gap-2 px-6 py-3 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                <Template className="w-4 h-4" />
                Choose From Template
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
