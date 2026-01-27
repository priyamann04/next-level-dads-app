import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '@/components/BottomNav'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import logo from '@/assets/logo.png'
import DadCard from '@/components/DadCard'
import avatarDefaultGrey from '@/assets/avatar-default-grey.png'
import { ROUTES, profileDetail } from '@/lib/routes'

interface Connection {
  id: string
  name: string
  age: number
  city: string
  province: string
  childAgeRange: string
  bio: string
  interests: string[]
  avatarUrl: string
}

const initialConnections: Connection[] = []

const Connections = () => {
  const navigate = useNavigate()
  const [connections, setConnections] = useState(initialConnections)

  const handleChat = (id: string) => {}

  const handleUnconnect = (id: string, name: string) => {}

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-card border-b border-border">
        <div className="max-w-md mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <img
              src={logo}
              alt="Next Level Dads"
              className="h-8"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(ROUTES.PROFILE)}
              className="rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-heading font-semibold text-foreground">
              Connections
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 space-y-4 animate-fade-in">
        {connections.length > 0 ? (
          connections.map((connection) => (
            <DadCard
              key={connection.id}
              id={connection.id}
              name={connection.name}
              age={connection.age}
              city={connection.city}
              province={connection.province}
              childAgeRange={connection.childAgeRange}
              bio={connection.bio}
              interests={connection.interests}
              avatarUrl={connection.avatarUrl}
              variant="connection"
              onPrimaryAction={() => handleChat(connection.id)}
              onSecondaryAction={() => handleUnconnect(connection.id, connection.name)}
              onClick={() => navigate(profileDetail(connection.id))}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No connections yet</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  )
}

export default Connections
