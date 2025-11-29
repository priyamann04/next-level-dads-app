import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Users as UsersIcon } from "lucide-react";
import logo from "@/assets/logo.png";

const myEvents = [
  {
    id: 1,
    title: "Saturday Morning Coffee Meetup",
    date: "Sat, Nov 16 @ 9:00 AM",
    location: "Joe's Coffee Shop",
    attending: 12
  },
  {
    id: 3,
    title: "Dad & Kids Hiking Adventure",
    date: "Sun, Nov 17 @ 10:00 AM",
    location: "Mountain View Trail",
    attending: 15
  },
];

const myCommunities = [
  {
    id: 1,
    title: "Saturday Coffee Dads",
    description: "Weekly Saturday morning meetups at local coffee shops.",
    memberCount: 42,
  },
  {
    id: 2,
    title: "Outdoor Adventure Dads",
    description: "For dads who love hiking, camping, and exploring nature with their kids.",
    memberCount: 67,
  },
  {
    id: 5,
    title: "Sports & Fitness Dads",
    description: "Stay active together! Organize pickup games and workout sessions.",
    memberCount: 78,
  },
];

const Groups = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-card border-b border-border">
        <div className="max-w-md mx-auto px-6 py-6 flex items-center gap-4">
          <img src={logo} alt="Next Level Dads" className="h-8" />
          <div>
            <h1 className="text-2xl font-heading font-semibold text-foreground">
              Groups
            </h1>
            <p className="text-muted-foreground text-sm">
              Your communities and events
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6">
        <Tabs defaultValue="communities" className="w-full">
          <TabsList className="w-full grid grid-cols-2 bg-card border-b border-border rounded-none h-12">
            <TabsTrigger 
              value="communities" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              Communities
            </TabsTrigger>
            <TabsTrigger 
              value="events" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              Events
            </TabsTrigger>
          </TabsList>

          <TabsContent value="communities" className="space-y-3 animate-fade-in">
            {myCommunities.map((community) => (
              <Card 
                key={community.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate(`/community-detail/${community.id}`)}
              >
                <CardContent className="p-4 space-y-2">
                  <h4 className="font-semibold text-foreground">{community.title}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {community.description}
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <UsersIcon className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {community.memberCount} members
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="events" className="space-y-4 animate-fade-in">
            {myEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden shadow-md">
                <CardContent className="p-6 space-y-3">
                  <h3 className="text-lg font-heading font-semibold text-foreground">
                    {event.title}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <Badge variant="soft" className="rounded-full text-xs">Registered</Badge>
                    <span className="text-sm text-muted-foreground">
                      {event.attending} attending
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      <BottomNav />
    </div>
  );
};

export default Groups;
