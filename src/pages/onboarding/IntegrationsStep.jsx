import React, { useState } from "react";
import { useOnboardingStore } from "@/store/useOnboardingStore";
import IntegrationCard from "@/components/onboarding/IntegrationCard";

const INTEGRATIONS = [
  {
    id: "ga4",
    name: "Google Analytics 4",
    description: "Track website traffic and user behavior",
    icon: "📊",
    iconBg: "#E5F3FF",
  },
  {
    id: "stripe",
    name: "Stripe",
    description: "Monitor payments and revenue",
    icon: "💳",
    iconBg: "#E6F0FF",
  },
  {
    id: "hubspot",
    name: "HubSpot",
    description: "Sync CRM and marketing data",
    icon: "🎯",
    iconBg: "#FFEFF2",
  },
  {
    id: "fb-ads",
    name: "Facebook Ads",
    description: "Track ad performance and ROI",
    icon: "📱",
    iconBg: "#E9F6E9",
  },
  {
    id: "shopify",
    name: "Shopify",
    description: "E-commerce sales analytics",
    icon: "🛍️",
    iconBg: "#FFF4E5",
  },
  {
    id: "sql-db",
    name: "SQL Databases",
    description: "Connect to MySQL, PostgreSQL, etc.",
    icon: "🗄️",
    iconBg: "#F2F2FF",
  },
  {
    id: "tiktok-ads",
    name: "TikTok Ads",
    description: "Track ad performance and ROI",
    icon: "🎵",
    iconBg: "#E6F9FF",
  },
];

const IntegrationsStep = () => {
  const { nextStep } = useOnboardingStore();
  const [connected, setConnected] = useState([]);

  const toggleIntegration = (id) => {
    setConnected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    console.log("Connected tools:", connected);
    nextStep();
  };

  const handleSkip = () => {
    nextStep();
  };

  return (
    <div className="relative min-h-[calc(100vh-90px)] flex items-center justify-center bg-[#f7f7fb] px-4">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.06)] px-6 py-10 sm:px-10 lg:px-16">
        {/* Heading */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-extrabold text-gray-900 md:text-3xl">
            Connect Your Tools
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid gap-5 mb-10 sm:grid-cols-2 lg:grid-cols-3">
          {INTEGRATIONS.map((tool) => (
            <IntegrationCard
              key={tool.id}
              name={tool.name}
              description={tool.description}
              icon={tool.icon}
              iconBg={tool.iconBg}
              isConnected={connected.includes(tool.id)}
              onClick={() => toggleIntegration(tool.id)}
            />
          ))}
        </div>

        {/* Footer buttons */}
        <div className="flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={handleContinue}
            className="w-full md:w-64 rounded-full bg-purple-600 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-purple-700 transition"
          >
            Continue
          </button>

          <button
            type="button"
            onClick={handleSkip}
            className="mt-1 text-xs font-medium text-gray-500 hover:text-gray-700"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntegrationsStep;
