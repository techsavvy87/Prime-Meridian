import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeDeleteModal } from "../redux/modal/deleteSlice";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";

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

const DeleteModal = ({ onConfirm }) => {
  const { isOpen, doc } = useSelector((state) => state.deleteModal);
  const dispatch = useDispatch();
  return (
    <>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40"
            onClick={() => dispatch(closeDeleteModal())}
          ></div>
          <Modal
            open={isOpen}
            onClose={() => dispatch(closeDeleteModal())}
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
                  Are you sure you want to delete {doc ? doc.name : ""}?
                </p>
                <button
                  className="font-semibold text-base text-white py-2 px-4 rounded-md mt-6 w-full bg-[#B42323]"
                  onClick={() => {
                    if (doc && doc.id) {
                      onConfirm(doc.id);
                      dispatch(closeDeleteModal());
                    }
                  }}
                >
                  Delete
                </button>
                <p
                  className="underline text-[#00584E] text-center cursor-pointer mt-5"
                  onClick={() => dispatch(closeDeleteModal())}
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

export default DeleteModal;
