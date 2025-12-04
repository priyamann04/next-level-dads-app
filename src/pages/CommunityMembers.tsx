import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, MessageCircle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import avatarDefaultGrey from '@/assets/avatar-default-grey.png'
import { communityChat, profileWithContext } from '@/lib/routes'

// Community data with members
const communitiesData: Record<string, {
  title: string
  type: string
  description: string
  members: Array<{
    id: string
    name: string
    age: number
    location: string
    bio: string
    childrenAges: string
    stages: string[]
    interests: string[]
    avatar: string
  }>
}> = {
  '1': {
    title: 'Saturday Coffee Dads',
    type: 'Public Group',
    description: 'Weekly Saturday morning meetups at local coffee shops. Share stories, swap advice, and build lasting friendships.',
    members: [
      {
        id: 'member-michael',
        name: 'Michael Thompson',
        age: 34,
        location: 'Toronto, ON',
        bio: 'Love getting outside with my boys and exploring new parks.',
        childrenAges: 'Dad of 2 kids, ages 3 and 6',
        stages: ['Toddler (2–3 years)', 'Elementary (6–12 years)'],
        interests: ['Outdoors', 'Fitness', 'Cooking'],
        avatar: avatarDefaultGrey,
      },
      {
        id: 'member-robert',
        name: 'Robert Chen',
        age: 39,
        location: 'Vancouver, BC',
        bio: 'Tech guy who loves cooking and weekend adventures.',
        childrenAges: 'Dad of 1 kid, age 8',
        stages: ['Elementary (6–12 years)'],
        interests: ['Tech', 'Cooking', 'Outdoors'],
        avatar: avatarDefaultGrey,
      },
      {
        id: 'member-anthony',
        name: 'Anthony Williams',
        age: 36,
        location: 'Toronto, ON',
        bio: 'Fitness enthusiast and amateur photographer.',
        childrenAges: 'Dad of 2 kids, ages 4 and 5',
        stages: ['Preschool (4–5 years)'],
        interests: ['Fitness', 'Photography', 'Art'],
        avatar: avatarDefaultGrey,
      },
    ],
  },
  '2': {
    title: 'Outdoor Adventure Dads',
    type: 'Public Group',
    description: 'For dads who love hiking, camping, and exploring nature with their kids.',
    members: [
      {
        id: 'member-james-outdoor',
        name: 'James Martinez',
        age: 32,
        location: 'Vancouver, BC',
        bio: 'Weekend warrior dad who loves trail running.',
        childrenAges: 'Dad of 1 kid, age 3',
        stages: ['Toddler (2–3 years)'],
        interests: ['Outdoors', 'Fitness', 'Sports'],
        avatar: avatarDefaultGrey,
      },
    ],
  },
  '3': {
    title: 'Tech & Gaming Dads',
    type: 'Public Group',
    description: 'Connect over technology, gaming, and teaching kids to code.',
    members: [
      {
        id: 'member-david-tech',
        name: 'David Chen',
        age: 38,
        location: 'Toronto, ON',
        bio: 'Tech enthusiast and soccer coach.',
        childrenAges: 'Dad of 2 kids, ages 8 and 10',
        stages: ['Elementary (6–12 years)'],
        interests: ['Tech', 'Sports', 'Gaming'],
        avatar: avatarDefaultGrey,
      },
    ],
  },
  '4': {
    title: 'New Dads Support',
    type: 'Public Group',
    description: 'Just starting your fatherhood journey? Connect with other new dads.',
    members: [
      {
        id: 'member-alex',
        name: 'Alex Johnson',
        age: 29,
        location: 'Toronto, ON',
        bio: 'New dad navigating parenthood.',
        childrenAges: 'Dad of 1 kid, age 6 months',
        stages: ['Newborn (0–1 year)'],
        interests: ['Reading', 'Tech', 'Music'],
        avatar: avatarDefaultGrey,
      },
    ],
  },
  '5': {
    title: 'Sports & Fitness Dads',
    type: 'Public Group',
    description: 'Stay active together! Organize pickup games and workout sessions.',
    members: [
      {
        id: 'member-chris',
        name: 'Chris Williams',
        age: 35,
        location: 'Toronto, ON',
        bio: 'Coach and fitness enthusiast.',
        childrenAges: 'Dad of 2 kids, ages 7 and 9',
        stages: ['Elementary (6–12 years)'],
        interests: ['Sports', 'Fitness', 'Outdoors'],
        avatar: avatarDefaultGrey,
      },
    ],
  },
  '6': {
    title: 'Creative Dads',
    type: 'Public Group',
    description: 'For fathers who love art, music, photography, and creative pursuits.',
    members: [
      {
        id: 'member-daniel',
        name: 'Daniel Kim',
        age: 42,
        location: 'Toronto, ON',
        bio: 'Photographer and musician.',
        childrenAges: 'Dad of 1 kid, age 15',
        stages: ['Teen (13–17 years)'],
        interests: ['Photography', 'Music', 'Art'],
        avatar: avatarDefaultGrey,
      },
    ],
  },
}

const CommunityMembers = () => {
  const navigate = useNavigate()
  const { communityId } = useParams<{ communityId: string }>()
  const { toast } = useToast()

  const community = communitiesData[communityId || '1'] || communitiesData['1']

  const handleConnect = (memberId: string, name: string) => {
    toast({
      title: 'Connection request sent!',
      description: `Your request to connect with ${name} has been sent.`,
    })
  }

  const handleMemberClick = (memberId: string) => {
    navigate(profileWithContext(memberId, 'community', communityId))
  }

  const handleBack = () => {
    if (communityId) {
      navigate(communityChat(communityId))
    }
  }

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
            <Badge variant="soft" className="rounded-full mb-3">
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
                    <AvatarImage src={member.avatar} alt={member.name} />
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
