import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '@/components/BottomNav'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import logo from '@/assets/logo.png'
import ConnectionRequestCard from '@/components/ConnectionRequestCard'
import avatarDefaultGrey from '@/assets/avatar-default-grey.png'
import { toast } from 'sonner'
import { ROUTES, profileDetail } from '@/lib/routes'

interface ConnectionRequest {
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

const initialRequests: ConnectionRequest[] = []

const Requests = () => {
  const navigate = useNavigate()
  const [requests, setRequests] = useState(initialRequests)

  const handleAccept = (id: string, name: string) => {}

  const handleIgnore = (id: string, name: string) => {}

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
              Connection Requests
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 space-y-4 animate-fade-in">
        {requests.length > 0 ? (
          requests.map((request) => (
            <ConnectionRequestCard
              key={request.id}
              {...request}
              onAccept={() => handleAccept(request.id, request.name)}
              onIgnore={() => handleIgnore(request.id, request.name)}
              onClick={() => navigate(profileDetail(request.id))}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No pending requests</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  )
}

export default Requests
