// src/components/onboarding/OnboardingStepper.jsx
import React from "react";
import { STEPS, useOnboardingStore } from "@/store/useOnboardingStore";

const OnboardingStepper = () => {
  const { currentStepIndex, setStep } = useOnboardingStore();

  return (
    <div className="w-full py-6 bg-white shadow-sm">
      <div className="max-w-5xl mx-auto">
        <div className="relative flex items-center justify-between">
          {/* Grey line behind */}
          <div className="absolute left-0 right-0 h-[3px] bg-gray-200 top-1/2 -translate-y-1/2" />

          {STEPS.map((step, index) => {
            const isActive = index === currentStepIndex;
            const isCompleted = index < currentStepIndex;

            const circleInner =
              "flex items-center justify-center h-8 w-8 rounded-full text-xs font-semibold transition";

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setStep(index)}
                className="relative z-10 flex flex-col items-center gap-2 focus:outline-none"
              >
                {/* Circle */}
                <div
                  className={`
                    flex items-center justify-center
                    h-10 w-10 rounded-full
                    ${
                      isActive || isCompleted
                        ? "bg-gradient-to-tr from-purple-500 to-purple-700"
                        : "bg-gray-300"
                    }
                  `}
                >
                  <div
                    className={`
                      ${circleInner}
                      ${
                        isCompleted
                          ? "bg-purple-600 text-white"
                          : isActive
                          ? "bg-white text-purple-600"
                          : "bg-gray-100 text-gray-500"
                      }
                    `}
                  >
                    {isCompleted ? "✓" : step.id}
                  </div>
                </div>

                {/* Label pill */}
                <div
                  className={`
                    mt-1 px-4 py-1 rounded-full text-xs font-medium shadow-sm
                    ${
                      isActive || isCompleted
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 text-gray-400"
                    }
                  `}
                >
                  {step.label}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OnboardingStepper;
