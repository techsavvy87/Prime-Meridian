import React, { useRef, useEffect } from "react";
import Message from "./Message";
import ChatInput from "./ChatInput";
import chatlogo from "../assets/imgs/chat-logo.png";

/* displays messages and input */
export default function ChatWindow({ chat, onSend }) {
  const endRef = useRef(null);

  useEffect(() => {
    // auto scroll to bottom when chat changes
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat?.messages?.length]);

  return (
    <div className="flex flex-col min-h-[79vh] md:min-h-[93vh]">
      <header
        className={`mb-6 px-3 md:px-10 flex items-start gap-4 ${
          chat ? "" : "mt-[70%] md:mt-[40%]"
        }`}
      >
        <img src={chatlogo} alt="chat logo" className="w-10 h-10" />
        <div className="w-[70%]">
          <p className="text-[24px] md:text-[36px] font-semibold text-[#1c1c1c]">
            Welcome to your AI Tax Assistant
          </p>
          <p className="text-[14px] md:text-base font-medium text-black mt-1">
            Hi! I’m your personal assistant here to help you navigate your tax
            return, answer questions, and guide you step-by-step through the
            process. <br />
            <br /> Ask me anything - I’m here to make things easier.
          </p>
        </div>
      </header>

      {chat && (
        <section className="flex-1 overflow-auto scrollbar-thin px-3 md:px-10 max-h-[49vh] md:max-h-[70vh] msg-list">
          <div className="space-y-6">
            {chat.messages.map((m) => (
              <Message key={m.id} message={m} />
            ))}
            <div ref={endRef} />
          </div>
        </section>
      )}

      <div className="absolute bottom-0 left-0 right-0">
        <ChatInput onSend={onSend} placeholder="Message Prime Meridian" />
      </div>
    </div>
  );
}
