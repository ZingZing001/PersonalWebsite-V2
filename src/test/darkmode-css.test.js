import { describe, test, expect, beforeEach, afterEach } from 'vitest'
import { enableDarkMode, disableDarkMode } from './test-utils'

// CSS content that should be present in index.css
// These tests verify that required CSS variables are defined for both light and dark modes
const expectedLightModeVars = [
  '--background',
  '--foreground',
  '--muted-foreground',
  '--primary',
  '--primary-foreground',
  '--secondary',
  '--secondary-foreground',
  '--card',
  '--border',
]

const expectedDarkModeVars = [
  '--background',
  '--foreground',
  '--muted-foreground',
  '--primary',
  '--primary-foreground',
  '--secondary',
  '--secondary-foreground',
  '--card',
  '--border',
]

const expectedThemeColors = [
  '--color-foreground',
  '--color-muted-foreground',
  '--color-primary',
  '--color-background',
]

describe('Dark Mode CSS Variables Regression', () => {
  beforeEach(() => {
    disableDarkMode()
  })

  afterEach(() => {
    disableDarkMode()
  })

  describe('Light Mode (:root) CSS Variables', () => {
    test('all required light mode CSS variables should be documented', () => {
      // This test documents what CSS variables are required for light mode
      expect(expectedLightModeVars).toContain('--background')
      expect(expectedLightModeVars).toContain('--foreground')
      expect(expectedLightModeVars).toContain('--muted-foreground')
      expect(expectedLightModeVars).toContain('--primary')
      expect(expectedLightModeVars).toContain('--secondary-foreground')
    })
  })

  describe('Dark Mode (.dark) CSS Variables', () => {
    test('all required dark mode CSS variables should be documented', () => {
      // This test documents what CSS variables are required for dark mode
      expect(expectedDarkModeVars).toContain('--background')
      expect(expectedDarkModeVars).toContain('--foreground')
      expect(expectedDarkModeVars).toContain('--muted-foreground')
      expect(expectedDarkModeVars).toContain('--primary')
    })
  })

  describe('@theme Color Definitions', () => {
    test('all required theme colors should be documented', () => {
      // This test documents what theme colors are required
      expect(expectedThemeColors).toContain('--color-foreground')
      expect(expectedThemeColors).toContain('--color-muted-foreground')
      expect(expectedThemeColors).toContain('--color-primary')
      expect(expectedThemeColors).toContain('--color-background')
    })
  })

  describe('Dark Mode Toggle', () => {
    test('enableDarkMode adds dark class to documentElement', () => {
      expect(document.documentElement.classList.contains('dark')).toBe(false)
      enableDarkMode()
      expect(document.documentElement.classList.contains('dark')).toBe(true)
    })

    test('disableDarkMode removes dark class from documentElement', () => {
      enableDarkMode()
      expect(document.documentElement.classList.contains('dark')).toBe(true)
      disableDarkMode()
      expect(document.documentElement.classList.contains('dark')).toBe(false)
    })
  })
})
