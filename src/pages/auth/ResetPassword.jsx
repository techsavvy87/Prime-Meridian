import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { toastConfig } from "react-simple-toasts";

toastConfig({ theme: "failure", position: "top-right" });

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const onClickResetBtn = () => {
    if (!email) {
      toast("Please enter your email.");
      return;
    } else {
      navigate("/verify-password");
    }
  };
  return (
    <div className="w-full md:w-[50%] mt-[5%]">
      <p className="text-left font-lora font-semibold md:text-3xl text-2xl md:mt-16 mt-2 text-[#1C1C1C]">
        Reset password
      </p>
      <p className="text-left font-lora md:text-lg text-[14px] mt-2 text-[#7c7c7c]">
        Enter your email to reset password
      </p>
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-[#FDFDFB] mt-10 bg-primary-color border border-[#d9d9d9] text-gray-900 text-base rounded-lg focus:outline-none focus:ring-0 block w-full p-2.5 "
        placeholder="Email"
        required
        autoComplete="off"
      />
      <button
        type="button"
        className="tracking-wide font-medium text-white mt-4 text-base rounded-lg w-full p-2.5 text-center bg-[#00584E] cursor-pointer"
        onClick={onClickResetBtn}
      >
        Reset
      </button>
      <p className="text-base font-medium text-[#00584E] text-center mt-5 underline">
        <Link to="/login">Back</Link>
      </p>
    </div>
  );
};

export default ResetPassword;
