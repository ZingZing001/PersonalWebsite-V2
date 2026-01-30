import { Heart, Github, Linkedin, Instagram, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "GitHub",
      icon: <Github className="w-4 h-4" />,
      url: "https://github.com/ZingZing001",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-4 h-4" />,
      url: "https://www.linkedin.com/in/runjiazhangnz/",
    },
    {
      name: "Instagram",
      icon: <Instagram className="w-4 h-4" />,
      url: "https://www.instagram.com/zingzing.d",
    },
  ];

  return (
    <footer className="relative border-t border-border/50 bg-card/30">
      {/* Main Footer - Minimal */}
      <div className="container mx-auto max-w-5xl px-4 py-10">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Logo */}
          <Link to="/" className="text-lg font-bold text-primary">
            <span className="text-foreground">Johnson</span> Zhang
          </Link>

          {/* Tagline */}
          <p className="text-muted-foreground text-sm max-w-md">
            Crafting digital experiences with passion and precision.
          </p>

          {/* Social Links - Inline */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Acknowledgment - Subtle */}
          <a
            href="https://www.youtube.com/watch?v=ifOJ0R5UQOc"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground/70 hover:text-primary transition-colors group"
          >
            <ExternalLink size={10} />
            <span>
              Inspired by ABSOLUTE LEGEND{" "}
              <span className="text-primary/80 group-hover:text-primary group-hover:underline">PedroTech</span>
            </span>
          </a>
        </div>
      </div>

      {/* Bottom Bar - Slim */}
      <div className="border-t border-border/30">
        <div className="container mx-auto max-w-5xl px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground/60">
            <p>© {currentYear} Johnson Zhang</p>
            <p className="flex items-center gap-1">
              Built with <Heart size={10} className="text-red-500 fill-red-500" /> using React & Tailwind
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
