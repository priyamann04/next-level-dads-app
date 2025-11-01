import { useState } from "react";
import ProfileCard from "@/components/ProfileCard";
import BottomNav from "@/components/BottomNav";
import { useToast } from "@/hooks/use-toast";
import avatarLight1 from "@/assets/avatar-light-1.png";
import avatarMedium1 from "@/assets/avatar-medium-1.png";
import avatarDark1 from "@/assets/avatar-dark-1.png";
import avatarMedium2 from "@/assets/avatar-medium-2.png";

// Mock data
const profiles = [
  {
    id: 1,
    name: "Mike",
    age: 35,
    location: "Vancouver, BC",
    bio: "Love hiking with my kids and trying out new recipes. Always up for a weekend adventure or a good conversation over coffee.",
    stage: "School Age (5–8 years)",
    interests: ["Outdoors", "Cooking", "Sports"],
    imageUrl: avatarLight1
  },
  {
    id: 2,
    name: "David",
    age: 42,
    location: "Calgary, AB",
    bio: "Tech dad who enjoys gaming and teaching my kids to code. Looking for other dads to share parenting wins and challenges.",
    stage: "Teenager (13–17 years)",
    interests: ["Gaming", "Tech", "DIY"],
    imageUrl: avatarMedium1
  },
  {
    id: 3,
    name: "James",
    age: 38,
    location: "Halifax, NS",
    bio: "Music lover and amateur photographer. My toddlers keep me busy but I'd love to connect with dads in the area for playdates.",
    stage: "Toddler Years (2–4 years)",
    interests: ["Music", "Photography", "Art"],
    imageUrl: avatarDark1
  },
  {
    id: 4,
    name: "Steve",
    age: 40,
    location: "Montréal, QC",
    bio: "Outdoor adventure seeker and sports enthusiast. Let's grab a beer and swap parenting stories!",
    stage: "School Age (5–8 years)",
    interests: ["Outdoors", "Sports", "Travel"],
    imageUrl: avatarMedium2
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
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-md mx-auto px-4 sm:px-6 py-6 sm:py-8">
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
