import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import BottomNav from '@/components/BottomNav'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Edit, MapPin, Calendar, LogOut, Share2 } from 'lucide-react'
import avatarDefaultGrey from '@/assets/avatar-default-grey.png'
import logo from '@/assets/logo.png'
import { ROUTES } from '@/lib/routes'
import { useAuth } from '@/contexts/AuthContext'
import axiosPrivate from '@/api/axiosPrivate'
import { TIMEOUT_LENGTH_MS } from '@/config/constants'
import { ConnectionCounts } from '@/types/users'
import { getStageDisplayLabel } from '@/utils/users'

async function fetchConnectionCounts(): Promise<ConnectionCounts> {
  const res = await axiosPrivate.get<ConnectionCounts>('/api/connections/count', {
    timeout: TIMEOUT_LENGTH_MS,
  })
  return res.data
}

const MyProfile = () => {
  const navigate = useNavigate()
  const { user, setAuth } = useAuth()
  const [loading, setLoading] = useState(false)

  const { data: connectionCounts } = useQuery({
    queryKey: ['connections', 'counts'],
    queryFn: fetchConnectionCounts,
  })

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

  // Dummy stats for communities and events (API not available yet)
  const dummyStats = {
    communities: 5,
    events: 12,
  }

  if (!user) {
    return null
  }

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
              src={user.avatarUrl || avatarDefaultGrey}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h2 className="text-2xl font-heading font-semibold text-foreground">
              {user.name}, {user.age}
            </h2>
            <div className="flex items-center justify-center gap-1 text-muted-foreground mt-1">
              <MapPin className="w-4 h-4" />
              <span>
                {user.city}, {user.province}
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
              {connectionCounts && connectionCounts.connections > 0 && (
                <span className="ml-1">({connectionCounts.connections})</span>
              )}
            </Button>
            <Button
              variant="outline"
              className="flex-1 rounded-full border-2 border-primary hover:bg-primary hover:text-primary-foreground relative"
              onClick={() => navigate(ROUTES.REQUESTS)}
            >
              Requests
              {connectionCounts && connectionCounts.requests > 0 && (
                <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                  {connectionCounts.requests}
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
                {connectionCounts?.connections ?? 0}
              </p>
              <p className="text-sm text-muted-foreground">Connections</p>
            </div>
            <div>
              <p className="text-2xl font-heading font-semibold text-primary">
                {dummyStats.communities}
              </p>
              <p className="text-sm text-muted-foreground">Communities</p>
            </div>
            <div>
              <p className="text-2xl font-heading font-semibold text-primary">
                {dummyStats.events}
              </p>
              <p className="text-sm text-muted-foreground">Events</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg p-6 space-y-4 shadow-md">
          <div>
            <h3 className="font-semibold text-foreground mb-2">About Me</h3>
            <p className="text-muted-foreground leading-relaxed">
              {user.about}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-2">
              Children's Age
            </h3>
            <div className="flex flex-wrap gap-2">
              {user.children_age_ranges.map((stage) => (
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
              {user.interests.map((interest) => (
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
