// src/validation/authSchemas.js
import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const signupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  termsAccepted: Yup.boolean().oneOf(
    [true],
    "You must agree to the Terms of Service and Privacy Policy"
  ),
});

export const verificationSchema = Yup.object().shape({
  d1: Yup.string().matches(/^\d$/, "Required").required("Required"),
  d2: Yup.string().matches(/^\d$/, "Required").required("Required"),
  d3: Yup.string().matches(/^\d$/, "Required").required("Required"),
  d4: Yup.string().matches(/^\d$/, "Required").required("Required"),
});

// 🔹 Forgot Password
export const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
});

// 🔹 Reset Password
export const resetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});
