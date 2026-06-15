import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const navigate = useNavigate();

  const allValid = email.trim() !== "" && pwd.trim() !== "";

  const onClickLoginBtn = () => {
    navigate("/upload-doc");
  };
  return (
    <div className="w-full md:w-[50%] mt-[5%]">
      <p className="text-left font-lora font-semibold md:text-3xl text-2xl md:mt-16 mt-2 text-[#1C1C1C]">
        Login
      </p>
      <p className="text-left font-lora md:text-lg text-[14px] mt-2 text-[#7c7c7c]">
        Enter your email to login for this app
      </p>
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-[#FDFDFB] font-lora mt-10 bg-primary-color border border-[#d9d9d9] text-gray-900 text-base rounded-lg focus:outline-none focus:ring-0 block w-full p-2.5 "
        placeholder="Email"
        required
        autoComplete="off"
      />
      <input
        type="password"
        name="password"
        value={pwd}
        onChange={(e) => setPwd(e.target.value)}
        className="bg-[#FDFDFB] font-lora mt-2 bg-primary-color border border-[#d9d9d9] text-gray-900 text-base rounded-lg focus:outline-none focus:ring-0 block w-full p-2.5 "
        placeholder="Password"
        required
      />
      <p className="text-right text-[14px]  text-[#00584E] underline font-medium text-base my-2">
        <Link to="/reset-password">Forgot password?</Link>
      </p>
      <button
        type="button"
        disabled={!allValid}
        onClick={onClickLoginBtn}
        className={`tracking-wide font-medium text-white text-base rounded-lg w-full p-2.5 text-center transition-colors
            ${
              allValid
                ? "bg-[#00584E] hover:bg-[#004C44]"
                : "bg-[#00584E]/30 cursor-not-allowed"
            }
          `}
      >
        Set up
      </button>

      <p className="text-[14px] font-medium text-[#1c1c1c] text-center mt-5">
        Don't have an account?{" "}
        <Link to="/signup" className="text-[#00584E] underline">
          Sign up
        </Link>
      </p>
      <div className="flex items-center w-full my-4 md:my-10">
        <div className="flex-1 border-t border-[#D9D9D9]"></div>
        <span className="px-4 text-sm text-[#D9D9D9]">or continue with</span>
        <div className="flex-1 border-t border-[#D9D9D9]"></div>
      </div>
      <button
        type="button"
        className="cursor-pointer flex items-center gap-3 tracking-wide font-lora font-medium text-black mt-4 border border-[#d9d9d9] text-base rounded-lg w-full p-2.5"
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
          className="underline link-underline text-black "
          rel="noopener noreferrer"
        >
          Terms of Service
        </a>
        <br className="md:block hidden" />
        &nbsp;and&nbsp;
        <a
          href="#"
          className="underline link-underline text-black "
          rel="noopener noreferrer"
        >
          Privacy Policy
        </a>
      </p>
    </div>
  );
};

export default Login;
