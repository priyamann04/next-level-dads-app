import { useState, useMemo, useRef, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import BottomNav from '@/components/BottomNav'
import CommunityCard from '@/components/CommunityCard'
import DadCard from '@/components/DadCard'
import EventCard from '@/components/EventCard'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { RefreshCw, Search, SlidersHorizontal, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import logo from '@/assets/logo.png'
import { cn } from '@/lib/utils'
import { ROUTES } from '@/lib/routes'
import axiosPrivate from '@/api/axiosPrivate'
import {
  TIMEOUT_LENGTH_MS,
  DISCOVER_PROFILES_PAGE_LIMIT,
  DISCOVER_COMMUNITIES_PAGE_LIMIT,
  DISCOVER_EVENTS_PAGE_LIMIT,
  DISCOVER_DADS_FILTERS_AGE_RANGES,
  STAGE_OPTIONS,
  PROVINCE_OPTIONS,
} from '@/config/constants'
import { Profile, DiscoverDadsFilters, DiscoverDadsCursor } from '@/types/users'
import {
  Community,
  DiscoverCommunitiesFilters,
  DiscoverCommunitiesCursor,
} from '@/types/communities'
import {
  Event,
  EventType,
  DiscoverEventsFilters,
  DiscoverEventsCursor,
} from '@/types/events'

async function fetchDiscoverProfiles(
  filters: DiscoverDadsFilters,
  cursor?: DiscoverDadsCursor,
): Promise<Profile[]> {
  const params = new URLSearchParams()
  filters.interests.forEach((i) => params.append('interests', i))
  filters.children_age_ranges.forEach((r) =>
    params.append('children_age_ranges', r),
  )
  filters.provinces.forEach((p) => params.append('provinces', p))
  filters.age_ranges.forEach((r) => params.append('age_ranges', r))
  if (cursor) {
    params.append('cursor_id', cursor.cursor_id)
    params.append('cursor_created_at', cursor.cursor_created_at)
  }
  const res = await axiosPrivate.get<Profile[]>('/api/users/', {
    params,
    timeout: TIMEOUT_LENGTH_MS,
  })
  return res.data
}

async function fetchInterests(): Promise<string[]> {
  const res = await axiosPrivate.get<string[]>('/api/interests/', {
    timeout: TIMEOUT_LENGTH_MS,
  })
  return res.data
}

async function fetchDiscoverCommunities(
  filters: DiscoverCommunitiesFilters,
  cursor?: DiscoverCommunitiesCursor,
): Promise<Community[]> {
  const params = new URLSearchParams()
  if (filters.name) {
    params.append('name', filters.name)
  }
  if (cursor) {
    params.append('cursor_id', cursor.cursor_id)
    params.append('cursor_created_at', cursor.cursor_created_at)
  }
  const res = await axiosPrivate.get<Community[]>('/api/communities/', {
    params,
    timeout: TIMEOUT_LENGTH_MS,
  })
  return res.data
}

async function fetchDiscoverEvents(
  filters: DiscoverEventsFilters,
  cursor?: DiscoverEventsCursor,
): Promise<Event[]> {
  const params = new URLSearchParams()
  if (filters.name) {
    params.append('name', filters.name)
  }
  if (filters.type) {
    params.append('type', filters.type)
  }
  if (filters.is_free !== null) {
    params.append('is_free', String(filters.is_free))
  }
  if (cursor) {
    params.append('cursor_id', cursor.cursor_id)
    params.append('cursor_created_at', cursor.cursor_created_at)
  }
  const res = await axiosPrivate.get<Event[]>('/api/events/', {
    params,
    timeout: TIMEOUT_LENGTH_MS,
  })
  return res.data
}

const Discover = () => {
  const { tab = 'dads' } = useParams<{ tab: string }>()

  // Dads tab state
  const [pendingChildrenAges, setPendingChildrenAges] = useState<string[]>([])
  const [pendingInterests, setPendingInterests] = useState<string[]>([])
  const [pendingLocations, setPendingLocations] = useState<string[]>([])
  const [pendingDadAges, setPendingDadAges] = useState<string[]>([])
  const [appliedChildrenAges, setAppliedChildrenAges] = useState<string[]>([])
  const [appliedInterests, setAppliedInterests] = useState<string[]>([])
  const [appliedLocations, setAppliedLocations] = useState<string[]>([])
  const [appliedDadAges, setAppliedDadAges] = useState<string[]>([])
  const [filtersOpen, setFiltersOpen] = useState(false)

  // Reset pending filters to applied when sheet closes without applying
  const handleFiltersOpenChange = (open: boolean) => {
    if (!open) {
      setPendingChildrenAges(appliedChildrenAges)
      setPendingInterests(appliedInterests)
      setPendingLocations(appliedLocations)
      setPendingDadAges(appliedDadAges)
    }
    setFiltersOpen(open)
  }
  const [interestSearchQuery, setInterestSearchQuery] = useState('')

  // Communities tab state
  const [communitySearchQuery, setCommunitySearchQuery] = useState('')
  const [appliedCommunitySearch, setAppliedCommunitySearch] = useState('')

  // Events tab state
  const [eventSearchQuery, setEventSearchQuery] = useState('')
  const [appliedEventSearch, setAppliedEventSearch] = useState('')
  const [eventTypeFilter, setEventTypeFilter] = useState<EventType | null>(null)
  const [eventPriceFilter, setEventPriceFilter] = useState<boolean | null>(null)

  // build dads filters
  const dadsFilters: DiscoverDadsFilters = useMemo(
    () => ({
      interests: appliedInterests,
      children_age_ranges: appliedChildrenAges,
      provinces: appliedLocations,
      age_ranges: appliedDadAges,
    }),
    [appliedInterests, appliedChildrenAges, appliedLocations, appliedDadAges],
  )

  // build communities filters
  const communitiesFilters: DiscoverCommunitiesFilters = useMemo(
    () => ({ name: appliedCommunitySearch }),
    [appliedCommunitySearch],
  )

  // build events filters
  const eventsFilters: DiscoverEventsFilters = useMemo(
    () => ({
      name: appliedEventSearch,
      type: eventTypeFilter,
      is_free: eventPriceFilter,
    }),
    [appliedEventSearch, eventTypeFilter, eventPriceFilter],
  )

  // fetch discover profiles
  const {
    data: dadsData,
    isLoading: dadsLoading,
    isError: dadsError,
    fetchNextPage: fetchNextDads,
    hasNextPage: hasNextDads,
    isFetchingNextPage: isFetchingNextDads,
    refetch: refetchDads,
  } = useInfiniteQuery({
    queryKey: ['discover', 'profiles', dadsFilters],
    queryFn: ({ pageParam }) => fetchDiscoverProfiles(dadsFilters, pageParam),
    initialPageParam: undefined as DiscoverDadsCursor | undefined,
    getNextPageParam: (lastPage) => {
      if (lastPage.length < DISCOVER_PROFILES_PAGE_LIMIT) return undefined
      const lastItem = lastPage[lastPage.length - 1]
      return {
        cursor_id: lastItem.id,
        cursor_created_at: lastItem.created_at,
      }
    },
  })

  // fetch discover communities
  const {
    data: communitiesData,
    isLoading: communitiesLoading,
    isError: communitiesError,
    fetchNextPage: fetchNextCommunities,
    hasNextPage: hasNextCommunities,
    isFetchingNextPage: isFetchingNextCommunities,
    refetch: refetchCommunities,
  } = useInfiniteQuery({
    queryKey: ['discover', 'communities', communitiesFilters],
    queryFn: ({ pageParam }) =>
      fetchDiscoverCommunities(communitiesFilters, pageParam),
    initialPageParam: undefined as DiscoverCommunitiesCursor | undefined,
    getNextPageParam: (lastPage) => {
      if (lastPage.length < DISCOVER_COMMUNITIES_PAGE_LIMIT) return undefined
      const lastItem = lastPage[lastPage.length - 1]
      return {
        cursor_id: lastItem.id,
        cursor_created_at: lastItem.created_at,
      }
    },
  })

  // fetch discover events
  const {
    data: eventsData,
    isLoading: eventsLoading,
    isError: eventsError,
    fetchNextPage: fetchNextEvents,
    hasNextPage: hasNextEvents,
    isFetchingNextPage: isFetchingNextEvents,
    refetch: refetchEvents,
  } = useInfiniteQuery({
    queryKey: ['discover', 'events', eventsFilters],
    queryFn: ({ pageParam }) => fetchDiscoverEvents(eventsFilters, pageParam),
    initialPageParam: undefined as DiscoverEventsCursor | undefined,
    getNextPageParam: (lastPage) => {
      if (lastPage.length < DISCOVER_EVENTS_PAGE_LIMIT) return undefined
      const lastItem = lastPage[lastPage.length - 1]
      return {
        cursor_id: lastItem.id,
        cursor_created_at: lastItem.created_at,
      }
    },
  })

  // fetch interests
  const { data: interestOptions = [] } = useQuery({
    queryKey: ['interests'],
    queryFn: fetchInterests,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  const profiles = useMemo(() => dadsData?.pages.flat() ?? [], [dadsData])
  const communities = useMemo(
    () => communitiesData?.pages.flat() ?? [],
    [communitiesData],
  )
  const events = useMemo(() => eventsData?.pages.flat() ?? [], [eventsData])

  // infinite scroll sentinels
  const dadsSentinelRef = useRef<HTMLDivElement>(null)
  const communitiesSentinelRef = useRef<HTMLDivElement>(null)
  const eventsSentinelRef = useRef<HTMLDivElement>(null)

  // dads infinite scroll
  useEffect(() => {
    const sentinel = dadsSentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextDads && !isFetchingNextDads) {
          fetchNextDads()
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [hasNextDads, isFetchingNextDads, fetchNextDads])

  // communities infinite scroll
  useEffect(() => {
    const sentinel = communitiesSentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasNextCommunities &&
          !isFetchingNextCommunities
        ) {
          fetchNextCommunities()
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [hasNextCommunities, isFetchingNextCommunities, fetchNextCommunities])

  // events infinite scroll
  useEffect(() => {
    const sentinel = eventsSentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasNextEvents &&
          !isFetchingNextEvents
        ) {
          fetchNextEvents()
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [hasNextEvents, isFetchingNextEvents, fetchNextEvents])

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

  const applyDadsFilters = () => {
    setAppliedChildrenAges(pendingChildrenAges)
    setAppliedInterests(pendingInterests)
    setAppliedLocations(pendingLocations)
    setAppliedDadAges(pendingDadAges)
    setFiltersOpen(false)
  }

  const clearDadsFilters = () => {
    setPendingChildrenAges([])
    setPendingInterests([])
    setPendingLocations([])
    setPendingDadAges([])
    setAppliedChildrenAges([])
    setAppliedInterests([])
    setAppliedLocations([])
    setAppliedDadAges([])
  }

  const handleCommunitySearch = () => {
    setAppliedCommunitySearch(communitySearchQuery)
  }

  const handleEventSearch = () => {
    setAppliedEventSearch(eventSearchQuery)
  }

  const handleRefreshDads = () => {
    refetchDads()
  }

  const handleRefreshCommunities = () => {
    refetchCommunities()
  }

  const handleRefreshEvents = () => {
    refetchEvents()
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
                  onOpenChange={handleFiltersOpenChange}
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
                          {STAGE_OPTIONS.map((stage) => (
                            <Badge
                              key={stage.value}
                              variant={
                                pendingChildrenAges.includes(stage.value)
                                  ? 'default'
                                  : 'outline'
                              }
                              className="cursor-pointer rounded-full"
                              onClick={() =>
                                togglePendingChildrenAge(stage.value)
                              }
                            >
                              {stage.label}
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
                          {PROVINCE_OPTIONS.map((province) => (
                            <Badge
                              key={province.value}
                              variant={
                                pendingLocations.includes(province.value)
                                  ? 'default'
                                  : 'outline'
                              }
                              className="cursor-pointer rounded-full"
                              onClick={() =>
                                togglePendingLocation(province.value)
                              }
                            >
                              {province.label}
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
                          {DISCOVER_DADS_FILTERS_AGE_RANGES.map((range) => (
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
                          onClick={applyDadsFilters}
                        >
                          Apply Filters
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={clearDadsFilters}
                        >
                          Clear All
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              <div className="space-y-4">
                {dadsLoading ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                  </div>
                ) : dadsError ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      Failed to load profiles. Please try again.
                    </p>
                  </div>
                ) : profiles.length > 0 ? (
                  <>
                    {profiles.map((profile) => (
                      <DadCard
                        key={profile.id}
                        {...profile}
                      />
                    ))}
                    <div
                      ref={dadsSentinelRef}
                      className="h-4"
                    />
                    {isFetchingNextDads && (
                      <div className="flex justify-center py-4">
                        <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                      </div>
                    )}
                  </>
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
                  onClick={handleRefreshDads}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>
          )}

          {tab === 'communities' && (
            <div className="space-y-4 animate-fade-in">
              <form
                className="relative mb-4"
                onSubmit={(e) => {
                  e.preventDefault()
                  handleCommunitySearch()
                }}
              >
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search communities..."
                  value={communitySearchQuery}
                  onChange={(e) => setCommunitySearchQuery(e.target.value)}
                  className="pl-10 rounded-full"
                />
              </form>

              <div className="space-y-4">
                {communitiesLoading ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                  </div>
                ) : communitiesError ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      Failed to load communities. Please try again.
                    </p>
                  </div>
                ) : communities.length > 0 ? (
                  <>
                    {communities.map((community) => (
                      <CommunityCard
                        key={community.id}
                        {...community}
                      />
                    ))}
                    <div
                      ref={communitiesSentinelRef}
                      className="h-4"
                    />
                    {isFetchingNextCommunities && (
                      <div className="flex justify-center py-4">
                        <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      No communities found
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-4">
                <Button
                  variant="outline"
                  className="w-full rounded-full"
                  onClick={handleRefreshCommunities}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>
          )}

          {tab === 'events' && (
            <div className="space-y-4 animate-fade-in">
              <form
                className="relative mb-4"
                onSubmit={(e) => {
                  e.preventDefault()
                  handleEventSearch()
                }}
              >
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search events..."
                  value={eventSearchQuery}
                  onChange={(e) => setEventSearchQuery(e.target.value)}
                  className="pl-10 rounded-full"
                />
              </form>

              <div className="py-4">
                <Button
                  variant="outline"
                  className="w-full rounded-full font-semibold text-foreground bg-white"
                  style={{ borderColor: '#D8A24A' }}
                  onClick={() => {
                    // TODO: navigate to create event page
                  }}
                >
                  Host Your Own Event
                </Button>
              </div>

              <div className="flex gap-2 mb-4 flex-wrap">
                <Badge
                  variant={
                    eventTypeFilter === 'virtual' ? 'default' : 'outline'
                  }
                  className="cursor-pointer rounded-full"
                  onClick={() =>
                    setEventTypeFilter(
                      eventTypeFilter === 'virtual' ? null : 'virtual',
                    )
                  }
                >
                  Virtual
                </Badge>
                <Badge
                  variant={eventTypeFilter === 'local' ? 'default' : 'outline'}
                  className="cursor-pointer rounded-full"
                  onClick={() =>
                    setEventTypeFilter(
                      eventTypeFilter === 'local' ? null : 'local',
                    )
                  }
                >
                  Local
                </Badge>
                <Badge
                  variant={eventPriceFilter === true ? 'default' : 'outline'}
                  className="cursor-pointer rounded-full"
                  onClick={() =>
                    setEventPriceFilter(eventPriceFilter === true ? null : true)
                  }
                >
                  Free
                </Badge>
                <Badge
                  variant={eventPriceFilter === false ? 'default' : 'outline'}
                  className="cursor-pointer rounded-full"
                  onClick={() =>
                    setEventPriceFilter(
                      eventPriceFilter === false ? null : false,
                    )
                  }
                >
                  Paid
                </Badge>
              </div>

              <div className="space-y-4">
                {eventsLoading ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                  </div>
                ) : eventsError ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      Failed to load events. Please try again.
                    </p>
                  </div>
                ) : events.length > 0 ? (
                  <>
                    {events.map((event) => (
                      <EventCard
                        key={event.id}
                        {...event}
                      />
                    ))}
                    <div
                      ref={eventsSentinelRef}
                      className="h-4"
                    />
                    {isFetchingNextEvents && (
                      <div className="flex justify-center py-4">
                        <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      No events match your filters
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-4">
                <Button
                  variant="outline"
                  className="w-full rounded-full"
                  onClick={handleRefreshEvents}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}

export default Discover
