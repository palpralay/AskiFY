import React, { useState } from 'react';
import { IoMenu, IoDiamondOutline, IoSend } from "react-icons/io5";
import { FaRegEdit, FaRegUserCircle } from "react-icons/fa";
import { TfiSettings, TfiHelpAlt } from "react-icons/tfi";
import { BsStars, BsLightningChargeFill } from "react-icons/bs";
import { MdOutlineUpgrade } from "react-icons/md";

function DesignTwo() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I assist you today?", sender: "gemini" },
    { id: 2, text: "Can you explain quantum computing in simple terms?", sender: "user" },
    { id: 3, text: "Quantum computing uses quantum bits (qubits) that can exist in multiple states simultaneously...", sender: "gemini" }
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim() !== "") {
      const newMsg = { id: messages.length + 1, text: newMessage, sender: "user" };
      setMessages([...messages, newMsg]);
      setNewMessage("");
      
      // Simulate AI response after a delay
      setTimeout(() => {
        const aiResponse = { 
          id: messages.length + 2, 
          text: "I've processed your query. Let me know if you need more details!", 
          sender: "gemini" 
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-zinc-800 text-white flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-zinc-950 p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-1.5 rounded-lg">
                <BsStars className="text-white text-xl" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
                Gemini
              </h1>
            </div>
            <div className="text-zinc-400 hover:text-white cursor-pointer rounded-lg p-2 transition-all">
              <IoMenu className="text-xl" />
            </div>
          </div>
          
          <button className="w-full flex items-center gap-3 bg-gradient-to-r from-blue-600/30 to-indigo-600/30 hover:from-blue-600/50 hover:to-indigo-600/50 text-white py-3 px-4 rounded-xl mb-4 transition-all">
            <FaRegEdit className="text-lg" />
            <span>New chat</span>
          </button>
          
          <div className="space-y-2 mt-8">
            <p className="text-zinc-400 text-sm uppercase tracking-wider pl-4 mb-2">Recent Chats</p>
            <div className="cursor-pointer hover:bg-zinc-800 p-3 rounded-xl transition-all">
              <p className="truncate">Quantum computing explained</p>
            </div>
            <div className="cursor-pointer hover:bg-zinc-800 p-3 rounded-xl transition-all">
              <p className="truncate">AI ethics discussion</p>
            </div>
            <div className="cursor-pointer hover:bg-zinc-800 p-3 rounded-xl transition-all">
              <p className="truncate">Python data analysis</p>
            </div>
          </div>
          
          <div className="mt-6">
            <button className="w-full flex items-center gap-3 text-zinc-300 hover:text-white py-3 px-4 rounded-xl transition-all">
              <IoDiamondOutline className="text-xl" />
              <span>Explore Gems</span>
            </button>
          </div>
        </div>
        
        <div>
          <div className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-3 mb-2">
              <MdOutlineUpgrade className="text-yellow-400 text-xl" />
              <span className="font-medium">Gemini Advanced</span>
            </div>
            <p className="text-zinc-400 text-sm">Get enhanced capabilities with Gemini Advanced</p>
            <button className="mt-3 w-full py-2 bg-gradient-to-r from-yellow-500 to-amber-600 text-zinc-900 font-medium rounded-lg hover:opacity-90 transition-opacity">
              Upgrade
            </button>
          </div>
          
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-4 text-zinc-400 hover:text-white p-3 rounded-xl cursor-pointer transition-all">
              <TfiSettings className="text-lg" />
              <span>Settings</span>
            </div>
            <div className="flex items-center gap-4 text-zinc-400 hover:text-white p-3 rounded-xl cursor-pointer transition-all">
              <TfiHelpAlt className="text-lg" />
              <span>Help</span>
            </div>
          </div>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <div className="p-4 md:p-6 flex items-center justify-between border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-1 rounded-lg">
              <BsLightningChargeFill className="text-white text-lg" />
            </div>
            <h2 className="text-lg font-semibold">Gemini 2.5 Flash</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-zinc-800 rounded-full p-1.5 cursor-pointer hover:bg-zinc-700 transition-all">
              <FaRegUserCircle className="text-xl" />
            </div>
          </div>
        </div>
        
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12 mt-8">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-green-400 to-indigo-400 inline-block text-transparent bg-clip-text mb-4">
                Hello, Pra lay
              </h1>
              <p className="text-zinc-400 max-w-lg mx-auto">
                I'm Gemini, your AI assistant. How can I help you today?
              </p>
            </div>
            
            <div className="space-y-6">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-2xl p-4 ${
                      message.sender === 'gemini' 
                        ? 'bg-zinc-800 rounded-tl-none' 
                        : 'bg-gradient-to-r from-blue-600/30 to-indigo-600/30 rounded-tr-none'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {message.sender === 'gemini' && (
                        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-1.5 rounded-md flex-shrink-0">
                          <BsStars className="text-white text-sm" />
                        </div>
                      )}
                      <p>{message.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Input Area */}
        <div className="p-4 md:p-6 border-t border-zinc-800">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-zinc-500">
                <BsStars />
              </div>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask Gemini anything..."
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl pl-12 pr-16 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              />
              <button 
                onClick={handleSend}
                disabled={!newMessage.trim()}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-lg ${
                  newMessage.trim() 
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:opacity-90 cursor-pointer' 
                    : 'bg-zinc-700 text-zinc-500 cursor-not-allowed'
                } transition-all`}
              >
                <IoSend className="text-xl" />
              </button>
            </div>
            <p className="text-center text-zinc-500 text-xs mt-3">
              Gemini may display inaccurate info, including about people, so double-check its responses.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DesignTwo;