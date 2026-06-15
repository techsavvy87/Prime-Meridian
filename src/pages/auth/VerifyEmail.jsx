import React, { useState, useEffect } from "react";
import toast, { toastConfig } from "react-simple-toasts";
import CodeInput from "../../components/CodeInput";
import { useNavigate } from "react-router-dom";

toastConfig({ theme: "failure", position: "top-right" });

const VerifyEmail = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const onSubmitCode = (enteredCode) => {
    setCode(enteredCode);
  };
  const signupEmail = localStorage.getItem("signupEmail");
  const onClickVerifyBtn = () => {
    if (code.length === 6) {
      navigate("/set-password");
    } else {
      toast("Please enter a valid 6-digit code.");
    }
  };
  useEffect(() => {}, []);
  return (
    <div className="w-full md:w-[50%] mt-[5%]">
      <p className="text-left font-lora font-semibold md:text-3xl text-2xl md:mt-16 mt-2 text-[#1C1C1C]">
        Confirm your email
      </p>
      <p className="text-left font-lora md:text-lg text-[14px] mt-2 text-[#7c7c7c]">
        Enter the code to confirm your email address{" "}
        <span className="font-bold text-black">{signupEmail}</span> and continue
        your registration.
      </p>
      <CodeInput callback={onSubmitCode} />
      <button
        type="button"
        className="cursor-pointer tracking-wide font-medium text-white mt-4 text-base rounded-lg w-full p-2.5 text-center bg-[#00584E]"
        onClick={onClickVerifyBtn}
      >
        Confirm
      </button>
      <p className="text-center mt-5 text-[14px] font-medium text-[#717171] cursor-pointer">
        Didn't receive the code?{" "}
        <span className="underline text-[#00584E]">Resend in 30s</span>
      </p>
    </div>
  );
};

export default VerifyEmail;
