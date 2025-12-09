import React from "react";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { signupSchema } from "@/validation/authSchemas";
import { useSignup } from "@/hooks/useAuth";

const signupFields = [
  {
    name: "name",
    label: "Name",
    type: "name",
    placeholder: "Enter your name",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
  },
];

const SignUp = () => {
  const navigate = useNavigate();
  const signupMutation = useSignup();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    termsAccepted: false,
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await signupMutation.mutateAsync({
        name: values.name,
        email: values.email,
        password: values.password,
        termsAccepted: values.termsAccepted,
      });

      if (response.success) {
        toast.success(response.message || "Account created successfully!");
        // Store email in localStorage as backup
        localStorage.setItem("verifyEmail", values.email);
        // Pass email via navigation state
        navigate("/verify", { state: { email: values.email } });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to create account. Please try again.";
      toast.error(errorMessage);
      console.error("Signup error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {/* Heading + link */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 md:text-4xl">
          Create Account
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/" className="font-semibold text-purple-600">
            Login
          </Link>
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={signupSchema}
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
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Dynamic fields (Email, Password) */}
            {signupFields.map((field) => (
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
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values[field.name]}
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

            {/* Terms checkbox */}
            <div className="flex items-start gap-2 text-xs">
              <input
                id="termsAccepted"
                name="termsAccepted"
                type="checkbox"
                checked={values.termsAccepted}
                onChange={(e) =>
                  setFieldValue("termsAccepted", e.target.checked)
                }
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <label
                htmlFor="termsAccepted"
                className="leading-snug text-gray-600"
              >
                Agree to our{" "}
                <button
                  type="button"
                  className="text-purple-600 underline underline-offset-2"
                >
                  Terms of Service
                </button>{" "}
                and{" "}
                <button
                  type="button"
                  className="text-purple-600 underline underline-offset-2"
                >
                  Privacy Policy
                </button>
              </label>
            </div>
            {errors.termsAccepted && touched.termsAccepted && (
              <p className="-mt-3 text-xs text-red-500">
                {errors.termsAccepted}
              </p>
            )}

            {/* Sign Up button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full rounded-xl bg-purple-600 py-2.5 text-sm font-semibold text-white
                         shadow-md hover:bg-purple-700 transition disabled:opacity-70"
            >
              {isSubmitting ? "Creating account..." : "Sign Up"}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 my-4">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400 uppercase">or</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Google button */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <img
                src="/images/google-icon.svg"
                alt="Google"
                className="w-4 h-4"
              />
              Continue with Google
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
