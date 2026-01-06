import { useState, useEffect, useMemo } from 'react'
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

interface Message {
  id: number
  sender: string
  text: string
  time: string
  isSelf: boolean
  avatar?: string
}

// Mock data for each specific chat - keyed by chatId for complete isolation
const chatDatabase: Record<string, {
  name: string
  avatar: string
  memberCount?: number
  type: ChatType
  messages: Message[]
  icebreaker: string
}> = {
  'chat-mike': {
    name: 'Mike',
    avatar: avatarDefaultGrey,
    type: 'individual',
    icebreaker: "What's your favorite weekend activity with your kids?",
    messages: [
      { id: 1, sender: 'Mike', text: 'Hey! How\'s it going?', time: '10:30 AM', isSelf: false, avatar: avatarDefaultGrey },
      { id: 2, sender: 'You', text: 'Great! Just got back from the park with the kids. How about you?', time: '10:32 AM', isSelf: true },
      { id: 3, sender: 'Mike', text: 'That sounds fun! I was thinking we could meet up this weekend for coffee?', time: '10:35 AM', isSelf: false, avatar: avatarDefaultGrey },
      { id: 4, sender: 'You', text: 'That sounds great! Let\'s plan for Saturday morning if that works.', time: '10:37 AM', isSelf: true },
    ],
  },
  'chat-david': {
    name: 'David',
    avatar: avatarDefaultGrey,
    type: 'individual',
    icebreaker: "What age are your kids and what do they enjoy doing?",
    messages: [
      { id: 1, sender: 'David', text: 'Thanks for connecting! I saw you\'re also into hiking.', time: '2:15 PM', isSelf: false, avatar: avatarDefaultGrey },
      { id: 2, sender: 'You', text: 'Yes! We try to get out on the trails every other weekend.', time: '2:18 PM', isSelf: true },
      { id: 3, sender: 'David', text: 'That\'s awesome. My kids are just getting old enough to enjoy longer hikes.', time: '2:20 PM', isSelf: false, avatar: avatarDefaultGrey },
    ],
  },
  'chat-james': {
    name: 'James',
    avatar: avatarDefaultGrey,
    type: 'individual',
    icebreaker: "What's been the best part of your week so far?",
    messages: [
      { id: 1, sender: 'James', text: 'The kids had a great time at the playdate!', time: '4:45 PM', isSelf: false, avatar: avatarDefaultGrey },
      { id: 2, sender: 'You', text: 'So glad to hear that! Mine haven\'t stopped talking about it.', time: '4:50 PM', isSelf: true },
      { id: 3, sender: 'James', text: 'We should do it again soon. Maybe at the new park next time?', time: '4:52 PM', isSelf: false, avatar: avatarDefaultGrey },
      { id: 4, sender: 'You', text: 'Perfect! Let me check our schedule and get back to you.', time: '4:55 PM', isSelf: true },
    ],
  },
  'chat-connection-mike': {
    name: 'Mike Johnson',
    avatar: avatarDefaultGrey,
    type: 'individual',
    icebreaker: "What brought you to the dad community?",
    messages: [
      { id: 1, sender: 'Mike Johnson', text: 'Hey! Great to connect with you here.', time: '9:00 AM', isSelf: false, avatar: avatarDefaultGrey },
      { id: 2, sender: 'You', text: 'Likewise! I noticed we\'re both in the same area.', time: '9:05 AM', isSelf: true },
    ],
  },
  'chat-connection-david': {
    name: 'David Chen',
    avatar: avatarDefaultGrey,
    type: 'individual',
    icebreaker: "Do you have any parenting tips to share?",
    messages: [
      { id: 1, sender: 'David Chen', text: 'Nice to meet you! I see we share some interests.', time: '11:30 AM', isSelf: false, avatar: avatarDefaultGrey },
    ],
  },
  'chat-connection-steve': {
    name: 'Steve Wilson',
    avatar: avatarDefaultGrey,
    type: 'individual',
    icebreaker: "What's your go-to family activity on weekends?",
    messages: [
      { id: 1, sender: 'Steve Wilson', text: 'Hey there! Looking forward to getting to know you.', time: '3:00 PM', isSelf: false, avatar: avatarDefaultGrey },
      { id: 2, sender: 'You', text: 'Same here! How long have you been part of the community?', time: '3:15 PM', isSelf: true },
    ],
  },
  'group-toronto': {
    name: 'Toronto Dads Meetup',
    avatar: avatarDefaultGrey,
    memberCount: 8,
    type: 'private-group',
    icebreaker: "Share something fun you did with your kids recently!",
    messages: [
      { id: 1, sender: 'Alex', text: 'Anyone free for coffee this weekend?', time: '8:00 AM', isSelf: false, avatar: avatarDefaultGrey },
      { id: 2, sender: 'You', text: 'I could do Saturday morning!', time: '8:15 AM', isSelf: true },
      { id: 3, sender: 'Brian', text: 'Count me in as well.', time: '8:20 AM', isSelf: false, avatar: avatarDefaultGrey },
      { id: 4, sender: 'Chris', text: 'Same here, what time works for everyone?', time: '8:25 AM', isSelf: false, avatar: avatarDefaultGrey },
    ],
  },
}

