import React from "react";
import AuthSlider from "./AuthSlider.jsx";

const LayoutAuth = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row p-0 py-[35px] px-[15px] md:p-0 md:min-h-auto min-h-screen auth-layout">
      <p className="font-inter font-semibold text-base text-[#232323] logo-mobile md:mb-4 mb-2">
        Prime Meridian
      </p>
      <AuthSlider />
      <div className="w-full md:w-[70%] flex flex-col items-center min-h-auto md:min-h-screen auth-form">
        <div className="w-[50%] mt-[5%] hidden md:block">
          <p className="font-inter font-semibold text-base text-[#232323] logo-pc">
            Prime Meridian
          </p>
        </div>
        {children}
      </div>
    </div>
  );
};
export default LayoutAuth;
