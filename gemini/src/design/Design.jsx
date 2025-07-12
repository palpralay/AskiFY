import { useState, useRef, useEffect } from "react";
import { IoMenu, IoDiamondOutline } from "react-icons/io5";
import { IoMdSend } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { TfiSettings } from "react-icons/tfi";
import { CgProfile } from "react-icons/cg";
import { URL } from "./constant";

function Design() {
  const [collapsed, setCollapsed] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const chatEndRef = useRef(null);

  // Greeting suggestions
  const greetingSuggestions = [
    "Good morning!",
    "Morning!",
    "Hey, good morning!",
    "Top of the morning to you!",
    "Rise and shine!",
    "Buenos días!",
    "Bonjour!",
    "Guten Morgen!",
    "Ohayo gozaimasu!",
    "How's your morning going?"
  ];

  const askQuestion = async () => {
    if (!question.trim()) return;
    
    // Add user's question to chat history
    const newChatHistory = [
      ...chatHistory,
      { text: question, isUser: true }
    ];
    setChatHistory(newChatHistory);
    
    setLoading(true);
    setError(null);
    setQuestion("");
    
    try {
      const payload = {
        contents: [
          {
            parts: [{ text: question }],
          },
        ],
      };

      let response = await fetch(URL, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      response = await response.json();
      const aiResponse = response.candidates[0].content.parts[0].text;
      
      // Add AI response to chat history
      setChatHistory([
        ...newChatHistory,
        { text: aiResponse, isUser: false }
      ]);
    } catch (err) {
      setError(err.message || "Failed to get response");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Auto-scroll to bottom when chat updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  return (
    <div className="min-h-screen flex bg-zinc-900 text-white">
      {/* Sidebar */}
      <aside
        className={`h-screen bg-zinc-950 fixed transition-all duration-300 flex flex-col justify-between 
        ${collapsed ? "w-16" : "w-64"} p-4`}
      >
        {/* Top Section */}
        <div className="flex flex-col gap-4">
          {/* Toggle Button */}
          <div
            className="text-2xl hover:bg-zinc-800 p-2 cursor-pointer rounded-full w-fit"
            onClick={() => setCollapsed(!collapsed)}
          >
            <IoMenu />
          </div>

          {/* New Chat */}
          <button 
            className="flex items-center gap-3 text-zinc-300 hover:text-white p-2 hover:bg-zinc-800 rounded-md"
            onClick={() => setChatHistory([])}
          >
            <FaRegEdit className="text-xl" />
            {!collapsed && <span>New chat</span>}
          </button>

          {/* Explore Gems */}
          <button className="flex items-center gap-3 text-zinc-300 hover:text-white p-2 hover:bg-zinc-800 rounded-md">
            <IoDiamondOutline className="text-xl" />
            {!collapsed && <span>Explore Gems</span>}
          </button>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3 text-zinc-400 hover:text-white text-sm p-2 hover:bg-zinc-800 rounded-md cursor-pointer">
            <TfiSettings className="text-xl" />
            {!collapsed && <span>Settings and help</span>}
          </div>
          <div className="flex items-center gap-3 text-zinc-400 hover:text-white text-sm p-2 hover:bg-zinc-800 rounded-md cursor-pointer">
            <CgProfile className="text-xl" />
            {!collapsed && <span>User Profile</span>}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-between ml-16 px-6 pt-4 pb-6">
        {/* Chat History */}
        <div className="flex-1 overflow-y-auto py-4 space-y-6 max-w-3xl w-full mx-auto">
          {chatHistory.length === 0 && (
            <div className="text-center mt-20">
              <h1 className="bg-gradient-to-r text-5xl from-red-600 via-green-500 to-indigo-400 mb-12 inline-block text-transparent bg-clip-text">
                Hello, DEV
              </h1>
              <p className="text-zinc-400 mb-8">Try one of these greetings:</p>
              <div className="flex flex-wrap justify-center gap-3">
                {greetingSuggestions.map((greeting, index) => (
                  <button
                    key={index}
                    onClick={() => setQuestion(greeting)}
                    className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg transition-all"
                  >
                    {greeting}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {chatHistory.map((chat, index) => (
            <div 
              key={index} 
              className={`flex ${chat.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[85%] rounded-2xl p-4 ${
                  chat.isUser 
                    ? 'bg-blue-600 rounded-br-none' 
                    : 'bg-zinc-800 rounded-bl-none'
                }`}
              >
                {chat.text}
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="flex justify-start">
              <div className="bg-zinc-800 rounded-2xl rounded-bl-none p-4">
                <div className="flex space-x-2">
                  <div className="h-2 w-2 bg-white rounded-full animate-bounce"></div>
                  <div className="h-2 w-2 bg-white rounded-full animate-bounce delay-75"></div>
                  <div className="h-2 w-2 bg-white rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            </div>
          )}
          
          {error && (
            <div className="flex justify-start">
              <div className="bg-red-900/30 text-red-400 rounded-2xl rounded-bl-none p-4">
                Error: {error}
              </div>
            </div>
          )}
          
          <div ref={chatEndRef} />
        </div>

        {/* Input Box */}
        <div className="relative w-full max-w-2xl mx-auto bg-zinc-800 rounded-2xl p-4 shadow-md">
          <input
            onChange={(e) => setQuestion(e.target.value)}
            value={question}
            type="text"
            placeholder="Ask anything..."
            className="w-full bg-transparent text-white placeholder-zinc-400 border border-zinc-700 rounded-xl py-4 px-5 pr-16 
                       focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
            onKeyDown={(e) => e.key === "Enter" && askQuestion()}
            disabled={loading}
          />

          <button
            onClick={askQuestion}
            disabled={loading || !question.trim()}
            className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all
              ${loading || !question.trim() 
                ? "text-zinc-500 cursor-not-allowed" 
                : "text-blue-400 hover:text-blue-300 hover:scale-110"}`}
          >
            <IoMdSend className="text-3xl" />
          </button>
        </div>
      </main>
    </div>
  );
}

export default Design;