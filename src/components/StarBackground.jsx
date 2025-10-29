import { useEffect, useState } from "react"

// Star will have id, size, x, y, opacity, twinkleDuration
// Meteor will have id, size, x, y, delay, fallDuration

export const StarBackground = () => {
  const [stars, setStars] = useState([])
  const [meteors, setMeteors] = useState([])
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check initial theme
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }

    checkTheme()
    generateStars()
    generateMeteors()

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
    const numberOfStars = Math.floor(window.innerWidth * window.innerHeight / 10000)
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

  const generateMeteors = () => {
    const numberOfMeteors = 4
    const newMeteors = []

    for (let i = 0; i < numberOfMeteors; i++) {
      newMeteors.push({
        id: i,
        size: Math.random() * 4 + 1,
        x: Math.random() * 100,
        y: Math.random() * 20,
        delay: Math.random() * 15,
        twinkleDuration: Math.random() * 3 + 3,
      })
    }
    setMeteors(newMeteors)
  }

  return <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    {isDark && stars.map((star) => (
      <div
        key={star.id} className="star animate-pulse-subtle" style={{
          width: star.size + "px", height: star.size + "px", left: star.x + "%", top: star.y + "%", opacity: star.opacity, animationDuration: star.twinkleDuration + "s",
        }} />
    ))}
    {isDark && meteors.map((meteor) => (
      <div
        key={meteor.id} className="meteor animate-meteor" style={{
          width: meteor.size * 50 + "px", height: meteor.size * 0.2 + "px", left: meteor.x + "%", top: meteor.y * 2 + "%", animationDelay: meteor.delay, animationDuration: meteor.twinkleDuration + "s",
        }} />
    ))}
  </div>
}