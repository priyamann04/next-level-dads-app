import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import CommunityCard from "@/components/CommunityCard";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, DollarSign } from "lucide-react";

const communities = [
  {
    id: 1,
    title: "Saturday Coffee Dads",
    description: "Weekly Saturday morning meetups at local coffee shops. Share stories, swap advice, and build lasting friendships.",
    memberCount: 42,
    nextEvent: "Sat 9am"
  },
  {
    id: 2,
    title: "Outdoor Adventure Dads",
    description: "For dads who love hiking, camping, and exploring nature with their kids. Monthly outdoor excursions.",
    memberCount: 67,
    nextEvent: "Next Sun"
  },
  {
    id: 3,
    title: "Tech & Gaming Dads",
    description: "Connect over technology, gaming, and teaching kids to code. Virtual meetups and gaming sessions.",
    memberCount: 89,
  },
  {
    id: 4,
    title: "New Dads Support",
    description: "Just starting your fatherhood journey? Connect with other new dads navigating the early years together.",
    memberCount: 53,
    nextEvent: "Thu 7pm"
  },
  {
    id: 5,
    title: "Sports & Fitness Dads",
    description: "Stay active together! Organize pickup games, workout sessions, and teach kids about sports.",
    memberCount: 78,
    nextEvent: "Sat 10am"
  },
  {
    id: 6,
    title: "Creative Dads",
    description: "For fathers who love art, music, photography, and creative pursuits. Share projects and inspire each other.",
    memberCount: 34,
  }
];

const events = [
  {
    id: 1,
    title: "Saturday Morning Coffee Meetup",
    date: "Sat, Nov 16 @ 9:00 AM",
    location: "Joe's Coffee Shop",
    type: "Local",
    price: "Free",
    attending: 12
  },
  {
    id: 2,
    title: "Virtual Parenting Q&A",
    date: "Thu, Nov 14 @ 7:00 PM",
    location: "Online via Zoom",
    type: "Virtual",
    price: "Free",
    attending: 28
  },
  {
    id: 3,
    title: "Dad & Kids Hiking Adventure",
    date: "Sun, Nov 17 @ 10:00 AM",
    location: "Mountain View Trail",
    type: "Local",
    price: "$10",
    attending: 15
  },
];

const Discover = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [eventFilter, setEventFilter] = useState<"all" | "virtual" | "local">("all");
  const [priceFilter, setPriceFilter] = useState<"all" | "free" | "paid">("all");

  const handleJoin = (title: string) => {
    toast({
      title: "Joined community! 🎉",
      description: `You've joined ${title}. Check your messages for group chat access.`,
    });
  };

  const handleJoinEvent = (title: string) => {
    toast({
      title: "Registered for event! 🎉",
      description: `You've registered for ${title}.`,
    });
  };

  const filteredEvents = events.filter((event) => {
    const matchesType = eventFilter === "all" || event.type.toLowerCase() === eventFilter;
    const matchesPrice = priceFilter === "all" || 
      (priceFilter === "free" && event.price === "Free") ||
      (priceFilter === "paid" && event.price !== "Free");
    return matchesType && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-card border-b border-border">
        <div className="max-w-md mx-auto px-6 py-6">
          <h1 className="text-2xl font-heading font-semibold text-foreground mb-2">
            Discover
          </h1>
          <p className="text-muted-foreground">
            Join communities and find your tribe
          </p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6">
        <Tabs defaultValue="communities" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="communities">Communities</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>

          <TabsContent value="communities" className="space-y-4 animate-fade-in">
            {communities.map((community) => (
              <div key={community.id} onClick={() => navigate("/community-detail")} className="cursor-pointer">
                <CommunityCard
                  {...community}
                  onJoin={() => handleJoin(community.title)}
                />
              </div>
            ))}
          </TabsContent>

          <TabsContent value="events" className="space-y-4 animate-fade-in">
            <div className="flex gap-2 mb-4 flex-wrap">
              <Badge
                variant={eventFilter === "all" ? "default" : "outline"}
                className="cursor-pointer rounded-full"
                onClick={() => setEventFilter("all")}
              >
                All
              </Badge>
              <Badge
                variant={eventFilter === "virtual" ? "default" : "outline"}
                className="cursor-pointer rounded-full"
                onClick={() => setEventFilter("virtual")}
              >
                Virtual
              </Badge>
              <Badge
                variant={eventFilter === "local" ? "default" : "outline"}
                className="cursor-pointer rounded-full"
                onClick={() => setEventFilter("local")}
              >
                Local
              </Badge>
              <Badge
                variant={priceFilter === "free" ? "default" : "outline"}
                className="cursor-pointer rounded-full"
                onClick={() => setPriceFilter("free")}
              >
                Free
              </Badge>
              <Badge
                variant={priceFilter === "paid" ? "default" : "outline"}
                className="cursor-pointer rounded-full"
                onClick={() => setPriceFilter("paid")}
              >
                Paid
              </Badge>
            </div>

            {filteredEvents.length > 0 ? (
              <div className="space-y-4">
                {filteredEvents.map((event) => (
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
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <DollarSign className="w-4 h-4" />
                          <span>{event.price}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-sm text-muted-foreground">
                          {event.attending} attending
                        </span>
                        <Button
                          className="rounded-full"
                          onClick={() => handleJoinEvent(event.title)}
                        >
                          Register
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No events match your filters
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <BottomNav />
    </div>
  );
};

export default Discover;
