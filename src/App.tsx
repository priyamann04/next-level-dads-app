import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/auth" replace />;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  return user ? <Navigate to="/discover" replace /> : <>{children}</>;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<PublicRoute><Welcome /></PublicRoute>} />
    <Route path="/auth" element={<PublicRoute><Auth /></PublicRoute>} />
    <Route path="/setup" element={<ProtectedRoute><ProfileSetup /></ProtectedRoute>} />
    <Route path="/match" element={<ProtectedRoute><Match /></ProtectedRoute>} />
    <Route path="/chats" element={<ProtectedRoute><Chats /></ProtectedRoute>} />
    <Route path="/chat/:id" element={<ProtectedRoute><ChatDetail /></ProtectedRoute>} />
    <Route path="/discover" element={<ProtectedRoute><Discover /></ProtectedRoute>} />
    <Route path="/community-detail/:id" element={<ProtectedRoute><CommunityDetail /></ProtectedRoute>} />
    <Route path="/group-chat/:id" element={<ProtectedRoute><GroupChat /></ProtectedRoute>} />
    <Route path="/group-members/:id" element={<ProtectedRoute><GroupMembers /></ProtectedRoute>} />
    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
    <Route path="/profile/:id" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
