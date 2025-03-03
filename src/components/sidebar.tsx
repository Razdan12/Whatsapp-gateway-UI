import { Search, MoreVertical, MessageCircle } from "lucide-react"
import ChatList from "./chat-list"

export default function Sidebar() {
  return (
    <div className="w-[30%] border-r border-gray-700">
      <div className="flex justify-between items-center p-4 bg-[#202c33]">
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        <div className="flex space-x-4">
          <button>
            <MessageCircle className="text-gray-400" />
          </button>
          <button>
            <MoreVertical className="text-gray-400" />
          </button>
        </div>
      </div>
      <div className="p-2">
        <div className="relative">
          <input
            type="text"
            placeholder="Search or start new chat"
            className="w-full bg-[#202c33] text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" />
        </div>
      </div>
      <ChatList />
    </div>
  )
}

