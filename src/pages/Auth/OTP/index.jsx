import React, { useRef } from "react";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { verificationSchema } from "@/validation/authSchemas";

const otpFields = ["d1", "d2", "d3", "d4"];

const VerificationCode = () => {
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  const initialValues = { d1: "", d2: "", d3: "", d4: "" };

  const handleSubmit = async (values, { setSubmitting }) => {
    const code = `${values.d1}${values.d2}${values.d3}${values.d4}`;
    try {
      console.log("Verification code:", code);
      // 👉 yahan actual verify API call karo
      // await verifyOtpApi(code);

      // ✅ success ke baad login page par redirect
      navigate("/"); // agar login route /auth/login hai to usko use karo
    } catch (err) {
      console.error(err);
      // optional: error toast waghera
    } finally {
      setSubmitting(false);
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
                onClick={() => console.log("Resend code")}
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

export default VerificationCode;
