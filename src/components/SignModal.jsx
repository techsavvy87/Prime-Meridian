import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { closeSignModal } from "../redux/modal/signSlice";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import SignStyle from "./SignStyle";
import SignDraw from "./SignDraw";
import SignUpload from "./SignUpload";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: "90%", // mobile
    sm: 450, // tablet & up
  },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: {
    xs: 2, // mobile
    sm: 4, // tablet & up
  },
  borderRadius: "8px",
};

const tabCss = {
  fontSize: "18px",
  textTransform: "none",
  color: "gray",
  "&.Mui-selected": {
    color: "#00584E",
    fontWeight: "bold",
  },
};

const SignModal = ({ onConfirm }) => {
  const isOpen = useSelector((state) => state.signModal.isOpen);
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState("1");
  const [fullName, setFullName] = useState("");
  const [initials, setInitials] = useState("");
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40"
            onClick={() => dispatch(closeSignModal())}
          ></div>
          <Modal
            open={isOpen}
            onClose={() => dispatch(closeSignModal())}
            closeAfterTransition
            slotProps={{
              backdrop: {
                timeout: 500,
              },
            }}
          >
            <Fade in={isOpen}>
              <Box sx={style}>
                <p className="font-semibold text-[20px] md:text-2xl text-[#232323] text-center">
                  Adopt your Signature
                </p>
                <p className="text-[#717171] text-[14px] mt-5 text-center mb-1">
                  Use your legal full name as it’ll appear on Form 8879.
                </p>
                <div className="flex">
                  <input
                    type="text"
                    name="fullname"
                    className="bg-white font-lora mt-1 bg-primary-color border border-[#BFBFBF] text-gray-900 text-base rounded-lg focus:outline-none focus:ring-0 block w-full p-2.5 "
                    placeholder="Full name*"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    name="initials"
                    value={initials}
                    onChange={(e) => setInitials(e.target.value.toUpperCase())}
                    className="bg-white font-lora mt-1 ml-2 bg-primary-color border border-[#BFBFBF] text-gray-900 text-base rounded-lg focus:outline-none focus:ring-0 block w-full p-2.5 "
                    placeholder="Initials*"
                    required
                  />
                </div>

                <Box
                  sx={{
                    width: "100%",
                    typography: "body1",
                  }}
                >
                  <TabContext value={value}>
                    <Box
                      sx={{
                        borderBottom: 1,
                        borderColor: "divider",
                        marginTop: 3,
                      }}
                    >
                      <TabList
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                        className="sign-tab-list"
                        TabIndicatorProps={{
                          sx: {
                            backgroundColor: "#00584E",
                            height: "2px",
                          },
                        }}
                      >
                        <Tab label="Select Style" value="1" sx={tabCss} />
                        <Tab label="Draw" value="2" sx={tabCss} />
                        <Tab label="Upload" value="3" sx={tabCss} />
                      </TabList>
                    </Box>
                    {/* Select Style */}
                    <TabPanel value="1">
                      <SignStyle fullName={fullName} initials={initials} />
                    </TabPanel>
                    {/* Draw */}
                    <TabPanel value="2">
                      <SignDraw />
                    </TabPanel>
                    {/* Upload */}
                    <TabPanel value="3">
                      <SignUpload onFilesChange={setFiles} />
                    </TabPanel>
                  </TabContext>
                </Box>
                <label className="mt-4 flex items-start gap-2 cursor-pointer">
                  <Checkbox
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                    sx={{
                      padding: 0, // remove default padding
                      color: "#00584E", // border color when unchecked
                      backgroundColor: "white",
                      "&.Mui-checked": {
                        color: "#00584E",
                      },
                      "& .MuiSvgIcon-root": {
                        fontSize: 24,
                      },
                    }}
                  />
                  <span className="text-left text-[14px] text-[#232323]">
                    By selecting Adopt and Sign, I agree that this signature and
                    initials constitute my electronic signature.{" "}
                    <span className="text-red-500">**</span>
                  </span>
                </label>

                <button
                  className={`font-semibold text-base text-white py-2 px-4 rounded-md mt-6 w-full ${
                    checked ? "bg-[#00584E]" : "bg-[#00584E4D]"
                  }`}
                  disabled={!checked}
                  onClick={() => {
                    dispatch(closeSignModal());
                    onConfirm(); // notify parent
                  }}
                >
                  Adopt and sign
                </button>
                <p
                  className="underline text-[#00584E] text-center cursor-pointer mt-5"
                  onClick={() => dispatch(closeSignModal())}
                >
                  Cancel
                </p>
              </Box>
            </Fade>
          </Modal>
        </>
      )}
    </>
  );
};

export default SignModal;
