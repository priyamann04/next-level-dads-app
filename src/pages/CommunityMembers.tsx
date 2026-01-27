import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, MessageCircle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import avatarDefaultGrey from '@/assets/avatar-default-grey.png'
import { communityChat, profileWithContext } from '@/lib/routes'

interface Community {
  title: string
  type: string
  description: string
  members: CommunityMember[]
}

interface CommunityMember {
  id: string
  name: string
  age: number
  location: string
  bio: string
  childrenAges: string
  stages: string[]
  interests: string[]
  avatar: string
}

// Community data with members
const communitiesData: Record<string, Community> = {}

const CommunityMembers = () => {
  const navigate = useNavigate()
  const { communityId } = useParams<{ communityId: string }>()
  const { toast } = useToast()

  const community = communitiesData[communityId || '1'] || communitiesData['1']

  const handleConnect = (memberId: string, name: string) => {}

  const handleMemberClick = (memberId: string) => {}

  const handleBack = () => {}

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-card border-b border-border">
        <div className="max-w-md mx-auto px-6 py-4">
          <button
            onClick={handleBack}
            className="text-muted-foreground mb-4"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="mb-4">
            <h1 className="text-2xl font-heading font-semibold text-foreground mb-2">
              {community.title}
            </h1>
            <Badge
              variant="soft"
              className="rounded-full mb-3"
            >
              {community.type}
            </Badge>
            <p className="text-muted-foreground">{community.description}</p>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6">
        <h2 className="text-lg font-heading font-semibold text-foreground mb-4">
          Members ({community.members.length})
        </h2>
        <div className="space-y-3">
          {community.members.map((member) => (
            <Card
              key={member.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleMemberClick(member.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4 mb-3">
                  <Avatar className="w-12 h-12 shrink-0">
                    <AvatarImage
                      src={member.avatar}
                      alt={member.name}
                    />
                    <AvatarFallback>{member.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground">
                      {member.name}, {member.age}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {member.childrenAges}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">
                      {member.bio}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-full shrink-0"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleConnect(member.id, member.name)
                    }}
                  >
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-1">
                      Children's Age:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {member.stages.map((stage) => (
                        <Badge
                          key={stage}
                          variant="soft"
                          className="rounded-full text-xs"
                        >
                          {stage}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-1">
                      Interests:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {member.interests.map((interest) => (
                        <Badge
                          key={interest}
                          variant="soft"
                          className="rounded-full text-xs"
                        >
                          {interest}
                        </Badge>
                      ))}
                    </div>
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

export default CommunityMembers
