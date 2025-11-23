import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import ConnectionCard from "@/components/ConnectionCard";
import ConnectionRequestCard from "@/components/ConnectionRequestCard";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import avatarDefaultGrey from "@/assets/avatar-default-grey.png";

const mockConnections = [
  {
    id: 1,
    name: "Mike Johnson",
    age: 34,
    city: "Toronto",
    province: "ON",
    childAgeRange: "Toddler (2-3 yrs)",
    bio: "Love spending time outdoors with my little guy. Always up for a playdate or dad chat over coffee.",
    interests: ["Sports", "Outdoors", "Tech"],
    avatarUrl: avatarDefaultGrey
  },
  {
    id: 2,
    name: "David Chen",
    age: 38,
    city: "Vancouver",
    province: "BC",
    childAgeRange: "Elementary (6-12 yrs)",
    bio: "Tech dad who also loves cooking. Looking to connect with other dads for advice and friendship.",
    interests: ["Cooking", "Gaming", "Reading"],
    avatarUrl: avatarDefaultGrey
  },
  {
    id: 3,
    name: "James Martinez",
    age: 32,
    city: "Calgary",
    province: "AB",
    childAgeRange: "Preschool (4-5 yrs)",
    bio: "Music and photography enthusiast. Would love to connect with creative dads in the area.",
    interests: ["Music", "Photography", "Fitness"],
    avatarUrl: avatarDefaultGrey
  }
];

const mockConnectionRequests = [
  {
    id: 4,
    name: "Robert Wilson",
    age: 36,
    city: "Montreal",
    province: "QC",
    childAgeRange: "Infant (0-1 yr)",
    bio: "New dad navigating the early days. Love to travel and explore new experiences with my family.",
    interests: ["Travel", "Art", "Cooking"],
    avatarUrl: avatarDefaultGrey
  }
];

const mockChats = [
  {
    id: 1,
    name: "Mike",
    lastMessage: "That sounds great! Let's plan for Saturday.",
    timestamp: "2m ago",
    unread: 2,
    avatar: avatarDefaultGrey
  },
  {
    id: 2,
    name: "David",
    lastMessage: "Thanks for the advice about the school situation!",
    timestamp: "1h ago",
    unread: 0,
    avatar: avatarDefaultGrey
  },
  {
    id: 3,
    name: "James",
    lastMessage: "The kids had a great time at the playdate",
    timestamp: "3h ago",
    unread: 0,
    avatar: avatarDefaultGrey
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
          <h1 className="text-2xl font-heading font-semibold text-foreground mb-2">
            Chats
          </h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6">
        <Tabs defaultValue="connections" className="w-full">
          <TabsList className="w-full grid grid-cols-2 bg-card border-b border-border rounded-none h-12">
            <TabsTrigger 
              value="connections" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              Connections
            </TabsTrigger>
            <TabsTrigger 
              value="messages" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              Messages
            </TabsTrigger>
          </TabsList>

          <TabsContent value="connections" className="px-6 py-4 space-y-6 animate-fade-in">
            <div className="space-y-3">
              <h3 className="text-lg font-heading font-semibold text-foreground">My Connections</h3>
              {mockConnections.map((connection) => (
                <ConnectionCard
                  key={connection.id}
                  {...connection}
                  onChat={() => navigate(`/chat/${connection.id}`)}
                />
              ))}
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-heading font-semibold text-foreground">Connection Requests</h3>
              {mockConnectionRequests.map((request) => (
                <ConnectionRequestCard
                  key={request.id}
                  {...request}
                  onAccept={() => {}}
                  onIgnore={() => {}}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="messages" className="animate-fade-in">
            <div className="px-6 py-4">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 rounded-full"
                />
              </div>
            </div>

            {filteredChats.length > 0 ? (
              <div className="divide-y divide-border">
                {filteredChats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => navigate(`/chat/${chat.id}`)}
                    className="px-6 py-4 hover:bg-muted/50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <img 
                        src={chat.avatar} 
                        alt={chat.name}
                        className="w-14 h-14 rounded-md object-cover"
                      />
                      
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
          </TabsContent>
        </Tabs>
      </div>

      <BottomNav />
    </div>
  );
};

export default Chats;
