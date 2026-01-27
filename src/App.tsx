import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ROUTES } from '@/lib/routes'

// Pages
import Welcome from './pages/Welcome'
import ProfileSetup from './pages/ProfileSetup'
import Match from './pages/Match'
import Chats from './pages/Chats'
import Chat from './pages/Chat'
import Discover from './pages/Discover'
import Groups from './pages/Groups'
import CommunityDetail from './pages/CommunityDetail'
import Members from './pages/Members'
import MyProfile from './pages/MyProfile'
import ProfileDetail from './pages/ProfileDetail'
import EditProfile from './pages/EditProfile'
import Connections from './pages/Connections'
import Requests from './pages/Requests'
import EventDetail from './pages/EventDetail'
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
 * /discover/dads/:id .......... ProfileDetail (discover context with Connect button)
 *
 * /communities/:communityId ... Community Detail
 * /communities/:communityId/members ... Members
 *
 * /groups ..................... Redirect to /groups/communities
 * /groups/:tab ................ My Groups (communities | events)
 * /groups/:groupId/members .... Members (normalized pattern)
 *
 * /chats ...................... Chats List
 * /chats/individual/:id ....... Chat (individual 1:1)
 * /chats/group/:id ............ Chat (private group)
 * /chats/community/:id ........ Chat (community)
 *
 * /profile .................... MyProfile (own profile with stats, edit, logout)
 * /profiles/:id ............... ProfileDetail (read-only other user view)
 * /connections ................ Connections List
 * /requests ................... Connection Requests
 *
 * /events/:eventId ............ Event Detail
 */

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Auth & Onboarding */}
          <Route
            path={ROUTES.WELCOME}
            element={<Welcome />}
          />
          <Route
            path={ROUTES.SETUP}
            element={<ProfileSetup />}
          />
          <Route
            path={ROUTES.MATCH}
            element={<Match />}
          />

          {/* Discover (tabbed) */}
          <Route
            path={ROUTES.DISCOVER}
            element={
              <Navigate
                to={ROUTES.DISCOVER_DADS}
                replace
              />
            }
          />
          <Route
            path="/discover/dads/:id"
            element={<ProfileDetail />}
          />
          <Route
            path="/discover/:tab"
            element={<Discover />}
          />

          {/* Communities */}
          <Route
            path="/communities/:communityId"
            element={<CommunityDetail />}
          />
          <Route
            path="/communities/:communityId/members"
            element={<Members />}
          />

          {/* Events */}
          <Route
            path="/events/:eventId"
            element={<EventDetail />}
          />

          {/* My Groups (tabbed) */}
          <Route
            path={ROUTES.GROUPS}
            element={
              <Navigate
                to={ROUTES.GROUPS_COMMUNITIES}
                replace
              />
            }
          />
          <Route
            path="/groups/:tab"
            element={<Groups />}
          />
          <Route
            path="/groups/:groupId/members"
            element={<Members />}
          />

          {/* Chats (typed routes) */}
          <Route
            path={ROUTES.CHATS}
            element={<Chats />}
          />
          <Route
            path="/chats/individual/:id"
            element={<Chat />}
          />
          <Route
            path="/chats/group/:id"
            element={<Chat />}
          />
          <Route
            path="/chats/community/:id"
            element={<Chat />}
          />

          {/* Profile */}
          <Route
            path={ROUTES.PROFILE}
            element={<MyProfile />}
          />
          <Route
            path={ROUTES.EDIT_PROFILE}
            element={<EditProfile />}
          />
          <Route
            path="/profiles/:id"
            element={<ProfileDetail />}
          />
          <Route
            path={ROUTES.CONNECTIONS}
            element={<Connections />}
          />
          <Route
            path={ROUTES.REQUESTS}
            element={<Requests />}
          />

          {/* Catch-all */}
          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
)

export default App
