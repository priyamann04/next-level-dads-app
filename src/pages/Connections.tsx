import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '@/components/BottomNav'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, MapPin } from 'lucide-react'
import logo from '@/assets/logo.png'
import avatarDefaultGrey from '@/assets/avatar-default-grey.png'
import { toast } from 'sonner'
import { ROUTES, chatDetail, profileDetail } from '@/lib/routes'

const initialConnections = []

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
          connections.map((connection) => {
            const initials = connection.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()

            return (
              <Card
                key={connection.id}
                className="overflow-hidden shadow-md cursor-pointer"
                onClick={() => navigate(profileDetail(connection.id))}
              >
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    {connection.avatarUrl ? (
                      <img
                        src={connection.avatarUrl}
                        alt={connection.name}
                        className="w-20 h-20 rounded-lg object-cover flex-shrink-0 aspect-square"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-semibold text-lg flex-shrink-0 aspect-square">
                        {initials}
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-heading font-semibold text-foreground">
                        {connection.name}, {connection.age}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                        <MapPin className="w-3 h-3" />
                        <span>
                          {connection.city}, {connection.province}
                        </span>
                      </div>
                      <Badge
                        variant="soft"
                        className="rounded-full mt-1.5 text-xs"
                      >
                        {connection.childAgeRange}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-foreground text-sm leading-relaxed">
                    {connection.bio}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {connection.interests.map((interest) => (
                      <Badge
                        key={interest}
                        variant="outline"
                        className="rounded-full text-xs"
                        style={{ borderColor: '#D8A24A', color: '#D8A24A' }}
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      className="flex-1 rounded-full font-semibold"
                      style={{ backgroundColor: '#D8A24A' }}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleChat(connection.id)
                      }}
                    >
                      Chat
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 rounded-full font-semibold border-2"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleUnconnect(connection.id, connection.name)
                      }}
                    >
                      Unconnect
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })
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
