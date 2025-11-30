import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { GroupsProvider } from './contexts/GroupsContext'
import Welcome from './pages/Welcome'
import ProfileSetup from './pages/ProfileSetup'
import Match from './pages/Match'
import Chats from './pages/Chats'
import ChatDetail from './pages/ChatDetail'
import Discover from './pages/Discover'
import Groups from './pages/Groups'
import CommunityDetail from './pages/CommunityDetail'
import GroupChat from './pages/GroupChat'
import GroupMembers from './pages/GroupMembers'
import Profile from './pages/Profile'
import Connections from './pages/Connections'
import Requests from './pages/Requests'
import NotFound from './pages/NotFound'

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <GroupsProvider>
          <Routes>
            <Route
              path="/"
              element={<Welcome />}
            />
            <Route
              path="/setup"
              element={<ProfileSetup />}
            />
            <Route
              path="/match"
              element={<Match />}
            />
            <Route
              path="/chats"
              element={<Chats />}
            />
            <Route
              path="/chat/:id"
              element={<ChatDetail />}
            />
            <Route
              path="/discover"
              element={<Discover />}
            />
            <Route
              path="/groups"
              element={<Groups />}
            />
            <Route
              path="/community-detail/:id"
              element={<CommunityDetail />}
            />
            <Route
              path="/group-chat/:id"
              element={<GroupChat />}
            />
            <Route
              path="/group-members/:id"
              element={<GroupMembers />}
            />
            <Route
              path="/profile/:id"
              element={<Profile />}
            />
            <Route
              path="/profile"
              element={<Profile />}
            />
            <Route
              path="/connections"
              element={<Connections />}
            />
            <Route
              path="/requests"
              element={<Requests />}
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route
              path="*"
              element={<NotFound />}
            />
          </Routes>
        </GroupsProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
)

export default App
