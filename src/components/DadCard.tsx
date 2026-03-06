import { MapPin } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Card, CardContent } from './ui/card'
import { getStageDisplayLabel } from '@/utils/users'
import { profileDetail } from '@/lib/routes'
import type { Profile } from '@/types/users'

const DadCard = ({
  id,
  name,
  age,
  city,
  province,
  children,
  about,
  interests,
  avatar_url,
  connection_status,
  created_at,
}: Profile) => {
  const navigate = useNavigate()

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  const handleCardClick = () => {
    navigate(profileDetail(id))
  }

  // Connection action handlers (stubs for now)
  const handleConnect = () => {
    // TODO: POST /api/connections/
  }

  const handleCancelRequest = () => {
    // TODO: DELETE /api/connections/:id
  }

  const handleAccept = () => {
    // TODO: PATCH /api/connections/:id
  }

  const handleIgnore = () => {
    // TODO: DELETE /api/connections/:id
  }

  const handleChat = () => {
    // TODO: navigate to chat
  }

  const handleUnconnect = () => {
    // TODO: DELETE /api/connections/:id
  }

  const renderButtons = () => {
    if (connection_status === 'blocked') return null

    if (connection_status === 'connected') {
      return (
        <div className="flex gap-2">
          <Button
            className="flex-1 rounded-full font-semibold"
            style={{ backgroundColor: '#D8A24A' }}
            onClick={(e) => {
              e.stopPropagation()
              handleChat()
            }}
          >
            Chat
          </Button>
          <Button
            className="flex-1 rounded-full font-semibold"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation()
              handleUnconnect()
            }}
          >
            Unconnect
          </Button>
        </div>
      )
    }

    if (connection_status === 'pending_incoming') {
      return (
        <div className="flex gap-2">
          <Button
            className="flex-1 rounded-full font-semibold"
            style={{ backgroundColor: '#D8A24A' }}
            onClick={(e) => {
              e.stopPropagation()
              handleAccept()
            }}
          >
            Accept
          </Button>
          <Button
            className="flex-1 rounded-full font-semibold"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation()
              handleIgnore()
            }}
          >
            Ignore
          </Button>
        </div>
      )
    }

    if (connection_status === 'pending_outgoing') {
      return (
        <Button
          className="w-full rounded-full font-semibold"
          style={{ backgroundColor: '#9ca3af' }}
          onClick={(e) => {
            e.stopPropagation()
            handleCancelRequest()
          }}
        >
          Requested
        </Button>
      )
    }

    // connection_status === null
    return (
      <Button
        className="w-full rounded-full font-semibold"
        style={{ backgroundColor: '#D8A24A' }}
        onClick={(e) => {
          e.stopPropagation()
          handleConnect()
        }}
      >
        Connect
      </Button>
    )
  }

  return (
    <Card
      className="overflow-hidden shadow-md cursor-pointer"
      onClick={handleCardClick}
    >
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start gap-3">
          {avatar_url ? (
            <img
              src={avatar_url}
              alt={name}
              className="w-20 h-20 rounded-lg object-cover flex-shrink-0 aspect-square"
            />
          ) : (
            <div className="w-20 h-20 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-semibold text-lg flex-shrink-0 aspect-square">
              {initials}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <h3 className="text-base font-heading font-semibold text-foreground">
              {name}, {age}
            </h3>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
              <MapPin className="w-3 h-3" />
              <span>
                {city}, {province}
              </span>
            </div>
            <div className="flex flex-wrap gap-1 mt-1.5">
              {children.map((child) => (
                <Badge
                  key={child}
                  variant="soft"
                  className="rounded-full text-xs"
                >
                  {getStageDisplayLabel(child)}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <p className="text-foreground text-sm leading-relaxed">{about}</p>

        <div className="flex flex-wrap gap-1.5">
          {interests.map((interest) => (
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

        {renderButtons()}
      </CardContent>
    </Card>
  )
}

export default DadCard
