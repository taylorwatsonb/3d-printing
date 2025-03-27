
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Bell, 
  LayoutDashboard, 
  Settings,
  Menu,
  X,
  LogOut
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();
  const { user, signOut } = useAuth();
  
  const navItems = [
    { label: "Dashboard", icon: <LayoutDashboard size={20} />, href: "/", active: true },
    { label: "Settings", icon: <Settings size={20} />, href: "/settings", active: false },
  ];
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const handleNotificationClick = () => {
    toast({
      title: "Notifications",
      description: "You have 5 unread notifications",
    });
  };

  const handleSignOut = async () => {
    await signOut();
  };
  
  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-border/40 transition-all duration-200">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-2">
          {isMobile && (
            <button 
              onClick={toggleMenu}
              className="mr-2 rounded-md p-1 text-muted-foreground hover:bg-accent"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
          <Link to="/" className="flex items-center gap-2">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-medium">
              <span className="absolute text-xs">SP</span>
            </div>
            <span className="hidden md:inline-block font-semibold text-lg">Smart Production</span>
          </Link>
        </div>
        
        {!isMobile && (
          <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
            {navItems.map((item, idx) => (
              <Link
                key={idx}
                to={item.href}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors hover:text-primary",
                  item.active ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        )}
        
        <div className="flex items-center gap-3">
          <button
            onClick={handleNotificationClick}
            className="rounded-full p-2 text-muted-foreground hover:bg-accent transition-colors duration-200"
            aria-label="Notifications"
          >
            <Bell size={20} />
          </button>
          
          {user && (
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary hover:bg-accent rounded-md"
              aria-label="Sign out"
            >
              <LogOut size={18} />
              <span className="hidden md:inline-block">Sign Out</span>
            </button>
          )}
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobile && isMenuOpen && (
        <div className="fixed inset-0 top-16 z-50 bg-background animate-fade-in">
          <nav className="container flex flex-col space-y-2 p-4">
            {navItems.map((item, idx) => (
              <Link
                key={idx}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 text-base font-medium transition-colors rounded-md",
                  item.active 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:bg-accent/50"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
            
            {user && (
              <button
                onClick={() => {
                  handleSignOut();
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-3 text-base font-medium transition-colors rounded-md text-muted-foreground hover:bg-accent/50 mt-4"
              >
                <LogOut size={20} />
                <span>Sign Out</span>
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
