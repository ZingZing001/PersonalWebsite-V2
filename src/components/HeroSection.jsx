import { MouseIcon } from 'lucide-react';
import Typewriter from 'typewriter-effect';
export const HeroSection = () => {
  return (
    <section 
    id="hero" 
    className="relative min-h-screen flex flex-col items-center justify-center px-4"
    >
      <div className="container max-w-4xl mx-auto text-center z-10">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            <Typewriter
          onInit={(typewriter) => {
            typewriter.typeString('Hello, I\'m')
              .typeString('<span class="text-primary"> Johnson</span>')
              .typeString('<span class="text-foreground"> Zhang</span>')
              .start();
          }}
        />
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-2-2xl mx-auto opacity-0 animate-fade-in-delay-3" 
          style={{ animationDelay: '4s' }}>
            I'm a passionate software developer specializing in building exceptional digital experiences. <br />
            Welcome to my portfolio!
          </p>

          <div className="pt-4 mt-8 opacity-0 animate-fade-in-delay-4" style={{ animationDelay: '5s' }}>
            <a
              href="#projects"
              className="cosmic-button"
            >
              View My Projects
            </a>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center 
      opacity-0 animate-fade-in-delay-4" style={{ animationDelay: '6.5s' }}>
        <div className="animate-bounce flex flex-col items-center">
          <span className="text-sm text-muted-foreground mb-2" size={32}>Scroll Down</span>
          <MouseIcon className="h-5 w-5 text-primary " />
        </div>
      </div>

    </section>
  )
}