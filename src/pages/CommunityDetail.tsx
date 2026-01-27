import { useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import avatarDefaultGrey from '@/assets/avatar-default-grey.png'
import { communityChat, profileWithContext } from '@/lib/routes'

interface Community {
  title: string
  description: string
  memberCount: number
  nextEvent: string | null
}

interface Member {
  id: string
  name: string
  age: number
  stage: string
  bio: string
  avatarUrl: string
}

const communitiesData: Record<string, Community> = {}

const membersData: Record<string, Member[]> = {}

const CommunityDetail = () => {
  const navigate = useNavigate()
  const { communityId } = useParams<{ communityId: string }>()
  const [searchParams] = useSearchParams()
  const [isInterested, setIsInterested] = useState(false)
  const from = searchParams.get('from') || 'groups'

  const community = {
    title: 'Sample Community',
    description: 'This is a sample community description.',
    memberCount: 42,
    nextEvent: '2024-07-15T18:00:00Z',
  }
  const members = []

  const handleBack = () => {}

  const handleMemberClick = (memberId: string) => {
    navigate(profileWithContext(memberId, 'community', communityId))
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
            {community.title}
          </h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 space-y-6">
        <div className="space-y-3">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Members
          </h3>
          {members.map((member) => (
            <Card
              key={member.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleMemberClick(member.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <img
                    src={member.avatarUrl}
                    alt={member.name}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0 aspect-square"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground text-base">
                      {member.name}
                    </h4>
                    <Badge
                      variant="soft"
                      className="rounded-full text-xs mt-1"
                    >
                      {member.stage}
                    </Badge>
                    <p className="text-sm text-foreground mt-2 leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CommunityDetail
