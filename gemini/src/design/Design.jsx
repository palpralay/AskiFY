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
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css"; // you can change the theme if you want

function Design() {
  const [collapsed, setCollapsed] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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
          contents: [
            {
              parts: [
                {
                  text: currentQuestion,
                },
              ],
            },
          ],
        }),
      });

      const data = await res.json();

      const aiResponse =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response received.";

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

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Sidebar */}
      <aside
        className={`h-screen bg-slate-950/50 backdrop-blur-sm fixed transition-all duration-300 flex flex-col justify-between border-r border-slate-700/50 ${
          collapsed ? "w-16" : "w-64"
        } p-4 z-10`}
      >
        <div className="flex flex-col gap-4">
          <div
            className="text-2xl hover:bg-slate-800/50 p-2 cursor-pointer rounded-lg w-fit transition-all"
            onClick={() => setCollapsed(!collapsed)}
          >
            <Menu />
          </div>

          <button
            className="flex items-center gap-3 text-slate-300 hover:text-white p-3 hover:bg-slate-800/50 rounded-lg transition-all"
            onClick={() => setChatHistory([])}
          >
            <Edit3 className="text-lg" />
            {!collapsed && <span>New chat</span>}
          </button>

          <button className="flex items-center gap-3 text-slate-300 hover:text-white p-3 hover:bg-slate-800/50 rounded-lg transition-all">
            <Diamond className="text-lg" />
            {!collapsed && <span>Explore Gems</span>}
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3 text-slate-400 hover:text-white text-sm p-3 hover:bg-slate-800/50 rounded-lg cursor-pointer transition-all">
            <Settings className="text-lg" />
            {!collapsed && <span>Settings and help</span>}
          </div>
          <div className="flex items-center gap-3 text-slate-400 hover:text-white text-sm p-3 hover:bg-slate-800/50 rounded-lg cursor-pointer transition-all">
            <User className="text-lg" />
            {!collapsed && <span>User Profile</span>}
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
              <h1 className="bg-gradient-to-r text-6xl from-blue-400 via-purple-500 to-pink-400 mb-12 inline-block text-transparent bg-clip-text font-bold">
                Hello, DEV
              </h1>
              <p className="text-slate-400 mb-8 text-lg">
                Try one of these greetings:
              </p>
              <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
                {greetingSuggestions.map((greeting, index) => (
                  <button
                    key={index}
                    onClick={() => setQuestion(greeting)}
                    className="bg-slate-800/50 hover:bg-slate-700/50 px-4 py-2 rounded-xl transition-all hover:scale-105 border border-slate-600/30"
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
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 rounded-br-md shadow-lg"
                    : "bg-slate-800/50 rounded-bl-md border border-slate-700/50 backdrop-blur-sm"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    {chat.isUser ? (
                      <div className="whitespace-pre-wrap">{chat.text}</div>
                    ) : (
                      <ReactMarkdown
                        rehypePlugins={[rehypeHighlight]}
                        components={{
                          p: ({ children }) => (
                            <p className="mb-3 leading-relaxed">{children}</p>
                          ),
                          code: ({ className, children }) => (
                            <pre className="bg-slate-800/80 p-4 rounded-xl overflow-x-auto text-sm">
                              <code className={className}>{children}</code>
                            </pre>
                          ),
                          li: ({ children }) => (
                            <li className="mb-1 ml-4 list-disc">{children}</li>
                          ),
                        }}
                      >
                        {chat.text}
                      </ReactMarkdown>
                    )}
                  </div>
                  {!chat.isUser && (
                    <button
                      onClick={() => copyToClipboard(chat.text)}
                      className="ml-3 p-1 text-slate-400 hover:text-white opacity-0 group-hover:opacity-100 transition-all"
                      title="Copy response"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="text-xs text-slate-400 mt-2">
                  {chat.timestamp}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-slate-800/50 rounded-2xl rounded-bl-md p-4 border border-slate-700/50">
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
              <div className="bg-red-900/30 text-red-400 rounded-2xl rounded-bl-md p-4 border border-red-700/50">
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
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border border-slate-700/50">
            <div className="flex items-end gap-3">
              <input
                onChange={(e) => setQuestion(e.target.value)}
                value={question}
                type="text"
                placeholder="Ask anything..."
                className="flex-1 bg-transparent text-white placeholder-slate-400 border border-slate-600/50 rounded-xl py-3 px-4 
                           focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-none"
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
                    ? "text-slate-500 cursor-not-allowed"
                    : "text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 hover:scale-105"
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
