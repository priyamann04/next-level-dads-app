import { Users, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface CommunityCardProps {
  title: string;
  description: string;
  memberCount: number;
  nextEvent?: string;
  onJoin: () => void;
}

const CommunityCard = ({
  title,
  description,
  memberCount,
  nextEvent,
  onJoin,
}: CommunityCardProps) => {
  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <CardContent className="p-6 space-y-4">
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{memberCount} members</span>
          </div>
          
          {nextEvent && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span className="text-xs">{nextEvent}</span>
            </div>
          )}
        </div>
        
        <Button
          className="w-full rounded-full"
          variant="outline"
          onClick={onJoin}
        >
          Join Community
        </Button>
      </CardContent>
    </Card>
  );
};

export default CommunityCard;
