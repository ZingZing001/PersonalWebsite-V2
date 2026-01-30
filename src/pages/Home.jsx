import { Navbar } from "@/components/Navbar"
import { StarBackground } from "@/components/StarBackground"
import { HeroSection } from "@/components/HeroSection"
import { AboutSection } from "@/components/AboutSection"
import { SkillSection } from "@/components/SkillSection"
import { ProjectSection } from "@/components/ProjectSection"
import { BlogSection } from "@/components/BlogSection"
import { ContactSection } from "@/components/ContactSection"
import { useSnapScroll } from "@/hooks/useSnapScroll"

export const Home = () => {
  // Enable snap scrolling
  useSnapScroll();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Background Effects */}
      <StarBackground />

      {/* NavBar */}
      <Navbar />

      {/* Main Content */}
      <main>
        <HeroSection />
        <AboutSection />
        <SkillSection />
        <ProjectSection />
        <BlogSection />
        <ContactSection />
      </main>
    </div>
  )
}

