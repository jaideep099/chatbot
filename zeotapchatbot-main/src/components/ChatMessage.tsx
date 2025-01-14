import { cn } from "@/lib/utils";
import { Message } from "@/types/chat";

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isBot = message.role === "assistant";

  return (
    <div
      className={cn(
        "flex w-full animate-message-fade-in items-end gap-3 py-2",
        isBot ? "justify-start" : "justify-end"
      )}
    >
      <div
        className={cn(
          "relative max-w-[85%] rounded-2xl px-4 py-3 shadow-sm",
          isBot
            ? "bg-white text-foreground shadow-md"
            : "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
        )}
      >
        <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
      </div>
    </div>
  );
};