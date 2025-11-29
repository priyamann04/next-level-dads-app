import { Users, MessageCircle, Compass } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const BottomNav = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: Compass, label: "Discover", path: "/discover/dads" },
    { icon: Users, label: "Groups", path: "/groups/communities" },
    { icon: MessageCircle, label: "Chats", path: "/chats" },
    { icon: Users, label: "Profile", path: "/profile" },
  ];

  const isActiveRoute = (path: string) => {
    if (path === "/discover/dads") {
      return location.pathname.startsWith("/discover");
    }
    if (path === "/groups/communities") {
      return location.pathname.startsWith("/groups");
    }
    return location.pathname === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-md z-50">
      <div className="max-w-md mx-auto flex justify-around items-center h-16 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = isActiveRoute(item.path);
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center flex-1 gap-1 transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground"
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
