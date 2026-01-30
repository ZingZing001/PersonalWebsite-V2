import { Heart, Github, Linkedin, Instagram, ExternalLink, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "GitHub",
      icon: <Github className="w-5 h-5" />,
      url: "https://github.com/ZingZing001",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-5 h-5" />,
      url: "https://www.linkedin.com/in/runjiazhangnz/",
    },
    {
      name: "Instagram",
      icon: <Instagram className="w-5 h-5" />,
      url: "https://www.instagram.com/zingzing.d",
    },
  ];

  const quickLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Blog", href: "/blog", isRoute: true },
    { name: "Contact", href: "#contact" },
  ];

  const handleNavClick = (e, href) => {
    if (!href.startsWith("/")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="relative bg-card/50 border-t border-border/50">
      {/* Main Footer Content */}
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="text-xl font-bold text-primary inline-block">
              <span className="text-glow text-foreground">Johnson's</span> Portfolio
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              A passionate developer crafting beautiful digital experiences. 
              Always learning, always building.
            </p>
            {/* Social Links */}
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-background/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 hover:scale-110"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-foreground font-semibold">Quick Links</h3>
            <nav className="grid grid-cols-2 gap-2">
              {quickLinks.map((link) => (
                link.isRoute ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                )
              ))}
            </nav>
          </div>

          {/* Acknowledgments */}
          <div className="space-y-4">
            <h3 className="text-foreground font-semibold flex items-center gap-2">
              <Sparkles size={16} className="text-primary" />
              Acknowledgments
            </h3>
            <div className="space-y-3 text-sm">
              <a
                href="https://www.youtube.com/watch?v=ifOJ0R5UQOc"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-muted-foreground hover:text-primary transition-colors group"
              >
                <ExternalLink size={14} className="mt-0.5 flex-shrink-0" />
                <span>
                  ABSOLUTE LEGEND tutorial from{" "}
                  <span className="text-primary group-hover:underline">PedroTech</span>
                </span>
              </a>
              <a
                href="https://lucide.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-muted-foreground hover:text-primary transition-colors group"
              >
                <ExternalLink size={14} className="mt-0.5 flex-shrink-0" />
                <span>
                  Icons from{" "}
                  <span className="text-primary group-hover:underline">Lucide React</span>
                </span>
              </a>
              <p className="text-muted-foreground/70 text-xs">
                Built with React, Vite & TailwindCSS
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/50">
        <div className="container mx-auto max-w-6xl px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm text-center md:text-left">
              © {currentYear} Johnson Zhang. All rights reserved.
            </p>
            <p className="text-muted-foreground text-sm flex items-center gap-1.5">
              Built with <Heart size={14} className="text-red-500 fill-red-500 animate-pulse" /> by Johnson Zhang
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
