import { Users, MessageCircle, Compass } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "@/lib/routes";

const BottomNav = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: Compass, label: "Discover", path: ROUTES.DISCOVER_DADS, activePrefix: '/discover' },
    { icon: Users, label: "Groups", path: ROUTES.GROUPS_COMMUNITIES, activePrefix: '/groups' },
    { icon: MessageCircle, label: "Chats", path: ROUTES.CHATS, activePrefix: '/chats' },
    { icon: Users, label: "Profile", path: ROUTES.PROFILE, activePrefix: '/profile' },
  ];

  // Check if current path matches the tab's active prefix
  // Profile tab should only be active for /profile, not /profiles/:id
  const isActive = (item: typeof navItems[0]) => {
    const { pathname } = location;
    
    // Profile tab: only active for exact /profile routes (own profile)
    if (item.activePrefix === '/profile') {
      return pathname === '/profile' || pathname.startsWith('/profile/');
    }
    
    // Discover tab: active for /discover/* including /discover/dads/:dadId
    if (item.activePrefix === '/discover') {
      return pathname.startsWith('/discover');
    }
    
    // Other tabs: check if path starts with the prefix
    return pathname.startsWith(item.activePrefix);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-md z-50">
      <div className="max-w-md mx-auto flex justify-around items-center h-16 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item);
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center flex-1 gap-1 transition-colors ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
