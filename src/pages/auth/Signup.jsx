import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const isEmailEmpty = email.trim() === "";

  const onClickSignupBtn = () => {
    localStorage.setItem("signupEmail", email);
    navigate("/verify-email");
  };
  return (
    <div className="w-full md:w-[50%] mt-[5%]">
      <p className="text-left font-lora font-semibold md:text-3xl text-2xl md:mt-16 mt-2 text-[#1C1C1C]">
        Create an account
      </p>
      <p className="text-left font-lora md:text-lg text-[14px] mt-2 text-[#7c7c7c]">
        Enter your email to sign up for this app
      </p>
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-[#FDFDFB] font-lora mt-10 bg-primary-color border border-[#d9d9d9] text-gray-900 text-base rounded-lg focus:outline-none focus:ring-0 block w-full p-2.5 "
        placeholder="Enter"
        required
        autoComplete="off"
      />
      <button
        type="button"
        disabled={isEmailEmpty}
        className={`tracking-wide font-lora font-medium text-white mt-4 text-base rounded-lg w-full p-2.5 text-center ${
          isEmailEmpty
            ? "bg-[#00584E]/30 cursor-not-allowed"
            : "bg-[#00584E] cursor-pointer"
        }`}
        onClick={onClickSignupBtn}
      >
        Sign up with email
      </button>
      <p className="font-lora text-[14px] font-medium text-[#1c1c1c] text-center mt-5">
        Already have an account?{" "}
        <Link to="/login" className="underline text-[#00584E]">
          Log in
        </Link>
      </p>
      <div className="flex items-center w-full my-10">
        <div className="flex-1 border-t border-[#7c7c7c]"></div>
        <span className="px-4 text-sm text-[#7c7c7c]">or continue with</span>
        <div className="flex-1 border-t border-[#7c7c7c]"></div>
      </div>
      <button
        type="button"
        className="cursor-pointer text-center flex items-center gap-3 tracking-wide font-lora font-medium text-black mt-4 border border-[#d9d9d9] text-base rounded-lg w-full p-2.5"
        aria-label="Continue with Google"
      >
        <div className="flex justify-center items-center mx-auto">
          <FcGoogle className="w-5 h-5" />
          <span className="flex-1 text-left ml-[20px]">
            Continue with Google
          </span>
        </div>
      </button>
      <p className="text-center text-[14px] leading-tight text-[#7C7C7C] mt-5">
        By clicking continue, &nbsp; you agree to our &nbsp;
        <a
          href="#"
          className="underline link-underline text-[#00584E] "
          rel="noopener noreferrer"
        >
          Terms of Service
        </a>
        <br className="md:block hidden" />
        &nbsp;and&nbsp;
        <a
          href="#"
          className="underline link-underline text-[#00584E] "
          rel="noopener noreferrer"
        >
          Privacy Policy
        </a>
      </p>
    </div>
  );
};

export default Signup;
