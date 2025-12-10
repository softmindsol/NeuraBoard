import React from "react";
import { useOnboardingStore } from "@/store/useOnboardingStore";

const WORKSPACES = [
  {
    id: "exclusive",
    label: "Exclusive",
    icon: "📊",
  },
  {
    id: "marketing",
    label: "Marketing",
    icon: "📈",
  },
  {
    id: "finance",
    label: "Finance",
    icon: "💳",
  },
  {
    id: "product",
    label: "Product",
    icon: "📦",
  },
  {
    id: "sales",
    label: "Sales",
    icon: "👥",
  },
];

const PersonalizeStep = () => {
  const {
    workspaceType,
    setWorkspaceType,
    workspacePrefs,
    setWorkspacePrefs,
    nextStep,
  } = useOnboardingStore();

  const toggles = [
    {
      id: "aiInsights",
      title: "Enable AI Insights",
      description: "Get intelligent recommendations based on your data patterns",
    },
    {
      id: "intelligentAlerts",
      title: "Enable Intelligent Alerts",
      description:
        "Receive notifications about anomalies and important changes",
    },
  ];

  const handleToggle = (id) => {
    setWorkspacePrefs({ [id]: !workspacePrefs[id] });
  };

  const handleContinue = () => {
    console.log("Workspace type:", workspaceType);
    console.log("Workspace prefs:", workspacePrefs);
    nextStep();
  };

  return (
    <div className="relative min-h-[calc(100vh-90px)] flex items-center justify-center bg-[#f7f7fb] px-4">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.06)] px-6 py-10 sm:px-10 lg:px-16">
        {/* Heading */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-extrabold text-gray-900 md:text-3xl">
            Customize Your Workspace
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {WORKSPACES.map((ws) => {
            const active = workspaceType === ws.id;
            return (
              <button
                key={ws.id}
                type="button"
                onClick={() => setWorkspaceType(ws.id)}
                className="flex flex-col items-center gap-2 focus:outline-none"
              >
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl border text-2xl transition
                    ${
                      active
                        ? "border-purple-500 bg-purple-50 text-purple-600"
                        : "border-gray-200 bg-white text-purple-400"
                    }`}
                >
                  {ws.icon}
                </div>
                <span
                  className={`text-xs font-semibold ${
                    active ? "text-purple-600" : "text-gray-500"
                  }`}
                >
                  {ws.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Toggles */}
        <div className="mb-8 space-y-4">
          {toggles.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-2xl border border-gray-200 bg-[#fbfbfe] px-5 py-4"
            >
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {item.title}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  {item.description}
                </p>
              </div>

              {/* custom toggle */}
              <button
                type="button"
                onClick={() => handleToggle(item.id)}
                className={`
                  relative inline-flex h-6 w-11 items-center rounded-full
                  transition-colors
                  ${
                    workspacePrefs[item.id]
                      ? "bg-purple-500"
                      : "bg-gray-300"
                  }
                `}
              >
                <span
                  className={`
                    inline-block h-5 w-5 transform rounded-full bg-white shadow
                    transition-transform
                    ${
                      workspacePrefs[item.id]
                        ? "translate-x-5"
                        : "translate-x-1"
                    }
                  `}
                />
              </button>
            </div>
          ))}
        </div>

        {/* Continue button */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleContinue}
            className="w-full md:w-64 rounded-full bg-purple-600 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-purple-700 transition"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalizeStep;
