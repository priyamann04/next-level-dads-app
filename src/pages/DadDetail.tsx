import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import BottomNav from '@/components/BottomNav'
import { useToast } from '@/hooks/use-toast'
import { ROUTES } from '@/lib/routes'
import avatarDefaultGrey from '@/assets/avatar-default-grey.png'
import logo from '@/assets/logo.png'

interface Dad {
  id: string
  name: string
  age: number
  city: string
  province: string
  stage: string
  bio: string
  interests: string[]
  avatarUrl: string
}

// Shared dad data - in a real app this would come from a data store/API
const dadsData: Record<string, Dad> = {}

const DadDetail = () => {
  const { dadId } = useParams<{ dadId: string }>()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [isRequested, setIsRequested] = useState(false)

  const dad = dadId ? dadsData[dadId] : null

  if (!dad) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="relative bg-card border-b border-border px-6 py-5 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(ROUTES.DISCOVER_DADS)}
            className="absolute left-3"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1 text-center">
            <h1 className="text-2xl font-heading font-semibold text-foreground">
              Not Found
            </h1>
          </div>
        </div>
        <div className="max-w-md mx-auto px-6 py-12 text-center">
          <p className="text-muted-foreground">Dad profile not found.</p>
          <Button
            variant="outline"
            className="mt-4 rounded-full"
            onClick={() => navigate(ROUTES.DISCOVER_DADS)}
          >
            Back to Discover
          </Button>
        </div>
        <BottomNav />
      </div>
    )
  }

  const initials = dad.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  const handleConnect = () => {}

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header with back button - matching Profile.tsx style */}
      <div className="bg-card border-b border-border px-6 py-5 relative">
        {/* Logo top-left */}
        <img
          src={logo}
          alt="Next Level Dads"
          className="h-10 absolute top-4 left-3"
        />

        {/* Centered header text with back button */}
        <div className="flex items-center justify-center h-full">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(ROUTES.DISCOVER_DADS)}
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
              {dad.avatarUrl ? (
                <img
                  src={dad.avatarUrl}
                  alt={dad.name}
                  className="w-24 h-24 rounded-lg object-cover flex-shrink-0 aspect-square"
                />
              ) : (
                <div className="w-24 h-24 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-semibold text-xl flex-shrink-0 aspect-square">
                  {initials}
                </div>
              )}

              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-heading font-semibold text-foreground">
                  {dad.name}, {dad.age}
                </h2>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                  <MapPin className="w-4 h-4" />
                  <span>
                    {dad.city}, {dad.province}
                  </span>
                </div>
                <Badge
                  variant="soft"
                  className="rounded-full mt-2"
                >
                  {dad.stage}
                </Badge>
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-foreground">About</h3>
              <p className="text-foreground text-sm leading-relaxed">
                {dad.bio}
              </p>
            </div>

            {/* Interests */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-foreground">
                Interests
              </h3>
              <div className="flex flex-wrap gap-2">
                {dad.interests.map((interest) => (
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

export default DadDetail
