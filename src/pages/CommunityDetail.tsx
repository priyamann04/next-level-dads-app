import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import avatarDefaultGrey from "@/assets/avatar-default-grey.png";

const CommunityDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isInterested, setIsInterested] = useState(false);

  const communitiesData: Record<string, any> = {
    "1": {
      title: "Saturday Coffee Dads",
      description: "Weekly Saturday morning meetups at local coffee shops. Share stories, swap advice, and build lasting friendships.",
      memberCount: 42,
      nextEvent: "Sat 9am"
    },
    "2": {
      title: "Outdoor Adventure Dads",
      description: "For dads who love hiking, camping, and exploring nature with their kids. Monthly outdoor excursions.",
      memberCount: 67,
      nextEvent: "Next Sun"
    },
    "3": {
      title: "Tech & Gaming Dads",
      description: "Connect over technology, gaming, and teaching kids to code. Virtual meetups and gaming sessions.",
      memberCount: 89,
      nextEvent: null
    },
    "4": {
      title: "New Dads Support",
      description: "Just starting your fatherhood journey? Connect with other new dads navigating the early years together.",
      memberCount: 53,
      nextEvent: "Thu 7pm"
    },
    "5": {
      title: "Sports & Fitness Dads",
      description: "Stay active together! Organize pickup games, workout sessions, and teach kids about sports.",
      memberCount: 78,
      nextEvent: "Sat 10am"
    },
    "6": {
      title: "Creative Dads",
      description: "For fathers who love art, music, photography, and creative pursuits. Share projects and inspire each other.",
      memberCount: 34,
      nextEvent: null
    }
  };

  const community = communitiesData[id || "1"] || communitiesData["1"];

  const membersData: Record<string, any[]> = {
    "1": [
      {
        id: 1,
        name: "Michael Thompson",
        age: 34,
        stage: "Toddler (2-3 years)",
        bio: "Love getting outside with my boys and exploring new parks.",
        avatarUrl: avatarDefaultGrey
      },
      {
        id: 2,
        name: "Robert Chen",
        age: 39,
        stage: "Elementary (6-12 years)",
        bio: "Tech guy who loves cooking and weekend adventures.",
        avatarUrl: avatarDefaultGrey
      },
      {
        id: 3,
        name: "Anthony Williams",
        age: 36,
        stage: "Preschool (4-5 years)",
        bio: "Fitness enthusiast and amateur photographer.",
        avatarUrl: avatarDefaultGrey
      },
    ],
    "2": [
      {
        id: 4,
        name: "James Martinez",
        age: 32,
        stage: "Toddler (2-3 years)",
        bio: "Weekend warrior dad who loves trail running.",
        avatarUrl: avatarDefaultGrey
      },
    ],
    "3": [
      {
        id: 5,
        name: "David Chen",
        age: 38,
        stage: "Elementary (6-12 years)",
        bio: "Tech enthusiast and soccer coach.",
        avatarUrl: avatarDefaultGrey
      },
    ]
  };

  const members = membersData[id || "1"] || membersData["1"];

  const handleInterested = () => {
    setIsInterested(!isInterested);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-md mx-auto px-6 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/discover?tab=communities")}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-heading font-semibold text-foreground">
            {community.title}
          </h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 space-y-6">
        <Card>
          <CardContent className="p-6 space-y-4">
            <div>
              <h2 className="text-2xl font-heading font-semibold text-foreground mb-2">
                {community.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {community.description}
              </p>
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{community.memberCount} members</span>
              {community.nextEvent && <span>Next: {community.nextEvent}</span>}
            </div>
            <Button 
              className="w-full rounded-full font-semibold"
              variant={isInterested ? "default" : "outline"}
              style={isInterested ? { backgroundColor: '#D8A24A' } : {}}
              onClick={handleInterested}
            >
              {isInterested ? 'Interested ✓' : 'Interested'}
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <h3 className="text-lg font-heading font-semibold text-foreground">Members</h3>
          {members.map((member) => (
            <Card 
              key={member.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate(`/profile/${member.id}?from=community&communityId=${id}`)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                   <img 
                    src={member.avatarUrl} 
                    alt={member.name}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0 aspect-square"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground text-base">{member.name}</h4>
                    <Badge variant="soft" className="rounded-full text-xs mt-1">
                      {member.stage}
                    </Badge>
                    <p className="text-sm text-foreground mt-2 leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityDetail;
