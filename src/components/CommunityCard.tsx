import { Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Card, CardContent } from './ui/card'
import { communityDetail } from '@/lib/routes'
import type { Community } from '@/types/communities'

const CommunityCard = ({
  id,
  name,
  description,
  member_count,
  is_member,
  role,
}: Community) => {
  const navigate = useNavigate()

  const handleCardClick = () => {
    navigate(communityDetail(id))
  }

  // Action handlers (stubs for now)
  const handleJoin = () => {
    // TODO: POST /api/communities/:id/join
  }

  const handleLeave = () => {
    // TODO: DELETE /api/communities/:id/leave
  }

  const handleManage = () => {
    // TODO: navigate to community management
  }

  const renderButtons = () => {
    if (is_member) {
      if (role === 'admin') {
        return (
          <div className="flex gap-2">
            <Button
              className="flex-1 rounded-full"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation()
                handleManage()
              }}
            >
              Manage
            </Button>
            <Button
              className="flex-1 rounded-full"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation()
                handleLeave()
              }}
            >
              Leave
            </Button>
          </div>
        )
      }

      // role === 'member'
      return (
        <Button
          className="w-full rounded-full"
          variant="outline"
          onClick={(e) => {
            e.stopPropagation()
            handleLeave()
          }}
        >
          Leave Community
        </Button>
      )
    }

    // not a member
    return (
      <Button
        className="w-full rounded-full"
        variant="outline"
        onClick={(e) => {
          e.stopPropagation()
          handleJoin()
        }}
      >
        Join Community
      </Button>
    )
  }

  return (
    <Card
      className="overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
      onClick={handleCardClick}
    >
      <CardContent className="p-6 space-y-4">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
              {name}
            </h3>
            {role && (
              <Badge variant="soft" className="shrink-0">
                {role}
              </Badge>
            )}
          </div>
          {description && (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
          )}
        </div>

        <div className="flex items-center text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{member_count} members</span>
          </div>
        </div>

        {renderButtons()}
      </CardContent>
    </Card>
  )
}

export default CommunityCard
