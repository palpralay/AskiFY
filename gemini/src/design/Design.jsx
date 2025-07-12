import React from 'react'
import { IoMenu } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { IoDiamondOutline } from "react-icons/io5";
import { TfiSettings } from "react-icons/tfi";
import { IoMdSend } from "react-icons/io";
function Design() {
  return (
    <div className="min-h-screen bg-zinc-900 text-white flex">
    
      <aside className="w-64 bg-zinc-950 p-4 flex flex-col justify-between">
        <div className='flez flex-col'>
           <div className=' text-2xl mb-4 hover:bg-zinc-800 p-2 cursor-pointer rounded-full'><IoMenu /></div> 

          <button className="text-zinc-300 hover:text-white mb-8 flex items-center gap-2"><FaRegEdit />New chat</button>
          <button className="text-zinc-300 hover:text-white flex items-center gap-2 cursor-pointer rounded-full"><IoDiamondOutline />Explore Gems</button>
        </div>
        <div className="text-zinc-400 mb-4 flex items-center gap-4 hover:text-white text-sm"><span className='text-2xl'><TfiSettings /></span>Settings and help</div>
      </aside>
        <div className='text-2xl text-zinc-400 font-medium mb-4 right-0 p-2'>Gemini</div>

    
      <main className="flex-1 flex mt-70 flex-col items-center justify-center px-6">
        <h1 className="bg-gradient-to-r text-5xl from-red-600 via-green-500 to-indigo-400 mb-50 inline-block text-transparent bg-clip-text">Hello, DEV</h1>

        <div className="bg-zinc-800 rounded-2xl w-full max-w-xl p-4 flex items-center justify-between shadow-md">
          <input
            type="text"
            placeholder="Ask Gemini"
            className="bg-transparent  h-10 outline-none w-full text-white placeholder-zinc-400"
          />
          <button className="text-zinc-400 hover:text-white">
            <div className='text-2xl'><IoMdSend /></div>
          </button>
        </div>
      </main>
    </div>
  )
}

export default Design
