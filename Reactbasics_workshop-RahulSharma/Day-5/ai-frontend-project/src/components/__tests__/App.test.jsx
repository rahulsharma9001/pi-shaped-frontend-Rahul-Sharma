import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from '../../App'

describe('App Integration Tests', () => {
  it('renders the main application with header', () => {
    render(<App />)
    
    expect(screen.getByText('AI Frontend - LLMs & Generative Components')).toBeInTheDocument()
    expect(screen.getByText('Explore the power of AI in frontend development with intelligent input fields and generative components')).toBeInTheDocument()
  })

  it('renders all three tabs', () => {
    render(<App />)
    
    expect(screen.getByText('AI-Powered Input Field')).toBeInTheDocument()
    expect(screen.getByText('Image Caption Generator')).toBeInTheDocument()
    expect(screen.getByText('Enhanced Features')).toBeInTheDocument()
  })

  it('shows AI-Powered Input Field tab by default', () => {
    render(<App />)
    
    expect(screen.getByText('Smart Content Assistant')).toBeInTheDocument()
    expect(screen.getByText('An AI-powered input field that provides real-time suggestions, auto-completion, and grammar corrections as you type.')).toBeInTheDocument()
  })

})

