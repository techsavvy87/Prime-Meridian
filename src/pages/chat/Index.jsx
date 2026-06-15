import React, { useState, useRef, useEffect } from "react";
import ChatSidebar from "../../components/ChatSidebar.jsx";
import ChatWindow from "../../components/ChatWindow.jsx";
import Sidebar from "../../components/Sidebar.jsx";

/* initial demo data */
const initialChats = [
  {
    id: "chat-1",
    title: "Lorem ispum dolor sit consectetur...",
    messages: [
      {
        id: "m4",
        role: "user",
        text: "Can you explain why I should sign the 8879 form?",
      },
      {
        id: "m3",
        role: "assistant",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        highlight: true, // will render special highlighted bubble with CTA
      },
    ],
    createdAt: Date.now(),
  },
  {
    id: "chat-2",
    title: "Lorem ispum dolor sit consectetur...",
    messages: [
      {
        id: "m4",
        role: "user",
        text: "Can you explain how to file my taxes?",
      },
      {
        id: "m3",
        role: "assistant",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        highlight: true, // will render special highlighted bubble with CTA
      },
      {
        id: "m5",
        role: "user",
        text: "What documents do I need to gather?",
      },
      {
        id: "m6",
        role: "assistant",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        highlight: false, // will render special highlighted bubble with CTA
      },
    ],
    createdAt: Date.now(),
  },
];

export default function Chat() {
  const [chats, setChats] = useState(initialChats);
  const [activeChatId, setActiveChatId] = useState(null);

  const addMessageToChat = (chatId, message) => {
    setChats((prev) =>
      prev.map((c) =>
        c.id === chatId ? { ...c, messages: [...c.messages, message] } : c
      )
    );
  };

  // create a new chat
  const createNewChat = () => {
    const id = `chat-${Date.now()}`;
    const newChat = {
      id,
      title: "New chat",
      messages: [
        {
          id: `${id}-m1`,
          role: "assistant",
          text: "Hello! Ask me anything about your tax return.",
        },
      ],
      createdAt: Date.now(),
    };
    setChats((p) => [newChat, ...p]);
    setActiveChatId(id);
    return id; // 👈 important
  };

  const sendMessage = (text) => {
    if (!text.trim()) return;

    let chatId = activeChatId;

    // ✅ If no active chat, create one
    if (!chatId) {
      chatId = createNewChat();
    }

    const userMsg = {
      id: `u-${Date.now()}`,
      role: "user",
      text,
    };

    addMessageToChat(chatId, userMsg);

    // simulate assistant reply
    setTimeout(() => {
      const reply = {
        id: `a-${Date.now()}`,
        role: "assistant",
        text: "Thanks — I received that. I'll analyze and let you know if anything else is needed.",
      };
      addMessageToChat(chatId, reply);
    }, 900);
  };

  // expose currently active chat
  // const activeChat = chats.find((c) => c.id === activeChatId) ?? chats[0];
  const activeChat = chats.find((c) => c.id === activeChatId) || null;

  // renaming chat on first user message (optional UX)
  useEffect(() => {
    if (!activeChat) return;
    if (activeChat.title === "New chat" && activeChat.messages.length > 1) {
      // set title to first user message text snippet
      const firstUser = activeChat.messages.find((m) => m.role === "user");
      if (firstUser) {
        setChats((prev) =>
          prev.map((c) =>
            c.id === activeChat.id
              ? { ...c, title: firstUser.text.slice(0, 24) + "..." }
              : c
          )
        );
      }
    }
  }, [activeChat?.messages.length]); // eslint-disable-line

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex min-h-screen bg-white md:w-[80%] w-full md:flex-row flex-col">
        <ChatSidebar
          chats={chats}
          activeId={activeChatId}
          onSelect={(id) => setActiveChatId(id)}
          onNewChat={createNewChat}
        />

        <main className="flex-1 py-8 relative chat-container">
          <ChatWindow chat={activeChat} onSend={sendMessage} />
        </main>
      </div>
    </div>
  );
}
