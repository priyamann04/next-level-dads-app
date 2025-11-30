import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '@/components/BottomNav'
import { Input } from '@/components/ui/input'
import { Search, Users } from 'lucide-react'
import avatarDefaultGrey from '@/assets/avatar-default-grey.png'
import logo from '@/assets/logo.png'

const mockChats = [
  {
    id: 1,
    name: 'Mike',
    lastMessage: "That sounds great! Let's plan for Saturday.",
    timestamp: '2m ago',
    unread: 2,
    avatar: avatarDefaultGrey,
    isGroup: false,
  },
  {
    id: 'group-1',
    name: 'Toronto Dads Meetup',
    lastMessage: 'Alex: Anyone free for coffee this weekend?',
    timestamp: '45m ago',
    unread: 5,
    avatar: avatarDefaultGrey,
    isGroup: true,
  },
  {
    id: 2,
    name: 'David',
    lastMessage: 'Thanks for the advice about the school situation!',
    timestamp: '1h ago',
    unread: 0,
    avatar: avatarDefaultGrey,
    isGroup: false,
  },
  {
    id: 3,
    name: 'James',
    lastMessage: 'The kids had a great time at the playdate',
    timestamp: '3h ago',
    unread: 0,
    avatar: avatarDefaultGrey,
    isGroup: false,
  },
]

const Chats = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const filteredChats = mockChats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="relative bg-card border-b border-border px-6 py-5 flex items-center justify-center">
        {/* Logo top-left */}
        <img
          src={logo}
          alt="Next Level Dads"
          className="h-10 absolute top-4 left-3"
        />

        {/* Centered text */}
        <div className="text-center">
          <h1 className="text-2xl font-heading font-semibold text-foreground">
            Chats
          </h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-full"
          />
        </div>

        {filteredChats.length > 0 ? (
          <div className="divide-y divide-border">
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => navigate(`/chat/${chat.id}`)}
                className="px-6 py-4 hover:bg-muted/50 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={chat.avatar}
                      alt={chat.name}
                      className="w-14 h-14 rounded-md object-cover"
                    />
                    {chat.isGroup && (
                      <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-1">
                        <Users className="w-3 h-3 text-primary-foreground" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-foreground truncate">
                        {chat.name}
                      </h3>
                      <span className="text-xs text-muted-foreground">
                        {chat.timestamp}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground truncate">
                        {chat.lastMessage}
                      </p>
                      {chat.unread > 0 && (
                        <span className="ml-2 bg-primary text-primary-foreground text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                          {chat.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 px-6">
            <p className="text-muted-foreground">No conversations found</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  )
}

export default Chats
