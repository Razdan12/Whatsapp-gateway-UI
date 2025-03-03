import { format } from "date-fns"

interface ChatMessageProps {
  content: string
  timestamp: Date
  isOwn: boolean
}

export default function ChatMessage({ content, timestamp, isOwn }: ChatMessageProps) {
  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-4`}>
      <div className={`max-w-[70%] rounded-lg p-3 ${isOwn ? "bg-[#005c4b]" : "bg-[#202c33]"}`}>
        <p className="text-white">{content}</p>
        <p className="text-xs text-gray-400 text-right mt-1">{format(timestamp, "HH:mm")}</p>
      </div>
    </div>
  )
}

