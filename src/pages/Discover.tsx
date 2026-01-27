import { useState, useMemo } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import BottomNav from '@/components/BottomNav'
import CommunityCard from '@/components/CommunityCard'
import DadCard from '@/components/DadCard'
import EventCard from '@/components/EventCard'
import { useToast } from '@/hooks/use-toast'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { RefreshCw, Search, SlidersHorizontal } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import avatarDefaultGrey from '@/assets/avatar-default-grey.png'
import logo from '@/assets/logo.png'
import { cn } from '@/lib/utils'
import { ROUTES, communityChat, dadDetail } from '@/lib/routes'
import { events as sharedEvents } from '@/data/events'

// Helper data
const stageOptions = [
  'Expecting',
  'Newborn (0–1 year)',
  'Toddler (2–3 years)',
  'Preschool (4–5 years)',
  'Elementary (6–12 years)',
  'Teen (13–17 years)',
  'Adult (18+ years)',
]
const interestOptions = [
  'Sports',
  'Cooking',
  'Outdoors',
  'Fitness',
  'Gaming',
  'Music',
  'Reading',
  'Travel',
  'Tech',
  'DIY',
  'Photography',
  'Art',
  'Cars',
  'Parenting',
  'Mental Wellness',
  'Movies',
  'Coffee',
  'Home Projects',
  'Volunteering',
  'Board Games',
  'Faith',
  'Entrepreneurship',
  'Pets',
  'Gardening',
  'Podcasts',
  'Finance',
  'Writing',
]
const provinces = [
  'AB', // Alberta
  'BC', // British Columbia
  'MB', // Manitoba
  'NB', // New Brunswick
  'NL', // Newfoundland and Labrador
  'NS', // Nova Scotia
  'NT', // Northwest Territories
  'NU', // Nunavut
  'ON', // Ontario
  'PE', // Prince Edward Island
  'QC', // Quebec
  'SK', // Saskatchewan
  'YT', // Yukon
]
const ageRanges = [
  'all',
  'Under 25',
  '25-29',
  '30-34',
  '35-39',
  '40-44',
  '45-49',
  '50-59',
  '60+',
]

const dads = []

const communities = []

