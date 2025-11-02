import { ExternalLink,Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Portfolio Website",
    description: "A personal portfolio website to showcase my projects and skills, built with React and Tailwind CSS.",
    image: "",
    tags: ["React", "Tailwind CSS"],
    demoUrl: "",
    repoUrl: ""
  },
  {
    id: 2,
    title: "Plateful (food hunting app)",
    description: "A food hunting web application that helps users discover new recipes and restaurants based on their preferences.",
    image: "",
    tags: ["React", "vite", "MongoDB", "Express", "Node.js"],
    demoUrl: "",
    repoUrl: ""
  },
];



export const ProjectSection = () => {
  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">

        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Feature <span className="text-primary">Projects</span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here are some of the projects I've worked on recently. Click on any project to learn more about it!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project,key) => (  
            <div 
            key={key} 
            className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover"
            >
              <div className="h-48 overflow-hidden">
                <img src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-1100"/>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-card text-secondary-foreground border">
                      {tag}
                    </span>
                  ))}
                </div>

              <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
              <div className="flex justify-between items-center">
                <div className="flex space-x-3">
                  <a 
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/80 hover:text-primary transition-colours duration-300"
                  >
                    <ExternalLink/>
                  </a>  

                  <a 
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/80 hover:text-primary transition-colours duration-300"
                  > <Github/>
                  </a>  
                </div>
              </div>
            </div>
          </div>
          ))}
          </div>
        </div>
    </section>
  )
}