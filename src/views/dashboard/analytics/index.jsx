import React, { useState } from 'react';
import { Users, Eye, MousePointer, Reply, AlertTriangle, TrendingUp, BarChart, Activity, Link, Zap, Target, Clock, Mail, CheckCircle } from 'lucide-react';

const Analytics = () => {
  const [activeSubTab, setActiveSubTab] = useState('Step Analytics');
  const subTabs = ['Step Analytics', 'Activity', 'Link Analytics', 'Bounce Analytics'];

  const metricCards = [
    {
      title: 'Leads Contacted',
      value: '0',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Open Rate',
      value: '—',
      subtitle: '0 Total',
      icon: Eye,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Click Rate',
      value: '—',
      subtitle: '0 Total',
      icon: MousePointer,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Reply Rate',
      value: '—',
      subtitle: '0 Total',
      icon: Reply,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Bounce Rate',
      value: '0.00%',
      subtitle: '0 Total',
      icon: AlertTriangle,
      color: 'text-red-500',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Opportunities',
      value: '0',
      subtitle: '$0',
      icon: TrendingUp,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    }
  ];

  const renderTabContent = () => {
    switch (activeSubTab) {
      case 'Step Analytics':
        return (
          <div className="bg-white border border-gray-500/50 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-200">
                  <tr>
                    {['STEP', 'SENT', 'TO BE SENT', 'OPENED', 'REPLIED', 'CLICKED', 'OPPORTUNITIES'].map((column) => (
                      <th
                        key={column}
                        className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider"
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-500/50">
                          <BarChart className="w-8 h-8 text-gray-500" />
                        </div>
                        <div className="text-lg font-medium text-black">
                          Step Analytics will appear once the campaign is launched
                        </div>
                        <div className="text-sm text-gray-600">
                          Launch your campaign to see detailed step-by-step performance metrics
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'Activity':
        return (
          <div className="bg-white border border-gray-500/50 rounded-xl p-8">
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center mx-auto mb-4 border border-gray-500/50">
                <Activity className="w-8 h-8 text-gray-500" />
              </div>
              <h3 className="text-lg font-medium text-black mb-2">
                No Activity Data Available
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Campaign activity timeline will show here once your campaign starts running
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="bg-gray-50 border border-gray-500/50 rounded-lg p-4">
                  <Mail className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-black">Email Sends</p>
                  <p className="text-xs text-gray-600">Track when emails are sent</p>
                </div>
                <div className="bg-gray-50 border border-gray-500/50 rounded-lg p-4">
                  <Eye className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-black">Opens</p>
                  <p className="text-xs text-gray-600">Monitor email opens</p>
                </div>
                <div className="bg-gray-50 border border-gray-500/50 rounded-lg p-4">
                  <Reply className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-black">Replies</p>
                  <p className="text-xs text-gray-600">View reply activity</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Link Analytics':
        return (
          <div className="bg-white border border-gray-500/50 rounded-xl p-8">
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center mx-auto mb-4 border border-gray-500/50">
                <Link className="w-8 h-8 text-gray-500" />
              </div>
              <h3 className="text-lg font-medium text-black mb-2">
                Link Tracking Ready
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Add links to your email sequences to track click performance and engagement
              </p>
              <div className="bg-gray-50 border border-gray-500/50 rounded-lg p-6 max-w-md mx-auto">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-black">Total Links</span>
                  <span className="text-lg font-semibold text-black">0</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-black">Total Clicks</span>
                  <span className="text-lg font-semibold text-black">0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-black">Click Rate</span>
                  <span className="text-lg font-semibold text-black">—</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Bounce Analytics':
        return (
          <div className="bg-white border border-gray-500/50 rounded-xl p-8">
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center mx-auto mb-4 border border-gray-500/50">
                <Zap className="w-8 h-8 text-gray-500" />
              </div>
              <h3 className="text-lg font-medium text-black mb-2">
                Bounce Monitoring Active
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                We automatically monitor and categorize email bounces to protect your sender reputation
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto">
                <div className="bg-gray-50 border border-gray-500/50 rounded-lg p-4">
                  <div className="flex items-center justify-center mb-2">
                    <AlertTriangle className="w-6 h-6 text-orange-500" />
                  </div>
                  <p className="text-sm font-medium text-black">Soft Bounces</p>
                  <p className="text-2xl font-bold text-black">0</p>
                  <p className="text-xs text-gray-600">Temporary delivery issues</p>
                </div>
                <div className="bg-gray-50 border border-gray-500/50 rounded-lg p-4">
                  <div className="flex items-center justify-center mb-2">
                    <AlertTriangle className="w-6 h-6 text-red-500" />
                  </div>
                  <p className="text-sm font-medium text-black">Hard Bounces</p>
                  <p className="text-2xl font-bold text-black">0</p>
                  <p className="text-xs text-gray-600">Permanent delivery failures</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className='bg-white px-10 py-5 rounded'>
    <div className="space-y-6">
      {/* Status and Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-black">Status:</span>
            <span className="px-3 py-1 text-sm font-medium bg-gray-50 text-black rounded border border-gray-500/50">
              Draft
            </span>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <select className="px-4 py-2 text-sm border border-gray-500/50 rounded-lg bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Campaign Only</option>
          </select>
          <select className="px-4 py-2 text-sm border border-gray-500/50 rounded-lg bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Last 4 weeks</option>
          </select>
          <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg border border-gray-500/50">
            <span>📅</span>
            <span>19 Jul 2025 - 16 Aug 2025</span>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metricCards.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <div key={index} className="bg-gray-50 border border-gray-500/50 rounded-xl p-6 hover:shadow-lg transition-all duration-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-sm font-medium text-black mb-2">
                    <span>{metric.title}</span>
                    <div className="w-4 h-4 rounded-full border border-gray-500/50 flex items-center justify-center cursor-help">
                      <span className="text-xs text-gray-500">?</span>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-black mb-1">
                    {metric.value}
                  </div>
                  {metric.subtitle && (
                    <div className="text-sm text-gray-600">
                      {metric.subtitle}
                    </div>
                  )}
                </div>
                <div className={`p-3 rounded-xl ${metric.bgColor} border border-gray-500/20`}>
                  <IconComponent className={`w-6 h-6 ${metric.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Campaign Launch Message */}
      <div className="bg-gray-50 border border-gray-500/50 rounded-xl p-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center mx-auto mb-6 border border-gray-500/50">
            <BarChart className="w-10 h-10 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-black mb-3">
            Analytics will appear once the campaign is launched
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            Start your campaign to see detailed analytics and performance metrics across all your CheckMate efforts.
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200">
            Launch Campaign
          </button>
        </div>
      </div>

      {/* Sub Navigation Tabs */}
      <div className="border-b border-gray-300">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {subTabs.map((tab) => {
            const getTabIcon = (tabName) => {
              switch (tabName) {
                case 'Step Analytics': return BarChart;
                case 'Activity': return Activity;
                case 'Link Analytics': return Link;
                case 'Bounce Analytics': return Zap;
                default: return BarChart;
              }
            };

            const IconComponent = getTabIcon(tab);
            
            return (
              <button
                key={tab}
                onClick={() => setActiveSubTab(tab)}
                className={`flex items-center gap-2 py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeSubTab === tab
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-black hover:border-gray-300'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                {tab}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Dynamic Tab Content */}
      <div className="mt-6">
        {renderTabContent()}
      </div>
    </div>
    </section>
  );
};

export default Analytics;