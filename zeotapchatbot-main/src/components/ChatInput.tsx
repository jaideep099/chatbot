import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizontal } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [message]);

  const handleSubmit = () => {
    if (message.trim() && !disabled) {
      onSend(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex items-end gap-2 rounded-xl border bg-white/80 p-4 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <Textarea
        ref={textareaRef}
        rows={1}
        placeholder="Ask me anything about CDPs..."
        className="min-h-[44px] max-h-[200px] resize-none rounded-xl border-purple-100 bg-white px-4 py-3 focus-visible:ring-purple-400"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />
      <Button
        size="icon"
        className="h-11 w-11 shrink-0 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 transition-transform hover:scale-105 hover:from-purple-600 hover:to-blue-600"
        onClick={handleSubmit}
        disabled={!message.trim() || disabled}
      >
        <SendHorizontal className="h-5 w-5" />
      </Button>
    </div>
  );
};