// Community chat templates - keyed by community ID
const communityChatsData: Record<string, {
  memberCount: number
  icebreaker: string
  messages: Message[]
}> = {
  '1': {
    memberCount: 42,
    icebreaker: "What's your favorite local coffee spot?",
    messages: [
      { id: 1, sender: 'Michael', text: 'Morning everyone! Who\'s coming to the meetup this Saturday?', time: '7:30 AM', isSelf: false, avatar: avatarDefaultGrey },
      { id: 2, sender: 'You', text: 'I\'ll be there! Looking forward to it.', time: '7:45 AM', isSelf: true },
      { id: 3, sender: 'Robert', text: 'Count me in. Should we try that new cafe downtown?', time: '8:00 AM', isSelf: false, avatar: avatarDefaultGrey },
    ],
  },
  '2': {
    memberCount: 67,
    icebreaker: "What's your favorite trail in the area?",
    messages: [
      { id: 1, sender: 'James', text: 'Hey everyone! Anyone up for a hike this weekend?', time: '10:30 AM', isSelf: false, avatar: avatarDefaultGrey },
      { id: 2, sender: 'You', text: 'Sounds great! I\'m in. What trail are you thinking?', time: '10:32 AM', isSelf: true },
      { id: 3, sender: 'David', text: 'Count me in too! My kids would love it.', time: '10:35 AM', isSelf: false, avatar: avatarDefaultGrey },
    ],
  },
  '5': {
    memberCount: 78,
    icebreaker: "What sport does your family enjoy the most?",
    messages: [
      { id: 1, sender: 'Chris', text: 'Who\'s up for a pickup basketball game this weekend?', time: '6:00 PM', isSelf: false, avatar: avatarDefaultGrey },
      { id: 2, sender: 'Anthony', text: 'I\'m in! What time?', time: '6:15 PM', isSelf: false, avatar: avatarDefaultGrey },
      { id: 3, sender: 'You', text: 'Count me in too!', time: '6:20 PM', isSelf: true },
    ],
  },
}

