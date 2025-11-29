import { Link } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";
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

const MyEvents = () => {
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

      <div className="max-w-md mx-auto px-6">
        <div className="w-full grid grid-cols-2 bg-card border-b border-border h-12 mb-6">
          <Link 
            to="/groups/communities"
            className="flex items-center justify-center text-muted-foreground hover:text-foreground"
          >
            Communities
          </Link>
          <Link 
            to="/groups/events"
            className="flex items-center justify-center border-b-2 border-primary text-foreground font-medium"
          >
            Events
          </Link>
        </div>

        <div className="space-y-4 animate-fade-in">
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
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default MyEvents;
