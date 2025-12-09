import React from "react";
import { Formik } from "formik";
import { forgotPasswordSchema } from "@/validation/authSchemas";

const forgotFields = [
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
  },
];

const ForgotPassword = () => {
  const initialValues = { email: "" };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Forgot password email:", values.email);
    // yahan API call karo (send reset link)
    setTimeout(() => setSubmitting(false), 400);
  };

  return (
    <div className="w-full">
      {/* Heading + description */}
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 md:text-4xl">
          Forgot Password
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          We&apos;ll send you a link to your email to reset your password.
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={forgotPasswordSchema}
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
          <form onSubmit={handleSubmit} className="space-y-6">
            {forgotFields.map((field) => (
              <div key={field.name} className="space-y-1">
                <label
                  htmlFor={field.name}
                  className="block text-sm font-medium text-gray-700"
                >
                  {field.label}
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  autoComplete={field.name}
                  value={values[field.name]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none transition
                    bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200
                    ${
                      errors[field.name] && touched[field.name]
                        ? "border-red-500"
                        : "border-gray-200"
                    }`}
                />
                {errors[field.name] && touched[field.name] && (
                  <p className="text-xs text-red-500">
                    {errors[field.name]}
                  </p>
                )}
              </div>
            ))}

            {/* Send Link button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full rounded-xl bg-purple-600 py-2.5 text-sm font-semibold text-white
                         shadow-md hover:bg-purple-700 transition disabled:opacity-70"
            >
              {isSubmitting ? "Sending..." : "Send Link"}
            </button>

            {/* Resend text */}
            <p className="mt-3 text-xs text-gray-500">
              Didn&apos;t get an email?{" "}
              <button
                type="button"
                onClick={() => console.log("Resend email")}
                className="font-semibold text-purple-600"
              >
                Resend
              </button>
            </p>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default ForgotPassword;
