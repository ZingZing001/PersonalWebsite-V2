import { Navbar } from "@/components/Navbar"
import { StarBackground } from "@/components/StarBackground"
import { HeroSection } from "@/components/HeroSection"
import { AboutSection } from "@/components/AboutSection"
import { SkillSection } from "@/components/SkillSection"
import { ProjectSection } from "@/components/ProjectSection"
import { ContactSection } from "@/components/ContactSection"

export const Home = () => {
  return <div className="min-h-screen bg-background text-foreground overflow-x-hidden ">



    {/* Background Effects (First)*/}
    <StarBackground />

    {/* Light/Dark Mode toggling (Last)*/}

    {/* NavBar */}
    <Navbar />

    {/* Main Content */}
    <main>
      <HeroSection />
      <AboutSection />
      <SkillSection />
      <ProjectSection />
      <ContactSection />
    </main>



    {/* Footer */}



  </div>
}

