import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ROUTES } from '@/lib/routes'
import { AuthProvider } from '@/contexts/AuthContext'

import Welcome from './pages/Welcome'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import VerifyEmail from './pages/VerifyEmail'
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

const AppContent = () => {
  return (
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
            path={ROUTES.LOGIN}
            element={<Login />}
          />
          <Route
            path={ROUTES.REGISTER}
            element={<Register />}
          />
          <Route
            path={ROUTES.FORGOT_PASSWORD}
            element={<ForgotPassword />}
          />
          <Route
            path={ROUTES.RESET_PASSWORD}
            element={<ResetPassword />}
          />
          <Route
            path={ROUTES.VERIFY_EMAIL}
            element={<VerifyEmail />}
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

          {/* Chats */}
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
  )
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  </QueryClientProvider>
)

export default App
