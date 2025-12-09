// src/routes/index.jsx
import { useRoutes } from "react-router-dom";
import PATHS, { PUBLIC_ROUTES } from "./path";

import AppLayout from "../layout/AppLayout";
import AuthLayout from "../layout/AuthLayout";          // 🔹 naya layout

import ClientsList from "../pages/SuperAdminDashboard/Clients";
import Dashboard from "../pages/SuperAdminDashboard/Dashboard";
import InventoryManagement from "@/pages/SuperAdminDashboard/Inventory";

import Login from "../pages/Auth/Login";                // tumhara Login/index.jsx
import SignUp from "@/pages/Auth/SignUp";
import VerificationCode from "@/pages/Auth/OTP";
import ForgotPassword from "@/pages/Auth/ForgotPassword";
import ResetPassword from "@/pages/Auth/ResetPassword";

const routes = [
  // ---------- AUTH / PUBLIC (Login, Signup, Forgot...) ----------
  {
    path: PUBLIC_ROUTES.login,          
    element: <AuthLayout />,            
    children: [
      {
        index: true,                    
        element: <Login />,
      },
      // yahan baad mein:
     { path: "signup", element: <SignUp /> },
           { path: "verify", element: <VerificationCode /> }, 
             { path: "forgot-password", element: <ForgotPassword /> },
      { path: "reset-password", element: <ResetPassword /> },

      // { path: "forgot-password", element: <ForgotPassword /> },
    ],
  },

  // ---------- PRIVATE / APP LAYOUT ----------
  {
    element: <AppLayout />,             
    children: [
      {
        path: PATHS.clients,
        element: <ClientsList />,
      },
      {
        path: PATHS.dashboard,
        element: <Dashboard />,
      },
      {
        path: PATHS.inventory,
        element: <InventoryManagement />,
      },
    ],
  },
];

const Routes = () => {
  const routing = useRoutes(routes);
  return routing;
};

export default Routes;
