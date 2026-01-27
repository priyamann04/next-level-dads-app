import { useState } from 'react'
import ProfileCard from '@/components/ProfileCard'
import BottomNav from '@/components/BottomNav'
import { useToast } from '@/hooks/use-toast'
import avatarLight1 from '@/assets/avatar-light-1.png'
import avatarMedium1 from '@/assets/avatar-medium-1.png'
import avatarDark1 from '@/assets/avatar-dark-1.png'
import avatarMedium2 from '@/assets/avatar-medium-2.png'
import logo from '@/assets/logo.png'

interface Profile {
  id: string
  name: string
  age: number
  location: string
  bio: string
  stage: string
  interests: string[]
  imageUrl: string
}

// Mock data
const profiles = []

const Match = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { toast } = useToast()

  const handleSkip = () => {
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      toast({
        title: "That's everyone for now!",
        description: 'Check back soon for more connections.',
      })
    }
  }

  const handleConnect = () => {
    toast({
      title: 'Connection sent! 🎉',
      description: `Your connection request was sent to ${profiles[currentIndex].name}.`,
    })

    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  if (currentIndex >= profiles.length) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pb-20 px-6">
        <div className="text-center space-y-4 animate-fade-in">
          <h2 className="text-2xl font-heading font-semibold text-foreground">
            You're all caught up!
          </h2>
          <p className="text-muted-foreground">
            Check back soon for more potential connections.
          </p>
        </div>
        <BottomNav />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-card border-b border-border">
        <div className="max-w-md mx-auto px-6 py-6 flex items-center gap-4">
          <img
            src={logo}
            alt="Next Level Dads"
            className="h-8"
          />
          <div>
            <h1 className="text-2xl font-heading font-semibold text-foreground">
              Discover Connections
            </h1>
            <p className="text-muted-foreground text-sm">
              Find fathers with shared interests
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-8">
        <ProfileCard
          {...profiles[currentIndex]}
          onSkip={handleSkip}
          onConnect={handleConnect}
        />
      </div>
      <BottomNav />
    </div>
  )
}

export default Match
