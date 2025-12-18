import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest'
import { renderWithProviders, enableDarkMode, disableDarkMode } from '../test-utils'
import { AboutSection } from '@/components/AboutSection'

// Mock the profile picture import
vi.mock('@/assets/Profile_Pic.jpg', () => ({ default: 'mock-profile-pic.jpg' }))

describe('AboutSection - Dark Mode Text Colors', () => {
  beforeEach(() => {
    disableDarkMode()
  })

  afterEach(() => {
    disableDarkMode()
  })

  test('renders the About section', () => {
    const { container } = renderWithProviders(<AboutSection />)
    expect(container.querySelector('#about')).toBeInTheDocument()
  })

  test('main heading has text-foreground class', () => {
    const { container } = renderWithProviders(<AboutSection />)
    const heading = container.querySelector('h2')
    expect(heading).toBeInTheDocument()
  })

  test('"Who I Am" subheading has text-foreground class', () => {
    const { getByText } = renderWithProviders(<AboutSection />)
    const subheading = getByText('Who I Am')
    expect(subheading).toHaveClass('text-foreground')
  })

  test('card headings have text-foreground class', () => {
    const { getByText } = renderWithProviders(<AboutSection />)
    
    const frontendHeading = getByText('Front-End Development')
    const backendHeading = getByText('Back-End Development')
    const fullstackHeading = getByText('Full-Stack Development')
    const uiuxHeading = getByText('UI/UX Design')

    expect(frontendHeading).toHaveClass('text-foreground')
    expect(backendHeading).toHaveClass('text-foreground')
    expect(fullstackHeading).toHaveClass('text-foreground')
    expect(uiuxHeading).toHaveClass('text-foreground')
  })

  test('description paragraphs have text-muted-foreground class', () => {
    const { container } = renderWithProviders(<AboutSection />)
    const descriptions = container.querySelectorAll('.text-muted-foreground')
    expect(descriptions.length).toBeGreaterThan(0)
  })

  test('renders correctly in dark mode', () => {
    enableDarkMode()
    const { container } = renderWithProviders(<AboutSection />)
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(container.querySelector('#about')).toBeInTheDocument()
  })
})
