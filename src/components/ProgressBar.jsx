import { useSelector } from "react-redux";
import {
  selectCurrentStep,
  selectTotalSteps,
} from "../redux/progress/progressSelectors";

const ProgessBar = () => {
  const currentStep = useSelector(selectCurrentStep);
  const totalSteps = useSelector(selectTotalSteps);

  return (
    <div className="progress w-[70%] md:w-[40%] flex justify-between">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={`w-10 h-0.75 md:w-[50px] md:h-[5px] rounded-[30px]
            ${index < currentStep ? "bg-[#00584E]" : "bg-[#BFBFBF]"}
          `}
        />
      ))}
    </div>
  );
};

export default ProgessBar;
