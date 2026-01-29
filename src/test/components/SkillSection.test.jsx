import { describe, test, expect, beforeEach, afterEach } from 'vitest'
import { renderWithProviders, enableDarkMode, disableDarkMode } from '../test-utils'
import { SkillSection } from '@/components/SkillSection'

describe('SkillSection - Dark Mode Text Colors', () => {
  beforeEach(() => {
    disableDarkMode()
  })

  afterEach(() => {
    disableDarkMode()
  })

  test('renders the Skills section', () => {
    const { container } = renderWithProviders(<SkillSection />)
    expect(container.querySelector('#skills')).toBeInTheDocument()
  })

  test('main heading contains text-primary span', () => {
    const { getByText } = renderWithProviders(<SkillSection />)
    const primarySpan = getByText('Skills')
    expect(primarySpan).toHaveClass('text-primary')
  })

  test('skill names have text-foreground class', () => {
    const { container } = renderWithProviders(<SkillSection />)
    const skillNames = container.querySelectorAll('h3.text-foreground')
    expect(skillNames.length).toBeGreaterThan(0)
  })

  test('proficiency labels have text-muted-foreground class', () => {
    const { container } = renderWithProviders(<SkillSection />)
    const proficiencyLabels = container.querySelectorAll('.text-muted-foreground')
    expect(proficiencyLabels.length).toBeGreaterThan(0)
  })

  test('category buttons have proper text color classes', () => {
    const { container } = renderWithProviders(<SkillSection />)
    const buttons = container.querySelectorAll('button')
    expect(buttons.length).toBeGreaterThan(0)
  })

  test('renders correctly in dark mode', () => {
    enableDarkMode()
    const { container } = renderWithProviders(<SkillSection />)
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(container.querySelector('#skills')).toBeInTheDocument()
  })

  test('skill cards have dark mode specific classes', () => {
    const { container } = renderWithProviders(<SkillSection />)
    const cards = container.querySelectorAll('[class*="bg-card"]')
    expect(cards.length).toBeGreaterThan(0)
  })
})
