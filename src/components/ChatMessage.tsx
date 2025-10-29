interface ChatMessageProps {
  message: string;
  isOwn: boolean;
  timestamp: string;
}

const ChatMessage = ({ message, isOwn, timestamp }: ChatMessageProps) => {
  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-4 animate-fade-in`}>
      <div className={`max-w-[75%] ${isOwn ? "items-end" : "items-start"} flex flex-col gap-1`}>
        <div
          className={`rounded-lg px-4 py-2 ${
            isOwn
              ? "bg-primary text-primary-foreground"
              : "bg-card text-card-foreground shadow-sm"
          }`}
        >
          <p className="text-sm leading-relaxed">{message}</p>
        </div>
        <span className="text-xs text-muted-foreground px-2">{timestamp}</span>
      </div>
    </div>
  );
};

export default ChatMessage;
