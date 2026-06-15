import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FileUpload from "../../components/FileUpload";
import ProgessBar from "../../components/ProgressBar";
import { useDispatch } from "react-redux";
import { setStep } from "../../redux/progress/progressSlice";

const UploadDoc = () => {
  const [files, setFiles] = useState([]);
  const [taxStatus, setTaxStatus] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isFormValid = files.length > 0 && taxStatus.trim() !== "";

  const handleSubmit = () => {
    if (!isFormValid) {
      return;
    } else {
      navigate("/questionnaire"); // move to another route
    }
  };

  useEffect(() => {
    dispatch(setStep(1));
  }, [dispatch]);
  return (
    <div className="w-full md:w-[40%] mx-auto mt-10 flex flex-col items-center">
      <ProgessBar />
      <p className="font-semibold text-[32px] text-[#1c1c1c] mt-8 md:mt-15 text-center">
        Upload your 2024 tax documents
      </p>
      <p className="text-[18px] text-[#7c7c7c] text-center mt-2">
        Welcome to Prime Meridian, Rishabh.
      </p>
      <p className="text-[18px] text-[#7c7c7c] text-center my-5">
        Please upload all relevant docs (eg: W-2s, K-1s, 1099s) along with last
        year's tax return so we can prep your 2026 federal and state tax return.
      </p>
      <p className="text-[18px] text-[#7c7c7c] text-center">
        If there are any special circumstances about your tax situation or the
        uploaded docs, please let us know in a few sentences below, and we'll
        confirm if we can take care of you this tax season.
      </p>
      <FileUpload onFilesChange={setFiles} />
      <textarea
        className="bg-[#ffffff] h-25 font-lora mt-3 border border-[#d9d9d9] text-gray-900 text-base rounded-lg w-full p-2.5 "
        name="taxSituations"
        value={taxStatus}
        onChange={(e) => setTaxStatus(e.target.value)}
        placeholder="Describe your tax situations (e.g., employment, investments, rental income...)"
      ></textarea>
      <button
        type="button"
        disabled={!isFormValid}
        onClick={handleSubmit}
        className={`tracking-wide text-white font-medium text-base rounded-lg w-full p-2.5 text-center mt-5
          ${
            isFormValid
              ? "bg-[#00584E] cursor-pointer"
              : "bg-[#00584E]/30 cursor-not-allowed"
          }
        `}
      >
        Submit and continue
      </button>
    </div>
  );
};
export default UploadDoc;
