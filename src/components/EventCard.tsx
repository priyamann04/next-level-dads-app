import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, Users, Clock, Info } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { eventDetail } from '@/lib/routes'
import type { Event } from '@/data/events'

interface EventCardProps {
  event: Event
  isRegistered: boolean
  onRegister: () => void
  onUnregister: () => void
  context: 'discover' | 'groups'
}

const EventCard = ({ 
  event, 
  isRegistered, 
  onRegister, 
  onUnregister, 
  context 
}: EventCardProps) => {
  const navigate = useNavigate()

  const handleCardClick = () => {
    navigate(eventDetail(event.id, context))
  }

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isRegistered) {
      onUnregister()
    } else {
      onRegister()
    }
  }

  return (
    <Card 
      className="overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
      onClick={handleCardClick}
    >
      <CardContent className="p-6 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            {event.title}
          </h3>
          <Badge variant="outline" className="shrink-0">
            {event.type}
          </Badge>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2">
          {event.description}
        </p>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4 shrink-0" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4 shrink-0" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4 shrink-0" />
            <span>{event.location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-foreground">
              {event.price}
            </span>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users className="w-4 h-4" />
              <span className="text-sm">{event.attending}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground"
              onClick={(e) => {
                e.stopPropagation()
                handleCardClick()
              }}
            >
              <Info className="w-4 h-4 mr-1" />
              More Info
            </Button>
            <Button
              variant={isRegistered ? 'outline' : 'default'}
              className="rounded-full"
              onClick={handleActionClick}
            >
              {isRegistered ? 'Unregister' : 'Register'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default EventCard
