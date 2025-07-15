import { useState, useRef, useEffect } from "react";
import {
  Menu,
  Diamond,
  Send,
  Edit3,
  Settings,
  User,
  Copy,
  RefreshCw,
} from "lucide-react";
import { URL } from "./constant";

function Switch({ onToggle, isLightMode }) {
  const handleChange = (e) => {
    onToggle(e.target.checked);
  };

  return (
    <div className="flex items-center gap-2">
      <label className="relative inline-block w-16 h-9 rounded-full shadow-md">
        <input
          checked={isLightMode}
          onChange={handleChange}
          type="checkbox"
          className="opacity-0 w-0 h-0"
        />
        <span
          className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 transition-all duration-400 rounded-full overflow-hidden ${
            isLightMode ? "bg-blue-400" : "bg-gray-700"
          }`}
        >
          <span
            className={`absolute h-5 w-5 rounded-full bottom-2 left-2 transition-all duration-400 ${
              isLightMode ? "transform translate-x-7 shadow-sun" : "shadow-moon"
            }`}
            style={{
              boxShadow: isLightMode
                ? "inset 15px -4px 0px 15px #ffcf48"
                : "inset 8px -4px 0px 0px #fff",
            }}
          />

          {/* Stars for dark mode */}
          <div
            className={`absolute w-1.5 h-1.5 bg-white rounded-full top-2 left-10 transition-opacity duration-400 ${
              isLightMode ? "opacity-0" : "opacity-100"
            }`}
          />
          <div
            className={`absolute w-1.5 h-1.5 bg-white rounded-full top-5 left-9 transition-opacity duration-400 ${
              isLightMode ? "opacity-0" : "opacity-100"
            }`}
          />
          <div
            className={`absolute w-1.5 h-1.5 bg-white rounded-full top-4 left-12 transition-opacity duration-400 ${
              isLightMode ? "opacity-0" : "opacity-100"
            }`}
          />

          {/* Cloud for light mode */}
          <svg
            viewBox="0 0 16 16"
            className={`absolute w-14 h-14 -bottom-5 -left-4 transition-opacity duration-400 ${
              isLightMode ? "opacity-100" : "opacity-0"
            }`}
          >
            <path
              transform="matrix(.77976 0 0 .78395-299.99-418.63)"
              fill="#fff"
              d="m391.84 540.91c-.421-.329-.949-.524-1.523-.524-1.351 0-2.451 1.084-2.485 2.435-1.395.526-2.388 1.88-2.388 3.466 0 1.874 1.385 3.423 3.182 3.667v.034h12.73v-.006c1.775-.104 3.182-1.584 3.182-3.395 0-1.747-1.309-3.186-2.994-3.379.007-.106.011-.214.011-.322 0-2.707-2.271-4.901-5.072-4.901-2.073 0-3.856 1.202-4.643 2.925"
            />
          </svg>
        </span>
      </label>
    </div>
  );
}

function Design() {
  const [collapsed, setCollapsed] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLightMode, setIsLightMode] = useState(false);
  const chatEndRef = useRef(null);

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
    "How's your morning going?",
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const askQuestion = async () => {
    if (!question.trim()) return;

    const newChatHistory = [
      ...chatHistory,
      {
        text: question,
        isUser: true,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ];
    setChatHistory(newChatHistory);

    setLoading(true);
    setError(null);
    const currentQuestion = question;
    setQuestion("");

    try {
      const res = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: currentQuestion }] }],
        }),
      });

      const data = await res.json();

      if (!res.ok || !data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        throw new Error("Invalid response from Gemini API");
      }

      const aiResponse = data.candidates[0].content.parts[0].text;

      setChatHistory([
        ...newChatHistory,
        {
          text: aiResponse,
          isUser: false,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } catch (err) {
      setError(err.message || "Failed to get response");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const retryLastQuestion = () => {
    const lastUserMessage = chatHistory.filter((chat) => chat.isUser).pop();
    if (lastUserMessage) {
      setQuestion(lastUserMessage.text);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, loading]);

  // Dynamic theme classes
  const themeClasses = {
    background: isLightMode
      ? "bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900"
      : "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white",

    sidebar: isLightMode
      ? "bg-white/70 backdrop-blur-sm border-gray-200/50"
      : "bg-slate-950/50 backdrop-blur-sm border-slate-700/50",

    sidebarButton: isLightMode
      ? "text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"
      : "text-slate-300 hover:text-white hover:bg-slate-800/50",

    sidebarBottomButton: isLightMode
      ? "text-gray-500 hover:text-gray-900 hover:bg-gray-100/50"
      : "text-slate-400 hover:text-white hover:bg-slate-800/50",

    userMessage: isLightMode
      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
      : "bg-gradient-to-r from-blue-600 to-blue-700",

    aiMessage: isLightMode
      ? "bg-gray-100/70 border border-gray-200/50 text-gray-900"
      : "bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm",

    inputContainer: isLightMode
      ? "bg-white/70 backdrop-blur-sm border border-gray-200/50"
      : "bg-slate-800/50 backdrop-blur-sm border border-slate-700/50",

    input: isLightMode
      ? "bg-transparent text-gray-900 placeholder-gray-500 border border-gray-300/50 focus:ring-blue-500/50 focus:border-blue-500"
      : "bg-transparent text-white placeholder-slate-400 border border-slate-600/50 focus:ring-blue-500/50 focus:border-blue-500",

    sendButton: isLightMode
      ? "text-blue-500 hover:text-blue-600 hover:bg-blue-500/10"
      : "text-blue-400 hover:text-blue-300 hover:bg-blue-500/10",

    greetingButton: isLightMode
      ? "bg-gray-100/70 hover:bg-gray-200/70 border border-gray-200/50 text-gray-700"
      : "bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/30",

    copyButton: isLightMode
      ? "text-gray-500 hover:text-gray-700"
      : "text-slate-400 hover:text-white",

    timestamp: isLightMode ? "text-gray-500" : "text-slate-400",

    errorMessage: isLightMode
      ? "bg-red-50/70 text-red-600 border border-red-200/50"
      : "bg-red-900/30 text-red-400 border border-red-700/50",

    title: isLightMode
      ? "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
      : "bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400",

    subtitle: isLightMode ? "text-gray-600" : "text-slate-400",
  };

  return (
    <div className={`min-h-screen flex ${themeClasses.background}`}>
      {/* Sidebar */}
      <aside
        className={`h-screen ${
          themeClasses.sidebar
        } fixed transition-all duration-300 flex flex-col justify-between border-r ${
          collapsed ? "w-16" : "w-64"
        } p-4 z-10`}
      >
        <div className="flex flex-col gap-4">
          <div
            className={`text-2xl ${themeClasses.sidebarButton} p-2 cursor-pointer rounded-lg w-fit transition-all`}
            onClick={() => setCollapsed(!collapsed)}
          >
            <Menu />
          </div>

          <button
            className={`flex items-center gap-3 ${themeClasses.sidebarButton} p-3 rounded-lg transition-all`}
            onClick={() => setChatHistory([])}
          >
            <Edit3 className="text-lg" />
            {!collapsed && <span>New chat</span>}
          </button>

          <button
            className={`flex items-center gap-3 ${themeClasses.sidebarButton} p-3 rounded-lg transition-all`}
          >
            <Diamond className="text-lg" />
            {!collapsed && <span>Explore Gems</span>}
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <div
            className={`flex items-center gap-3 ${themeClasses.sidebarBottomButton} text-sm p-3 rounded-lg cursor-pointer transition-all`}
          >
            <Settings className="text-lg" />
            {!collapsed && <span>Settings and help</span>}
          </div>
          <div
            className={`flex items-center gap-3 ${themeClasses.sidebarBottomButton} text-sm p-3 rounded-lg cursor-pointer transition-all`}
          >
            {!collapsed && (
              <div className="flex items-center gap-2">
                <span className="text-sm">Theme:</span>
                <Switch onToggle={setIsLightMode} isLightMode={isLightMode} />
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 flex flex-col justify-between transition-all duration-300 px-6 pt-4 pb-6 ${
          collapsed ? "ml-16" : "ml-64"
        }`}
      >
        {/* Chat History */}
        <div className="flex-1 overflow-y-auto py-4 space-y-6 max-w-4xl w-full mx-auto">
          {chatHistory.length === 0 && (
            <div className="text-center mt-20">
              <h1
                className={`${themeClasses.title} text-6xl mb-12 inline-block text-transparent bg-clip-text font-bold`}
              >
                Hello, DEV
              </h1>
              <p className={`${themeClasses.subtitle} mb-8 text-lg`}>
                Try one of these greetings:
              </p>
              <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
                {greetingSuggestions.map((greeting, index) => (
                  <button
                    key={index}
                    onClick={() => setQuestion(greeting)}
                    className={`${themeClasses.greetingButton} px-4 py-2 rounded-xl transition-all hover:scale-105`}
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
              className={`flex ${
                chat.isUser ? "justify-end" : "justify-start"
              } group`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-4 relative ${
                  chat.isUser
                    ? `${themeClasses.userMessage} rounded-br-md shadow-lg`
                    : `${themeClasses.aiMessage} rounded-bl-md`
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="whitespace-pre-wrap leading-relaxed">
                      {chat.text}
                    </div>
                  </div>
                  {!chat.isUser && (
                    <button
                      onClick={() => copyToClipboard(chat.text)}
                      className={`ml-3 p-1 ${themeClasses.copyButton} opacity-0 group-hover:opacity-100 transition-all`}
                      title="Copy response"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className={`text-xs ${themeClasses.timestamp} mt-2`}>
                  {chat.timestamp}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div
                className={`${themeClasses.aiMessage} rounded-2xl rounded-bl-md p-4`}
              >
                <div className="flex space-x-2">
                  <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce delay-75"></div>
                  <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="flex justify-start">
              <div
                className={`${themeClasses.errorMessage} rounded-2xl rounded-bl-md p-4`}
              >
                <div className="flex items-center gap-2">
                  <span>Error: {error}</span>
                  <button
                    onClick={retryLastQuestion}
                    className="ml-2 p-1 hover:bg-red-800/30 rounded transition-all"
                    title="Retry"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Box */}
        <div className="relative w-full max-w-3xl mx-auto">
          <div
            className={`${themeClasses.inputContainer} rounded-2xl p-4 shadow-2xl`}
          >
            <div className="flex items-end gap-3">
              <input
                onChange={(e) => setQuestion(e.target.value)}
                value={question}
                type="text"
                placeholder="Ask anything..."
                className={`flex-1 ${themeClasses.input} rounded-xl py-3 px-4 focus:outline-none focus:ring-2 transition-all resize-none`}
                onKeyDown={(e) =>
                  e.key === "Enter" && !e.shiftKey && askQuestion()
                }
                disabled={loading}
              />
              <button
                onClick={askQuestion}
                disabled={loading || !question.trim()}
                className={`p-3 rounded-xl transition-all ${
                  loading || !question.trim()
                    ? isLightMode
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-slate-500 cursor-not-allowed"
                    : `${themeClasses.sendButton} hover:scale-105`
                }`}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Design;
