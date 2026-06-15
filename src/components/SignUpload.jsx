import React, { useRef, useState } from "react";
import { PiXCircleBold, PiUploadLight } from "react-icons/pi";
import pdfImg from "../assets/imgs/pdf-icon.png";
import signDocImg from "../assets/imgs/sign-doc.png";

const SignUpload = ({ onFilesChange }) => {
  const inputRef = useRef(null);
  const [files, setFiles] = useState([]);

  const handleClick = () => inputRef.current.click();

  const handleFilesChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const updatedFiles = [...files, ...selectedFiles];
    setFiles(updatedFiles);
    onFilesChange(updatedFiles); // notify parent
  };

  const removeFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onFilesChange(updatedFiles); // notify parent
  };

  return (
    <div className="w-full mx-auto mt-5">
      {/* Upload Box */}
      {files.length === 0 && (
        <div
          onClick={handleClick}
          className=" bg-[#F9F9F9] min-h-[150px] rounded-lg p-2 text-center flex flex-col items-center gap-2 cursor-pointer"
        >
          <img src={signDocImg} alt="Document Icon" className="w-auto h-auto" />
          <p className="font-medium text-black">Click to upload documents</p>
          <p className="text-sm text-[#818181]">
            W-2s, 1099s, K-1s, and previous tax returns
          </p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        multiple
        accept="*/*"
        className="hidden"
        onChange={handleFilesChange}
      />

      {/* Uploaded Files */}
      {files.length > 0 && (
        <div className="flex flex-wrap bg-[#F9F9F9] rounded-lg p-4 gap-4 overflow-x-auto">
          {files.map((file, index) => (
            <div
              key={index}
              className="relative w-32 rounded-md p-3 flex flex-col items-center gap-2"
            >
              <button
                onClick={() => removeFile(index)}
                className="absolute -top-1 right-6 text-red-500"
              >
                <PiXCircleBold size={20} />
              </button>
              <img src={pdfImg} alt="PDF Icon" className="w-10 h-10" />
              <p className="text-xs text-center truncate w-full">{file.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SignUpload;
