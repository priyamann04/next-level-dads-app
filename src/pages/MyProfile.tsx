import { useNavigate } from 'react-router-dom'
import BottomNav from '@/components/BottomNav'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Edit, MapPin, Calendar, LogOut, Share2 } from 'lucide-react'
import avatarDefaultGrey from '@/assets/avatar-default-grey.png'
import logo from '@/assets/logo.png'
import { ROUTES } from '@/lib/routes'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/contexts/AuthContext'
import axiosPrivate from '@/api/axiosPrivate'
import { TIMEOUT_LENGTH_MS } from '@/config/constants'
import { useState } from 'react'

interface UserProfile {
  id: string
  name: string
  age: number
  city: string
  province: string
  bio: string
  stages: string[]
  interests: string[]
  avatar: string
  stats: {
    connections: number
    communities: number
    events: number
  }
}

const MyProfile = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { setAuth } = useAuth()
  const [loading, setLoading] = useState(false)

  const handleShareProfile = async () => {}

  const handleLogout = async () => {
    try {
      setLoading(true)
      await axiosPrivate.post(
        '/api/auth/logout',
        {},
        {
          timeout: TIMEOUT_LENGTH_MS,
        },
      )
    } catch (err: any) {
    } finally {
      setAuth({ user: null, accessToken: null })
      setLoading(false)
      navigate(ROUTES.WELCOME)
    }
  }

  const userProfile: UserProfile = {
    id: '0',
    name: 'John Doe',
    age: 35,
    city: 'Toronto',
    province: 'ON',
    bio: 'I am a dedicated father who loves spending time with my kids and connecting with other dads.',
    stages: ['Newborn', 'Toddler'],
    interests: ['Parenting', 'Outdoors', 'Cooking'],
    avatar: avatarDefaultGrey,
    stats: {
      connections: 120,
      communities: 5,
      events: 12,
    },
  }

  const pendingRequestsCount = 3

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-card border-b border-border px-6 py-5 relative">
        <img
          src={logo}
          alt="Next Level Dads"
          className="h-10 absolute top-4 left-3"
        />

        <div className="flex items-center justify-center h-full">
          <h1 className="text-2xl font-heading font-semibold text-foreground">
            Profile
          </h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-8 space-y-6 animate-fade-in">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-32 h-32 rounded-lg overflow-hidden border-4 border-primary/20">
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h2 className="text-2xl font-heading font-semibold text-foreground">
              {userProfile.name}, {userProfile.age}
            </h2>
            <div className="flex items-center justify-center gap-1 text-muted-foreground mt-1">
              <MapPin className="w-4 h-4" />
              <span>
                {userProfile.city}, {userProfile.province}
              </span>
            </div>
          </div>

          <div className="flex gap-3 w-full max-w-sm">
            <Button
              variant="outline"
              className="flex-1 rounded-full border-2 border-primary hover:bg-primary hover:text-primary-foreground"
              onClick={() => navigate(ROUTES.CONNECTIONS)}
            >
              Connections
            </Button>
            <Button
              variant="outline"
              className="flex-1 rounded-full border-2 border-primary hover:bg-primary hover:text-primary-foreground relative"
              onClick={() => navigate(ROUTES.REQUESTS)}
            >
              Requests
              {pendingRequestsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                  {pendingRequestsCount}
                </span>
              )}
            </Button>
          </div>
        </div>

        <div className="bg-card rounded-lg p-6 shadow-md">
          <h3 className="font-semibold text-foreground mb-4">My Activity</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-heading font-semibold text-primary">
                {userProfile.stats.connections}
              </p>
              <p className="text-sm text-muted-foreground">Connections</p>
            </div>
            <div>
              <p className="text-2xl font-heading font-semibold text-primary">
                {userProfile.stats.communities}
              </p>
              <p className="text-sm text-muted-foreground">Communities</p>
            </div>
            <div>
              <p className="text-2xl font-heading font-semibold text-primary">
                {userProfile.stats.events}
              </p>
              <p className="text-sm text-muted-foreground">Events</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg p-6 space-y-4 shadow-md">
          <div>
            <h3 className="font-semibold text-foreground mb-2">About Me</h3>
            <p className="text-muted-foreground leading-relaxed">
              {userProfile.bio}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-2">
              Children's Age
            </h3>
            <div className="flex flex-wrap gap-2">
              {userProfile.stages.map((stage) => (
                <Badge
                  key={stage}
                  variant="soft"
                  className="rounded-full"
                >
                  <Calendar className="w-3 h-3 mr-1" />
                  {stage}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {userProfile.interests.map((interest) => (
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

        <Button
          variant="outline"
          className="w-full rounded-full border-2 border-primary hover:bg-primary hover:text-primary-foreground"
          onClick={() => navigate(ROUTES.EDIT_PROFILE)}
          disabled={loading}
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>

        <Button
          variant="outline"
          className="w-full rounded-full border-2 border-primary hover:bg-primary hover:text-primary-foreground"
          onClick={handleShareProfile}
          disabled={loading}
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share Profile
        </Button>

        <Button
          variant="outline"
          className="w-full rounded-full border-2 border-destructive text-destructive hover:bg-primary hover:text-primary-foreground hover:border-primary"
          onClick={handleLogout}
          disabled={loading}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Log Out
        </Button>
      </div>

      <BottomNav />
    </div>
  )
}

export default MyProfile
