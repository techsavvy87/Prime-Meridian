import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const VerifyPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const onClickBackBtn = () => {
    navigate("/login");
  };
  return (
    <div className="w-full md:w-[50%] mt-[5%]">
      <p className="text-left font-lora font-semibold md:text-3xl text-2xl md:mt-16 mt-2 text-[#1C1C1C]">
        Password reset email sent
      </p>
      <p className="text-left font-lora md:text-lg text-[14px] mt-5 text-[#7c7c7c] mb-10">
        We've sent you an email with a link to reset your password. Please check
        your inbox.
      </p>
      <button
        type="button"
        className="tracking-wide font-medium text-white mt-4 text-base rounded-lg w-full p-2.5 text-center bg-[#00584E] cursor-pointer"
        onClick={onClickBackBtn}
      >
        Back to Login
      </button>
      <p className="text-base font-medium text-[#1c1c1c] text-center mt-5">
        Didn't receive the link?
        <Link to="/login" className="text-[#00584E] underline">
          {" "}
          Resend in 30s
        </Link>
      </p>
    </div>
  );
};

export default VerifyPassword;
