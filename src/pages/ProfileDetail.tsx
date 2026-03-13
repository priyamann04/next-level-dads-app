import { useState } from 'react'
import { useNavigate, useParams, useSearchParams, useLocation } from 'react-router-dom'
import BottomNav from '@/components/BottomNav'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { MapPin, Calendar, ArrowLeft } from 'lucide-react'
import avatarDefaultGrey from '@/assets/avatar-default-grey.png'
import logo from '@/assets/logo.png'
import { communityDetail, ROUTES } from '@/lib/routes'
import { getStageDisplayLabel } from '@/utils/users'

interface Profile {
  id: string
  name: string
  age: number
  city: string
  province: string
  bio: string
  stages: string[]
  interests: string[]
  avatar: string
}

// Profile data (empty for pure UI shell)
const profilesData: Record<string, Profile> = {}

const ProfileDetail = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams<{ id: string }>()
  const [searchParams] = useSearchParams()
  const [isRequested, setIsRequested] = useState(false)

  const from = searchParams.get('from')
  const communityId = searchParams.get('communityId')

  // Derive context from route path
  const isFromDiscover = location.pathname.startsWith('/discover/dads')

  // Get profile data or use placeholder
  const profileId = id || ''
  const profile: Profile = profilesData[profileId] || {
    id: profileId,
    name: 'Sample User',
    age: 30,
    city: 'Toronto',
    province: 'ON',
    bio: 'This is a sample bio for the user profile.',
    stages: ['Toddler'],
    interests: ['Parenting', 'Sports'],
    avatar: avatarDefaultGrey,
  }

  const initials = profile.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  const handleBack = () => {
    if (isFromDiscover) {
      navigate(ROUTES.DISCOVER_DADS)
    } else if (from === 'community' && communityId) {
      navigate(communityDetail(communityId))
    } else {
      navigate(-1)
    }
  }

  const handleConnect = () => {
    setIsRequested(!isRequested)
  }

  // Discover context: Card-based layout with Connect button (DadDetail style)
  if (isFromDiscover) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="bg-card border-b border-border px-6 py-5 relative">
          <img
            src={logo}
            alt="Next Level Dads"
            className="h-10 absolute top-4 left-3"
          />

          <div className="flex items-center justify-center h-full">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBack}
                className="rounded-full"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-2xl font-heading font-semibold text-foreground">
                Profile
              </h1>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto px-6 py-6">
          <Card className="overflow-hidden shadow-md">
            <CardContent className="p-6 space-y-4">
              {/* Avatar and basic info */}
              <div className="flex items-start gap-4">
                {profile.avatar ? (
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-24 h-24 rounded-lg object-cover flex-shrink-0 aspect-square"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-semibold text-xl flex-shrink-0 aspect-square">
                    {initials}
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-heading font-semibold text-foreground">
                    {profile.name}, {profile.age}
                  </h2>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                    <MapPin className="w-4 h-4" />
                    <span>
                      {profile.city}, {profile.province}
                    </span>
                  </div>
                  {profile.stages.length > 0 && (
                    <Badge
                      variant="soft"
                      className="rounded-full mt-2"
                    >
                      {getStageDisplayLabel(profile.stages[0])}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-foreground">About</h3>
                <p className="text-foreground text-sm leading-relaxed">
                  {profile.bio}
                </p>
              </div>

              {/* Interests */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-foreground">
                  Interests
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map((interest) => (
                    <Badge
                      key={interest}
                      variant="outline"
                      className="rounded-full"
                      style={{ borderColor: '#D8A24A', color: '#D8A24A' }}
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Connect button */}
              <Button
                className="w-full rounded-full font-semibold mt-4"
                style={{ backgroundColor: isRequested ? '#9ca3af' : '#D8A24A' }}
                onClick={handleConnect}
              >
                {isRequested ? 'Requested ✓' : 'Connect'}
              </Button>
            </CardContent>
          </Card>
        </div>

        <BottomNav />
      </div>
    )
  }

  // Default context: Full-width layout without Connect button (ProfileDetail style)
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-card border-b border-border px-6 py-5 relative">
        <img
          src={logo}
          alt="Next Level Dads"
          className="h-10 absolute top-4 left-3"
        />

        <div className="flex items-center justify-center h-full">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-heading font-semibold text-foreground">
              Profile
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-8 space-y-6 animate-fade-in">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-32 h-32 rounded-lg overflow-hidden border-4 border-primary/20">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h2 className="text-2xl font-heading font-semibold text-foreground">
              {profile.name}, {profile.age}
            </h2>
            <div className="flex items-center justify-center gap-1 text-muted-foreground mt-1">
              <MapPin className="w-4 h-4" />
              <span>
                {profile.city}, {profile.province}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg p-6 space-y-4 shadow-md">
          <div>
            <h3 className="font-semibold text-foreground mb-2">About Me</h3>
            <p className="text-muted-foreground leading-relaxed">
              {profile.bio}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-2">
              Children's Age
            </h3>
            <div className="flex flex-wrap gap-2">
              {profile.stages.map((stage) => (
                <Badge
                  key={stage}
                  variant="soft"
                  className="rounded-full"
                >
                  <Calendar className="w-3 h-3 mr-1" />
                  {getStageDisplayLabel(stage)}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((interest) => (
                <Badge
                  key={interest}
                  variant="soft"
                  className="rounded-full"
                >
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}

export default ProfileDetail
