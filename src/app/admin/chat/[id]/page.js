"use client";
import api_url from "@/api_url";
import Cookies from "js-cookie";
import { useParams, useRouter } from "next/navigation";
import React, { useRef, useEffect, useState, use } from "react";

export default function ChatRoomDetailStatic() {
  const [messages, setMessages] = useState("");
  const [participants, setParticipants] = useState("");
  const messageEndRef = useRef(null);
  const { id } = useParams();
  const router = useRouter();
  const dummyRoom = {
    participant: {
      name: "Toko Maju Jaya",
      is_online: true,
      image: "https://via.placeholder.com/40x40.png?text=TJ",
    },
    messages: [
      {
        message: "Halo, barang masih tersedia?",
        isMine: false,
        time: "14:10",
      },
      {
        message: "Iya, masih tersedia kak.",
        isMine: true,
        time: "14:11",
      },
      {
        message: "Oke saya order ya.",
        isMine: false,
        time: "14:12",
      },
      {
        message: "Siap kak, terima kasih 🙏",
        isMine: true,
        time: "14:13",
      },
    ],
  };

  const fetchChat = async () => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/login");
    }

    const url = `${api_url.chat}?code_chat=${id}`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch chat data");
      }
      const data = await response.json();
      setMessages(data.data);
      setParticipants(data.participants);
    } catch (error) {
      console.error("Error fetching chat data:", error);
    }
  };

  useEffect(() => {
    fetchChat();
  }, [id, router]);

  const handleSend = () => {
    if (message.trim() !== "") {
      dummyRoom.messages.push({
        message,
        isMine: true,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
      setMessage("");
      scrollToBottom();
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <div className="w-full h-[calc(100vh-250px)] border border-gray-800 flex flex-col bg-white dark:bg-darkblack-600 rounded-lg overflow-hidden scroll-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-bgray-200 dark:border-darkblack-400">
        <div className="flex items-center space-x-4">
          <div className="flex justify-center items-center gap-6">
            {/* button back */}
            <button
              onClick={() => router.back()}
              className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 inline-block ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              kembali
            </button>
            <p className="text-sm font-semibold text-bgray-900 dark:text-white">
              {participants.length > 0 &&
                participants
                  ?.map((participant) => participant.name)
                  .join(" & ")}
            </p>
          </div>
        </div>
      </div>

      {/* Chat Body */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-bgray-50 dark:bg-darkblack-500">
        {messages.length > 0 &&
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === participants[0].id
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg text-sm ${
                  msg.sender === participants[0].id
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-blue-500 dark:bg-darkblack-300 text-bgray-900 dark:text-white rounded-bl-none"
                }`}
              >
                {msg.message}
                {msg.sender}
                {participants[0].id}
                <div className="text-[10px]  opacity-70 mt-1">
                  {/* convert to date time */}
                  {new Date(msg.created_at).toLocaleDateString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                {/* pengirim */}
                <div className="text-sm opacity-70 mt-1 font-bold">
                  {msg.sender === participants[0].id
                    ? participants[0].name
                    : participants[1].name}
                </div>
              </div>
            </div>
          ))}
        <div ref={messageEndRef}></div>
      </div>
    </div>
  );
}
