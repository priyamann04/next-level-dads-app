import { createContext, useContext, useState, ReactNode } from 'react'

interface CommunityChat {
  communityId: number
  communityName: string
}

interface GroupsContextType {
  joinedCommunities: number[]
  registeredEvents: number[]
  communityChats: CommunityChat[]
  joinCommunity: (id: number, name: string) => void
  leaveCommunity: (id: number) => void
  registerEvent: (id: number) => void
  unregisterEvent: (id: number) => void
}

const GroupsContext = createContext<GroupsContextType | undefined>(undefined)

export const GroupsProvider = ({ children }: { children: ReactNode }) => {
  const [joinedCommunities, setJoinedCommunities] = useState<number[]>([1, 2, 5])
  const [registeredEvents, setRegisteredEvents] = useState<number[]>([1, 3])
  const [communityChats, setCommunityChats] = useState<CommunityChat[]>([
    { communityId: 1, communityName: 'Saturday Coffee Dads' },
    { communityId: 2, communityName: 'Outdoor Adventure Dads' },
    { communityId: 5, communityName: 'Sports & Fitness Dads' },
  ])

  const joinCommunity = (id: number, name: string) => {
    setJoinedCommunities((prev) => [...prev, id])
    setCommunityChats((prev) => {
      if (prev.some(chat => chat.communityId === id)) {
        return prev
      }
      return [...prev, { communityId: id, communityName: name }]
    })
  }

  const leaveCommunity = (id: number) => {
    setJoinedCommunities((prev) => prev.filter((cId) => cId !== id))
    setCommunityChats((prev) => prev.filter((chat) => chat.communityId !== id))
  }

  const registerEvent = (id: number) => {
    setRegisteredEvents((prev) => [...prev, id])
  }

  const unregisterEvent = (id: number) => {
    setRegisteredEvents((prev) => prev.filter((eId) => eId !== id))
  }

  return (
    <GroupsContext.Provider
      value={{
        joinedCommunities,
        registeredEvents,
        communityChats,
        joinCommunity,
        leaveCommunity,
        registerEvent,
        unregisterEvent,
      }}
    >
      {children}
    </GroupsContext.Provider>
  )
}

export const useGroups = () => {
  const context = useContext(GroupsContext)
  if (context === undefined) {
    throw new Error('useGroups must be used within a GroupsProvider')
  }
  return context
}