const Chat = () => {
  const navigate = useNavigate()
  const { chatId } = useParams<{ chatId: string }>()
  const [searchParams] = useSearchParams()
  const [message, setMessage] = useState('')
  
  // Store messages per chatId to ensure complete isolation
  const [messagesStore, setMessagesStore] = useState<Record<string, Message[]>>({})

  const { communityChats } = useGroups()

  // Determine chat type from URL params
  const from = searchParams.get('from') || 'chats'

  // Get chat data based on chatId - memoized for stability
  const chatInfo = useMemo(() => {
    if (!chatId) {
      return {
        type: 'individual' as ChatType,
        name: 'Chat',
        avatar: avatarDefaultGrey,
        memberCount: undefined,
        communityId: undefined,
        initialMessages: [] as Message[],
        icebreaker: "What's on your mind today?",
      }
    }

    // Community chat
    if (chatId.startsWith('community-')) {
      const commId = chatId.replace('community-', '')
      const communityChat = communityChats.find(
        (chat) => chat.communityId === parseInt(commId)
      )
      const communityData = communityChatsData[commId] || {
        memberCount: 3,
        icebreaker: "Introduce yourself to the group!",
        messages: [],
      }
      
      return {
        type: 'community' as ChatType,
        name: communityChat?.communityName || 'Community Chat',
        avatar: avatarDefaultGrey,
        memberCount: communityData.memberCount,
        communityId: commId,
        initialMessages: communityData.messages,
        icebreaker: communityData.icebreaker,
      }
    }

    // Direct chat or private group from database
    const chatData = chatDatabase[chatId]
    if (chatData) {
      return {
        type: chatData.type,
        name: chatData.name,
        avatar: chatData.avatar,
        memberCount: chatData.memberCount,
        communityId: undefined,
        initialMessages: chatData.messages,
        icebreaker: chatData.icebreaker,
      }
    }

    // Fallback for unknown chat
    return {
      type: 'individual' as ChatType,
      name: 'Chat',
      avatar: avatarDefaultGrey,
      memberCount: undefined,
      communityId: undefined,
      initialMessages: [] as Message[],
      icebreaker: "Start the conversation!",
    }
  }, [chatId, communityChats])

  // Initialize messages for this specific chat when chatId changes
  useEffect(() => {
    if (chatId && !messagesStore[chatId]) {
      setMessagesStore(prev => ({
        ...prev,
        [chatId]: [...chatInfo.initialMessages],
      }))
    }
  }, [chatId, chatInfo.initialMessages, messagesStore])

  // Get messages for current chat only
  const currentMessages = chatId ? (messagesStore[chatId] || chatInfo.initialMessages) : []

  const handleSend = () => {
    if (message.trim() && chatId) {
      const newMessage: Message = {
        id: currentMessages.length + 1,
        sender: 'You',
        text: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSelf: true,
      }
      
      setMessagesStore(prev => ({
        ...prev,
        [chatId]: [...(prev[chatId] || chatInfo.initialMessages), newMessage],
      }))
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
    if (chatInfo.type === 'community' && chatInfo.communityId) {
      navigate(communityMembers(chatInfo.communityId))
    }
  }

  const isGroupChat = chatInfo.type === 'community' || chatInfo.type === 'private-group'
  const chatTypeLabel = chatInfo.type === 'community' ? 'Community' : chatInfo.type === 'private-group' ? 'Group' : ''

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
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
                <AvatarImage src={chatInfo.avatar} />
                <AvatarFallback>{chatInfo.name[0]}</AvatarFallback>
              </Avatar>
            )}
            
            <div className="flex-1">
              <h1 className="text-lg font-heading font-semibold text-foreground">
                {chatInfo.name}
              </h1>
              <p className="text-xs text-muted-foreground">
                {isGroupChat ? `${chatTypeLabel} • ${chatInfo.memberCount} members` : 'Active now'}
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

      {/* Messages */}
      <div className="flex-1 max-w-md mx-auto w-full px-6 py-6 overflow-y-auto">
        <div className="mb-4 text-center">
          <p className="text-xs text-muted-foreground bg-muted/50 inline-block px-3 py-1 rounded-full">
            Today
          </p>
        </div>

        <div className="space-y-4">
          {currentMessages.map((msg) => (
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

        {/* Icebreaker prompt */}
        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <p className="text-sm text-muted-foreground italic">
            💡 Icebreaker: "{chatInfo.icebreaker}"
          </p>
        </div>
      </div>

      {/* Input */}
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
