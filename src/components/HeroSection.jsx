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
              .typeString('<span className="animate-fade-in-delay-1" style="color: #7f6ce0;"> Johnson</span>')
              .typeString('<span className="animate-fade-in-delay-2"> Zhang</span>')
              .start();
          }}
        />
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-2-2xl mx-auto opacity-0 animate-fade-in-delay-3" 
          style={{ animationDelay: '3.2s' }}>
            I'm a passionate software developer specializing in building exceptional digital experiences. <br />
            Welcome to my portfolio!
          </p>

          <div className="pt-4 mt-8 opacity-0 animate-fade-in-delay-4" style={{ animationDelay: '3.4s' }}>
            <a
              href="#projects"
              className="cosmic-button"
            >
              View My Projects
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}