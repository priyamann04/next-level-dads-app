import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ArrowLeft, Send, Users } from 'lucide-react'
import avatarDefaultGrey from '@/assets/avatar-default-grey.png'
import { useGroups } from '@/contexts/GroupsContext'
import { useLocation } from 'react-router-dom'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const GroupChat = () => {
  const query = useQuery()
  const navigate = useNavigate()
  const { id } = useParams()
  const [message, setMessage] = useState('')
  const { communityChats } = useGroups()

  // Check if this is a community chat
  const isCommunityChat = id?.startsWith('community-')
  const communityId = isCommunityChat ? id.replace('community-', '') : null
  const from = query.get('from') || 'groups'

  const groupData = {
    private: {
      title: 'Weekend Outdoor Adventures',
      type: 'Private Group',
      members: [
        { id: 1, name: 'Mike', avatar: avatarDefaultGrey },
        { id: 2, name: 'David', avatar: avatarDefaultGrey },
        { id: 3, name: 'James', avatar: avatarDefaultGrey },
      ],
    },
    public: {
      title: 'Toronto Dads Community',
      type: 'Public Group',
      members: [
        { id: 1, name: 'Mike', avatar: avatarDefaultGrey },
        { id: 2, name: 'David', avatar: avatarDefaultGrey },
        { id: 3, name: 'James', avatar: avatarDefaultGrey },
        { id: 4, name: 'Steve', avatar: avatarDefaultGrey },
      ],
    },
  }

  // Get community chat data or default group data
  let group
  if (isCommunityChat && communityId) {
    const communityChat = communityChats.find(
      (chat) => chat.communityId === parseInt(communityId)
    )
    group = {
      title: communityChat?.communityName || 'Community Chat',
      type: 'Community',
      members: [
        { id: 1, name: 'Mike', avatar: avatarDefaultGrey },
        { id: 2, name: 'David', avatar: avatarDefaultGrey },
        { id: 3, name: 'James', avatar: avatarDefaultGrey },
      ],
    }
  } else {
    group = id === 'private' ? groupData.private : groupData.public
  }

  const messages = [
    {
      id: 1,
      sender: 'Mike',
      text: 'Hey everyone! Anyone up for a hike this weekend?',
      time: '10:30 AM',
      avatar: avatarDefaultGrey,
    },
    {
      id: 2,
      sender: 'You',
      text: "Sounds great! I'm in. What trail are you thinking?",
      time: '10:32 AM',
      isSelf: true,
    },
    {
      id: 3,
      sender: 'David',
      text: 'Count me in too! My kids would love it.',
      time: '10:35 AM',
      avatar: avatarDefaultGrey,
    },
  ]

  const handleSend = () => {
    if (message.trim()) {
      setMessage('')
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="bg-card border-b border-border">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (from === 'discover') {
                  navigate(`/discover/communities`)
                } else {
                  navigate(`/groups/communities`)
                }
              }}
              className="text-muted-foreground"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex-1">
              <h1 className="text-lg font-heading font-semibold text-foreground">
                {group.title}
              </h1>
              <p className="text-xs text-muted-foreground">
                {group.type} • {group.members.length} members
              </p>
            </div>
            <button
              onClick={() => {
                if (isCommunityChat && communityId) {
                  navigate(`/community-detail/${communityId}?from=${from}`)
                } else {
                  navigate(`/group-members/${id}?from=${from}`)
                }
              }}
              className="text-muted-foreground"
            >
              <Users className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-md mx-auto w-full px-6 py-6 space-y-4 overflow-y-auto">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.isSelf ? 'flex-row-reverse' : ''}`}
          >
            {!msg.isSelf && (
              <Avatar className="w-8 h-8 shrink-0">
                <AvatarImage
                  src={msg.avatar}
                  alt={msg.sender}
                />
                <AvatarFallback>{msg.sender[0]}</AvatarFallback>
              </Avatar>
            )}
            <div className={`flex flex-col ${msg.isSelf ? 'items-end' : ''}`}>
              {!msg.isSelf && (
                <span className="text-xs text-muted-foreground mb-1">
                  {msg.sender}
                </span>
              )}
              <div
                className={`rounded-2xl px-4 py-2 max-w-xs ${
                  msg.isSelf
                    ? 'bg-gradient-gold text-foreground'
                    : 'bg-card text-foreground border border-border'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
              </div>
              <span className="text-xs text-muted-foreground mt-1">
                {msg.time}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card border-t border-border">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex gap-2">
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="rounded-full"
            />
            <Button
              size="icon"
              onClick={handleSend}
              className="rounded-full shrink-0 bg-gradient-gold"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GroupChat
