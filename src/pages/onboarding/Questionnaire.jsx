import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProgessBar from "../../components/ProgressBar";
import { useDispatch } from "react-redux";
import { setStep } from "../../redux/progress/progressSlice";

const questions = [
  {
    id: 1,
    text: "Did your marital status change?",
    placeholder: "Tell us about your marital status change...",
  },
  {
    id: 2,
    text: "Do you have any new dependents?",
    placeholder: "Tell us about your dependents...",
  },
  {
    id: 3,
    text: "Did you change your residence?",
    placeholder: "Tell us about your residence change...",
  },
  {
    id: 4,
    text: "Did you start a new job or change employers?",
    placeholder: "Tell us about your employment change...",
  },
  {
    id: 5,
    text: "Do you have new investments or income sources?",
    placeholder: "Tell us about your investments or income...",
  },
];

const Questionnaire = () => {
  const [currentStep, setCurrentStep] = useState(0); // index of current question
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isCurrentAnswerValid = answers[currentStep].trim() !== "";
  const currentQuestion = questions[currentStep];

  const handleChange = (e) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentStep] = e.target.value;
    setAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (answers[currentStep].trim() === "") return; // do not allow empty answers
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // All questions answered, submit or navigate to next page
      console.log("All answers:", answers);
      navigate("/confirm"); // Uncomment if using react-router
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  useEffect(() => {
    dispatch(setStep(3));
  }, [dispatch]);

  return (
    <div className="w-full md:w-[40%] mx-auto mt-10 flex flex-col items-center">
      <ProgessBar />
      <p className="font-semibold text-[32px] text-[#1c1c1c] mt-8 md:mt-15 mb-8 text-center">
        Understanding your FY 2025 tax story
      </p>

      <div className="w-full max-w-3xl bg-[#FDFBF7] p-6 border border-[#F1E8D6] question-box">
        <section
          className="bg-white rounded-lg border border-[#F1E8D6] p-6"
          aria-labelledby="assistant-heading"
        >
          <div className="prose prose-sm max-w-none text-black">
            <p className="mb-2">
              Hello, I'm Prime Meridian's AI tax assistant. I'm going to ask you
              a few questions to help me understand your tax situation better.{" "}
              <br />
              Here is some information about your FY 2024 tax return:
            </p>

            <ul className="list-disc pl-5 text-base text-black">
              <li>Single</li>
              <li>No dependents</li>
              <li>Lives in LA</li>
              <li>Works for Google</li>
              <li>Has investments through Robinhood and Morgan Stanley</li>
            </ul>
          </div>

          <div className="mt-5 gap-4">
            <span
              className="inline-block bg-[#00584E] text-white text-sm px-3 py-1 rounded-md font-semibold mb-3"
              aria-hidden="true"
            >
              {currentStep + 1} / {questions.length}
            </span>

            <h2
              id="assistant-heading"
              className="font-bold text-black text-base"
            >
              {currentQuestion.text}
            </h2>
          </div>
        </section>

        <textarea
          className="bg-[#ffffff] h-25 font-lora mt-4 border border-[#F1E8D6] text-gray-900 text-base rounded-lg w-full p-2.5"
          name={`question-${currentQuestion.id}`}
          value={answers[currentStep]}
          onChange={handleChange}
          placeholder={currentQuestion.placeholder}
        ></textarea>
      </div>

      <button
        type="button"
        disabled={!isCurrentAnswerValid}
        onClick={handleNext}
        className={`tracking-wide text-white font-medium text-base rounded-lg w-full p-2.5 text-center mt-5
              ${
                isCurrentAnswerValid
                  ? "bg-[#00584E] cursor-pointer"
                  : "bg-[#00584E]/30 cursor-not-allowed"
              }
            `}
      >
        {currentStep + 1} / {questions.length} Submit and continue
      </button>
      <button
        type="button"
        onClick={handleBack}
        disabled={currentStep === 0}
        className={`underline tracking-wide text-[#00584E] font-medium text-base rounded-lg flex-1 p-2.5 text-center
            ${currentStep === 0 ? "cursor-not-allowed" : "cursor-pointer"}
          `}
      >
        Back
      </button>
    </div>
  );
};

export default Questionnaire;
