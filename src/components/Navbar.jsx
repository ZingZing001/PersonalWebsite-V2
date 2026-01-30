import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "./ThemeToggle"
import { Link, useLocation, useNavigate } from "react-router-dom"


const NavItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Blog", href: "#blog" },
  { name: "Contact", href: "#contact" },
];


export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle navigation - smooth scroll on home, navigate first on other pages
  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    if (href.startsWith("#")) {
      if (location.pathname === "/") {
        // On home page - just scroll to section
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // On other pages - navigate to home first, then scroll
        navigate("/");
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    }
  };

  return (
    <>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-background/90 backdrop-blur-lg z-40 md:hidden animate-fade-in"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div className="flex flex-col items-center justify-center min-h-screen space-y-8 text-xl">
            {NavItems.map((item, key) => (
              item.href.startsWith("/") ? (
                <Link
                  key={key}
                  to={item.href}
                  className="text-foreground font-medium hover:text-primary transition-colors duration-300 text-center animate-fade-in tracking-wide"
                  style={{ animationDelay: `${key * 0.1}s` }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ) : (
                <a
                  key={key}
                  href={item.href}
                  className="text-foreground font-medium hover:text-primary transition-colors duration-300 text-center animate-fade-in tracking-wide"
                  style={{ animationDelay: `${key * 0.1}s` }}
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.name}
                </a>
              )
            ))}
          </div>
        </div>
      )}

      <nav className={cn("fixed w-full z-50 transition-all duration-300", 
      isScrolled ? "py-3 bg-background/80 backdrop-blur-md shadow-xs" : "py-5")}>
        <div className="container flex items-center justify-between">
          <Link className="text-xl font-bold text-primary flex items-center relative z-50" to="/">
            <span className="relative z-10">
              <span className="text-glow text-foreground">Johnson's </span> Portfolio
            </span>
          </Link>

          {/* Nav for desktops */}
          <div className="hidden md:flex space-x-8 items-center">
            {NavItems.map((item, key) => (
              item.href.startsWith("/") ? (
                <Link
                  key={key}
                  to={item.href}
                  className="text-foreground font-medium hover:text-primary transition-colors duration-300 tracking-wide"
                >
                  {item.name}
                </Link>
              ) : (
                <a
                  key={key}
                  href={item.href}
                  className="text-foreground font-medium hover:text-primary transition-colors duration-300 tracking-wide"
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.name}
                </a>
              )
            ))}
            <ThemeToggle />
          </div>

          {/* Nav for mobile - Theme Toggle and Menu Button */}
          <div className="md:hidden flex items-center gap-2 z-50 relative">
            <ThemeToggle />
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-foreground"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            > 
              {isMobileMenuOpen ? <X size = {24}/> : <Menu size={24}/> }
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}