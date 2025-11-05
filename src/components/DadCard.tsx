import { MapPin, User } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

interface DadCardProps {
  name: string;
  age: number;
  city: string;
  province: string;
  stage: string;
  bio: string;
  interests: string[];
  avatarUrl?: string;
  onConnect: () => void;
}

const DadCard = ({
  name,
  age,
  city,
  province,
  stage,
  bio,
  interests,
  avatarUrl,
  onConnect,
}: DadCardProps) => {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
  
  return (
    <Card className="overflow-hidden shadow-md">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-start gap-4">
          {avatarUrl ? (
            <img 
              src={avatarUrl} 
              alt={name}
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold text-lg">
              {initials}
            </div>
          )}
          
          <div className="flex-1">
            <h3 className="text-lg font-heading font-semibold text-foreground">
              {name}, {age}
            </h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <MapPin className="w-4 h-4" />
              <span>{city}, {province}</span>
            </div>
            <Badge variant="soft" className="rounded-full mt-2 text-xs">
              {stage}
            </Badge>
          </div>
        </div>
        
        <p className="text-foreground text-sm leading-relaxed">
          {bio}
        </p>
        
        <div>
          <p className="text-xs text-muted-foreground mb-2">INTERESTS</p>
          <div className="flex flex-wrap gap-2">
            {interests.map((interest) => (
              <Badge 
                key={interest} 
                variant="outline" 
                className="rounded-full text-xs"
              >
                {interest}
              </Badge>
            ))}
          </div>
        </div>
        
        <Button
          className="w-full rounded-full bg-gradient-gold font-semibold"
          onClick={onConnect}
        >
          Connect
        </Button>
      </CardContent>
    </Card>
  );
};

export default DadCard;
