export default function ChatList() {
    const chats = [
      { id: 1, name: "John Doe", lastMessage: "Hey, how are you?", time: "10:30 AM" },
      { id: 2, name: "Jane Smith", lastMessage: "Can we meet tomorrow?", time: "Yesterday" },
      { id: 3, name: "Bob Johnson", lastMessage: "Thanks for your help!", time: "Tuesday" },
    ]
  
    return (
      <div className="overflow-y-auto h-[calc(100vh-120px)]">
        {chats.map((chat) => (
          <div key={chat.id} className="flex items-center p-4 hover:bg-[#202c33] cursor-pointer">
            <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
            <div className="flex-1">
              <h3 className="text-white font-semibold">{chat.name}</h3>
              <p className="text-gray-400 text-sm">{chat.lastMessage}</p>
            </div>
            <span className="text-gray-400 text-xs">{chat.time}</span>
          </div>
        ))}
      </div>
    )
  }
  
  