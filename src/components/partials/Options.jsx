import React, { useState } from "react";
import {
  Mail,
  Settings,
  Send,
  Bot,
  Zap,
  Plus,
  Save,
  Rocket,
} from "lucide-react";

const Options = () => {
  const [stopOnReply, setStopOnReply] = useState(true);
  const [stopOnDomainReply, setStopOnDomainReply] = useState(true);
  const [dailyLimit, setDailyLimit] = useState("200");
  const [activeSection, setActiveSection] = useState("Email Settings");

  const sidebarItems = [
    { name: "Email Settings", icon: Mail, id: "email-settings" },
    { name: "Sending Patterns", icon: Send, id: "sending-patterns" },
    { name: "AI Reply Agent", icon: Bot, badge: "New", id: "ai-reply-agent" },
    { name: "Deliverability", icon: Zap, id: "deliverability" },
    { name: "Additional Options", icon: Settings, id: "additional-options" },
  ];

  return (
    <div className="flex text-black">
      {/* Sidebar */}
      <div className="w-64 p-4 bg-gray-100 h-full sticky top-0">
        <div className="space-y-2">
          {sidebarItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <a
                key={item.name}
                href={`#${item.id}`}
                onClick={() => setActiveSection(item.name)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeSection === item.name
                    ? "bg-blue-600 text-white"
                    : "text-black hover:bg-gray-300"
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span className="text-sm font-medium">{item.name}</span>
                {item.badge && (
                  <span className="ml-auto px-2 py-1 text-xs bg-red-600 text-white rounded-full">
                    {item.badge}
                  </span>
                )}
              </a>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{ scrollBehavior: "smooth" }}
        className="flex-1 p-6 space-y-12 overflow-y-scroll h-[600px]"
      >
        {/* Email Settings */}
        <section id="email-settings">
          <div className="flex items-center gap-2 mb-4">
            <Mail className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Email Accounts</h2>
          </div>
          <div className="bg-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium mb-1">Accounts to Use</h3>
                <p className="text-sm text-gray-700">
                  Select one or more accounts to send emails from
                </p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4" />
                Add Mailboxes
              </button>
            </div>
          </div>
        </section>

        {/* Sending Patterns */}
        <section id="sending-patterns">
          <div className="flex items-center gap-2 mb-4">
            <Send className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Sending Patterns</h2>
          </div>
          <div className="space-y-4">
            {/* Stop On Reply */}
            <div className="bg-gray-200 rounded-lg p-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium mb-1">
                  Stop Sending Emails on Reply
                </h3>
                <p className="text-sm text-gray-700">
                  Stop sending emails to a lead if a response has been received
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setStopOnReply(false)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    !stopOnReply
                      ? "bg-gray-600 text-white"
                      : "bg-gray-100 text-black hover:bg-gray-600"
                  }`}
                >
                  Disable
                </button>
                <button
                  onClick={() => setStopOnReply(true)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    stopOnReply
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : "bg-gray-100 text-black hover:bg-gray-600"
                  }`}
                >
                  Enable
                </button>
              </div>
            </div>

            {/* Stop Domain Reply */}
            <div className="bg-gray-200 rounded-lg p-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium mb-1">
                  Stop Emailing on Domain Reply
                </h3>
                <p className="text-sm text-gray-700 mb-2">
                  Stop sending emails to a domain after receiving a reply from
                  any lead within it
                </p>
                <p className="text-xs text-blue-600">
                  ⚠️ Common ESPs like gmail, outlook etc will be ignored
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setStopOnDomainReply(false)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    !stopOnDomainReply
                      ? "bg-gray-600 text-white"
                      : "bg-gray-100 text-black hover:bg-gray-600"
                  }`}
                >
                  Disable
                </button>
                <button
                  onClick={() => setStopOnDomainReply(true)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    stopOnDomainReply
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : "bg-gray-100 text-black hover:bg-gray-600"
                  }`}
                >
                  Enable
                </button>
              </div>
            </div>

            {/* Daily Limit */}
            <div className="bg-gray-200 rounded-lg p-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium mb-1">Daily Limit</h3>
                <p className="text-sm text-gray-700">
                  Max number of emails to send per day for this campaign
                </p>
              </div>
              <input
                type="number"
                value={dailyLimit}
                onChange={(e) => setDailyLimit(e.target.value)}
                className="w-32 px-4 py-2 bg-gray-100 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="1"
                max="1000"
              />
            </div>

            {/* Smart Time Gaps */}
            <div className="bg-gray-200 rounded-lg p-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium mb-1">Smart Time Gaps</h3>
                <p className="text-sm text-gray-700">
                  We automatically spread your campaign emails across your
                  schedule based on your daily sending limit to maintain
                  deliverability and avoid spam filters.
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setStopOnDomainReply(false)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    !stopOnDomainReply
                      ? "bg-gray-600 text-white"
                      : "bg-gray-100 text-black hover:bg-gray-600"
                  }`}
                >
                  Disable
                </button>
                <button
                  onClick={() => setStopOnDomainReply(true)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    stopOnDomainReply
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : "bg-gray-100 text-black hover:bg-gray-600"
                  }`}
                >
                  Enable
                </button>
              </div>
            </div>

            {/* Max new Leads */}
            <div className="bg-gray-200 rounded-lg p-6 ">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium mb-1">Max new Leads</h3>
                  <p className="text-sm text-gray-700">
                    Set how many new leads to reach out to per day for this
                    campaign
                  </p>
                </div>
                <div>
                  <input
                    type="number"
                    value={dailyLimit}
                    onChange={(e) => setDailyLimit(e.target.value)}
                    className="w-32 px-4 py-2 bg-gray-100 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="1"
                    max="1000"
                  />{" "}
                  <span>Per day</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium mb-1">
                    Prioritize new Leads
                  </h3>
                  <p className="text-sm text-gray-700">
                    Selecting this will give priority to new leads over follow
                    ups.
                  </p>
                </div>
                <div>
                  <input
                    type="checkbox"
                    className="px-4 py-2 bg-gray-100 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="1"
                    max="1000"
                  />{" "}
                  <span>Prioritize new leads</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="">
                  <h3 className="text-lg font-medium mb-1">
                    Prioritize Subsequence Leads
                  </h3>
                  <p className="text-sm text-gray-700">
                    Selecting this will give priority to your subsequences over
                    follow ups. Will be ignored if subsequences are not created.
                  </p>
                </div>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    className="px-4 py-2 bg-gray-100 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="1"
                    max="1000"
                  />{" "}
                  <span className="text-nowrap">
                    Prioritize subsequence leads
                  </span>
                </div>
              </div>
              <p className="text-sm mt-4">
                If you select both options, new leads will be given priority
                first, then subsequences and then follow ups.
              </p>
            </div>

            {/* Auto optimize A/Z Testing */}
            <div className="bg-gray-200 rounded-lg p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-medium mb-1">
                  Auto optimize A/Z Testing
                </h3>
                <p className="text-sm text-gray-700">
                  When using A/Z testing, we will automatically select the best
                  performing variant after a certain number of emails have been
                  sent.
                </p>
              </div>
              <div className="">
                <label htmlFor="" className="block text-sm font-medium mb-1">
                  Choose winning metric
                </label>
                <select
                  value={dailyLimit}
                  onChange={(e) => setDailyLimit(e.target.value)}
                  className="w-[250px] px-4 py-2 bg-gray-100 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Option 1</option>
                  <option>Option 2</option>
                  <option>Option 3</option>
                </select>
              </div>
            </div>

            {/* Insert Unsubscribe Link Header */}
            <div className="bg-gray-200 rounded-lg p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-medium mb-1">
                  Insert Unsubscribe Link Header
                </h3>
                <p className="text-sm text-gray-700">
                  Automatically adds unsubscribe link to email headers for
                  one-click unsubscription.
                </p>
              </div>
              <input
                type="checkbox"
                value={dailyLimit}
                onChange={(e) => setDailyLimit(e.target.value)}
                className="px-4 py-2 bg-gray-100 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="1"
                max="1000"
              />{" "}
              <span>Insert unsubscribe link header</span>
            </div>

            {/* Unsubscribe Leads Behavior */}
            <div className="bg-gray-200 rounded-lg p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-medium mb-1">
                  Unsubscribe Leads Behavior
                </h3>
                <p className="text-sm text-gray-700">
                  Choose whether leads who choose to unsubscribe should be
                  removed from the current campaign or all campaigns.
                </p>
              </div>
              <div className="space-y-3">
                <div>
                  <input
                    type="checkbox"
                    value={dailyLimit}
                    onChange={(e) => setDailyLimit(e.target.value)}
                    className="px-4 py-2 bg-gray-100 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="1"
                    max="1000"
                  />{" "}
                  <span>Current Campaign</span>
                </div>
                <div>
                  <input
                    type="checkbox"
                    value={dailyLimit}
                    onChange={(e) => setDailyLimit(e.target.value)}
                    className="px-4 py-2 bg-gray-100 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="1"
                    max="1000"
                  />{" "}
                  <span>All Campaigns</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Reply Agent */}
        <section id="ai-reply-agent">
          <div className="flex items-center gap-2 mb-4">
            <Bot className="w-5 h-5" />
            <h2 className="text-xl font-semibold">AI Reply Agent</h2>
          </div>
          <div className="bg-gray-200 rounded-lg p-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium mb-1">
                Enable AI Reply Agent for this Campaign
              </h3>
              <p className="text-sm text-gray-700 ">
                AI Reply Agent auto-drafts personalized replies for interested
                leads using your business context - simply review and send.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  !stopOnReply
                    ? "bg-gray-600 text-white"
                    : "bg-gray-100 text-black hover:bg-gray-600"
                }`}
              >
                Disable
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  stopOnReply
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "bg-gray-100 text-black hover:bg-gray-600"
                }`}
              >
                Enable
              </button>
            </div>
          </div>
        </section>

        {/* Deliverability */}
        <section id="deliverability">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Deliverability</h2>
          </div>
          <div className="space-y-4">
            {/* Open Tracking */}
            <div className="bg-gray-200 rounded-lg p-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium mb-1">Open Tracking</h3>
                <p className="text-sm text-gray-700 ">
                  Track your email open rate for this campaign
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    !stopOnReply
                      ? "bg-gray-600 text-white"
                      : "bg-gray-100 text-black hover:bg-gray-600"
                  }`}
                >
                  Disable
                </button>
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    stopOnReply
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : "bg-gray-100 text-black hover:bg-gray-600"
                  }`}
                >
                  Enable
                </button>
              </div>
            </div>
            {/* Link Tracking */}
            <div className="bg-gray-200 rounded-lg p-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium mb-1">Link Tracking</h3>
                <p className="text-sm text-gray-700 ">
                  Track your link click rate for this campaign. Click rate for
                  each link will appear under analytics
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    !stopOnReply
                      ? "bg-gray-600 text-white"
                      : "bg-gray-100 text-black hover:bg-gray-600"
                  }`}
                >
                  Disable
                </button>
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    stopOnReply
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : "bg-gray-100 text-black hover:bg-gray-600"
                  }`}
                >
                  Enable
                </button>
              </div>
            </div>
            {/* Delivery Optimization */}
            <div className="bg-gray-200 rounded-lg p-6 ">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-medium mb-1">
                    Delivery Optimization
                  </h3>
                  <p className="text-sm text-gray-700">
                    Disable HTML and send emails as text-only
                  </p>
                </div>
                <div className="">
                  <select className="w-[250px] px-4 py-2 bg-gray-100 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Option 1</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                  </select>
                </div>
              </div>
              <p className="text-sm mt-4">
                Enabling this will disable open and link tracking.
              </p>
            </div>
            {/* Provider Matching */}
            <div className="bg-gray-200 rounded-lg p-6 ">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-medium mb-1">
                 Provider Matching
                </h3>
                <p className="text-sm text-gray-700">
                  Match your lead's email provider with your mailbox provider for better deliverability.
                </p>
              </div>
              <input
                type="checkbox"
                value={dailyLimit}
                onChange={(e) => setDailyLimit(e.target.value)}
                className="px-4 py-2 bg-gray-100 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="1"
                max="1000"
              />{" "}
              <span>
