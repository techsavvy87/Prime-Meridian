import { useState } from "react";
import swapImg from "../assets/imgs/swap.png";

const SignStyle = ({ fullName, initials }) => {
  const [styleIndex, setStyleIndex] = useState(0);

  const styles = [
    {
      text: { fontFamily: "Lovers Quarrel, cursive" },
      nameStyle: { fontFamily: "Lovers Quarrel, cursive" },
    },
    {
      text: { fontFamily: "Love Ya Like A Sister, cursive" },
      nameStyle: { fontFamily: "Love Ya Like A Sister, cursive" },
    },
    {
      text: { fontFamily: "Long Cang, cursive" },
      nameStyle: { fontFamily: "Long Cang, cursive" },
    },
    {
      text: { fontFamily: "Luckiest Guy, cursive" },
      nameStyle: { fontFamily: "Luckiest Guy, cursive" },
    },
  ];

  const currentStyle = styles[styleIndex];

  const handleChangeStyle = () => {
    // console.log("Change Style clicked");
    setStyleIndex((prev) => (prev + 1) % styles.length);
    console.log("Style index now:", (styleIndex + 1) % styles.length);
  };
  return (
    <>
      <div className="flex items-center justify-between gap-5 mt-5 bg-[#F9F9F9] h-[150px] rounded-lg px-5 py-10">
        {/* Full Name Display */}
        <span className="text-[32px]" style={currentStyle.nameStyle}>
          {fullName || ""}
        </span>
        {/* Initials Display */}
        <span className="text-[32px]" style={currentStyle.text}>
          {initials || ""}
        </span>
      </div>
      {/* Change Style Button */}

      <div
        className="flex items-center justify-center cursor-pointer mt-5"
        onClick={handleChangeStyle}
      >
        <img src={swapImg} alt="swap icon" />
        <p className="text-[#00584E] text-base underline ml-2">Change Style</p>
      </div>
    </>
  );
};

export default SignStyle;
