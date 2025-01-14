import { cn } from "@/lib/utils";

export const TypingIndicator = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "flex w-full animate-message-fade-in items-end gap-2 py-2",
        className
      )}
    >
      <div className="relative max-w-[80%] rounded-2xl bg-chat-bot px-4 py-3 shadow-sm">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-2 w-2 rounded-full bg-gray-300"
              style={{
                animation: "typing-dot 1.4s infinite ease-in-out",
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};