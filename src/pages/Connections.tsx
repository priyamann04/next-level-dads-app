import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '@/components/BottomNav'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import logo from '@/assets/logo.png'
import DadCard from '@/components/DadCard'
import { ROUTES } from '@/lib/routes'
import { Profile } from '@/types/users'

const initialConnections: Profile[] = []

const Connections = () => {
  const navigate = useNavigate()
  const [connections, setConnections] = useState(initialConnections)

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
              {...connection}
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
