import React from "react";
import { useOnboardingStore } from "@/store/useOnboardingStore";

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: "$0 / month",
    note: "",
    buttonLabel: "Start Free Trial",
    features: [
      "All core dashboards",
      "3 integrations",
      "Basic AI insights",
      "1 workspace",
      "Up to 5 team members",
    ],
  },
  {
    id: "launch",
    name: "Launch",
    price: "$29 / month",
    note: "Most Popular",
    buttonLabel: "Select Growth",
    features: [
      "Unlimited dashboards",
      "10 integrations",
      "Advanced AI insights",
      "Intelligent alerts",
      "10 team members",
    ],
  },
  {
    id: "scale",
    name: "Scale",
    price: "$129 / mo",
    note: "",
    buttonLabel: "Select Pro",
    features: [
      "Everything in Growth",
      "Unlimited integrations",
      "Multi-workspace",
      "Predictive analytics",
      "Priority support",
    ],
  },
];

const PlanStep = () => {
  const { selectedPlan, setSelectedPlan, nextStep } = useOnboardingStore();

  const handleContinue = () => {
    // yahan API call / save etc bhi kar sakte ho
    console.log("Selected plan:", selectedPlan);
    nextStep();
  };

  return (
    <div className="relative min-h-[calc(100vh-90px)] flex items-center justify-center bg-[#f7f7fb] px-4">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.06)] px-6 py-10 sm:px-10 lg:px-16">
        {/* Heading */}
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-extrabold text-gray-900 md:text-3xl">
            Choose Your Plan
          </h2>
        </div>

        {/* Cards */}
        <div className="grid gap-6 mb-10 md:grid-cols-3">
          {PLANS.map((plan) => {
            const isActive = selectedPlan === plan.id;

            return (
              <div
                key={plan.id}
                className={`
                  relative flex flex-col h-full rounded-2xl border bg-white px-6 py-6
                  cursor-pointer transition
                  ${
                    isActive
                      ? "border-purple-500 shadow-[0_0_0_1px_rgba(128,90,213,0.2)]"
                      : "border-gray-200 hover:border-purple-300 hover:shadow-sm"
                  }
                `}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {/* Most popular badge */}
                {plan.note && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-purple-500 px-4 py-1 text-[11px] font-semibold text-white shadow-md">
                    {plan.note}
                  </div>
                )}

                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {plan.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">{plan.price}</p>
                </div>

                <ul className="flex-1 mb-6 space-y-2 text-sm text-gray-700">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span className="mt-[3px] text-green-500">✔</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA button inside card */}
                <button
                  type="button"
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`
                    mt-auto w-full rounded-lg border px-4 py-2 text-sm font-semibold transition
                    ${
                      isActive
                        ? "bg-purple-600 text-white border-purple-600 hover:bg-purple-700"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }
                  `}
                >
                  {plan.buttonLabel}
                </button>
              </div>
            );
          })}
        </div>

        {/* Continue button */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleContinue}
            className="w-full md:w-64 rounded-full bg-purple-600 py-2.5 text-sm font-semibold text-white
                       shadow-md hover:bg-purple-700 transition"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanStep;
