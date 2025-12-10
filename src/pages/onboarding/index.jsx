import React from "react";
import OnboardingStepper from "@/components/onboarding/OnboardingStepper";
import CompanyInfoStep from "./CompanyInfoStep";
import PlanStep from "./PlanStep";
import TeamStep from "./TeamStep";
import IntegrationsStep from "./IntegrationsStep";
import PersonalizeStep from "./PersonalizeStep";   // 🔹 NEW
import FinishStep from "./FinishStep";             // 🔹 NEW
import { STEPS, useOnboardingStore } from "@/store/useOnboardingStore";

const OnboardingPage = () => {
  const { currentStepIndex } = useOnboardingStore();
  const currentKey = STEPS[currentStepIndex].key;

  const renderStep = () => {
    switch (currentKey) {
      case "companyInfo":
        return <CompanyInfoStep />;
      case "plan":
        return <PlanStep />;
      case "team":
        return <TeamStep />;
      case "integrations":
        return <IntegrationsStep />;
      case "personalize":               // 🔹
        return <PersonalizeStep />;
      case "finish":                    // 🔹
        return <FinishStep />;
      default:
        return (
          <div className="flex items-center justify-center h-[60vh]">
            <p className="text-gray-500">
              {STEPS[currentStepIndex].label} step coming soon.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f3f8]">
      <OnboardingStepper />
      {renderStep()}
    </div>
  );
};

export default OnboardingPage;
