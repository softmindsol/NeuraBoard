import { create } from "zustand";

export const STEPS = [
  { id: 1, key: "companyInfo", label: "Company Info" },
  { id: 2, key: "plan", label: "Plan" },
  { id: 3, key: "team", label: "Team" },
  { id: 4, key: "integrations", label: "Integrations" },
  { id: 5, key: "personalize", label: "Personalize" },
  { id: 6, key: "finish", label: "Finish" },
];

export const useOnboardingStore = create((set, get) => ({
  currentStepIndex: 0,
  steps: STEPS,

  selectedPlan: "starter",
  setSelectedPlan: (planId) => set({ selectedPlan: planId }),

  // 🔹 personalization
  workspaceType: "exclusive",
  workspacePrefs: {
    aiInsights: true,
    intelligentAlerts: false,
  },
  setWorkspaceType: (type) => set({ workspaceType: type }),
  setWorkspacePrefs: (prefs) =>
    set((state) => ({
      workspacePrefs: { ...state.workspacePrefs, ...prefs },
    })),

  setStep: (index) =>
    set((state) => ({
      currentStepIndex:
        index < 0
          ? 0
          : index >= state.steps.length
          ? state.steps.length - 1
          : index,
    })),

  nextStep: () =>
    set((state) => ({
      currentStepIndex: Math.min(
        state.currentStepIndex + 1,
        state.steps.length - 1
      ),
    })),

  prevStep: () =>
    set((state) => ({
      currentStepIndex: Math.max(state.currentStepIndex - 1, 0),
    })),

  reset: () =>
    set({
      currentStepIndex: 0,
      selectedPlan: "starter",
      workspaceType: "exclusive",
      workspacePrefs: {
        aiInsights: true,
        intelligentAlerts: false,
      },
    }),
}));
