import { useEffect, useState } from "react"
import { Meteors } from "./Meteors"

export const StarBackground = () => {
  const [stars, setStars] = useState([])
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check initial theme
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }

    checkTheme()
    generateStars()

    const handleResize = () => {
      generateStars()
    }

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      observer.disconnect()
    }
  }, [])

  const generateStars = () => {
    const numberOfStars = Math.floor(window.innerWidth * window.innerHeight / 20000)
    const newStars = []
    for (let i = 0; i < numberOfStars; i++) {
      newStars.push({
        id: i,
        size: Math.random() * 3 + 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.5 + 0.5,
        twinkleDuration: Math.random() * 4 + 2,
      })
    }
    setStars(newStars)
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 opacity-85">
      {isDark && stars.map((star) => (
        <div
          key={star.id} 
          className="star animate-pulse-subtle" 
          style={{
            width: star.size + "px", 
            height: star.size + "px", 
            left: star.x + "%", 
            top: star.y + "%", 
            opacity: star.opacity, 
            animationDuration: star.twinkleDuration + "s",
          }} 
        />
      ))}
      {isDark && <Meteors number={20} />}
    </div>
  )
}