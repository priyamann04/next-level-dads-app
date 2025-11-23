import { MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

interface ConnectionCardProps {
  name: string;
  age: number;
  city: string;
  province: string;
  childAgeRange: string;
  interests: string[];
  avatarUrl?: string;
  onChat: () => void;
}

const ConnectionCard = ({
  name,
  age,
  city,
  province,
  childAgeRange,
  interests,
  avatarUrl,
  onChat,
}: ConnectionCardProps) => {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
  
  return (
    <Card className="overflow-hidden shadow-md">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start gap-3">
          {avatarUrl ? (
            <img 
              src={avatarUrl} 
              alt={name}
              className="w-20 h-20 rounded-lg object-cover flex-shrink-0 aspect-square"
            />
          ) : (
            <div className="w-20 h-20 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-semibold text-lg flex-shrink-0 aspect-square">
              {initials}
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-heading font-semibold text-foreground">
              {name}, {age}
            </h3>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
              <MapPin className="w-3 h-3" />
              <span>{city}, {province}</span>
            </div>
            <Badge variant="soft" className="rounded-full mt-1.5 text-xs">
              {childAgeRange}
            </Badge>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1.5">
          {interests.map((interest) => (
            <Badge 
              key={interest} 
              variant="outline" 
              className="rounded-full text-xs"
              style={{ borderColor: '#D8A24A', color: '#D8A24A' }}
            >
              {interest}
            </Badge>
          ))}
        </div>
        
        <Button
          className="w-full rounded-full font-semibold"
          style={{ backgroundColor: '#D8A24A' }}
          onClick={onChat}
        >
          Chat
        </Button>
      </CardContent>
    </Card>
  );
};

export default ConnectionCard;
