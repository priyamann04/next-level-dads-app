import { useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ArrowLeft, Send, Users } from 'lucide-react'
import avatarDefaultGrey from '@/assets/avatar-default-grey.png'
import { useGroups } from '@/contexts/GroupsContext'
import { ROUTES, communityMembers, discoverTab, groupsTab } from '@/lib/routes'

// Chat type definitions
export type ChatType = 'individual' | 'private-group' | 'community'

// Mock data for individual/private group chats
const chatData: Record<string, { name: string; avatar: string; memberCount?: number }> = {
  'chat-mike': { name: 'Mike', avatar: avatarDefaultGrey },
  'chat-david': { name: 'David', avatar: avatarDefaultGrey },
  'chat-james': { name: 'James', avatar: avatarDefaultGrey },
  'chat-connection-mike': { name: 'Mike Johnson', avatar: avatarDefaultGrey },
  'chat-connection-david': { name: 'David Chen', avatar: avatarDefaultGrey },
  'chat-connection-steve': { name: 'Steve Wilson', avatar: avatarDefaultGrey },
  'group-toronto': { name: 'Toronto Dads Meetup', avatar: avatarDefaultGrey, memberCount: 8 },
}

// Mock messages for different chat types
const getMockMessages = (chatType: ChatType) => {
  if (chatType === 'individual') {
    return [
      { id: 1, sender: 'Other', text: 'Hey! How\'s it going?', time: '10:30 AM', isSelf: false, avatar: avatarDefaultGrey },
      { id: 2, sender: 'You', text: 'Great! Just got back from the park with the kids. How about you?', time: '10:32 AM', isSelf: true },
      { id: 3, sender: 'Other', text: 'That sounds fun! I was thinking we could meet up this weekend for coffee?', time: '10:35 AM', isSelf: false, avatar: avatarDefaultGrey },
      { id: 4, sender: 'You', text: 'That sounds great! Let\'s plan for Saturday morning if that works.', time: '10:37 AM', isSelf: true },
    ]
  }
  return [
    { id: 1, sender: 'Mike', text: 'Hey everyone! Anyone up for a hike this weekend?', time: '10:30 AM', isSelf: false, avatar: avatarDefaultGrey },
    { id: 2, sender: 'You', text: "Sounds great! I'm in. What trail are you thinking?", time: '10:32 AM', isSelf: true },
    { id: 3, sender: 'David', text: 'Count me in too! My kids would love it.', time: '10:35 AM', isSelf: false, avatar: avatarDefaultGrey },
  ]
}

const Chat = () => {
  const navigate = useNavigate()
  const { chatId } = useParams<{ chatId: string }>()
  const [searchParams] = useSearchParams()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Array<{
    id: number
    sender: string
    text: string
    time: string
    isSelf: boolean
    avatar?: string
  }>>([])

  const { communityChats } = useGroups()

  // Determine chat type from URL params
  const typeParam = searchParams.get('type') as ChatType | null
  const from = searchParams.get('from') || 'chats'

  // Determine chat type and data based on chatId pattern or explicit type param
  let chatType: ChatType = 'individual'
  let chatName = 'Chat'
  let chatAvatar = avatarDefaultGrey
  let memberCount: number | undefined
  let communityId: string | undefined

  if (chatId?.startsWith('community-')) {
    chatType = 'community'
    communityId = chatId.replace('community-', '')
    const communityChat = communityChats.find(
      (chat) => chat.communityId === parseInt(communityId || '0')
    )
    chatName = communityChat?.communityName || 'Community Chat'
    memberCount = 3 // Mock count
  } else if (chatId?.startsWith('group-') || typeParam === 'private-group') {
    chatType = 'private-group'
    const groupData = chatData[chatId || '']
    chatName = groupData?.name || 'Private Group'
    chatAvatar = groupData?.avatar || avatarDefaultGrey
    memberCount = groupData?.memberCount || 4
  } else {
    chatType = typeParam || 'individual'
    const individualData = chatData[chatId || '']
    chatName = individualData?.name || 'Chat'
    chatAvatar = individualData?.avatar || avatarDefaultGrey
  }

  // Initialize messages based on chat type
  useState(() => {
    setMessages(getMockMessages(chatType))
  })

  // Ensure messages are loaded
  if (messages.length === 0) {
    setMessages(getMockMessages(chatType))
  }

  const handleSend = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'You',
        text: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSelf: true,
      }
      setMessages([...messages, newMessage])
      setMessage('')
    }
  }

  const handleBack = () => {
    if (from === 'discover') {
      navigate(discoverTab('communities'))
    } else if (from === 'groups') {
      navigate(groupsTab('communities'))
    } else {
      navigate(ROUTES.CHATS)
    }
  }

  const handleMembers = () => {
    if (chatType === 'community' && communityId) {
      navigate(communityMembers(communityId))
    }
    // For private groups and individual chats, member pages can be handled separately
    // For now, only community chats have a members page
  }

  const isGroupChat = chatType === 'community' || chatType === 'private-group'
  const chatTypeLabel = chatType === 'community' ? 'Community' : chatType === 'private-group' ? 'Group' : ''

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="bg-card border-b border-border">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="text-muted-foreground"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            
            {!isGroupChat && (
              <Avatar className="w-10 h-10">
                <AvatarImage src={chatAvatar} />
                <AvatarFallback>{chatName[0]}</AvatarFallback>
              </Avatar>
            )}
            
            <div className="flex-1">
              <h1 className="text-lg font-heading font-semibold text-foreground">
                {chatName}
              </h1>
              <p className="text-xs text-muted-foreground">
                {isGroupChat ? `${chatTypeLabel} • ${memberCount} members` : 'Active now'}
              </p>
            </div>
            
            {isGroupChat && (
              <button
                onClick={handleMembers}
                className="text-muted-foreground"
              >
                <Users className="w-6 h-6" />
              </button>
            )}
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
                <AvatarImage src={msg.avatar} alt={msg.sender} />
                <AvatarFallback>{msg.sender[0]}</AvatarFallback>
              </Avatar>
            )}
            <div className={`flex flex-col ${msg.isSelf ? 'items-end' : ''}`}>
              {!msg.isSelf && isGroupChat && (
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

export default Chat
