import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { FiInfo } from "react-icons/fi";
import { MdOutlineReviews } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { LuPrinter } from "react-icons/lu";
import { GrDrag } from "react-icons/gr";
import { CiSearch } from "react-icons/ci";
import { FaFileSignature } from "react-icons/fa";
import { BsEnvelopeCheck } from "react-icons/bs";
import { TiBook } from "react-icons/ti";
import { RiRefund2Fill } from "react-icons/ri";
import { HiOutlineDownload } from "react-icons/hi";
import { LuMessageCircleMore } from "react-icons/lu";
import { RiUserAddLine } from "react-icons/ri";
import { TbMessageSearch } from "react-icons/tb";
import NavigationDrawer from "../../components/NavigationDrawer";
import { useDispatch } from "react-redux";
import { openReviewModal } from "../../redux/modal/reviewSlice";
import ReviewModal from "../../components/ReviewModal";
import SignModal from "../../components/SignModal";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import DocPreviewModal from "../../components/DocPreviewModal";
import { openDocPreviewModal } from "../../redux/modal/docPreviewSlice";

/* ---------------- CONFIG ---------------- */
const STEP_DELAY = 300;
const LOADER_DELAY = 500;
const STEP_HEIGHT =
  typeof window !== "undefined" && window.innerWidth >= 768 ? 90 : 126;
/* ---------------- STEPS ---------------- */
const steps = [
  {
    title: "Documents received",
    description:
      "We've collected your files and started analyzing your tax situation.",
    icon: <LuPrinter />,
  },
  {
    title: "Drafting your return",
    description:
      "We're preparing your initial return draft based on your documents and questionnaire.",
    icon: <GrDrag />,
  },
  {
    title: "CPA review",
    description:
      "A licensed CPA will review your return to ensure accuracy and compliance.",
    icon: <CiSearch />,
  },
  {
    title: "Ready for your signature",
    description: "You'll be able to e-sign your return directly in the app.",
    icon: <FaFileSignature />,
  },
  {
    title: "Sent for e-filing",
    description: "We'll submit your return to the IRS on your behalf.",
    icon: <BsEnvelopeCheck />,
  },
  {
    title: "Awaiting IRS refund",
    description: "We'll notify you when the IRS processes your refund.",
    icon: <TiBook />,
  },
  {
    title: "Refund issued",
    description: "Your refund has been issued. 🎉",
    icon: <RiRefund2Fill />,
  },
];

