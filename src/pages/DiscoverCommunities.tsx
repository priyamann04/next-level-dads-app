import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import CommunityCard from "@/components/CommunityCard";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import logo from "@/assets/logo.png";

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

const DiscoverCommunities = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [communitySearchQuery, setCommunitySearchQuery] = useState("");

  const handleJoin = (title: string) => {
    toast({
      title: "Joined community! 🎉",
      description: `You've joined ${title}. Check your messages for group chat access.`,
    });
  };

  const filteredCommunities = communities.filter((community) =>
    community.title.toLowerCase().includes(communitySearchQuery.toLowerCase()) ||
    community.description.toLowerCase().includes(communitySearchQuery.toLowerCase())
  );

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
            className="flex items-center justify-center border-b-2 border-primary text-foreground font-medium"
          >
            Communities
          </Link>
          <Link 
            to="/discover/events"
            className="flex items-center justify-center text-muted-foreground hover:text-foreground"
          >
            Events
          </Link>
        </div>

        <div className="space-y-4 animate-fade-in">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search communities..."
              value={communitySearchQuery}
              onChange={(e) => setCommunitySearchQuery(e.target.value)}
              className="pl-10 rounded-full"
            />
          </div>

          <div className="space-y-3">
            {filteredCommunities.length > 0 ? (
              filteredCommunities.map((community) => (
                <CommunityCard
                  key={community.id}
                  {...community}
                  onJoin={() => handleJoin(community.title)}
                  onClick={() => navigate(`/community-detail/${community.id}`)}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No communities found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default DiscoverCommunities;
