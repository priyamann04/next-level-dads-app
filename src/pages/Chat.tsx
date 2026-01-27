import { useState, useEffect, useMemo } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ArrowLeft, Send, Users } from 'lucide-react'
import avatarDefaultGrey from '@/assets/avatar-default-grey.png'
import {
  ROUTES,
  communityMembers,
  groupMembers,
  discoverTab,
  groupsTab,
} from '@/lib/routes'

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

const Chat = () => {
  const navigate = useNavigate()
  const { chatId } = useParams<{ chatId: string }>()
  const [searchParams] = useSearchParams()
  const [message, setMessage] = useState('')

  const handleSend = () => {}

  const handleBack = () => {}

  const handleMembers = () => {}

  const isGroupChat = false

  const chatTypeLabel = ''

  const chatInfo = {
    name: 'Chat Name',
    avatar: avatarDefaultGrey,
    memberCount: 10,
    icebreaker: 'What is your favorite dad joke?',
  }

  const currentMessages: Message[] = []

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
                {isGroupChat
                  ? `${chatTypeLabel} • ${chatInfo.memberCount} members`
                  : 'Active now'}
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
                  <AvatarImage
                    src={msg.avatar}
                    alt={msg.sender}
                  />
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
