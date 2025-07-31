"use client";
import api_url from "@/api_url";
import Cookies from "js-cookie";
import { useParams, useRouter } from "next/navigation";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { currencyIndonesianFormat } from "@/helper/currency";

export default function ChatRoomDetailStatic() {
  const [messages, setMessages] = useState([]);
  const [participants, setParticipants] = useState([]);
  const messageEndRef = useRef(null);
  const { id } = useParams(); // id = userId (channel admin terhubung ke user)
  const router = useRouter();
  const wsRef = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [message, setMessage] = useState("");

  // ✅ Fetch chat data awal
  const fetchChat = async () => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/login");
      return;
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
      setMessages(data.data || []);
      setParticipants(data.participants || []);
    } catch (error) {
      console.error("Error fetching chat data:", error);
    }
  };

  // ✅ Auto scroll ke bawah
  const scrollToBottom = () => {
    setTimeout(() => {
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  // ✅ WebSocket connect (admin hanya ke channel userId)
  const connectWebSocket = () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL?.replace(
      /^https?:\/\//,
      ""
    );
    const SOCKET_URL =
      window.location.protocol === "https:"
        ? `wss://${baseUrl}/ws/chat`
        : `ws://${baseUrl}/ws/chat`;

    const token = Cookies.get("token");
    if (!token) return;

    // close socket lama jika ada
    if (wsRef.current) {
      wsRef.current.close();
    }

    // connect ke channel user (id)
    const ws = new WebSocket(
      `${SOCKET_URL}/${id.split("_")[0]}/?token=${token}`
    );
    console.log("ws", ws);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log(`✅ Connected to channel: ${id}`);
    };

    ws.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        const data = payload.data || payload;

        // Jika pesan type message
        if (data.type === "message" || data.message) {
          setMessages((prev) => [...prev, data.data.data || data]);
          scrollToBottom();
        }
      } catch (error) {
        console.error("Error parsing WS message:", error);
      }
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    ws.onclose = () => {
      console.warn("❌ WebSocket disconnected, reconnecting...");
      setTimeout(connectWebSocket, 5000); // reconnect otomatis
    };
  };

  // ✅ Fetch data awal & connect WS
  useEffect(() => {
    fetchChat();
    connectWebSocket();

    return () => {
      if (wsRef.current) wsRef.current.close();
    };
  }, [id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  console.log("messages", messages);

  // ✅ Handle post chat message
  const handlePostChatMessage = async (message) => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/login");
      return;
    }
    const url = `${api_url.chat}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          code_chat: id,
          message: message,
        }),
      });
      const data = await response.json();
      console.log("Message sent:", data);
      if (!response.ok) {
        throw new Error("Failed to post chat message");
      }

      // Clear the message input after sending
      setMessage("");
    } catch (error) {
      console.error("Error posting chat message:", error);
    }
  };

  return (
    <>
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
                  participants.map((p) => p.name).join(" & ")}
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
                  msg.user_sender.role == "admin"
                    ? "justify-end"
                    : msg.sender === participants[0]?.id
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg text-sm ${
                    msg.user_sender.role == "admin"
                      ? "bg-green-500 text-white "
                      : msg.sender === participants[0]?.id
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-blue-500 dark:bg-darkblack-300 text-bgray-900 dark:text-white rounded-bl-none"
                  }`}
                >
                  {msg.product && (
                    <div
                      onClick={() => {
                        setSelectedProduct(msg.product);
                      }}
                      className="flex items-center gap-2 mb-2 bg-gray-300 p-2 rounded-lg"
                    >
                      <Image
                        src={
                          msg.product.images[0].image || "/default-avatar.png"
                        }
                        alt={msg.product.name}
                        className="w-10 h-10 rounded object-cover"
                        width={40}
                        height={40}
                      />
                      <div className="flex-1">
                        <p className="text-black font-medium text-sm">
                          {msg.product.name || "Product Name"}
                        </p>
                        <p className="text-gray-600 text-xs">
                          {currencyIndonesianFormat(
                            parseInt(msg.product.price) || 0
                          )}
                        </p>
                      </div>
                    </div>
                  )}
                  {msg.transaction && (
                    <div
                      onClick={() => {
                        setSelectedProduct(msg.transaction);
                      }}
                      className="flex items-center gap-2 mb-2 bg-gray-300 p-2 rounded-lg text-start"
                    >
                      <Image
                        src={
                          msg.transaction.product.image || "/default-avatar.png"
                        }
                        alt={msg.transaction.product.name}
                        className="w-10 h-10 rounded object-cover"
                        width={40}
                        height={40}
                      />
                      <div className="flex-1">
                        {/* show order id */}
                        <p className="text-gray-500 text-xs">
                          {msg.transaction.id
                            ? `${msg.transaction.order_id}`
                            : ""}
                        </p>

                        <p className="text-black font-medium text-sm">
                          {msg.transaction.product.name || "Product Name"}
                        </p>
                        <p className="text-gray-600 text-xs">
                          {currencyIndonesianFormat(
                            parseInt(msg.transaction.product.price) || 0
                          )}
                        </p>
                      </div>
                    </div>
                  )}
                  {msg.message}
                  <div className="text-[10px] opacity-70 mt-1">
                    {new Date(msg.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                  <div className="text-sm opacity-70 mt-1 font-bold">
                    {msg.user_sender.name}
                  </div>
                </div>
              </div>
            ))}
          <div ref={messageEndRef}></div>
        </div>
        <div className="shrink-0 flex items-center gap-2 pt-2 p-4 bg-[#00bbff]/20 border-t border-white/30">
          <div className="flex-1 flex flex-col gap-2">
            {/* Textarea */}
            <textarea
              value={message}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  if (message.trim()) {
                    handlePostChatMessage(message);
                    setMessage("");
                  }
                }
              }}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message"
              className="w-full px-4 py-2 rounded-lg bg-white text-black focus:outline-none resize-none h-15 shadow-inner"
            />
          </div>

          {/* Send Button */}
          <button
            type="button"
            onClick={() => {
              if (message.trim()) {
                handlePostChatMessage(message);
                setMessage("");
              }
            }}
            className={`px-4 py-2mb-6 bg-[#00BBFF] text-white rounded-lg flex items-center gap-2 hover:bg-[#009edb] transition`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M3.4,20.4l18-8.1c0.5-0.2,0.5-1,0-1.2l-18-8.1c-0.5-0.2-1,0.2-1,0.7V9.1c0,0.3,0.2,0.6,0.5,0.7l12.5,2.2l-12.5,2.2
            c-0.3,0.1-0.5,0.4-0.5,0.7v4.4C2.4,20.2,2.9,20.6,3.4,20.4z"
              />
            </svg>
          </button>
        </div>
      </div>
      {/* selectedProduct open modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-white/10 bg-opacity-50 flex items-center justify-center z-50">
          <div className="p-4 bg-purple-500 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold text-lg mb-4">
                Product Details
              </h2>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-white hover:text-gray-300 transition"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              {selectedProduct?.product ? (
                <>
                  <img
                    src={selectedProduct.product.image || "/default-avatar.png"}
                    alt={selectedProduct.product.name || "Product Image"}
                    className="w-full h-48 object-cover rounded mb-4"
                  />
                  {/* order id */}
                  {selectedProduct.order_id && (
                    <p className="text-gray-500 text-xs mb-2">
                      {selectedProduct.order_id}
                    </p>
                  )}
                  <h3 className="text-black font-medium text-lg mb-2">
                    {selectedProduct.product.name || "Product Name"}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {selectedProduct.product.description ||
                      "No description available."}
                  </p>
                  <p className="text-black font-semibold text-lg">
                    {currencyIndonesianFormat(
                      parseInt(selectedProduct.product.price) || 0
                    )}
                  </p>
                  <div className="flex  gap-2 mt-4">
                    {selectedProduct.status.id === -1 && (
                      <button className="bg-red-600 px-4 py-1  text-sm">
                        {selectedProduct.status.message.ind}
                      </button>
                    )}
                    {selectedProduct.status.id == 1 && (
                      <button className="bg-yellow-600 px-4 py-1  text-sm">
                        {selectedProduct.status.message.ind}
                      </button>
                    )}
                    {selectedProduct.status.id == 10 && (
                      <button className="bg-green-600 px-4 py-1  text-sm">
                        {selectedProduct.status.message.ind}
                      </button>
                    )}
                    {selectedProduct.status.id == 20 && (
                      <button className="bg-green-600 px-4 py-1  text-sm">
                        {selectedProduct.status.message.ind}
                      </button>
                    )}
                    {selectedProduct.status.id == 25 && (
                      <button className="bg-red-600 px-4 py-1  text-sm">
                        {selectedProduct.status.message.ind}
                      </button>
                    )}
                    {selectedProduct.status.id == 30 && (
                      <button className="bg-green-600 px-4 py-1  text-sm">
                        {selectedProduct.status.message.ind}
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <img
                    src={
                      selectedProduct?.images[0].image || "/default-avatar.png"
                    }
                    alt={selectedProduct?.name || "Product Image"}
                    className="w-full h-48 object-cover rounded mb-4"
                  />
                  <h3 className="text-black font-medium text-lg mb-2">
                    {selectedProduct?.name || "Product Name"}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {selectedProduct?.description ||
                      "No description available."}
                  </p>
                  <p className="text-black font-semibold text-lg">
                    {currencyIndonesianFormat(
                      parseInt(selectedProduct?.price) || 0
                    )}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
