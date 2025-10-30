import pfp from "@/assets/Profile_Pic.jpg"
import { Code, Database, Globe, Sparkle } from "lucide-react"

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="container max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          About <span className="text-primary">Me</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">Who I Am</h3>
            <img src={pfp} alt="A picture of me" className="rounded-lg shadow-md" />
            <p className="text-muted-foreground">
              I'm a passionate software developer with a love for creating dynamic and user-friendly web applications.
            </p>

            <p className="text-muted-foreground">
              With a background in software engineering, I specialize in front-end development and have experience working with various modern frameworks and libraries.
              I'm committed to writing clean, maintainable code and continuously improving my skills.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <a
                href="#contact"
                className="cosmic-button"
              >
                Get in Touch
              </a>

              <a 
                href="#projects"
                className="px-6 py-2 rounded-full border border-primary text-secondary hover:bg-primary/10 
                transition-colors duration-300"
              >
                Download CV
              </a>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6">
            <div className="gradient-border p-6 card-hover"> 
              <div className="flex items-start gap-4"> 
                <div className="p-3 rounded-full bg-primary/10">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="text-lg font-semibold mb-1">Front-End Development</h4>
                  <p className="text-sm text-muted-foreground">
                    Expertise in building responsive and interactive user interfaces using React, Vue, and Angular.
                  </p>
                </div>
              </div>
            </div>
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4"> 
                <div className="p-3 rounded-full bg-primary/10">
                  <Database className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="text-lg font-semibold mb-1">Back-End Development</h4>
                  <p className="text-sm text-muted-foreground">
                    Proficient in building RESTful APIs and working with databases using Node.js, Express, and MongoDB.
                  </p>
                </div>
              </div>
            </div>
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4"> 
                <div className="p-3 rounded-full bg-primary/10">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="text-lg font-semibold mb-1">Full-Stack Development</h4>
                  <p className="text-sm text-muted-foreground">
                    Experienced in working with both front-end and back-end technologies to create seamless web applications.
                  </p>
                </div>
              </div>
            </div>
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4"> 
                <div className="p-3 rounded-full bg-primary/10">
                  <Sparkle className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="text-lg font-semibold mb-1">UI/UX Design</h4>
                  <p className="text-sm text-muted-foreground">
                    Expertise in creating user-centered designs through research, wireframing, and prototyping.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
