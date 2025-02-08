import React, { useState } from "react";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: "AI", text: "Hi, how can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    const question = input.trim();
    if (!question) return;

    // Append the user's question and clear the input
    setMessages((prev) => [...prev, { type: "User", text: question }]);
    setInput("");

    // Show loading animation while waiting for the answer
    setLoading(true);

    try {
      const response = await fetch("http://192.168.11.141:8000/chatbot/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("API Answer Response:", data);
      setMessages((prev) => [...prev, { type: "AI", text: data.answer }]);
    } catch (error) {
      console.error("Error fetching chatbot answer:", error);
      setMessages((prev) => [
        ...prev,
        {
          type: "AI",
          text: "Sorry, there was an error retrieving the answer.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Icon Button */}
      <button
        onClick={toggleChat}
        className="inline-flex items-center justify-center text-sm font-medium disabled:pointer-events-none disabled:opacity-50 border rounded-full w-16 h-16 bg-black hover:bg-gray-700 m-0 cursor-pointer border-gray-200 p-0 normal-case leading-5"
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white"
        >
          <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
        </svg>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            boxShadow: "0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05)",
          }}
          className="fixed bottom-[calc(4rem+1.5rem)] right-0 mr-4 bg-white p-6 rounded-lg border border-[#e5e7eb] w-[440px] h-[634px]"
        >
          {/* Heading */}
          <div className="flex flex-col space-y-1.5 pb-6">
            <h2 className="font-semibold text-lg tracking-tight">Chatbot</h2>
            <p className="text-sm text-[#6b7280] leading-3">
              Powered by Mendable and Vercel
            </p>
          </div>

          {/* Chat Container with overflow-y-auto for scroll */}
          <div
            className="pr-4 h-[474px] overflow-y-auto"
            style={{ minWidth: "100%" }}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 my-4 text-gray-600 text-sm flex-1 ${
                  message.type === "User" ? "justify-end" : "justify-start"
                }`}
              >
                {message.type === "AI" && (
                  <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                    <div className="rounded-full bg-gray-100 border p-1">
                      <svg
                        stroke="none"
                        fill="black"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        height="20"
                        width="20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                        />
                      </svg>
                    </div>
                  </span>
                )}
                <p className="leading-relaxed max-w-[300px]">
                  <span className="block font-bold text-gray-700">
                    {message.type === "AI" ? "AI" : "You"}
                  </span>
                  {message.text}
                </p>
              </div>
            ))}

            {/* Loading Animation */}
            {loading && (
              <div className="flex justify-center items-center my-4">
                <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>

          {/* Input Box */}
          <div className="flex items-center pt-0">
            <form
              className="flex items-center justify-center w-full space-x-2"
              onSubmit={handleSend}
            >
              <input
                className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2"
                placeholder="Type your message"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                className="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50 bg-black hover:bg-[#111827E6] h-10 px-4 py-2"
                type="submit"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