/* ---------------- LOADER ---------------- */
const Spinner = () => (
  <svg
    className="w-4 h-4 text-gray-400 animate-spin"
    viewBox="0 0 24 24"
    fill="none"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="2"
      strokeDasharray="2 6"
      strokeLinecap="round"
    />
  </svg>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const finalStep = steps.length - 1;
  const dispatch = useDispatch();

  const [completedStep, setCompletedStep] = useState(-1);
  const [loadingStep, setLoadingStep] = useState(null);
  const [actionTooltipIndex, setActionTooltipIndex] = useState(null);
  const [stepTooltipIndex, setStepTooltipIndex] = useState(null);
  const [signComplete, setSignComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [justCompletedStep, setJustCompletedStep] = useState(null);
  const [actions, setActions] = useState([
    {
      title: "Upload W-2 form",
      description: "Lorem ipsum dolor sit amet, consectetur adipisc",
      icon: <HiOutlineDownload className="text-[20px] mr-2" />,
      btnlabel: "Upload now",
    },
    {
      title: "Answer 3 discovery questions",
      description: "Lorem ipsum dolor sit amet, consectetur adipisc",
      icon: <LuMessageCircleMore className="text-[20px] mr-2" />,
      btnlabel: "Answer now",
    },
    {
      title: "Sign the 8879 form",
      description: "Lorem ipsum dolor sit amet, consectetur adipisc",
      icon: <RiUserAddLine className="text-[20px] mr-2" />,
      btnlabel: "Sign now",
    },
  ]);

  const handleSignComplete = () => {
    setSignComplete(true);
  };

  useEffect(() => {
    let step = 0;

    const runSteps = () => {
      if (step > finalStep) return;

      setLoadingStep(step);

      setTimeout(() => {
        setCompletedStep(step);
        setLoadingStep(null);

        // Trigger step completion particle effect
        setJustCompletedStep(step);
        setTimeout(() => setJustCompletedStep(null), 800);

        // Trigger confetti on final step
        if (step === finalStep) {
          setTimeout(() => setShowConfetti(true), 400);
          setTimeout(() => setShowConfetti(false), 4000);
        }

        step++;
        setTimeout(runSteps, STEP_DELAY);
      }, LOADER_DELAY);
    };

    runSteps();
  }, [finalStep]);

  const progressHeight = completedStep < 0 ? 0 : completedStep * STEP_HEIGHT;
  const isAllCompleted = completedStep === finalStep;

  return (
    <div className="flex dash">
      <Sidebar />

      <div className="p-3 md:p-8 pb-15 w-full md:w-[80%]">
        <NavigationDrawer />
        <p className="text-[#1c1c1c] font-semibold text-[24px] md:text-[32px]">
          👋 Good to see you, Mary!
        </p>

        <p className="text-[#7c7c7c] text-[16px] md:text-[18px] mt-2 mb-8">
          We're keeping your tax prep on track. Here's what's happening right
          now.
        </p>
        <div className="flex justify-between items-start flex-col-reverse md:flex-row">
          <section className="bg-white border-0 md:border md:border-[#DBDBDB] rounded-lg p-6 w-full md:w-[60%] relative overflow-visible">
            <p className="text-[18px] font-semibold text-[#818181] mb-6">
              Current Tax Status
            </p>

            <div className="relative">
              {/* Background line (always visible) */}
              <div className="absolute top-8 bottom-6 left-[21px] w-px bg-gray-300" />

              {/* Progress line with gradient and glow */}
              <div
                className="absolute left-[21px] w-px top-8 bottom-6 timeline-progress"
                style={{
                  height: progressHeight,
                  transition: "height 700ms cubic-bezier(0.4, 0, 0.2, 1)",
                  willChange: "height",
                }}
              />

              {/* Animated pulse at progress end */}
              {completedStep >= 0 && completedStep < finalStep && (
                <div
                  className="absolute left-[21px] w-px"
                  style={{ top: `calc(2rem + ${progressHeight}px)` }}
                >
                  <div className="timeline-pulse" />
                </div>
              )}

              <ul className="space-y-6">
                {steps.map((step, index) => {
                  const isCompleted = index <= completedStep;
                  const isLoading = index === loadingStep;

                  return (
                    <li
                      key={index}
                      className={`relative flex items-center gap-4 mb-10 transition-all duration-500 ${
                        isCompleted ? "timeline-step-appear" : "opacity-60"
                      }`}
                      style={{
                        animationDelay: `${index * 150}ms`,
                        opacity: isCompleted ? 1 : 0.6,
                      }}
                    >
                      {/* ICON */}
                      <div className="z-10 shrink-0 relative">
                        {/* mask to create space in line */}
                        <div className="absolute inset-0 -m-1 bg-white rounded-full" />

                        {/* Ripple effect on step completion */}
                        {justCompletedStep === index && (
                          <div className="step-ripple" />
                        )}

                        <div
                          className={`relative w-11 h-11 rounded-full flex items-center justify-center border transition-all duration-500
                                    ${
                                      isCompleted
                                        ? "bg-[#232323] border-[#232323] timeline-icon-complete"
                                        : "bg-white border-gray-300"
                                    }
                                    ${isLoading ? "timeline-icon-loading" : ""}
                                  `}
                        >
                          {isLoading ? (
                            <Spinner />
                          ) : (
                            <span
                              className={`text-base transition-colors duration-300
                                        ${
                                          isCompleted
                                            ? "text-white"
                                            : "text-gray-400"
                                        }
                                      `}
                            >
                              {step.icon}
                            </span>
                          )}
                        </div>

                        {/* Sparkle particles on completion */}
                        {justCompletedStep === index && (
                          <div className="step-particles">
                            {[...Array(8)].map((_, i) => (
                              <div
                                key={i}
                                className="particle"
                                style={{
                                  "--angle": `${(360 / 8) * i}deg`,
                                  animationDelay: `${i * 0.05}s`,
                                }}
                              />
                            ))}
                          </div>
                        )}
                      </div>

                      {/* TEXT */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3
                            className={`text-[18px] font-semibold ${
                              isCompleted ? "text-[#232323]" : "text-gray-400"
                            }`}
                          >
                            {step.title}
                          </h3>

                          {/* INFO TOOLTIP */}
                          <div
                            className="relative"
                            onMouseEnter={() => setStepTooltipIndex(index)}
                            onMouseLeave={() => setStepTooltipIndex(null)}
                          >
                            <FiInfo className="text-[#00584E] cursor-pointer" />

                            {stepTooltipIndex === index && (
                              <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 z-10 tooltip-spring">
                                <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#f7f7f7] border-l border-b border-[#dbdbdb] rotate-45" />
                                <div className="bg-[#f7f7f7] border border-[#dbdbdb] rounded-lg p-4 shadow-xl w-72 backdrop-blur-sm">
                                  <p className="text-sm text-gray-700">
                                    {step.description}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        <p
                          className={`mt-1 text-sm ${
                            isCompleted ? "text-gray-500" : "text-gray-400"
                          }`}
                        >
                          {step.description}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* BUTTON */}
            <div className="mt-6 ml-10">
              <button
                disabled={!isAllCompleted}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm transition-all duration-300
                ${
                  isAllCompleted
                    ? "bg-[#00584E] text-white review-btn-pulse hover:shadow-lg hover:shadow-[#00584E]/30"
                    : "bg-[#00584E]/30 text-white cursor-not-allowed"
                }
              `}
                onClick={() => dispatch(openDocPreviewModal())}
              >
                <MdOutlineReviews />
                Review PDF
              </button>
            </div>

            {/* Confetti celebration */}
            {showConfetti && (
              <div className="confetti-container">
                {[...Array(50)].map((_, i) => (
                  <div
                    key={i}
                    className="confetti"
                    style={{
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 0.5}s`,
                      backgroundColor: [
                        "#00584E",
                        "#00796B",
                        "#4CAF50",
                        "#FFD700",
                        "#FF6B6B",
                      ][Math.floor(Math.random() * 5)],
                    }}
                  />
                ))}
              </div>
            )}
          </section>
          <div className="w-full md:w-[40%] ml-0 md:ml-5 ">
            <section className="rounded-lg px-4 py-6 w-full action-container">
              <p className="font-semibold text-[#818181] text-[18px] mb-6">
                Actions Required
              </p>

              <div className="space-y-4">
                {actions.map((action, index) => (
                  <article
                    className="bg-[#F7F7F7] rounded-md p-4 border border-transparent action-card transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-[#00584E]/20"
                    key={index}
                  >
                    <div className="font-semibold text-[#1c1c1c] text-[14px] md:text-[20px] flex items-center gap-2">
                      {action.title}
                      <div
                        className="relative"
                        onMouseEnter={() => setActionTooltipIndex(index)}
                        onMouseLeave={() => setActionTooltipIndex(null)}
                      >
                        <FiInfo className="w-5 h-5 cursor-pointer text-[#00584E] transition-transform duration-300 hover:rotate-12 hover:scale-110" />
                        {actionTooltipIndex === index && (
                          <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 z-10 tooltip-spring">
                            {/* Tooltip arrow */}
                            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 border border-[#dbdbdb] bg-[#f7f7f7] rotate-45"></div>

                            {/* Tooltip content */}
                            <div className="relative bg-[#f7f7f7] border border-[#dbdbdb] text-[#232323] text-sm rounded-lg p-4 shadow-xl w-72 backdrop-blur-sm">
                              <p className="leading-relaxed mb-3">
                                Lorem ipsum dolor sit amet, consectetur ut
                                labore et dolore magna aliqua.
                              </p>
                              <button
                                className="bg-[#00584E] text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 hover:bg-[#00796B] transition-colors"
                                onClick={() => navigate("/chat")}
                              >
                                <TbMessageSearch /> Ask AI now
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-[#232323] mt-2">
                      Lorem ipsum dolor sit amet, consectetur adipisc
                    </p>
                    <button
                      onClick={() => dispatch(openReviewModal())}
                      type="button"
                      className="mt-4 inline-flex items-center justify-center px-3 py-2 bg-[#00584E] text-white text-[14px] md:text-base rounded-md hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-black action-btn group"
                    >
                      <span className="group-hover:animate-bounce-small">
                        {action.icon}
                      </span>
                      {action.btnlabel}
                    </button>
                  </article>
                ))}
              </div>
            </section>
            {signComplete && (
              <div className="flex items-center justify-between md:justify-center bg-[#F2FDF6] rounded-lg text-[#24773C] mt-[10%] py-[20px] px-[10px] md:px-5 md:py-5 success-toast shadow-lg border border-[#24773C]/20">
                <IoIosCheckmarkCircleOutline className="w-6 h-6 animate-scale-check" />
                <p className="font-medium text-[15px] md:text-[18px] ml-[10px] md:ml-5">
                  8879 Form has been successfully signed !
                </p>
              </div>
            )}
          </div>

          <ReviewModal />
          <SignModal onConfirm={handleSignComplete} />
        </div>
      </div>
      {/* Document Preview Modal */}
      <DocPreviewModal />
    </div>
  );
};

export default Dashboard;
