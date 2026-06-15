import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { Box } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import NavigationDrawer from "../../components/NavigationDrawer";
import { LuLockKeyhole } from "react-icons/lu";
import { IoNotificationsOutline } from "react-icons/io5";
import PasswordInput from "../../components/PasswordInput.jsx";
import { useDispatch } from "react-redux";
import { openSettingModal } from "../../redux/modal/settingSlice.js";
import SettingModal from "../../components/SettingModal.jsx";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { IoCloseCircleOutline } from "react-icons/io5";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled } from "@mui/material/styles";
import toast from "react-simple-toasts";

const Setting = () => {
  const [value, setValue] = useState("1");
  const [email, setEmail] = useState("");
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [repeatNewPwd, setRepeatNewPwd] = useState("");
  const [emailChangeStatus, setEmailChangeStatus] = useState(null); // null, 'success', 'failure'

  const dispatch = useDispatch();

  useEffect(() => {
    const position = window.matchMedia("(min-width: 768px)").matches
      ? "bottom-right"
      : "top-right";

    if (emailChangeStatus === "success") {
      toast(
        <div className="flex items-center gap-2 p-[10px] md:py-5 md:px-7 rounded-lg bg-[#F2FDF6]">
          <IoCheckmarkCircleOutline className="text-[#24773C] text-[15px] md:text-2xl" />
          <p className="text-[#24773C] font-medium text-[12px] md:text-[18px]">
            Email successfully updated!
          </p>
        </div>,
        {
          className: "email-status",
          duration: 3000,
          position,
        }
      );
    }
    if (emailChangeStatus === "failure") {
      toast(
        <div className="flex items-center gap-2 p-[10px] md:py-5 md:px-7 rounded-lg bg-[#FF383C]/15">
          <IoCloseCircleOutline className="text-[#FF383C] text-[15px] md:text-2xl" />
          <p className="text-[#FF383C] font-medium text-[12px] md:text-[18px]">
            Oops! Something went wrong. Please try again later.
          </p>
        </div>,
        {
          className: "email-status",
          duration: 3000,
          position,
        }
      );
    }
  }, [emailChangeStatus]);
  // Track if the user has interacted with each field
  const [touched, setTouched] = useState({
    currentPwd: false,
    newPwd: false,
    repeatNewPwd: false,
  });

  const passwordRules = {
    length: (pwd) => pwd.length >= 8,
    uppercase: (pwd) => /[A-Z]/.test(pwd),
    number: (pwd) => /\d/.test(pwd),
  };

  // Compute errors only for touched fields
  const errors = [];

  if (touched.currentPwd && !currentPwd) {
    errors.push("Current password is required.");
  }

  if (touched.newPwd) {
    if (!newPwd) {
      errors.push("New password is required.");
    } else {
      if (!passwordRules.length(newPwd)) {
        errors.push("New password must be at least 8 characters.");
      }
      if (!passwordRules.uppercase(newPwd)) {
        errors.push("New password must contain an uppercase letter.");
      }
      if (!passwordRules.number(newPwd)) {
        errors.push("New password must contain a number.");
      }
    }
  }

  if (touched.repeatNewPwd) {
    if (!repeatNewPwd) {
      errors.push("Repeat password is required.");
    } else if (newPwd !== repeatNewPwd) {
      errors.push("New passwords do not match.");
    }
  }

  const isFormValid =
    currentPwd &&
    newPwd &&
    repeatNewPwd &&
    passwordRules.length(newPwd) &&
    passwordRules.uppercase(newPwd) &&
    passwordRules.number(newPwd) &&
    newPwd === repeatNewPwd;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Helper to mark field as touched when user starts typing
  const markAsTouched = (field) => {
    if (!touched[field]) {
      setTouched((prev) => ({ ...prev, [field]: true }));
    }
  };

  // Callback to receive email change status from SettingModal
  const handleReceiveCode = (status) => {
    console.log("Received code from child:", status);
    setEmailChangeStatus(status);
  };

  const IOSSwitch = styled((props) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(() => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor: "#00584E",
          opacity: 1,
          border: 0,
        },
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: "#E9E9EA",
      opacity: 1,
    },
  }));
  return (
    <div className="flex flex-col md:flex-row setting min-h-screen">
      <Sidebar />
      <div className="flex md:hidden w-full items-center justify-between">
        <NavigationDrawer />
      </div>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              TabIndicatorProps={{ style: { display: "none" } }}
            >
              {/* ... Tab components remain unchanged ... */}
              <Tab
                value="1"
                label={
                  <div className="flex items-center gap-2">
                    <LuLockKeyhole size={24} />
                    <span className="font-semibold text-[15px]">
                      Security & Password
                    </span>
                  </div>
                }
                sx={{
                  textTransform: "none",
                  borderBottom: value === "1" ? 2 : 0,
                  borderColor: value === "1" ? "#00584E" : "transparent",
                  "&.Mui-selected": { color: "#00584E" },
                  width: { xs: "50%", sm: "auto" },
                }}
              />
              <Tab
                value="2"
                label={
                  <div className="flex items-center gap-2">
                    <IoNotificationsOutline size={24} />
                    <span className="font-semibold text-[15px]">
                      Notifications
                    </span>
                  </div>
                }
                sx={{
                  textTransform: "none",
                  borderBottom: value === "2" ? 2 : 0,
                  borderColor: value === "2" ? "#00584E" : "transparent",
                  "&.Mui-selected": { color: "#00584E" },
                  width: { xs: "50%", sm: "auto" },
                }}
              />
            </TabList>
          </Box>
          <TabPanel value="1">
            <div className="border border-[#BFBFBF] rounded-lg pt-6 px-5 pb-4">
              <p className="text-[#232323] text-[16px] md:text-2xl font-semibold">
                Email
              </p>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#FDFDFB] w-full md:w-[30%] font-lora mt-4 bg-primary-color border border-[#d9d9d9] text-gray-900 text-base rounded-lg focus:outline-none focus:ring-0 block p-2.5"
                placeholder="marry@gmail.com"
                required
                autoComplete="off"
              />
              <button
                type="button"
                disabled={email.trim() === ""}
                className={`tracking-wide text-[12px] md:text-[14px] font-lora font-semibold text-white mt-4 text-base rounded-lg py-2.5 px-5 text-center ${
                  email.trim() === ""
                    ? "bg-[#00584E]/30 cursor-not-allowed"
                    : "bg-[#00584E] cursor-pointer"
                }`}
                onClick={() => dispatch(openSettingModal(email))}
              >
                Update
              </button>
            </div>
            <div className="border border-[#BFBFBF] rounded-lg mt-6 pt-6 px-5 pb-4">
              <p className="text-[#232323] text-[16px] md:text-2xl font-semibold">
                Password
              </p>
              <div className="text-[#00584E] text-[14px] bg-[#F2FDF6] p-5 my-5">
                <p>Ensure that these requirements are met</p>
                <ul className="list-disc list-inside">
                  <li>Minimum 8 characters long, uppercase, number</li>
                </ul>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4">
                <PasswordInput
                  password={currentPwd}
                  onChangePassword={(e) => {
                    setCurrentPwd(e.target.value);
                    markAsTouched("currentPwd");
                  }}
                  placeholder="Current Password"
                  pwdDisplay={true}
                />
                <PasswordInput
                  password={newPwd}
                  onChangePassword={(e) => {
                    setNewPwd(e.target.value);
                    markAsTouched("newPwd");
                  }}
                  placeholder="New Password"
                />
                <PasswordInput
                  password={repeatNewPwd}
                  onChangePassword={(e) => {
                    setRepeatNewPwd(e.target.value);
                    markAsTouched("repeatNewPwd");
                  }}
                  placeholder="Repeat new Password"
                />
              </div>

              {/* Validation messages - only shown after field is touched */}
              {errors.length > 0 && (
                <ul className="text-sm text-red-600 list-disc pl-5 space-y-1 mt-5">
                  {errors.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              )}

              <button
                type="button"
                disabled={!isFormValid}
                className={`tracking-wide text-[12px] md:text-[14px] font-lora font-semibold text-white mt-4 text-base rounded-lg py-2.5 px-5 text-center ${
                  !isFormValid
                    ? "bg-[#00584E]/30 cursor-not-allowed"
                    : "bg-[#00584E] cursor-pointer"
                }`}
              >
                Update
              </button>
            </div>
          </TabPanel>
          <TabPanel value="2">
            <div className="border border-[#BFBFBF] rounded-lg pt-6 px-5 pb-4">
              <div className="flex items-center justify-between font-medium text-[20px] md:text-2xl text-[#1c1c1c]">
                <p>Return status updates</p>
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                />
              </div>
              <div className="flex items-center justify-between font-medium text-[20px] md:text-2xl text-[#1c1c1c] my-6">
                <p>Refund & card activation notifications</p>
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                />
              </div>
              <div className="flex items-center justify-between font-medium text-[20px] md:text-2xl text-[#1c1c1c]">
                <p>Special offers</p>
                <FormControlLabel control={<IOSSwitch sx={{ m: 1 }} />} />
              </div>
            </div>
          </TabPanel>
        </TabContext>
      </Box>

      <SettingModal onSendCode={handleReceiveCode} />
    </div>
  );
};

export default Setting;
