import React, { useState } from "react";
import PasswordInput from "../../components/PasswordInput";
import { IoCheckmarkSharp, IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import toast, { toastConfig } from "react-simple-toasts";

toastConfig({ theme: "failure", position: "top-right" });

const SetPassword = () => {
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [touched, setTouched] = useState({ pwd: false, confirmPwd: false });
  const navigate = useNavigate();

  /* ---------- VALIDATION ---------- */
  const minLength = 8;
  const hasMinLength = pwd.length >= minLength;

  const uppercaseCount = (pwd.match(/[A-Z]/g) || []).length;
  const hasUppercase = uppercaseCount >= 1;

  const numberCount = (pwd.match(/\d/g) || []).length;
  const hasNumber = numberCount >= 1;

  const passwordsMatch = pwd !== "" && pwd === confirmPwd;

  const allValid = hasMinLength && hasUppercase && hasNumber && passwordsMatch;

  /* ---------- TEXT ---------- */
  const uppercaseText =
    uppercaseCount <= 1
      ? "One uppercase letter"
      : `${uppercaseCount} uppercase letters`;

  const numberText = numberCount <= 1 ? "One number" : `${numberCount} numbers`;

  const handleBlur = (field) => {
    console.log("blurred", field);
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const showValidation = touched.pwd && pwd.length > 0;

  const onClickVerifyBtn = () => {
    setTouched({ pwd: true, confirmPwd: true });
    if (!pwd) {
      toast("Please enter your password.");
      return;
    }
    if (!confirmPwd) {
      toast("Please confirm your password.");
      return;
    }
    if (!allValid) return;

    // Proceed to next step
    navigate("/login");
  };

  return (
    <div className="w-full md:w-[50%] mt-[5%]">
      <p className="font-semibold md:text-3xl text-2xl md:mt-16 mt-2 text-[#232323]">
        Set up a password
      </p>

      <div className="text-[#717171] mt-5 md:text-lg text-sm">
        <p>Ensure that these requirements are met</p>
        <p>Minimum 8 characters long, uppercase, number</p>
      </div>

      {/* PASSWORD */}
      <div className="mt-10">
        <PasswordInput
          password={pwd}
          onChangePassword={(e) => setPwd(e.target.value)}
          placeholder="Password"
          onBlur={() => handleBlur("pwd")}
        />

        {showValidation && (
          <div className="mt-4 space-y-2 text-sm">
            {/* LENGTH */}
            <div className="flex items-center gap-2">
              {hasMinLength ? (
                <IoCheckmarkSharp className="text-[#00584E]" />
              ) : (
                <IoClose className="text-red-600" />
              )}
              <span
                className={hasMinLength ? "text-[#00584E]" : "text-red-600"}
              >
                {pwd.length} characters (minimum {minLength})
              </span>
            </div>

            {/* UPPERCASE */}
            <div className="flex items-center gap-2">
              {hasUppercase ? (
                <IoCheckmarkSharp className="text-[#00584E]" />
              ) : (
                <IoClose className="text-red-600" />
              )}
              <span
                className={hasUppercase ? "text-[#00584E]" : "text-red-600"}
              >
                {uppercaseText}
              </span>
            </div>

            {/* NUMBER */}
            <div className="flex items-center gap-2">
              {hasNumber ? (
                <IoCheckmarkSharp className="text-[#00584E]" />
              ) : (
                <IoClose className="text-red-600" />
              )}
              <span className={hasNumber ? "text-[#00584E]" : "text-red-600"}>
                {numberText}
              </span>
            </div>
          </div>
        )}

        {/* CONFIRM PASSWORD */}
        <PasswordInput
          password={confirmPwd}
          onChangePassword={(e) => setConfirmPwd(e.target.value)}
          placeholder="Repeat Password"
          onBlur={() => handleBlur("confirmPwd")}
          className="mt-6"
        />

        {touched.confirmPwd && confirmPwd && !passwordsMatch && (
          <div className="mt-3 text-red-600 text-sm flex items-center gap-2">
            <IoClose />
            <span>Password doesn't match</span>
          </div>
        )}

        {touched.confirmPwd && confirmPwd && passwordsMatch && (
          <div className="mt-3 text-[#00584E] text-sm flex items-center gap-2">
            <IoCheckmarkSharp />
            <span>Passwords match</span>
          </div>
        )}
      </div>

      {/* SUBMIT BUTTON */}
      <button
        type="button"
        // disabled={!(allValid || (pwd === "" && confirmPwd === ""))}
        onClick={onClickVerifyBtn}
        className="mt-10 w-full p-2.5 rounded-lg text-base font-medium tracking-wide text-white transition-colors duration-300 bg-[#00584E] cursor-pointer"
      >
        Set up
      </button>
    </div>
  );
};

export default SetPassword;
