import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import ProfileSetup from "./pages/ProfileSetup";
import Match from "./pages/Match";
import Chats from "./pages/Chats";
import ChatDetail from "./pages/ChatDetail";
import DiscoverDads from "./pages/DiscoverDads";
import DiscoverCommunities from "./pages/DiscoverCommunities";
import DiscoverEvents from "./pages/DiscoverEvents";
import MyGroups from "./pages/MyGroups";
import MyEvents from "./pages/MyEvents";
import CommunityDetail from "./pages/CommunityDetail";
import GroupChat from "./pages/GroupChat";
import GroupMembers from "./pages/GroupMembers";
import Profile from "./pages/Profile";
import Connections from "./pages/Connections";
import Requests from "./pages/Requests";
import NotFound from "./pages/NotFound";
import { Navigate } from "react-router-dom";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/discover/dads" replace />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/setup" element={<ProfileSetup />} />
          <Route path="/match" element={<Match />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/chat/:id" element={<ChatDetail />} />
          <Route path="/discover" element={<Navigate to="/discover/dads" replace />} />
          <Route path="/discover/dads" element={<DiscoverDads />} />
          <Route path="/discover/communities" element={<DiscoverCommunities />} />
          <Route path="/discover/events" element={<DiscoverEvents />} />
          <Route path="/groups" element={<Navigate to="/groups/communities" replace />} />
          <Route path="/groups/communities" element={<MyGroups />} />
          <Route path="/groups/events" element={<MyEvents />} />
          <Route path="/community-detail/:id" element={<CommunityDetail />} />
          <Route path="/group-chat/:id" element={<GroupChat />} />
          <Route path="/group-members/:id" element={<GroupMembers />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/connections" element={<Connections />} />
          <Route path="/requests" element={<Requests />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
