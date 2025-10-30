import { Navbar } from "@/components/Navbar"
import { ThemeToggle } from "@/components/ThemeToggle"
import { StarBackground } from "@/components/StarBackground"
import { HeroSection } from "@/components/HeroSection"
import { AboutSection } from "@/components/AboutSection"

export const Home = () => {
  return <div className="min-h-screen bg-background text-foreground overflow-x-hidden ">



    {/* Background Effects (First)*/}
    <StarBackground />

    {/* Light/Dark Mode toggling (Last)*/}
    <ThemeToggle />

    {/* NavBar */}
    <Navbar />

    {/* Main Content */}
    <main>
      <HeroSection />
      <AboutSection />
    </main>



    {/* Footer */}



  </div>
}

