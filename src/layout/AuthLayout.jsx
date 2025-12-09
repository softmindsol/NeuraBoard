// src/layouts/AuthLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";

// path apne project ke mutabik adjust kar lena
import { AuthBg, AuthImg, Authlogo } from "../assets/svgs/index";

const AuthLayout = () => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-white lg:flex-row">
      {/* LEFT: Form side (50%) */}
      <div
        className="
          w-full lg:w-1/2
          bg-white
          flex flex-col
          px-6 sm:px-10
          lg:pl-[130px] lg:pr-[120px]
        "
      >
        {/* Top logo - center + margin-top 84px */}
        <div className="flex justify-center mt-[84px] mb-10">
          <img
            src={Authlogo}
            alt="Logo"
            className="h-24 w-28"
          />
        </div>

        {/* Centered form (Outlet) */}
        <div className="flex items-center flex-1">
          <Outlet />
        </div>
      </div>

     {/* RIGHT: Illustration side (50%) */}
<div className="relative hidden w-full overflow-hidden md:block lg:w-1/2">
  
  {/* FULL BACKGROUND IMAGE */}
  <img
    src={AuthBg}
    alt="background"
    className="absolute inset-0 object-cover w-full h-full"
  />

  {/* MAIN MOCKUP IMAGE */}
  <div className="relative flex items-center justify-center h-full px-4 sm:px-10 lg:px-16">
    <img
      src={AuthImg}
      alt="Dashboard preview"
      className="max-h-[60%] w-auto"
    />
  </div>
</div>

    </div>
  );
};

export default AuthLayout;