Enable Provider Matching</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-100 rounded-xl p-4 mt-4">
              <div className="flex-1">
                <h3 className="text-lg font-medium mb-1">
                Strict Provider Matching
                </h3>
                <p className="text-sm text-gray-700">
                 Target Google and Outlook leads only if you have matching mailboxes. Ensure both Google and Outlook mailboxes are added before enabling.
                </p>
              </div>
              <input
                type="checkbox"
                value={dailyLimit}
                onChange={(e) => setDailyLimit(e.target.value)}
                className="px-4 py-2 bg-gray-100 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="1"
                max="1000"
              />{" "}
              <span>
Enable Strict Provider Matching</span>
            </div>
              </div>
            {/* Select Providers to Target */}
            <div className="bg-gray-200 rounded-lg p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-medium mb-1">
                  Select Providers to Target
                </h3>
                <p className="text-sm text-gray-700">
                 Choose which leads to reach out to by their email provider.
                </p>
              </div>
              <div className="space-y-3">
                <div>
                  <input
                    type="checkbox"
                    value={dailyLimit}
                    onChange={(e) => setDailyLimit(e.target.value)}
                    className="px-4 py-2 bg-gray-100 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="1"
                    max="1000"
                  />{" "}
                  <span>
Google</span>
                </div>
                <div>
                  <input
                    type="checkbox"
                    value={dailyLimit}
                    onChange={(e) => setDailyLimit(e.target.value)}
                    className="px-4 py-2 bg-gray-100 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="1"
                    max="1000"
                  />{" "}
                  <span>Others</span>
                </div>
                <div>
                  <input
                    type="checkbox"
                    value={dailyLimit}
                    onChange={(e) => setDailyLimit(e.target.value)}
                    className="px-4 py-2 bg-gray-100 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="1"
                    max="1000"
                  />{" "}
                  <span>Outlook</span>
                </div>
              </div>
            </div>
                        {/* Bounce Protection */}
            <div className="bg-gray-200 rounded-lg p-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium mb-1">Bounce Protection</h3>
                <p className="text-sm text-gray-700 ">
                  Automatically pauses campaigns if the bounce rate exceeds 10%
                </p>
                <p className="mt-4 text-sm">Bounce Protect will only trigger after the first 50 emails in a campaign</p>
              </div>
              <div className="flex gap-2">
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    !stopOnReply
                      ? "bg-gray-600 text-white"
                      : "bg-gray-100 text-black hover:bg-gray-600"
                  }`}
                >
                  Disable
                </button>
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    stopOnReply
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : "bg-gray-100 text-black hover:bg-gray-600"
                  }`}
                >
                  Enable
                </button>
              </div>
            </div>
                        {/* Use Blockquotes */}
            <div className="bg-gray-200 rounded-lg p-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium mb-1">Use Blockquotes</h3>
                <p className="text-sm text-gray-700 ">
                 Include the previous email in the followup email
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    !stopOnReply
                      ? "bg-gray-600 text-white"
                      : "bg-gray-100 text-black hover:bg-gray-600"
                  }`}
                >
                  Disable
                </button>
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    stopOnReply
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : "bg-gray-100 text-black hover:bg-gray-600"
                  }`}
                >
                  Enable
                </button>
              </div>
            </div>
                         {/* Enable Positive Reply Notification */}
            <div className="bg-gray-200 rounded-lg p-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium mb-1">Enable Positive Reply Notification </h3>
                <p className="text-sm text-gray-700 ">
                 IWe'll send you an email notification at your preferred email for all positive replies in this campaign.
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    !stopOnReply
                      ? "bg-gray-600 text-white"
                      : "bg-gray-100 text-black hover:bg-gray-600"
                  }`}
                >
                  Disable
                </button>
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    stopOnReply
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : "bg-gray-100 text-black hover:bg-gray-600"
                  }`}
                >
                  Enable
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Options */}
        <section id="additional-options">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Additional Options</h2>
          </div>
          <div>
                  {/* Automated OOO Rescheduler */}
          <div className="bg-gray-200 rounded-lg p-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium mb-1">
                Automated OOO Rescheduler
              </h3>
              <p className="text-sm text-gray-700 ">
                Our AI will automatically reschedule out-of-office replies for the recipients return


              </p>
            </div>
            <div className="flex gap-2">
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  !stopOnReply
                    ? "bg-gray-600 text-white"
                    : "bg-gray-100 text-black hover:bg-gray-600"
                }`}
              >
                Disable
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  stopOnReply
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "bg-gray-100 text-black hover:bg-gray-600"
                }`}
              >
                Enable
              </button>
            </div>
          </div>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-400">
          <button className="flex items-center gap-2 px-6 py-3 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors">
            <Save className="w-4 h-4" /> Save
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200">
            <Rocket className="w-4 h-4" /> Launch Campaign
          </button>
        </div>
      </div>
    </div>
  );
};

export default Options;
