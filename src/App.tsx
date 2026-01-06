import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { GroupsProvider } from './contexts/GroupsContext'
import { ROUTES } from '@/lib/routes'

// Pages
import Welcome from './pages/Welcome'
import ProfileSetup from './pages/ProfileSetup'
import Match from './pages/Match'
import Chats from './pages/Chats'
import Chat from './pages/Chat'
import Discover from './pages/Discover'
import DadDetail from './pages/DadDetail'
import Groups from './pages/Groups'
import CommunityDetail from './pages/CommunityDetail'
import CommunityMembers from './pages/CommunityMembers'
import Profile from './pages/Profile'
import Connections from './pages/Connections'
import Requests from './pages/Requests'
import NotFound from './pages/NotFound'

const queryClient = new QueryClient()

/**
 * Application Route Structure
 * 
 * / ........................... Welcome (landing)
 * /setup ...................... Profile Setup (onboarding)
 * /match ...................... Match Screen
 * 
 * /discover ................... Redirect to /discover/dads
 * /discover/:tab .............. Discover (dads | communities | events)
 * /discover/dads/:dadId ....... Dad Detail (from Discover)
 * 
 * /communities/:communityId ... Community Detail (members list)
 * /communities/:communityId/members ... Community Members
 * 
 * /groups ..................... Redirect to /groups/communities
 * /groups/:tab ................ My Groups (communities | events)
 * 
 * /chats ...................... Chats List
 * /chats/:chatId .............. Unified Chat (individual | private-group | community)
 *                               Query params: ?type=individual|private-group|community&from=chats|groups|discover
 * 
 * /profile .................... Own Profile
 * /profiles/:profileId ........ Other User Profile (from Connections, etc.)
 * /connections ................ Connections List
 * /requests ................... Connection Requests
 */

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <GroupsProvider>
          <Routes>
            {/* Auth & Onboarding */}
            <Route path={ROUTES.WELCOME} element={<Welcome />} />
            <Route path={ROUTES.SETUP} element={<ProfileSetup />} />
            <Route path={ROUTES.MATCH} element={<Match />} />

            {/* Discover (tabbed) */}
            <Route path={ROUTES.DISCOVER} element={<Navigate to={ROUTES.DISCOVER_DADS} replace />} />
            <Route path="/discover/dads/:dadId" element={<DadDetail />} />
            <Route path="/discover/:tab" element={<Discover />} />

            {/* Communities (member pages only - chat is unified) */}
            <Route path="/communities/:communityId" element={<CommunityDetail />} />
            <Route path="/communities/:communityId/members" element={<CommunityMembers />} />

            {/* My Groups (tabbed) */}
            <Route path={ROUTES.GROUPS} element={<Navigate to={ROUTES.GROUPS_COMMUNITIES} replace />} />
            <Route path="/groups/:tab" element={<Groups />} />

            {/* Chats (unified - handles individual, private-group, and community chats) */}
            <Route path={ROUTES.CHATS} element={<Chats />} />
            <Route path="/chats/:chatId" element={<Chat />} />

            {/* Profile */}
            <Route path={ROUTES.PROFILE} element={<Profile />} />
            <Route path="/profiles/:profileId" element={<Profile />} />
            <Route path={ROUTES.CONNECTIONS} element={<Connections />} />
            <Route path={ROUTES.REQUESTS} element={<Requests />} />

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </GroupsProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
)

export default App
