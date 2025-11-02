import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Auth from "./pages/Auth";
import ProfileSetup from "./pages/ProfileSetup";
import Match from "./pages/Match";
import Chats from "./pages/Chats";
import ChatDetail from "./pages/ChatDetail";
import Discover from "./pages/Discover";
import CommunityDetail from "./pages/CommunityDetail";
import GroupChat from "./pages/GroupChat";
import GroupMembers from "./pages/GroupMembers";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/setup" element={<ProfileSetup />} />
          <Route path="/match" element={<Match />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/chat/:id" element={<ChatDetail />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/community-detail" element={<CommunityDetail />} />
          <Route path="/group-chat/:id" element={<GroupChat />} />
          <Route path="/group-members/:id" element={<GroupMembers />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
