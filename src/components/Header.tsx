import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Notifications from "./Notifications";

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-accent">
            <span className="text-lg font-bold text-white">L</span>
          </div>
          <span className="text-xl font-bold text-foreground">LocalLink</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Home
          </Link>
          <Link to="/services" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Services
          </Link>
          <Link to="/priceCompare" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Compare Prices
          </Link>
          <Link to="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Dashboard
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          <div className="hidden md:flex">
            <Notifications />
          </div>

          {user ? (
            <div className="hidden md:flex items-center space-x-3">
              <span className="text-sm font-medium text-foreground">
                Hi, {user.name?.split(" ")[0]} 👋
              </span>
              <Button variant="ghost" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-2">
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/signup">
                <Button variant="hero">Sign Up</Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
