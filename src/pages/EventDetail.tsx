import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient, InfiniteData } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  User,
  Mail,
  Phone,
  Loader2,
} from 'lucide-react'
import logo from '@/assets/logo.png'
import BottomNav from '@/components/BottomNav'
import { useToast } from '@/hooks/use-toast'
import axiosPrivate from '@/api/axiosPrivate'
import { TIMEOUT_LENGTH_MS } from '@/config/constants'
import type { Event } from '@/types/events'

async function fetchEvent(id: string): Promise<Event> {
  const res = await axiosPrivate.get<Event>(`/api/events/${id}`, {
    timeout: TIMEOUT_LENGTH_MS,
  })
  return res.data
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

const EventDetail = () => {
  const { eventId } = useParams<{ eventId: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const {
    data: event,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['event', eventId],
    queryFn: () => fetchEvent(eventId!),
    enabled: !!eventId,
    staleTime: 0, // Always fresh fetch
  })

  // Update list caches when event is fetched
  const updateEventInLists = (event: Event) => {
    const { is_attending } = event

    // Update in discover events - keep only if not attending
    queryClient.setQueriesData<InfiniteData<Event[]>>(
      { queryKey: ['discover', 'events'] },
      (oldData) => {
        if (!oldData) return oldData
        return {
          ...oldData,
          pages: oldData.pages.map((page) =>
            !is_attending
              ? page.map((e) => (e.id === eventId ? { ...e, ...event } : e))
              : page.filter((e) => e.id !== eventId),
          ),
        }
      },
    )

    // Update in groups events - keep only if attending
    queryClient.setQueriesData<InfiniteData<Event[]>>(
      { queryKey: ['groups', 'events'] },
      (oldData) => {
        if (!oldData) return oldData
        return {
          ...oldData,
          pages: oldData.pages.map((page) =>
            is_attending
              ? page.map((e) => (e.id === eventId ? { ...e, ...event } : e))
              : page.filter((e) => e.id !== eventId),
          ),
        }
      },
    )
  }

  // Update list caches when event is fetched
  useEffect(() => {
    if (event) {
      updateEventInLists(event)
    }
  }, [event])

  const handleBack = () => {
    navigate(-1)
  }

  // Update attendance status in all caches (from detail page)
  const updateAttendanceInCache = (isAttending: boolean) => {
    const countDelta = isAttending ? 1 : -1

    // Update event cache (is_attending, attendee_count)
    queryClient.setQueryData<Event>(['event', eventId], (oldData) => {
      if (!oldData) return oldData
      return {
        ...oldData,
        is_attending: isAttending,
        attendee_count: oldData.attendee_count + countDelta,
      }
    })

    // Update discover events - remove if now attending
    queryClient.setQueriesData<InfiniteData<Event[]>>(
      { queryKey: ['discover', 'events'] },
      (oldData) => {
        if (!oldData) return oldData
        return {
          ...oldData,
          pages: oldData.pages.map((page) =>
            isAttending
              ? page.filter((e) => e.id !== eventId)
              : page.map((e) =>
                  e.id === eventId
                    ? { ...e, is_attending: isAttending, attendee_count: e.attendee_count + countDelta }
                    : e,
                ),
          ),
        }
      },
    )

    // Update groups events - remove if no longer attending
    queryClient.setQueriesData<InfiniteData<Event[]>>(
      { queryKey: ['groups', 'events'] },
      (oldData) => {
        if (!oldData) return oldData
        return {
          ...oldData,
          pages: oldData.pages.map((page) =>
            !isAttending
              ? page.filter((e) => e.id !== eventId)
              : page.map((e) =>
                  e.id === eventId
                    ? { ...e, is_attending: isAttending, attendee_count: e.attendee_count + countDelta }
                    : e,
                ),
          ),
        }
      },
    )
  }

  // POST /api/events/{id}/attendees - Register for event
  const registerForEvent = useMutation({
    mutationFn: () => axiosPrivate.post(`/api/events/${eventId}/attendees`),
    onSuccess: () => {
      updateAttendanceInCache(true)
    },
    onError: (err: AxiosError) => {
      if (err.response?.status === 403) {
        toast({
          title: 'Paid Event',
          description: 'This is a paid event. Please register through the event page.',
          variant: 'destructive',
        })
      } else if (err.response?.status === 404) {
        toast({
          title: 'Not Found',
          description: 'This event could not be found.',
          variant: 'destructive',
        })
      } else {
        toast({
          title: 'Error',
          description: 'Failed to register for event. Please try again.',
          variant: 'destructive',
        })
      }
    },
  })

  // DELETE /api/events/{id}/attendees - Unregister from event
  const unregisterFromEvent = useMutation({
    mutationFn: () => axiosPrivate.delete(`/api/events/${eventId}/attendees`),
    onSuccess: () => {
      updateAttendanceInCache(false)
    },
    onError: (err: AxiosError) => {
      toast({
        title: 'Error',
        description: 'Failed to unregister from event. Please try again.',
        variant: 'destructive',
      })
    },
  })

  const handleRegister = () => {
    registerForEvent.mutate()
  }

  const handleUnregister = () => {
    unregisterFromEvent.mutate()
  }

  const getHostDisplay = () => {
    if (!event) return null
    if (event.hosted_by_org_name) return event.hosted_by_org_name
    if (event.hosted_by_user_id) return 'A community member'
    if (event.hosted_by_community_id) return 'Community event'
    return null
  }

  if (isLoading) {
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
        <div className="flex justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
        <BottomNav />
      </div>
    )
  }

  if (isError || !event) {
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
          <p className="text-muted-foreground mb-4">
            This event could not be found.
          </p>
          <Button
            onClick={handleBack}
            variant="outline"
            className="rounded-full"
          >
            Go Back
          </Button>
        </div>
        <BottomNav />
      </div>
    )
  }

  const hostDisplay = getHostDisplay()

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
          Back
        </Button>

        <Card className="overflow-hidden shadow-lg">
          <CardContent className="p-6 space-y-6">
            {/* Header */}
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-xl font-heading font-bold text-foreground">
                  {event.name}
                </h2>
                <Badge
                  variant="outline"
                  className="shrink-0"
                >
                  {event.type}
                </Badge>
              </div>

              {event.description && (
                <p className="text-muted-foreground">{event.description}</p>
              )}
            </div>

            {/* Event Details */}
            <div className="space-y-3 py-4 border-y border-border">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p className="text-sm font-medium text-foreground">
                    {formatDate(event.starts_at)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Time</p>
                  <p className="text-sm font-medium text-foreground">
                    {formatTime(event.starts_at)}
                    {event.ends_at && ` - ${formatTime(event.ends_at)}`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="text-sm font-medium text-foreground">
                    {event.location}
                  </p>
                </div>
              </div>

              {hostDisplay && (
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-primary mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Hosted by</p>
                    <p className="text-sm font-medium text-foreground">
                      {hostDisplay}
                    </p>
                    {(event.contact_email || event.contact_phone) && (
                      <div className="pt-1 space-y-1">
                        {event.contact_email && (
                          <a
                            href={`mailto:${event.contact_email}`}
                            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            {event.contact_email}
                          </a>
                        )}
                        {event.contact_phone && (
                          <a
                            href={`tel:${event.contact_phone}`}
                            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            {event.contact_phone}
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Price and Attendance */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {formatPrice(event.price_cad)}
                </p>
                <p className="text-xs text-muted-foreground">Entry fee</p>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="w-5 h-5" />
                <span className="text-sm">{event.attendee_count} attending</span>
              </div>
            </div>

            {/* Registration Status */}
            {event.is_attending && (
              <div className="bg-primary/10 rounded-lg p-4 text-center">
                <p className="text-sm font-medium text-primary">
                  You're registered for this event
                </p>
              </div>
            )}

            {/* Action Button */}
            <Button
              className="w-full rounded-full"
              variant={event.is_attending ? 'outline' : 'default'}
              size="lg"
              onClick={event.is_attending ? handleUnregister : handleRegister}
            >
              {event.is_attending ? 'Unregister from Event' : 'Register for Event'}
            </Button>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  )
}

export default EventDetail
