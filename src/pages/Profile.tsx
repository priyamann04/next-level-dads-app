import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Settings, Edit, MapPin, Calendar } from "lucide-react";

const Profile = () => {
  const userProfile = {
    name: "John",
    age: 36,
    location: "San Francisco, CA",
    bio: "Father of two amazing kids. Love staying active, cooking, and connecting with other dads. Always looking to learn and grow in this journey.",
    stage: "School Age Kids",
    interests: ["Cooking", "Fitness", "Outdoors", "Tech"],
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-card border-b border-border">
        <div className="max-w-md mx-auto px-6 py-6 flex items-center justify-between">
          <h1 className="text-2xl font-heading font-semibold text-foreground">
            Profile
          </h1>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-8 space-y-6 animate-fade-in">
        <div className="flex flex-col items-center text-center space-y-4">
          <Avatar className="w-32 h-32 border-4 border-primary/20">
            <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
            <AvatarFallback className="text-2xl">{userProfile.name[0]}</AvatarFallback>
          </Avatar>
          
          <div>
            <h2 className="text-2xl font-heading font-semibold text-foreground">
              {userProfile.name}, {userProfile.age}
            </h2>
            <div className="flex items-center justify-center gap-1 text-muted-foreground mt-1">
              <MapPin className="w-4 h-4" />
              <span>{userProfile.location}</span>
            </div>
          </div>

          <Button className="rounded-full bg-gradient-gold">
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </div>

        <div className="bg-card rounded-lg p-6 space-y-4 shadow-md">
          <div>
            <h3 className="font-semibold text-foreground mb-2">About Me</h3>
            <p className="text-muted-foreground leading-relaxed">{userProfile.bio}</p>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">{userProfile.stage}</span>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {userProfile.interests.map((interest) => (
                <Badge key={interest} variant="secondary" className="rounded-full">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg p-6 shadow-md">
          <h3 className="font-semibold text-foreground mb-4">Stats</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-heading font-semibold text-primary">12</p>
              <p className="text-sm text-muted-foreground">Connections</p>
            </div>
            <div>
              <p className="text-2xl font-heading font-semibold text-primary">4</p>
              <p className="text-sm text-muted-foreground">Communities</p>
            </div>
            <div>
              <p className="text-2xl font-heading font-semibold text-primary">8</p>
              <p className="text-sm text-muted-foreground">Events</p>
            </div>
          </div>
        </div>

        <Button variant="outline" className="w-full rounded-full">
          Share Profile
        </Button>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;
