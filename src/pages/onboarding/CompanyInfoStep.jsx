// src/pages/onboarding/CompanyInfoStep.jsx
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useOnboardingStore } from "@/store/useOnboardingStore";

const companyInfoSchema = Yup.object().shape({
  companyName: Yup.string()
    .trim()
    .required("Company name is required"),
  industry: Yup.string().trim().nullable(),
  companySize: Yup.string().trim().nullable(),
});

const CompanyInfoStep = () => {
  const { nextStep } = useOnboardingStore();

  const initialValues = {
    companyName: "",
    industry: "",
    companySize: "",
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Company info:", values);
    // TODO: save to backend / global state as needed
    setTimeout(() => {
      setSubmitting(false);
      nextStep(); // go to Plan step
    }, 300);
  };

  const industries = [
    "Technology",
    "Marketing",
    "Finance",
    "Healthcare",
    "Retail",
  ];
  const companySizes = ["1-10", "11-50", "51-200", "201-500", "500+"];

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center bg-[#f7f7fb] overflow-hidden">
      {/* optional bg pattern left / right – reuse your auth BG image if you want */}
      {/* <img src={PatternImg} ... /> */}

      <div className="max-w-xl w-full bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.06)] px-6 py-10 sm:px-10">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-extrabold text-gray-900 md:text-3xl">
            Let&apos;s Get To Know Your
            <br />
            Business
          </h2>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={companyInfoSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Company Name */}
              <div className="space-y-1">
                <label
                  htmlFor="companyName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Company Name
                </label>
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  placeholder="e.g. Apex Labs"
                  value={values.companyName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none transition
                    bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200
                    ${
                      errors.companyName && touched.companyName
                        ? "border-red-500"
                        : "border-gray-200"
                    }`}
                />
                {errors.companyName && touched.companyName && (
                  <p className="text-xs text-red-500">{errors.companyName}</p>
                )}
              </div>

              {/* Industry */}
              <div className="space-y-1">
                <label
                  htmlFor="industry"
                  className="block text-sm font-medium text-gray-700"
                >
                  Industry <span className="text-gray-400">(optional)</span>
                </label>
                <select
                  id="industry"
                  name="industry"
                  value={values.industry}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                >
                  <option value="">Select an industry</option>
                  {industries.map((ind) => (
                    <option key={ind} value={ind}>
                      {ind}
                    </option>
                  ))}
                </select>
              </div>

              {/* Company Size */}
              <div className="space-y-1">
                <label
                  htmlFor="companySize"
                  className="block text-sm font-medium text-gray-700"
                >
                  Company Size{" "}
                  <span className="text-gray-400">(optional)</span>
                </label>
                <select
                  id="companySize"
                  name="companySize"
                  value={values.companySize}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                >
                  <option value="">Select company size</option>
                  {companySizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              {/* Continue button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-full bg-purple-600 py-2.5 text-sm font-semibold text-white
                             shadow-md hover:bg-purple-700 transition disabled:opacity-70"
                >
                  {isSubmitting ? "Saving..." : "Continue"}
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CompanyInfoStep;
