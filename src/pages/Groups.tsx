import { useNavigate, useParams, Link } from 'react-router-dom'
import BottomNav from '@/components/BottomNav'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, MapPin, Users as UsersIcon } from 'lucide-react'
import { useGroups } from '@/contexts/GroupsContext'
import { useToast } from '@/hooks/use-toast'
import logo from '@/assets/logo.png'
import { cn } from '@/lib/utils'
import { ROUTES, communityChat } from '@/lib/routes'

const allCommunities = [
  {
    id: 1,
    title: 'Saturday Coffee Dads',
    description: 'Weekly Saturday morning meetups at local coffee shops.',
    memberCount: 42,
  },
  {
    id: 2,
    title: 'Outdoor Adventure Dads',
    description: 'For dads who love hiking, camping, and exploring nature with their kids.',
    memberCount: 67,
  },
  {
    id: 5,
    title: 'Sports & Fitness Dads',
    description: 'Stay active together! Organize pickup games and workout sessions.',
    memberCount: 78,
  },
]

const allEvents = [
  {
    id: 1,
    title: 'Saturday Morning Coffee Meetup',
    date: 'Sat, Nov 16 @ 9:00 AM',
    location: "Joe's Coffee Shop",
    attending: 12,
  },
  {
    id: 3,
    title: 'Dad & Kids Hiking Adventure',
    date: 'Sun, Nov 17 @ 10:00 AM',
    location: 'Mountain View Trail',
    attending: 15,
  },
]

const Groups = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { tab = 'communities' } = useParams<{ tab: string }>()
  const { joinedCommunities, registeredEvents, leaveCommunity, unregisterEvent } = useGroups()

  const myCommunities = allCommunities.filter((c) => joinedCommunities.includes(c.id))
  const myEvents = allEvents.filter((e) => registeredEvents.includes(e.id))

  const handleLeaveCommunity = (id: number, title: string, e: React.MouseEvent) => {
    e.stopPropagation()
    leaveCommunity(id)
    toast({
      title: 'Left community',
      description: `You've left ${title}. The group chat has been removed.`,
    })
  }

  const handleUnregisterEvent = (id: number, title: string) => {
    unregisterEvent(id)
    toast({
      title: 'Unregistered from event',
      description: `You've unregistered from ${title}.`,
    })
  }

  const handleCommunityClick = (communityId: number) => {
    navigate(communityChat(communityId, 'groups'))
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="relative bg-card border-b border-border px-6 py-5 flex items-center justify-center">
        <img
          src={logo}
          alt="Next Level Dads"
          className="h-10 absolute top-4 left-3"
        />
        <div className="text-center">
          <h1 className="text-2xl font-heading font-semibold text-foreground">
            Groups
          </h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6">
        <div className="w-full">
          <div className="w-full grid grid-cols-2 bg-card border-b border-border h-12 mb-2">
            <Link
              to={ROUTES.GROUPS_COMMUNITIES}
              className={cn(
                "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all",
                tab === 'communities' && "border-b-2 border-primary text-foreground",
                tab !== 'communities' && "text-muted-foreground"
              )}
            >
              Communities
            </Link>
            <Link
              to={ROUTES.GROUPS_EVENTS}
              className={cn(
                "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all",
                tab === 'events' && "border-b-2 border-primary text-foreground",
                tab !== 'events' && "text-muted-foreground"
              )}
            >
              Events
            </Link>
          </div>

          {tab === 'communities' && (
            <div className="space-y-3 animate-fade-in">
              {myCommunities.length > 0 ? (
                myCommunities.map((community) => (
                  <Card
                    key={community.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-4 space-y-3">
                      <div
                        className="cursor-pointer space-y-2"
                        onClick={() => handleCommunityClick(community.id)}
                      >
                        <h4 className="font-semibold text-foreground">
                          {community.title}
                        </h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {community.description}
                        </p>
                        <div className="flex items-center gap-2 pt-1">
                          <UsersIcon className="w-4 h-4 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {community.memberCount} members
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full rounded-full"
                        onClick={(e) => handleLeaveCommunity(community.id, community.title, e)}
                      >
                        Leave Group
                      </Button>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No joined communities yet</p>
                </div>
              )}
            </div>
          )}

          {tab === 'events' && (
            <div className="space-y-4 animate-fade-in">
              {myEvents.length > 0 ? (
                myEvents.map((event) => (
                  <Card key={event.id} className="overflow-hidden shadow-md">
                    <CardContent className="p-6 space-y-3">
                      <h3 className="text-lg font-heading font-semibold text-foreground">
                        {event.title}
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-sm text-muted-foreground">
                          {event.attending} attending
                        </span>
                        <Button
                          variant="outline"
                          className="rounded-full"
                          onClick={() => handleUnregisterEvent(event.id, event.title)}
                        >
                          Unregister
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No registered events yet</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}

export default Groups
