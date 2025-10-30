import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"


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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={cn("fixed w-full z-40 transition-all duration-300", 
    isScrolled ? "py-3 bg-background/80 backdrop-blur-md shadow-xs" : "py-5")}>
      <div className="container flex items-center justify-between">
        <a className="text-xl font-bold text-primary flex items-center" href="#hero">
          <span className="relative z-10">
            <span className="text-glow text-foreground">Johnson's </span> Portfolio
          </span>
        </a>

        {/* Nav for desktops */}
        <div className="hidden md:flex space-x-8 font-medium">
          {NavItems.map((item,key) => (
            <a
              key={key}
              href={item.href}
              className="text-foreground/80 hover:text-primary transition-colors duration-300"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Nav for mobile */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-foreground z-50"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          > 
          {isMobileMenuOpen ? <X size = {24}/> : <Menu size={24}/> }
        </button>
        <div className={cn("fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center",
          "transition-all duration-300 md:hidden", 
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"          
          )}>
          <div className="flex flex-col space-y-8 text-xl">
            {NavItems.map((item,key) => (
              <a
                key={key}
                href={item.href}
                className="text-foreground/80 hover:text-primary transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}