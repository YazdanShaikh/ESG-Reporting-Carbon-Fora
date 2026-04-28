import React from "react";
import Chart from "react-apexcharts";
import { Icon } from "@iconify/react";

const DashboardHome = () => {
  const brandColor = "#4639AA";
  const lightBrand = "#6B5DD3";
  const veryLightBrand = "#F0EEFF";

  /* Bar Chart - Impacts per Category */
  const impactChartOptions = {
    chart: { toolbar: { show: false }, type: "bar", stacked: true },
    plotOptions: { bar: { horizontal: false, columnWidth: "55%" } },
    xaxis: {
      categories: ["ESG Management", "Strategic Planning", "Operations", "Legal & Compliance", "Stakeholders"],
    },
    colors: ["#4639AA", "#6B5DD3", "#A69CFF", "#D9D6FF"],
    legend: { position: "bottom", horizontalAlign: "center" },
    dataLabels: { enabled: false },
    tooltip: { shared: true, intersect: false },
  };

  const impactSeries = [
    { name: "Highly Material", data: [8, 2, 5, 3, 0] },
    { name: "Moderately Material", data: [3, 4, 6, 2, 1] },
    { name: "Slightly Material", data: [2, 3, 4, 1, 0] },
    { name: "Not Material", data: [1, 1, 2, 0, 0] },
  ];
  /* Donut Chart - Status of Assessments */
  const donutOptions = {
    chart: { type: "donut" },
    colors: [ "#4639AA", "#1893A1", "#6B5DD3", "#7FCAD3", "#D9D6FF", "#E6F4F6" ],
    labels: ["Finance", "Compliance", "Supplier", "Environment", "Strategy", "Technology"],
    legend: { position: "bottom", horizontalAlign: "center" },
    dataLabels: { enabled: true, formatter: (val) => val.toFixed(1) + "%" },
  };

  const criticalTopicsOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "45%",
        borderRadius: 6,
      },
    },
    colors: ["#1893A1"],
    dataLabels: {
      enabled: true,
      style: {
        colors: ["#fff"],
        fontSize: "12px",
      },
    },
    xaxis: {
      categories: [
        "ESG Management",
        "Operations",
        "Strategic Planning",
        "Legal & Compliance",
        "Other Stakeholders",
      ],
    },
    grid: {
      borderColor: "#E5E7EB",
      strokeDashArray: 4,
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} topics`,
      },
    },
  };

  const criticalTopicsSeries = [
    {
      name: "Highly Material Topics",
      data: [1, 2, 2, 3, 0],
    },
  ];

  const stats = [
    { title: "Overall ESG Score", value: "78", icon: "mdi:leaf", color: "#4639AA" },
    { title: "Environmental", value: "82", icon: "mdi:factory", color: "#1893A1" },
    { title: "Social", value: "74", icon: "mdi:account-group", color: "#4639AA" },
    { title: "Governance", value: "79", icon: "mdi:shield-check", color: "#1893A1" },
  ];

  const tableData = [
    { metric: "Energy Usage", status: "Tracked", score: 85 },
    { metric: "Carbon Emissions", status: "Partial", score: 70 },
    { metric: "Employee Safety", status: "Good", score: 78 },
    { metric: "Board Diversity", status: "Needs Improvement", score: 65 },
  ];
  const donutSeries = [20.61, 19.08, 14.88, 12.21, 10.69, 9.54];

  return (
    <div className="min-h-screen  p-4 font-sans">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div
              key={s.title}
              className="border bg-white border-gray-200 backdrop-blur-xl   rounded-xl p-6 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-gray-50 border flex items-center justify-center">
                <Icon icon={s.icon} className="text-2xl" style={{ color: s.color }} />
              </div>
              <div>
                <p className="text-gray-500 text-sm">{s.title}</p>
                <p className="text-gray-700 text-2xl font-semibold">{s.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* LEFT COLUMN - Charts */}
          <div className="lg:col-span-2 space-y-4">
            {/* Impacts per Category */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-gray-700 text-xl font-semibold mb-5">
                IMPACTS PER CATEGORY
              </h3>
              <Chart
                options={impactChartOptions}
                series={impactSeries}
                type="bar"
                height={340}
              />
            </div>

            {/* Critical Topics + Status Assessments */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Critical Topics per Stakeholder */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-gray-700 text-xl font-semibold mb-2 uppercase tracking-wide">
                  Topics per Stakeholder
                </h3>

                <Chart
                  options={criticalTopicsOptions}
                  series={criticalTopicsSeries}
                  type="bar"
                  height={260}
                />
              </div>

              {/* Status of Assessments */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-gray-700 text-xl font-semibold mb-5">
                  STATUS OF ASSESSMENTS
                </h3>
                <Chart
                  options={donutOptions}
                  series={donutSeries}
                  type="donut"
                  height={260}
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Quick Links + Reports */}
          <div className="space-y-4">
            {/* Quick Links */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-gray-700 text-xl font-semibold mb-4 uppercase tracking-wide">
                Quick Links
              </h3>

              <div className="space-y-2">
                {[
                  {
                    label: "ESG Topics Library",
                    icon: "mdi:leaf",
                  },
                  {
                    label: "ESG KPI Library",
                    icon: "mdi:chart-line",
                  },
                  {
                    label: "Stakeholder Library",
                    icon: "mdi:account-group",
                  },
                  {
                    label: "Impact Library",
                    icon: "mdi:target-variant",
                  },
                  {
                    label: "Standards",
                    icon: "mdi:file-certificate",
                  },
                ].map(({ label, icon }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between px-4 py-2.5 rounded-md border border-gray-200
                              hover:border-[#4639AA] hover:bg-[#F0EEFF] transition cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className=" flex items-center justify-center">
                        <Icon icon={icon} className="text-[#4639AA] text-lg" />
                      </div>
                      <span className="text-sm font-medium text-gray-600">
                        {label}
                      </span>
                    </div>

                    <Icon
                      icon="mdi:arrow-right"
                      className="text-[#1893A1] text-lg"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* ESG Reports */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-gray-700 text-xl font-semibold">
                  ESG REPORTS
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-gray-700 text-sm">
                    Management & Sustainability Report
                  </span>
                  <span className="text-[#4639AA] font-medium cursor-pointer text-sm">
                    DOWNLOAD
                  </span>
                </div>
                
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-gray-700 text-xl font-semibold">
                  ESG REPORTS
                </h3>
              </div>

              <div className="space-y-4">
                
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-gray-700 text-sm">
                    Management Sustainability Report (WIP)
                  </span>
                  <span className="text-orange-600 font-medium text-sm text-nowrap">
                    In progress
                  </span>
                </div>
              </div>
            </div>

            <button className="text-[#4639AA] text-xl font-medium hover:underline text-center w-full py-4">
                  + Create Report
                </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-gray-700 text-xl font-semibold mb-4">
            Key ESG Metrics
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-700">
              <thead className="text-gray-600 border-b border-gray-200">
                <tr>
                  <th className="py-3 text-left">Metric</th>
                  <th className="py-3 text-left">Status</th>
                  <th className="py-3 text-left">Score</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-200 last:border-0"
                  >
                    <td className="py-3">{row.metric}</td>
                    <td className="py-3">{row.status}</td>
                    <td
  className={`py-3 font-semibold ${
    row.score >= 80
      ? "text-[#1893A1]"
      : row.score >= 70
      ? "text-[#4639AA]"
      : "text-orange-600"
  }`}
>{row.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardHome;