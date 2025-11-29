import { useState } from "react";
import { Link } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, DollarSign, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import logo from "@/assets/logo.png";

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

const DiscoverEvents = () => {
  const { toast } = useToast();
  const [eventFilter, setEventFilter] = useState<"all" | "virtual" | "local">("all");
  const [priceFilter, setPriceFilter] = useState<"all" | "free" | "paid">("all");
  const [eventSearchQuery, setEventSearchQuery] = useState("");

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
    const matchesSearch = event.title.toLowerCase().includes(eventSearchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(eventSearchQuery.toLowerCase());
    return matchesType && matchesPrice && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-card border-b border-border">
        <div className="max-w-md mx-auto px-6 py-6 flex items-center gap-4">
          <img src={logo} alt="Next Level Dads" className="h-8" />
          <div>
            <h1 className="text-2xl font-heading font-semibold text-foreground">
              Discover
            </h1>
            <p className="text-muted-foreground text-sm">
              Join communities and find community.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6">
        <div className="w-full grid grid-cols-3 bg-card border-b border-border h-12 mb-6">
          <Link 
            to="/discover/dads"
            className="flex items-center justify-center text-muted-foreground hover:text-foreground"
          >
            Dads
          </Link>
          <Link 
            to="/discover/communities"
            className="flex items-center justify-center text-muted-foreground hover:text-foreground"
          >
            Communities
          </Link>
          <Link 
            to="/discover/events"
            className="flex items-center justify-center border-b-2 border-primary text-foreground font-medium"
          >
            Events
          </Link>
        </div>

        <div className="space-y-4 animate-fade-in">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search events..."
              value={eventSearchQuery}
              onChange={(e) => setEventSearchQuery(e.target.value)}
              className="pl-10 rounded-full"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
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
              onClick={() => setPriceFilter(priceFilter === "free" ? "all" : "free")}
            >
              Free
            </Badge>
            <Badge
              variant={priceFilter === "paid" ? "default" : "outline"}
              className="cursor-pointer rounded-full"
              onClick={() => setPriceFilter(priceFilter === "paid" ? "all" : "paid")}
            >
              Paid
            </Badge>
          </div>

          <div className="space-y-4">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden shadow-md">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="text-lg font-heading font-semibold text-foreground flex-1">
                        {event.title}
                      </h3>
                      <Badge variant="secondary" className="rounded-full shrink-0">
                        {event.type}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4 shrink-0" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4 shrink-0" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <DollarSign className="w-4 h-4 shrink-0" />
                        <span>{event.price}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <span className="text-sm text-muted-foreground">
                        {event.attending} attending
                      </span>
                      <Button
                        size="sm"
                        className="rounded-full"
                        onClick={() => handleJoinEvent(event.title)}
                      >
                        Register
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No events found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default DiscoverEvents;
