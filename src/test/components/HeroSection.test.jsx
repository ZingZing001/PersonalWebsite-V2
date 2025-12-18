import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest'
import { renderWithProviders, enableDarkMode, disableDarkMode } from '../test-utils'
import { HeroSection } from '@/components/HeroSection'

// Mock typewriter-effect
vi.mock('typewriter-effect', () => ({
  default: () => <span data-testid="typewriter">Hello, I'm Johnson Zhang</span>,
}))

describe('HeroSection - Dark Mode Text Colors', () => {
  beforeEach(() => {
    disableDarkMode()
  })

  afterEach(() => {
    disableDarkMode()
  })

  test('renders the Hero section', () => {
    const { container } = renderWithProviders(<HeroSection />)
    expect(container.querySelector('#hero')).toBeInTheDocument()
  })

  test('renders the main heading', () => {
    const { container } = renderWithProviders(<HeroSection />)
    const heading = container.querySelector('h1')
    expect(heading).toBeInTheDocument()
  })

  test('description has text-muted-foreground class', () => {
    const { container } = renderWithProviders(<HeroSection />)
    const descriptions = container.querySelectorAll('.text-muted-foreground')
    expect(descriptions.length).toBeGreaterThan(0)
  })

  test('scroll indicator has text-muted-foreground class', () => {
    const { getByText } = renderWithProviders(<HeroSection />)
    const scrollText = getByText('Scroll Down')
    expect(scrollText).toHaveClass('text-muted-foreground')
  })

  test('cosmic button has proper styling', () => {
    const { getByText } = renderWithProviders(<HeroSection />)
    const button = getByText('View My Projects')
    expect(button).toHaveClass('cosmic-button')
  })

  test('renders correctly in dark mode', () => {
    enableDarkMode()
    const { container } = renderWithProviders(<HeroSection />)
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(container.querySelector('#hero')).toBeInTheDocument()
  })
})
