import { useState } from "react";
import ProfileCard from "@/components/ProfileCard";
import BottomNav from "@/components/BottomNav";
import { useToast } from "@/hooks/use-toast";

// Mock data
const profiles = [
  {
    id: 1,
    name: "Mike",
    age: 35,
    location: "Portland, OR",
    bio: "Love hiking with my kids and trying out new recipes. Always up for a weekend adventure or a good conversation over coffee.",
    stage: "School Age Kids",
    interests: ["Outdoors", "Cooking", "Sports"],
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop"
  },
  {
    id: 2,
    name: "David",
    age: 42,
    location: "Austin, TX",
    bio: "Tech dad who enjoys gaming and teaching my kids to code. Looking for other dads to share parenting wins and challenges.",
    stage: "Teenagers",
    interests: ["Gaming", "Tech", "DIY"],
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=800&fit=crop"
  },
  {
    id: 3,
    name: "James",
    age: 38,
    location: "Seattle, WA",
    bio: "Music lover and amateur photographer. My toddlers keep me busy but I'd love to connect with dads in the area for playdates.",
    stage: "Toddler Years",
    interests: ["Music", "Photography", "Art"],
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=800&fit=crop"
  }
];

const Match = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { toast } = useToast();

  const handleSkip = () => {
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      toast({
        title: "That's everyone for now!",
        description: "Check back soon for more connections.",
      });
    }
  };

  const handleConnect = () => {
    toast({
      title: "Connection sent! 🎉",
      description: `Your connection request was sent to ${profiles[currentIndex].name}.`,
    });
    
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  if (currentIndex >= profiles.length) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pb-20 px-6">
        <div className="text-center space-y-4 animate-fade-in">
          <h2 className="text-2xl font-heading font-semibold text-foreground">
            You're all caught up!
          </h2>
          <p className="text-muted-foreground">
            Check back soon for more potential connections.
          </p>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-heading font-semibold text-foreground mb-2">
            Discover Connections
          </h1>
          <p className="text-muted-foreground">
            Find fathers with shared interests
          </p>
        </div>
        
        <ProfileCard
          {...profiles[currentIndex]}
          onSkip={handleSkip}
          onConnect={handleConnect}
        />
      </div>
      <BottomNav />
    </div>
  );
};

export default Match;
