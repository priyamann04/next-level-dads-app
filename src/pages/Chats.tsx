import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '@/components/BottomNav'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Search, Users, Plus, Check } from 'lucide-react'
import avatarDefaultGrey from '@/assets/avatar-default-grey.png'
import logo from '@/assets/logo.png'
import { individualChat, groupChat, communityChat } from '@/lib/routes'
import { toast } from 'sonner'

const Chats = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [isNewChatOpen, setIsNewChatOpen] = useState(false)
  const [newChatSearch, setNewChatSearch] = useState('')
  const [selectedConnections, setSelectedConnections] = useState<string[]>([])
  const [groupName, setGroupName] = useState('')

  const navigate = useNavigate()

  const toggleConnectionSelection = (id: string) => {}

  const handleCreateChat = () => {}

  const handleDialogClose = (open: boolean) => {}

  const isGroupChat = selectedConnections.length > 1

  const userConnections = []

  const filteredConnections = []

  const filteredChats = []

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
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-full"
            />
          </div>
          <Dialog
            open={isNewChatOpen}
            onOpenChange={handleDialogClose}
          >
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="shrink-0"
              >
                <Plus className="w-5 h-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm">
              <DialogHeader>
                <DialogTitle>New Chat</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search connections..."
                    value={newChatSearch}
                    onChange={(e) => setNewChatSearch(e.target.value)}
                    className="pl-9 rounded-full"
                  />
                </div>

                {selectedConnections.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedConnections.map((id) => {
                      const connection = userConnections.find(
                        (c) => c.id === id,
                      )
                      return connection ? (
                        <div
                          key={id}
                          onClick={() => toggleConnectionSelection(id)}
                          className="flex items-center gap-1 px-2 py-1 bg-primary/10 rounded-full text-sm cursor-pointer hover:bg-primary/20"
                        >
                          <span>{connection.name.split(' ')[0]}</span>
                          <span className="text-muted-foreground">×</span>
                        </div>
                      ) : null
                    })}
                  </div>
                )}

                {isGroupChat && (
                  <Input
                    placeholder="Group name..."
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    className="rounded-full"
                  />
                )}

                <div className="max-h-60 overflow-y-auto space-y-2">
                  {filteredConnections.length > 0 ? (
                    filteredConnections.map((connection) => (
                      <div
                        key={connection.id}
                        onClick={() => toggleConnectionSelection(connection.id)}
                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedConnections.includes(connection.id)
                            ? 'bg-primary/10 border border-primary'
                            : 'bg-muted/50 hover:bg-muted'
                        }`}
                      >
                        <Avatar className="w-10 h-10">
                          <AvatarImage
                            src={connection.avatar}
                            alt={connection.name}
                          />
                          <AvatarFallback>{connection.name[0]}</AvatarFallback>
                        </Avatar>
                        <span className="flex-1 font-medium">
                          {connection.name}
                        </span>
                        {selectedConnections.includes(connection.id) && (
                          <Check className="w-5 h-5 text-primary" />
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground py-4">
                      No connections found
                    </p>
                  )}
                </div>

                {selectedConnections.length > 0 && (
                  <Button
                    onClick={handleCreateChat}
                    className="w-full rounded-full"
                    style={{ backgroundColor: '#D8A24A' }}
                  >
                    {isGroupChat
                      ? `Create Group (${selectedConnections.length} members)`
                      : 'Start Chat'}
                  </Button>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {filteredChats.length > 0 ? (
          <div className="divide-y divide-border">
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => navigate(individualChat(chat.id))}
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
