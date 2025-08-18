import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import EnhancedFeatures from '../EnhancedFeatures'

// Mock timers for analysis debouncing
vi.useFakeTimers()

describe('EnhancedFeatures', () => {
  beforeEach(() => {
    vi.clearAllTimers()
  })

  it('renders feature overview cards', () => {
    render(<EnhancedFeatures />)
    
    expect(screen.getByText('AI-Powered Text Analysis')).toBeInTheDocument()
    expect(screen.getByText('Smart Auto-Complete')).toBeInTheDocument()
    expect(screen.getByText('Content Optimization')).toBeInTheDocument()
    expect(screen.getByText('Performance Metrics')).toBeInTheDocument()
  })

  it('renders advanced text analysis section', () => {
    render(<EnhancedFeatures />)
    
    expect(screen.getByText('Advanced Text Analysis')).toBeInTheDocument()
    expect(screen.getByText('Get detailed insights about your content including sentiment, readability, and keyword analysis')).toBeInTheDocument()
    expect(screen.getByTestId('analysis-input')).toBeInTheDocument()
  })

})

