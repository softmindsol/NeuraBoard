import React, { useRef, useEffect, useState } from "react";
import { Formik } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { verificationSchema } from "@/validation/authSchemas";
import { useVerifyOTP, useResendOTP } from "@/hooks/useAuth";

const otpFields = ["d1", "d2", "d3", "d4"];

const VerificationCode = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const inputRefs = useRef([]);
  const [email, setEmail] = useState("");

  const verifyOTPMutation = useVerifyOTP();
  const resendOTPMutation = useResendOTP();

  // Get email from navigation state or localStorage
  useEffect(() => {
    const emailFromState = location.state?.email;
    const emailFromStorage = localStorage.getItem("verifyEmail");
    
    if (emailFromState) {
      setEmail(emailFromState);
    } else if (emailFromStorage) {
      setEmail(emailFromStorage);
    } else {
      // No email found, redirect to signup
      toast.error("Please sign up first");
      navigate("/signup");
    }
  }, [location, navigate]);

  const initialValues = { d1: "", d2: "", d3: "", d4: "" };

  const handleSubmit = async (values, { setSubmitting }) => {
    const otp = `${values.d1}${values.d2}${values.d3}${values.d4}`;
    
    if (!email) {
      toast.error("Email not found. Please sign up again.");
      navigate("/signup");
      return;
    }

    try {
      const response = await verifyOTPMutation.mutateAsync({
        email,
        otp,
      });

      if (response.success) {
        toast.success(response.message || "Email verified successfully!");
        // Clear stored email
        localStorage.removeItem("verifyEmail");
        // Redirect to login or dashboard
        navigate("/");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Invalid verification code. Please try again.";
      toast.error(errorMessage);
      console.error("Verification error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleResendOTP = async () => {
    if (!email) {
      toast.error("Email not found. Please sign up again.");
      return;
    }

    try {
      const response = await resendOTPMutation.mutateAsync({ email });
      if (response.success) {
        toast.success(response.message || "Verification code resent!");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to resend code. Please try again.";
      toast.error(errorMessage);
    }
  };

  const handleOtpChange = (e, index, setFieldValue) => {
    const value = e.target.value.replace(/\D/g, ""); // only digits
    const field = otpFields[index];

    if (value.length === 0) {
      setFieldValue(field, "");
      return;
    }

    const digit = value[value.length - 1];
    setFieldValue(field, digit);

    if (index < otpFields.length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index, values) => {
    if (e.key === "Backspace" && !values[otpFields[index]] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="w-full">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 md:text-4xl">
          Verification code
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Enter the 4-digit verification code we&apos;ve sent to your email.
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={verificationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* OTP boxes */}
            <div className="flex gap-4">
              {otpFields.map((field, index) => (
                <input
                  key={field}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={values[field]}
                  onChange={(e) => handleOtpChange(e, index, setFieldValue)}
                  onKeyDown={(e) => handleKeyDown(e, index, values)}
                  className={`
                    w-16 h-16 md:w-20 md:h-20
                    text-center text-2xl font-semibold
                    rounded-2xl border-2 outline-none transition
                    ${
                      values[field]
                        ? "border-purple-600 text-purple-700"
                        : "border-gray-200 text-gray-900"
                    }
                    focus:border-purple-600 focus:ring-2 focus:ring-purple-200
                  `}
                />
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3 mt-4 sm:flex-row">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="
                  w-full sm:w-auto
                  px-6 py-2.5 text-sm font-semibold rounded-full
                  border border-gray-300 bg-white text-gray-700
                  hover:bg-gray-50
                "
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="
                  w-full sm:w-auto
                  px-8 py-2.5 text-sm font-semibold rounded-full
                  bg-purple-600 text-white
                  shadow-md hover:bg-purple-700
                  disabled:opacity-70
                "
              >
                {isSubmitting ? "Verifying..." : "Verify"}
              </button>
            </div>

            {(errors.d1 || errors.d2 || errors.d3 || errors.d4) &&
              (touched.d1 || touched.d2 || touched.d3 || touched.d4) && (
                <p className="text-xs text-red-500">
                  Please enter all 4 digits to verify your code.
                </p>
              )}

            <p className="mt-4 text-xs text-gray-500">
              Didn&apos;t get a code?{" "}
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={resendOTPMutation.isPending}
                className="font-semibold text-purple-600 disabled:opacity-50"
              >
                {resendOTPMutation.isPending ? "Sending..." : "Resend"}
              </button>
            </p>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default VerificationCode;
