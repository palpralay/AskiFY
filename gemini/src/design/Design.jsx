import { useState } from "react";
import { IoMenu, IoDiamondOutline } from "react-icons/io5";
import { IoMdSend } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { TfiSettings } from "react-icons/tfi";
import { CgProfile } from "react-icons/cg";
function Design() {
  const [collapsed, setCollapsed] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <div className="min-h-screen flex bg-zinc-900 text-white">
      {/* Sidebar */}
      <aside
        className={`h-screen bg-zinc-950 transition-all duration-300 flex flex-col justify-between 
        ${collapsed ? "w-18" : "w-64"} p-4`}
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
          <button className="flex items-center gap-3 text-zinc-300 hover:text-white p-2 hover:bg-zinc-800 rounded-md">
            <FaRegEdit className="text-xl" /> 
            {!collapsed && <span>New chat</span>}
          </button>

          {/* Explore Gems */}
          <button className="flex items-center gap-3 text-zinc-300 hover:text-white p-2 hover:bg-zinc-800 rounded-md">
            {!collapsed && <IoDiamondOutline className="text-xl" />} 
            
            {!collapsed && <span>Explore Gems</span>}
          </button>
        </div>

        {/* Bottom Section */}
        <div className="flex items-center gap-3 text-zinc-400 hover:text-white text-sm p-2 hover:bg-zinc-800 rounded-md cursor-pointer">
          <TfiSettings className="text-xl" />
          {!collapsed && <span>Settings and help</span>}
        </div>
      </aside>
      
      <div className="text-zinc-500 p-2 font-medium text-2xl">Gemini</div>
      <div className="text-zinc-500 p-2 font-medium text-3xl absolute right-0"><CgProfile /></div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center items-center px-6">
        <h1 className="bg-gradient-to-r text-5xl from-red-600 via-green-500 to-indigo-400 mt-60 mb-12 inline-block text-transparent bg-clip-text">
          Hello, DEV
        </h1>

        {/* Input Box */}
        <div className="relative w-full mt-50 max-w-xl bg-zinc-800 rounded-2xl p-4 shadow-md">
          <input
            type="text"
            placeholder="Ask Gemini anything..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-transparent text-white placeholder-zinc-400 border border-zinc-700 rounded-xl py-4 px-5 pr-16 
                       focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
          />

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all
             "
          >
            <IoMdSend className="text-3xl" />
          </button>
        </div>
      </main>
    </div>
  );
}

export default Design;
