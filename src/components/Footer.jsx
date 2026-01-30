import { Heart, Github, Linkedin, Instagram, ExternalLink } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 bg-card/30">
      <div className="container mx-auto max-w-5xl px-4 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Left - Branding & Copyright */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="font-medium text-foreground">Johnson Zhang</span>
            <span className="hidden sm:inline">•</span>
            <span>© {currentYear}</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1">
              Built with <Heart size={10} className="text-red-500 fill-red-500" /> React & Tailwind
            </span>
          </div>

          {/* Right - Social & Acknowledgment */}
          <div className="flex items-center gap-4">
            {/* Acknowledgment */}
            <a
              href="https://www.youtube.com/watch?v=ifOJ0R5UQOc"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1 text-xs text-muted-foreground/60 hover:text-primary transition-colors"
            >
              <ExternalLink size={10} />
              <span>Inspired by ABSOLUTE LEGEND PedroTech</span>
            </a>

            {/* Divider */}
            <span className="hidden sm:block w-px h-3 bg-border/50" />

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/ZingZing001"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github size={14} />
              </a>
              <a
                href="https://www.linkedin.com/in/runjiazhangnz/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={14} />
              </a>
              <a
                href="https://www.instagram.com/zingzing.d"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
