import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import avatarPlaceholder from "@/assets/avatar-placeholder.png";

const mockChats = [
  {
    id: 1,
    name: "Mike",
    lastMessage: "That sounds great! Let's plan for Saturday.",
    timestamp: "2m ago",
    unread: 2,
    avatar: avatarPlaceholder
  },
  {
    id: 2,
    name: "David",
    lastMessage: "Thanks for the advice about the school situation!",
    timestamp: "1h ago",
    unread: 0,
    avatar: avatarPlaceholder
  },
  {
    id: 3,
    name: "James",
    lastMessage: "The kids had a great time at the playdate",
    timestamp: "3h ago",
    unread: 0,
    avatar: avatarPlaceholder
  }
];

const Chats = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filteredChats = mockChats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-card border-b border-border">
        <div className="max-w-md mx-auto px-6 py-6">
          <h1 className="text-2xl font-heading font-semibold text-foreground mb-4">
            Messages
          </h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-full"
            />
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto">
        {filteredChats.length > 0 ? (
          <div className="divide-y divide-border">
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => navigate(`/chat/${chat.id}`)}
                className="px-6 py-4 hover:bg-muted/50 cursor-pointer transition-colors animate-fade-in"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="w-14 h-14">
                    <AvatarImage src={chat.avatar} alt={chat.name} />
                    <AvatarFallback>{chat.name[0]}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-foreground truncate">
                        {chat.name}
                      </h3>
                      <span className="text-xs text-muted-foreground">
                        {chat.timestamp}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground truncate">
                        {chat.lastMessage}
                      </p>
                      {chat.unread > 0 && (
                        <span className="ml-2 bg-primary text-primary-foreground text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                          {chat.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 px-6">
            <p className="text-muted-foreground">No conversations found</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Chats;
