import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import avatarPlaceholder from "@/assets/avatar-placeholder.png";

const mockConnections = [
  {
    id: 1,
    name: "Mike Johnson",
    age: 34,
    city: "Toronto",
    province: "ON",
    childAgeRange: "Toddler (2-3 yrs)",
    interests: ["Sports", "Outdoors", "Tech"]
  },
  {
    id: 2,
    name: "David Chen",
    age: 38,
    city: "Vancouver",
    province: "BC",
    childAgeRange: "Elementary (6-12 yrs)",
    interests: ["Cooking", "Gaming", "Reading"]
  },
  {
    id: 3,
    name: "James Martinez",
    age: 32,
    city: "Calgary",
    province: "AB",
    childAgeRange: "Preschool (4-5 yrs)",
    interests: ["Music", "Photography", "Fitness"]
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
    interests: ["Travel", "Art", "Cooking"]
  }
];

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
          <h1 className="text-2xl font-heading font-semibold text-foreground mb-2">
            Chats
          </h1>
        </div>
      </div>

      <div className="max-w-md mx-auto">
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
                <Card key={connection.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <img 
                        src={avatarPlaceholder} 
                        alt={connection.name}
                        className="w-16 h-16 rounded-md object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-foreground mb-1">
                          {connection.name}, {connection.age}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          {connection.city}, {connection.province}
                        </p>
                        <p className="text-sm text-muted-foreground mb-3">
                          {connection.childAgeRange}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {connection.interests.map((interest, index) => (
                            <Badge 
                              key={index} 
                              variant="soft" 
                              className="rounded-full text-xs"
                            >
                              {interest}
                            </Badge>
                          ))}
                        </div>
                        <Button 
                          size="sm" 
                          className="rounded-full w-full"
                          onClick={() => navigate(`/chat/${connection.id}`)}
                        >
                          Chat
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-heading font-semibold text-foreground">Connection Requests</h3>
              {mockConnectionRequests.map((request) => (
                <Card key={request.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <img 
                        src={avatarPlaceholder} 
                        alt={request.name}
                        className="w-16 h-16 rounded-md object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-foreground mb-1">
                          {request.name}, {request.age}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          {request.city}, {request.province}
                        </p>
                        <p className="text-sm text-muted-foreground mb-3">
                          {request.childAgeRange}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {request.interests.map((interest, index) => (
                            <Badge 
                              key={index} 
                              variant="soft" 
                              className="rounded-full text-xs"
                            >
                              {interest}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            className="rounded-full flex-1"
                          >
                            Accept
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="rounded-full flex-1"
                          >
                            Ignore
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
