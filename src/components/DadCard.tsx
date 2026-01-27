import { MapPin } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

type CardVariant = 'discover' | 'connection' | 'request';

interface DadCardProps {
  id: string;
  name: string;
  age: number;
  city: string;
  province: string;
  childAgeRange: string;
  bio: string;
  interests: string[];
  avatarUrl?: string;
  onClick?: () => void;
  variant?: CardVariant;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
}

const DadCard = ({
  id,
  name,
  age,
  city,
  province,
  childAgeRange,
  bio,
  interests,
  avatarUrl,
  onClick,
  variant = 'discover',
  onPrimaryAction,
  onSecondaryAction,
}: DadCardProps) => {
  const [isRequested, setIsRequested] = useState(false);
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();

  const handlePrimaryAction = () => {
    if (variant === 'discover') {
      setIsRequested(!isRequested);
    }
    onPrimaryAction?.();
  };

  const getPrimaryButtonLabel = () => {
    switch (variant) {
      case 'discover':
        return isRequested ? 'Requested ✓' : 'Connect';
      case 'connection':
        return 'Chat';
      case 'request':
        return 'Accept';
    }
  };

  const getSecondaryButtonLabel = () => {
    switch (variant) {
      case 'connection':
        return 'Unconnect';
      case 'request':
        return 'Ignore';
      default:
        return '';
    }
  };

  const getPrimaryButtonStyle = () => {
    if (variant === 'discover' && isRequested) {
      return { backgroundColor: '#9ca3af' };
    }
    return { backgroundColor: '#D8A24A' };
  };

  const hasSecondaryAction = variant === 'connection' || variant === 'request';

  return (
    <Card
      className={`overflow-hidden shadow-md${onClick ? ' cursor-pointer' : ''}`}
      onClick={onClick}
    >
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

        <p className="text-foreground text-sm leading-relaxed">
          {bio}
        </p>

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

        {hasSecondaryAction ? (
          <div className="flex gap-2">
            <Button
              className="flex-1 rounded-full font-semibold"
              style={getPrimaryButtonStyle()}
              onClick={(e) => {
                e.stopPropagation();
                handlePrimaryAction();
              }}
            >
              {getPrimaryButtonLabel()}
            </Button>
            <Button
              variant="outline"
              className="flex-1 rounded-full font-semibold"
              onClick={(e) => {
                e.stopPropagation();
                onSecondaryAction?.();
              }}
            >
              {getSecondaryButtonLabel()}
            </Button>
          </div>
        ) : (
          <Button
            className="w-full rounded-full font-semibold"
            style={getPrimaryButtonStyle()}
            onClick={(e) => {
              e.stopPropagation();
              handlePrimaryAction();
            }}
          >
            {getPrimaryButtonLabel()}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default DadCard;
