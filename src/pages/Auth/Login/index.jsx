// src/pages/auth/LoginPage.jsx
import React from "react";
import { Formik } from "formik";
import { loginSchema } from "@/validation/authSchemas";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLogin } from "@/hooks/useAuth";

const loginFields = [
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

const LoginPage = () => {
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await loginMutation.mutateAsync({
        email: values.email,
        password: values.password,
      });

      if (response.success) {
        toast.success(response.message || "Login successful!");
        // Redirect to dashboard or home
        navigate("/dashboard");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please check your credentials.";
      toast.error(errorMessage);
      console.error("Login error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {/* Heading + link */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 md:text-4xl">
          Welcome Back
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="font-semibold text-purple-600">
            Sign Up
          </Link>
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
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
            {/* Dynamic fields */}
            {loginFields.map((field) => (
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
                  autoComplete={field.name}
                  placeholder={field.placeholder}
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

            {/* Forgot password link */}
            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-xs text-purple-600 hover:underline"
              >
                Forgot Password
              </Link>
            </div>

            {/* Login button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full rounded-xl bg-purple-600 py-2.5 text-sm font-semibold text-white
                         shadow-md hover:bg-purple-700 transition disabled:opacity-70"
            >
              {isSubmitting ? "Logging in..." : "Login"}
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

export default LoginPage;
