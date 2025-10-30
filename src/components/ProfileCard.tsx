import { Heart, X, MapPin, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface ProfileCardProps {
  name: string;
  age: number;
  location: string;
  bio: string;
  stage: string;
  interests: string[];
  imageUrl: string;
  onSkip: () => void;
  onConnect: () => void;
}

const ProfileCard = ({
  name,
  age,
  location,
  bio,
  stage,
  interests,
  imageUrl,
  onSkip,
  onConnect,
}: ProfileCardProps) => {
  return (
    <div className="bg-card rounded-lg shadow-lg overflow-hidden animate-scale-in">
      <div className="relative h-80">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
          <h2 className="text-white text-2xl font-heading font-semibold mb-1">
            {name}, {age}
          </h2>
          <div className="flex items-center text-white/90 text-sm mb-2">
            <MapPin className="w-4 h-4 mr-1" />
            {location}
          </div>
        </div>
      </div>
      
      <div className="p-6 space-y-4">
        <p className="text-foreground leading-relaxed">{bio}</p>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>{stage}</span>
        </div>
        
          <div className="flex flex-wrap gap-2">
            {interests.map((interest) => (
              <Badge key={interest} variant="soft" className="rounded-full">
                {interest}
              </Badge>
            ))}
          </div>
      </div>
      
      <div className="flex gap-4 p-6 pt-0">
        <Button
          variant="outline"
          size="lg"
          className="flex-1 rounded-full border-2"
          onClick={onSkip}
        >
          <X className="w-5 h-5 mr-2" />
          Skip
        </Button>
        <Button
          size="lg"
          className="flex-1 rounded-full bg-gradient-gold"
          onClick={onConnect}
        >
          <Heart className="w-5 h-5 mr-2" />
          Connect
        </Button>
      </div>
    </div>
  );
};

export default ProfileCard;
