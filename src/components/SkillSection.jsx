import { useState } from "react"
import { cn } from "@/lib/utils"
const skills = [
  // Frontend Skills
  {
    name: "HTML/CSS",
    level: "85",
    category: "frontend",
  },
  {
    name: "JavaScript",
    level: "50",
    category: "frontend",
  },
  {
    name: "React",
    level: "50",
    category: "frontend",
  },
  {
    name: "Tailwind CSS",
    level: "30",
    category: "frontend",
  },
  {
    name: "Next.js",
    level: "30",
    category: "frontend",
  },
  // Backend Skills
  {
    name: "Java",
    level: "90",
    category: "backend",
  },
  {
    name: "Node.js",
    level: "70",
    category: "backend",
  },
  {
    name: "MongoDB",
    level: "50",
    category: "backend",
  },

  // Tools
  {
    name: "Github/Git",
    level: "90",
    category: "tools",
  },
  {
    name: "Figma",
    level: "70",
    category: "tools",
  }
]

const categories = ["all", "frontend", "backend", "tools"]

export const SkillSection = () => {
  const [activeCategory, setActiveCategory] = useState("all")
  const filteredSkills = skills.filter((skill) => activeCategory === "all" || skill.category === activeCategory)
  return (
    <section id="skills" className="py-24 px-4 relative">
      <div className="container max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary">Skills</span>
        </h2> 

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category,key) => (
            <button
              key={key} 
              onClick={() => setActiveCategory(category)}
              className={cn("px-5 py-2 rounded-full transition-colors duration-300 capitalize",
                activeCategory === category
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-card/70 text-foreground hover:bg-primary/50"
              )}>
                {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {filteredSkills.map((skill,key) => (
            <div key={key} className="bg-card rounded-lg p-6 shadow-xs card-hover">
              <div className="text-left mb-4">
                <h3 className="text-lg font-semibold">{skill.name}</h3>
              </div>
              <div className="w-full bg-card/50 h-2 rounded-full overflow-hidden">
              <div
                  className="bg-primary h-2 rounded-full origin-left animate-[grow_1.5s_ease-out]"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
              <div className="text-right mt-1">
                <span className="text-sm text-muted-foreground">{skill.level}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
