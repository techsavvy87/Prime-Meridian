import React from "react";
import Logo from "../assets/imgs/Logo.png";

const LayoutOnboarding = ({ children }) => {
  return (
    <div className="onboard-layout">
      <header className="border-b border-[#dbdbdb] md:ml-25 md:mr-25 ml-0 mr-0">
        <div className="onboard-header-pc relative mx-auto py-6">
          <div className="flex items-center">
            <p className="font-inter font-semibold text-base text-black">
              Prime Meridian
            </p>
          </div>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <h1 className="text-[22px] font-semibold text-[#717171]">
              Setting up your account
            </h1>
          </div>
        </div>
        <div className="onboard-header-sp flex pt-[30px] pb-[20px]">
          <p className="font-inter font-semibold text-base text-black">
            Prime Meridian
          </p>
          <p className="font-inter font-semibold text-base text-[#717171]">
            Setting up your account
          </p>
        </div>
      </header>
      {children}
    </div>
  );
};
export default LayoutOnboarding;
