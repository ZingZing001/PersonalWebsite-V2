import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

/**
 * Custom render function that wraps components with required providers
 */
export function renderWithProviders(ui, options = {}) {
  const Wrapper = ({ children }) => (
    <BrowserRouter>
      {children}
    </BrowserRouter>
  )

  return render(ui, { wrapper: Wrapper, ...options })
}

/**
 * Helper to enable dark mode on document
 */
export function enableDarkMode() {
  document.documentElement.classList.add('dark')
}

/**
 * Helper to disable dark mode on document
 */
export function disableDarkMode() {
  document.documentElement.classList.remove('dark')
}

/**
 * Check if an element has explicit text color class for dark mode support
 * @param {HTMLElement} element 
 * @returns {boolean}
 */
export function hasExplicitTextColor(element) {
  const className = element.className || ''
  const textColorPatterns = [
    'text-foreground',
    'text-muted-foreground',
    'text-primary',
    'text-primary-foreground',
    'text-secondary',
    'text-secondary-foreground',
  ]
  return textColorPatterns.some(pattern => className.includes(pattern))
}

/**
 * Get all text elements that should have explicit color classes
 * @param {HTMLElement} container 
 * @returns {HTMLElement[]}
 */
export function getTextElements(container) {
  return Array.from(container.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, label'))
}

export * from '@testing-library/react'
