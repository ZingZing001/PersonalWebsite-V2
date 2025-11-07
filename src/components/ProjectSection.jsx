import { ExternalLink,Github, ArrowRight} from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Portfolio Website",
    description: "A personal portfolio website to showcase my projects and skills, built with React and Tailwind CSS.",
    image: `${import.meta.env.BASE_URL}projects/project1.png`,
    tags: ["React", "Tailwind CSS"],
    demoUrl: "https://zingzing001.github.io/PersonalWebsite-V2/",
    repoUrl: "https://github.com/ZingZing001/PersonalWebsite-V2"
  },
  {
    id: 2,
    title: "Plateful",
    description: "A food hunting web application that helps users discover and share new restaurants based on their preferences.",
    image: `${import.meta.env.BASE_URL}projects/project2.png`,
    tags: ["React+vite", "MongoDB", "Express", "Node.js"],
    demoUrl: "https://uoa-dcml.github.io/se310-plateful/",
    repoUrl: "https://github.com/UOA-DCML/se310-plateful"
  },
  {
    id: 3,
    title: "Watermark Removal Tool",
    description: "A cross-platform tool to remove watermarks from PDF and Word documents with ease. Supports batch processing and customizable removal modes.",
    image: `${import.meta.env.BASE_URL}projects/project3.png`,
    tags: ["Python", "PyQt5", "OpenCV", "PDF Processing"],
    demoUrl: "https://github.com/ZingZing001/WaterMarkRemovalTool/releases",
    repoUrl: "https://github.com/ZingZing001/WaterMarkRemovalTool"
  },
];



export const ProjectSection = () => {
  return (
    <section id="projects" className="min-h-screen py-24 px-4 relative flex items-center">
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
            className="group dark:bg-card/60 dark:backdrop-blur-sm bg-white dark:border-border/50 border-2 border-primary/20 rounded-lg overflow-hidden shadow-lg dark:shadow-primary/5 shadow-xl card-hover flex flex-col"
            >
              <div className="h-48 overflow-hidden">
                <img src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"/>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex flex-wrap gap-2 mb-4 h-16 overflow-hidden">
                  {project.tags.slice(0, 5).map((tag) => (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-card text-secondary-foreground border h-fit">
                      {tag}
                    </span>
                  ))}
                </div>

              <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
              <p className="text-sm text-center text-muted-foreground mb-6 leading-relaxed h-22 overflow-hidden">{project.description}</p>
              <div className="flex gap-3 mt-auto">
                <a 
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300 flex items-center justify-center gap-2 text-sm font-medium"
                >
                  <ExternalLink size={16} />
                  Demo
                </a>  

                <a 
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-2 rounded-lg border border-primary text-primary hover:bg-primary/10 transition-colors duration-300 flex items-center justify-center gap-2 text-sm font-medium"
                >
                  <Github size={16}/>
                  GitHub
                </a>  
              </div>
            </div>
          </div>
          ))}
          </div>
          <div className="text-center mt-12">
            <a 
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
            target="_blank"
            href="https://github.com/ZingZing001">
              Check My GitHub for More Projects <ArrowRight size={16}/>
            </a>

          </div>


        </div>
    </section>
  )
}