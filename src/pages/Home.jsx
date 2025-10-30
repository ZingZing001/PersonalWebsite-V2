import { Navbar } from "@/components/Navbar"
import { ThemeToggle } from "@/components/ThemeToggle"
import { StarBackground } from "@/components/StarBackground"

export const Home = () => {
  return <div className="min-h-screen bg-background text-foreground overflow-x-hidden ">


    {/* NavBar */}
    <Navbar />
    {/* Background Effects (First)*/}
    <StarBackground />

    {/* Light/Dark Mode toggling (Last)*/}
    <ThemeToggle />






    {/* Footer */}



  </div>
}

