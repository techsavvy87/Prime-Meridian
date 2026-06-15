import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import { MdAccessTime } from "react-icons/md";
import { BsClock } from "react-icons/bs";

const ChatDrawer = ({ chats = [], activeId, onSelect }) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <div className="block md:hidden">
      <div className="flex items-center md:hidden" onClick={toggleDrawer(true)}>
        <BsClock className="w-4 h-4 text-[#00584E]" />
        <span className="ml-2 font-medium font-base text-[#00584E]">
          History
        </span>
      </div>

      {/* Drawer */}
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: { width: "80%" },
        }}
        anchor="left"
      >
        <aside className="w-full min-h-screen bg-[#FFFFFD] px-[10px]">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between py-10">
              <p className="font-semibold font-inter text-[18px] text-[#232323] ">
                Prime Meridian
              </p>
            </div>

            <nav>
              <div className="text-[14px] text-gray-400 mb-2 flex items-center gap-1 pt-5 border-t border-[#d9d9d9]">
                <MdAccessTime />
                Today
              </div>
              <ul className="space-y-2">
                {chats.map((c) => (
                  <li key={c.id}>
                    <button
                      onClick={() => {
                        onSelect(c.id);
                        toggleDrawer(false)();
                      }}
                      className={`w-full text-left px-3 py-3 rounded-md flex items-center justify-between ${
                        c.id === activeId ? "bg-[#F9F9F9]" : "hover:bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-sm text-[#232323]">{c.title}</div>
                      </div>
                      <div className="text-xs text-gray-400">{/* time */}</div>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>
      </Drawer>
    </div>
  );
};

export default ChatDrawer;
