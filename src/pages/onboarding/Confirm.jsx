import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProgessBar from "../../components/ProgressBar";
import { useDispatch } from "react-redux";
import { setStep } from "../../redux/progress/progressSlice";
import profileTickImg from "../../assets/imgs/profile-tick.png";
import noteImg from "../../assets/imgs/note-2.png";
import userEditImg from "../../assets/imgs/user-edit.png";
import chartImg from "../../assets/imgs/chart.png";
import tickCircleImg from "../../assets/imgs/tick-circle.png";
import removeImg from "../../assets/imgs/remove.png";
import docTextImg from "../../assets/imgs/doc-text.png";
import shareImg from "../../assets/imgs/share.png";

const setTexts = [
  {
    img: profileTickImg,
    text: "Your account is set up",
  },
  {
    img: noteImg,
    text: "Your 2024 tax documents are uploaded",
  },
  {
    img: userEditImg,
    text: "Your 2025 tax profile is updated",
  },
];

const happenTexts = [
  {
    img: chartImg,
    text: "I'll analyze your documents and prepare your initial tax return draft",
  },
  {
    img: tickCircleImg,
    text: "A CPA partner will review everything for accuracy",
  },
  {
    img: removeImg,
    text: "If anything is missing, I'll notify you",
  },
  {
    img: docTextImg,
    text: "Once approved, we'll send your return for e-filing",
  },
  {
    img: shareImg,
    text: "You'll be able to track the status at every step",
  },
];

const Confirm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setStep(4));
  }, [dispatch]);
  return (
    <div className="w-full md:w-[40%] mx-auto mt-10 flex flex-col items-center">
      <ProgessBar />
      <p className="font-semibold text-[32px] text-[#1c1c1c] mt-8 md:mt-15 mb-8 text-center">
        You're all set!
      </p>
      <div className="w-full">
        {setTexts.map((item, index) => (
          <div
            className="flex items-center border border-[#BFBFBF] p-1 rounded-lg mb-2"
            key={index}
          >
            <div className="bg-[#00584E] inline-block rounded-lg p-2">
              <img src={item.img} alt="Profile Tick" className="" />
            </div>
            <p className="text-[#00584E] text-[18px] font-semibold mb-0 ml-5">
              {item.text}
            </p>
          </div>
        ))}
      </div>
      <div className="w-full">
        <p className="text-lg text-black font-semibold my-5">
          What happens next:
        </p>

        {happenTexts.map((item, index) => (
          <div
            className="flex items-center border border-[#BFBFBF] p-1 rounded-lg mb-2"
            key={index}
          >
            <div className="bg-[#717171] inline-block rounded-lg p-2">
              <img src={item.img} alt="Happen Tick" className="" />
            </div>
            <p className="text-[#1c1c1c] text-[18px] font-semibold mb-0 ml-5">
              {item.text}
            </p>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="mt-15 tracking-wide text-white font-medium text-base rounded-lg w-full p-2.5 text-center bg-[#00584E] cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        Go to your dashboard
      </button>
      <p className="text-base font-medium text-[#00584E] text-center mt-5 underline">
        <Link to="/questionnaire">Back</Link>
      </p>
    </div>
  );
};
export default Confirm;
