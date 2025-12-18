import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest'
import { renderWithProviders, enableDarkMode, disableDarkMode } from '../test-utils'
import { ContactSection } from '@/components/ContactSection'

// Mock emailjs
vi.mock('@emailjs/browser', () => ({
  default: {
    send: vi.fn().mockResolvedValue({ status: 200 }),
  },
}))

// Mock react-hot-toast
vi.mock('react-hot-toast', () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

describe('ContactSection - Dark Mode Text Colors', () => {
  beforeEach(() => {
    disableDarkMode()
  })

  afterEach(() => {
    disableDarkMode()
  })

  test('renders the Contact section', () => {
    const { container } = renderWithProviders(<ContactSection />)
    expect(container.querySelector('#contact')).toBeInTheDocument()
  })

  test('main heading contains text-primary span', () => {
    const { getByText } = renderWithProviders(<ContactSection />)
    const primarySpan = getByText('Touch')
    expect(primarySpan).toHaveClass('text-primary')
  })

  test('form labels have text-foreground class', () => {
    const { getByText } = renderWithProviders(<ContactSection />)
    
    const nameLabel = getByText('Name')
    const emailLabel = getByText('Email')
    const messageLabel = getByText('Message')

    expect(nameLabel).toHaveClass('text-foreground')
    expect(emailLabel).toHaveClass('text-foreground')
    expect(messageLabel).toHaveClass('text-foreground')
  })

  test('renders form inputs correctly', () => {
    const { container } = renderWithProviders(<ContactSection />)
    
    const nameInput = container.querySelector('input[name="name"]')
    const emailInput = container.querySelector('input[name="email"]')
    const messageTextarea = container.querySelector('textarea[name="message"]')

    expect(nameInput).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()
    expect(messageTextarea).toBeInTheDocument()
  })

  test('description paragraph has text-muted-foreground class', () => {
    const { container } = renderWithProviders(<ContactSection />)
    const descriptions = container.querySelectorAll('.text-muted-foreground')
    expect(descriptions.length).toBeGreaterThan(0)
  })

  test('renders correctly in dark mode', () => {
    enableDarkMode()
    const { container } = renderWithProviders(<ContactSection />)
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(container.querySelector('#contact')).toBeInTheDocument()
  })

  test('contact card has dark mode specific classes', () => {
    const { container } = renderWithProviders(<ContactSection />)
    const cards = container.querySelectorAll('.dark\\:bg-card\\/60')
    expect(cards.length).toBeGreaterThan(0)
  })

  test('social links have dark mode specific classes', () => {
    const { container } = renderWithProviders(<ContactSection />)
    const socialLinks = container.querySelectorAll('.dark\\:bg-card\\/80')
    expect(socialLinks.length).toBeGreaterThan(0)
  })
})
