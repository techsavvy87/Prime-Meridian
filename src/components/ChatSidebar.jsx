import React from "react";
import { MdAccessTime } from "react-icons/md";
import NavigationDrawer from "./NavigationDrawer";
import ChatDrawer from "./ChatDrawer";

/* Simple sidebar with New Chat and chat list */
export default function ChatSidebar({
  chats = [],
  activeId,
  onSelect,
  onNewChat,
}) {
  return (
    <aside className="w-full md:w-80 border-r border-[#BFBFBF]/25 bg-white">
      <div className="mx-6">
        <NavigationDrawer />
      </div>

      <div className="flex items-center justify-between mx-6 py-0 md:py-6 border-0 md:border-b md:border-[#dbdbdb]">
        <ChatDrawer chats={chats} activeId={activeId} onSelect={onSelect} />
        <button
          onClick={onNewChat}
          className="text-left flex items-center gap-3 text-base font-medium px-3 py-2 text-[#00584E]"
        >
          + New Chat
        </button>
      </div>

      <div className="px-5 mt-5 hidden md:block">
        <div className="text-[14px] text-gray-400 mb-2 flex items-center gap-1">
          <MdAccessTime />
          Today
        </div>
        <ul className="space-y-2">
          {chats.map((c) => (
            <li key={c.id}>
              <button
                onClick={() => onSelect(c.id)}
                className={`w-full text-left px-3 py-3 rounded-md flex items-center justify-between ${
                  c.id === activeId ? "bg-[#F9F9F9]" : "hover:bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="text-sm text-gray-700">{c.title}</div>
                </div>
                <div className="text-xs text-gray-400">{/* time */}</div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
