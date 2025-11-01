import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ChatMessage from "@/components/ChatMessage";
import avatarLight1 from "@/assets/avatar-light-1.png";
import avatarMedium1 from "@/assets/avatar-medium-1.png";
import avatarDark1 from "@/assets/avatar-dark-1.png";

// User data mapping
const usersData: { [key: string]: { name: string; avatar: string } } = {
  "1": { name: "Mike", avatar: avatarLight1 },
  "2": { name: "David", avatar: avatarMedium1 },
  "3": { name: "James", avatar: avatarDark1 },
};

const ChatDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [message, setMessage] = useState("");
  
  // Get user data based on ID
  const currentUser = usersData[id || "1"];
  
  const mockMessages = [
    {
      id: 1,
      message: "Hey! How's it going?",
      isOwn: false,
      timestamp: "10:30 AM"
    },
    {
      id: 2,
      message: "Great! Just got back from the park with the kids. How about you?",
      isOwn: true,
      timestamp: "10:32 AM"
    },
    {
      id: 3,
      message: "That sounds fun! I was thinking we could meet up this weekend for coffee?",
      isOwn: false,
      timestamp: "10:35 AM"
    },
    {
      id: 4,
      message: "That sounds great! Let's plan for Saturday morning if that works.",
      isOwn: true,
      timestamp: "10:37 AM"
    }
  ];
  
  const [messages, setMessages] = useState(mockMessages);

  const handleSend = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        message: message,
        isOwn: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="bg-card border-b border-border shadow-sm">
        <div className="max-w-md mx-auto px-6 py-4 flex items-center gap-4">
          <button onClick={() => navigate("/chats")} className="text-muted-foreground">
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <Avatar className="w-10 h-10">
            <AvatarImage src={currentUser.avatar} />
            <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <h2 className="font-semibold text-foreground">{currentUser.name}</h2>
            <p className="text-xs text-muted-foreground">Active now</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto max-w-md mx-auto w-full px-6 py-6">
        <div className="mb-4 text-center">
          <p className="text-xs text-muted-foreground bg-muted/50 inline-block px-3 py-1 rounded-full">
            Today
          </p>
        </div>
        
        <div className="space-y-2">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} {...msg} />
          ))}
        </div>

        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <p className="text-sm text-muted-foreground italic">
            💡 Icebreaker: "What's your favorite weekend activity with your kids?"
          </p>
        </div>
      </div>

      <div className="bg-card border-t border-border shadow-lg">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 rounded-full"
            />
            <Button
              size="icon"
              className="rounded-full bg-gradient-gold"
              onClick={handleSend}
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatDetail;
