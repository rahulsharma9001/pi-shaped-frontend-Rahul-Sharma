import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import AIInputField from '../AIInputField'

// Mock timers for debouncing tests
vi.useFakeTimers()

describe('AIInputField', () => {
  beforeEach(() => {
    vi.clearAllTimers()
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
  })

  it('renders the input field with placeholder text', () => {
    render(<AIInputField />)
    
    const textarea = screen.getByTestId('ai-input-field')
    expect(textarea).toBeInTheDocument()
    expect(textarea).toHaveAttribute('placeholder', 'Start typing your content here... AI will provide suggestions as you write.')
  })

})

