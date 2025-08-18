import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import ImageCaptionGenerator from '../ImageCaptionGenerator'

// Mock file reader
const mockFileReader = {
  readAsDataURL: vi.fn(),
  result: 'data:image/jpeg;base64,mockImageData',
  onload: null
}

global.FileReader = vi.fn(() => mockFileReader)

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn().mockResolvedValue(undefined)
  }
})

// Mock URL.createObjectURL
global.URL.createObjectURL = vi.fn(() => 'mock-url')
global.URL.revokeObjectURL = vi.fn()

describe('ImageCaptionGenerator', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders upload area with correct text', () => {
    render(<ImageCaptionGenerator />)
    
    expect(screen.getByText('Upload an image')).toBeInTheDocument()
    expect(screen.getByText('Click to select or drag and drop')).toBeInTheDocument()
    expect(screen.getByTestId('image-upload-area')).toBeInTheDocument()
  })

})

