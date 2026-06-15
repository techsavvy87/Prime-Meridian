import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeLogoutModal } from "../redux/modal/logoutSlice";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";

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

const LogoutModal = ({ onConfirm }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpen } = useSelector((state) => state.logoutModal);

  const handleLogout = () => {
    dispatch(closeLogoutModal());
    navigate("/login");
  };
  return (
    <>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40"
            onClick={() => dispatch(closeLogoutModal())}
          ></div>
          <Modal
            open={isOpen}
            onClose={() => dispatch(closeLogoutModal())}
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
                  Are you sure you want to Log Out?
                </p>
                <button
                  className="font-semibold text-base text-white py-2 px-4 rounded-md mt-6 w-full bg-[#B42323]"
                  onClick={handleLogout}
                >
                  <CiLogout className="w-5 h-5 inline-block mr-2 font-bold" />
                  Log Out
                </button>
                <p
                  className="underline text-[#00584E] text-center cursor-pointer mt-5"
                  onClick={() => dispatch(closeLogoutModal())}
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

export default LogoutModal;
