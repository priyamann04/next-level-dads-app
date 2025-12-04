import { Users, MessageCircle, Compass } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "@/lib/routes";

const BottomNav = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: Compass, label: "Discover", path: ROUTES.DISCOVER_DADS },
    { icon: Users, label: "Groups", path: ROUTES.GROUPS_COMMUNITIES },
    { icon: MessageCircle, label: "Chats", path: ROUTES.CHATS },
    { icon: Users, label: "Profile", path: ROUTES.PROFILE },
  ];

  // Check if current path is active (matches path or starts with base path)
  const isActive = (navPath: string) => {
    const basePath = navPath.split('/').slice(0, 2).join('/');
    return location.pathname === navPath || location.pathname.startsWith(basePath);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-md z-50">
      <div className="max-w-md mx-auto flex justify-around items-center h-16 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
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
