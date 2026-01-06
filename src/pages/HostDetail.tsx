import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Mail, Phone, Users } from 'lucide-react'
import { getHostById } from '@/data/hosts'
import logo from '@/assets/logo.png'
import BottomNav from '@/components/BottomNav'
import { ROUTES } from '@/lib/routes'

const HostDetail = () => {
  const { hostId } = useParams<{ hostId: string }>()
  const navigate = useNavigate()

  const host = hostId ? getHostById(hostId) : undefined

  const handleBack = () => {
    navigate(-1)
  }

  if (!host) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="relative bg-card border-b border-border px-6 py-5 flex items-center justify-center">
          <img
            src={logo}
            alt="Next Level Dads"
            className="h-10 absolute top-4 left-3"
          />
          <h1 className="text-2xl font-heading font-semibold text-foreground">
            Host Not Found
          </h1>
        </div>
        <div className="max-w-md mx-auto px-6 py-6 text-center">
          <p className="text-muted-foreground mb-4">This host could not be found.</p>
          <Button onClick={handleBack} variant="outline" className="rounded-full">
            Go Back
          </Button>
        </div>
        <BottomNav />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="relative bg-card border-b border-border px-6 py-5 flex items-center justify-center">
        <img
          src={logo}
          alt="Next Level Dads"
          className="h-10 absolute top-4 left-3"
        />
        <h1 className="text-2xl font-heading font-semibold text-foreground">
          Host Details
        </h1>
      </div>

      <div className="max-w-md mx-auto px-6 py-6">
        <Button
          variant="ghost"
          onClick={handleBack}
          className="mb-4 -ml-2 text-muted-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <Card className="overflow-hidden shadow-lg">
          <CardContent className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-heading font-bold text-foreground">
                  {host.name}
                </h2>
                <p className="text-sm text-muted-foreground">Event Organizer</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-muted-foreground">
              {host.description}
            </p>

            {/* Contact Info */}
            <div className="space-y-4 py-4 border-t border-border">
              <h3 className="text-sm font-semibold text-foreground">Contact Information</h3>
              
              <a 
                href={`mailto:${host.email}`}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <Mail className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">{host.email}</p>
                  <p className="text-xs text-muted-foreground">Email</p>
                </div>
              </a>
              
              <a 
                href={`tel:${host.phone.replace(/[^0-9+]/g, '')}`}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <Phone className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">{host.phone}</p>
                  <p className="text-xs text-muted-foreground">Phone</p>
                </div>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  )
}

export default HostDetail
