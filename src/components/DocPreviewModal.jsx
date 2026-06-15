import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeDocPreviewModal } from "../redux/modal/docPreviewSlice";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import { RxDownload } from "react-icons/rx";
import { Document, Page, pdfjs } from "react-pdf";
import { FaCircleArrowRight, FaCircleArrowLeft } from "react-icons/fa6";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

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

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@5.4.296/build/pdf.worker.min.mjs`;

const DocPreviewModal = () => {
  const isOpen = useSelector((state) => state.docPreviewModal.isOpen);
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);

  const [currentPdfIndex, setCurrentPdfIndex] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);

  // Replace with your actual PDF filename
  const pdfUrls = ["/pdf/test1.pdf", "/pdf/test2.pdf", "/pdf/test3.pdf"];

  const currentPdfUrl = pdfUrls[currentPdfIndex];
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1); // Always start at page 1 when switching PDFs
  };

  const goToPrev = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    } else if (currentPdfIndex > 0) {
      setCurrentPdfIndex(currentPdfIndex - 1);
      // Page will reset automatically on next load
    }
  };

  const goToNext = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    } else if (currentPdfIndex < pdfUrls.length - 1) {
      setCurrentPdfIndex(currentPdfIndex + 1);
      // Page will reset automatically on next load
    }
  };
  return (
    <>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40"
            onClick={() => dispatch(closeDocPreviewModal())}
          ></div>
          <Modal
            open={isOpen}
            onClose={() => dispatch(closeDocPreviewModal())}
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
                  Document Preview
                </p>
                <div className="mt-6 flex items-center justify-center gap-4 cursor-pointer text-[#00584E]">
                  <RxDownload className="w-5 h-5" />
                  <a
                    className="underline font-semibold text-[16px]"
                    href={currentPdfUrl}
                    download
                  >
                    Download File
                  </a>
                </div>
                {/* Start */}
                <div className="text-center p-2 md:pt-[20px]">
                  {/* PDF Display Area */}
                  <div className="w-full h-[390px] border border-[#ddd] overflow-hidden shadow-md mx-auto box-border">
                    <Document
                      key={currentPdfUrl}
                      file={currentPdfUrl}
                      onLoadSuccess={onDocumentLoadSuccess}
                      onLoadError={(error) =>
                        console.error("PDF Load Error:", error)
                      }
                    >
                      <Page
                        pageNumber={pageNumber}
                        width={336}
                        renderTextLayer={true}
                        renderAnnotationLayer={true}
                      />{" "}
                      {/* Adjust width as needed */}
                    </Document>
                  </div>

                  {/* Navigation Controls */}
                  {numPages && (
                    <div
                      style={{
                        marginTop: "20px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "20px",
                      }}
                    >
                      <FaCircleArrowLeft
                        onClick={goToPrev}
                        disabled={currentPdfIndex === 0 && pageNumber === 1}
                        className={`text-2xl ${
                          currentPdfIndex === 0 && pageNumber === 1
                            ? "cursor-not-allowed text-[#717171]"
                            : "cursor-pointer text-[#00584E]"
                        }`}
                      />

                      <span className="text-[#232323] text-[14px]">
                        Page {currentPdfIndex + 1} of {pdfUrls.length}
                        {/* — Page{" "}{pageNumber} of {numPages} */}
                      </span>
                      <FaCircleArrowRight
                        onClick={goToNext}
                        disabled={
                          currentPdfIndex === pdfUrls.length - 1 &&
                          pageNumber === numPages
                        }
                        className={`text-2xl ${
                          currentPdfIndex === pdfUrls.length - 1 &&
                          pageNumber === numPages
                            ? "cursor-not-allowed text-[#717171]"
                            : "cursor-pointer text-[#00584E]"
                        }`}
                      />
                    </div>
                  )}
                </div>
                {/* End */}
                <button
                  className="font-semibold text-base text-white py-2 px-4 rounded-md mt-6 w-full bg-[#00584E]"
                  onClick={() => {
                    dispatch(closeDocPreviewModal());
                  }}
                >
                  Close
                </button>
              </Box>
            </Fade>
          </Modal>
        </>
      )}
    </>
  );
};

export default DocPreviewModal;
