import React, { useState, useRef, useEffect } from "react";
import { ImAttachment } from "react-icons/im";
import { FiSend } from "react-icons/fi";

export default function ChatInput({
  onSend,
  placeholder = "Message Prime Meridian",
}) {
  const [value, setValue] = useState("");
  const taRef = useRef(null);

  useEffect(() => {
    adjustHeight();
  }, []);

  const adjustHeight = () => {
    const ta = taRef.current;
    if (!ta) return;

    ta.style.height = "auto";
    ta.style.overflowY = "hidden";
    ta.style.height = `${ta.scrollHeight}px`;
  };

  const submit = () => {
    const text = value.trim();
    if (!text) return;

    onSend?.(text);
    setValue("");

    requestAnimationFrame(() => {
      const ta = taRef.current;
      if (ta) {
        ta.style.height = "36px";
        ta.scrollTop = 0;
      }
    });
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className="flex items-center gap-3 py-4 px-6 m-[15px] bg-white rounded-lg border-t border-[#bfbfbf]/25">
      {/* Attachment */}
      <ImAttachment className=" w-6 h-6 text-[#00584E]" />

      {/* Input */}
      <textarea
        ref={taRef}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          requestAnimationFrame(adjustHeight);
        }}
        onKeyDown={onKeyDown}
        rows={1}
        placeholder={placeholder}
        className="chat-input"
        aria-label="Message"
      />

      {/* Send */}
      <button
        onClick={submit}
        type="button"
        aria-label="Send message"
        className="flex items-center justify-center w-12 h-12 bg-[#00584E] text-white rounded-lg hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-black"
      >
        <FiSend />
      </button>
    </div>
  );
}
