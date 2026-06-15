import { useState } from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { PiEyeClosed } from "react-icons/pi";

const PasswordInput = (props) => {
  const { password, onChangePassword, placeholder, pwdDisplay } = props;

  const [showPwd, setShowPwd] = useState(pwdDisplay || false);

  return (
    <div className="relative">
      <input
        name="password"
        type={showPwd ? "text" : "password"}
        className="bg-[#FDFDFB] font-lora mt-3 bg-primary-color border border-[#d9d9d9] text-gray-900 text-base rounded-lg focus:outline-none focus:ring-0 block w-full p-2.5 "
        placeholder={placeholder || "Password"}
        required
        value={password}
        onChange={onChangePassword}
      />
      <div
        className="absolute inset-y-0 end-0 flex items-center pe-3.5"
        onClick={() => setShowPwd(!showPwd)}
      >
        {showPwd ? (
          <VisibilityOutlinedIcon
            className="text-[#00584E]"
            style={{ width: "30px", height: "25px" }}
          />
        ) : (
          <PiEyeClosed
            className="text-[#00584E]"
            style={{ width: "30px", height: "25px" }}
          />
        )}
      </div>
    </div>
  );
};

export default PasswordInput;