const Discover = () => {
  const { toast } = useToast()
  const navigate = useNavigate()
  const { tab = 'dads' } = useParams<{ tab: string }>()

  const [eventFilter, setEventFilter] = useState<'all' | 'virtual' | 'local'>(
    'all',
  )
  const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'paid'>('all')
  const [communitySearchQuery, setCommunitySearchQuery] = useState('')
  const [eventSearchQuery, setEventSearchQuery] = useState('')

  const [pendingChildrenAges, setPendingChildrenAges] = useState<string[]>([])
  const [pendingInterests, setPendingInterests] = useState<string[]>([])
  const [pendingLocations, setPendingLocations] = useState<string[]>([])
  const [pendingDadAges, setPendingDadAges] = useState<string[]>([])

  const [appliedChildrenAges, setAppliedChildrenAges] = useState<string[]>([])
  const [appliedInterests, setAppliedInterests] = useState<string[]>([])
  const [appliedLocations, setAppliedLocations] = useState<string[]>([])
  const [appliedDadAges, setAppliedDadAges] = useState<string[]>([])

  const [filtersOpen, setFiltersOpen] = useState(false)
  const [interestSearchQuery, setInterestSearchQuery] = useState('')

  // Filter toggle functions
  const togglePendingChildrenAge = (stage: string) => {
    setPendingChildrenAges((prev) =>
      prev.includes(stage) ? prev.filter((s) => s !== stage) : [...prev, stage],
    )
  }
  const togglePendingInterest = (interest: string) => {
    setPendingInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest],
    )
  }
  const togglePendingLocation = (location: string) => {
    setPendingLocations((prev) =>
      prev.includes(location)
        ? prev.filter((l) => l !== location)
        : [...prev, location],
    )
  }
  const togglePendingDadAge = (ageRange: string) => {
    setPendingDadAges((prev) =>
      prev.includes(ageRange)
        ? prev.filter((a) => a !== ageRange)
        : [...prev, ageRange],
    )
  }

  const registerEvent = (eventId: number) => {}
  const unregisterEvent = (eventId: number) => {}

  const applyFilters = () => {
    setAppliedChildrenAges(pendingChildrenAges)
    setAppliedInterests(pendingInterests)
    setAppliedLocations(pendingLocations)
    setAppliedDadAges(pendingDadAges)
    setFiltersOpen(false)
  }

  const clearAllFilters = () => {
    setPendingChildrenAges([])
    setPendingInterests([])
    setPendingLocations([])
    setPendingDadAges([])
    setAppliedChildrenAges([])
    setAppliedInterests([])
    setAppliedLocations([])
    setAppliedDadAges([])
  }

  const handleJoin = (communityId: number, title: string) => {}

  const handleJoinEvent = (eventId: number, title: string) => {}

  const handleConnect = (name: string) => {}

  const handleRefresh = () => {}

  // Filter lists
  const filteredDads = []

  const filteredCommunities = []

  const filteredEvents = []

  const registeredEvents = []

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
            Discover
          </h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6">
        <div className="w-full">
          <div className="w-full grid grid-cols-3 bg-card border-b border-border h-12 mb-2">
            <Link
              to={ROUTES.DISCOVER_DADS}
              className={cn(
                'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all',
                tab === 'dads' && 'border-b-2 border-primary text-foreground',
                tab !== 'dads' && 'text-muted-foreground',
              )}
            >
              Dads
            </Link>
            <Link
              to={ROUTES.DISCOVER_COMMUNITIES}
              className={cn(
                'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all',
                tab === 'communities' &&
                  'border-b-2 border-primary text-foreground',
                tab !== 'communities' && 'text-muted-foreground',
              )}
            >
              Communities
            </Link>
            <Link
              to={ROUTES.DISCOVER_EVENTS}
              className={cn(
                'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all',
                tab === 'events' && 'border-b-2 border-primary text-foreground',
                tab !== 'events' && 'text-muted-foreground',
              )}
            >
              Events
            </Link>
          </div>

          {tab === 'dads' && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex justify-end mb-4">
                <Sheet
                  open={filtersOpen}
                  onOpenChange={setFiltersOpen}
                >
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      className="rounded-full"
                    >
                      <SlidersHorizontal className="w-4 h-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side="right"
                    className="w-full sm:max-w-md overflow-y-auto"
                  >
                    <SheetHeader>
                      <SheetTitle>Filter Dads</SheetTitle>
                      <SheetDescription>
                        Refine your search to find the perfect connections
                      </SheetDescription>
                    </SheetHeader>

                    <div className="mt-6 space-y-6">
                      <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-foreground">
                          Children's Age
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          Select all that apply
                        </p>
                        <div className="flex gap-2 flex-wrap">
                          {stageOptions.map((stage) => (
                            <Badge
                              key={stage}
                              variant={
                                pendingChildrenAges.includes(stage)
                                  ? 'default'
                                  : 'outline'
                              }
                              className="cursor-pointer rounded-full"
                              onClick={() => togglePendingChildrenAge(stage)}
                            >
                              {stage}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-foreground">
                          Interests
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          Search and select interests
                        </p>

                        {/* Selected interests display */}
                        {pendingInterests.length > 0 && (
                          <div className="flex gap-2 flex-wrap mb-2">
                            {pendingInterests.map((interest) => (
                              <Badge
                                key={interest}
                                variant="default"
                                className="cursor-pointer rounded-full"
                                onClick={() => togglePendingInterest(interest)}
                              >
                                {interest} ✕
                              </Badge>
                            ))}
                          </div>
                        )}

                        {/* Interest search input */}
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            placeholder="Search interests..."
                            value={interestSearchQuery}
                            onChange={(e) =>
                              setInterestSearchQuery(e.target.value)
                            }
                            className="pl-9"
                          />
                        </div>

                        {/* Filtered interest suggestions */}
                        {interestSearchQuery && (
                          <div className="max-h-40 overflow-y-auto border border-border rounded-md bg-card">
                            {interestOptions
                              .filter(
                                (interest) =>
                                  interest
                                    .toLowerCase()
                                    .includes(
                                      interestSearchQuery.toLowerCase(),
                                    ) && !pendingInterests.includes(interest),
                              )
                              .map((interest) => (
                                <button
                                  key={interest}
                                  type="button"
                                  className="w-full text-left px-3 py-2 text-sm hover:bg-muted transition-colors"
                                  onClick={() => {
                                    togglePendingInterest(interest)
                                    setInterestSearchQuery('')
                                  }}
                                >
                                  {interest}
                                </button>
                              ))}
                            {interestOptions.filter(
                              (interest) =>
                                interest
                                  .toLowerCase()
                                  .includes(
                                    interestSearchQuery.toLowerCase(),
                                  ) && !pendingInterests.includes(interest),
                            ).length === 0 && (
                              <div className="px-3 py-2 text-sm text-muted-foreground">
                                No matching interests
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-foreground">
                          Location
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          Select all that apply
                        </p>
                        <div className="flex gap-2 flex-wrap">
                          {provinces.map((province) => (
                            <Badge
                              key={province}
                              variant={
                                pendingLocations.includes(province)
                                  ? 'default'
                                  : 'outline'
                              }
                              className="cursor-pointer rounded-full"
                              onClick={() => togglePendingLocation(province)}
                            >
                              {province}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-foreground">
                          Age
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          Select all that apply
                        </p>
                        <div className="flex gap-2 flex-wrap">
                          {ageRanges.slice(1).map((range) => (
                            <Badge
                              key={range}
                              variant={
                                pendingDadAges.includes(range)
                                  ? 'default'
                                  : 'outline'
                              }
                              className="cursor-pointer rounded-full"
                              onClick={() => togglePendingDadAge(range)}
                            >
                              {range}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 flex gap-3">
                        <Button
                          className="flex-1"
                          onClick={applyFilters}
                        >
                          Apply Filters
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={clearAllFilters}
                        >
                          Clear All
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              <div className="space-y-4">
                {filteredDads.length > 0 ? (
                  filteredDads.map((dad) => (
                    <DadCard
                      key={dad.id}
                      {...dad}
                      onConnect={() => handleConnect(dad.name)}
                      onClick={() => navigate(dadDetail(dad.id))}
                    />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      No dads match your filters
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-4">
                <Button
                  variant="outline"
                  className="w-full rounded-full"
                  onClick={handleRefresh}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>
          )}

          {tab === 'communities' && (
            <div className="space-y-4 animate-fade-in">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search communities..."
                  value={communitySearchQuery}
                  onChange={(e) => setCommunitySearchQuery(e.target.value)}
                  className="pl-10 rounded-full"
                />
              </div>

              <div className="space-y-3">
                {filteredCommunities.length > 0 ? (
                  filteredCommunities.map((community) => (
                    <div
                      key={community.id}
                      // onClick={() => {}}
                      // className="cursor-pointer"
                    >
                      <CommunityCard
                        {...community}
                        onJoin={() => handleJoin(community.id, community.title)}
                      />
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      No communities found
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {tab === 'events' && (
            <div className="space-y-4 animate-fade-in">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search events..."
                  value={eventSearchQuery}
                  onChange={(e) => setEventSearchQuery(e.target.value)}
                  className="pl-10 rounded-full"
                />
              </div>

              <div className="py-4">
                <Button
                  variant="outline"
                  className="w-full rounded-full font-semibold text-foreground bg-white"
                  style={{ borderColor: '#D8A24A' }}
                  onClick={() => {}}
                >
                  Host Your Own Event
                </Button>
              </div>

              <div className="flex gap-2 mb-4 flex-wrap">
                <Badge
                  variant={eventFilter === 'all' ? 'default' : 'outline'}
                  className="cursor-pointer rounded-full"
                  onClick={() => setEventFilter('all')}
                >
                  All
                </Badge>
                <Badge
                  variant={eventFilter === 'virtual' ? 'default' : 'outline'}
                  className="cursor-pointer rounded-full"
                  onClick={() => setEventFilter('virtual')}
                >
                  Virtual
                </Badge>
                <Badge
                  variant={eventFilter === 'local' ? 'default' : 'outline'}
                  className="cursor-pointer rounded-full"
                  onClick={() => setEventFilter('local')}
                >
                  Local
                </Badge>
                <Badge
                  variant={priceFilter === 'free' ? 'default' : 'outline'}
                  className="cursor-pointer rounded-full"
                  onClick={() => setPriceFilter('free')}
                >
                  Free
                </Badge>
                <Badge
                  variant={priceFilter === 'paid' ? 'default' : 'outline'}
                  className="cursor-pointer rounded-full"
                  onClick={() => setPriceFilter('paid')}
                >
                  Paid
                </Badge>
              </div>

              {filteredEvents.length > 0 ? (
                <div className="space-y-4">
                  {filteredEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      isRegistered={registeredEvents.includes(event.id)}
                      onRegister={() => {
                        registerEvent(event.id)
                        toast({
                          title: 'Registered for event! 🎉',
                          description: `You've registered for ${event.title}.`,
                        })
                      }}
                      onUnregister={() => {
                        unregisterEvent(event.id)
                        toast({
                          title: 'Registration cancelled',
                          description: `You've cancelled your registration for ${event.title}.`,
                        })
                      }}
                      context="discover"
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    No events match your filters
                  </p>
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

export default Discover
