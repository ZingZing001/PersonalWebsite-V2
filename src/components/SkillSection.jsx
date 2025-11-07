import { useState } from "react"
import { cn } from "@/lib/utils"
import { Code2, Palette, Box, Wind, ArrowRight, Coffee, Server, Database, Github, Figma } from "lucide-react"

const skills = [
  // Frontend Skills
  {
    name: "HTML/CSS",
    level: "85",
    category: "frontend",
    icon: Code2,
  },
  {
    name: "JavaScript",
    level: "50",
    category: "frontend",
    icon: Box,
  },
  {
    name: "React",
    level: "50",
    category: "frontend",
    icon: Box,
  },
  {
    name: "Tailwind CSS",
    level: "30",
    category: "frontend",
    icon: Palette,
  },
  {
    name: "Next.js",
    level: "30",
    category: "frontend",
    icon: ArrowRight,
  },
  // Backend Skills
  {
    name: "Java",
    level: "90",
    category: "backend",
    icon: Coffee,
  },
  {
    name: "Node.js",
    level: "70",
    category: "backend",
    icon: Server,
  },
  {
    name: "MongoDB",
    level: "50",
    category: "backend",
    icon: Database,
  },

  // Tools
  {
    name: "Github/Git",
    level: "90",
    category: "tools",
    icon: Github,
  },
  {
    name: "Figma",
    level: "70",
    category: "tools",
    icon: Figma,
  }
]

const categories = ["all", "frontend", "backend", "tools"]

export const SkillSection = () => {
  const [activeCategory, setActiveCategory] = useState("all")
  const filteredSkills = skills.filter((skill) => activeCategory === "all" || skill.category === activeCategory)
  
  const getCategoryCount = (category) => {
    if (category === "all") return skills.length
    return skills.filter(skill => skill.category === category).length
  }
  
  return (
    <section id="skills" className="min-h-screen py-24 px-4 relative flex items-center">
      <div className="container max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          My <span className="text-primary">Skills</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          A showcase of my technical expertise and tools I work with. I'm constantly learning and expanding my skill set!
        </p> 

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category,key) => (
            <button
              key={key} 
              onClick={() => setActiveCategory(category)}
              className={cn("px-5 py-2 rounded-full transition-all duration-300 capitalize relative group dark:backdrop-blur-sm border",
                activeCategory === category
                ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg border-primary/50"
                : "dark:bg-card/70 bg-white text-foreground hover:bg-primary/50 dark:border-border/50 border-primary/30"
              )}>
                {category}
                <span className={cn("ml-2 px-2 py-0.5 rounded-full text-xs font-semibold transition-colors duration-300",
                  activeCategory === category
                  ? "bg-primary-foreground/20 text-primary-foreground"
                  : "bg-primary/20 text-primary"
                )}>
                  {getCategoryCount(category)}
                </span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {filteredSkills.map((skill,key) => {
            const Icon = skill.icon
            const getProficiencyLabel = (level) => {
              if (level >= 80) return "Expert"
              if (level >= 60) return "Advanced"
              if (level >= 40) return "Intermediate"
              return "Beginner"
            }
            return (
            <div 
              key={key} 
              className="dark:bg-card/60 dark:backdrop-blur-sm bg-white dark:border-border/50 border-2 border-primary/20 rounded-lg p-6 shadow-lg dark:shadow-primary/5 shadow-xl card-hover animate-fade-in"
              style={{ animationDelay: `${key * 0.1}s` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{skill.name}</h3>
                  <span className="text-xs text-muted-foreground">{getProficiencyLabel(skill.level)}</span>
                </div>
              </div>
              <div className="w-full bg-card/50 h-2 rounded-full overflow-hidden group">
                <div
                  className="bg-gradient-to-r from-primary to-primary/70 h-2 rounded-full origin-left animate-[grow_1.5s_ease-out] transition-all duration-300 group-hover:from-primary group-hover:to-primary"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-muted-foreground">Proficiency</span>
                <span className="text-sm font-semibold text-primary">{skill.level}%</span>
              </div>
            </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
