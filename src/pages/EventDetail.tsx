import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Calendar, Clock, MapPin, Users, User, Mail, Phone } from 'lucide-react'
import { useGroups } from '@/contexts/GroupsContext'
import { useToast } from '@/hooks/use-toast'
import { getEventById } from '@/data/events'
import logo from '@/assets/logo.png'
import BottomNav from '@/components/BottomNav'
import { ROUTES } from '@/lib/routes'

const EventDetail = () => {
  const { eventId } = useParams<{ eventId: string }>()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { toast } = useToast()
  const { registeredEvents, registerEvent, unregisterEvent } = useGroups()

  const from = searchParams.get('from') as 'discover' | 'groups' | null

  const event = eventId ? getEventById(parseInt(eventId)) : undefined
  const isRegistered = event ? registeredEvents.includes(event.id) : false

  const handleBack = () => {
    if (from === 'groups') {
      navigate(ROUTES.GROUPS_EVENTS)
    } else {
      navigate(ROUTES.DISCOVER_EVENTS)
    }
  }

  const handleRegisterToggle = () => {
    if (!event) return

    if (isRegistered) {
      unregisterEvent(event.id)
      toast({
        title: 'Unregistered from event',
        description: `You've unregistered from ${event.title}.`,
      })
    } else {
      registerEvent(event.id)
      toast({
        title: 'Registered for event! 🎉',
        description: `You've registered for ${event.title}.`,
      })
    }
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="relative bg-card border-b border-border px-6 py-5 flex items-center justify-center">
          <img
            src={logo}
            alt="Next Level Dads"
            className="h-10 absolute top-4 left-3"
          />
          <h1 className="text-2xl font-heading font-semibold text-foreground">
            Event Not Found
          </h1>
        </div>
        <div className="max-w-md mx-auto px-6 py-6 text-center">
          <p className="text-muted-foreground mb-4">This event could not be found.</p>
          <Button onClick={handleBack} variant="outline" className="rounded-full">
            Go Back
          </Button>
        </div>
        <BottomNav />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="relative bg-card border-b border-border px-6 py-5 flex items-center justify-center">
        <img
          src={logo}
          alt="Next Level Dads"
          className="h-10 absolute top-4 left-3"
        />
        <h1 className="text-2xl font-heading font-semibold text-foreground">
          Event Details
        </h1>
      </div>

      <div className="max-w-md mx-auto px-6 py-6">
        <Button
          variant="ghost"
          onClick={handleBack}
          className="mb-4 -ml-2 text-muted-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to {from === 'groups' ? 'My Events' : 'Discover'}
        </Button>

        <Card className="overflow-hidden shadow-lg">
          <CardContent className="p-6 space-y-6">
            {/* Header */}
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-xl font-heading font-bold text-foreground">
                  {event.title}
                </h2>
                <Badge 
                  variant="outline"
                  className="shrink-0"
                >
                  {event.type}
                </Badge>
              </div>
              
              <p className="text-muted-foreground">
                {event.description}
              </p>
            </div>

            {/* Event Details */}
            <div className="space-y-3 py-4 border-y border-border">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p className="text-sm font-medium text-foreground">{event.date}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Time</p>
                  <p className="text-sm font-medium text-foreground">{event.time}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="text-sm font-medium text-foreground">{event.location}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-primary mt-0.5" />
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Hosted by</p>
                  <p className="text-sm font-medium text-foreground">{event.host}</p>
                  {(event.hostEmail || event.hostPhone) && (
                    <div className="pt-1 space-y-1">
                      {event.hostEmail && (
                        <a 
                          href={`mailto:${event.hostEmail}`} 
                          className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          {event.hostEmail}
                        </a>
                      )}
                      {event.hostPhone && (
                        <a 
                          href={`tel:${event.hostPhone}`} 
                          className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          {event.hostPhone}
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Price and Attendance */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground">{event.price}</p>
                <p className="text-xs text-muted-foreground">Entry fee</p>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="w-5 h-5" />
                <span className="text-sm">{event.attending} attending</span>
              </div>
            </div>

            {/* Registration Status */}
            {isRegistered && (
              <div className="bg-primary/10 rounded-lg p-4 text-center">
                <p className="text-sm font-medium text-primary">
                  ✓ You're registered for this event
                </p>
              </div>
            )}

            {/* Action Button */}
            <Button
              className="w-full rounded-full"
              variant={isRegistered ? 'outline' : 'default'}
              size="lg"
              onClick={handleRegisterToggle}
            >
              {isRegistered ? 'Unregister from Event' : 'Register for Event'}
            </Button>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  )
}

export default EventDetail
