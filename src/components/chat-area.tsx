import { Phone, Video, Search, Paperclip, Mic, Send, MoreVertical } from "lucide-react"
import ChatMessage from "./chat-message"
import { authWA } from "../midleware/whatapp.api"
import { useEffect } from "react";
import { io } from 'socket.io-client';

export default function ChatArea() {
    const socket = io(import.meta.env.VITE_REACT_API_URL);

     useEffect(() => {
       
        socket.on('chat', (data) => {
            getChat();
        });
    
        return () => {
          socket.off('chat');
         
        };
      }, []);

     useEffect(() => {
        getChat();
      }, []);
    const getChat = async () => {
        try {
            const {data} = await authWA.getChat()
            console.log(data);
            
        } catch (error) {
            
        }
    }
  const messages = [
    { id: 1, content: "Hey, how are you?", timestamp: new Date(2023, 5, 1, 10, 30), isOwn: false },
    { id: 2, content: "I'm good, thanks! How about you?", timestamp: new Date(2023, 5, 1, 10, 32), isOwn: true },
    {
      id: 3,
      content: "I'm doing well too. Did you finish the project?",
      timestamp: new Date(2023, 5, 1, 10, 33),
      isOwn: false,
    },
    {
      id: 4,
      content: "Yes, I just submitted it. It was challenging but interesting!",
      timestamp: new Date(2023, 5, 1, 10, 35),
      isOwn: true,
    },
    {
      id: 5,
      content: "That's great to hear! Let's catch up soon to discuss it.",
      timestamp: new Date(2023, 5, 1, 10, 36),
      isOwn: false,
    },
  ]

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex justify-between items-center p-4 bg-[#202c33]">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gray-300 rounded-full mr-4"></div>
          <div>
            <h2 className="text-white font-semibold">John Doe</h2>
            <p className="text-gray-400 text-sm">Online</p>
          </div>
        </div>
        <div className="flex space-x-4">
          <button>
            <Video className="text-gray-400" />
          </button>
          <button>
            <Phone className="text-gray-400" />
          </button>
          <button>
            <Search className="text-gray-400" />
          </button>
          <button>
            <MoreVertical className="text-gray-400" />
          </button>
        </div>
      </div>
      <div className="flex-1 bg-[#0b141a] p-4 overflow-y-auto">
        {messages.map((message) => (
          <ChatMessage key={message.id} content={message.content} timestamp={message.timestamp} isOwn={message.isOwn} />
        ))}
      </div>
      <div className="p-4 bg-[#202c33] flex items-center">
        <button className="mr-4">
          <Paperclip className="text-gray-400" />
        </button>
        <input
          type="text"
          placeholder="Type a message"
          className="flex-1 bg-[#2a3942] text-white px-4 py-2 rounded-lg focus:outline-none"
        />
        <button className="ml-4">
          <Mic className="text-gray-400" />
        </button>
        <button className="ml-4">
          <Send className="text-gray-400" />
        </button>
      </div>
    </div>
  )
}

