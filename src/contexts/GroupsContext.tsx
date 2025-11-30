import { createContext, useContext, useState, ReactNode } from 'react'

interface GroupsContextType {
  joinedCommunities: number[]
  registeredEvents: number[]
  joinCommunity: (id: number) => void
  leaveCommunity: (id: number) => void
  registerEvent: (id: number) => void
  unregisterEvent: (id: number) => void
}

const GroupsContext = createContext<GroupsContextType | undefined>(undefined)

export const GroupsProvider = ({ children }: { children: ReactNode }) => {
  const [joinedCommunities, setJoinedCommunities] = useState<number[]>([1, 2, 5])
  const [registeredEvents, setRegisteredEvents] = useState<number[]>([1, 3])

  const joinCommunity = (id: number) => {
    setJoinedCommunities((prev) => [...prev, id])
  }

  const leaveCommunity = (id: number) => {
    setJoinedCommunities((prev) => prev.filter((cId) => cId !== id))
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
