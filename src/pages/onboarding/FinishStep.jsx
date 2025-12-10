import React from "react";
import { useNavigate } from "react-router-dom";
import { useOnboardingStore } from "@/store/useOnboardingStore";
import PATHS from "@/routes/path";

const FinishStep = () => {
  const navigate = useNavigate();
  const { reset } = useOnboardingStore();

  const handleContinue = () => {
    // onboarding reset + dashboard redirect
    reset();
    navigate(PATHS.dashboard); // "/dashboard"
  };

  return (
    <div className="relative min-h-[calc(100vh-90px)] flex items-center justify-center bg-[#f7f7fb] px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.06)] px-6 py-10 sm:px-10 lg:px-12 text-center">
        {/* Green badge */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#3ddc4a]">
          <span className="text-4xl text-white">✓</span>
        </div>

        <h2 className="mb-2 text-2xl font-extrabold text-gray-900">
          You&apos;re All Set!
        </h2>
        <p className="mb-8 text-sm text-gray-500">
          Your workspace has been created.
        </p>

        <button
          type="button"
          onClick={handleContinue}
          className="w-full rounded-full bg-purple-600 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-purple-700 transition"
        >
          Continue to NeuraBoard &rarr;
        </button>
      </div>
    </div>
  );
};

export default FinishStep;
