import { useRef, useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { ArrowLeft, Users, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import BottomNav from '@/components/BottomNav'
import logo from '@/assets/logo.png'
import { profileDetail } from '@/lib/routes'
import { getStageDisplayLabel } from '@/utils/users'
import axiosPrivate from '@/api/axiosPrivate'
import { TIMEOUT_LENGTH_MS, PROFILES_PAGE_LIMIT } from '@/config/constants'
import type {
  Community,
  CommunityMemberResponse,
  CommunityMembersCursor,
} from '@/types/communities'

async function fetchCommunity(id: string): Promise<Community> {
  const res = await axiosPrivate.get<Community>(`/api/communities/${id}`, {
    timeout: TIMEOUT_LENGTH_MS,
  })
  return res.data
}

async function fetchCommunityMembers(
  communityId: string,
  cursor?: CommunityMembersCursor,
): Promise<CommunityMemberResponse[]> {
  const params = new URLSearchParams()
  if (cursor) {
    params.append('cursor_id', cursor.cursor_id)
    params.append('cursor_joined_at', cursor.cursor_joined_at)
  }
  const res = await axiosPrivate.get<CommunityMemberResponse[]>(
    `/api/communities/${communityId}/members`,
    {
      params,
      timeout: TIMEOUT_LENGTH_MS,
    },
  )
  return res.data
}

const CommunityDetail = () => {
  const navigate = useNavigate()
  const { communityId } = useParams<{ communityId: string }>()

  const {
    data: community,
    isLoading: communityLoading,
    isError: communityError,
  } = useQuery({
    queryKey: ['community', communityId],
    queryFn: () => fetchCommunity(communityId!),
    enabled: !!communityId,
  })

  const {
    data: membersData,
    isLoading: membersLoading,
    isError: membersError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['community', communityId, 'members'],
    queryFn: ({ pageParam }) => fetchCommunityMembers(communityId!, pageParam),
    initialPageParam: undefined as CommunityMembersCursor | undefined,
    getNextPageParam: (lastPage) => {
      if (lastPage.length < PROFILES_PAGE_LIMIT) return undefined
      const lastItem = lastPage[lastPage.length - 1]
      return {
        cursor_id: lastItem.id,
        cursor_joined_at: lastItem.joined_at,
      }
    },
    enabled: !!communityId,
  })

  const members = useMemo(
    () => membersData?.pages.flat() ?? [],
    [membersData],
  )

  const membersSentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sentinel = membersSentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  const handleBack = () => {
    navigate(-1)
  }

  const handleMemberClick = (memberId: string) => {
    navigate(profileDetail(memberId))
  }

  // Action handlers (stubs for now)
  const handleJoin = () => {
    // TODO: POST /api/communities/:id/join
  }

  const handleLeave = () => {
    // TODO: DELETE /api/communities/:id/leave
  }

  const handleManage = () => {
    // TODO: navigate to community management
  }

  const renderButtons = () => {
    if (!community) return null

    if (community.is_member) {
      if (community.role === 'admin') {
        return (
          <div className="flex gap-2">
            <Button
              className="flex-1 rounded-full"
              variant="outline"
              onClick={handleManage}
            >
              Manage
            </Button>
            <Button
              className="flex-1 rounded-full"
              variant="outline"
              onClick={handleLeave}
            >
              Leave
            </Button>
          </div>
        )
      }

      return (
        <Button
          className="w-full rounded-full"
          variant="outline"
          onClick={handleLeave}
        >
          Leave Community
        </Button>
      )
    }

    return (
      <Button
        className="w-full rounded-full"
        variant="outline"
        onClick={handleJoin}
      >
        Join Community
      </Button>
    )
  }

  if (communityLoading) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="bg-card border-b border-border sticky top-0 z-10">
          <div className="max-w-md mx-auto px-6 py-4 flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-heading font-semibold text-foreground">
              Community
            </h1>
          </div>
        </div>
        <div className="flex justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
        <BottomNav />
      </div>
    )
  }

  if (communityError || !community) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="bg-card border-b border-border sticky top-0 z-10">
          <div className="max-w-md mx-auto px-6 py-4 flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-heading font-semibold text-foreground">
              Community
            </h1>
          </div>
        </div>
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Failed to load community. Please try again.
          </p>
        </div>
        <BottomNav />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-md mx-auto px-6 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-heading font-semibold text-foreground">
            {community.name}
          </h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 space-y-6">
        {/* Community info */}
        <div className="space-y-4">
          {community.description && (
            <p className="text-muted-foreground leading-relaxed">
              {community.description}
            </p>
          )}

          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{community.member_count} members</span>
          </div>

          {community.role && (
            <Badge variant="soft" className="rounded-full">
              {community.role}
            </Badge>
          )}

          {renderButtons()}
        </div>

        {/* Members list */}
        <div className="space-y-3">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Members
          </h3>

          {membersLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
            </div>
          ) : membersError ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Failed to load members. Please try again.
              </p>
            </div>
          ) : members.length > 0 ? (
            <>
              {members.map((member) => {
                const initials = member.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()

                return (
                  <Card
                    key={member.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleMemberClick(member.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        {member.avatar_url ? (
                          <img
                            src={member.avatar_url}
                            alt={member.name}
                            className="w-16 h-16 rounded-lg object-cover flex-shrink-0 aspect-square"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-semibold flex-shrink-0 aspect-square">
                            {initials}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-foreground text-base">
                              {member.name}
                            </h4>
                            {member.role === 'admin' && (
                              <Badge variant="soft" className="text-xs">
                                admin
                              </Badge>
                            )}
                          </div>
                          {member.children.length > 0 && (
                            <Badge
                              variant="soft"
                              className="rounded-full text-xs mt-1"
                            >
                              {getStageDisplayLabel(member.children[0])}
                            </Badge>
                          )}
                          <p className="text-sm text-foreground mt-2 leading-relaxed line-clamp-2">
                            {member.about}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
              <div ref={membersSentinelRef} className="h-4" />
              {isFetchingNextPage && (
                <div className="flex justify-center py-4">
                  <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No members yet</p>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}

export default CommunityDetail
