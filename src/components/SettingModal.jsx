import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import CodeInput from "./CodeInput";
import { closeSettingModal } from "../redux/modal/settingSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: "90%", // mobile
    sm: 400, // tablet & up
  },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: {
    xs: 2, // mobile
    sm: 4, // tablet & up
  },
  borderRadius: "8px",
};

const SettingModal = ({ onSendCode }) => {
  const { isOpen, email } = useSelector((state) => state.settingModal);
  const [code, setCode] = useState("");
  const dispatch = useDispatch();

  const handleSendCode = () => {
    const result = Math.floor(Math.random() * 2);
    onSendCode(result === 1 ? "success" : "failure");
    dispatch(closeSettingModal());
  };

  return (
    <>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40"
            onClick={() => dispatch(closeSettingModal())}
          ></div>
          <Modal
            open={isOpen}
            onClose={() => dispatch(closeSettingModal())}
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
                  Confirm your new email
                </p>
                <p className="text-[#717171] text-[14px] mt-5 text-center mb-1">
                  Enter the code to confirm your email address{" "}
                  <span className="text-black">{email}</span>
                  and continue your registration.
                </p>
                <CodeInput callback={setCode} sort="modal" />
                <button
                  className="font-semibold text-base text-white py-2 px-4 rounded-md mt-6 w-full bg-[#00584E]"
                  onClick={handleSendCode}
                >
                  Confirm
                </button>
                <p className="text-base font-medium text-[#717171] text-center mt-5">
                  Didn't receive the code?
                  <a className="text-[#00584E] underline"> Resend in 30s</a>
                </p>
              </Box>
            </Fade>
          </Modal>
        </>
      )}
    </>
  );
};

export default SettingModal;
