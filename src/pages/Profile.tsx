import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Settings, Edit, MapPin, Calendar, ArrowLeft } from "lucide-react";
import avatarLight1 from "@/assets/avatar-light-1.png";
import avatarMedium1 from "@/assets/avatar-medium-1.png";
import avatarDark1 from "@/assets/avatar-dark-1.png";
import avatarMedium2 from "@/assets/avatar-medium-2.png";

const Profile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from");
  const communityId = searchParams.get("communityId");
  // If no ID in URL, we're viewing our own profile
  const isOwnProfile = !id;

  // Mock profiles data
  const profiles: { [key: string]: any } = {
    "own": {
      name: "John",
      age: 36,
      city: "Toronto",
      province: "ON",
      bio: "Father of two amazing kids. Love staying active, cooking, and connecting with other dads. Always looking to learn and grow in this journey.",
      stages: ["Elementary (6-12 years)", "Teen (13-17 years)"],
      interests: ["Cooking", "Fitness", "Outdoors", "Tech"],
      avatar: avatarLight1,
      stats: {
        connections: 12,
        communities: 4,
        events: 8
      }
    },
    "1": {
      name: "Mike",
      age: 35,
      city: "Vancouver",
      province: "BC",
      bio: "Love hiking with my kids and trying out new recipes. Always up for a weekend adventure or a good conversation over coffee.",
      stages: ["Elementary (6-12 years)", "Teen (13-17 years)"],
      interests: ["Outdoors", "Cooking", "Sports"],
      avatar: avatarLight1
    },
    "2": {
      name: "David",
      age: 42,
      city: "Calgary",
      province: "AB",
      bio: "Tech dad who enjoys gaming and teaching my kids to code. Looking for other dads to share parenting wins and challenges.",
      stages: ["Elementary (6-12 years)", "Teen (13-17 years)"],
      interests: ["Gaming", "Tech", "DIY"],
      avatar: avatarMedium1
    },
    "3": {
      name: "Anthony Williams",
      age: 36,
      city: "Toronto",
      province: "ON",
      bio: "Fitness enthusiast and amateur photographer.",
      stages: ["Preschool (4-5 years)"],
      interests: ["Fitness", "Photography", "Art"],
      avatar: avatarDark1
    },
    "4": {
      name: "Steve",
      age: 40,
      city: "Montréal",
      province: "QC",
      bio: "Outdoor adventure seeker and sports enthusiast. Let's grab a beer and swap parenting stories!",
      stages: ["Elementary (6-12 years)"],
      interests: ["Outdoors", "Sports", "Travel"],
      avatar: avatarMedium2
    }
  };

  const userProfile = isOwnProfile ? profiles["own"] : profiles[id || "1"];

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-card border-b border-border">
        <div className="max-w-md mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            {from === "community" && communityId && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(`/community-detail/${communityId}`)}
                className="rounded-full"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
            )}
            <h1 className="text-2xl font-heading font-semibold text-foreground">
              Profile
            </h1>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-8 space-y-6 animate-fade-in">
        <div className="flex flex-col items-center text-center space-y-4">
          <Avatar className="w-32 h-32 border-4 border-primary/20 aspect-square">
            <AvatarImage src={userProfile.avatar} alt={userProfile.name} className="object-cover" />
            <AvatarFallback className="text-2xl">{userProfile.name[0]}</AvatarFallback>
          </Avatar>
          
          <div>
            <h2 className="text-2xl font-heading font-semibold text-foreground">
              {userProfile.name}, {userProfile.age}
            </h2>
            <div className="flex items-center justify-center gap-1 text-muted-foreground mt-1">
              <MapPin className="w-4 h-4" />
              <span>{userProfile.city}, {userProfile.province}</span>
            </div>
          </div>

          {isOwnProfile && (
            <Button className="rounded-full bg-gradient-gold">
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>

        <div className="bg-card rounded-lg p-6 space-y-4 shadow-md">
          <div>
            <h3 className="font-semibold text-foreground mb-2">About Me</h3>
            <p className="text-muted-foreground leading-relaxed">{userProfile.bio}</p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-2">Fatherhood Stage</h3>
            <div className="flex flex-wrap gap-2">
              {userProfile.stages.map((stage) => (
                <Badge key={stage} variant="soft" className="rounded-full">
                  <Calendar className="w-3 h-3 mr-1" />
                  {stage}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {userProfile.interests.map((interest) => (
                <Badge key={interest} variant="soft" className="rounded-full">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {isOwnProfile && (
          <>
            <div className="bg-card rounded-lg p-6 shadow-md">
              <h3 className="font-semibold text-foreground mb-4">My Activity</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-heading font-semibold text-primary">
                    {userProfile.stats.connections}
                  </p>
                  <p className="text-sm text-muted-foreground">Connections</p>
                </div>
                <div>
                  <p className="text-2xl font-heading font-semibold text-primary">
                    {userProfile.stats.communities}
                  </p>
                  <p className="text-sm text-muted-foreground">Communities</p>
                </div>
                <div>
                  <p className="text-2xl font-heading font-semibold text-primary">
                    {userProfile.stats.events}
                  </p>
                  <p className="text-sm text-muted-foreground">Events</p>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full rounded-full">
              Share Profile
            </Button>
          </>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;
