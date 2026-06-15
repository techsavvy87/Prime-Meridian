import React from "react";
import chatlogo from "../assets/imgs/chat-logo.png";
import { AiOutlineUserAdd } from "react-icons/ai";

/* single message render */
export default function Message({ message }) {
  const isAssistant = message.role === "assistant";
  const highlight = message.highlight;

  if (isAssistant) {
    return (
      <div className="flex gap-4">
        <div
          className={`flex items-start gap-4 w-full md:w-[80%] p-4 rounded-lg ${
            highlight ? "bg-[#F0F6FF] border border-[#BFBFBF]/25" : ""
          }`}
        >
          {/* highlighted assistant card */}
          <img src={chatlogo} alt="Assistant" className="w-10 h-10" />
          <div>
            <div className="text-sm text-black whitespace-pre-line">
              {message.text}
            </div>
            {highlight && (
              <div className="mt-4 flex items-center gap-4">
                <button className="bg-[#00584E] text-white px-4 py-2 rounded-md text-sm flex items-center gap-2">
                  <AiOutlineUserAdd className="w-5 h-5" />
                  Sign now
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  // user message (right aligned)
  return (
    <div className="flex justify-end">
      <div className="bg-[#FFFFFF]/65 border border-[#bfbfbf]/25 px-4 py-3 rounded-lg message-max text-sm text-black whitespace-pre-line">
        {message.text}
      </div>
    </div>
  );
}
