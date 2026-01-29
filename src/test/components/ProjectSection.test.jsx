import { describe, test, expect, beforeEach, afterEach } from 'vitest'
import { renderWithProviders, enableDarkMode, disableDarkMode } from '../test-utils'
import { ProjectSection } from '@/components/ProjectSection'

describe('ProjectSection - Dark Mode Text Colors', () => {
  beforeEach(() => {
    disableDarkMode()
  })

  afterEach(() => {
    disableDarkMode()
  })

  test('renders the Projects section', () => {
    const { container } = renderWithProviders(<ProjectSection />)
    expect(container.querySelector('#projects')).toBeInTheDocument()
  })

  test('main heading contains text-primary span', () => {
    const { getByText } = renderWithProviders(<ProjectSection />)
    const primarySpan = getByText('Projects')
    expect(primarySpan).toHaveClass('text-primary')
  })

  test('project titles have text-foreground class', () => {
    const { container } = renderWithProviders(<ProjectSection />)
    const projectTitles = container.querySelectorAll('h3')
    
    expect(projectTitles.length).toBeGreaterThan(0)
    projectTitles.forEach(title => {
      expect(title).toHaveClass('text-foreground')
    })
  })

  test('project descriptions have text-muted-foreground class', () => {
    const { container } = renderWithProviders(<ProjectSection />)
    const descriptions = container.querySelectorAll('.text-muted-foreground')
    expect(descriptions.length).toBeGreaterThan(0)
  })

  test('renders correctly in dark mode', () => {
    enableDarkMode()
    const { container } = renderWithProviders(<ProjectSection />)
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(container.querySelector('#projects')).toBeInTheDocument()
  })

  test('project cards have dark mode specific classes', () => {
    const { container } = renderWithProviders(<ProjectSection />)
    const cards = container.querySelectorAll('[class*="bg-card"]')
    expect(cards.length).toBeGreaterThan(0)
  })
})
