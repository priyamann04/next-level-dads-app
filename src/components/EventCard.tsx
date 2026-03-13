import { Calendar, MapPin, Users, Clock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Card, CardContent } from './ui/card'
import { eventDetail } from '@/lib/routes'
import type { Event } from '@/types/events'

const EventCard = ({
  id,
  name,
  description,
  type,
  starts_at,
  ends_at,
  location,
  price_cad,
  attendee_count,
  is_attending,
}: Event) => {
  const navigate = useNavigate()

  const handleCardClick = () => {
    navigate(eventDetail(id))
  }

  // Action handlers (stubs for now)
  const handleRegister = () => {
    // TODO: POST /api/events/:id/register
  }

  const handleUnregister = () => {
    // TODO: DELETE /api/events/:id/unregister
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-CA', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    })
  }

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleTimeString('en-CA', {
      hour: 'numeric',
      minute: '2-digit',
    })
  }

  const formatPrice = (price: string) => {
    const numPrice = Number(price)
    if (numPrice === 0) return 'Free'
    return `$${numPrice.toFixed(2)}`
  }

  return (
    <Card
      className="overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
      onClick={handleCardClick}
    >
      <CardContent className="p-6 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            {name}
          </h3>
          <Badge variant="outline" className="shrink-0">
            {type}
          </Badge>
        </div>

        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        )}

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4 shrink-0" />
            <span>{formatDate(starts_at)}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4 shrink-0" />
            <span>
              {formatTime(starts_at)}
              {ends_at && ` - ${formatTime(ends_at)}`}
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4 shrink-0" />
            <span>{location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-foreground">
              {formatPrice(price_cad)}
            </span>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users className="w-4 h-4" />
              <span className="text-sm">{attendee_count} attending</span>
            </div>
          </div>

          <Button
            variant={is_attending ? 'outline' : 'default'}
            className="rounded-full"
            onClick={(e) => {
              e.stopPropagation()
              if (is_attending) {
                handleUnregister()
              } else {
                handleRegister()
              }
            }}
          >
            {is_attending ? 'Unregister' : 'Register'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default EventCard
