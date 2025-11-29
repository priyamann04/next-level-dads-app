import { Link, useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { Card, CardContent } from "@/components/ui/card";
import { Users as UsersIcon } from "lucide-react";
import logo from "@/assets/logo.png";

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

const MyGroups = () => {
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

      <div className="max-w-md mx-auto px-6">
        <div className="w-full grid grid-cols-2 bg-card border-b border-border h-12 mb-6">
          <Link 
            to="/groups/communities"
            className="flex items-center justify-center border-b-2 border-primary text-foreground font-medium"
          >
            Communities
          </Link>
          <Link 
            to="/groups/events"
            className="flex items-center justify-center text-muted-foreground hover:text-foreground"
          >
            Events
          </Link>
        </div>

        <div className="space-y-3 animate-fade-in">
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
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default MyGroups;
